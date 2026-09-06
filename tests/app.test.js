// Raio-X Político - Testes Automatizados Essenciais
// Utiliza o test runner nativo do Node.js (node --test)

const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { AppDatabase } = require('../src/db/database');
const { NotebookLMBridge } = require('../src/ingestion/notebooklm_bridge');

test('Banco de Dados: Inicialização e consultas parametrizadas essenciais', () => {
  const db = new AppDatabase();
  
  // 1. Listagem de candidatos
  const candidates = db.getAllCandidates();
  assert.ok(Array.isArray(candidates), 'Deve retornar um array de candidatos');
  assert.ok(candidates.length >= 2, 'Deve conter pelo menos 2 candidatos cadastrados');

  // 2. Dossiê completo
  const cand = db.getCandidateById('cand-tabata-amaral');
  assert.ok(cand, 'Candidata cand-tabata-amaral deve existir');
  assert.equal(cand.id, 'cand-tabata-amaral');
  assert.ok(cand.radar, 'Deve conter objeto de métricas de radar');
  assert.ok(cand.attendance, 'Deve conter objeto de assiduidade');
  assert.ok(cand.salary, 'Deve conter dados da cota CEAP');
  assert.ok(cand.recentDebate, 'Deve conter dados do debate oficial');
  assert.ok(Array.isArray(cand.recentDebate.statements), 'Deve conter array de falas transcritas');

  // 3. Comparador 1v1
  const comp = db.getComparison('cand-tabata-amaral', 'cand-kim-kataguiri');
  assert.ok(comp, 'Comparação deve ser gerada');
  assert.equal(comp.cand1.id, 'cand-tabata-amaral');
  assert.equal(comp.cand2.id, 'cand-kim-kataguiri');

  db.close();
});

test('NotebookLM Bridge: Ingestão de falas de debate no SQLite', async () => {
  const db = new AppDatabase();
  const bridge = new NotebookLMBridge(db);

  const mockDebate = {
    candidateId: 'cand-tabata-amaral',
    event: 'Debate Band São Paulo 2026',
    broadcaster: 'Band',
    stage: '1º Turno Oficial',
    date: '18/08/2026',
    youtubeUrl: 'https://youtube.com/watch?v=debate-oficial',
    transcriptionEngine: 'NotebookLM AI Audio Engine v2.4 (Diarização & Timestamps)',
    truthfulnessPct: 92,
    speakingTime: '19 min 10 seg',
    rightOfReplyGranted: 1,
    clashesCount: 5,
    statements: [
      {
        id: 'stmt-test-1',
        timestamp: '00:15:30',
        theme: 'Transparência de Emendas',
        quote: '100% das emendas do nosso mandato foram executadas por concurso público.',
        verdict: 'Verdadeiro',
        factCheckSummary: 'Portal da Transparência confirma seleção pública.',
        officialSource: 'Portal da Transparência Alesp',
        sourceLink: 'https://transparencia.alesp.sp.gov.br'
      }
    ]
  };

  const result = await bridge.ingestDebateResult(mockDebate);
  assert.equal(result.success, true);
  assert.equal(result.statementsCount, 1);

  const updated = db.getCandidateById('cand-tabata-amaral');
  assert.equal(updated.recentDebate.truthfulnessPct, 92);
  assert.equal(updated.recentDebate.statements.length, 1);
  assert.equal(updated.recentDebate.statements[0].quote, mockDebate.statements[0].quote);

  db.close();
});

test('API REST: Endpoints HTTP essenciais respondem com 200 OK', async () => {
  const { server } = require('../src/server');

  await new Promise(resolve => server.listen(0, resolve));
  const address = server.address();
  const baseUrl = `http://localhost:${address.port}`;

  try {
    // 1. Health check
    const healthRes = await fetch(`${baseUrl}/api/health`);
    assert.equal(healthRes.status, 200);
    const healthJson = await healthRes.json();
    assert.equal(healthJson.status, 'online');

    // 2. Lista de candidatos
    const candsRes = await fetch(`${baseUrl}/api/candidates`);
    assert.equal(candsRes.status, 200);
    const candsJson = await candsRes.json();
    assert.equal(candsJson.success, true);
    assert.ok(candsJson.data.length >= 2);

    // 3. Dossiê de candidato (Deputada Federal, Presidente, Governador, Senador, Prefeito)
    const candRes = await fetch(`${baseUrl}/api/candidates/cand-tabata-amaral`);
    assert.equal(candRes.status, 200);
    const candJson = await candRes.json();
    assert.equal(candJson.data.id, 'cand-tabata-amaral');

    const lulaRes = await fetch(`${baseUrl}/api/candidates/cand-lula`);
    assert.equal(lulaRes.status, 200);
    const lulaJson = await lulaRes.json();
    assert.equal(lulaJson.data.position, 'Presidente da República');
    assert.ok(lulaJson.data.proposals.length >= 3);

    const tarcisioRes = await fetch(`${baseUrl}/api/candidates/cand-tarcisio-de-freitas`);
    assert.equal(tarcisioRes.status, 200);
    const tarcisioJson = await tarcisioRes.json();
    assert.equal(tarcisioJson.data.position, 'Governador');

    const moroRes = await fetch(`${baseUrl}/api/candidates/cand-sergio-moro`);
    assert.equal(moroRes.status, 200);
    const moroJson = await moroRes.json();
    assert.equal(moroJson.data.position, 'Senador');

    const camposRes = await fetch(`${baseUrl}/api/candidates/cand-joao-campos`);
    assert.equal(camposRes.status, 200);
    const camposJson = await camposRes.json();
    assert.equal(camposJson.data.position, 'Governador');

    const nunesRes = await fetch(`${baseUrl}/api/candidates/cand-ricardo-nunes`);
    assert.equal(nunesRes.status, 200);
    const nunesJson = await nunesRes.json();
    assert.equal(nunesJson.data.position, 'Prefeito');

    // 4. Comparador
    const compRes = await fetch(`${baseUrl}/api/compare?c1=cand-tabata-amaral&c2=cand-kim-kataguiri`);
    assert.equal(compRes.status, 200);
    const compJson = await compRes.json();
    assert.equal(compJson.data.cand1.id, 'cand-tabata-amaral');

    // 5. AI-SEO: llms.txt
    const llmsRes = await fetch(`${baseUrl}/llms.txt`);
    assert.equal(llmsRes.status, 200);
    const llmsText = await llmsRes.text();
    assert.ok(llmsText.includes('# Raio-X Político 2026'));
    assert.ok(llmsText.includes('Luiz Inácio Lula da Silva'));
    assert.ok(llmsText.includes('Tarcísio Gomes de Freitas'));
  } finally {
    await new Promise(resolve => server.close(resolve));
  }
});
