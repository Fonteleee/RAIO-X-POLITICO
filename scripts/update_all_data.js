// Orquestra o pipeline de dados oficiais, em sequência. Cada etapa valida contagens mínimas e
// aborta SEM GRAVAR quando a fonte vem vazia/incompleta; aqui, qualquer falha interrompe o pipeline
// e restaura data/candidates.js e o relatório ao estado anterior (nada fica pela metade).
// Uso: node scripts/update_all_data.js [--skip=verify_official,collect_presenca]
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const { DATA_FILE, REPORT_FILE } = require('./lib/data_io');

const ETAPAS = [
  ['sanitize_data.js', 'Saneamento'],
  ['verify_official.js', 'Câmara/Senado: identidade, foto e CEAP'],
  ['verify_tse.js', 'TSE 2022/2024/2026 + Wikidata: identidade e mandato atual'],
  ['collect_presenca.js', 'Presença (Câmara) e votações nominais (Senado)'],
  ['collect_producao.js', 'Produção legislativa e emendas'],
  ['collect_siconfi.js', 'Executivo: Siconfi/RGF'],
  ['compute_indicators.js', 'Percentis, dataQuality e relatório']
];
const skip = new Set(((process.argv.find(a => a.startsWith('--skip=')) || '').slice(7)).split(',').filter(Boolean).map(s => s.replace(/\.js$/, '') + '.js'));

const backup = { data: fs.readFileSync(DATA_FILE), report: fs.existsSync(REPORT_FILE) ? fs.readFileSync(REPORT_FILE) : null };
const t0 = Date.now();
try {
  ETAPAS.forEach(([script, nome], i) => {
    if (skip.has(script)) { console.log(`\n[${i + 1}/${ETAPAS.length}] ${nome} — ignorada (--skip)`); return; }
    console.log(`\n[${i + 1}/${ETAPAS.length}] ${nome} (${script})`);
    const t = Date.now();
    execFileSync(process.execPath, [path.join(__dirname, script)], { stdio: 'inherit', cwd: path.join(__dirname, '..') });
    console.log(`   ok em ${Math.round((Date.now() - t) / 1000)}s`);
  });
  const rep = JSON.parse(fs.readFileSync(REPORT_FILE, 'utf8'));
  rep.pipeline = { concluidoEm: new Date().toISOString(), duracaoSeg: Math.round((Date.now() - t0) / 1000), etapas: ETAPAS.map(e => e[0]).filter(s => !skip.has(s)) };
  fs.writeFileSync(REPORT_FILE, JSON.stringify(rep, null, 2));
  console.log('\nPipeline concluído. Revisar:', (rep.revisar || []).length, 'perfis com alertas.');
} catch (e) {
  fs.writeFileSync(DATA_FILE, backup.data);
  if (backup.report) fs.writeFileSync(REPORT_FILE, backup.report);
  console.error('\nPipeline abortado; dados restaurados ao estado anterior.', e.message);
  process.exit(1);
}
