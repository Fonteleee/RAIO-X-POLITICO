// Figuras Políticas - Comparador 1v1 por indicadores oficiais (sem radar e sem nota).

    function selectPopularDuel(id1, id2) {
      const sel1 = document.getElementById('compare-select-1');
      const sel2 = document.getElementById('compare-select-2');
      if (sel1 && sel2) {
        sel1.value = id1;
        sel2.value = id2;
      }
      selectedForCompare = [id1, id2];

      document.querySelectorAll('.popular-duel-btn').forEach(btn => {
        btn.className = 'popular-duel-btn px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-white/10 font-bold flex items-center gap-1.5 transition shadow-sm flex-shrink-0';
      });

      if (id1 === 'cand-tabata-amaral' && id2 === 'cand-kim-kataguiri') {
        const b = document.getElementById('pduel-1');
        if (b) b.className = 'popular-duel-btn active px-3 py-1.5 rounded-xl bg-purple-600 text-white font-bold flex items-center gap-1.5 transition shadow-sm flex-shrink-0';
      } else if (id1 === 'cand-nikolas-ferreira' && id2 === 'cand-erika-hilton') {
        const b = document.getElementById('pduel-2');
        if (b) b.className = 'popular-duel-btn active px-3 py-1.5 rounded-xl bg-purple-600 text-white font-bold flex items-center gap-1.5 transition shadow-sm flex-shrink-0';
      } else if (id1 === 'cand-marcel-van-hattem' && id2 === 'cand-guilherme-boulos') {
        const b = document.getElementById('pduel-3');
        if (b) b.className = 'popular-duel-btn active px-3 py-1.5 rounded-xl bg-purple-600 text-white font-bold flex items-center gap-1.5 transition shadow-sm flex-shrink-0';
      }

      updateComparator();
    }

    function renderComparator() {
      const sel1 = document.getElementById('compare-select-1');
      const sel2 = document.getElementById('compare-select-2');
      if (!sel1 || !sel2) return;

      sel1.innerHTML = candidatesData.map(c => `<option value="${c.id}" ${c.id === selectedForCompare[0] ? 'selected' : ''}>${c.name} (${c.party}) - ${c.position}</option>`).join('');
      sel2.innerHTML = candidatesData.map(c => `<option value="${c.id}" ${c.id === selectedForCompare[1] ? 'selected' : ''}>${c.name} (${c.party}) - ${c.position}</option>`).join('');

      updateComparator();
    }

    function filterCompareSelect(slot, query) {
      const sel = document.getElementById(`compare-select-${slot}`);
      if (!sel) return;
      const q = (query || '').toLowerCase().trim();
      const currentVal = sel.value;
      
      const filtered = candidatesData.filter(c => {
        if (!q) return true;
        const text = `${c.name} ${c.ballotName || ''} ${c.party} ${c.position} ${c.state || ''}`.toLowerCase();
        return text.includes(q);
      });

      if (filtered.length > 0) {
        sel.innerHTML = filtered.map(c => `<option value="${c.id}" ${c.id === currentVal ? 'selected' : ''}>${c.name} (${c.party}) - ${c.position}</option>`).join('');
        if (!filtered.some(c => c.id === currentVal)) {
          sel.value = filtered[0].id;
        }
        updateComparator();
      }
    }

    // Compara lado a lado os indicadores oficiais disponíveis; ausente = "Dado indisponível".
    function compareCell(cand, key, ind, other, cor, mesmoGrupo) {
      const I = window.Indicadores;
      const E = I.esc;
      if (!ind) return `<td class="py-2 px-2 text-center text-xs text-slate-400">Dado indisponível</td>`;
      const def = I.DEFS[key] || {};
      let melhor = false;
      if (mesmoGrupo && other && typeof other.valor === 'number' && def.maiorMelhor !== null) {
        melhor = def.maiorMelhor === false ? ind.valor < other.valor : ind.valor > other.valor;
      }
      const p = I.percentil(cand, key, candidatesData);
      const url = I.safeUrl(ind.url);
      return `<td class="py-2 px-2 text-center">
        <strong class="font-mono text-sm ${melhor ? cor : 'text-slate-900 dark:text-white'}">${E(I.formatValor(ind))}</strong>
        ${typeof p === 'number' ? `<span class="block text-[10px] text-slate-500">melhor que ${Math.round(p)}% dos pares</span>` : ''}
        <span class="block text-[10px] text-slate-500">${url ? `<a class="underline" href="${E(url)}" target="_blank" rel="noopener noreferrer">${E(ind.fonte || 'Fonte')}</a>` : E(ind.fonte || '')}${ind.consultadoEm ? ` · ${E(I.dataBR(ind.consultadoEm))}` : ''}</span>
      </td>`;
    }

    function buildIndicatorComparisonHtml(cand1, cand2) {
      const I = window.Indicadores;
      if (!I) return '';
      const E = I.esc;
      const mesmoGrupo = !!I.grupo(cand1) && I.grupo(cand1) === I.grupo(cand2);
      const keys = I.KEYS.filter(k => I.indicador(cand1, k) || I.indicador(cand2, k));
      const rows = keys.map(k => {
        const i1 = I.indicador(cand1, k);
        const i2 = I.indicador(cand2, k);
        return `<tr class="border-t border-slate-200 dark:border-white/10">
          <th scope="row" class="py-2 px-2 text-left text-xs font-semibold text-slate-700 dark:text-slate-300">${E(I.DEFS[k].rotulo)}</th>
          ${compareCell(cand1, k, i1, i2, 'text-amber-700 dark:text-amber-400', mesmoGrupo)}
          ${compareCell(cand2, k, i2, i1, 'text-purple-700 dark:text-purple-400', mesmoGrupo)}
        </tr>`;
      }).join('');
      const aviso = mesmoGrupo ? '' : `<p class="text-[11px] text-amber-800 dark:text-amber-300">Cargos diferentes: os valores aparecem lado a lado, mas não são comparados entre si.</p>`;
      return `<div class="space-y-2">
        ${aviso}
        <table class="w-full text-xs">
          <thead><tr class="text-slate-500">
            <th class="py-1 px-2 text-left">Indicador oficial</th>
            <th class="py-1 px-2 text-center">${E(cand1.ballotName || cand1.name)} ${I.statusBadgeHtml(cand1)}</th>
            <th class="py-1 px-2 text-center">${E(cand2.ballotName || cand2.name)} ${I.statusBadgeHtml(cand2)}</th>
          </tr></thead>
          <tbody>${rows || `<tr><td colspan="3" class="py-3">${I.indisponivelHtml()}</td></tr>`}</tbody>
        </table>
      </div>`;
    }
    window.buildIndicatorComparisonHtml = buildIndicatorComparisonHtml;

    function updateComparator() {
      const s1 = document.getElementById('compare-select-1');
      const s2 = document.getElementById('compare-select-2');
      if (!s1 || !s2) return;
      selectedForCompare = [s1.value, s2.value];
      const cand1 = candidatesData.find(c => c.id === s1.value) || candidatesData[0];
      const cand2 = candidatesData.find(c => c.id === s2.value) || candidatesData[1];
      if (!cand1 || !cand2) return;

      renderLiveDuelSticker(cand1, cand2);

      const breakdown = document.getElementById('comparison-breakdown');
      if (breakdown && window.Indicadores) {
        const E = Indicadores.esc;
        breakdown.innerHTML = `
          <div class="bg-slate-50 dark:bg-slate-800/90 p-3 rounded-2xl border border-slate-200 dark:border-white/10 space-y-2 text-xs">
            ${buildIndicatorComparisonHtml(cand1, cand2)}
            <div class="grid grid-cols-2 gap-2 pt-1">
              <button onclick="openDossie('${E(cand1.id)}')" class="py-1.5 rounded-xl bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 font-bold text-xs cursor-pointer">Dossiê ${E((cand1.ballotName || cand1.name).split(' ')[0])}</button>
              <button onclick="openDossie('${E(cand2.id)}')" class="py-1.5 rounded-xl bg-purple-100 dark:bg-purple-500/20 text-purple-800 dark:text-purple-300 font-bold text-xs cursor-pointer">Dossiê ${E((cand2.ballotName || cand2.name).split(' ')[0])}</button>
            </div>
          </div>`;
      }
      if (typeof lucide !== 'undefined' && lucide.createIcons) lucide.createIcons();
    }

    function toggleCompare(candId) {
      if (!selectedForCompare.includes(candId)) {
        selectedForCompare[1] = candId;
      }
      navigateTab('comparator');
    }

    // Figurinha viva do duelo: foto, partido e até 3 indicadores oficiais lado a lado.
    function renderLiveDuelSticker(cand1, cand2) {
      const target = document.getElementById('comparator-live-duel-target');
      const I = window.Indicadores;
      if (!target || !cand1 || !cand2 || !I) return;
      const E = I.esc;
      const keys = I.KEYS.filter(k => I.indicador(cand1, k) || I.indicador(cand2, k)).slice(0, 3);
      const lado = (c, cor) => `<div class="flex items-center gap-1.5 min-w-0">
          <img src="${E(c.avatar || 'favicon.svg')}" alt="${E(c.name)}" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="this.onerror=null;this.src='favicon.svg'" class="w-10 h-10 rounded-lg object-cover ring-2 ${cor} bg-slate-800">
          <div class="min-w-0"><h4 class="font-extrabold text-xs text-white truncate uppercase">${E((c.ballotName || c.name).split(' ')[0])}</h4><p class="text-[9px] font-mono text-white/70 truncate">${E(c.party || '')} • ${E(c.position || '')}</p></div>
        </div>`;
      const linhas = keys.length ? keys.map(k => {
        const a = I.indicador(cand1, k), b = I.indicador(cand2, k);
        return `<div class="p-1 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-between text-[9.5px] font-mono">
          <span class="font-sans font-semibold text-white/70">${E(I.DEFS[k].rotulo)}</span>
          <span class="font-bold"><span class="text-amber-300">${E(a ? I.formatValor(a) : 'indisp.')}</span> <span class="text-white/30">vs</span> <span class="text-purple-300">${E(b ? I.formatValor(b) : 'indisp.')}</span></span>
        </div>`;
      }).join('') : `<p class="text-[10px] text-white/70 text-center">Dado indisponível — sem fonte oficial verificável</p>`;
      target.innerHTML = `
        <div class="relative bg-[#0a0a0c] text-white rounded-2xl p-2.5 border border-white/15 shadow-xl overflow-hidden font-sans space-y-1.5">
          <div class="flex items-center justify-between border-b border-white/10 pb-1">
            <span class="text-[9px] font-mono font-black uppercase tracking-wider text-white/90">FIGURAS POLÍTICAS • INDICADORES OFICIAIS</span>
          </div>
          <div class="grid grid-cols-2 items-center gap-2 p-1.5 rounded-xl bg-white/[0.04] border border-white/10">
            ${lado(cand1, 'ring-amber-500/80')}
            <div class="flex justify-end">${lado(cand2, 'ring-purple-500/80')}</div>
          </div>
          <div class="space-y-0.5">${linhas}</div>
          <p class="text-[8.5px] text-white/50">Fontes oficiais e datas de coleta no dossiê de cada político.</p>
          <div class="flex items-center gap-1.5 pt-0.5">
            <button onclick="exportComparisonCard()" class="flex-1 py-1 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-[10.5px] cursor-pointer">Baixar figurinha</button>
            <button onclick="openDossie('${E(cand1.id)}')" class="px-2 py-1 rounded-xl bg-amber-500/20 text-amber-300 font-bold text-[10.5px] cursor-pointer">${E((cand1.ballotName || cand1.name).split(' ')[0])}</button>
            <button onclick="openDossie('${E(cand2.id)}')" class="px-2 py-1 rounded-xl bg-purple-500/20 text-purple-300 font-bold text-[10.5px] cursor-pointer">${E((cand2.ballotName || cand2.name).split(' ')[0])}</button>
          </div>
        </div>`;
    }

    function shareDuelWhatsApp() {
      const sel1 = document.getElementById('compare-select-1');
      const sel2 = document.getElementById('compare-select-2');
      if (!sel1 || !sel2 || !window.Indicadores) return;
      const cand1 = candidatesData.find(c => c.id === sel1.value) || candidatesData[0];
      const cand2 = candidatesData.find(c => c.id === sel2.value) || candidatesData[1];
      if (!cand1 || !cand2) return;
      const I = Indicadores;
      const linhas = I.KEYS.filter(k => I.indicador(cand1, k) || I.indicador(cand2, k)).slice(0, 3).map(k => {
        const a = I.indicador(cand1, k), b = I.indicador(cand2, k);
        return `• ${I.DEFS[k].rotulo}: ${a ? I.formatValor(a) : 'indisponível'} vs ${b ? I.formatValor(b) : 'indisponível'}`;
      });
      const url = new URL(`index.html?cand1=${encodeURIComponent(cand1.id)}&cand2=${encodeURIComponent(cand2.id)}#comparator`, window.location.href).href;
      const text = `*Comparação por indicadores oficiais*\n${cand1.ballotName || cand1.name} (${cand1.party}) vs ${cand2.ballotName || cand2.name} (${cand2.party})\n\n${linhas.length ? linhas.join('\n') : 'Indicadores oficiais indisponíveis.'}\n\nFontes:\n${url}`;
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
    }

    function copyDuelLink() {
      const sel1 = document.getElementById('compare-select-1');
      const sel2 = document.getElementById('compare-select-2');
      if (!sel1 || !sel2) return;
      const url = new URL(`index.html?cand1=${encodeURIComponent(sel1.value)}&cand2=${encodeURIComponent(sel2.value)}#comparator`, window.location.href).href;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(() => alert('Link da comparação copiado!')).catch(() => prompt('Copie o link:', url));
      } else {
        prompt('Copie o link:', url);
      }
    }

    // Modo único: indicadores. A comparação de planos de governo (análise sem fonte) foi removida.
    function setComparatorMode() {
      updateComparator();
    }
    window.setComparatorMode = setComparatorMode;
