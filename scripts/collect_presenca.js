// Fase 2 — Presença oficial.
//  Câmara: quadro-resumo oficial de https://www.camara.leg.br/deputados/{id}/presenca-plenario/{ano}
//          (Ato da Mesa 191/2017). NÃO usa eventosPresencaDeputados (não reproduz a regra oficial).
//  Senado: participação em votações nominais (/dadosabertos/votacao?ano=AAAA) — não é "presença".
// Uso: node scripts/collect_presenca.js [--dry] [--ano=2025]
const { loadCandidates, writeReportSection, getText, getJson, sleep } = require('./lib/data_io');
const { GRUPOS, indicador, setIndicator, casaDe, pct, fmtPct } = require('./lib/indicators');

const dry = process.argv.includes('--dry');
const ANO = Number((process.argv.find(a => a.startsWith('--ano=')) || '').slice(6)) || new Date().getFullYear() - 1;
const presencaUrl = id => `https://www.camara.leg.br/deputados/${id}/presenca-plenario/${ANO}`;

function parsePresenca(html) {
  const fim = html.indexOf('Ato da Mesa n');
  const txt = html.slice(0, fim > 0 ? fim : html.length).replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ');
  const num = re => { const m = txt.match(re); return m ? Number(m[1]) : null; };
  const r = {
    sessoes: num(/Total de sess[õo]es deliberativas com Ordem do Dia iniciada, na Sess[ãa]o Legislativa\*?\s+(\d+)/),
    ausenciasSessoes: num(/Total de aus[êe]ncias n[ãa]o justificadas em sess[õo]es deliberativas com Ordem do Dia iniciada\*?\s+(\d+)/),
    dias: num(/Total de dias com sess[õo]es deliberativas realizadas no per[íi]odo\s+(\d+)/),
    diasPresenca: num(/Total de dias com presen[çc]a nas sess[õo]es deliberativas\s+(\d+)/),
    diasJustificadas: num(/Total de dias com aus[êe]ncias justificadas em sess[õo]es deliberativas\s+(\d+)/),
    diasNaoJustificadas: num(/Total de dias com aus[êe]ncias n[ãa]o justificadas em sess[õo]es deliberativas\s+(\d+)/)
  };
  return r.dias != null && r.diasPresenca != null ? r : null;
}

const VOTOU = new Set(['Sim', 'Não', 'Abstenção', 'Votou', 'Obstrução', 'Presidente (art. 51 RISF)']);
const JUSTIF = new Set(['AP', 'LP', 'LS', 'MIS', 'LAP', 'LAM', 'LC', 'LG', 'REP', 'NA']);

