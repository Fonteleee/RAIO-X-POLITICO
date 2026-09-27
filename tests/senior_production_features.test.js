// Raio-X Político - Testes de Engenharia Sênior e Produção
// Resiliência (Circuit Breaker), Auditabilidade (SHA-256), Conflito de Interesses e Análise Preditiva

const { describe, it, beforeEach } = require('node:test');
const assert = require('node:assert');
const { CircuitBreaker } = require('../src/utils/circuit_breaker');
const { generateMetricAuditHash, verifyCandidateAuditHash } = require('../src/services/audit_trail');
const { detectConflictOfInterest } = require('../src/services/conflict_detector');
const { calculatePredictiveMigration } = require('../src/services/predictive_analytics');

describe('Engenharia Sênior: Circuit Breaker Pattern (Resiliência API)', () => {
  it('deve permanecer CLOSED em operações normais com sucesso', async () => {
    const cb = new CircuitBreaker({ maxFailures: 3, windowMs: 60000, resetTimeoutMs: 1800000 });
    let calls = 0;
    const fn = async () => { calls++; return { success: true, data: [1, 2, 3] }; };

    const result1 = await cb.execute('camara-test-1', fn);
    const result2 = await cb.execute('camara-test-1', fn);

    assert.strictEqual(cb.getState(), 'CLOSED');
    assert.strictEqual(calls, 2);
    assert.strictEqual(result1.success, true);
    assert.strictEqual(result2.success, true);
  });

  it('deve ABRIR o circuito após mais de 3 falhas 502/504 em 1 minuto e servir cache local', async () => {
    const cb = new CircuitBreaker({ maxFailures: 3, windowMs: 60000, resetTimeoutMs: 1800000 });
    
    // Primeiro, popula o cache com sucesso
    await cb.execute('deputados-sp', async () => ({ status: 200, dados: [{ id: 100, nome: 'Deputado Teste' }] }));

    // Simula 3 erros 502 (Bad Gateway) e 1 erro 504 (Gateway Timeout)
    const failingFn = async () => {
      const err = new Error('HTTP 502 Bad Gateway');
      err.status = 502;
      throw err;
    };

    for (let i = 0; i < 4; i++) {
      try {
        await cb.execute('deputados-sp', failingFn);
      } catch (e) {
        // Falhas esperadas antes da abertura
      }
    }

    // O circuito agora deve estar OPEN
    assert.strictEqual(cb.getState(), 'OPEN');

    // Ao invés de travar ou lançar erro, deve servir instantaneamente do cache local
    let remoteCalled = false;
    const probeFn = async () => { remoteCalled = true; return { status: 200 }; };
    
    const fallbackResult = await cb.execute('deputados-sp', probeFn);
    assert.strictEqual(remoteCalled, false, 'Não deve chamar a API remota com circuito aberto');
    assert.ok(fallbackResult._fromLocalCache === true, 'Deve indicar que o resultado veio do cache local');
    assert.strictEqual(fallbackResult.dados[0].nome, 'Deputado Teste');
  });

  it('deve transicionar para HALF-OPEN após o tempo de reset e reabilitar após sucesso', async () => {
    const cb = new CircuitBreaker({ maxFailures: 3, windowMs: 60000, resetTimeoutMs: 50 }); // 50ms para teste ágil

    // Provoca abertura
    for (let i = 0; i < 4; i++) {
      try {
        await cb.execute('key-test', async () => {
          const err = new Error('HTTP 504 Gateway Timeout');
          err.status = 504;
          throw err;
        });
      } catch (e) {}
    }
    assert.strictEqual(cb.getState(), 'OPEN');

    // Aguarda expiração do resetTimeout
    await new Promise(r => setTimeout(r, 60));

    // Próxima chamada deve testar em HALF-OPEN e fechar se obtiver sucesso
    const probeResult = await cb.execute('key-test', async () => ({ status: 200, recovered: true }));
    assert.strictEqual(cb.getState(), 'CLOSED');
    assert.strictEqual(probeResult.recovered, true);
  });
});

