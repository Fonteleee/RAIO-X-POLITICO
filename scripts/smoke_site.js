// Smoke test real em navegador: carrega todos os dossiês e abas e falha se houver erro de JS.
// Uso: node scripts/smoke_site.js [baseUrl]   (requer Chrome instalado ou CHROME_PATH)
const { chromium } = require('playwright');
const { candidatesData } = require('../data/candidates.js');
const { judiciaryAuthorities } = require('../data/judiciary_authorities.js');

const BASE = (process.argv[2] || 'http://localhost:8080').replace(/\/+$/, '');
const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const TABS = ['visao-geral', 'presenca-faltas', 'historico-etico', 'gastos-ceap', 'propostas-tse',
  'projetos-leis', 'debates-falas', 'pesquisas-eleitorais', 'emendas-parlamentares', 'futuro-eleito'];

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME });
  const page = await browser.newPage();
  const errors = [];
  let ctx = '';
  page.on('pageerror', e => errors.push(`${ctx}: ${e.message}`));
  page.on('requestfailed', r => { if (r.url().startsWith(BASE)) errors.push(`${ctx}: 404/falha ${r.url()}`); });
  page.on('response', r => { if (r.url().startsWith(BASE) && r.status() >= 400) errors.push(`${ctx}: HTTP ${r.status()} ${r.url()}`); });

  const ids = [...candidatesData, ...judiciaryAuthorities].map(c => c.id);
  const sample = process.env.FULL ? ids : ids.filter((_, i) => i % 6 === 0);
  for (const id of sample) {
    ctx = `dossie ${id}`;
    await page.goto(`${BASE}/dossie.html?id=${id}`, { waitUntil: 'load' });
    await page.waitForTimeout(150);
    const name = await page.evaluate(() => document.getElementById('cand-name')?.innerText);
    if (!name || /Carregando/.test(name)) errors.push(`${ctx}: dossiê não renderizou`);
    for (const t of TABS) {
      ctx = `dossie ${id} aba ${t}`;
      await page.evaluate(t => switchTab(t, false), t).catch(e => errors.push(`${ctx}: ${e.message}`));
    }
  }

  ctx = 'index';
  await page.goto(`${BASE}/index.html`, { waitUntil: 'load' });
  await page.waitForTimeout(1500);
  for (const t of ['feed', 'ranking', 'comparator', 'match', 'incumbents', 'urna', 'gargalos']) {
    ctx = `index aba ${t}`;
    await page.evaluate(t => switchAppleTab(t), t).catch(e => errors.push(`${ctx}: ${e.message}`));
    await page.waitForTimeout(300);
  }
  const broken = await page.evaluate(() => [...document.images].filter(i => i.complete && i.naturalWidth === 0).map(i => i.src));
  broken.forEach(s => errors.push(`index: imagem quebrada ${s}`));

  await browser.close();
  console.log(`Dossiês testados: ${sample.length}`);
  if (errors.length) {
    console.error(`FALHAS (${errors.length}):\n` + [...new Set(errors)].slice(0, 40).join('\n'));
    process.exit(1);
  }
  console.log('Smoke OK: nenhum erro de JS, recurso 404 ou dossiê vazio.');
})();
