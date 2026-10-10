// Raio-X Político - Testes Essenciais dos Extratores de Dados Oficiais
// Validação de CamaraExtractor, TseExtractor e YoutubeDebateExtractor

const { describe, it } = require('node:test');
const assert = require('node:assert');
const { CamaraExtractor } = require('../src/ingestion/camara_extractor');
const { TseExtractor } = require('../src/ingestion/tse_extractor');
const { YoutubeDebateExtractor } = require('../src/ingestion/youtube_debate_extractor');
const { NotebookLMBridge } = require('../src/ingestion/notebooklm_bridge');
const { AppDatabase } = require('../src/db/database');

describe('Extratores de Dados Oficiais (Custo Zero)', () => {

  it('CamaraExtractor: consolida despesas CEAP e calcula economia vs teto', () => {
    const extractor = new CamaraExtractor();
    const mockDespesas = [
      { tipoDespesa: 'Passagens Aéreas', valorLiquido: '1500.50', nomeFornecedor: 'GOL Linhas Aéreas', cnpjCpf: '07570905000100', mes: 3 },
      { tipoDespesa: 'Passagens Aéreas', valorLiquido: '2000.00', nomeFornecedor: 'GOL Linhas Aéreas', cnpjCpf: '07570905000100', mes: 3 },
      { tipoDespesa: 'Combustíveis', valorLiquido: '500.00', nomeFornecedor: 'Posto Petrobras', cnpjCpf: '12345678000199', mes: 3 }
    ];

    const result = extractor.processarDespesasCeap(mockDespesas, 2026);
    assert.strictEqual(result.totalGasto, 4000.50);
    assert.strictEqual(result.despesasCount, 3);
    assert.strictEqual(result.categorias['Passagens Aéreas'], 3500.50);
    assert.strictEqual(result.categorias['Combustíveis'], 500.00);
    assert.strictEqual(result.topFornecedores.length, 2);
    assert.ok(result.totalFormatado.includes('4.000,50'));
  });

  it('TseExtractor: calcula total de bens declarados e extrai plano de governo', () => {
    const extractor = new TseExtractor();
    const mockTseRaw = {
      id: 250001928374,
      nomeCompleto: 'EDUARDO SILVA ROCHA',
      nomeUrna: 'EDUARDO ROCHA',
      numero: 55,
      cargo: { nome: 'Governador' },
      partido: { sigla: 'PSD' },
      bens: [
        { descricao: 'Apartamento Residencial', valor: 850000.00 },
        { descricao: 'Veículo Automotor', valor: 120000.00 }
      ],
      arquivos: [
        { tipo: 'PLANO_DE_GOVERNO', url: 'https://divulgacandcontas.tse.jus.br/arquivos/plano_55.pdf' },
        { tipo: 'CERTIDAO_CRIMINAL', url: 'https://divulgacandcontas.tse.jus.br/arquivos/certidao_55.pdf' }
      ]
    };

    const candidato = extractor.processarCandidatoTse(mockTseRaw, 2026);
    assert.strictEqual(candidato.patrimonioTotal, 970000.00);
    assert.strictEqual(candidato.nomeUrna, 'EDUARDO ROCHA');
    assert.strictEqual(candidato.planoGovernoUrl, 'https://divulgacandcontas.tse.jus.br/arquivos/plano_55.pdf');
    assert.strictEqual(candidato.certidoesCriminaisUrl, 'https://divulgacandcontas.tse.jus.br/arquivos/certidao_55.pdf');
  });

  it('YoutubeDebateExtractor: extrai videoId, formata prompt e integra com SQLite', async () => {
    const ytExtractor = new YoutubeDebateExtractor();
    
    // Teste de extração de ID de vídeo
    const id1 = ytExtractor.extractVideoId('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    assert.strictEqual(id1, 'dQw4w9WgXcQ');

    const timestamp = ytExtractor.formatTimestamp(872); // 14 min 32 seg
    assert.strictEqual(timestamp, '14 min 32 seg');

    // Teste de construção de prompt para IA
    const promptData = ytExtractor.buildFactCheckingPrompt('Tabata Amaral', '[14:32] Reduzimos gastos em 14%');
    assert.strictEqual(promptData.recommendedModel, 'gemini-1.5-flash');
    assert.ok(promptData.userPrompt.includes('Tabata Amaral'));

    // Teste de formatação e ingestão no banco
    const mockAiOutput = {
      truthfulnessPct: 90,
      speakingTimeTotal: '17 min 15 seg',
      statements: [
        {
          topic: 'Segurança Pública',
          quote: 'Contratamos 3.000 novos policiais civis e militares.',
          timestamp: '22 min 10 seg',
          verdict: 'Verdadeiro',
          factSource: 'Diário Oficial do Estado de SP (DOE)'
        }
      ]
    };

    const formatted = ytExtractor.formatForDatabaseIngestion('cand-tabata-amaral', 'Debate Record', 'Record TV', 'https://youtube.com/watch?v=dQw4w9WgXcQ', mockAiOutput);
    assert.strictEqual(formatted.candidateId, 'cand-tabata-amaral');
    assert.strictEqual(formatted.statements.length, 1);

    // Salva no banco de dados com candidatos válidos
    const appDb = new AppDatabase();
    const bridge = new NotebookLMBridge(appDb);
    await bridge.ingestDebateResult(formatted);

    const cand = appDb.getCandidateById('cand-tabata-amaral');
    assert.strictEqual(cand.recentDebate.event, 'Debate Record');
    assert.strictEqual(cand.recentDebate.statements.length, 1);
    assert.strictEqual(cand.recentDebate.statements[0].theme, 'Segurança Pública');
  });

  it('Validates real deputies proposals and amendments in SQLite', () => {
    const appDb = new AppDatabase();
    const cand = appDb.getCandidateById('cand-tabata-amaral');
    assert.ok(cand, 'Tabata Amaral must exist in database');
    assert.strictEqual(cand.party, 'PSB');
    assert.ok(cand.proposals.length >= 3, 'Must have at least 3 proposals');
    assert.ok(cand.proposals[0].title.includes('Pé-de-Meia'));
    assert.ok(cand.parliamentaryAmendments, 'Must have parliamentaryAmendments');
    assert.ok(cand.parliamentaryAmendments.totalAllocated);
    assert.strictEqual(cand.radar.presenca, cand.radar.assiduidade);

    const all = appDb.getAllCandidates();
    assert.ok(all.length >= 45, 'Must have at least 45 candidates with multi-office database');
    all.forEach(c => {
      assert.ok(c.proposals && c.proposals.length > 0, `Candidate ${c.id} must have proposals in getAllCandidates`);
      assert.ok(c.radar && c.radar.integridade > 0);
    });

    // Validação de Personalidades Multi-Cargos (Executivo & Senado)
    const lula = appDb.getCandidateById('cand-lula');
    assert.ok(lula, 'Lula must exist in database');
    assert.strictEqual(lula.party, 'PT');
    assert.strictEqual(lula.position, 'Presidente da República');
    assert.ok(lula.proposals.length >= 3, 'Lula must have at least 3 proposals');

    const tarcisio = appDb.getCandidateById('cand-tarcisio-de-freitas');
    assert.ok(tarcisio, 'Tarcísio must exist in database');
    assert.strictEqual(tarcisio.position, 'Governador');

    const moro = appDb.getCandidateById('cand-sergio-moro');
    assert.ok(moro, 'Moro must exist in database');
    assert.strictEqual(moro.position, 'Senador');

    const campos = appDb.getCandidateById('cand-joao-campos');
    assert.ok(campos, 'João Campos must exist in database');
    // João Campos deixou a Prefeitura do Recife para disputar o Governo de PE (TSE 2026)
    assert.match(campos.position, /Governador/);

    const nunes = appDb.getCandidateById('cand-ricardo-nunes');
    assert.ok(nunes, 'Ricardo Nunes must exist in database');
    assert.strictEqual(nunes.position, 'Prefeito');
  });

});
