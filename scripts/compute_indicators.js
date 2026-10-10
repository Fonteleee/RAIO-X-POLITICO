// Fase final — cota parlamentar, percentis entre pares, dataQuality e relatório consolidado.
// percentil = % dos demais membros do grupo (mesma Casa/cargo, só quem tem o dado) que ficam ABAIXO.
//   Para cotaParlamentar o sentido é invertido: percentil alto = gastou MENOS (mais economia).
// Uso: node scripts/compute_indicators.js [--dry]
const { loadCandidates, loadReport, saveReport } = require('./lib/data_io');
const { GRUPOS, indicador, setIndicator, casaDe, brl, fmtPct } = require('./lib/indicators');

const dry = process.argv.includes('--dry');
const INVERTIDOS = new Set(['cotaParlamentar', 'gastoPessoal']); // menor é melhor
const SEM_FONTE = ['overallScore', 'radar', 'coerencia', 'viabilidade', 'integridade', 'transparencia', 'eficiencia', 'productivityScore', 'proposals.score', 'recentDebate', 'aiSummary'];

function percentis(list, key) {
  const grupos = new Map();
  for (const c of list) {
    const ind = c.indicators && c.indicators[key];
    if (!ind) continue;
    if (!grupos.has(ind.grupoComparacao)) grupos.set(ind.grupoComparacao, []);
    grupos.get(ind.grupoComparacao).push(ind);
  }
  for (const arr of grupos.values()) {
    for (const ind of arr) {
      if (arr.length < 2) { ind.percentil = null; continue; }
      const abaixo = arr.filter(o => INVERTIDOS.has(key) ? o.valor > ind.valor : o.valor < ind.valor).length;
      const empates = arr.filter(o => o !== ind && o.valor === ind.valor).length;
      ind.percentil = Math.round(((abaixo + empates / 2) / (arr.length - 1)) * 100);
      ind.tamanhoGrupo = arr.length;
    }
  }
}

(async () => {
  const { list, save } = loadCandidates();
  const problemas = [];

  // Cota parlamentar (reaproveita salary.ceapSource de verify_official.js)
  for (const c of list) {
    const s = c.salary && c.salary.ceapSource;
    const k = casaDe(c);
    if (!s || !k || k.casa !== 'camara' || !s.tetoMensalUF || typeof s.totalAno !== 'number') { setIndicator(c, 'cotaParlamentar', null); continue; }
    const teto = s.tetoMensalUF * 12;
    const v = Math.round((s.totalAno / teto) * 10000) / 100;
    setIndicator(c, 'cotaParlamentar', indicador({
      valor: v, unidade: '%', rotulo: `Uso da cota parlamentar (CEAP) em ${s.ano}`,
      detalhe: `${brl(s.totalAno)} gastos de um teto anual de ${brl(teto)} (${s.mesesComDespesa} meses com despesa). Percentil indica ECONOMIA: quanto maior, menos o parlamentar gastou em relação aos pares.`,
      grupoComparacao: GRUPOS.camara, fonte: s.fonte, url: s.painel || s.url, ano: s.ano,
      totalAno: s.totalAno, tetoAnual: Math.round(teto * 100) / 100, sentidoPercentil: 'economia'
    }));
  }

  const chaves = ['presenca', 'participacaoVotacoes', 'cotaParlamentar', 'producaoLegislativa', 'emendas', 'gastoPessoal'];
  for (const k of chaves) percentis(list, k);

  const contagem = {};
  for (const k of chaves) {
    const vals = list.map(c => c.indicators && c.indicators[k]).filter(Boolean);
    contagem[k] = vals.length;
    const zeros = vals.filter(v => v.valor === 0).length;
    if (vals.length >= 10 && zeros / vals.length > 0.5) problemas.push(`${k}: ${zeros} de ${vals.length} com valor zero (suspeita de falha na fonte)`);
    for (const v of vals) {
      if (!v.fonte || !v.url || !(v.percentil === null || (v.percentil >= 0 && v.percentil <= 100))) problemas.push(`${k}: indicador sem fonte/url ou percentil inválido`);
    }
  }

  for (const c of list) {
    if (c.indicators && !Object.keys(c.indicators).length) delete c.indicators;
    const presentes = SEM_FONTE.filter(f => {
      if (f === 'proposals.score') return Array.isArray(c.proposals) && c.proposals.some(p => p.score != null);
      if (['coerencia', 'viabilidade', 'integridade', 'transparencia', 'eficiencia'].includes(f)) return c.radar && c.radar[f] != null;
      return c[f] != null;
    });
    if (c.attendance && !(c.indicators && c.indicators.presenca)) presentes.push('attendance');
    if (c.parliamentaryAmendments) presentes.push('parliamentaryAmendments');
    c.dataQuality = {
      indicadoresOficiais: Object.keys(c.indicators || {}),
      semFonte: presentes,
      status: c.status ? c.status.situacao : 'nao_verificado',
      atualizadoEm: new Date().toISOString().slice(0, 10)
    };
  }

  // Relatório consolidado
  const rep = loadReport();
  rep.fases = rep.fases || {};
  rep.fases.indicadores = { geradoEm: new Date().toISOString(), contagem, problemas };
  rep.revisar = list.filter(c => (c.reviewAlerts && c.reviewAlerts.length) || (c.status && c.status.situacao === 'nao_verificado'))
    .map(c => ({ id: c.id, nome: c.ballotName, status: c.status && c.status.situacao, alertas: c.reviewAlerts || [] }));
  rep.resumoGeral = {
    perfis: list.length, indicadores: contagem,
    status: list.reduce((a, c) => { const s = (c.status && c.status.situacao) || 'nao_verificado'; a[s] = (a[s] || 0) + 1; return a; }, {}),
    revisar: rep.revisar.length
  };
  console.log(JSON.stringify(rep.resumoGeral));
  if (problemas.length) { console.error(problemas.join('\n')); throw new Error('Validação dos indicadores falhou; abortando sem gravar.'); }
  if (dry) return;
  save();
  saveReport(rep);
  void fmtPct;
})().catch(e => { console.error(e); process.exit(1); });
