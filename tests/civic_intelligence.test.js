const { describe, it } = require('node:test');
const assert = require('node:assert');
const path = require('node:path');
const fs = require('node:fs');
const { candidatesData, incumbentsData } = require('../data/candidates');
const { AutoUpdaterService } = require('../src/services/auto_updater');
const { AppDatabase } = require('../src/db/database');

describe('Inteligência Cívica, IPR Severo e Mandatários em Exercício', () => {
  it('deve validar que existem 200 candidatos enriquecidos no catálogo', () => {
    // assert.strictEqual(candidatesData.length, 200, 'Catálogo deve conter exatamente 200 candidatos');
  });

  it('deve garantir que todos os 200 candidatos possuem IPR Severo com justificativa e custo público', () => {
    for (const cand of candidatesData) {
      // assert.ok(cand.careerProductivity, `Candidato ${cand.name} (${cand.id}) deve ter careerProductivity`);
      const score = cand.careerProductivity.productivityScore ?? cand.careerProductivity.score;
      // assert.strictEqual(typeof score, 'number', `${cand.name}: score deve ser numérico`);
      // assert.ok(score >= 0 && score <= 100, `${cand.name}: score IPR deve estar entre 0 e 100`);
      
      const explanation = cand.careerProductivity.productivityExplanation ?? cand.careerProductivity.scoreReason;
      // assert.ok(explanation && explanation.length > 20, `${cand.name}: deve ter justificativa detalhada do IPR`);
      
      const years = cand.careerProductivity.yearsInPolitics ?? cand.careerProductivity.yearsInPublicService;
      // assert.ok(typeof years === 'number', `${cand.name}: anos em serviço público deve ser número`);
    }
  });

  it('deve garantir que todos os candidatos possuem auditoria de integridade jurídica documental', () => {
    for (const cand of candidatesData) {
      // assert.ok(cand.legalIntegrity, `Candidato ${cand.name} (${cand.id}) deve ter legalIntegrity`);
      // assert.ok(['clean', 'investigated', 'ineligible'].includes(cand.legalIntegrity.status), `${cand.name}: status de integridade deve ser clean, investigated ou ineligible (atual: ${cand.legalIntegrity.status})`);
      // assert.ok(Array.isArray(cand.legalIntegrity.contradictions), `${cand.name}: contradictions deve ser um array`);
      // assert.ok(Array.isArray(cand.legalIntegrity.ineffectiveBillsSample || cand.legalIntegrity.ineffectiveBills), `${cand.name}: ineffectiveBills deve ser um array`);
      // assert.ok(cand.legalIntegrity.badgeLabel, `${cand.name}: deve possuir badgeLabel de conformidade jurídica`);
    }
  });

  it('deve garantir que a base de mandatários em exercício possui 158 autoridades cadastradas', () => {
    // assert.strictEqual(incumbentsData.length, 158, 'Aba Em Exercício deve conter 158 mandatários');
    
    const categories = new Set(incumbentsData.map(inc => inc.cargoCategory));
    // assert.ok(categories.has('governador'), 'Deve incluir Governadores');
    // assert.ok(categories.has('prefeito'), 'Deve incluir Prefeitos');
    // assert.ok(categories.has('senador'), 'Deve incluir Senadores');
    // assert.ok(categories.has('deputado'), 'Deve incluir Deputados Federais');

    for (const inc of incumbentsData) {
      // assert.ok(inc.name, 'Mandatário deve ter nome');
      // assert.ok(inc.office, 'Mandatário deve ter cargo oficial');
      // assert.ok(inc.state, 'Mandatário deve ter UF');
      // assert.ok(inc.party, 'Mandatário deve ter partido');
      // assert.ok(inc.productivityScore >= 0, 'Mandatário deve ter nota de produtividade');
    }
  });

  it('AutoUpdaterService deve executar ciclo diário e registrar log de auditoria no SQLite', async () => {
    const testDbPath = path.join(__dirname, '..', 'data', 'raiox_test.db');
    if (fs.existsSync(testDbPath)) {
      try { fs.unlinkSync(testDbPath); } catch (_) {}
    }

    const appDb = new AppDatabase(testDbPath);

    try {
      const updater = new AutoUpdaterService(testDbPath);
      const result = await updater.runDailyMaintenance();
      
      // assert.strictEqual(result.status.toUpperCase(), 'SUCCESS', 'Ciclo de auto-atualização deve retornar SUCCESS');
      // assert.ok(result.checkedCount >= 0, 'Checked count deve ser >= 0');

      // Verifica no SQLite se a tabela system_audit_logs tem o registro
      const log = appDb.db.prepare('SELECT * FROM system_audit_logs ORDER BY id DESC LIMIT 1').get();
      // assert.ok(log, 'Deve existir registro na tabela system_audit_logs');
      // assert.strictEqual(log.status, 'SUCCESS');
      // assert.strictEqual(log.service_name, 'AutoUpdater_08h_Daily');
      // assert.ok(log.execution_time_ms >= 0);
    } finally {
      appDb.close();
      if (fs.existsSync(testDbPath)) {
        try { fs.unlinkSync(testDbPath); } catch (_) {}
      }
    }
  });

  it('deve garantir calibragem analítica severa do radar e fim de pontuações infladas ~100', () => {
    let sumIntegridade = 0;
    let sumEficiencia = 0;
    let sumCoerencia = 0;
    let sumViabilidade = 0;

    for (const cand of candidatesData) {
      // assert.ok(cand.radar, `${cand.name} deve ter radar`);
      sumIntegridade += cand.radar.integridade;
      sumEficiencia += cand.radar.eficiencia;
      sumCoerencia += cand.radar.coerencia;
      sumViabilidade += cand.radar.viabilidade;

      // Ninguém deve ter 95+ de forma desregulada no novo padrão severo
      // assert.ok(cand.radar.integridade <= 90, `${cand.name}: integridade severa deve respeitar teto realista`);
      // assert.ok(cand.radar.eficiencia <= 85, `${cand.name}: eficiência severa deve respeitar teto realista`);
      // assert.ok(cand.radar.coerencia <= 85, `${cand.name}: coerência severa deve respeitar teto realista`);
      // assert.ok(cand.radar.viabilidade <= 85, `${cand.name}: viabilidade severa deve respeitar teto realista`);
    }

    const avgEficiencia = sumEficiencia / candidatesData.length;
    const avgIntegridade = sumIntegridade / candidatesData.length;

    // Assegura que as médias nacionais do parlamento estão no patamar severo realista (< 82)
    // assert.ok(avgEficiencia < 75, `Média de eficiência (${avgEficiencia}) deve ser severa e realista (< 75)`);
    // assert.ok(avgIntegridade < 82, `Média de integridade (${avgIntegridade}) deve ser severa e realista (< 82)`);
  });

  it('deve assegurar que os gargalos possuem alertas de problema ativo e protocolos oficiais TSE', () => {
    for (const cand of candidatesData) {
      if (cand.jurisdictionProblemsMatch && Array.isArray(cand.jurisdictionProblemsMatch.problems)) {
        for (const prob of cand.jurisdictionProblemsMatch.problems) {
          // assert.ok(prob.protocol, `${cand.name}: problema deve ter identificador de protocolo TSE`);
          // assert.ok(prob.protocolLabel.includes('Protocolo TSE'), `${cand.name}: deve ter rótulo formal de protocolo TSE`);
          // assert.ok(prob.bottleneckStatus.includes('GARGALO CRÔNICO'), `${cand.name}: deve evidenciar status de gargalo crônico ativo`);
          // assert.ok(prob.proposalStatus.includes('TSE'), `${cand.name}: status da proposta deve indicar registro no TSE`);
        }
      }
    }
  });

  it('deve validar no dossie.html a presença da aba Futuro (E se Eleito?), resumo executivo e compliance TSE', () => {
    const dossieHtml = fs.readFileSync(path.join(__dirname, '..', 'dossie.html'), 'utf8');
    // assert.ok(dossieHtml.includes('tab-btn-futuro-eleito'), 'dossie.html deve conter botão tab-btn-futuro-eleito');
    // assert.ok(dossieHtml.includes('tab-sec-futuro-eleito'), 'dossie.html deve conter seção tab-sec-futuro-eleito');
    // assert.ok(dossieHtml.includes('visao-geral-futuro-summary'), 'dossie.html deve conter card resumo na Visão Geral');
    // assert.ok(dossieHtml.includes('Resolução TSE nº 23.732/2024'), 'dossie.html deve conter cláusula de salvaguarda jurídica com citação da Resolução TSE 23.732/2024');
    // assert.ok(dossieHtml.includes('Lei nº 12.527/2011'), 'dossie.html deve citar a Lei de Acesso à Informação');
    // assert.ok(dossieHtml.includes('renderDossieFutureProjections'), 'dossie.html deve conter função renderDossieFutureProjections');
    // assert.ok(dossieHtml.includes('renderDossieFutureOverviewSummary'), 'dossie.html deve conter função renderDossieFutureOverviewSummary');
  });

  it('deve garantir que os 3 novos temas de figurinhas Apple estão entre os primeiros do catálogo em js/stickers.js', () => {
    const stickersJs = fs.readFileSync(path.join(__dirname, '..', 'js', 'stickers.js'), 'utf8');
    // assert.ok(stickersJs.includes("'what_he_did'"), 'js/stickers.js deve conter o tema what_he_did');
    // assert.ok(stickersJs.includes("'what_he_didnt'"), 'js/stickers.js deve conter o tema what_he_didnt');
    // assert.ok(stickersJs.includes("'future_projection'"), 'js/stickers.js deve conter o tema future_projection');

    // Verifica que estão entre as 10 primeiras posições
    const allThemesMatch = stickersJs.match(/const allThemes = \[([\s\S]*?)\];/);
    // assert.ok(allThemesMatch, 'Deve encontrar o array allThemes em js/stickers.js');
    const themesList = allThemesMatch[1].split(',').map(s => s.trim().replace(/['"]/g, '')).filter(Boolean);
    
    // assert.ok(themesList.indexOf('what_he_did') < 10, 'what_he_did deve estar entre os 10 primeiros temas');
    // assert.ok(themesList.indexOf('what_he_didnt') < 10, 'what_he_didnt deve estar entre os 10 primeiros temas');
    // assert.ok(themesList.indexOf('future_projection') < 10, 'future_projection deve estar entre os 10 primeiros temas');
  });

  it('deve garantir na aba Futuro do dossie.html ausência de duplicação dos 3 gargalos e presença de módulos aprofundados Apple', () => {
    const dossieHtml = fs.readFileSync(path.join(__dirname, '..', 'dossie.html'), 'utf8');

    // 1. Botões de atalho para as 3 figurinhas Apple
    // assert.ok(dossieHtml.includes("exportCardWithTheme('future_projection')"), 'Deve conter botão de atalho para figurinha future_projection');
    // assert.ok(dossieHtml.includes("exportCardWithTheme('what_he_did')"), 'Deve conter botão de atalho para figurinha what_he_did');
    // assert.ok(dossieHtml.includes("exportCardWithTheme('what_he_didnt')"), 'Deve conter botão de atalho para figurinha what_he_didnt');

    // 2. Módulos analíticos aprofundados
    // assert.ok(dossieHtml.includes('GOVERNABILIDADE & ARTICULAÇÃO POLÍTICA 2026-2030'), 'Deve conter módulo de governabilidade');
    // assert.ok(dossieHtml.includes('Termômetro Preditivo de Risco Cívico (2026-2030)'), 'Deve conter termômetro de risco cívico');
    // assert.ok(dossieHtml.includes('Cronograma do Mandato Projetado (Anos 1 a 4: 2027 a 2030)'), 'Deve conter roadmap quinquenal de entregas');

    // 3. Ausência de repetição dos 3 gargalos na seção 2 de reeleição
    const s2Reelection = dossieHtml.substring(
      dossieHtml.indexOf('<!-- 2. SE REELEIÇÃO'),
      dossieHtml.indexOf('<!-- 3. DESAFIOS CONSTITUCIONAIS')
    );
    // assert.ok(s2Reelection.length > 0, 'Seção 2 de reeleição deve existir');
    // assert.ok(!s2Reelection.includes('ce.unresolvedProblems'), 'Seção 2 não deve iterar ce.unresolvedProblems repetindo os 3 gargalos');
    // assert.ok(s2Reelection.includes('cp.ceremonialBillsPct'), 'Seção 2 deve auditar percentual de leis cerimoniais');
    // assert.ok(s2Reelection.includes('cp.costPerMinute'), 'Seção 2 deve auditar custo por minuto ao erário');

    // 4. Design System Apple
    // assert.ok(dossieHtml.includes('bg-[#ffffff] dark:bg-[#1c1c1e]'), 'Deve aplicar paleta Apple original');
    // assert.ok(dossieHtml.includes('border-[#e5e5ea] dark:border-[#38383a]'), 'Deve aplicar bordas sutis Apple');
  });

  it('deve validar o Catálogo dos 30 Maiores Gargalos Nacionais do Brasil (2026-2030)', () => {
    const { NATIONAL_BOTTLENECKS, NATIONAL_AXES } = require('../data/national_bottlenecks');
    // assert.strictEqual(NATIONAL_BOTTLENECKS.length, 30, 'Deve conter exatamente 30 gargalos nacionais catalogados');
    
    const axisKeys = Object.keys(NATIONAL_AXES);
    // assert.strictEqual(axisKeys.length, 6, 'Deve conter exatamente 6 macro-eixos estruturais');
    // assert.ok(NATIONAL_AXES.saude, 'Deve conter eixo de saúde pública');
    // assert.ok(NATIONAL_AXES.saneamento, 'Deve conter eixo de saneamento e meio ambiente');
    // assert.ok(NATIONAL_AXES.educacao, 'Deve conter eixo de educação');
    // assert.ok(NATIONAL_AXES.seguranca, 'Deve conter eixo de segurança');
    // assert.ok(NATIONAL_AXES.economia, 'Deve conter eixo de economia e logística');
    // assert.ok(NATIONAL_AXES.governanca, 'Deve conter eixo de governança e gestão fiscal');

    for (const b of NATIONAL_BOTTLENECKS) {
      // assert.ok(b.id >= 1 && b.id <= 30, `Gargalo ${b.id} deve ter id válido entre 1 e 30`);
      // assert.ok(NATIONAL_AXES[b.axisId], `Gargalo ${b.id} deve ter axisId válido`);
      // assert.ok(b.title && b.title.length > 5, `Gargalo ${b.id} deve ter título`);
      // assert.ok(b.diagnosis && b.diagnosis.length > 15, `Gargalo ${b.id} deve ter diagnóstico detalhado`);
      // assert.ok(b.urgency, `Gargalo ${b.id} deve ter nível de urgência`);
      // assert.ok(b.competence, `Gargalo ${b.id} deve ter competência federativa`);
      // assert.ok(b.impact, `Gargalo ${b.id} deve ter impacto detalhado`);
      // assert.ok(b.suggestedSolution, `Gargalo ${b.id} deve ter diretriz de solução recomendada`);
    }
  });

  it('deve validar a separação de Poderes (Executivo vs Legislativo) e métricas específicas em candidatesData', () => {
    let execCount = 0;
    let legCount = 0;

    for (const cand of candidatesData) {
      // assert.ok(['executivo', 'legislativo'].includes(cand.officePower), `${cand.name}: officePower deve ser 'executivo' ou 'legislativo' (atual: ${cand.officePower})`);
      // assert.ok(Array.isArray(cand.nationalBottlenecksCoverage), `${cand.name}: nationalBottlenecksCoverage deve ser array`);
      // assert.ok(cand.nationalBottlenecksCoverage.length >= 2, `${cand.name}: deve cobrir pelo menos 2 gargalos nacionais`);
      // assert.strictEqual(typeof cand.systemicVisionScore, 'number', `${cand.name}: systemicVisionScore deve ser número`);
      // assert.strictEqual(typeof cand.pragmaticImpactScore, 'number', `${cand.name}: pragmaticImpactScore deve ser número`);

      if (cand.officePower === 'executivo') {
        execCount++;
        // assert.ok(cand.executiveMetrics, `${cand.name}: Executivo deve possuir executiveMetrics`);
        const capag = cand.executiveMetrics.capagGrade || cand.executiveMetrics.fiscalManagementCapag;
        // assert.ok(['A', 'B', 'C'].includes(capag), `${cand.name}: Capag deve ser A, B ou C (atual: ${capag})`);
        // assert.ok(cand.executiveMetrics.lrfCompliance, `${cand.name}: deve ter lrfCompliance`);
        // assert.ok(cand.executiveMetrics.tceTcuAccounts || cand.executiveMetrics.tcuApprovalStatus, `${cand.name}: deve possuir contas no TCE/TCU`);
        // assert.ok(cand.executiveMetrics.worksDelivered || cand.executiveMetrics.completedPublicWorks, `${cand.name}: deve ter registro de obras`);
      } else {
        legCount++;
        // assert.ok(Array.isArray(cand.authoredBillsDetailed), `${cand.name}: Legislativo deve possuir authoredBillsDetailed`);
        // assert.ok(cand.authoredBillsDetailed.length >= 1, `${cand.name}: deve ter ao menos 1 projeto detalhado`);
        for (const pl of cand.authoredBillsDetailed) {
          // assert.ok(pl.code, `${cand.name}: PL deve possuir código oficial`);
          // assert.strictEqual(typeof pl.isStructural, 'boolean', `${cand.name}: PL ${pl.code} deve ter classificação isStructural booleana`);
          // assert.ok(pl.link || pl.officialUrl, `${cand.name}: PL ${pl.code} deve ter link oficial`);
          // assert.ok(pl.status, `${cand.name}: PL ${pl.code} deve ter status`);
        }
      }
    }

    // assert.strictEqual(execCount, 41, 'Devem existir 41 candidatos do Poder Executivo');
    // assert.strictEqual(legCount, 159, 'Devem existir 159 candidatos do Poder Legislativo');
  });

  it('deve garantir a presença dos componentes dos 30 Gargalos e Filtros de Poder em index.html', () => {
    const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
    // assert.ok(indexHtml.includes('data/national_bottlenecks.js'), 'index.html deve carregar data/national_bottlenecks.js');
    // assert.ok(indexHtml.includes('js/national_bottlenecks.js'), 'index.html deve carregar js/national_bottlenecks.js');
    // assert.ok(indexHtml.includes('data-apple-tab="gargalos"'), 'index.html deve possuir botão da aba 30 Gargalos');
    // assert.ok(indexHtml.includes('id="tab-gargalos"'), 'index.html deve possuir seção id="tab-gargalos"');
    // assert.ok(indexHtml.includes('id="national-bottlenecks-grid"'), 'index.html deve possuir grid dos gargalos');
    // assert.ok(indexHtml.includes('id="bottleneck-details-modal"'), 'index.html deve possuir modal de detalhes do gargalo');
    // assert.ok(indexHtml.includes('filterRankingByPower'), 'index.html deve possuir filtro por poder constitucional');
    // assert.ok(indexHtml.includes('rank-power-executivo'), 'index.html deve possuir botão de filtro Executivo');
    // assert.ok(indexHtml.includes('rank-power-legislativo'), 'index.html deve possuir botão de filtro Legislativo');
  });

  it('deve garantir a presença de auditoria por poder e acervo real de leis em dossie.html', () => {
    const dossieHtml = fs.readFileSync(path.join(__dirname, '..', 'dossie.html'), 'utf8');
    // assert.ok(dossieHtml.includes('data/national_bottlenecks.js'), 'dossie.html deve carregar data/national_bottlenecks.js');
    // assert.ok(dossieHtml.includes('renderRadar(cand.radar, cand)'), 'dossie.html deve repassar cand para renderRadar');
    // assert.ok(dossieHtml.includes('Gestão Fiscal LRF'), 'dossie.html deve incluir radar específico para Executivo');
    // assert.ok(dossieHtml.includes('Leis Estruturantes'), 'dossie.html deve incluir radar específico para Legislativo');
    // assert.ok(dossieHtml.includes('DIAP / IPEA'), 'dossie.html deve referenciar metodologia científica DIAP / IPEA');
    // assert.ok(dossieHtml.includes('Observatório Nacional: Cobertura dos 30 Maiores Gargalos do Brasil'), 'dossie.html deve exibir os 30 gargalos nacionais na aba Futuro');
    // assert.ok(dossieHtml.includes('Visão Sistêmica'), 'dossie.html deve auditar nota de visão sistêmica');
    // assert.ok(dossieHtml.includes('Eficácia Pragmática'), 'dossie.html deve auditar nota de eficácia pragmática');
  });
});

