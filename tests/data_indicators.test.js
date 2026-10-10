// Contrato de dados dos indicadores oficiais (scripts/update_all_data.js → data/candidates.js).
const { test, describe } = require('node:test');
const assert = require('node:assert');
const { loadCandidates } = require('../scripts/lib/data_io');

const { list } = loadCandidates();
const byId = id => list.find(c => c.id === id);
const CHAVES = ['presenca', 'participacaoVotacoes', 'cotaParlamentar', 'producaoLegislativa', 'emendas', 'gastoPessoal'];
const GRUPOS = new Set(['Deputados federais', 'Senadores', 'Governadores', 'Prefeitos']);
const STATUS = new Set(['em_exercicio', 'licenciado', 'sem_mandato', 'falecido', 'nao_verificado']);

describe('Contrato de indicadores oficiais', () => {
  test('cada indicador segue o formato combinado com a interface', () => {
    let total = 0;
    for (const c of list) {
      for (const [k, ind] of Object.entries(c.indicators || {})) {
        total++;
        assert.ok(CHAVES.includes(k), `${c.id}: chave desconhecida ${k}`);
        assert.strictEqual(typeof ind.valor, 'number', `${c.id}.${k}.valor`);
        assert.ok(Number.isFinite(ind.valor) && ind.valor >= 0, `${c.id}.${k}.valor inválido`);
        assert.ok(['%', 'R$', 'qtd'].includes(ind.unidade), `${c.id}.${k}.unidade`);
        for (const f of ['rotulo', 'detalhe', 'fonte', 'url', 'grupoComparacao']) assert.ok(typeof ind[f] === 'string' && ind[f].length > 0, `${c.id}.${k}.${f} ausente`);
        assert.match(ind.url, /^https:\/\//, `${c.id}.${k}.url deve ser https`);
        assert.ok(GRUPOS.has(ind.grupoComparacao), `${c.id}.${k}.grupoComparacao`);
        assert.match(ind.consultadoEm, /^\d{4}-\d{2}-\d{2}$/);
        assert.ok(Number.isInteger(ind.ano) && ind.ano >= 2023, `${c.id}.${k}.ano`);
        assert.ok(ind.percentil === null || (Number.isInteger(ind.percentil) && ind.percentil >= 0 && ind.percentil <= 100), `${c.id}.${k}.percentil fora de 0–100`);
        if (ind.unidade === '%' && k !== 'cotaParlamentar') assert.ok(ind.valor <= 100, `${c.id}.${k} acima de 100%`);
      }
    }
    assert.ok(total > 100, `esperava mais de 100 indicadores, há ${total}`);
  });

  test('nenhum indicador zerado em massa e cobertura mínima', () => {
    const min = { presenca: 60, cotaParlamentar: 60, producaoLegislativa: 80, emendas: 60, participacaoVotacoes: 15 };
    for (const k of CHAVES) {
      const vals = list.map(c => c.indicators && c.indicators[k]).filter(Boolean);
      if (min[k]) assert.ok(vals.length >= min[k], `${k}: só ${vals.length} perfis (mínimo ${min[k]})`);
      if (vals.length >= 10) {
        const zeros = vals.filter(v => v.valor === 0).length;
        assert.ok(zeros / vals.length <= 0.5, `${k}: ${zeros} de ${vals.length} com valor zero`);
        assert.ok(new Set(vals.map(v => v.valor)).size > 3, `${k}: valores sem variação (constante?)`);
      }
    }
  });

  test('percentil da cota parlamentar indica economia (menor gasto = percentil maior)', () => {
    const vals = list.map(c => c.indicators && c.indicators.cotaParlamentar).filter(v => v && v.percentil !== null);
    const menor = vals.reduce((a, b) => (b.valor < a.valor ? b : a));
    const maior = vals.reduce((a, b) => (b.valor > a.valor ? b : a));
    assert.ok(menor.percentil > maior.percentil);
    assert.match(menor.detalhe, /economia/i);
  });

  test('produção legislativa traz destaques com link oficial', () => {
    for (const c of list) {
      const p = c.indicators && c.indicators.producaoLegislativa;
      if (!p) continue;
      assert.ok(Array.isArray(p.destaques) && p.destaques.length <= 5, `${c.id}: destaques`);
      for (const d of p.destaques) {
        assert.ok(['PL', 'PLP', 'PEC'].includes(d.sigla));
        assert.match(d.url, /^https:\/\//);
      }
    }
  });

  test('presença oficial bate com o relatório da Câmara (Carlos Jordy 2025)', () => {
    const p = byId('cand-carlos-jordy').indicators.presenca;
    assert.strictEqual(p.valor, 99.17);
    assert.match(p.detalhe, /120 de 121 dias/);
    assert.match(p.url, /camara\.leg\.br\/deputados\/204460\/presenca-plenario\/2025/);
  });
});

describe('Identidade e mandato atual', () => {
  test('todo perfil tem status válido', () => {
    for (const c of list) {
      assert.ok(c.status && STATUS.has(c.status.situacao), `${c.id}: status inválido`);
      assert.ok(c.dataQuality && Array.isArray(c.dataQuality.indicadoresOficiais) && Array.isArray(c.dataQuality.semFonte), `${c.id}: dataQuality`);
    }
  });

  test('Fuad Noman aparece como falecido', () => {
    const f = byId('cand-fuad-noman');
    assert.strictEqual(f.status.situacao, 'falecido');
    assert.doesNotMatch(f.position, /^Prefeito$/);
    assert.ok(!f.indicators || !f.indicators.gastoPessoal);
  });

  test('Alckmin e Haddad não aparecem como Governador', () => {
    assert.doesNotMatch(byId('cand-geraldo-alckmin').position, /^Governador/);
    assert.match(byId('cand-geraldo-alckmin').position, /Vice-Presidente/);
    assert.doesNotMatch(byId('cand-fernando-haddad').position, /^Governador/);
  });

  test('Ratinho Júnior governador e Ricardo Nunes prefeito em exercício', () => {
    assert.strictEqual(byId('cand-ratinho-junior').status.situacao, 'em_exercicio');
    assert.match(byId('cand-ratinho-junior').position, /^Governador/);
    assert.strictEqual(byId('cand-ricardo-nunes').status.situacao, 'em_exercicio');
    assert.match(byId('cand-ricardo-nunes').position, /^Prefeito/);
  });

  test('número de urna e partido iguais ao TSE 2026 quando houver', () => {
    let n = 0;
    for (const c of list) {
      if (!c.tse2026) continue;
      n++;
      assert.strictEqual(String(c.number), String(c.tse2026.numero), `${c.id}: número`);
      for (const f of ['cargo', 'uf', 'numero', 'partido', 'situacaoTurno', 'turno', 'sqCandidato', 'fonte', 'consultadoEm']) assert.ok(c.tse2026[f] != null, `${c.id}.tse2026.${f}`);
    }
    assert.ok(n >= 100, `só ${n} perfis com tse2026`);
  });

  test('alertas de revisão têm tipo, mensagem e fonte', () => {
    for (const c of list) for (const a of c.reviewAlerts || []) {
      assert.ok(a.tipo && a.mensagem, `${c.id}: alerta incompleto`);
      assert.ok('fonte' in a);
    }
  });
});
