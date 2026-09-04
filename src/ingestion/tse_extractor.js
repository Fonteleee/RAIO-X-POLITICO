// Raio-X Político - Extrator Oficial do TSE (DivulgaCandContas)
// Consome a API pública do Tribunal Superior Eleitoral (100% Gratuita e Oficial)
// https://divulgacandcontas.tse.jus.br/divulga/rest/v1

const TSE_BASE_URL = 'https://divulgacandcontas.tse.jus.br/divulga/rest/v1';

class TseExtractor {
  constructor(fetchImpl = null) {
    this.fetch = fetchImpl || globalThis.fetch;
  }

  /**
   * Busca candidatos registrados por ano, UF e cargo no TSE
   * @param {number} ano - Ano da eleição (ex: 2026, 2024, 2022)
   * @param {string} siglaUf - Sigla do estado (ex: 'SP', 'RJ', 'BR')
   * @param {number|string} idEleicao - Código da eleição no TSE
   * @param {number|string} codigoCargo - 1 (Presidente), 3 (Governador), 5 (Senador), 6 (Deputado Federal)
   * @returns {Promise<Array>}
   */
  async listarCandidatos(ano = 2026, siglaUf = 'SP', idEleicao = '20260000', codigoCargo = '3') {
    const url = `${TSE_BASE_URL}/candidatura/listar/${ano}/${idEleicao}/${siglaUf}/${codigoCargo}/candidatos`;
    
    try {
      const response = await this.fetch(url, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'RaioXPolitico-CivicBot/1.0 (+https://raioxpolitico.org)'
        }
      });

      if (!response.ok) {
        throw new Error(`Erro ao listar candidatos no TSE: HTTP ${response.status}`);
      }

      const json = await response.json();
      return (json.candidatos || []).map(c => ({
        idTse: c.id,
        nomeCompleto: c.nomeCompleto,
        nomeUrna: c.nomeUrna,
        numero: c.numero,
        partido: c.partido?.sigla,
        cargo: c.cargo?.nome,
        uf: c.ufCandidatura,
        situacao: c.descricaoSituacao,
        fotoUrl: `https://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/buscar/foto/${ano}/${c.id}`
      }));
    } catch (err) {
      console.warn(`[TSE Extractor] Falha na consulta remota ao TSE (${url}):`, err.message);
      return [];
    }
  }

  /**
   * Obtém detalhes cadastrais, bens e certidões do candidato no TSE
   * @param {number} ano 
   * @param {string} siglaUf 
   * @param {string} idEleicao 
   * @param {string|number} idCandidato 
   * @returns {Promise<Object>}
   */
  async getCandidatoDetalhes(ano = 2026, siglaUf = 'SP', idEleicao = '20260000', idCandidato) {
    const url = `${TSE_BASE_URL}/candidatura/buscar/${ano}/${idEleicao}/${siglaUf}/candidato/${idCandidato}`;

    const response = await this.fetch(url, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'RaioXPolitico-CivicBot/1.0 (+https://raioxpolitico.org)'
      }
    });

    if (!response.ok) {
      throw new Error(`Erro ao obter detalhes do candidato no TSE: HTTP ${response.status}`);
    }

    const json = await response.json();
    return this.processarCandidatoTse(json, ano);
  }

  /**
   * Processa o JSON bruto do TSE e calcula totais de patrimônio e links oficiais
   * @param {Object} raw 
   * @param {number} ano 
   * @returns {Object}
   */
  processarCandidatoTse(raw, ano) {
    const bens = raw.bens || [];
    let patrimonioTotal = 0;
    const listaBens = bens.map(b => {
      const valor = parseFloat(b.valor || 0);
      patrimonioTotal += valor;
      return {
        descricao: b.descricao,
        tipo: b.descricaoTipoBem,
        valor: valor,
        valorFormatado: `R$ ${valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      };
    });

    return {
      idTse: raw.id,
      anoEleicao: ano,
      nomeCompleto: raw.nomeCompleto,
      nomeUrna: raw.nomeUrna,
      numero: raw.numero,
      partido: raw.partido?.sigla,
      coligacao: raw.coligacao?.nomeColigacao,
      cargo: raw.cargo?.nome,
      grauInstrucao: raw.grauInstrucao,
      ocupacao: raw.ocupacao,
      dataNascimento: raw.dataDeNascimento,
      gastoCampanha1T: raw.gastoCampanha1T ? `R$ ${parseFloat(raw.gastoCampanha1T).toLocaleString('pt-BR')}` : 'Não informado',
      gastoCampanha2T: raw.gastoCampanha2T ? `R$ ${parseFloat(raw.gastoCampanha2T).toLocaleString('pt-BR')}` : 'Não informado',
      patrimonioTotal: patrimonioTotal,
      patrimonioFormatado: `R$ ${patrimonioTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      bensDeclarados: listaBens,
      planoGovernoUrl: raw.arquivos?.find(a => a.tipo === 'PLANO_DE_GOVERNO')?.url || null,
      certidoesCriminaisUrl: raw.arquivos?.find(a => a.tipo === 'CERTIDAO_CRIMINAL')?.url || null,
      situacaoCandidatura: raw.descricaoSituacao
    };
  }
}

module.exports = { TseExtractor, TSE_BASE_URL };
