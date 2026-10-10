// Fase 4 — Executivo: despesa com pessoal ÷ RCL ajustada (RGF, Siconfi/Tesouro Nacional).
// Só para governadores e prefeitos EM EXERCÍCIO (cand.status, gravado por verify_tse.js).
// Capag: sem API oficial estável (apenas planilhas no Tesouro Transparente) — fica de fora.
// Uso: node scripts/collect_siconfi.js [--dry] [--ano=2025]
const { loadCandidates, writeReportSection, getJson, sleep, norm } = require('./lib/data_io');
const { GRUPOS, indicador, setIndicator, fmtPct } = require('./lib/indicators');

const dry = process.argv.includes('--dry');
const ANO = Number((process.argv.find(a => a.startsWith('--ano=')) || '').slice(6)) || new Date().getFullYear() - 1;
const UF_IBGE = { RO: 11, AC: 12, AM: 13, RR: 14, PA: 15, AP: 16, TO: 17, MA: 21, PI: 22, CE: 23, RN: 24, PB: 25, PE: 26, AL: 27, SE: 28, BA: 29, MG: 31, ES: 32, RJ: 33, SP: 35, PR: 41, SC: 42, RS: 43, MS: 50, MT: 51, GO: 52, DF: 53 };
const rgfUrl = (esfera, id, per, nr) => `https://apidatalake.tesouro.gov.br/ords/siconfi/tt/rgf?an_exercicio=${ANO}&in_periodicidade=${per}&nr_periodo=${nr}&co_tipo_demonstrativo=RGF&co_esfera=${esfera}&co_poder=E&id_ente=${id}`;

async function municipioIbge(nome, uf) {
  const j = await getJson(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
  const m = (j || []).find(x => norm(x.nome) === norm(nome));
  return m ? m.id : null;
}

async function dtp(esfera, id) {
  for (const [per, nr] of [['Q', 3], ['S', 2]]) {
    const url = rgfUrl(esfera, id, per, nr);
    const j = await getJson(url);
    const it = (j && j.items) || [];
    const row = it.find(i => /DESPESA TOTAL COM PESSOAL - DTP/i.test(i.conta) && /% sobre a RCL Ajustada/i.test(i.coluna));
    if (row) return { valor: Math.round(Number(row.valor) * 100) / 100, url, periodo: per === 'Q' ? '3º quadrimestre' : '2º semestre' };
  }
  return null;
}

(async () => {
  const { list, save } = loadCandidates();
  const rep = { ano: ANO, consultados: 0, comDado: 0, semDado: [], validacao: null };
  for (const c of list) {
    const s = c.status || {};
    const gov = s.situacao === 'em_exercicio' && s.cargo === 'GOVERNADOR';
    const pref = s.situacao === 'em_exercicio' && s.cargo === 'PREFEITO';
    if (!gov && !pref) { setIndicator(c, 'gastoPessoal', null); continue; }
    rep.consultados++;
    const id = gov ? UF_IBGE[s.uf] : await municipioIbge(s.municipio, s.uf);
    const r = id ? await dtp(gov ? 'E' : 'M', id) : null;
    await sleep(300);
    if (!r) { rep.semDado.push(c.id); setIndicator(c, 'gastoPessoal', null); continue; }
    rep.comDado++;
    const limite = gov ? 49 : 54;
    const ente = gov ? `Poder Executivo do estado (${s.uf})` : `Prefeitura de ${s.municipio} (${s.uf})`;
    setIndicator(c, 'gastoPessoal', indicador({
      valor: r.valor, unidade: '%', rotulo: 'Despesa com pessoal / RCL',
      detalhe: `${ente}: ${fmtPct(r.valor)} da receita corrente líquida ajustada com pessoal em ${ANO} (${r.periodo}). Limite da LRF: ${limite}% (${gov ? 'Executivo estadual' : 'Executivo municipal'}); limite prudencial ${gov ? '46,55' : '51,3'}%.`,
      grupoComparacao: gov ? GRUPOS.governador : GRUPOS.prefeito,
      fonte: 'Tesouro Nacional — Siconfi, Relatório de Gestão Fiscal (Anexo 1)', url: r.url, ano: ANO,
      limiteLRF: limite, idEnte: id
    }));
    if (gov && s.uf === 'SP' && ANO === 2025) rep.validacao = { ente: 'SP', esperado: 41.29, obtido: r.valor, ok: Math.abs(r.valor - 41.29) < 0.01 };
  }
  console.log(JSON.stringify(rep));
  if (rep.consultados && rep.comDado < rep.consultados * 0.5) throw new Error('Siconfi: menos da metade dos entes com RGF; abortando sem gravar.');
  if (rep.validacao && !rep.validacao.ok) throw new Error('Validação SP 2025 (41,29%) falhou; abortando sem gravar.');
  if (dry) return;
  save();
  writeReportSection('executivo', rep);
})().catch(e => { console.error(e); process.exit(1); });
