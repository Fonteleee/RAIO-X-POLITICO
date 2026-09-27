// Raio-X Político - Extrator Oficial da Câmara dos Deputados
// Consome a API de Dados Abertos v2 (100% Gratuita, Sem Chave de API, Oficial)
// https://dadosabertos.camara.leg.br/api/v2/

const { CircuitBreaker } = require('../utils/circuit_breaker');

const BASE_URL = 'https://dadosabertos.camara.leg.br/api/v2';

const defaultCamaraBreaker = new CircuitBreaker({
  maxFailures: 3,
  windowMs: 60 * 1000,
  resetTimeoutMs: 30 * 60 * 1000
});

class CamaraExtractor {
  constructor(fetchImpl = null, circuitBreaker = null) {
    this.fetch = fetchImpl || globalThis.fetch;
    this.circuitBreaker = circuitBreaker || defaultCamaraBreaker;
  }

  /**
   * Busca parlamentares pelo nome e UF
   * @param {string} nome 
   * @param {string} siglaUf 
   * @returns {Promise<Array>}
   */
  async searchDeputado(nome, siglaUf = '') {
    const params = new URLSearchParams({
      nome: nome,
      ordem: 'ASC',
      ordenarPor: 'nome'
    });
    if (siglaUf) params.append('siglaUf', siglaUf);

    const url = `${BASE_URL}/deputados?${params.toString()}`;
    return this.circuitBreaker.execute(`camara:search:${nome}:${siglaUf}`, async () => {
      const response = await this.fetch(url, {
        headers: { 'Accept': 'application/json' }
      });

      if (!response.ok) {
        const err = new Error(`Erro ao consultar Câmara: HTTP ${response.status}`);
        err.status = response.status;
        throw err;
      }

      const json = await response.json();
      return json.dados || [];
    }, []);
  }

  /**
   * Obtém os detalhes completos do mandato atual de um parlamentar
   * @param {number|string} deputadoId 
   * @returns {Promise<Object>}
   */
  async getDeputadoDetalhes(deputadoId) {
    const url = `${BASE_URL}/deputados/${deputadoId}`;
    return this.circuitBreaker.execute(`camara:detalhes:${deputadoId}`, async () => {
      const response = await this.fetch(url, {
        headers: { 'Accept': 'application/json' }
      });

      if (!response.ok) {
        const err = new Error(`Erro ao obter dados do deputado ${deputadoId}: HTTP ${response.status}`);
        err.status = response.status;
        throw err;
      }

      const json = await response.json();
      const d = json.dados;
      return {
        camaraId: d.id,
        nomeCivil: d.nomeCivil,
        nomeEleitoral: d.ultimoStatus.nomeEleitoral,
        partido: d.ultimoStatus.siglaPartido,
        uf: d.ultimoStatus.siglaUf,
        urlFoto: d.ultimoStatus.urlFoto,
        email: d.ultimoStatus.email,
        situacao: d.ultimoStatus.situacao,
        condicaoEleitoral: d.ultimoStatus.condicaoEleitoral,
        gabinete: d.ultimoStatus.gabinete
      };
    }, null);
  }

  /**
   * Extrai os gastos da Cota Parlamentar (CEAP) discriminados
   * @param {number|string} deputadoId 
   * @param {number} ano 
   * @param {number} itens 
   * @returns {Promise<Object>}
   */
  async getDespesasCeap(deputadoId, ano = 2026, itens = 100) {
    const url = `${BASE_URL}/deputados/${deputadoId}/despesas?ano=${ano}&itens=${itens}&ordem=DESC&ordenarPor=mes`;
    const rawDespesas = await this.circuitBreaker.execute(`camara:despesas:${deputadoId}:${ano}`, async () => {
      const response = await this.fetch(url, {
        headers: { 'Accept': 'application/json' }
      });

      if (!response.ok) {
        const err = new Error(`Erro ao obter despesas CEAP do deputado ${deputadoId}: HTTP ${response.status}`);
        err.status = response.status;
        throw err;
      }

      const json = await response.json();
      return json.dados || [];
    }, []);

    return this.processarDespesasCeap(rawDespesas, ano);
  }

  /**
   * Consolida despesas brutas em métricas cívicas (categorias, economia e fornecedores)
   * @param {Array} despesas 
   * @param {number} ano 
   * @returns {Object}
   */
  processarDespesasCeap(despesas, ano) {
    let totalGasto = 0;
    const porCategoria = {};
    const porFornecedor = {};
    const timelineMensal = {};

    for (const d of despesas) {
      const valor = parseFloat(d.valorLiquido || d.valorDocumento || 0);
      totalGasto += valor;

      // Agrupamento por Categoria
      const cat = d.tipoDespesa || 'Outras Despesas';
      porCategoria[cat] = (porCategoria[cat] || 0) + valor;

      // Agrupamento por Fornecedor / CNPJ
      const fornecedor = d.nomeFornecedor || 'Fornecedor Não Identificado';
      const cnpj = d.cnpjCpf || '';
      const keyFornecedor = `${fornecedor} (CNPJ: ${cnpj})`;
      porFornecedor[keyFornecedor] = (porFornecedor[keyFornecedor] || 0) + valor;

      // Linha do tempo mensal
      const mesNome = `${d.mes || 1}/${ano}`;
      timelineMensal[mesNome] = (timelineMensal[mesNome] || 0) + valor;
    }

    // Ordena maiores fornecedores
    const topFornecedores = Object.entries(porFornecedor)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([nome, valor]) => ({
        fornecedor: nome,
        valorGasto: valor,
        valorFormatado: `R$ ${valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      }));

    // Teto médio estadual de cota parlamentar (~R$ 45.000/mês para SP)
    const tetoEstimadoAno = 45000 * 10;
    const economia = Math.max(0, tetoEstimadoAno - totalGasto);

    return {
      ano,
      totalGasto,
      totalFormatado: `R$ ${totalGasto.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      economiaEstimada: `R$ ${economia.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      despesasCount: despesas.length,
      categorias: porCategoria,
      topFornecedores,
      timelineMensal
    };
  }

  /**
   * Extrai proposições de autoria do parlamentar
   * @param {number|string} deputadoId 
   * @param {number} ano 
   * @returns {Promise<Array>}
   */
  async getProposicoes(deputadoId, ano = 2026) {
    const url = `${BASE_URL}/proposicoes?idDeputadoAutor=${deputadoId}&ano=${ano}&ordem=DESC&ordenarPor=id`;
    return this.circuitBreaker.execute(`camara:proposicoes:${deputadoId}:${ano}`, async () => {
      const response = await this.fetch(url, {
        headers: { 'Accept': 'application/json' }
      });

      if (!response.ok) {
        const err = new Error(`Erro ao obter proposições: HTTP ${response.status}`);
        err.status = response.status;
        throw err;
      }

      const json = await response.json();
      return (json.dados || []).map(p => ({
        id: p.id,
        siglaTipo: p.siglaTipo,
        numero: p.numero,
        ano: p.ano,
        ementa: p.ementa
      }));
    }, []);
  }
}

module.exports = { CamaraExtractor, BASE_URL };
