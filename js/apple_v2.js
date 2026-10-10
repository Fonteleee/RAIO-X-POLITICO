/**
 * Figuras Políticas - Versão 2 (Apple Edition Engine)
 * Arquitetura de Motion, 3D Spatial Tilt, Dynamic Glare, Segmented Capsule e Feed Enriquecido
 */

(function () {
  'use strict';

  // State V2
  let activeTabV2 = 'feed';
  let feedCurrentPageV2 = 1;
  const feedPageSizeV2 = 12;
  let currentOfficeFilterV2 = 'todos';
  let currentSearchQueryV2 = '';
  let currentUfFilterV2 = 'todos';

  // ================= APPLE TABS & SEGMENTED CONTROL =================
  function initAppleTabs() {
    const tabButtons = document.querySelectorAll('[data-apple-tab]');
    tabButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tabId = btn.getAttribute('data-apple-tab');
        switchAppleTab(tabId);
      });
    });

    // Handle deep links or hash
    const hash = window.location.hash.replace('#', '');
    if (['feed', 'ranking', 'comparator', 'match', 'incumbents', 'urna', 'gargalos'].includes(hash)) {
      switchAppleTab(hash);
    } else {
      updateApplePillPosition('feed');
    }
  }

  function switchAppleTab(tabId) {
    activeTabV2 = tabId;
    window.location.hash = tabId;

    const allTabs = ['feed', 'ranking', 'comparator', 'match', 'incumbents', 'urna', 'gargalos'];
    allTabs.forEach(id => {
      const tabEl = document.getElementById(`tab-${id}`);
      if (tabEl) {
        if (id === tabId) {
          tabEl.classList.remove('hidden');
          tabEl.style.opacity = '0';
          tabEl.style.transform = 'translateY(8px)';
          requestAnimationFrame(() => {
            tabEl.style.transition = 'opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
            tabEl.style.opacity = '1';
            tabEl.style.transform = 'translateY(0)';
          });
        } else {
          tabEl.classList.add('hidden');
        }
      }

      // Desktop nav button text styling
      const btn = document.querySelector(`[data-apple-tab="${id}"]`);
      if (btn) {
        if (id === tabId) {
          btn.classList.add('text-black', 'dark:text-white', 'font-bold');
          btn.classList.remove('text-neutral-500', 'dark:text-neutral-400');
        } else {
          btn.classList.remove('text-black', 'dark:text-white', 'font-bold');
          btn.classList.add('text-neutral-500', 'dark:text-neutral-400');
        }
      }

      // Mobile nav button styling
      const mBtn = document.getElementById(`mobile-nav-${id}`);
      if (mBtn) {
        if (id === tabId) {
          mBtn.className = 'flex flex-col items-center justify-center flex-1 py-1 text-[10px] font-bold text-blue-600 dark:text-blue-400 min-h-[44px] transition cursor-pointer';
        } else {
          mBtn.className = 'flex flex-col items-center justify-center flex-1 py-1 text-[10px] font-medium text-neutral-500 dark:text-neutral-400 min-h-[44px] transition cursor-pointer';
        }
      }
    });

    // Toggle Keynote Hero Banner & Timeline Bar (Oculta no Comparador e Urna para colar o menu no topo absoluto e dar visão 100% imediata da figurinha/urna)
    const keynoteHero = document.getElementById('apple-keynote-hero');
    const timelineBar = document.getElementById('apple-election-timeline-bar');
    const shouldHideBanners = (tabId === 'comparator' || tabId === 'urna');
    if (keynoteHero) {
      if (shouldHideBanners) {
        keynoteHero.classList.add('hidden');
      } else {
        keynoteHero.classList.remove('hidden');
      }
    }
    if (timelineBar) {
      if (shouldHideBanners) {
        timelineBar.classList.add('hidden');
      } else {
        timelineBar.classList.remove('hidden');
      }
    }

    updateApplePillPosition(tabId);
    requestAnimationFrame(() => updateApplePillPosition(tabId));

    // Trigger tab-specific initializers
    if (tabId === 'ranking') {
      if (typeof renderAppleRankingTab === 'function') {
        renderAppleRankingTab();
      } else if (typeof renderRankingTab === 'function') {
        renderRankingTab();
      }
    } else if (tabId === 'comparator') {
      if (typeof renderComparator === 'function') renderComparator();
    } else if (tabId === 'match') {
      if (typeof renderQuiz === 'function') renderQuiz();
    } else if (tabId === 'incumbents') {
      if (typeof renderIncumbents === 'function') renderIncumbents();
    } else if (tabId === 'urna') {
      if (typeof window.renderUrnaInterface === 'function') {
        window.renderUrnaInterface();
      } else if (typeof window.initUrna === 'function') {
        window.initUrna();
      }
      if (typeof window.updateUrnaScreen === 'function') {
        window.updateUrnaScreen();
      }
      if (window.lucide) lucide.createIcons();
    } else if (tabId === 'gargalos') {
      if (typeof window.renderNationalBottlenecksGrid === 'function') {
        window.renderNationalBottlenecksGrid();
      }
      if (window.lucide) lucide.createIcons();
    }

    // Scroll instantâneo ao topo para visualização imediata da figurinha sem rolagem
    window.scrollTo(0, 0);
  }

  function updateApplePillPosition(tabId) {
    const pill = document.getElementById('apple-segmented-pill');
    const activeBtn = document.querySelector(`[data-apple-tab="${tabId}"]`);
    if (!pill || !activeBtn) return;

    const parentRect = activeBtn.parentElement.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();

    pill.style.width = `${btnRect.width}px`;
    pill.style.transform = `translateX(${btnRect.left - parentRect.left}px)`;
  }

  // ================= 3D SPATIAL TILT & DYNAMIC GLARE =================
  function attach3DTiltToCards() {
    const cards = document.querySelectorAll('.apple-card-3d');
    cards.forEach(card => {
      // Avoid duplicate bindings
      if (card.dataset.tiltAttached === 'true') return;
      card.dataset.tiltAttached = 'true';

      const glare = card.querySelector('.apple-card-glare');

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -6; // Max 6 deg
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        card.style.boxShadow = `0 20px 35px -10px rgba(0, 0, 0, 0.15), 0 0 20px 2px rgba(0, 113, 227, 0.12)`;

        if (glare) {
          glare.style.opacity = '1';
          glare.style.background = `radial-gradient(circle at ${(x / rect.width) * 100}% ${(y / rect.height) * 100}%, rgba(255, 255, 255, 0.22) 0%, transparent 60%)`;
        }
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        card.style.boxShadow = '';
        if (glare) {
          glare.style.opacity = '0';
        }
      });
    });
  }

  // ================= APPLE ENRICHED FEED RENDERER =================
  function renderAppleCandidatesFeed() {
    const grid = document.getElementById('candidates-grid');
    if (!grid) return;

    if (typeof candidatesData === 'undefined' || !Array.isArray(candidatesData)) {
      console.warn('[Apple V2] candidatesData not ready yet.');
      return;
    }

    let list = [...candidatesData];

    // Filter by office
    if (currentOfficeFilterV2 && currentOfficeFilterV2 !== 'todos') {
      const f = currentOfficeFilterV2.toLowerCase();
      if (f.includes('judici') || f.includes('magistratura')) {
        list = list.filter(c => c.officePower === 'judiciario' || (c.position || '').toLowerCase().includes('ministr') || (c.position || '').toLowerCase().includes('procurador'));
      } else {
        list = list.filter(c => (c.position || '').toLowerCase().includes(f));
      }
    }

    // Filter by UF
    if (currentUfFilterV2 && currentUfFilterV2 !== 'todos') {
      list = list.filter(c => (c.state || '').toUpperCase() === currentUfFilterV2.toUpperCase());
    }

    // Filter by search query
    if (currentSearchQueryV2 && currentSearchQueryV2.trim().length > 0) {
      const q = currentSearchQueryV2.toLowerCase().trim();
      list = list.filter(c =>
        (c.name || '').toLowerCase().includes(q) ||
        (c.ballotName || '').toLowerCase().includes(q) ||
        (c.party || '').toLowerCase().includes(q) ||
        (c.position || '').toLowerCase().includes(q) ||
        (c.number || '').toLowerCase().includes(q) ||
        (c.state || '').toLowerCase().includes(q)
      );
    }

    const totalCount = list.length;
    const totalPages = Math.ceil(totalCount / feedPageSizeV2) || 1;
    if (feedCurrentPageV2 > totalPages) feedCurrentPageV2 = 1;

    const startIndex = (feedCurrentPageV2 - 1) * feedPageSizeV2;
    const paginated = list.slice(startIndex, startIndex + feedPageSizeV2);

    // Update stats header
    const statsHeader = document.getElementById('feed-stats-count');
    if (statsHeader) {
      statsHeader.innerHTML = `Mostrando <strong class="text-black dark:text-white font-semibold">${paginated.length}</strong> de <strong class="text-black dark:text-white font-semibold">${totalCount}</strong> políticos • Página ${feedCurrentPageV2} de ${totalPages}`;
    }

    // Render pagination controls
    renderApplePaginationControls(totalCount, totalPages);

    grid.innerHTML = '';

    if (totalCount === 0) {
      grid.innerHTML = `
        <div class="col-span-full text-center py-16 px-6 rounded-3xl bg-white/60 dark:bg-white/[0.03] backdrop-blur-xl border border-dashed border-neutral-300 dark:border-white/15 space-y-4">
          <div class="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-neutral-400 mx-auto flex items-center justify-center">
            <i data-lucide="search-x" class="w-6 h-6"></i>
          </div>
          <h4 class="font-bold text-neutral-900 dark:text-white text-base">Nenhum candidato encontrado</h4>
          <p class="text-xs text-neutral-500 dark:text-neutral-400 max-w-md mx-auto">Tente ajustar o termo de pesquisa ou selecionar outro cargo/estado.</p>
          <button onclick="window.resetAppleFeedFilters()" class="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md transition cursor-pointer">
            Limpar Filtros & Ver Todos (${candidatesData.length})
          </button>
        </div>
      `;
      if (typeof lucide !== 'undefined') lucide.createIcons();
      return;
    }

    paginated.forEach(cand => {
      const card = document.createElement('div');
      card.className = 'apple-card-3d relative rounded-3xl p-5 bg-white/75 dark:bg-[#1c1c1e]/75 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer group flex flex-col space-y-2.5';
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.onclick = () => {
        if (typeof openDossie === 'function') {
          openDossie(cand.id);
        } else {
          window.location.href = `dossie.html?id=${cand.id}`;
        }
      };
      card.onkeydown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (typeof openDossie === 'function') openDossie(cand.id);
        }
      };

      // Card sem nota: identidade, situação real e até 2 indicadores oficiais com fonte.
      const I = window.Indicadores;
      const E = I ? I.esc : (v => String(v == null ? '' : v));
      const displayName = cand.ballotName || cand.name;
      const inds = I ? I.lista(cand).slice(0, 2) : [];
      const indHtml = inds.length
        ? inds.map(x => `
            <div class="flex items-center justify-between text-xs">
              <span class="text-neutral-600 dark:text-neutral-400">${E(x.ind.rotulo || I.DEFS[x.key].rotulo)}</span>
              <strong class="font-mono text-neutral-900 dark:text-white">${E(I.formatValor(x.ind))}</strong>
            </div>
            <p class="text-[10px] text-neutral-500 dark:text-neutral-400 text-right">Fonte: ${E(x.ind.fonte || '')}${x.ind.consultadoEm ? ` · ${E(I.dataBR(x.ind.consultadoEm))}` : ''}</p>`).join('')
        : `<p class="text-xs text-neutral-500 dark:text-neutral-400">${E(I ? I.SEM_FONTE : 'Dado indisponível')}</p>`;
      const t = cand.tse2026;
      const tseHtml = (t && t.cargo)
        ? `<span class="inline-flex items-center gap-1 font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20"><i data-lucide="vote" class="w-3 h-3"></i> 2026: ${E(t.cargo)}${t.numero ? ` nº ${E(t.numero)}` : ''}${t.situacaoTurno ? ` · ${E(t.situacaoTurno)}` : ''}</span>`
        : '';

      card.innerHTML = `
        <div class="apple-card-glare pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 rounded-3xl" style="background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.2) 0%, transparent 60%);"></div>
        <div>
          <div class="flex items-start gap-3.5">
            <div class="relative w-16 h-16 rounded-2xl overflow-hidden shadow-md flex-shrink-0 bg-neutral-100 dark:bg-neutral-800 border border-black/10 dark:border-white/10">
              <img src="${E(cand.avatar || 'favicon.svg')}" alt="${E(displayName)}" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='favicon.svg';" class="w-full h-full object-cover">
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between gap-1 flex-wrap">
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-neutral-100 dark:bg-white/10 text-neutral-800 dark:text-neutral-200 border border-black/5 dark:border-white/10">${E(cand.party || '')}</span>
                ${I ? I.statusBadgeHtml(cand) : ''}
              </div>
              <h3 class="font-bold text-base text-neutral-900 dark:text-white mt-1 leading-snug truncate" title="${E(cand.name)}">${E(displayName)}</h3>
              <p class="text-xs text-slate-700 dark:text-slate-200 truncate mt-0.5 font-semibold">${E(cand.position || '')} • ${E(cand.state || '')}</p>
              <div class="flex flex-wrap items-center gap-1.5 mt-1.5 text-[10px]">${tseHtml}</div>
            </div>
          </div>
          <div class="p-2.5 bg-black/[0.02] dark:bg-white/[0.03] rounded-2xl border border-black/5 dark:border-white/5 space-y-1 mt-2">
            <span class="text-[10px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Indicadores oficiais</span>
            ${indHtml}
          </div>
        </div>
        <div class="pt-2 border-t border-black/5 dark:border-white/10 flex items-center gap-1.5 mt-1.5">
          <button onclick="event.stopPropagation(); if(typeof openDossie === 'function') openDossie('${E(cand.id)}');" class="flex-1 py-1.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md transition cursor-pointer">
            <i data-lucide="folder-search" class="w-3.5 h-3.5"></i> Dossiê
          </button>
          <button onclick="event.stopPropagation(); if(typeof openExportModalFor === 'function') openExportModalFor('${E(cand.id)}');" class="px-3 py-1.5 rounded-xl bg-indigo-600 hover:opacity-95 text-white font-semibold text-xs shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer" title="Gerar figurinha com indicadores oficiais">
            <i data-lucide="sparkles" class="w-3.5 h-3.5"></i> Figurinha
          </button>
          <button onclick="event.stopPropagation(); if(typeof toggleCompare === 'function') toggleCompare('${E(cand.id)}');" class="p-1.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-neutral-700 dark:text-neutral-300 transition cursor-pointer" title="Comparar indicadores">
            <i data-lucide="scale" class="w-4 h-4 text-purple-600 dark:text-purple-400"></i>
          </button>
          <button onclick="event.stopPropagation(); if(typeof shareCandidateWhatsApp === 'function') shareCandidateWhatsApp('${E(cand.id)}');" class="p-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs shadow-md transition flex items-center justify-center cursor-pointer" title="Compartilhar no WhatsApp">
            <i data-lucide="message-circle" class="w-4 h-4"></i>
          </button>
        </div>
      `;


      grid.appendChild(card);
    });

    if (typeof lucide !== 'undefined') lucide.createIcons();

    // Attach 3D tilt
    attach3DTiltToCards();
  }

  // ================= 3D SPATIAL PARALLAX & TACTILE TILT =================
  function attach3DTiltToCards() {
    const cards = document.querySelectorAll('.apple-card-3d');
    cards.forEach(card => {
      if (card._hasTiltAttached) return;
      card._hasTiltAttached = true;

      const glare = card.querySelector('.apple-card-glare');

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -7.5;
        const rotateY = ((x - centerX) / centerX) * 7.5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;
        card.style.transition = 'transform 0.08s ease-out';

        if (glare) {
          glare.style.opacity = '1';
          glare.style.background = `radial-gradient(circle at ${(x / rect.width) * 100}% ${(y / rect.height) * 100}%, rgba(255, 255, 255, 0.22) 0%, transparent 60%)`;
        }
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        card.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
        if (glare) {
          glare.style.opacity = '0';
        }
      });
    });
  }

  // ================= APPLE FEED PAGINATION CONTROLS =================
  function renderApplePaginationControls(totalCount, totalPages) {
    const infoEl = document.getElementById('pagination-info');
    const buttonsEl = document.getElementById('pagination-buttons');
    if (!infoEl || !buttonsEl) return;

    infoEl.innerHTML = `Página <strong>${feedCurrentPageV2}</strong> de <strong>${totalPages}</strong> • Total de ${totalCount} políticos`;
    buttonsEl.innerHTML = '';

    if (totalPages <= 1) return;

    // Previous Button
    const prevBtn = document.createElement('button');
    prevBtn.className = `px-3.5 py-1.5 rounded-full font-semibold text-xs transition cursor-pointer ${feedCurrentPageV2 === 1 ? 'opacity-40 cursor-not-allowed bg-black/5 dark:bg-white/5 text-neutral-400' : 'bg-black/5 dark:bg-white/10 hover:bg-blue-600 hover:text-white text-neutral-700 dark:text-neutral-200'}`;
    prevBtn.innerText = '← Anterior';
    prevBtn.disabled = feedCurrentPageV2 === 1;
    prevBtn.onclick = () => {
      if (feedCurrentPageV2 > 1) {
        feedCurrentPageV2--;
        renderAppleCandidatesFeed();
        const feedTop = document.getElementById('tab-feed');
        if (feedTop) feedTop.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    buttonsEl.appendChild(prevBtn);

    // Page Numbers
    let startPage = Math.max(1, feedCurrentPageV2 - 2);
    let endPage = Math.min(totalPages, startPage + 4);
    if (endPage - startPage < 4) startPage = Math.max(1, endPage - 4);

    for (let p = startPage; p <= endPage; p++) {
      const pageBtn = document.createElement('button');
      pageBtn.className = `w-8 h-8 rounded-full font-semibold text-xs flex items-center justify-center transition cursor-pointer ${p === feedCurrentPageV2 ? 'bg-blue-600 text-white shadow-sm' : 'bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-neutral-700 dark:text-neutral-300'}`;
      pageBtn.innerText = p;
      pageBtn.onclick = () => {
        feedCurrentPageV2 = p;
        renderAppleCandidatesFeed();
        const feedTop = document.getElementById('tab-feed');
        if (feedTop) feedTop.scrollIntoView({ behavior: 'smooth', block: 'start' });
      };
      buttonsEl.appendChild(pageBtn);
    }

    // Next Button
    const nextBtn = document.createElement('button');
    nextBtn.className = `px-3.5 py-1.5 rounded-full font-semibold text-xs transition cursor-pointer ${feedCurrentPageV2 === totalPages ? 'opacity-40 cursor-not-allowed bg-black/5 dark:bg-white/5 text-neutral-400' : 'bg-black/5 dark:bg-white/10 hover:bg-blue-600 hover:text-white text-neutral-700 dark:text-neutral-200'}`;
    nextBtn.innerText = 'Próxima →';
    nextBtn.disabled = feedCurrentPageV2 === totalPages;
    nextBtn.onclick = () => {
      if (feedCurrentPageV2 < totalPages) {
        feedCurrentPageV2++;
        renderAppleCandidatesFeed();
        const feedTop = document.getElementById('tab-feed');
        if (feedTop) feedTop.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    buttonsEl.appendChild(nextBtn);
  }

  // ================= APPLE FILTER HELPERS =================
  window.setAppleOfficeFilter = function (office) {
    currentOfficeFilterV2 = office;
    feedCurrentPageV2 = 1;

    // Update filter pills UI
    const pills = document.querySelectorAll('[data-office-pill]');
    pills.forEach(pill => {
      const val = pill.getAttribute('data-office-pill');
      if (val === office) {
        pill.className = 'px-4 py-1.5 rounded-full text-xs font-semibold bg-blue-600 text-white shadow-sm cursor-pointer transition';
      } else {
        pill.className = 'px-4 py-1.5 rounded-full text-xs font-semibold bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white cursor-pointer transition';
      }
    });

    renderAppleCandidatesFeed();
  };

  window.handleAppleSearch = function (query) {
    currentSearchQueryV2 = query;
    feedCurrentPageV2 = 1;
    renderAppleCandidatesFeed();
  };

  window.resetAppleFeedFilters = function () {
    currentOfficeFilterV2 = 'todos';
    currentSearchQueryV2 = '';
    currentUfFilterV2 = 'todos';
    feedCurrentPageV2 = 1;

    const input = document.getElementById('filter-search');
    if (input) input.value = '';

    window.setAppleOfficeFilter('todos');
  };

  // ================= APPLE RANKING PODIUM & SHEET =================
  function renderAppleRankingTab() {
    // If standard ranking exists, run it first then enhance with Apple styling
    if (typeof renderRankingTab === 'function') {
      renderRankingTab();
    }
  }

  // ================= THEME SYSTEM (APPLE ADAPTIVE) =================
  function initAppleTheme() {
    const saved = localStorage.getItem('civic_theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = saved === 'dark' || (!saved && prefersDark);

    applyAppleTheme(isDark);
  }

  function applyAppleTheme(isDark) {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
      localStorage.setItem('civic_theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('civic_theme', 'light');
    }

    const icon = document.getElementById('theme-toggle-icon');
    const label = document.getElementById('theme-label');
    if (icon) {
      icon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
    }
    if (label) {
      label.innerText = isDark ? 'Modo Claro' : 'Modo Escuro';
    }
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  window.toggleAppleTheme = function () {
    const isDark = document.documentElement.classList.contains('dark');
    applyAppleTheme(!isDark);
  };

  // ================= EXPORTS & HOOKS =================
  window.switchAppleTab = switchAppleTab;
  window.renderAppleCandidatesFeed = renderAppleCandidatesFeed;
  window.attach3DTiltToCards = attach3DTiltToCards;
  window.openDossie = function (candId, initialSubTab = 'visao-geral') {
    window.location.href = `dossie.html?id=${encodeURIComponent(candId)}&tab=${encodeURIComponent(initialSubTab)}`;
  };

  // Override ranking.js renderCandidatesFeed so any filter call renders Apple cards
  window.renderCandidatesFeed = renderAppleCandidatesFeed;
  window.navigateTab = switchAppleTab;

  // ================= BOOTSTRAP ON LOAD =================
  function bootstrapAppleV2() {
    initAppleTheme();
    initAppleTabs();
    renderAppleCandidatesFeed();

    // Window resize handler for segmented pill recalculation
    window.addEventListener('resize', () => {
      updateApplePillPosition(activeTabV2);
    });

    // Window hashchange listener for smooth deep linking
    window.addEventListener('hashchange', () => {
      const h = window.location.hash.replace('#', '');
      if (['feed', 'ranking', 'comparator', 'match', 'incumbents', 'urna'].includes(h)) {
        switchAppleTab(h);
      }
    });

    // Check deep links for stickers modal
    const urlParams = new URLSearchParams(window.location.search);
    const figId = urlParams.get('figurinha') || urlParams.get('openFigurinha');
    const figTheme = urlParams.get('theme');
    if (figId && typeof openExportModalFor === 'function') {
      setTimeout(() => {
        openExportModalFor(figId, false, figTheme);
      }, 350);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrapAppleV2);
  } else {
    bootstrapAppleV2();
  }

})();
