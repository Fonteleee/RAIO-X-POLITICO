// Regressões reais do site publicado (os demais testes só procuram strings nos HTMLs).
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.join(__dirname, '..');
const { candidatesData } = require('../data/candidates');

test('scripts inline de todas as páginas têm sintaxe válida (ex.: const duplicado)', () => {
  for (const file of ['index.html', 'dossie.html', 'match.html', '404.html']) {
    const html = fs.readFileSync(path.join(root, file), 'utf8');
    const re = /<script(?![^>]*\bsrc=)(?![^>]*type="application\/ld\+json")[^>]*>([\s\S]*?)<\/script>/g;
    let m, i = 0;
    while ((m = re.exec(html))) {
      i++;
      assert.doesNotThrow(() => new Function(m[1]), `${file} script inline #${i} com erro de sintaxe`);
    }
  }
});

test('links de compartilhamento respeitam o subcaminho do GitHub Pages', () => {
  for (const f of fs.readdirSync(path.join(root, 'js'))) {
    const src = fs.readFileSync(path.join(root, 'js', f), 'utf8');
    assert.ok(!/location\.origin\}\/(dossie|index)\.html/.test(src), `${f} monta URL pela origem (404 no Pages)`);
  }
});

test('páginas indexáveis têm canonical e Open Graph com imagem', () => {
  for (const file of ['index.html', 'dossie.html']) {
    const html = fs.readFileSync(path.join(root, file), 'utf8');
    assert.ok(html.includes('rel="canonical"'), `${file} sem canonical`);
    assert.ok(html.includes('property="og:image"'), `${file} sem og:image`);
  }
  assert.ok(fs.existsSync(path.join(root, 'img', 'og-image.png')));
  assert.ok(/noindex/.test(fs.readFileSync(path.join(root, 'match.html'), 'utf8')), 'match.html (protótipo) deve ser noindex');
});

test('nenhuma página depende do Tailwind CDN em runtime', () => {
  for (const file of ['index.html', 'dossie.html', 'match.html', '404.html']) {
    assert.ok(!fs.readFileSync(path.join(root, file), 'utf8').includes('cdn.tailwindcss.com'), file);
  }
});

test('dados: sem fotos duplicadas entre pessoas, sem fala padronizada e sem link placeholder', () => {
  const byHash = new Map();
  for (const c of candidatesData) {
    if (c.avatar.endsWith('.svg')) continue;
    const h = crypto.createHash('md5').update(fs.readFileSync(path.join(root, c.avatar))).digest('hex');
    byHash.set(h, [...(byHash.get(h) || []), c.id]);
  }
  const dups = [...byHash.values()].filter(v => v.length > 1);
  assert.deepStrictEqual(dups, [], 'mesma foto para pessoas diferentes');

  const quotes = new Map();
  candidatesData.forEach(c => (c.recentStatements || []).forEach(s => quotes.set(s.quote, (quotes.get(s.quote) || new Set()).add(c.id))));
  assert.strictEqual([...quotes.values()].filter(v => v.size > 1).length, 0, 'fala idêntica atribuída a vários políticos');
  assert.ok(!JSON.stringify(candidatesData).includes('dQw4w9WgXcQ'), 'link placeholder de debate');
});

test('servidor: arquivos de infraestrutura não são servidos', async () => {
  const { server } = require('../src/server');
  await new Promise(r => server.listen(0, r));
  const base = `http://127.0.0.1:${server.address().port}`;
  try {
    for (const p of ['/scripts/smoke_site.js', '/node_modules/playwright/package.json', '/docs/COMPLIANCE_JURIDICO.md', '/.github/workflows/daily_sync.yml']) {
      assert.strictEqual((await fetch(base + p)).status, 403, p);
    }
    assert.strictEqual((await fetch(base + '/api/admin/auto-update')).status, 403);
    assert.strictEqual((await fetch(base + '/api/admin/auto-update', { method: 'POST' })).status, 403);
  } finally {
    server.close();
  }
});

test('mandatários em exercício apontam para candidatos e fotos existentes', () => {
  const { incumbentsData } = require('../data/candidates');
  const ids = new Set(candidatesData.map(c => c.id));
  for (const inc of incumbentsData) {
    assert.ok(ids.has(inc.candidateId), `${inc.id}: candidateId inexistente (${inc.candidateId})`);
    if (inc.avatar && !inc.avatar.endsWith('.svg')) {
      assert.ok(fs.existsSync(path.join(root, inc.avatar)), `${inc.id}: foto inexistente ${inc.avatar}`);
    }
  }
});

test('CEAP verificada: valores reais não zerados e teto conforme tabela oficial da UF', () => {
  const limits = require('../data/ceap_limits.json');
  const verified = candidatesData.filter(c => c.salary && c.salary.ceapSource);
  assert.ok(verified.length >= 50, 'esperado CEAP oficial para os deputados verificados');
  const nonZero = verified.filter(c => c.salary.spendingCeapMonthlyNum > 0);
  assert.ok(nonZero.length / verified.length > 0.8, `CEAP zerada para ${verified.length - nonZero.length} de ${verified.length} (falha na ingestão?)`);
  for (const c of verified) {
    const official = Object.values(limits[String(c.salary.ceapSource.ano)] || {});
    assert.ok(official.includes(c.salary.limitCeapMonthlyNum), `${c.id}: teto ${c.salary.limitCeapMonthlyNum} fora da tabela oficial`);
  }
});
