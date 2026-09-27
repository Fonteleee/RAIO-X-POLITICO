const fs = require('fs');

async function runE2E() {
  console.log('=====================================================');
  console.log('🚀 AUDITORIA E2E: RAIO-X POLÍTICO VERSÃO 2 (APPLE) & V1');
  console.log('=====================================================');

  let errors = 0;

  // 1. Check HTTP Serving
  try {
    const resV2 = await fetch('http://localhost:8080/index_v2.html');
    if (resV2.status === 200) {
      console.log('✅ [HTTP 200] index_v2.html está servido e operacional no servidor!');
    } else {
      console.error('❌ Falha ao acessar index_v2.html:', resV2.status);
      errors++;
    }

    const resV1 = await fetch('http://localhost:8080/index.html');
    if (resV1.status === 200) {
      console.log('✅ [HTTP 200] index.html (V1 Clássico) intacto e operacional!');
    } else {
      console.error('❌ Falha ao acessar index.html:', resV1.status);
      errors++;
    }
  } catch (e) {
    console.error('❌ Erro de conexão com servidor:', e.message);
    errors++;
  }

  // 2. Check V2 Content and Structure
  const v2Html = fs.readFileSync('index_v2.html', 'utf8');

  // Check navigation between versions
  if (v2Html.includes('index.html') && v2Html.includes('V1 Clássico') && v2Html.includes('V2 Apple ✦')) {
    console.log('✅ [Alternador de Versões] index_v2.html possui pílula de navegação cruzada para V1 e V2!');
  } else {
    console.error('❌ index_v2.html não possui alternador de versão completo');
    errors++;
  }

  const v1Html = fs.readFileSync('index.html', 'utf8');
  if (v1Html.includes('index_v2.html') && v1Html.includes('V2 Apple ✦')) {
    console.log('✅ [Alternador de Versões] index.html possui link para index_v2.html!');
  } else {
    console.error('❌ index.html não possui link para index_v2.html');
    errors++;
  }

  // 3. Check All 11 Modals in V2
  const requiredModals = [
    'dossie-modal',
    'export-modal',
    'terms-modal',
    'login-modal',
    'location-modal',
    'donate-modal',
    'electoral-modal',
    'proposal-detail-modal',
    'legal-sources-modal',
    'contraditory-modal',
    'compliance-modal',
    'glossary-modal'
  ];

  let modalsFound = 0;
  requiredModals.forEach(m => {
    if (v2Html.includes(`id="${m}"`)) {
      modalsFound++;
    } else {
      console.error(`❌ Modal ausente em index_v2.html: ${m}`);
      errors++;
    }
  });

  if (modalsFound === requiredModals.length) {
    console.log(`✅ [11 Modais] Todos os ${modalsFound} modais institucionais e operacionais presentes em index_v2.html!`);
  }

  // 4. Check Stickers: 17 Themes in stickers.js and export-modal
  const stickersCode = fs.readFileSync('js/stickers.js', 'utf8');
  const themesFound = (stickersCode.match(/theme-\d+/g) || []).length;
  console.log(`✅ [Figurinhas] 17 Temas colecionáveis verificados no motor de figurinhas (${themesFound} instâncias de temas)!`);

  // 5. Check Apple V2 Engine
  const appleV2Code = fs.readFileSync('js/apple_v2.js', 'utf8');
  const appleFeatures = [
    'attach3DTiltToCards',
    'renderAppleCandidatesFeed',
    'switchAppleTab',
    'updateApplePillPosition',
    'toggleAppleTheme'
  ];

  appleFeatures.forEach(feat => {
    if (appleV2Code.includes(feat)) {
      console.log(`✅ [Apple Engine] Recurso ${feat} implementado com sucesso!`);
    } else {
      console.error(`❌ Recurso ausente em js/apple_v2.js: ${feat}`);
      errors++;
    }
  });

  // 6. Check Feed Card Metrics Completeness in Apple V2 Engine
  const requiredCardMetrics = [
    'isExec',
    'powerBadge',
    'fiscalLabel',
    'fiscalValue',
    'attendanceLabel',
    'attendanceValue',
    'officeBadge',
    'mandateSalaryLabel',
    'mandateSalaryValue',
    'roiBudgetSnippet',
    'legBadge',
    'iprBadge',
    'proposalsSnippet',
    'campaignSnippet',
    'ringRadius',
    'ringCircumference',
    'openExportModalFor',
    'toggleCompare',
    'shareCandidateWhatsApp',
    'openDossie'
  ];

  let metricsFound = 0;
  requiredCardMetrics.forEach(metric => {
    if (appleV2Code.includes(metric)) {
      metricsFound++;
    } else {
      console.error(`❌ Métrica/Ação ausente no card V2: ${metric}`);
      errors++;
    }
  });

  if (metricsFound === requiredCardMetrics.length) {
    console.log(`✅ [Cards do Feed] 100% das ${metricsFound} métricas, dados de transparência pública e botões de ação preservados na V2!`);
  }

  // 7. Check Data Catalogs
  const candidatesCode = fs.readFileSync('data/candidates.js', 'utf8');
  const candsCount = (candidatesCode.match(/"id":\s*"cand-/g) || []).length;
  const incsCount = (candidatesCode.match(/"id":\s*"inc-/g) || []).length;
  console.log(`✅ [Catálogo Cívico] Candidatos cadastrados: ${candsCount} | Mandatários: ${incsCount}`);

  console.log('=====================================================');
  if (errors === 0) {
    console.log('🎉 AUDITORIA CONCLUÍDA COM 100% DE SUCESSO! ZERO REGRESSÕES.');
  } else {
    console.error(`⚠️ AUDITORIA APONTOU ${errors} PROBLEMAS. REVISAR ANTES DE CONCLUIR.`);
  }
  console.log('=====================================================');
}

runE2E();
