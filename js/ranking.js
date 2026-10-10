// Figuras Políticas - Navegação de Abas, Ranking Ponderado e Feed Cívico

// ================= NAVIGATION LOGIC =================
    function navigateTab(tabId) {
      currentTab = tabId;
      
      // Hide all tabs
      document.getElementById('tab-feed').classList.add('hidden');
      document.getElementById('tab-ranking').classList.add('hidden');
      document.getElementById('tab-comparator').classList.add('hidden');
      document.getElementById('tab-match').classList.add('hidden');
      document.getElementById('tab-incumbents').classList.add('hidden');

      // Reset Nav Buttons (Desktop & Mobile)
      ['feed', 'ranking', 'comparator', 'match', 'incumbents'].forEach(id => {
        const btn = document.getElementById(`nav-${id}`);
        if (btn) {
          btn.className = 'px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition flex items-center gap-1.5';
        }
        const mBtn = document.getElementById(`mobile-nav-${id}`);
        if (mBtn) {
          mBtn.className = 'flex flex-col items-center justify-center flex-1 py-1 text-[10px] font-medium text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-cyan-400 min-h-[44px] transition cursor-pointer';
        }
      });

      // Show Active Tab
      const targetTab = document.getElementById(`tab-${tabId}`);
      if (targetTab) targetTab.classList.remove('hidden');
      
      const activeBtn = document.getElementById(`nav-${tabId}`);
      if (activeBtn) {
        activeBtn.className = 'px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-sky-600 dark:bg-cyan-600/30 dark:border dark:border-cyan-500/30 transition flex items-center gap-1.5 shadow-sm';
      }
      const activeMobileBtn = document.getElementById(`mobile-nav-${tabId}`);
      if (activeMobileBtn) {
        activeMobileBtn.className = 'flex flex-col items-center justify-center flex-1 py-1 text-[10px] font-bold text-sky-600 dark:text-cyan-400 min-h-[44px] transition cursor-pointer';
      }

      if (tabId === 'ranking') {
        renderRankingTab();
      } else if (tabId === 'comparator') {
        renderComparator();
      } else if (tabId === 'match') {
        renderQuiz();
      } else if (tabId === 'incumbents') {
        if (typeof renderIncumbents === 'function') renderIncumbents();
      }
    }

    // ================= RANKING POR INDICADOR OFICIAL E POR GRUPO =================
    // Sem nota composta: ordena pelo valor bruto de UM indicador oficial, dentro de UM grupo
    // (mesma Casa/cargo). Ficam fora: quem não tem o indicador e quem está sem mandato,
    // falecido ou com situação não verificada.
    let currentRankingGroup = 'deputados';
    let currentRankingIndicator = 'cotaParlamentar';
    let currentRankingPage = 1;
    let rankingTableSearchQuery = '';
    const RANKING_PAGE_SIZE = 50;
    window.candidateRankPositions = window.candidateRankPositions || {};

    function rankingEsc(v) { return window.Indicadores ? Indicadores.esc(v) : String(v == null ? '' : v); }

    // Lista ordenada (melhor primeiro) para um grupo e indicador.
    function buildIndicatorRanking(list, group, key) {
      const I = window.Indicadores;
      if (!I || !Array.isArray(list)) return [];
      const def = I.DEFS[key] || {};
      const rows = list
        .filter(c => I.grupo(c) === group && I.rankeavel(c))
        .map(c => ({ cand: c, ind: I.indicador(c, key) }))
        .filter(r => r.ind && typeof r.ind.valor === 'number');
      rows.sort((a, b) => def.maiorMelhor === false ? a.ind.valor - b.ind.valor : b.ind.valor - a.ind.valor);
      rows.forEach((r, i) => { r.pos = i + 1; });
      return rows;
    }
    window.buildIndicatorRanking = buildIndicatorRanking;

    function setRankingButtons(prefix, active) {
      document.querySelectorAll(`[data-${prefix}]`).forEach(btn => {
        const on = btn.getAttribute(`data-${prefix}`) === active;
        btn.classList.toggle('bg-sky-600', on);
        btn.classList.toggle('text-white', on);
        btn.classList.toggle('font-bold', on);
        btn.classList.toggle('bg-white', !on);
        btn.classList.toggle('dark:bg-slate-700', !on);
        btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
    }

    function filterRankingByGroup(group) {
      currentRankingGroup = group;
      currentRankingPage = 1;
      renderRankingTab();
    }
    window.filterRankingByGroup = filterRankingByGroup;

    function sortRankingByIndicator(key) {
      currentRankingIndicator = key;
      currentRankingPage = 1;
      renderRankingTab();
    }
    window.sortRankingByIndicator = sortRankingByIndicator;

    function handleRankingTableSearch(query) {
      rankingTableSearchQuery = (query || '').trim();
      currentRankingPage = 1;
      const clearBtn = document.getElementById('ranking-table-search-clear');
      if (clearBtn) clearBtn.classList.toggle('hidden', rankingTableSearchQuery.length === 0);
      renderRankingTab();
    }
    window.handleRankingTableSearch = handleRankingTableSearch;

    function clearRankingTableSearch() {
      const input = document.getElementById('ranking-table-search');
      if (input) input.value = '';
      handleRankingTableSearch('');
    }
    window.clearRankingTableSearch = clearRankingTableSearch;

    function changeRankingPage(page) {
      currentRankingPage = page;
      renderRankingTab();
      const el = document.getElementById('ranking-table-card');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    window.changeRankingPage = changeRankingPage;

    function renderRankingTab() {
      const I = window.Indicadores;
      const body = document.getElementById('ranking-table-body');
      if (!I || !body || typeof candidatesData === 'undefined' || !Array.isArray(candidatesData)) return;
      const E = rankingEsc;

      // Contagem de perfis com o indicador por grupo (para os botões)
      Object.keys(I.GRUPOS).forEach(g => {
        const el = document.getElementById(`rank-group-count-${g}`);
        if (el) el.innerText = buildIndicatorRanking(candidatesData, g, currentRankingIndicator).length;
      });
      setRankingButtons('rank-group', currentRankingGroup);
      setRankingButtons('rank-indicator', currentRankingIndicator);

      const all = buildIndicatorRanking(candidatesData, currentRankingGroup, currentRankingIndicator);
      window.candidateRankPositions = {};
      all.forEach(r => { window.candidateRankPositions[r.cand.id] = { roleRank: r.pos, roleTotal: all.length, indicador: currentRankingIndicator }; });

      let rows = all;
      if (rankingTableSearchQuery) {
        const q = rankingTableSearchQuery.toLowerCase();
        rows = rows.filter(r => [r.cand.name, r.cand.ballotName, r.cand.party, r.cand.state, r.cand.city].some(v => v && String(v).toLowerCase().includes(q)));
      }

      const def = I.DEFS[currentRankingIndicator];
      const grupoTxt = I.GRUPOS[currentRankingGroup].rotulo;
      const summary = document.getElementById('ranking-count-summary');
      if (summary) summary.innerText = `${all.length} ${grupoTxt.toLowerCase()} com o indicador "${def.rotulo}"`;
      const head = document.getElementById('ranking-indicator-head');
      if (head) head.innerText = def.rotulo;
      const ordem = document.getElementById('ranking-order-note');
      if (ordem) ordem.innerText = def.maiorMelhor === false ? 'Ordem: menor valor primeiro (mais econômico).' : 'Ordem: maior valor primeiro.';

      const totalPages = Math.max(1, Math.ceil(rows.length / RANKING_PAGE_SIZE));
      if (currentRankingPage > totalPages) currentRankingPage = totalPages;
      const page = rows.slice((currentRankingPage - 1) * RANKING_PAGE_SIZE, currentRankingPage * RANKING_PAGE_SIZE);

      if (!page.length) {
        body.innerHTML = `<tr><td colspan="5" class="py-6 px-3">${I.indisponivelHtml(all.length ? 'Nenhum resultado para a busca.' : `Dado indisponível — nenhum perfil de ${grupoTxt.toLowerCase()} tem este indicador com fonte oficial verificável.`)}</td></tr>`;
      } else {
        body.innerHTML = page.map(r => {
          const c = r.cand;
          const p = I.percentil(c, currentRankingIndicator, candidatesData);
          const url = I.safeUrl(r.ind.url);
          return `<tr class="hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer" onclick="openDossie('${E(c.id)}')">
            <td class="py-2 px-2 text-center font-black font-mono">${r.pos}º</td>
            <td class="py-2 px-2"><div class="flex items-center gap-2"><img src="${E(c.avatar)}" alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="this.onerror=null;this.src='favicon.svg'" class="w-8 h-8 rounded-lg object-cover bg-slate-100 dark:bg-slate-800"><div><strong class="text-slate-900 dark:text-white">${E(c.ballotName || c.name)}</strong> <span class="text-slate-500">${E(c.party || '')}-${E(c.state || '')}</span> ${I.statusBadgeHtml(c)}</div></div></td>
            <td class="py-2 px-2 text-right font-mono font-black text-slate-900 dark:text-white whitespace-nowrap">${E(I.formatValor(r.ind))}<span class="block text-xs font-normal text-slate-500">${E(r.ind.detalhe || '')}</span></td>
            <td class="py-2 px-2 text-center font-mono">${typeof p === 'number' ? `${Math.round(p)}%` : '—'}</td>
            <td class="py-2 px-2 text-xs text-slate-500">${url ? `<a href="${E(url)}" target="_blank" rel="noopener noreferrer" class="underline" onclick="event.stopPropagation()">${E(r.ind.fonte || 'Fonte')}</a>` : E(r.ind.fonte || '')}${r.ind.consultadoEm ? `<span class="block">${E(I.dataBR(r.ind.consultadoEm))}</span>` : ''}</td>
          </tr>`;
        }).join('');
      }

      const pag = document.getElementById('ranking-pagination-container');
      if (pag) {
        pag.innerHTML = totalPages <= 1 ? '' : `<span class="text-slate-500">Página ${currentRankingPage} de ${totalPages}</span><div class="flex gap-1.5">` +
          Array.from({ length: totalPages }, (_, i) => `<button onclick="changeRankingPage(${i + 1})" class="w-8 h-8 rounded-xl font-bold text-xs cursor-pointer ${i + 1 === currentRankingPage ? 'bg-sky-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}">${i + 1}</button>`).join('') + `</div>`;
      }
      if (window.lucide) lucide.createIcons();
    }

    // ================= TOP ENGAGEMENT & POLARIZATION IDS =================
    const TOP_NATIONAL_ENGAGEMENT_IDS = [
      'cand-lula',
      'cand-jair-bolsonaro',
      'cand-tarcisio-de-freitas',
      'cand-ciro-gomes',
      'cand-flavio-bolsonaro',
      'cand-nikolas-ferreira',
      'cand-guilherme-boulos',
      'cand-eduardo-paes',
      'cand-sergio-moro',
      'cand-romeu-zema',
      'cand-ronaldo-caiado',
      'cand-tabata-amaral',
      'cand-joao-campos',
      'cand-eduardo-leite',
      'cand-damares-alves',
      'cand-erika-hilton',
      'cand-kim-kataguiri',
      'cand-ricardo-salles',
      'cand-gleisi-hoffmann',
      'cand-marcel-van-hattem'
    ];

    let feedCurrentPage = 1;
    const feedPageSize = 20;
    let activeIntegrityFilter = 'todos';
    let activePosFilter = 'todos';
    let activeStateFilter = 'todos';
    let activeSortFilter = 'default';
    let activeSearchQuery = '';

    // ================= RENDER CANDIDATES FEED (PAGINADO) =================
    // Card: identidade, selo de situação e até 2 indicadores oficiais com fonte. Sem nota.
    function renderCandidatesFeed(candidates = candidatesData) {
      const grid = document.getElementById('candidates-grid');
      if (!grid) return;
      const I = window.Indicadores;
      const E = rankingEsc;
      const totalCount = candidates.length;
      const totalPages = Math.ceil(totalCount / feedPageSize) || 1;
      if (feedCurrentPage > totalPages || feedCurrentPage < 1) feedCurrentPage = 1;
      const paginated = candidates.slice((feedCurrentPage - 1) * feedPageSize, feedCurrentPage * feedPageSize);

      const statsHeader = document.getElementById('feed-stats-count');
      if (statsHeader) statsHeader.innerText = `Página ${feedCurrentPage} de ${totalPages} (Mostrando ${paginated.length} de ${totalCount} políticos)`;
      renderFeedPaginationControls(totalCount, totalPages);

      if (!totalCount) {
        grid.innerHTML = `<div class="col-span-full text-center py-12 px-6 glass-panel rounded-2xl border border-dashed border-slate-300 dark:border-white/10 space-y-3">
          <h4 class="font-bold text-slate-900 dark:text-white text-base">Nenhum político encontrado</h4>
          <button onclick="resetFeedFilters()" class="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md transition cursor-pointer">Limpar filtros</button>
        </div>`;
        return;
      }

      grid.innerHTML = paginated.map(cand => {
        const inds = I ? I.lista(cand).slice(0, 2) : [];
        const indHtml = inds.length
          ? inds.map(x => `<div class="flex items-center justify-between text-xs"><span class="text-slate-600 dark:text-slate-400">${E(x.ind.rotulo || I.DEFS[x.key].rotulo)}</span><strong class="font-mono text-slate-900 dark:text-white">${E(I.formatValor(x.ind))}</strong></div><p class="text-[10px] text-slate-500 text-right">Fonte: ${E(x.ind.fonte || '')}</p>`).join('')
          : `<p class="text-xs text-slate-500 dark:text-slate-400">${E(I ? I.SEM_FONTE : 'Dado indisponível')}</p>`;
        return `<div class="glass-card rounded-2xl p-5 flex flex-col space-y-2.5 cursor-pointer" role="button" tabindex="0" onclick="openDossie('${E(cand.id)}')">
          <div class="flex items-start gap-3.5">
            <img src="${E(cand.avatar)}" alt="${E(cand.name)}" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="this.onerror=null;this.src='favicon.svg'" class="w-16 h-16 rounded-2xl object-cover bg-slate-100 dark:bg-slate-800">
            <div class="flex-1 min-w-0">
              <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-100 dark:bg-cyan-500/20 text-sky-800 dark:text-cyan-300">${E(cand.party || '')}</span>
              ${I ? I.statusBadgeHtml(cand) : ''}
              <h3 class="font-extrabold text-base text-slate-900 dark:text-white mt-1 truncate">${E(cand.ballotName || cand.name)}</h3>
              <p class="text-xs text-slate-700 dark:text-slate-200 truncate font-semibold">${E(cand.position || '')} • ${E(cand.state || '')}</p>
            </div>
          </div>
          <div class="p-2.5 rounded-xl bg-slate-100/90 dark:bg-slate-800/80 space-y-1">${indHtml}</div>
          <div class="pt-2 border-t border-slate-200 dark:border-white/10 flex items-center gap-1.5">
            <button onclick="event.stopPropagation(); openDossie('${E(cand.id)}')" class="flex-1 py-1.5 rounded-xl bg-sky-700 hover:bg-sky-600 text-white font-bold text-xs cursor-pointer">Dossiê</button>
            <button onclick="event.stopPropagation(); openExportModalFor('${E(cand.id)}')" class="px-2.5 py-1.5 rounded-xl bg-indigo-600 text-white font-bold text-xs cursor-pointer">Figurinha</button>
            <button onclick="event.stopPropagation(); toggleCompare('${E(cand.id)}')" class="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold cursor-pointer">Comparar</button>
          </div>
        </div>`;
      }).join('');
      if (window.lucide) lucide.createIcons();
    }

    // ================= PAGINATION CONTROLS RENDERER =================
    function renderFeedPaginationControls(totalCount, totalPages) {
      const infoEl = document.getElementById('pagination-info');
      const buttonsEl = document.getElementById('pagination-buttons');
      if (!infoEl || !buttonsEl) return;

      infoEl.innerText = `Página ${feedCurrentPage} de ${totalPages} • Total: ${totalCount} políticos`;
      buttonsEl.innerHTML = '';

      if (totalPages <= 1) return;

      // Botão Anterior
      const prevBtn = document.createElement('button');
      prevBtn.className = `px-3 py-1.5 rounded-xl font-bold text-xs transition cursor-pointer ${feedCurrentPage === 1 ? 'opacity-40 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400' : 'bg-slate-200 dark:bg-slate-800 hover:bg-sky-600 hover:text-white text-slate-700 dark:text-slate-200'}`;
      prevBtn.innerHTML = '← Anterior';
      prevBtn.disabled = feedCurrentPage === 1;
      prevBtn.onclick = () => setFeedPage(feedCurrentPage - 1);
      buttonsEl.appendChild(prevBtn);

      // Números de Página
      for (let p = 1; p <= totalPages; p++) {
        if (p === 1 || p === totalPages || Math.abs(p - feedCurrentPage) <= 1) {
          const pageBtn = document.createElement('button');
          pageBtn.className = `w-8 h-8 rounded-xl font-bold text-xs transition cursor-pointer ${p === feedCurrentPage ? 'bg-sky-600 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'}`;
          pageBtn.innerText = p;
          pageBtn.onclick = () => setFeedPage(p);
          buttonsEl.appendChild(pageBtn);
        } else if (p === 2 && feedCurrentPage > 3) {
          const span = document.createElement('span');
          span.className = 'px-1 text-slate-400 text-xs';
          span.innerText = '...';
          buttonsEl.appendChild(span);
        } else if (p === totalPages - 1 && feedCurrentPage < totalPages - 2) {
          const span = document.createElement('span');
          span.className = 'px-1 text-slate-400 text-xs';
          span.innerText = '...';
          buttonsEl.appendChild(span);
        }
      }

      // Botão Próxima
      const nextBtn = document.createElement('button');
      nextBtn.className = `px-3 py-1.5 rounded-xl font-bold text-xs transition cursor-pointer ${feedCurrentPage === totalPages ? 'opacity-40 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400' : 'bg-slate-200 dark:bg-slate-800 hover:bg-sky-600 hover:text-white text-slate-700 dark:text-slate-200'}`;
      nextBtn.innerHTML = 'Próxima →';
      nextBtn.disabled = feedCurrentPage === totalPages;
      nextBtn.onclick = () => setFeedPage(feedCurrentPage + 1);
      buttonsEl.appendChild(nextBtn);
    }

    function setFeedPage(page) {
      feedCurrentPage = page;
      applyFeedFilters(false);
      const grid = document.getElementById('tab-feed');
      if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // ================= UNIFIED FEED FILTERING PIPELINE =================
    function applyFeedFilters(resetPage = true) {
      if (resetPage) feedCurrentPage = 1;
      let list = [...candidatesData];

      // 1. Cargo Filter
      if (activePosFilter !== 'todos') {
        const posLower = activePosFilter.toLowerCase();
        list = list.filter(c => {
          if (posLower.includes('judiciari') || posLower.includes('ministr')) {
            return (c.officePower === 'judiciario') || (c.position && c.position.toLowerCase().includes('ministr')) || (c.party === 'Magistratura');
          }
          if (posLower === 'executivo') {
            return c.officePower === 'executivo' || (c.position && (c.position.toLowerCase().includes('governad') || c.position.toLowerCase().includes('prefeit') || c.position.toLowerCase().includes('president')));
          }
          if (posLower === 'legislativo') {
            return c.officePower === 'legislativo' || (c.position && (c.position.toLowerCase().includes('deputad') || c.position.toLowerCase().includes('senad')));
          }
          if (!c.position) return false;
          const cPosLower = c.position.toLowerCase();
          if (posLower.includes('senad')) return cPosLower.includes('senad');
          if (posLower.includes('deputad')) return cPosLower.includes('deputad');
          if (posLower.includes('governad')) return cPosLower.includes('governad');
          if (posLower.includes('prefeit')) return cPosLower.includes('prefeit');
          if (posLower.includes('president')) return cPosLower.includes('president');
          return cPosLower.includes(posLower);
        });
      }

      // 2. Estado (UF) Filter
      if (activeStateFilter && activeStateFilter !== 'todos' && activeStateFilter !== 'ALL') {
        list = list.filter(c => c.state && c.state.toUpperCase() === activeStateFilter.toUpperCase());
      }

      // 3. Integridade Filter (Ficha Limpa / Investigação / Inelegível)
      if (activeIntegrityFilter !== 'todos') {
        list = list.filter(c => c.legalIntegrity && c.legalIntegrity.status === activeIntegrityFilter);
      }

      // 4. Search Query Filter
      if (activeSearchQuery) {
        const q = activeSearchQuery.toLowerCase().trim();
        list = list.filter(c => 
          (c.name && c.name.toLowerCase().includes(q)) ||
          (c.ballotName && c.ballotName.toLowerCase().includes(q)) ||
          (c.party && c.party.toLowerCase().includes(q)) ||
          (c.number && c.number.includes(q)) ||
          (c.position && c.position.toLowerCase().includes(q)) ||
          (c.city && c.city.toLowerCase().includes(q)) ||
          (c.state && c.state.toLowerCase().includes(q))
        );
      }

      // 5. Sort Filter
      if (activeSortFilter === 'default' && activePosFilter === 'todos' && activeStateFilter === 'todos' && !activeSearchQuery && activeIntegrityFilter === 'todos') {
        // REGRA DE OURO: Página 1 com 10 do estado do usuário + 10 nacionais mais populares/polêmicos
        const userState = (typeof localStorage !== 'undefined' && localStorage.getItem('userState')) || 'SP';
        
        // 10 do estado do usuário
        const stateCands = list.filter(c => c.state && c.state.toUpperCase() === userState.toUpperCase())
          .sort((a, b) => (a.name || '').localeCompare(b.name || '', 'pt-BR'))
          .slice(0, 10);
        const stateIds = new Set(stateCands.map(c => c.id));

        // 10 populares/polêmicos nacionais
        const nationalCands = [];
        for (const nid of TOP_NATIONAL_ENGAGEMENT_IDS) {
          if (!stateIds.has(nid)) {
            const cand = list.find(c => c.id === nid);
            if (cand) {
              nationalCands.push(cand);
              if (nationalCands.length === 10) break;
            }
          }
        }
        const priorityIds = new Set([...stateCands.map(c => c.id), ...nationalCands.map(c => c.id)]);
        const remaining = list.filter(c => !priorityIds.has(c.id)).sort((a, b) => (a.name || '').localeCompare(b.name || '', 'pt-BR'));

        list = [...stateCands, ...nationalCands, ...remaining];
      } else {
        // Ordenações apenas por dados com fonte (indicadores oficiais) ou por nome; quem não tem o dado vai ao fim.
        const byInd = (key, asc) => (a, b) => {
          const va = window.Indicadores && Indicadores.indicador(a, key);
          const vb = window.Indicadores && Indicadores.indicador(b, key);
          if (!va && !vb) return (a.name || '').localeCompare(b.name || '', 'pt-BR');
          if (!va) return 1;
          if (!vb) return -1;
          return asc ? va.valor - vb.valor : vb.valor - va.valor;
        };
        const sorters = {
          cost_asc: byInd('cotaParlamentar', true),
          attendance_desc: byInd('presenca', false),
          production_desc: byInd('producaoLegislativa', false)
        };
        list.sort(sorters[activeSortFilter] || ((a, b) => (a.name || '').localeCompare(b.name || '', 'pt-BR')));
      }

      renderCandidatesFeed(list);
    }

    function filterIntegrity(status) {
      activeIntegrityFilter = status;
      document.querySelectorAll('.integrity-filter-btn').forEach(btn => {
        if ((status === 'todos' && btn.innerText.includes('Todos')) || 
            (status === 'clean' && btn.innerText.includes('Limpa')) ||
            (status === 'investigated' && btn.innerText.includes('Investigação')) ||
            (status === 'ineligible' && btn.innerText.includes('Inelegíveis'))) {
          btn.className = 'integrity-filter-btn active px-3 py-1.5 rounded-xl bg-sky-600 text-white font-bold text-xs whitespace-nowrap cursor-pointer shadow-sm';
        } else {
          btn.className = 'integrity-filter-btn px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs border border-slate-200 dark:border-white/10 whitespace-nowrap cursor-pointer hover:bg-slate-100';
        }
      });
      applyFeedFilters();
    }

    function filterPosition(pos) {
      activePosFilter = pos;
      document.querySelectorAll('.pos-filter-btn').forEach(btn => {
        if ((pos === 'todos' && btn.innerText.includes('Todos')) || btn.innerText.includes(pos)) {
          btn.className = 'pos-filter-btn active px-3 py-1.5 rounded-xl bg-sky-600 text-white font-bold text-xs shadow-md shadow-sky-600/20 whitespace-nowrap';
        } else {
          btn.className = 'pos-filter-btn px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white font-medium text-xs border border-slate-200 dark:border-white/5 whitespace-nowrap';
        }
      });
      applyFeedFilters();
    }

    function filterState(uf) {
      activeStateFilter = uf;
      applyFeedFilters();
    }

    function sortFeed(criteria) {
      activeSortFilter = criteria;
      applyFeedFilters();
    }

    function searchCandidates(query) {
      activeSearchQuery = query;
      applyFeedFilters();
    }

    function resetFeedFilters() {
      activePosFilter = 'todos';
      activeStateFilter = 'todos';
      activeIntegrityFilter = 'todos';
      activeSortFilter = 'default';
      activeSearchQuery = '';
      feedCurrentPage = 1;
      const stateSel = document.getElementById('feed-state-select');
      if (stateSel) stateSel.value = 'todos';
      const sortSel = document.getElementById('feed-sort-select');
      if (sortSel) sortSel.value = 'default';
      const searchInput = document.getElementById('candidate-search-input');
      if (searchInput) searchInput.value = '';
      document.querySelectorAll('.pos-filter-btn').forEach(btn => {
        if (btn.innerText.includes('Todos')) {
          btn.className = 'pos-filter-btn active px-3 py-1.5 rounded-xl bg-sky-600 text-white font-bold text-xs shadow-md shadow-sky-600/20 whitespace-nowrap';
        } else {
          btn.className = 'pos-filter-btn px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white font-medium text-xs border border-slate-200 dark:border-white/5 whitespace-nowrap';
        }
      });
      document.querySelectorAll('.integrity-filter-btn').forEach(btn => {
        if (btn.innerText.includes('Todos')) {
          btn.className = 'integrity-filter-btn active px-3 py-1.5 rounded-xl bg-sky-600 text-white font-bold text-xs whitespace-nowrap cursor-pointer shadow-sm';
        } else {
          btn.className = 'integrity-filter-btn px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs border border-slate-200 dark:border-white/10 whitespace-nowrap cursor-pointer hover:bg-slate-100';
        }
      });
      applyFeedFilters();
    }

    function shareCandidateWhatsApp(candId) {
      const cand = candidatesData.find(c => c.id === candId);
      if (!cand) return;
      const url = new URL(`dossie.html?id=${encodeURIComponent(cand.id)}`, window.location.href).href;
      const linhas = window.Indicadores ? Indicadores.lista(cand).slice(0, 2).map(x => `• ${x.ind.rotulo || Indicadores.DEFS[x.key].rotulo}: ${Indicadores.formatValor(x.ind)} (fonte: ${x.ind.fonte || 'oficial'})`) : [];
      const text = `*Figuras Políticas 2026*\n\n*${cand.name}* (${cand.party || ''}-${cand.state || ''}) — ${cand.position || ''}\n${linhas.length ? linhas.join('\n') : 'Indicadores oficiais ainda indisponíveis.'}\n\nVeja as fontes no dossiê:\n${url}`;
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
    }