describe('Engenharia Sênior: Auditabilidade Criptográfica & SLA de Contraditório (SHA-256)', () => {
  const sampleCandidate = {
    id: 'cand-joao-campos',
    name: 'João Henrique de Andrade Lima Campos',
    overallScore: 74,
    attendance: { presentCount: 247, totalSessions: 252, unjustifiedAbsences: 0 },
    salary: { spendingCeapMonthlyNum: 28900, limitCeapMonthlyNum: 45000 },
    parliamentaryAmendments: { totalAllocated: 'R$ 2.800.000.000,00', executionRatePct: 94.6, directPixPct: 0 },
    recentDebate: { truthfulnessPct: 86 },
    legalProcesses: { count: 0 }
  };

  it('deve gerar hash SHA-256 determinístico a partir dos dados brutos', () => {
    const audit1 = generateMetricAuditHash(sampleCandidate);
    const audit2 = generateMetricAuditHash(sampleCandidate);

    assert.ok(audit1.radarHash.startsWith('sha256:'));
    assert.strictEqual(audit1.radarHash, audit2.radarHash, 'O hash deve ser 100% determinístico e reproduzível');
    assert.strictEqual(audit1.overallScore, 74);
    assert.strictEqual(audit1.slaContraditorioDays, 5);
    assert.ok(audit1.reproducibleUrl.includes('/api/audit/cand-joao-campos'));
  });

  it('deve alterar completamente o hash SHA-256 ao alterar qualquer dado bruto (Efeito Avalanche)', () => {
    const originalAudit = generateMetricAuditHash(sampleCandidate);
    
    // Muta presenças
    const modifiedCandidate = {
      ...sampleCandidate,
      attendance: { presentCount: 240, totalSessions: 252, unjustifiedAbsences: 7 }
    };
    const modifiedAudit = generateMetricAuditHash(modifiedCandidate);

    assert.notStrictEqual(originalAudit.radarHash, modifiedAudit.radarHash);
    
    // Validação de verificação
    assert.strictEqual(verifyCandidateAuditHash(sampleCandidate, originalAudit.radarHash), true);
    assert.strictEqual(verifyCandidateAuditHash(modifiedCandidate, originalAudit.radarHash), false);
  });
});

describe('Engenharia Sênior: Detecção de Conflito de Interesses (> 20% Financiamento Setorial)', () => {
  it('deve alertar risco ALTO quando setor financiou > 20% e parlamentar votou SIM em projeto setorial', () => {
    const candComConflito = {
      id: 'cand-deputado-agro',
      position: 'Deputado Federal',
      sectorFunding: [
        { sector: 'Agronegócio & Defensivos', percentage: 28.5, amount: 'R$ 684.000,00' },
        { sector: 'Comércio & Serviços', percentage: 12.0, amount: 'R$ 288.000,00' }
      ],
      nominalVotes: [
        {
          billId: 'PL 1459/2022',
          billTitle: 'Modernização e Flexibilização do Registro de Defensivos Agrícolas',
          sector: 'Agronegócio & Defensivos',
          vote: 'SIM',
          proSectorBeneficial: true
        }
      ]
    };

    const analysis = detectConflictOfInterest(candComConflito);
    assert.strictEqual(analysis.hasConflictRisk, true);
    assert.strictEqual(analysis.severity, 'ALTO');
    assert.strictEqual(analysis.conflictSector, 'Agronegócio & Defensivos');
    assert.strictEqual(analysis.financingPercentage, 28.5);
    assert.ok(analysis.alertMessage.includes('Alerta de Conflito de Interesses'));
    assert.ok(analysis.alertMessage.includes('28.5%'));
  });

  it('deve classificar como ISENTO quando nenhum setor ultrapassa 20% de financiamento', () => {
    const candDifuso = {
      id: 'cand-deputado-difuso',
      sectorFunding: [
        { sector: 'Pequenos Doadores / Financiamento Coletivo', percentage: 15.0 },
        { sector: 'Comércio Local', percentage: 8.0 },
        { sector: 'Educação', percentage: 5.0 }
      ],
      nominalVotes: []
    };

    const analysis = detectConflictOfInterest(candDifuso);
    assert.strictEqual(analysis.hasConflictRisk, false);
    assert.strictEqual(analysis.severity, 'BAIXO');
    assert.ok(analysis.status.includes('ISENTO'));
  });

  it('deve classificar como ISENTO se financiado > 20% mas votou NÃO contra a pauta setorial', () => {
    const candIndependente = {
      id: 'cand-deputado-independente',
      sectorFunding: [
        { sector: 'Setor Financeiro & Bancos', percentage: 22.0, amount: 'R$ 440.000,00' }
      ],
      nominalVotes: [
        {
          billId: 'PL 2345/2023',
          billTitle: 'Aumento da Tributação e CSLL sobre Lucros de Instituições Financeiras',
          sector: 'Setor Financeiro & Bancos',
          vote: 'SIM', // Votou a favor de tributar os bancos (contrário ao interesse do setor)
          proSectorBeneficial: false
        }
      ]
    };

    const analysis = detectConflictOfInterest(candIndependente);
    assert.strictEqual(analysis.hasConflictRisk, false);
    assert.strictEqual(analysis.severity, 'BAIXO');
  });
});

