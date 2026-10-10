// Nova metodologia na interface: só indicadores oficiais com fonte, sem nota composta nem radar.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');
const I = require('../js/indicators.js');
const fx = require('./fixtures/indicators_sample.js');

const read = f => fs.readFileSync(path.join(root, f), 'utf8');
const jsFiles = fs.readdirSync(path.join(root, 'js')).filter(f => f.endsWith('.js')).map(f => `js/${f}`);
const uiFiles = [...jsFiles, 'dossie.html', 'index.html', 'match.html', '404.html'];

test('nenhuma ocorrência de "Penalidade Judicial" na interface', () => {
  for (const f of uiFiles) assert.ok(!/Penalidade Judicial/i.test(read(f)), f);
});

test('nota geral, radar e eixos inventados não são usados para exibição', () => {
  const proibidos = /overallScore|\.radar\b|type:\s*['"]radar['"]|productivityScore|systemicVisionScore|pragmaticImpactScore|generateScoreBreakdownHtml|renderRadar\(|calculateCandidateIntegrity/;
  for (const f of uiFiles) {
    const m = read(f).match(proibidos);
    assert.ok(!m, `${f} ainda usa "${m && m[0]}"`);
  }
});

test('sem fallbacks numéricos que fabricam valores (ex.: || 90, ?? 85)', () => {
  const re = /(\|\||\?\?)\s*(9[0-9]|8[0-9]|7[0-9])\b(?!\s*\))/;
  for (const f of ['dossie.html', 'js/ranking.js', 'js/apple_v2.js', 'js/comparator.js', 'js/stickers.js', 'js/indicators.js', 'js/urna.js']) {
    const m = read(f).match(re);
    assert.ok(!m, `${f} contém fallback numérico "${m && m[0]}"`);
  }
});

test('todo script inline continua com sintaxe válida', () => {
  for (const file of ['index.html', 'dossie.html', 'match.html', '404.html']) {
    const html = read(file);
    const re = /<script(?![^>]*\bsrc=)(?![^>]*type="application\/ld\+json")[^>]*>([\s\S]*?)<\/script>/g;
    let m;
    while ((m = re.exec(html))) assert.doesNotThrow(() => new Function(m[1]), `${file}: script inline inválido`);
  }
});

test('dossiê e index carregam o módulo de indicadores', () => {
  assert.ok(read('dossie.html').includes('js/indicators.js'));
  assert.ok(read('index.html').includes('js/indicators.js'));
});

test('indicadores: formatação, percentil e fonte com link e data', () => {
  const c = fx.deputadoComIndicadores;
  assert.strictEqual(I.formatValor(c.indicators.presenca), '97,5%');
  assert.match(I.formatValor(c.indicators.cotaParlamentar), /^R\$ 300\.000,00$/);
  const html = I.painelHtml(c, { universo: fx.todos });
  assert.ok(html.includes('Melhor que 72% dos Deputados federais'));
  assert.ok(html.includes('Mais econômico que 80%'));
  assert.ok(html.includes('https://www.camara.leg.br/deputados/1'));
  assert.ok(html.includes('09/10/2026'));
  assert.ok(html.includes('PL 100/2025'));
});

test('sem indicadores: mostra "Dado indisponível" e nenhum número inventado', () => {
  const html = I.painelHtml(fx.semIndicadores);
  assert.ok(html.includes('Dado indisponível — sem fonte oficial verificável'));
  assert.deepStrictEqual(I.lista(fx.semIndicadores), []);
  assert.match(I.tse2026Html(fx.semIndicadores), /dado indisponível/i);
});

test('status: falecido/sem mandato/não verificado ficam fora do ranking e ganham selo', () => {
  assert.strictEqual(I.rankeavel(fx.deputadoComIndicadores), true);
  assert.strictEqual(I.rankeavel(fx.deputadoMenor), true); // licenciado
  assert.strictEqual(I.rankeavel(fx.falecido), false);
  assert.strictEqual(I.rankeavel(fx.semIndicadores), false); // sem status nem verificação
  assert.ok(I.statusBadgeHtml(fx.falecido).includes('Falecido'));
  assert.ok(I.statusBadgeHtml(fx.deputadoMenor).includes('Licenciado'));
});

test('ranking por indicador e por grupo ordena pelo valor e exclui inelegíveis', () => {
  const src = read('js/ranking.js');
  const fn = src.slice(src.indexOf('function buildIndicatorRanking'), src.indexOf('window.buildIndicatorRanking'));
  // eslint-disable-next-line no-new-func
  const build = new Function('window', `${fn}; return buildIndicatorRanking;`)({ Indicadores: I });
  const rows = build(fx.todos, 'deputados', 'presenca');
  assert.deepStrictEqual(rows.map(r => r.cand.id), ['fx-deputado-1', 'fx-deputado-2']);
  assert.strictEqual(build(fx.todos, 'prefeitos', 'gastoPessoal').length, 0, 'falecido não entra');
  assert.strictEqual(build(fx.todos, 'senadores', 'presenca').length, 0, 'sem indicador não entra');
  assert.ok(!/sortRankingBy\('(pontuacao|ipr|factcheck)'\)/.test(read('index.html')), 'ordenações antigas removidas');
});

test('dados reais: perfis com CEAP oficial geram indicador derivado sem percentil inventado', () => {
  const { candidatesData } = require('../data/candidates.js');
  const comCeap = candidatesData.filter(c => c.salary && c.salary.ceapSource);
  for (const c of comCeap.slice(0, 10)) {
    const ind = I.indicador(c, 'cotaParlamentar');
    assert.ok(ind && typeof ind.valor === 'number' && ind.fonte && ind.consultadoEm, c.id);
  }
  // A interface funciona com ou sem `indicators` no arquivo de dados.
  for (const c of candidatesData) assert.doesNotThrow(() => I.painelHtml(c, { universo: candidatesData }), c.id);
});
