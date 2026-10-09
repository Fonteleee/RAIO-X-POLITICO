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

      const isNoMandate = (cand.salary && typeof cand.salary.spendingCeapMonthly === 'string' && cand.salary.spendingCeapMonthly.includes('Sem Mandato')) || cand.isIncumbent === false || (cand.position && (cand.position.includes('Ex-') || cand.careerHistory?.includes('Inelegível')));
      const isExec = !isNoMandate && cand.position && (cand.position.includes('Presidente') || cand.position.includes('Governador') || cand.position.includes('Prefeito')) && cand.officePower !== 'judiciario';
      const isPresident = isExec && cand.position.includes('Presidente');
      const isJud = cand.officePower === 'judiciario' || Boolean(cand.court);

      let powerBadge;
      if (cand.position && (cand.position.includes('Ex-') || cand.careerHistory?.includes('Inelegível'))) {
        powerBadge = `<span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/20 inline-flex items-center gap-1"><i data-lucide="shield-alert" class="w-3 h-3"></i> ${cand.position}</span>`;
      } else if (isJud) {
        powerBadge = `<span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-500/20 inline-flex items-center gap-1"><i data-lucide="scale" class="w-3 h-3 text-purple-500"></i> Judiciário (${cand.court || 'STF'})</span>`;
      } else if (isExec) {
        powerBadge = `<span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 inline-flex items-center gap-1"><i data-lucide="landmark" class="w-3 h-3"></i> Executivo</span>`;
      } else if (isNoMandate) {
        powerBadge = `<span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-500/10 text-slate-700 dark:text-slate-300 border border-slate-500/20 inline-flex items-center gap-1"><i data-lucide="user-check" class="w-3 h-3"></i> Postulante • Sem Mandato</span>`;
      } else {
        powerBadge = `<span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20 inline-flex items-center gap-1"><i data-lucide="scale" class="w-3 h-3"></i> Legislativo</span>`;
      }

      const fiscalLabel = isJud ? 'Subsídio CNJ' : (isExec ? 'Meta Fiscal' : (isNoMandate ? 'Custo Atual' : 'Cota Parlamentar'));
      const fiscalValue = isJud ? (cand.salary?.baseSalary || 'R$ 44.008') : (isExec ? (isPresident ? '100% TCU' : '100% TCE') : (isNoMandate ? 'R$ 0,00' : `${cand.salary?.spendingPercentage || 75}% teto`));
      const attendanceLabel = isJud ? 'Prazos ER 58' : (isExec ? 'Gestão' : (isNoMandate ? 'Exercício' : 'Presença'));
      const attendanceValue = isJud ? (cand.judiciaryMetrics?.complianceER58 || '100% no Prazo') : (isExec ? `${cand.attendance?.ratePct || 98}% Metas` : (isNoMandate ? 'Sem Mandato' : `${cand.attendance?.ratePct || 94}%`));

      const displayName = cand.ballotName || cand.name;
      const subtitleName = (cand.ballotName && cand.ballotName !== cand.name)
        ? `<p class="text-[11.5px] text-slate-700 dark:text-slate-200 font-semibold truncate leading-tight mt-0.5">${cand.name}</p>`
        : '';

      // Removido destaque de cargo/votação conforme solicitação do usuário
      const officeBadge = '';

      const mandateSalaryLabel = isJud ? 'Acervo no Gabinete:' : (isExec ? 'Subsídio Mensal do Cargo:' : (isNoMandate ? 'Custo do Mandato:' : 'Cota Parlamentar Média / mês:'));
      const mandateSalaryValue = isJud ? `${cand.judiciaryMetrics?.cabinetCases || 890} processos (DataJud)` : (isNoMandate ? 'R$ 0,00 (Sem Mandato Ativo)' : (cand.salary?.spendingCeapMonthly || (isExec ? 'R$ 35.800,00' : 'R$ 34.200,00')));
      const roiBudgetSnippet = (isExec && cand.salary?.civicConversion?.roiText) ? `
        <div class="text-[10px] text-slate-700 dark:text-slate-300 font-medium flex items-center justify-between border-t border-amber-500/15 dark:border-amber-500/20 pt-1">
          <span class="flex items-center gap-1 font-semibold"><i data-lucide="landmark" class="w-3 h-3 text-blue-600 dark:text-blue-400"></i> Orçamento Sob Gestão:</span>
          <span class="font-bold text-slate-900 dark:text-white truncate max-w-[190px]">${cand.salary.civicConversion.roiText.replace('Gestão de ', '')}</span>
        </div>
      ` : (isJud ? `
        <div class="text-[10px] text-slate-700 dark:text-slate-300 font-medium flex items-center justify-between border-t border-purple-500/15 dark:border-purple-500/20 pt-1">
          <span class="flex items-center gap-1 font-semibold"><i data-lucide="scale" class="w-3 h-3 text-purple-600 dark:text-purple-400"></i> Regime Remuneratório:</span>
          <span class="font-bold text-slate-900 dark:text-white truncate max-w-[190px]">Teto Constitucional • Vistas 90d</span>
        </div>
      ` : '');

      // Integrity Badge
      let legBadge = '';
      if (cand.legalIntegrity) {
        const st = cand.legalIntegrity.status;
        if (st === 'ineligible') {
          legBadge = `<span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/20 inline-flex items-center gap-1"><i data-lucide="alert-triangle" class="w-3 h-3 text-rose-500"></i> Inelegível (LC 135)</span>`;
        } else if (st === 'investigated') {
          legBadge = `<span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 inline-flex items-center gap-1"><i data-lucide="scale" class="w-3 h-3 text-amber-500"></i> Em Investigação</span>`;
        } else {
          legBadge = `<span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 inline-flex items-center gap-1"><i data-lucide="shield-check" class="w-3 h-3 text-emerald-500"></i> Ficha Limpa Plena</span>`;
        }
      }

      // Índice Produtividade Badge (antigo IPR Severo)
      const prodScore = cand.careerProductivity?.productivityScore || cand.overallScore || 80;
      const iprBadge = `<span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-500/20 inline-flex items-center gap-1"><i data-lucide="activity" class="w-3 h-3 text-purple-500"></i> Produtividade: ${prodScore}/100</span>`;

      // Módulos de Inteligência Cívica e Auditoria
      const conflict = (!isJud && typeof window.detectConflictOfInterest === 'function')
        ? window.detectConflictOfInterest(cand)
        : null;
      const audit = (typeof window.generateMetricAuditHash === 'function')
        ? window.generateMetricAuditHash(cand)
        : null;

      let conflictBadge = '';
      if (conflict) {
        if (conflict.hasConflictRisk) {
          conflictBadge = `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30 inline-flex items-center gap-1" title="${conflict.alertMessage}"><i data-lucide="alert-triangle" class="w-3 h-3 text-amber-600 dark:text-amber-400"></i> Alerta Conflito (${conflict.financingPercentage}%)</span>`;
        } else {
          conflictBadge = `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20 inline-flex items-center gap-1" title="Sem conflito detectado: financiamento eleitoral difuso"><i data-lucide="shield-check" class="w-3 h-3 text-emerald-500"></i> Isento de Conflito</span>`;
        }
      }

      let auditBadge = '';
      if (audit && audit.radarHash) {
        const shortHash = audit.radarHash.replace('sha256:', '').substring(0, 10);
        auditBadge = `<span class="px-2 py-0.5 rounded-full text-[9.5px] font-mono font-bold bg-neutral-100 dark:bg-white/10 text-neutral-700 dark:text-neutral-300 border border-black/10 dark:border-white/10 inline-flex items-center gap-1" title="Cálculo auditável e reproduzível com SLA de 5 dias úteis (Resolução TSE nº 23.610/2019)."><i data-lucide="hash" class="w-3 h-3 text-blue-500"></i> SHA-256:${shortHash}…</span>`;
      }

      // Proposals snippet (3 items)
      const proposalsSnippet = (cand.proposals || []).slice(0, 3).map((p, idx) => `
        <div class="flex items-start gap-2 text-xs text-neutral-800 dark:text-neutral-200 font-medium">
          <span class="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">${idx + 1}</span>
          <span class="line-clamp-1">${p.title}</span>
        </div>
      `).join('');

      // Campaign Finance snippet (TSE) & Civic Relativization
      const cf = cand.campaignFinance;
      const relat = (!isJud && typeof calculateCivicRelativization === 'function') 
        ? calculateCivicRelativization(cand) 
        : (!isJud && window.calculateCivicRelativization ? window.calculateCivicRelativization(cand) : null);

      let campaignSnippet = '';
      if (isJud) {
        campaignSnippet = `
          <div class="p-2.5 rounded-2xl bg-purple-500/5 dark:bg-purple-950/20 border border-purple-500/20 space-y-1.5 my-2 text-xs">
            <div class="flex items-center justify-between text-[11px]">
              <div class="flex items-center gap-1.5 font-bold text-purple-900 dark:text-purple-300">
                <i data-lucide="scale" class="w-3.5 h-3.5 text-purple-600 dark:text-purple-400"></i>
                <span>Acervo no Gabinete:</span>
                <strong class="font-mono text-neutral-900 dark:text-white font-bold">${cand.judiciaryMetrics?.cabinetCases || 950} processos</strong>
              </div>
              <div class="flex items-center gap-1 text-[10px] text-purple-700 dark:text-purple-300">
                <span class="font-semibold">${cand.judiciaryMetrics?.activeThesesCount || 15} teses</span>
                <span class="text-neutral-300 dark:text-neutral-600">•</span>
                <span class="text-emerald-600 dark:text-emerald-400 font-bold">ER 58: 100% no prazo</span>
              </div>
            </div>
            <div class="pt-1.5 border-t border-purple-300/40 dark:border-purple-500/25 flex items-start gap-1.5 text-[10.5px] leading-tight text-purple-950 dark:text-purple-200">
              <i data-lucide="award" class="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5"></i>
              <span><strong class="font-bold text-purple-900 dark:text-purple-300">Indicação:</strong> ${cand.indicatedBy || cand.institutionalOrigin || 'Indicação Presidencial e Sabatina no Senado'}.</span>
            </div>
          </div>
        `;
      } else if (cf || relat) {
        const totalSpentText = cf?.totalSpentFormatted || relat?.totalSpent || 'R$ 2,4 mi';
        const costVote = cf?.costPerVote ? (cf.costPerVote.includes('voto') ? cf.costPerVote : cf.costPerVote + ' por voto') : '';
        const fefcPct = cf?.publicFundPct !== undefined ? `${cf.publicFundPct}% FEFC` : 'Fundo Eleitoral';
        const relatText = relat?.shortSummary || '';

        campaignSnippet = `
          <div class="p-2.5 rounded-2xl bg-purple-500/5 dark:bg-purple-950/20 border border-purple-500/20 space-y-1.5 my-2 text-xs">
            <div class="flex items-center justify-between text-[11px]">
              <div class="flex items-center gap-1.5 font-bold text-purple-900 dark:text-purple-300">
                <i data-lucide="vote" class="w-3.5 h-3.5 text-purple-600 dark:text-purple-400"></i>
                <span>Campanha TSE:</span>
                <strong class="font-mono text-neutral-900 dark:text-white font-bold">${totalSpentText}</strong>
              </div>
              <div class="flex items-center gap-1 text-[10px] text-purple-700 dark:text-purple-300">
                ${costVote ? `<span class="font-semibold">${costVote}</span><span class="text-neutral-300 dark:text-neutral-600">•</span>` : ''}
                <span class="text-emerald-600 dark:text-emerald-400 font-bold">${fefcPct}</span>
              </div>
            </div>
            ${relatText ? `
              <div class="pt-1.5 border-t border-purple-300/40 dark:border-purple-500/25 flex items-start gap-1.5 text-[10.5px] leading-tight text-purple-950 dark:text-purple-200">
                <i data-lucide="sparkles" class="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5"></i>
                <span><strong class="font-bold text-purple-900 dark:text-purple-300">O que este valor compraria:</strong> ${relatText}.</span>
              </div>
            ` : ''}
          </div>
        `;
      }

      // Circular Ring Progress calculation (Radius 15, Circ = 94.25)
      const ringRadius = 15;
      const ringCircumference = 2 * Math.PI * ringRadius;
      const scorePct = Math.min(100, Math.max(0, cand.overallScore || 0));
      const ringDashoffset = ringCircumference - (scorePct / 100) * ringCircumference;

      card.innerHTML = `
        <!-- Dynamic Glare Layer -->
        <div class="apple-card-glare pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 rounded-3xl" style="background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.2) 0%, transparent 60%);"></div>

        <div>
          <!-- Header: Photo + Core Info -->
          <div class="flex items-start gap-3.5">
            <div class="relative w-16 h-16 rounded-2xl overflow-hidden shadow-md flex-shrink-0 bg-neutral-100 dark:bg-neutral-800 border border-black/10 dark:border-white/10">
              <img 
                src="${(window.getSafeAvatarUrl ? window.getSafeAvatarUrl(cand, displayName) : (cand.avatar || 'img/candidates/' + cand.id + '.jpg'))}" 
                alt="${displayName}" 
                loading="lazy"
                decoding="async"
                onerror="this.onerror=null; this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=0071e3&color=fff&bold=true&size=128';"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              >
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between gap-1 flex-wrap">
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-neutral-100 dark:bg-white/10 text-neutral-800 dark:text-neutral-200 border border-black/5 dark:border-white/10">
                  ${cand.party} • Nº ${cand.number}
                </span>
                ${powerBadge}
              </div>
              <h3 class="font-bold text-base text-neutral-900 dark:text-white mt-1 leading-snug truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" title="${cand.name}">${displayName}</h3>
              ${subtitleName}
              <p class="text-xs text-slate-700 dark:text-slate-200 truncate mt-0.5 font-semibold">${cand.position} • ${cand.state} • ${cand.age} anos</p>
              
              <!-- Score Geral com Anel de Atividade Apple posicionado logo abaixo do Cargo -->
              <div class="flex items-center gap-2 mt-1.5 flex-wrap">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20 shadow-xs">
                  <span class="relative flex items-center justify-center w-4 h-4 flex-shrink-0">
                    <svg class="w-4 h-4 -rotate-90" viewBox="0 0 38 38">
                      <circle cx="19" cy="19" r="${ringRadius}" class="stroke-neutral-300 dark:stroke-neutral-700" stroke-width="4.5" fill="none" />
                      <circle cx="19" cy="19" r="${ringRadius}" class="stroke-blue-600 dark:stroke-blue-400" stroke-width="4.5" stroke-dasharray="${ringCircumference}" stroke-dashoffset="${ringDashoffset}" stroke-linecap="round" fill="none" />
                    </svg>
                  </span>
                  <span>Score Geral: <strong class="font-mono text-neutral-900 dark:text-white font-extrabold">${cand.overallScore}</strong></span>
                </span>
              </div>

              <!-- Location + Election Date or Institutional Term Pills -->
              <div class="flex flex-wrap items-center gap-1.5 mt-1.5 text-[10px]">
                <span class="inline-flex items-center gap-1 font-semibold text-blue-700 dark:text-blue-300 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20">
                  <i data-lucide="map-pin" class="w-3 h-3 text-blue-600 dark:text-blue-400"></i> ${cand.city || cand.state}
                </span>
                ${isJud ? `
                  <span class="inline-flex items-center gap-1 font-semibold text-purple-700 dark:text-purple-300 bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20" title="Posse no cargo e ano da aposentadoria compulsória aos 75 anos (EC 88/2015)">
                    <i data-lucide="landmark" class="w-3 h-3 text-purple-600 dark:text-purple-400"></i> Posse ${cand.appointmentYear || 2018} • Compulsória ${cand.retirementYear || 2035}
                  </span>
                ` : `
                  <span class="inline-flex items-center gap-1 font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    <i data-lucide="calendar" class="w-3 h-3 text-emerald-600 dark:text-emerald-400"></i> 04/10/2026
                  </span>
                `}
              </div>
            </div>
          </div>

          <!-- Badges de Integridade Legal, Produtividade, Conflito & Auditoria -->
          <div class="flex flex-wrap items-center gap-1.5 mt-2 pt-2 border-t border-black/5 dark:border-white/10">
            ${legBadge}
            ${iprBadge}
            ${conflictBadge}
            ${auditBadge}
          </div>

          <!-- Civic Mandate Cost / Remuneration Highlight -->
          <div class="p-2.5 rounded-2xl ${isJud ? 'bg-purple-500/5 dark:bg-purple-950/20 border-purple-500/20' : 'bg-amber-500/5 dark:bg-amber-950/20 border-amber-500/20'} border space-y-1.5 my-2 text-xs">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-1.5 font-bold ${isJud ? 'text-purple-900 dark:text-purple-300' : 'text-amber-900 dark:text-amber-300'} text-[11px]">
                <i data-lucide="${isJud ? 'scale' : 'timer'}" class="w-3.5 h-3.5 ${isJud ? 'text-purple-600 dark:text-purple-400' : 'text-amber-600 dark:text-amber-400'}"></i>
                <span>${isJud ? 'Remuneração Constitucional:' : 'Custo aos Cofres Públicos:'}</span>
              </div>
              <span class="font-bold ${isJud ? 'text-purple-800 dark:text-purple-300' : 'text-amber-800 dark:text-amber-300'} font-mono text-[11px]">${isJud ? 'R$ 44.008,52 / mês' : (cand.salary?.civicConversion?.costPerMinute || cand.salary?.costPerMinute || 'R$ 0,51 / min')}</span>
            </div>
            <div class="text-[10px] text-neutral-600 dark:text-neutral-300 flex items-center justify-between border-t ${isJud ? 'border-purple-500/15 dark:border-purple-500/20' : 'border-amber-500/15 dark:border-amber-500/20'} pt-1">
              <span class="flex items-center gap-1 font-medium"><i data-lucide="${isJud ? 'file-text' : 'wallet'}" class="w-3 h-3 text-emerald-600 dark:text-emerald-400"></i> ${mandateSalaryLabel}</span>
              <strong class="text-emerald-700 dark:text-emerald-300 font-bold">${mandateSalaryValue}</strong>
            </div>
            ${roiBudgetSnippet}
          </div>

          <!-- Campaign Finance or Judiciary Institution Highlight -->
          ${campaignSnippet}

          <!-- 3 Main Proposals / Theses Card -->
          <div class="p-2.5 bg-black/[0.02] dark:bg-white/[0.03] rounded-2xl border border-black/5 dark:border-white/5 space-y-1.5 mt-2">
            <div class="flex items-center justify-between text-[11px] font-bold text-neutral-900 dark:text-white">
              <span class="flex items-center gap-1.5"><i data-lucide="${isJud ? 'scale' : 'scroll-text'}" class="w-3.5 h-3.5 ${isJud ? 'text-purple-600 dark:text-purple-400' : 'text-blue-600 dark:text-blue-400'}"></i> ${isJud ? '3 Principais Teses & Atuações' : '3 Principais Propostas'}</span>
              <button onclick="event.stopPropagation(); if(typeof openDossie === 'function') openDossie('${cand.id}', 'propostas-tse');" class="text-blue-600 dark:text-blue-400 hover:underline font-semibold text-[10px] cursor-pointer">Ver todas (${cand.proposals ? cand.proposals.length : 3})</button>
            </div>
            <div class="space-y-1">
              ${proposalsSnippet}
            </div>
          </div>
        </div>

        <!-- Card Bottom Actions: posicionamento elevado e sem distanciamento vazio -->
        <div class="pt-2 border-t border-black/5 dark:border-white/10 flex items-center gap-1.5 mt-1.5">
          <button onclick="event.stopPropagation(); if(typeof openDossie === 'function') openDossie('${cand.id}'); else window.location.href='dossie.html?id=${cand.id}';" class="flex-1 py-1.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/20 transition cursor-pointer">
            <i data-lucide="folder-search" class="w-3.5 h-3.5"></i> Dossiê
          </button>
          <button onclick="event.stopPropagation(); if(typeof openExportModalFor === 'function') openExportModalFor('${cand.id}');" class="px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-95 text-white font-semibold text-xs shadow-md shadow-indigo-500/20 transition flex items-center justify-center gap-1.5 cursor-pointer" title="Gerar Figurinha Colecionável (17 Temas)">
            <i data-lucide="sparkles" class="w-3.5 h-3.5"></i> Figurinha
          </button>
          <button onclick="event.stopPropagation(); if(typeof toggleCompare === 'function') toggleCompare('${cand.id}');" class="p-1.5 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/5 dark:border-white/10 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition cursor-pointer" title="Comparar no Duelo 1v1">
            <i data-lucide="scale" class="w-4 h-4 text-purple-600 dark:text-purple-400"></i>
          </button>
          <button onclick="event.stopPropagation(); if(typeof shareCandidateWhatsApp === 'function') shareCandidateWhatsApp('${cand.id}');" class="p-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md shadow-emerald-600/20 transition flex items-center justify-center cursor-pointer" title="Compartilhar no WhatsApp">
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