describe('Engenharia Sênior: Análise Preditiva de Migração e Fidelidade Partidária', () => {
  it('deve calcular projeção de reeleição entre 10% e 95% e alta fidelidade com baixo risco de troca', () => {
    const candFiel = {
      party: 'PSB',
      partyDisciplinePct: 92,
      governmentAlignmentPct: 80,
      pastPartySwitchesCount: 0,
      overallScore: 82,
      attendanceRatePct: 98
    };

    const pred = calculatePredictiveMigration(candFiel);
    assert.ok(pred.reelectionProbabilityPct >= 10 && pred.reelectionProbabilityPct <= 95);
    assert.strictEqual(pred.partyMigrationRisk, 'Baixo');
    assert.ok(pred.partyMigrationProbabilityPct < 20);
    assert.strictEqual(pred.governmentCoalitionAlignmentPct, 80);
    assert.ok(pred.analyticalVerdict.includes('Alta coesão'));
  });

  it('deve identificar ALTO RISCO de migração na janela partidária para infidelidade parlamentar', () => {
    const candDissidente = {
      party: 'MDB',
      partyDisciplinePct: 58, // < 70%
      governmentAlignmentPct: 20,
      pastPartySwitchesCount: 3,
      overallScore: 60,
      attendanceRatePct: 75
    };

    const pred = calculatePredictiveMigration(candDissidente);
    assert.strictEqual(pred.partyMigrationRisk, 'Alto');
    assert.ok(pred.partyMigrationProbabilityPct >= 60);
    assert.ok(pred.analyticalVerdict.includes('Risco Elevado de Migração'));
  });
});

describe('Engenharia Sênior: Segurança CSP, CORS Restrito & API de Auditoria Criptográfica', () => {
  it('servidor deve responder com Content-Security-Policy estrito e endpoint /api/audit/:id funcional', async () => {
    const { server } = require('../src/server');

    await new Promise(resolve => server.listen(0, resolve));
    const address = server.address();
    const baseUrl = `http://localhost:${address.port}`;

    try {
      // 1. Validação de Content-Security-Policy em rota de página
      const pageRes = await fetch(`${baseUrl}/index.html`);
      assert.strictEqual(pageRes.status, 200);
      const csp = pageRes.headers.get('content-security-policy');
      assert.ok(csp, 'Deve conter cabeçalho Content-Security-Policy');
      assert.ok(csp.includes("default-src 'self'"));
      assert.ok(csp.includes("https://cdn.tailwindcss.com"));

      // 2. Validação de CORS Restrito e Preflight
      const optionsRes = await fetch(`${baseUrl}/api/candidates`, {
        method: 'OPTIONS',
        headers: { 'Origin': 'https://raioxpolitico.org' }
      });
      assert.strictEqual(optionsRes.status, 204);
      assert.strictEqual(optionsRes.headers.get('access-control-allow-origin'), 'https://raioxpolitico.org');

      // 3. Validação do Endpoint /api/audit/:id
      const auditRes = await fetch(`${baseUrl}/api/audit/cand-joao-campos`);
      assert.strictEqual(auditRes.status, 200);
      const auditJson = await auditRes.json();
      assert.strictEqual(auditJson.success, true);
      assert.ok(auditJson.audit.radarHash.startsWith('sha256:'));
      assert.strictEqual(auditJson.audit.overallScore, 74);
      assert.ok(auditJson.conflictAnalysis);
      assert.ok(auditJson.predictiveAnalysis);
      assert.ok(auditJson.predictiveAnalysis.reelectionProbabilityPct > 0);

      // 4. Validação de 404 com CSP
      const notFoundRes = await fetch(`${baseUrl}/rota-inexistente-para-teste-404`);
      assert.strictEqual(notFoundRes.status, 404);
      assert.ok(notFoundRes.headers.get('content-security-policy'));
    } finally {
      await new Promise(resolve => server.close(resolve));
    }
  });
});

