// Figuras Políticas — Indicadores oficiais (metodologia sem nota composta).
// Exibe somente indicadores com valor bruto, percentil entre pares, fonte e data de coleta.
// Nada aqui inventa valores: se não há dado com fonte, mostramos "Dado indisponível".
(function (root) {
  'use strict';

  const SEM_FONTE = 'Dado indisponível — sem fonte oficial verificável';

  // Ordem de exibição e metadados de cada indicador do contrato de dados.
  const DEFS = {
    presenca: { rotulo: 'Presença em sessões', icon: 'calendar-check', maiorMelhor: true },
    participacaoVotacoes: { rotulo: 'Participação em votações nominais', icon: 'vote', maiorMelhor: true },
    cotaParlamentar: { rotulo: 'Cota parlamentar (CEAP)', icon: 'receipt', maiorMelhor: false },
    producaoLegislativa: { rotulo: 'Produção legislativa', icon: 'file-text', maiorMelhor: true },
    emendas: { rotulo: 'Emendas parlamentares', icon: 'landmark', maiorMelhor: null },
    gastoPessoal: { rotulo: 'Gasto com pessoal (% da RCL)', icon: 'users', maiorMelhor: false }
  };
  const KEYS = Object.keys(DEFS);

  const GRUPOS = {
    deputados: { rotulo: 'Deputados federais', curto: 'Deputados' },
    senadores: { rotulo: 'Senadores', curto: 'Senadores' },
    governadores: { rotulo: 'Governadores', curto: 'Governadores' },
    prefeitos: { rotulo: 'Prefeitos', curto: 'Prefeitos' }
  };

  const STATUS = {
    em_exercicio: { rotulo: 'Em exercício', tom: 'ok', rankeavel: true },
    licenciado: { rotulo: 'Licenciado', tom: 'aviso', rankeavel: true },
    sem_mandato: { rotulo: 'Sem mandato', tom: 'neutro', rankeavel: false },
    falecido: { rotulo: 'Falecido', tom: 'grave', rankeavel: false },
    nao_verificado: { rotulo: 'Situação não verificada', tom: 'neutro', rankeavel: false }
  };

  function esc(v) {
    return String(v == null ? '' : v)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function safeUrl(u) {
    return /^https?:\/\//i.test(String(u || '')) ? String(u) : '';
  }

  function dataBR(iso) {
    const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(iso || ''));
    return m ? `${m[3]}/${m[2]}/${m[1]}` : (iso ? String(iso) : '');
  }

  function isNum(v) {
    return typeof v === 'number' && isFinite(v);
  }

  function fmtNumero(v, casas) {
    return Number(v).toLocaleString('pt-BR', { minimumFractionDigits: casas, maximumFractionDigits: casas });
  }

  function formatValor(ind) {
    if (!ind || !isNum(ind.valor)) return '—';
    if (ind.unidade === '%') return `${fmtNumero(ind.valor, ind.valor % 1 ? 1 : 0)}%`;
    if (ind.unidade === 'R$') return `R$ ${fmtNumero(ind.valor, 2)}`;
    return fmtNumero(ind.valor, 0);
  }

  // Grupo de comparação (Casa/cargo atual). Usa o mandato verificado quando existir.
  function grupo(cand) {
    if (!cand) return null;
    const txt = `${(cand.status && cand.status.mandatoAtual) || ''} ${cand.position || ''}`;
    if (/^\s*(Ex-|Pré-)/i.test(cand.position || '') && !(cand.status && cand.status.mandatoAtual)) return null;
    if (/Deputad[oa] Federal/i.test(txt)) return 'deputados';
    if (/Senador/i.test(txt)) return 'senadores';
    if (/Governador/i.test(txt) && !/Vice/i.test(txt)) return 'governadores';
    if (/Prefeit/i.test(txt) && !/Vice/i.test(txt)) return 'prefeitos';
    return null;
  }

  function status(cand) {
    const s = cand && cand.status;
    if (s && STATUS[s.situacao]) {
      return Object.assign({ situacao: s.situacao, mandatoAtual: s.mandatoAtual || '', fonte: s.fonte || '' }, STATUS[s.situacao], s);
    }
    // Sem o campo `status`: usa apenas a verificação oficial já existente (Câmara/Senado).
    const dv = cand && cand.dataVerification;
    const sit = String((dv && dv.situacao) || '');
    let key = 'nao_verificado';
    if (/exerc/i.test(sit)) key = 'em_exercicio';
    else if (/licen/i.test(sit)) key = 'licenciado';
    return Object.assign({ situacao: key, mandatoAtual: '', fonte: (dv && dv.fonte) || '' }, STATUS[key]);
  }

  function rankeavel(cand) {
    return !!status(cand).rankeavel;
  }

  // Cota parlamentar derivada do dado oficial já existente (salary.ceapSource), sem percentil inventado.
  function cotaDerivada(cand) {
    const src = cand && cand.salary && cand.salary.ceapSource;
    // Total zerado / sem notas = sem despesa registrada no ano (ex.: fora do exercício): não vira indicador.
    if (!src || !isNum(src.totalAno) || src.totalAno <= 0 || src.notasFiscais === 0) return null;
    const tetoAno = isNum(src.tetoMensalUF) ? src.tetoMensalUF * 12 : null;
    const pct = tetoAno ? Math.round((src.totalAno / tetoAno) * 1000) / 10 : null;
    return {
      valor: src.totalAno,
      unidade: 'R$',
      rotulo: `Cota parlamentar usada em ${src.ano}`,
      detalhe: pct != null ? `${fmtNumero(pct, 1)}% do teto anual da UF (${src.notasFiscais || 0} documentos fiscais)` : '',
      percentil: null,
      grupoComparacao: 'Deputados federais',
      fonte: src.fonte || 'Câmara dos Deputados',
      url: safeUrl(src.painel) || safeUrl(src.url),
      consultadoEm: src.consultadoEm || '',
      ano: src.ano,
      derivado: true
    };
  }

  function indicador(cand, key) {
    const raw = cand && cand.indicators && cand.indicators[key];
    if (raw && isNum(raw.valor)) return raw;
    if (key === 'cotaParlamentar') return cotaDerivada(cand);
    return null;
  }

  function lista(cand) {
    return KEYS.map(k => ({ key: k, ind: indicador(cand, k) })).filter(x => x.ind);
  }

  // Percentil entre pares quando o dado não traz um (só para indicadores derivados no cliente).
  function percentilEntre(valor, valores, maiorMelhor) {
    const v = valores.filter(isNum);
    if (v.length < 5 || !isNum(valor)) return null;
    const piores = v.filter(x => (maiorMelhor ? x < valor : x > valor)).length;
    return Math.round((piores / v.length) * 100);
  }

  function percentil(cand, key, universo) {
    const ind = indicador(cand, key);
    if (!ind) return null;
    if (isNum(ind.percentil)) return ind.percentil;
    if (!ind.derivado || !Array.isArray(universo)) return null;
    const g = grupo(cand);
    const pares = universo.filter(c => grupo(c) === g).map(c => indicador(c, key)).filter(Boolean).map(i => i.valor);
    return percentilEntre(ind.valor, pares, DEFS[key].maiorMelhor !== false);
  }

  function universoPadrao() {
    if (typeof candidatesData !== 'undefined' && Array.isArray(candidatesData)) return candidatesData; // eslint-disable-line no-undef
    return Array.isArray(root.candidatesData) ? root.candidatesData : [];
  }

  function fonteHtml(ind) {
    const url = safeUrl(ind.url);
    const fonte = esc(ind.fonte || 'Fonte oficial');
    const data = ind.consultadoEm ? ` · consultado em ${esc(dataBR(ind.consultadoEm))}` : '';
    return url
      ? `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer" class="underline hover:text-sky-600 dark:hover:text-cyan-400">${fonte}</a>${data}`
      : `${fonte}${data}`;
  }

  function cardHtml(cand, key, ind, opts) {
    opts = opts || {};
    const def = DEFS[key] || { rotulo: key, icon: 'info' };
    const p = percentil(cand, key, opts.universo || universoPadrao());
    const grupoTxt = ind.grupoComparacao || (GRUPOS[grupo(cand)] || {}).rotulo || 'pares';
    const pctHtml = isNum(p)
      ? `<div class="mt-2 space-y-1">
           <div class="h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden"><div class="h-full rounded-full bg-sky-600" style="width:${Math.max(0, Math.min(100, p))}%"></div></div>
           <p class="text-xs text-slate-600 dark:text-slate-400">${key === 'cotaParlamentar' ? 'Mais econômico que' : 'Melhor que'} ${Math.round(p)}% dos ${esc(grupoTxt)}</p>
         </div>`
      : `<p class="mt-2 text-xs text-slate-500 dark:text-slate-400">Comparação entre pares indisponível.</p>`;
    let destaques = '';
    if (key === 'producaoLegislativa' && Array.isArray(ind.destaques) && ind.destaques.length) {
      destaques = `<ul class="mt-2 space-y-1 text-xs text-slate-700 dark:text-slate-300">` + ind.destaques.slice(0, opts.maxDestaques || 3).map(d => {
        const t = `${esc(d.sigla)} ${esc(d.numero)}/${esc(d.ano)}`;
        const u = safeUrl(d.url);
        return `<li><strong>${u ? `<a href="${esc(u)}" target="_blank" rel="noopener noreferrer" class="underline">${t}</a>` : t}</strong>${d.situacao ? ` · ${esc(d.situacao)}` : ''}${d.ementa ? ` — ${esc(String(d.ementa).slice(0, 160))}` : ''}</li>`;
      }).join('') + `</ul>`;
    }
    return `<article class="indicator-card p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-xs" data-indicator="${esc(key)}">
      <div class="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        <i data-lucide="${esc(def.icon)}" class="w-3.5 h-3.5"></i><span>${esc(ind.rotulo || def.rotulo)}</span>
      </div>
      <div class="mt-1 text-2xl font-black font-mono text-slate-900 dark:text-white">${esc(formatValor(ind))}</div>
      ${ind.detalhe ? `<p class="text-xs text-slate-600 dark:text-slate-400">${esc(ind.detalhe)}</p>` : ''}
      ${pctHtml}
      ${destaques}
      <p class="mt-2 text-xs text-slate-500 dark:text-slate-400">Fonte: ${fonteHtml(ind)}${ind.ano ? ` · ano ${esc(ind.ano)}` : ''}</p>
    </article>`;
  }

  function indisponivelHtml(msg) {
    return `<p class="dado-indisponivel p-4 rounded-2xl border border-dashed border-slate-300 dark:border-white/15 text-sm text-slate-500 dark:text-slate-400 text-center">${esc(msg || SEM_FONTE)}</p>`;
  }

  function painelHtml(cand, opts) {
    const itens = lista(cand);
    if (!itens.length) return indisponivelHtml();
    return `<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">${itens.map(x => cardHtml(cand, x.key, x.ind, opts)).join('')}</div>`;
  }

  function statusBadgeHtml(cand, opts) {
    const s = status(cand);
    if (s.situacao === 'em_exercicio' && !(opts && opts.mostrarExercicio)) return '';
    const cores = {
      ok: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/30',
      aviso: 'bg-amber-50 dark:bg-amber-500/10 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-500/30',
      grave: 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white',
      neutro: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-white/15'
    };
    // Data opcional (ex.: óbito) quando o dado de situação a informar.
    const extra = s.data ? ` ${s.situacao === 'falecido' ? 'em ' : 'desde '}${esc(dataBR(s.data))}` : '';
    return `<span class="status-badge inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs font-bold ${cores[s.tom] || cores.neutro}" title="${esc(s.fonte ? 'Fonte: ' + s.fonte : 'Situação do mandato')}">${esc(s.rotulo)}${extra}</span>`;
  }

  function tse2026Html(cand) {
    const t = cand && cand.tse2026;
    if (!t || !(t.cargo || t.numero)) return indisponivelHtml('Candidatura 2026 não localizada no TSE — dado indisponível.');
    const linhas = [
      ['Cargo disputado', t.cargo ? `${t.cargo}${t.uf ? ` (${t.uf})` : ''}` : ''],
      ['Número', t.numero],
      ['Partido', t.partido],
      ['Resultado (1º turno, 04/10/2026)', t.situacaoTurno ? `${t.situacaoTurno}${t.turno ? ` — ${t.turno}º turno` : ''}` : 'Ainda não divulgado'],
    ].filter(l => l[1]);
    return `<dl class="grid grid-cols-2 gap-2 text-xs">${linhas.map(l => `<div class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10"><dt class="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">${esc(l[0])}</dt><dd class="font-black text-slate-900 dark:text-white">${esc(l[1])}</dd></div>`).join('')}</dl>
      <p class="mt-2 text-xs text-slate-500 dark:text-slate-400">2º turno em 25/10/2026. Fonte: ${esc(t.fonte || 'TSE')}${t.consultadoEm ? ` · consultado em ${esc(dataBR(t.consultadoEm))}` : ''}</p>`;
  }

  function alertasHtml(cand) {
    const a = (cand && Array.isArray(cand.reviewAlerts)) ? cand.reviewAlerts.filter(x => x && x.mensagem) : [];
    if (!a.length) return '';
    return `<div role="note" class="review-alerts p-3 rounded-2xl border border-amber-300 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-950/20 text-xs text-amber-900 dark:text-amber-200 space-y-1">
      <strong class="block">Dados em revisão</strong>
      ${a.map(x => `<p>${esc(x.mensagem)}${x.fonte ? ` <span class="opacity-75">(${esc(x.fonte)})</span>` : ''}</p>`).join('')}
    </div>`;
  }

  const api = {
    SEM_FONTE, DEFS, KEYS, GRUPOS, STATUS,
    esc, safeUrl, dataBR, formatValor, grupo, status, rankeavel,
    indicador, lista, percentil, percentilEntre,
    cardHtml, painelHtml, indisponivelHtml, statusBadgeHtml, tse2026Html, alertasHtml
  };
  root.Indicadores = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