(async () => {
  const { list, save } = loadCandidates();
  const rep = { ano: ANO, camara: { consultados: 0, comDado: 0, falhas: [] }, senado: { consultados: 0, comDado: 0, votacoesNoAno: 0 }, validacao: null };

  // ---------- Câmara ----------
  const deps = list.filter(c => (casaDe(c) || {}).casa === 'camara');
  const paginas = new Map();
  for (let rodada = 0; rodada < 3; rodada++) { // o portal responde 429 com frequência: novas rodadas só para as falhas
    const pend = deps.filter(c => !paginas.get(c.id));
    if (!pend.length) break;
    if (rodada) { console.log(`Rodada ${rodada + 1}: ${pend.length} páginas pendentes`); await sleep(30000); }
    for (const c of pend) { paginas.set(c.id, await getText(presencaUrl(casaDe(c).id))); await sleep(800 + rodada * 1500); }
  }
  for (const c of deps) {
    const casa = casaDe(c);
    rep.camara.consultados++;
    const html = paginas.get(c.id);
    const p = html && parsePresenca(html);
    if (!p || !p.dias) { rep.camara.falhas.push({ id: c.id, motivo: html ? 'sem quadro-resumo (sem sessões no ano?)' : 'falha HTTP' }); setIndicator(c, 'presenca', null); continue; }
    rep.camara.comDado++;
    const rate = pct(p.diasPresenca, p.dias);
    const plural = (n, s, p2) => `${n} ${n === 1 ? s : p2}`;
    setIndicator(c, 'presenca', indicador({
      valor: rate, unidade: '%', rotulo: 'Presença em plenário',
      detalhe: `${p.diasPresenca} de ${p.dias} dias com sessão deliberativa em ${ANO}; ${plural(p.diasJustificadas, 'falta justificada', 'faltas justificadas')}; ${plural(p.diasNaoJustificadas, 'falta não justificada', 'faltas não justificadas')}`,
      grupoComparacao: GRUPOS.camara, fonte: 'Câmara dos Deputados — relatório oficial de presença em plenário (Ato da Mesa 191/2017)',
      url: presencaUrl(casa.id), ano: ANO,
      bruto: { diasComSessao: p.dias, diasPresenca: p.diasPresenca, diasAusenciaJustificada: p.diasJustificadas, diasAusenciaNaoJustificada: p.diasNaoJustificadas, sessoesDeliberativas: p.sessoes, ausenciasNaoJustificadasSessoes: p.ausenciasSessoes }
    }));
    // compatibilidade com o campo antigo (agora com dados oficiais, contados em dias)
    c.attendance = { totalSessions: p.dias, presentCount: p.diasPresenca, justifiedAbsences: p.diasJustificadas, unjustifiedAbsences: p.diasNaoJustificadas, ratePct: Math.round(rate), unidade: 'dias com sessão deliberativa', fonte: 'Câmara dos Deputados', ano: ANO };
    if (c.id === 'cand-carlos-jordy' && ANO === 2025) rep.validacao = { id: c.id, esperado: '120/121 (99,17%)', obtido: `${p.diasPresenca}/${p.dias} (${fmtPct(rate)})`, ok: p.diasPresenca === 120 && p.dias === 121 };
  }

  // ---------- Senado ----------
  const vot = await getJson(`https://legis.senado.leg.br/dadosabertos/votacao?ano=${ANO}`);
  if (!Array.isArray(vot) || vot.length < 20) throw new Error(`Senado: votações nominais de ${ANO} vieram vazias/incompletas (${vot && vot.length}); abortando sem gravar.`);
  rep.senado.votacoesNoAno = vot.length;
  const porSen = new Map();
  for (const v of vot) for (const x of v.votos || []) {
    const k = String(x.codigoParlamentar);
    const e = porSen.get(k) || { listadas: 0, votou: 0, justif: 0, naoComp: 0, presenteSemVoto: 0 };
    e.listadas++;
    if (VOTOU.has(x.siglaVotoParlamentar)) e.votou++;
    else if (JUSTIF.has(x.siglaVotoParlamentar)) e.justif++;
    else if (x.siglaVotoParlamentar === 'P-NRV') e.presenteSemVoto++;
    else e.naoComp++;
    porSen.set(k, e);
  }
  for (const c of list) {
    const casa = casaDe(c);
    if (!casa || casa.casa !== 'senado') continue;
    rep.senado.consultados++;
    const e = porSen.get(casa.id);
    if (!e || !e.listadas) { setIndicator(c, 'participacaoVotacoes', null); continue; }
    rep.senado.comDado++;
    setIndicator(c, 'participacaoVotacoes', indicador({
      valor: pct(e.votou, e.listadas), unidade: '%', rotulo: 'Participação em votações nominais',
      detalhe: `Votou em ${e.votou} de ${e.listadas} votações nominais do Plenário em ${ANO}; ${e.justif} ausências justificadas (licença, missão, atividade parlamentar), ${e.presenteSemVoto} presente sem registrar voto, ${e.naoComp} sem justificativa. Não equivale a presença em sessão.`,
      grupoComparacao: GRUPOS.senado, fonte: 'Senado Federal — dados abertos de votações nominais',
      url: `https://legis.senado.leg.br/dadosabertos/votacao?ano=${ANO}&codigoParlamentar=${casa.id}`, ano: ANO,
      bruto: e
    }));
  }

  console.log(JSON.stringify({ camara: { ...rep.camara, falhas: rep.camara.falhas.length }, senado: rep.senado, validacao: rep.validacao }));
  if (rep.camara.consultados && rep.camara.comDado < rep.camara.consultados * 0.7) throw new Error('Presença da Câmara: menos de 70% dos deputados com quadro oficial; abortando sem gravar.');
  if (rep.senado.consultados && rep.senado.comDado < rep.senado.consultados * 0.7) throw new Error('Senado: menos de 70% dos senadores com votações; abortando sem gravar.');
  if (rep.validacao && !rep.validacao.ok) throw new Error('Validação Carlos Jordy 2025 falhou (esperado 120/121); abortando sem gravar.');
  if (dry) return;
  save();
  writeReportSection('presenca', rep);
})().catch(e => { console.error(e); process.exit(1); });
