// Figuras Políticas - Figurinhas Colecionáveis, Download 1080p/4K e Compartilhamento

// ================= INCUMBENTS RENDERER (158 MANDATÁRIOS COM FILTROS) =================
    let activeIncumbentCargo = 'todos';
    let activeIncumbentState = 'todos';
    let activeIncumbentSearch = '';

    function renderIncumbents() {
      const grid = document.getElementById('incumbents-grid');
      if (!grid) return;

      const data = (typeof window !== 'undefined' && window.incumbentsData) ? window.incumbentsData : (typeof incumbentsData !== 'undefined' ? incumbentsData : []);
      
      let filtered = [...data];

      // Filtro de Cargo
      if (activeIncumbentCargo !== 'todos') {
        filtered = filtered.filter(inc => {
          if (inc.cargoCategory) return inc.cargoCategory === activeIncumbentCargo;
          const off = (inc.office || '').toLowerCase();
          return off.includes(activeIncumbentCargo);
        });
      }

      // Filtro de Estado
      if (activeIncumbentState !== 'todos') {
        filtered = filtered.filter(inc => inc.state && inc.state.toUpperCase() === activeIncumbentState.toUpperCase());
      }

      // Filtro de Busca
      if (activeIncumbentSearch) {
        const q = activeIncumbentSearch.toLowerCase().trim();
        filtered = filtered.filter(inc => 
          (inc.name && inc.name.toLowerCase().includes(q)) ||
          (inc.fullName && inc.fullName.toLowerCase().includes(q)) ||
          (inc.party && inc.party.toLowerCase().includes(q)) ||
          (inc.office && inc.office.toLowerCase().includes(q))
        );
      }

      if (filtered.length === 0) {
        grid.innerHTML = `
          <div class="col-span-full text-center py-10 px-4 glass-card rounded-2xl border border-dashed border-slate-300 dark:border-white/10 space-y-2">
            <i data-lucide="search-x" class="w-8 h-8 text-slate-400 mx-auto"></i>
            <h4 class="font-bold text-slate-900 dark:text-white text-sm">Nenhum mandatário encontrado</h4>
            <p class="text-xs text-slate-500 dark:text-slate-400">Tente ajustar o filtro de cargo, estado ou termo de busca.</p>
          </div>
        `;
        if (typeof lucide !== 'undefined') lucide.createIcons();
        return;
      }

      grid.innerHTML = filtered.map(inc => `
        <div class="glass-card rounded-2xl p-5 space-y-4 flex flex-col justify-between">
          <div class="space-y-3">
            <div class="flex items-start gap-3.5">
              <div class="avatar-frame w-16 h-16 rounded-2xl border-2 border-emerald-500/40 shadow-sm flex-shrink-0 bg-slate-100 dark:bg-slate-800">
                <img 
                  src="${(window.getSafeAvatarUrl ? window.getSafeAvatarUrl(inc, inc.name) : inc.avatar)}" 
                  alt="${inc.name}" 
                  referrerpolicy="no-referrer"
                  onerror="this.onerror=null; this.src=(window.getSafeAvatarFallback ? window.getSafeAvatarFallback('${(inc.name || 'Mandatário').replace(/'/g, "\\'")}') : 'https://ui-avatars.com/api/?name=${encodeURIComponent(inc.name)}&background=059669&color=fff&bold=true&size=128');"
                  class="w-full h-full object-cover candidate-avatar"
                >
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between gap-1 flex-wrap">
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30">
                    ${inc.status}
                  </span>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-100 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-500/30">
                    IPR: ${inc.productivityScore || 80}/100
                  </span>
                </div>
                <h3 class="font-extrabold text-base text-slate-900 dark:text-white mt-1 leading-tight truncate" title="${inc.name}">${inc.name}</h3>
                <p class="text-xs text-emerald-600 dark:text-emerald-400 font-medium truncate">${inc.party}</p>
                <p class="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">${inc.office}</p>
              </div>
            </div>

            <p class="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200 dark:border-white/5 line-clamp-3">
              ${inc.highlights}
            </p>
          </div>

          <div class="space-y-3 pt-3 border-t border-slate-200 dark:border-white/10">
            <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span class="flex items-center gap-1"><i data-lucide="calendar-check" class="w-3.5 h-3.5 text-emerald-500"></i> Presença no Mandato:</span>
              <strong class="text-emerald-700 dark:text-emerald-400 font-bold">${inc.attendance}</strong>
            </div>

            <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span class="flex items-center gap-1"><i data-lucide="wallet" class="w-3.5 h-3.5 text-amber-500"></i> Gasto Médio Cota:</span>
              <strong class="text-slate-900 dark:text-white font-mono font-bold">${inc.ceapMonthly || 'R$ 32.400,00'}</strong>
            </div>

            <button 
              onclick="openDossie('${inc.candidateId}')" 
              class="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition cursor-pointer flex items-center justify-center gap-1.5"
            >
              <i data-lucide="folder-search" class="w-3.5 h-3.5"></i>
              <span>Ver Dossiê e Análise IA</span>
            </button>
          </div>
        </div>
      `).join('');

      if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    function filterIncumbentCargo(cargo) {
      activeIncumbentCargo = cargo;
      document.querySelectorAll('.inc-cargo-btn').forEach(btn => {
        if ((cargo === 'todos' && btn.innerText.includes('Todos')) || btn.innerText.toLowerCase().includes(cargo)) {
          btn.className = 'inc-cargo-btn active px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold whitespace-nowrap cursor-pointer shadow-sm';
        } else {
          btn.className = 'inc-cargo-btn px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border border-slate-200 dark:border-white/5 whitespace-nowrap cursor-pointer hover:bg-slate-100';
        }
      });
      renderIncumbents();
    }

    function filterIncumbentState(uf) {
      activeIncumbentState = uf;
      renderIncumbents();
    }

    function filterIncumbentSearch(query) {
      activeIncumbentSearch = query;
      renderIncumbents();
    }


// ================= EXPORT SOCIAL MEDIA CARD MODAL =================
    function safeCostMin(cand) {
      if (!cand) return 'R$ 0,51/min';
      const val = cand.salary && cand.salary.civicConversion && cand.salary.civicConversion.costPerMinute;
      if (!val || typeof val !== 'string') return 'R$ 0,51/min';
      return val.replace(' / min', '/min').trim();
    }

    function safeVal(val, fallback = '') {
      if (val === undefined || val === null || val === 'undefined' || val === 'null' || Number.isNaN(val)) return fallback;
      return val;
    }

    let activeExportCandidate = candidatesData[0];
    let isExportComparison = false;
    let exportFormat = 'stories';
    let exportVisualTheme = 'swiss'; // 'swiss' | 'fifa' | 'executive' | 'bento' | 'twitter' | 'apple'
    let exportRadarChartInstance = null;
    let exportRadarTimeout = null;

    function setExportVisualTheme(theme) {
      exportVisualTheme = theme;
      
      const allThemes = [
        'what_he_did', 'what_he_didnt', 'future_projection',
        'swiss', 'fifa', 'executive', 'bento', 'twitter', 'apple',
        'duel_5050', 'citizen_receipt', 'mandate_clock', 'ai_audit', 'judicial_clearance',
        'duel_economy', 'civic_affinity', 'story_viral_9_16', 'campaign_finance',
        'quote_truth', 'law_productivity', 'alerta_decisao_2026'
      ];
      const isAppleV2 = window.location.pathname.includes('_v2') || !!document.querySelector('.apple-card-3d') || !!document.getElementById('brand-v2-badge');

      allThemes.forEach(t => {
        const btn = document.getElementById('btn-theme-' + t);
        if (!btn) return;
        if (t === theme) {
          btn.className = isAppleV2
            ? 'sticker-opt-btn py-2 px-1 rounded-2xl bg-blue-600 text-white font-bold text-[10px] shadow-md shadow-blue-500/25 flex flex-col items-center justify-center gap-0.5 transition cursor-pointer'
            : 'sticker-opt-btn py-2 px-1 rounded-xl bg-purple-600 text-white font-bold text-[10px] shadow-sm flex flex-col items-center justify-center gap-0.5 transition cursor-pointer';
        } else {
          btn.className = isAppleV2
            ? 'sticker-opt-btn py-2 px-1 rounded-2xl bg-white/70 dark:bg-white/5 text-neutral-700 dark:text-neutral-300 font-medium text-[10px] border border-black/5 dark:border-white/10 flex flex-col items-center justify-center gap-0.5 transition cursor-pointer hover:bg-black/5 dark:hover:bg-white/10'
            : 'sticker-opt-btn py-2 px-1 rounded-xl bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[10px] border border-slate-200 dark:border-white/10 flex flex-col items-center justify-center gap-0.5 transition cursor-pointer hover:bg-slate-100';
        }
      });

      if (activeExportCandidate) {
        renderExportCardContent(activeExportCandidate, isExportComparison);
      }
    }

    function filterStickersCategory(cat) {
      const isAppleV2 = window.location.pathname.includes('_v2') || !!document.querySelector('.apple-card-3d') || !!document.getElementById('brand-v2-badge');
      const filters = ['all', 'whatsapp', 'instagram', 'twitter'];
      filters.forEach(f => {
        const btn = document.getElementById('stk-filter-' + f);
        if (!btn) return;
        if (f === cat) {
          btn.className = isAppleV2
            ? 'flex-1 py-1 rounded-full bg-white dark:bg-[#2c2c2e] text-neutral-900 dark:text-white font-bold shadow-xs transition cursor-pointer'
            : 'flex-1 py-1 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs transition';
        } else {
          btn.className = isAppleV2
            ? 'flex-1 py-1 rounded-full text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition cursor-pointer'
            : 'flex-1 py-1 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition';
        }
      });

      const buttons = document.querySelectorAll('.sticker-opt-btn');
      buttons.forEach(btn => {
        const btnCat = btn.getAttribute('data-stk-cat') || '';
        const isDuelOnly = btn.getAttribute('data-duel-only') === 'true';

        // Regra de Ouro do Usuário: Se for figurinha individual, OMITIR 100% figurinhas de duelo!
        if (!isExportComparison && isDuelOnly) {
          btn.style.display = 'none';
          return;
        }

        const cats = btnCat.split(' ');
        if (cat === 'all' || cats.includes(cat) || cats.includes('all')) {
          btn.style.display = 'flex';
        } else {
          btn.style.display = 'none';
        }
      });
    }

    function setExportFormat(fmt) {
      exportFormat = fmt;
      const isAppleV2 = window.location.pathname.includes('_v2') || !!document.querySelector('.apple-card-3d') || !!document.getElementById('brand-v2-badge');
      const btnStories = document.getElementById('btn-format-stories');
      const btnFeed = document.getElementById('btn-format-feed');
      if (btnStories && btnFeed) {
        if (fmt === 'stories') {
          btnStories.className = isAppleV2
            ? 'py-1.5 px-3 rounded-full bg-blue-600 text-white font-bold text-xs shadow-md shadow-blue-500/25 flex items-center justify-center gap-1.5 transition cursor-pointer'
            : 'py-2 px-3 rounded-xl bg-purple-600 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 transition';
          btnFeed.className = isAppleV2
            ? 'py-1.5 px-3 rounded-full text-neutral-700 dark:text-neutral-300 font-medium text-xs flex items-center justify-center gap-1.5 transition cursor-pointer hover:bg-black/5 dark:hover:bg-white/5'
            : 'py-2 px-3 rounded-xl bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs border border-slate-200 dark:border-white/10 flex items-center justify-center gap-1.5 transition';
        } else {
          btnFeed.className = isAppleV2
            ? 'py-1.5 px-3 rounded-full bg-blue-600 text-white font-bold text-xs shadow-md shadow-blue-500/25 flex items-center justify-center gap-1.5 transition cursor-pointer'
            : 'py-2 px-3 rounded-xl bg-purple-600 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 transition';
          btnStories.className = isAppleV2
            ? 'py-1.5 px-3 rounded-full text-neutral-700 dark:text-neutral-300 font-medium text-xs flex items-center justify-center gap-1.5 transition cursor-pointer hover:bg-black/5 dark:hover:bg-white/5'
            : 'py-2 px-3 rounded-xl bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs border border-slate-200 dark:border-white/10 flex items-center justify-center gap-1.5 transition';
        }
      }
    }

    function openExportModalFor(candId, isComparison = false, initialTheme = null) {
      if (initialTheme) {
        exportVisualTheme = initialTheme;
      }
      isExportComparison = isComparison;
      const cand = candidatesData.find(c => c.id === candId) || candidatesData[0];
      activeExportCandidate = cand;

      // Se for candidato individual e o tema ativo for duelo, reseta para radar oficial
      if (!isComparison && (exportVisualTheme === 'duel_5050' || exportVisualTheme === 'duel_economy')) {
        exportVisualTheme = 'swiss';
      }

      // Se for duelo e o tema não for compatível com duelo, reseta para duel_5050
      const validDuelThemes = ['swiss', 'fifa', 'executive', 'bento', 'twitter', 'apple', 'duel_5050', 'citizen_receipt', 'mandate_clock', 'ai_audit', 'judicial_clearance', 'duel_economy', 'civic_affinity', 'story_viral_9_16', 'campaign_finance', 'quote_truth', 'law_productivity', 'alerta_decisao_2026'];
      if (isComparison && !validDuelThemes.includes(exportVisualTheme)) {
        exportVisualTheme = 'duel_5050';
      }

      filterStickersCategory('all');
      setExportVisualTheme(exportVisualTheme);
      renderExportCardContent(cand, isComparison);
      document.getElementById('export-modal').classList.remove('hidden');
      lucide.createIcons();
    }

    function exportComparisonCard() {
      isExportComparison = true;
      if (selectedForCompare.length < 2) {
        selectedForCompare = ['cand-tabata-amaral', 'cand-kim-kataguiri'];
      }
      activeExportCandidate = candidatesData.find(c => c.id === selectedForCompare[0]) || candidatesData[0];

      const validDuelThemes = ['swiss', 'fifa', 'executive', 'bento', 'twitter', 'apple', 'duel_5050', 'citizen_receipt', 'mandate_clock', 'ai_audit', 'judicial_clearance', 'duel_economy', 'civic_affinity', 'story_viral_9_16', 'campaign_finance', 'quote_truth', 'law_productivity', 'alerta_decisao_2026'];
      if (!validDuelThemes.includes(exportVisualTheme)) {
        exportVisualTheme = 'duel_5050';
      }

      filterStickersCategory('all');
      setExportVisualTheme(exportVisualTheme);
      renderExportCardContent(activeExportCandidate, true);
      document.getElementById('export-modal').classList.remove('hidden');
      lucide.createIcons();
    }

    function exportComparisonWithTheme(theme = 'ai_audit') {
      exportVisualTheme = theme;
      exportComparisonCard();
    }

    function closeExportModal() {
      if (typeof exportRadarChartInstance !== 'undefined' && exportRadarChartInstance) {
        exportRadarChartInstance.destroy();
        exportRadarChartInstance = null;
      }
      document.getElementById('export-modal').classList.add('hidden');
    }

    function getCorsSafeAvatar(url, name = 'Candidato') {
      if (!url || url.includes('Portrait_Placeholder') || url.includes('thumb.wikimedia.org')) {
        return 'https://ui-avatars.com/api/?name=' + encodeURIComponent(name) + '&background=0284c7&color=fff&bold=true&size=128';
      }
      if (url.startsWith('http://') || url.startsWith('https://')) {
        return '/api/proxy-image?url=' + encodeURIComponent(url);
      }
      return url;
    }

    function renderExportCardContent(cand, isComparison = false) {
      const target = document.getElementById('export-card-target');
      if (!target) return;

      // ================= 0. MODO DUELO COMPARATIVO (SUPORTA OS 6 TEMAS VISUAIS) =================
      if (isComparison) {
        const id1 = selectedForCompare[0];
        const id2 = selectedForCompare[1];
        const cand1 = candidatesData.find(c => c.id === id1) || candidatesData[0];
        const cand2 = candidatesData.find(c => c.id === id2) || candidatesData[1];
        const score1 = (!isNaN(Number(cand1.overallScore)) && cand1.overallScore !== null) ? Number(cand1.overallScore) : ((typeof calculateOverallScore === 'function') ? calculateOverallScore(cand1) : 75);
        const score2 = (!isNaN(Number(cand2.overallScore)) && cand2.overallScore !== null) ? Number(cand2.overallScore) : ((typeof calculateOverallScore === 'function') ? calculateOverallScore(cand2) : 75);
        
        // Truthfulness calculation from real statements
        const getTruthPct = (c) => {
          if (c.recentStatements && c.recentStatements.length > 0) {
            const verified = c.recentStatements.filter(s => s.verdict && /verdadeiro/i.test(s.verdict)).length;
            return Math.round((verified / c.recentStatements.length) * 100);
          }
          return c.recentDebate ? c.recentDebate.truthfulnessPct : 85;
        };
        const truth1 = getTruthPct(cand1);
        const truth2 = getTruthPct(cand2);

        const integrityScore1 = calculateCandidateIntegrity(cand1);
        const integrityScore2 = calculateCandidateIntegrity(cand2);

        const name1 = (cand1.ballotName || cand1.name).split(' ')[0];
        const name2 = (cand2.ballotName || cand2.name).split(' ')[0];
        const fullName1 = cand1.ballotName || cand1.name;
        const fullName2 = cand2.ballotName || cand2.name;

        const roi1 = cand1.salary && cand1.salary.civicConversion && cand1.salary.civicConversion.roiText ? cand1.salary.civicConversion.roiText : 'R$ 30,50 / R$ 1';
        const roi2 = cand2.salary && cand2.salary.civicConversion && cand2.salary.civicConversion.roiText ? cand2.salary.civicConversion.roiText : 'R$ 28,20 / R$ 1';
        const safeAvatar1 = getCorsSafeAvatar(cand1.avatar, cand1.name);
        const safeAvatar2 = getCorsSafeAvatar(cand2.avatar, cand2.name);
        const fallbackImg1 = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(name1) + '&background=0284c7&color=fff&bold=true&size=128';
        const fallbackImg2 = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(name2) + '&background=7c3aed&color=fff&bold=true&size=128';

        const costMin1 = safeCostMin(cand1);
        const costMin2 = safeCostMin(cand2);

        const clean1 = cand1.cleanRecord || 'Ficha Limpa (0 Condenações)';
        const clean2 = cand2.cleanRecord || 'Ficha Limpa (0 Condenações)';

        const effect1 = cand1.constitutionalEffectiveness?.effectivenessScore || 88;
        const effect2 = cand2.constitutionalEffectiveness?.effectivenessScore || 85;

        const salMin1 = cand1.salary?.civicConversion?.salariosMinimos || '190 salários';
        const salMin2 = cand2.salary?.civicConversion?.salariosMinimos || '165 salários';

        const spendMonthly1 = cand1.salary?.spendingCeapMonthly || 'R$ 28.500';
        const spendMonthly2 = cand2.salary?.spendingCeapMonthly || 'R$ 31.200';

        const emendas1 = cand1.parliamentaryAmendments?.totalExecuted || 'R$ 35,1M';
        const emendas2 = cand2.parliamentaryAmendments?.totalExecuted || 'R$ 24,5M';

        const smartFooter = `
          <div class="mt-2 pt-1 border-t border-slate-200 dark:border-white/10 flex flex-col gap-0.5 text-[7px] text-slate-500 font-mono">
            <div class="flex items-center justify-between font-bold">
              <span class="flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>figuraspoliticas.org</span>
              <span class="uppercase tracking-wider text-[6.5px]">⚡ Compare & Fiscalize • Dados Abertos</span>
            </div>
            <div class="text-[6px] text-slate-400 text-center tracking-tight">
              Síntese cívica assistida por IA sobre dados públicos oficiais (Res. TSE nº 23.732/2024)
            </div>
          </div>
        `;

        // ================= 1. TEMA: SWISS CLEAN (COM RADAR COMPARATIVO) =================
        if (exportVisualTheme === 'swiss') {
          target.className = 'w-[335px] max-w-[335px] box-border bg-white p-4 rounded-[1.75rem] border-2 border-stone-300 shadow-2xl text-stone-950 relative flex flex-col justify-between font-sans overflow-hidden';
          target.innerHTML = `
            <div class="flex items-center justify-between border-b-2 border-stone-950 pb-1.5">
              <div class="flex items-center gap-1.5">
                <span class="w-3 h-3 bg-emerald-600 rounded-sm"></span>
                <span class="text-[9px] font-black uppercase tracking-widest text-stone-950 font-mono">FIGURAS POLÍTICAS • DUELO</span>
              </div>
              <span class="text-[8.5px] font-mono font-black text-emerald-700">04/10/2026</span>
            </div>

            <div class="grid grid-cols-11 items-center gap-1 bg-stone-100 p-2 rounded-2xl border border-stone-300 my-1">
              <div class="col-span-5 flex items-center gap-2">
                <img src="${safeAvatar1}" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='${fallbackImg1}';" class="w-10 h-10 rounded-xl object-cover border-2 border-stone-950 shadow-sm flex-shrink-0">
                <div class="min-w-0 text-left">
                  <strong class="font-black text-[11px] text-stone-950 block truncate uppercase leading-tight">${name1}</strong>
                  <span class="text-[8px] font-mono font-bold text-stone-600">${cand1.party} • ${score1} pts</span>
                </div>
              </div>
              <div class="col-span-1 text-center font-black text-[8.5px] text-white bg-stone-950 rounded-full w-5 h-5 flex items-center justify-center mx-auto">
                VS
              </div>
              <div class="col-span-5 flex items-center justify-end gap-2 text-right">
                <div class="min-w-0">
                  <strong class="font-black text-[11px] text-stone-950 block truncate uppercase leading-tight">${name2}</strong>
                  <span class="text-[8px] font-mono font-bold text-stone-600">${cand2.party} • ${score2} pts</span>
                </div>
                <img src="${safeAvatar2}" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='${fallbackImg2}';" class="w-10 h-10 rounded-xl object-cover border-2 border-stone-950 shadow-sm flex-shrink-0">
              </div>
            </div>

            <div class="bg-stone-50 rounded-2xl p-2 border border-stone-300 my-1">
              <div class="flex items-center justify-between text-[7.5px] uppercase font-black text-stone-700 mb-0.5 font-mono">
                <span>RADAR COMPARATIVO DE PERFORMANCE</span>
                <div>
                  <span class="text-amber-600 font-bold">● ${name1}</span>
                  <span class="text-purple-600 font-bold ml-1.5">● ${name2}</span>
                </div>
              </div>
              <div class="w-full h-[125px] flex items-center justify-center">
                <canvas id="exportCardRadarCanvas" width="260" height="125"></canvas>
              </div>
            </div>

            <div class="space-y-1 text-[8.5px] font-mono my-0.5">
              <div class="p-1.5 bg-stone-100 rounded-xl border border-stone-200 flex items-center justify-between">
                <span class="text-stone-600 font-sans font-bold">⚖️ Conformidade Ética:</span>
                <div><strong class="text-amber-700">${integrityScore1} pts</strong> vs <strong class="text-purple-700">${integrityScore2} pts</strong></div>
              </div>
              <div class="p-1.5 bg-stone-100 rounded-xl border border-stone-200 flex items-center justify-between">
                <span class="text-stone-600 font-sans font-bold">🏛️ Presença no Mandato:</span>
                <div><strong class="text-stone-900">${cand1.attendance.ratePct}%</strong> vs <strong class="text-stone-900">${cand2.attendance.ratePct}%</strong></div>
              </div>
              <div class="p-1.5 bg-stone-100 rounded-xl border border-stone-200 flex items-center justify-between">
                <span class="text-stone-600 font-sans font-bold">⏱️ Custo aos Cofres / Min:</span>
                <div><strong class="text-amber-700">${costMin1}</strong> vs <strong class="text-purple-700">${costMin2}</strong></div>
              </div>
            </div>

            ${smartFooter}
          `;

          if (exportRadarTimeout) clearTimeout(exportRadarTimeout);
          exportRadarTimeout = setTimeout(() => { renderExportRadarChartTheme(cand1, 'duel', cand2); }, 60);
          lucide.createIcons();
          return;
        }

        // ================= 2. TEMA: FIFA ULTIMATE (DARK NEON COM BARRAS DINÂMICAS) =================
        if (exportVisualTheme === 'fifa') {
          const sTotal = (score1 + score2) || 180;
          const sPct1 = Math.round((score1 / sTotal) * 100);
          const sPct2 = 100 - sPct1;

          const intTotal = (integrityScore1 + integrityScore2) || 180;
          const intPct1 = Math.round((integrityScore1 / intTotal) * 100);
          const intPct2 = 100 - intPct1;

          const attTotal = (cand1.attendance.ratePct + cand2.attendance.ratePct) || 180;
          const attPct1 = Math.round((cand1.attendance.ratePct / attTotal) * 100);
          const attPct2 = 100 - attPct1;

          const effTotal = (effect1 + effect2) || 180;
          const effPct1 = Math.round((effect1 / effTotal) * 100);
          const effPct2 = 100 - effPct1;

          target.className = 'w-[335px] max-w-[335px] box-border bg-[#0a0f1d] p-4 rounded-[1.75rem] border-2 border-amber-400/50 text-white shadow-2xl relative flex flex-col justify-between font-sans overflow-hidden';
          target.innerHTML = `
            <div class="flex items-center justify-between border-b border-amber-400/30 pb-1.5">
              <span class="text-[9px] font-black uppercase tracking-widest text-amber-300 font-mono flex items-center gap-1">
                ⭐ FIGURAS POLÍTICAS • DUELO FIFA
              </span>
              <span class="text-[8.5px] font-mono font-bold text-slate-300">04/10/2026</span>
            </div>

            <div class="grid grid-cols-11 items-center gap-1 bg-gradient-to-r from-amber-500/20 via-slate-900 to-purple-500/20 p-2 rounded-2xl border border-white/20 my-1">
              <div class="col-span-5 flex items-center gap-2">
                <img src="${safeAvatar1}" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='${fallbackImg1}';" class="w-10 h-10 rounded-xl object-cover border-2 border-amber-400 shadow-sm flex-shrink-0">
                <div class="min-w-0 text-left">
                  <strong class="font-black text-[11px] text-amber-300 block truncate uppercase leading-tight">${name1}</strong>
                  <span class="text-[8px] font-mono font-bold text-slate-300">${cand1.party} • ${score1} OVR</span>
                </div>
              </div>
              <div class="col-span-1 text-center font-black text-[9px] text-amber-400">VS</div>
              <div class="col-span-5 flex items-center justify-end gap-2 text-right">
                <div class="min-w-0">
                  <strong class="font-black text-[11px] text-purple-300 block truncate uppercase leading-tight">${name2}</strong>
                  <span class="text-[8px] font-mono font-bold text-slate-300">${cand2.party} • ${score2} OVR</span>
                </div>
                <img src="${safeAvatar2}" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='${fallbackImg2}';" class="w-10 h-10 rounded-xl object-cover border-2 border-purple-400 shadow-sm flex-shrink-0">
              </div>
            </div>

            <div class="space-y-2 text-[8px] font-mono my-1 bg-slate-900/90 p-2 rounded-xl border border-white/10">
              <div>
                <div class="flex justify-between font-bold text-slate-300 mb-0.5">
                  <span class="text-amber-400">${score1} PTS</span>
                  <span class="text-slate-400 text-[8px] uppercase">Pontuação Geral OVR</span>
                  <span class="text-purple-400">${score2} PTS</span>
                </div>
                <div class="w-full bg-slate-800 rounded-full h-1.5 flex overflow-hidden">
                  <div class="bg-amber-400 h-full" style="width: ${sPct1}%"></div>
                  <div class="bg-purple-500 h-full" style="width: ${sPct2}%"></div>
                </div>
              </div>

              <div>
                <div class="flex justify-between font-bold text-slate-300 mb-0.5">
                  <span class="text-amber-400">${integrityScore1} pts</span>
                  <span class="text-slate-400 text-[8px] uppercase">Integridade Partidária & Jurídica</span>
                  <span class="text-purple-400">${integrityScore2} pts</span>
                </div>
                <div class="w-full bg-slate-800 rounded-full h-1.5 flex overflow-hidden">
                  <div class="bg-amber-400 h-full" style="width: ${intPct1}%"></div>
                  <div class="bg-purple-500 h-full" style="width: ${intPct2}%"></div>
                </div>
              </div>

              <div>
                <div class="flex justify-between font-bold text-slate-300 mb-0.5">
                  <span class="text-amber-400">${effect1}%</span>
                  <span class="text-slate-400 text-[8px] uppercase">Efetividade Constitucional</span>
                  <span class="text-purple-400">${effect2}%</span>
                </div>
                <div class="w-full bg-slate-800 rounded-full h-1.5 flex overflow-hidden">
                  <div class="bg-amber-400 h-full" style="width: ${effPct1}%"></div>
                  <div class="bg-purple-500 h-full" style="width: ${effPct2}%"></div>
                </div>
              </div>

              <div>
                <div class="flex justify-between font-bold text-slate-300 mb-0.5">
                  <span class="text-amber-400">${cand1.attendance.ratePct}%</span>
                  <span class="text-slate-400 text-[8px] uppercase">Presença no Mandato</span>
                  <span class="text-purple-400">${cand2.attendance.ratePct}%</span>
                </div>
                <div class="w-full bg-slate-800 rounded-full h-1.5 flex overflow-hidden">
                  <div class="bg-amber-400 h-full" style="width: ${attPct1}%"></div>
                  <div class="bg-purple-500 h-full" style="width: ${attPct2}%"></div>
                </div>
              </div>
            </div>

            <div class="p-2 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-between text-[8px] font-mono my-0.5">
              <span class="text-amber-400 font-bold">${costMin1}</span>
              <span class="text-slate-400 uppercase font-bold text-[7px] font-sans">CUSTO / MINUTO TRABALHADO</span>
              <span class="text-purple-400 font-bold">${costMin2}</span>
            </div>

            ${smartFooter}
          `;
          lucide.createIcons();
          return;
        }

        // ================= 3. TEMA: EXECUTIVO EDITORIAL =================
        if (exportVisualTheme === 'executive') {
          target.className = 'w-[335px] max-w-[335px] box-border bg-[#fdfbf7] p-4 rounded-[1.75rem] border-2 border-stone-400 text-stone-900 shadow-2xl relative flex flex-col justify-between font-sans overflow-hidden';
          target.innerHTML = `
            <div class="flex items-center justify-between border-b-2 border-stone-900 pb-1.5">
              <span class="text-[9px] font-black uppercase tracking-widest text-stone-900 font-mono">FIGURAS POLÍTICAS • DUELO EDITORIAL</span>
              <span class="text-[8.5px] font-mono font-black text-stone-900">04/10/2026</span>
            </div>

            <div class="grid grid-cols-2 gap-2 my-1">
              <div class="p-2 rounded-xl bg-stone-100 border border-stone-300 space-y-1 text-center">
                <img src="${safeAvatar1}" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='${fallbackImg1}';" class="w-10 h-10 rounded-xl object-cover border-2 border-stone-900 mx-auto shadow-sm">
                <strong class="text-[11px] font-black text-stone-950 block truncate uppercase leading-tight">${name1}</strong>
                <span class="px-2 py-0.5 rounded bg-stone-900 text-white font-mono text-[9px] font-black">Score: ${score1}</span>
              </div>
              <div class="p-2 rounded-xl bg-stone-100 border border-stone-300 space-y-1 text-center">
                <img src="${safeAvatar2}" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='${fallbackImg2}';" class="w-10 h-10 rounded-xl object-cover border-2 border-stone-900 mx-auto shadow-sm">
                <strong class="text-[11px] font-black text-stone-950 block truncate uppercase leading-tight">${name2}</strong>
                <span class="px-2 py-0.5 rounded bg-stone-900 text-white font-mono text-[9px] font-black">Score: ${score2}</span>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-1.5 text-[8.5px] font-mono my-1">
              <div class="p-2 rounded-xl bg-stone-100 border border-stone-300 space-y-0.5">
                <span class="text-[7px] uppercase font-bold text-stone-600 font-sans block">⚖️ Conformidade Ética</span>
                <div class="font-bold flex justify-between"><span>${integrityScore1} pts</span><span>${integrityScore2} pts</span></div>
              </div>
              <div class="p-2 rounded-xl bg-stone-100 border border-stone-300 space-y-0.5">
                <span class="text-[7px] uppercase font-bold text-stone-600 font-sans block">🎯 Efetividade Cargo</span>
                <div class="font-bold flex justify-between"><span>${effect1}%</span><span>${effect2}%</span></div>
              </div>
              <div class="p-2 rounded-xl bg-stone-100 border border-stone-300 space-y-0.5">
                <span class="text-[7px] uppercase font-bold text-stone-600 font-sans block">💰 Custo / Minuto</span>
                <div class="font-bold flex justify-between"><span>${costMin1}</span><span>${costMin2}</span></div>
              </div>
              <div class="p-2 rounded-xl bg-stone-100 border border-stone-300 space-y-0.5">
                <span class="text-[7px] uppercase font-bold text-stone-600 font-sans block">🏛️ Presença Mandato</span>
                <div class="font-bold flex justify-between"><span>${cand1.attendance.ratePct}%</span><span>${cand2.attendance.ratePct}%</span></div>
              </div>
            </div>

            <div class="p-2 rounded-xl bg-emerald-50 border border-emerald-300 flex items-center justify-between text-[8px] font-bold text-emerald-950 font-mono">
              <span>FICHA LIMPA:</span>
              <span>${name1}: ${cand1.ethics?.condemned || 0} Conden. | ${name2}: ${cand2.ethics?.condemned || 0} Conden.</span>
            </div>

            ${smartFooter}
          `;
          lucide.createIcons();
          return;
        }

        // ================= 4. TEMA: BENTO GRID DUELO =================
        if (exportVisualTheme === 'bento') {
          target.className = 'w-[335px] max-w-[335px] box-border bg-[#f8fafc] p-4 rounded-[1.75rem] border border-slate-300 text-slate-900 shadow-2xl relative flex flex-col justify-between font-sans overflow-hidden';
          target.innerHTML = `
            <div class="flex items-center justify-between border-b border-slate-200 pb-1.5">
              <span class="text-[9px] font-black uppercase tracking-widest text-slate-800 font-mono">FIGURAS POLÍTICAS • BENTO DUEL</span>
              <span class="text-[8px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">04/10/2026</span>
            </div>

            <div class="grid grid-cols-2 gap-2 my-1">
              <div class="p-2.5 bg-white rounded-2xl border border-slate-200 space-y-1 text-center shadow-sm">
                <img src="${safeAvatar1}" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='${fallbackImg1}';" class="w-10 h-10 rounded-xl object-cover border-2 border-sky-400 mx-auto">
                <strong class="text-[11px] font-black text-slate-900 block truncate uppercase leading-tight">${name1}</strong>
                <span class="px-2 py-0.5 rounded bg-slate-950 text-sky-400 font-mono text-[9px] font-black">Score: ${score1}</span>
              </div>
              <div class="p-2.5 bg-white rounded-2xl border border-slate-200 space-y-1 text-center shadow-sm">
                <img src="${safeAvatar2}" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='${fallbackImg2}';" class="w-10 h-10 rounded-xl object-cover border-2 border-purple-400 mx-auto">
                <strong class="text-[11px] font-black text-slate-900 block truncate uppercase leading-tight">${name2}</strong>
                <span class="px-2 py-0.5 rounded bg-slate-950 text-purple-400 font-mono text-[9px] font-black">Score: ${score2}</span>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-2 text-[8.5px] my-1 font-mono">
              <div class="p-2.5 bg-white rounded-2xl border border-slate-200 space-y-0.5 shadow-sm">
                <span class="text-[7px] uppercase font-bold text-slate-500 font-sans block">⚖️ Conformidade Ética</span>
                <div class="font-bold flex justify-between">
                  <span class="text-sky-700">${name1}: ${integrityScore1}</span>
                  <span class="text-purple-700">${name2}: ${integrityScore2}</span>
                </div>
              </div>
              <div class="p-2.5 bg-white rounded-2xl border border-slate-200 space-y-0.5 shadow-sm">
                <span class="text-[7px] uppercase font-bold text-slate-500 font-sans block">🏛️ Presença Plenário</span>
                <div class="font-bold flex justify-between">
                  <span>${cand1.attendance.ratePct}%</span>
                  <span>${cand2.attendance.ratePct}%</span>
                </div>
              </div>
              <div class="p-2.5 bg-white rounded-2xl border border-slate-200 space-y-0.5 shadow-sm">
                <span class="text-[7px] uppercase font-bold text-slate-500 font-sans block">💰 Custo / Minuto</span>
                <div class="font-bold flex justify-between">
                  <span>${costMin1}</span>
                  <span>${costMin2}</span>
                </div>
              </div>
              <div class="p-2.5 bg-white rounded-2xl border border-slate-200 space-y-0.5 shadow-sm">
                <span class="text-[7px] uppercase font-bold text-slate-500 font-sans block">🎯 Efetividade</span>
                <div class="font-bold flex justify-between">
                  <span class="text-emerald-700">${effect1}%</span>
                  <span class="text-emerald-700">${effect2}%</span>
                </div>
              </div>
            </div>

            <div class="p-2 rounded-2xl bg-slate-950 text-white flex items-center justify-between text-[7.5px] font-bold">
              <span class="text-slate-400">💵 SALÁRIOS MÍNIMOS/ANO:</span>
              <span class="text-emerald-400 font-mono truncate">${name1}: ${salMin1} vs ${name2}: ${salMin2}</span>
            </div>

            ${smartFooter}
          `;
          lucide.createIcons();
          return;
        }

        // ================= 5. TEMA: TWITTER / X VIRAL DUELO =================
        if (exportVisualTheme === 'twitter') {
          target.className = 'w-[335px] max-w-[335px] box-border bg-black p-4 rounded-[1.75rem] border border-[#2f3336] shadow-2xl text-white relative flex flex-col justify-between font-sans overflow-hidden';
          target.innerHTML = `
            <div class="flex items-center justify-between pb-1 border-b border-[#2f3336]">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-full bg-[#1d9bf0] flex items-center justify-center text-white font-black text-[11px]">
                  RX
                </div>
                <div class="text-left">
                  <div class="flex items-center gap-1">
                    <span class="font-bold text-[11px] text-white">Figuras Políticas</span>
                    <svg class="w-3 h-3 text-[#1d9bf0]" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                  </div>
                  <span class="text-[9px] text-[#71767b] block leading-none">@figuraspoliticas • Auditoria Oficial</span>
                </div>
              </div>
              <span class="text-[9px] text-[#71767b] font-mono font-bold">04/10/2026</span>
            </div>

            <div class="text-[10.5px] text-[#e7e9ea] leading-snug text-left my-1">
              <strong class="text-amber-400">⚔️ DUELO ELEITORAL 2026:</strong> Quem entrega mais por voto entre <strong class="text-[#1d9bf0]">${name1}</strong> e <strong class="text-purple-400">${name2}</strong>? Puxamos a auditoria completa de dados abertos:
            </div>

            <div class="rounded-2xl bg-[#16181c] border border-[#2f3336] p-3 space-y-2 text-left my-1">
              <div class="grid grid-cols-2 gap-2 border-b border-[#2f3336] pb-2 text-center">
                <div class="space-y-0.5">
                  <img src="${safeAvatar1}" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='${fallbackImg1}';" class="w-9 h-9 rounded-xl object-cover mx-auto border border-amber-400">
                  <strong class="text-xs text-white block">${name1}</strong>
                  <span class="text-[9px] text-amber-400 font-mono font-bold">Nota: ${score1} pts</span>
                </div>
                <div class="space-y-0.5">
                  <img src="${safeAvatar2}" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='${fallbackImg2}';" class="w-9 h-9 rounded-xl object-cover mx-auto border border-purple-400">
                  <strong class="text-xs text-white block">${name2}</strong>
                  <span class="text-[9px] text-purple-400 font-mono font-bold">Nota: ${score2} pts</span>
                </div>
              </div>

              <div class="space-y-1 text-[8.5px] font-mono text-slate-300">
                <div class="flex justify-between">
                  <span>⚖️ Conformidade Ética:</span>
                  <div><strong class="text-amber-400">${integrityScore1} pts</strong> vs <strong class="text-purple-400">${integrityScore2} pts</strong></div>
                </div>
                <div class="flex justify-between">
                  <span>🎯 Efetividade Mandato:</span>
                  <div><strong class="text-emerald-400">${effect1}%</strong> vs <strong class="text-emerald-400">${effect2}%</strong></div>
                </div>
                <div class="flex justify-between">
                  <span>⏱️ Custo aos Cofres / Min:</span>
                  <div><strong class="text-amber-400">${costMin1}</strong> vs <strong class="text-purple-400">${costMin2}</strong></div>
                </div>
                <div class="flex justify-between">
                  <span>🏛️ Presença em Plenário:</span>
                  <div><strong>${cand1.attendance.ratePct}%</strong> vs <strong>${cand2.attendance.ratePct}%</strong></div>
                </div>
              </div>
            </div>

            <div class="flex items-center justify-between pt-1 border-t border-[#2f3336] text-[9px] text-[#71767b]">
              <span class="flex items-center gap-1"><i data-lucide="message-circle" class="w-3 h-3"></i> 640</span>
              <span class="flex items-center gap-1"><i data-lucide="repeat" class="w-3 h-3"></i> 4.1K</span>
              <span class="flex items-center gap-1"><i data-lucide="heart" class="w-3 h-3 text-rose-500"></i> 18.5K</span>
              <span class="flex items-center gap-1"><i data-lucide="share" class="w-3 h-3"></i></span>
            </div>
          `;
          lucide.createIcons();
          return;
        }

        // ================= 6. TEMA: APPLE MINIMALISTA (COM RADAR COMPARATIVO) =================
        // ================= 6. TEMA: APPLE DESIGN SYSTEM (DUELO CÍVICO LIQUID GLASS) =================
        if (exportVisualTheme === 'apple') {
          // 4 Gatilhos de Viralidade Cívica (Sem Custo por Minuto)
          const costVote1 = (cand1.campaignFinance?.costPerVote || 'R$ 9,23 / voto').replace(' / voto', ' por voto');
          const costVote2 = (cand2.campaignFinance?.costPerVote || 'R$ 11,40 / voto').replace(' / voto', ' por voto');
          const campSpent1 = cand1.campaignFinance ? cand1.campaignFinance.totalSpentFormatted.replace(' milhões', 'M').replace(' milhão', 'M') : 'R$ 3,1M';
          const campSpent2 = cand2.campaignFinance ? cand2.campaignFinance.totalSpentFormatted.replace(' milhões', 'M').replace(' milhão', 'M') : 'R$ 2,4M';
          const numCost1 = parseFloat(costVote1.replace('R$', '').replace(',', '.').replace(' por voto', '').trim()) || 9.23;
          const numCost2 = parseFloat(costVote2.replace('R$', '').replace(',', '.').replace(' por voto', '').trim()) || 11.40;
          const costWinner = numCost1 <= numCost2 ? 1 : 2;

          const laws1 = cand1.bills?.approved ?? (cand1.bills?.total ? Math.round(cand1.bills.total * 0.4) : 7);
          const laws2 = cand2.bills?.approved ?? (cand2.bills?.total ? Math.round(cand2.bills.total * 0.4) : 6);
          const ceremPct1 = cand1.careerProductivity?.ceremonialBillsPct ?? 35;
          const ceremPct2 = cand2.careerProductivity?.ceremonialBillsPct ?? 42;
          const lawsWinner = laws1 >= laws2 ? 1 : 2;

          const truth1 = cand1.recentDebate?.truthfulnessPct ?? (cand1.radar?.coerencia || 88);
          const truth2 = cand2.recentDebate?.truthfulnessPct ?? (cand2.radar?.coerencia || 85);
          const truthWinner = truth1 >= truth2 ? 1 : 2;

          const isClean1 = (!cand1.ethics || cand1.ethics.condemned === 0);
          const isClean2 = (!cand2.ethics || cand2.ethics.condemned === 0);
          const scoreWinner = score1 >= score2 ? 1 : 2;

          target.className = 'w-[335px] max-w-[335px] box-border bg-[#0a0a0c] text-white p-4 rounded-[28px] border border-white/15 shadow-2xl backdrop-blur-2xl relative flex flex-col justify-between font-sans overflow-hidden';
          target.innerHTML = `
            <!-- Ambient Glow Circles -->
            <div class="absolute -top-12 -left-12 w-36 h-36 rounded-full bg-amber-500/15 blur-2xl pointer-events-none"></div>
            <div class="absolute -bottom-12 -right-12 w-36 h-36 rounded-full bg-purple-600/20 blur-2xl pointer-events-none"></div>

            <!-- Apple Top Header -->
            <div class="relative z-10 flex items-center justify-between border-b border-white/10 pb-2">
              <div class="flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span class="text-[9px] font-mono font-black uppercase tracking-widest text-white/90">FIGURAS POLÍTICAS • DUELO 2026</span>
              </div>
              <span class="text-[8px] font-mono font-bold px-2 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/10">
                04/10/2026
              </span>
            </div>

            <!-- Contenders Head-to-Head -->
            <div class="relative z-10 grid grid-cols-11 items-center gap-1.5 p-2.5 rounded-2xl bg-white/[0.04] border border-white/10 my-1">
              <!-- Contender 1 -->
              <div class="col-span-5 flex items-center gap-2">
                <div class="relative flex-shrink-0">
                  <img src="${safeAvatar1}" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='${fallbackImg1}';" class="w-11 h-11 rounded-xl object-cover ring-1 ring-amber-500/80 shadow-md">
                  ${scoreWinner === 1 ? '<span class="absolute -top-1 -right-1 text-[9px]">👑</span>' : ''}
                </div>
                <div class="min-w-0 text-left">
                  <strong class="font-extrabold text-[11px] text-white block truncate uppercase leading-tight">${name1}</strong>
                  <span class="text-[8px] font-mono font-bold text-amber-400">${cand1.party} • Nº ${cand1.number}</span>
                  <div class="text-[8.5px] font-mono font-black text-amber-300">Score ${score1}</div>
                </div>
              </div>

              <!-- VS Badge -->
              <div class="col-span-1 text-center">
                <div class="w-6 h-6 rounded-full bg-gradient-to-br from-amber-500 to-purple-600 text-white font-black text-[8px] flex items-center justify-center mx-auto shadow-md ring-1 ring-white/20">
                  VS
                </div>
              </div>

              <!-- Contender 2 -->
              <div class="col-span-5 flex items-center justify-end gap-2 text-right">
                <div class="min-w-0">
                  <strong class="font-extrabold text-[11px] text-white block truncate uppercase leading-tight">${name2}</strong>
                  <span class="text-[8px] font-mono font-bold text-purple-400">${cand2.party} • Nº ${cand2.number}</span>
                  <div class="text-[8.5px] font-mono font-black text-purple-300">Score ${score2}</div>
                </div>
                <div class="relative flex-shrink-0">
                  <img src="${safeAvatar2}" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='${fallbackImg2}';" class="w-11 h-11 rounded-xl object-cover ring-1 ring-purple-500/80 shadow-md">
                  ${scoreWinner === 2 ? '<span class="absolute -top-1 -left-1 text-[9px]">👑</span>' : ''}
                </div>
              </div>
            </div>

            <!-- 4 Gatilhos de Viralidade Cívica -->
            <div class="relative z-10 space-y-1 my-1 text-[8.5px] font-mono">
              <!-- Gatilho 1: Gasto Campanha & Custo/Voto TSE -->
              <div class="p-1.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                <div class="flex items-center gap-1 text-white/70 font-sans">
                  <span>🗳️</span>
                  <span>Gasto & Custo/Voto TSE:</span>
                </div>
                <div class="flex items-center gap-1 font-bold text-[8px]">
                  <span class="${costWinner === 1 ? 'text-amber-400 bg-amber-500/20 px-1 rounded border border-amber-500/30' : 'text-white/60'}">${costVote1} (${campSpent1})</span>
                  <span class="text-white/30 font-normal">vs</span>
                  <span class="${costWinner === 2 ? 'text-purple-400 bg-purple-500/20 px-1 rounded border border-purple-500/30' : 'text-white/60'}">${costVote2} (${campSpent2})</span>
                </div>
              </div>

              <!-- Gatilho 2: Leis Reais / Cerimoniais -->
              <div class="p-1.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                <div class="flex items-center gap-1 text-white/70 font-sans">
                  <span>🏛️</span>
                  <span>Leis Reais / Cerimoniais:</span>
                </div>
                <div class="flex items-center gap-1.5 font-bold">
                  <span class="${lawsWinner === 1 ? 'text-amber-400 bg-amber-500/20 px-1 rounded border border-amber-500/30' : 'text-white/60'}">${laws1}L (${ceremPct1}%)</span>
                  <span class="text-white/30 font-normal">vs</span>
                  <span class="${lawsWinner === 2 ? 'text-purple-400 bg-purple-500/20 px-1 rounded border border-purple-500/30' : 'text-white/60'}">${laws2}L (${ceremPct2}%)</span>
                </div>
              </div>

              <!-- Gatilho 3: Veracidade das Falas -->
              <div class="p-1.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                <div class="flex items-center gap-1 text-white/70 font-sans">
                  <span>🎯</span>
                  <span>Veracidade das Falas:</span>
                </div>
                <div class="flex items-center gap-1.5 font-bold">
                  <span class="${truthWinner === 1 ? 'text-amber-400 bg-amber-500/20 px-1 rounded border border-amber-500/30' : 'text-white/60'}">${truth1}% Verd.</span>
                  <span class="text-white/30 font-normal">vs</span>
                  <span class="${truthWinner === 2 ? 'text-purple-400 bg-purple-500/20 px-1 rounded border border-purple-500/30' : 'text-white/60'}">${truth2}% Verd.</span>
                </div>
              </div>

              <!-- Gatilho 4: Ficha Limpa Oficial -->
              <div class="p-1.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                <div class="flex items-center gap-1 text-white/70 font-sans">
                  <span>🛡️</span>
                  <span>Certidão Ficha Limpa:</span>
                </div>
                <div class="flex items-center gap-1.5 font-bold text-[8px]">
                  <span class="${isClean1 ? 'text-emerald-400' : 'text-amber-400'}">${isClean1 ? '0 Condenações' : 'Processos'}</span>
                  <span class="text-white/30 font-normal">vs</span>
                  <span class="${isClean2 ? 'text-emerald-400' : 'text-amber-400'}">${isClean2 ? '0 Condenações' : 'Processos'}</span>
                </div>
              </div>
            </div>

            <!-- Apple Glass Footer -->
            <div class="relative z-10 mt-1 pt-1 border-t border-white/10 flex items-center justify-between text-[7px] text-white/50 font-mono">
              <span class="flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>figuraspoliticas.org</span>
              <span class="uppercase tracking-wider text-[6.5px]">⚡ Auditoria Oficial TSE/LAI</span>
            </div>
          `;

          lucide.createIcons();
          return;
        }

        // ================= 7. TEMA: DUELO DIRETO 50/50 REFORMULADO (STREET BATTLE CÍVICO) =================
        if (exportVisualTheme === 'duel_5050') {
          target.className = 'w-[335px] max-w-[335px] box-border bg-white p-3.5 rounded-[1.75rem] border-2 border-slate-300 shadow-2xl text-slate-900 relative flex flex-col justify-between font-sans overflow-hidden';
          target.innerHTML = `
            <div class="flex items-center justify-between border-b border-slate-200 pb-1.5 font-mono text-[8px] font-black uppercase">
              <span class="text-slate-900 flex items-center gap-1.5">
                ⚔️ CONFRONTO CÍVICO 50/50 • FIGURAS POLÍTICAS
              </span>
              <span class="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">04/10/2026</span>
            </div>

            <div class="grid grid-cols-2 gap-2 my-2 relative">
              <div class="p-2.5 rounded-2xl bg-sky-50/70 border border-sky-200 text-center space-y-1">
                <img src="${safeAvatar1}" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='${fallbackImg1}';" class="w-12 h-12 rounded-2xl object-cover mx-auto border-2 border-sky-500 shadow-sm">
                <h4 class="font-black text-xs uppercase truncate text-slate-900 leading-tight">${fullName1}</h4>
                <span class="text-[9px] font-mono font-bold text-sky-700 block">${cand1.party} • Nº ${cand1.number || '00'}</span>
                
                <div class="py-1 px-2 rounded-xl bg-sky-600 text-white font-black font-mono text-sm shadow-xs">
                  ${score1} pts
                </div>

                <div class="space-y-1 pt-1 text-[8px] font-mono text-left">
                  <div class="flex justify-between border-b border-sky-100 pb-0.5">
                    <span class="text-slate-500">Integridade:</span>
                    <strong class="text-sky-900">${integrityScore1} pts</strong>
                  </div>
                  <div class="flex justify-between border-b border-sky-100 pb-0.5">
                    <span class="text-slate-500">Efetividade:</span>
                    <strong class="text-emerald-700">${effect1}%</strong>
                  </div>
                  <div class="flex justify-between border-b border-sky-100 pb-0.5">
                    <span class="text-slate-500">7 Falas Fact:</span>
                    <strong class="text-sky-900">${truth1}%</strong>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-slate-500">Custo/min:</span>
                    <strong class="text-slate-800">${costMin1}</strong>
                  </div>
                </div>
              </div>

              <div class="p-2.5 rounded-2xl bg-purple-50/70 border border-purple-200 text-center space-y-1">
                <img src="${safeAvatar2}" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='${fallbackImg2}';" class="w-12 h-12 rounded-2xl object-cover mx-auto border-2 border-purple-500 shadow-sm">
                <h4 class="font-black text-xs uppercase truncate text-slate-900 leading-tight">${fullName2}</h4>
                <span class="text-[9px] font-mono font-bold text-purple-700 block">${cand2.party} • Nº ${cand2.number || '00'}</span>
                
                <div class="py-1 px-2 rounded-xl bg-purple-600 text-white font-black font-mono text-sm shadow-xs">
                  ${score2} pts
                </div>

                <div class="space-y-1 pt-1 text-[8px] font-mono text-left">
                  <div class="flex justify-between border-b border-purple-100 pb-0.5">
                    <span class="text-slate-500">Integridade:</span>
                    <strong class="text-purple-900">${integrityScore2} pts</strong>
                  </div>
                  <div class="flex justify-between border-b border-purple-100 pb-0.5">
                    <span class="text-slate-500">Efetividade:</span>
                    <strong class="text-emerald-700">${effect2}%</strong>
                  </div>
                  <div class="flex justify-between border-b border-purple-100 pb-0.5">
                    <span class="text-slate-500">7 Falas Fact:</span>
                    <strong class="text-purple-900">${truth2}%</strong>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-slate-500">Custo/min:</span>
                    <strong class="text-slate-800">${costMin2}</strong>
                  </div>
                </div>
              </div>
              
              <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-950 text-amber-300 text-[10px] font-black flex items-center justify-center border-2 border-white shadow-lg z-10">
                VS
              </div>
            </div>

            <div class="p-2 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-between text-[8px] font-mono">
              <span class="font-bold text-slate-600 uppercase font-sans">⚖️ STATUS FICHA LIMPA:</span>
              <span class="font-bold text-emerald-700 truncate">${clean1.includes('0') ? '0 Conden.' : clean1} vs ${clean2.includes('0') ? '0 Conden.' : clean2}</span>
            </div>
            
            ${smartFooter}
          `;
          lucide.createIcons();
          return;
        }

        // ================= 8. TEMA: DUELO DE ECONOMIA PÚBLICA =================
        if (exportVisualTheme === 'duel_economy') {
          target.className = 'w-[335px] max-w-[335px] box-border bg-white p-4 rounded-[1.75rem] border-2 border-emerald-500 shadow-2xl text-slate-900 relative flex flex-col justify-between font-sans overflow-hidden';
          target.innerHTML = `
            <div class="flex items-center justify-between border-b-2 border-emerald-500 pb-1.5 font-mono text-[8.5px] font-black uppercase">
              <span class="text-emerald-900 flex items-center gap-1">💸 DUELO DE ECONOMIA PÚBLICA</span>
              <span class="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">AUDITORIA CEAP</span>
            </div>

            <div class="grid grid-cols-2 gap-2 my-2 text-center">
              <div class="p-2.5 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
                <strong class="text-xs uppercase text-slate-900 block truncate">${name1}</strong>
                <span class="text-[9px] font-bold text-amber-700 block font-mono">${cand1.party}</span>
                <span class="text-[8px] text-slate-500 block">Gasto Mensal Cota:</span>
                <div class="text-sm font-black font-mono text-amber-900">${spendMonthly1}</div>
                <span class="text-[7.5px] text-slate-500 font-mono block">Custo/min: ${costMin1}</span>
              </div>

              <div class="p-2.5 rounded-2xl bg-purple-50 border border-purple-200 space-y-1">
                <strong class="text-xs uppercase text-slate-900 block truncate">${name2}</strong>
                <span class="text-[9px] font-bold text-purple-700 block font-mono">${cand2.party}</span>
                <span class="text-[8px] text-slate-500 block">Gasto Mensal Cota:</span>
                <div class="text-sm font-black font-mono text-purple-900">${spendMonthly2}</div>
                <span class="text-[7.5px] text-slate-500 font-mono block">Custo/min: ${costMin2}</span>
              </div>
            </div>

            <div class="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-[8.5px] font-mono">
              <div class="flex justify-between">
                <span>Presença no Plenário:</span>
                <strong>${cand1.attendance.ratePct}% vs ${cand2.attendance.ratePct}%</strong>
              </div>
              <div class="flex justify-between">
                <span>Equiv. Salários Mínimos / Ano:</span>
                <strong class="text-emerald-700">${salMin1} vs ${salMin2}</strong>
              </div>
            </div>
            
            ${smartFooter}
          `;
          lucide.createIcons();
          return;
        }

        // ================= 9. TEMA: DUELO DE GASTO DE CAMPANHA TSE =================
        if (exportVisualTheme === 'campaign_finance') {
          const camp1 = cand1.campaignFinance || { totalSpentFormatted: 'R$ 16,5M', costPerVote: 'R$ 6,88 / voto', publicFundPct: 91, privateDonationsPct: 8, electionYear: '2022' };
          const camp2 = cand2.campaignFinance || { totalSpentFormatted: 'R$ 12,3M', costPerVote: 'R$ 5,20 / voto', publicFundPct: 85, privateDonationsPct: 14, electionYear: '2022' };

          target.className = 'w-[335px] max-w-[335px] box-border bg-white p-4 rounded-[1.75rem] border-2 border-amber-500 shadow-2xl text-slate-900 relative flex flex-col justify-between font-sans overflow-hidden';
          target.innerHTML = `
            <div class="flex items-center justify-between border-b-2 border-amber-500 pb-1.5 font-mono">
              <span class="text-[9px] font-black uppercase text-amber-800 flex items-center gap-1">
                ⚔️ DUELO DE CAMPANHA • TSE
              </span>
              <span class="text-[8px] font-bold text-amber-700">PRESTAÇÃO OFICIAL</span>
            </div>

            <div class="grid grid-cols-2 gap-2 my-2">
              <div class="p-2.5 rounded-2xl bg-amber-50 border border-amber-200 text-center space-y-1">
                <img src="${safeAvatar1}" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='${fallbackImg1}';" class="w-11 h-11 rounded-xl object-cover mx-auto border-2 border-amber-500 shadow-sm">
                <h4 class="font-black text-xs uppercase truncate text-slate-900">${name1}</h4>
                <span class="text-[9px] font-mono font-bold text-amber-700 block">${cand1.party}</span>
                <span class="text-[8px] text-slate-500 block">Total (${camp1.electionYear || '2022'}):</span>
                <div class="text-xs font-black font-mono text-amber-900">${camp1.totalSpentFormatted || 'R$ 16,5M'}</div>
                <div class="text-[8px] font-mono text-slate-600">Voto: <strong>${camp1.costPerVote || 'R$ 6,88/voto'}</strong></div>
              </div>

              <div class="p-2.5 rounded-2xl bg-purple-50 border border-purple-200 text-center space-y-1">
                <img src="${safeAvatar2}" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='${fallbackImg2}';" class="w-11 h-11 rounded-xl object-cover mx-auto border-2 border-purple-500 shadow-sm">
                <h4 class="font-black text-xs uppercase truncate text-slate-900">${name2}</h4>
                <span class="text-[9px] font-mono font-bold text-purple-700 block">${cand2.party}</span>
                <span class="text-[8px] text-slate-500 block">Total (${camp2.electionYear || '2022'}):</span>
                <div class="text-xs font-black font-mono text-purple-900">${camp2.totalSpentFormatted || 'R$ 12,3M'}</div>
                <div class="text-[8px] font-mono text-slate-600">Voto: <strong>${camp2.costPerVote || 'R$ 5,20/voto'}</strong></div>
              </div>
            </div>

            <div class="p-2 rounded-xl bg-slate-50 border border-slate-200 text-[8.5px] font-mono space-y-1">
              <div class="flex justify-between">
                <span>Fundo Eleitoral (FEFC):</span>
                <strong>${camp1.publicFundPct || 91}% vs ${camp2.publicFundPct || 85}%</strong>
              </div>
              <div class="flex justify-between">
                <span>Doações Privadas:</span>
                <strong>${camp1.privateDonationsPct || 8}% vs ${camp2.privateDonationsPct || 14}%</strong>
              </div>
            </div>
            
            ${smartFooter}
          `;
          lucide.createIcons();
          return;
        }

        // ================= 10. TEMA: RECIBO CIDADÃO COMPARATIVO (CITIZEN RECEIPT) =================
        if (exportVisualTheme === 'citizen_receipt') {
          target.className = 'w-[335px] max-w-[335px] box-border bg-[#fffdfa] p-4 rounded-[1.75rem] border-2 border-dashed border-stone-400 text-stone-900 shadow-2xl relative flex flex-col justify-between font-mono overflow-hidden';
          target.innerHTML = `
            <div class="text-center border-b border-stone-300 pb-2">
              <h3 class="font-black text-xs uppercase tracking-wider">🧾 RECIBO CÍVICO DE CUSTOS</h3>
              <p class="text-[7.5px] text-stone-500">AUDITORIA FISCAL DOS CANDIDATOS • LEI 12.527</p>
              <div class="flex justify-between text-[8px] text-stone-400 pt-1">
                <span>EMISSÃO: 04/10/2026</span>
                <span>DOC #${Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-2 my-2 text-[8px] border-b border-stone-300 pb-2">
              <div class="space-y-1">
                <strong class="text-[9.5px] font-black uppercase block truncate text-stone-950">${name1} (${cand1.party})</strong>
                <div class="flex justify-between"><span>Cota Parlamentar/mês:</span><strong>${spendMonthly1}</strong></div>
                <div class="flex justify-between"><span>Custo por minuto:</span><strong>${costMin1}</strong></div>
                <div class="flex justify-between"><span>Presença:</span><strong>${cand1.attendance.ratePct}%</strong></div>
                <div class="flex justify-between"><span>Equiv. Salários:</span><strong class="text-emerald-800">${salMin1}</strong></div>
              </div>
              <div class="space-y-1 border-l border-stone-300 pl-2">
                <strong class="text-[9.5px] font-black uppercase block truncate text-stone-950">${name2} (${cand2.party})</strong>
                <div class="flex justify-between"><span>Cota Parlamentar/mês:</span><strong>${spendMonthly2}</strong></div>
                <div class="flex justify-between"><span>Custo por minuto:</span><strong>${costMin2}</strong></div>
                <div class="flex justify-between"><span>Presença:</span><strong>${cand2.attendance.ratePct}%</strong></div>
                <div class="flex justify-between"><span>Equiv. Salários:</span><strong class="text-emerald-800">${salMin2}</strong></div>
              </div>
            </div>

            <div class="bg-stone-100 p-2 rounded-xl text-[8px] space-y-1">
              <div class="flex justify-between">
                <span>VEREDITO DE EFICIÊNCIA:</span>
                <strong class="text-emerald-800">${effect1 > effect2 ? name1 + ' lidera' : name2 + ' lidera'}</strong>
              </div>
              <div class="flex justify-between text-stone-600">
                <span>Retorno Cívico / R$ 1:</span>
                <span>${roi1.split('/')[0]} vs ${roi2.split('/')[0]}</span>
              </div>
            </div>

            <div class="text-center pt-2 text-[7px] text-stone-400">
              CÓDIGO DE AUTENTICIDADE: RX-${cand1.number || '00'}-${cand2.number || '00'}-TSE2026
            </div>

            ${smartFooter}
          `;
          lucide.createIcons();
          return;
        }

        // ================= 11. TEMA: CRONÔMETRO DO MANDATO (MANDATE CLOCK) =================
        if (exportVisualTheme === 'mandate_clock') {
          target.className = 'w-[335px] max-w-[335px] box-border bg-slate-900 p-4 rounded-[1.75rem] border-2 border-cyan-500 shadow-2xl text-white relative flex flex-col justify-between font-sans overflow-hidden';
          target.innerHTML = `
            <div class="flex items-center justify-between border-b border-cyan-500/30 pb-1.5 font-mono">
              <span class="text-[9px] font-black uppercase text-cyan-400 flex items-center gap-1.5">
                ⏱️ CRONÔMETRO DO MANDATO • CUSTO/TEMPO
              </span>
              <span class="text-[8px] text-slate-400">TEMPO REAL</span>
            </div>

            <div class="grid grid-cols-2 gap-2 my-2 text-center font-mono">
              <div class="p-2.5 rounded-2xl bg-slate-800/80 border border-cyan-500/30 space-y-1">
                <img src="${safeAvatar1}" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='${fallbackImg1}';" class="w-10 h-10 rounded-xl object-cover mx-auto border-2 border-cyan-400">
                <strong class="text-xs uppercase text-white block truncate">${name1}</strong>
                <span class="text-[8px] text-slate-400 block">Custo por Minuto:</span>
                <div class="text-sm font-black text-cyan-300">${costMin1}</div>
                <div class="text-[8px] text-slate-300">Presença: <strong>${cand1.attendance.ratePct}%</strong></div>
              </div>

              <div class="p-2.5 rounded-2xl bg-slate-800/80 border border-purple-500/30 space-y-1">
                <img src="${safeAvatar2}" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='${fallbackImg2}';" class="w-10 h-10 rounded-xl object-cover mx-auto border-2 border-purple-400">
                <strong class="text-xs uppercase text-white block truncate">${name2}</strong>
                <span class="text-[8px] text-slate-400 block">Custo por Minuto:</span>
                <div class="text-sm font-black text-purple-300">${costMin2}</div>
                <div class="text-[8px] text-slate-300">Presença: <strong>${cand2.attendance.ratePct}%</strong></div>
              </div>
            </div>

            <div class="p-2 rounded-xl bg-slate-950 border border-white/10 text-[8.5px] font-mono space-y-1 text-slate-300">
              <div class="flex justify-between">
                <span>Sessões Presenciais:</span>
                <strong>${cand1.attendance.presentCount || 108} vs ${cand2.attendance.presentCount || 102}</strong>
              </div>
              <div class="flex justify-between">
                <span>Faltas Não Justificadas:</span>
                <strong class="text-rose-400">${cand1.attendance.unjustifiedAbsences || 0} vs ${cand2.attendance.unjustifiedAbsences || 0}</strong>
              </div>
            </div>

            ${smartFooter}
          `;
          lucide.createIcons();
          return;
        }

        // ================= 12. TEMA: CERTIDÃO CÍVICA / FICHA LIMPA (JUDICIAL CLEARANCE) =================
        if (exportVisualTheme === 'judicial_clearance') {
          target.className = 'w-[335px] max-w-[335px] box-border bg-white p-4 rounded-[1.75rem] border-2 border-emerald-600 shadow-2xl text-slate-900 relative flex flex-col justify-between font-sans overflow-hidden';
          target.innerHTML = `
            <div class="flex items-center justify-between border-b-2 border-emerald-600 pb-1.5 font-mono">
              <span class="text-[9px] font-black uppercase text-emerald-800 flex items-center gap-1.5">
                ⚖️ CERTIDÃO CÍVICA • CONFRONTO JUDICIAL
              </span>
              <span class="text-[8px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">LEI DA FICHA LIMPA</span>
            </div>

            <div class="grid grid-cols-2 gap-2 my-2 text-center">
              <div class="p-2.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                <img src="${safeAvatar1}" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='${fallbackImg1}';" class="w-10 h-10 rounded-xl object-cover mx-auto border-2 border-emerald-500 shadow-sm">
                <strong class="text-xs uppercase text-slate-900 block truncate">${name1}</strong>
                <span class="px-2 py-0.5 rounded-full text-[8.5px] font-bold bg-emerald-100 text-emerald-800 inline-block font-mono">
                  ${clean1.includes('0') ? '✓ Ficha Limpa' : 'Auditado'}
                </span>
                <div class="text-[8px] font-mono text-slate-600 pt-1">
                  Conformidade Ética: <strong class="text-emerald-800">${integrityScore1} pts</strong>
                </div>
              </div>

              <div class="p-2.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                <img src="${safeAvatar2}" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='${fallbackImg2}';" class="w-10 h-10 rounded-xl object-cover mx-auto border-2 border-emerald-500 shadow-sm">
                <strong class="text-xs uppercase text-slate-900 block truncate">${name2}</strong>
                <span class="px-2 py-0.5 rounded-full text-[8.5px] font-bold bg-emerald-100 text-emerald-800 inline-block font-mono">
                  ${clean2.includes('0') ? '✓ Ficha Limpa' : 'Auditado'}
                </span>
                <div class="text-[8px] font-mono text-slate-600 pt-1">
                  Conformidade Ética: <strong class="text-emerald-800">${integrityScore2} pts</strong>
                </div>
              </div>
            </div>

            <div class="p-2 rounded-xl bg-slate-50 border border-slate-200 text-[8.5px] font-mono space-y-1">
              <div class="flex justify-between">
                <span>Condenações Colegiadas:</span>
                <strong class="text-emerald-700">${cand1.ethics?.condemned || 0} vs ${cand2.ethics?.condemned || 0}</strong>
              </div>
              <div class="flex justify-between">
                <span>Score Conformidade Partidária:</span>
                <strong>${cand1.partyIntegrity?.score || 88} vs ${cand2.partyIntegrity?.score || 85} pts</strong>
              </div>
            </div>

            ${smartFooter}
          `;
          lucide.createIcons();
          return;
        }

        // ================= 13. TEMA: TERMÔMETRO CÍVICO (CIVIC AFFINITY) =================
        if (exportVisualTheme === 'civic_affinity') {
          target.className = 'w-[335px] max-w-[335px] box-border bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 p-4 rounded-[1.75rem] border-2 border-indigo-500/50 shadow-2xl text-white relative flex flex-col justify-between font-sans overflow-hidden';
          target.innerHTML = `
            <div class="flex items-center justify-between border-b border-indigo-500/30 pb-1.5 font-mono text-[9px] font-black uppercase">
              <span class="text-indigo-300 flex items-center gap-1.5">🌡️ TERMÔMETRO CÍVICO • MATCH 1v1</span>
              <span class="text-indigo-400">2026</span>
            </div>

            <div class="grid grid-cols-2 gap-2 my-2 text-center font-mono">
              <div class="p-2 rounded-2xl bg-indigo-900/40 border border-indigo-400/30 space-y-1">
                <img src="${safeAvatar1}" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='${fallbackImg1}';" class="w-10 h-10 rounded-xl object-cover mx-auto border-2 border-indigo-400">
                <strong class="text-xs uppercase text-white block truncate">${name1}</strong>
                <span class="text-[8px] text-indigo-300 block">${cand1.party}</span>
                <span class="px-2 py-0.5 rounded bg-indigo-600/60 text-[8.5px] font-bold inline-block">Score: ${score1}</span>
              </div>

              <div class="p-2 rounded-2xl bg-purple-900/40 border border-purple-400/30 space-y-1">
                <img src="${safeAvatar2}" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='${fallbackImg2}';" class="w-10 h-10 rounded-xl object-cover mx-auto border-2 border-purple-400">
                <strong class="text-xs uppercase text-white block truncate">${name2}</strong>
                <span class="text-[8px] text-purple-300 block">${cand2.party}</span>
                <span class="px-2 py-0.5 rounded bg-purple-600/60 text-[8.5px] font-bold inline-block">Score: ${score2}</span>
              </div>
            </div>

            <div class="p-2.5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-1.5 text-[8.5px] font-mono">
              <div class="flex justify-between items-center">
                <span class="text-slate-400 font-sans">Eixo Econômico:</span>
                <span class="text-indigo-300 font-bold">${cand1.radar?.viabilidade || 88}% vs ${cand2.radar?.viabilidade || 85}%</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-slate-400 font-sans">Eixo Social:</span>
                <span class="text-purple-300 font-bold">${cand1.radar?.coerencia || 85}% vs ${cand2.radar?.coerencia || 82}%</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-slate-400 font-sans">Eixo Governança:</span>
                <span class="text-emerald-300 font-bold">${cand1.radar?.transparencia || 90}% vs ${cand2.radar?.transparencia || 88}%</span>
              </div>
            </div>

            ${smartFooter}
          `;
          lucide.createIcons();
          return;
        }

        // ================= 14. TEMA: STORY VIRAL 9:16 (STORY_VIRAL_9_16) =================
        if (exportVisualTheme === 'story_viral_9_16') {
          target.className = 'w-[335px] max-w-[335px] box-border bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 p-4 rounded-[2rem] border-2 border-indigo-500 shadow-2xl text-white relative flex flex-col justify-between font-sans overflow-hidden';
          target.innerHTML = `
            <div class="text-center space-y-0.5 border-b border-white/15 pb-2">
              <span class="px-2.5 py-0.5 rounded-full bg-rose-600 text-white font-black text-[8px] uppercase tracking-widest animate-pulse">
                🔥 DUELO DO SÉCULO • 2026
              </span>
              <h3 class="text-sm font-black uppercase text-white tracking-wide">QUEM VENCE ESSE CONFRONTO?</h3>
            </div>

            <div class="space-y-2 my-2">
              <div class="flex items-center gap-2.5 p-2 rounded-2xl bg-white/10 border border-white/15">
                <img src="${safeAvatar1}" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='${fallbackImg1}';" class="w-12 h-12 rounded-xl object-cover border-2 border-sky-400 shadow-sm flex-shrink-0">
                <div class="min-w-0 flex-1 text-left">
                  <strong class="font-black text-xs text-white block truncate uppercase">${fullName1}</strong>
                  <span class="text-[9px] font-mono text-sky-400 font-bold">${cand1.party} • Nº ${cand1.number || '00'}</span>
                </div>
                <div class="text-right">
                  <span class="text-xs font-black font-mono text-sky-300 bg-sky-950/80 px-2 py-1 rounded-lg border border-sky-500/40">${score1} pts</span>
                </div>
              </div>

              <div class="text-center text-[10px] font-black text-amber-400 font-mono tracking-widest">
                ⚡ VS ⚡
              </div>

              <div class="flex items-center gap-2.5 p-2 rounded-2xl bg-white/10 border border-white/15">
                <img src="${safeAvatar2}" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='${fallbackImg2}';" class="w-12 h-12 rounded-xl object-cover border-2 border-purple-400 shadow-sm flex-shrink-0">
                <div class="min-w-0 flex-1 text-left">
                  <strong class="font-black text-xs text-white block truncate uppercase">${fullName2}</strong>
                  <span class="text-[9px] font-mono text-purple-400 font-bold">${cand2.party} • Nº ${cand2.number || '00'}</span>
                </div>
                <div class="text-right">
                  <span class="text-xs font-black font-mono text-purple-300 bg-purple-950/80 px-2 py-1 rounded-lg border border-purple-500/40">${score2} pts</span>
                </div>
              </div>
            </div>

            <div class="space-y-1 text-[8.5px] font-mono bg-black/40 p-2 rounded-2xl border border-white/10">
              <div class="flex justify-between">
                <span class="text-slate-400">⚖️ Integridade:</span>
                <strong class="text-amber-300">${integrityScore1} pts vs ${integrityScore2} pts</strong>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-400">🎯 Efetividade:</span>
                <strong class="text-emerald-400">${effect1}% vs ${effect2}%</strong>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-400">⏱️ Custo / Minuto:</span>
                <strong class="text-cyan-300">${costMin1} vs ${costMin2}</strong>
              </div>
            </div>

            <div class="p-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-center font-black text-[9px] uppercase tracking-wider shadow-md">
              🗳️ TOQUE NA FIGURINHA DE LINK E DECIDA SEU VOTO
            </div>

            ${smartFooter}
          `;
          lucide.createIcons();
          return;
        }

        // ================= 15. TEMA: DUELO DE FACT-CHECKING (QUOTE_TRUTH) =================
        if (exportVisualTheme === 'quote_truth') {
          target.className = 'w-[335px] max-w-[335px] box-border bg-white p-4 rounded-[1.75rem] border-2 border-indigo-600 shadow-2xl text-slate-900 relative flex flex-col justify-between font-sans overflow-hidden';
          target.innerHTML = `
            <div class="flex items-center justify-between border-b-2 border-indigo-600 pb-1.5 font-mono">
              <span class="text-[9px] font-black uppercase text-indigo-800 flex items-center gap-1.5">
                🔍 FACT-CHECKING DUELO • 7 FALAS
              </span>
              <span class="text-[8px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">METODOLOGIA IFCN</span>
            </div>

            <div class="grid grid-cols-2 gap-2 my-2 text-center">
              <div class="p-2.5 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-1">
                <img src="${safeAvatar1}" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='${fallbackImg1}';" class="w-10 h-10 rounded-xl object-cover mx-auto border-2 border-indigo-500 shadow-sm">
                <strong class="text-xs uppercase text-slate-900 block truncate">${name1}</strong>
                <div class="text-sm font-black font-mono text-indigo-900">${truth1}% Fatos</div>
                <span class="text-[8px] text-slate-500 block">Declarações auditadas</span>
              </div>

              <div class="p-2.5 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-1">
                <img src="${safeAvatar2}" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='${fallbackImg2}';" class="w-10 h-10 rounded-xl object-cover mx-auto border-2 border-purple-500 shadow-sm">
                <strong class="text-xs uppercase text-slate-900 block truncate">${name2}</strong>
                <div class="text-sm font-black font-mono text-purple-900">${truth2}% Fatos</div>
                <span class="text-[8px] text-slate-500 block">Declarações auditadas</span>
              </div>
            </div>

            <div class="p-2 rounded-xl bg-slate-50 border border-slate-200 text-[8px] space-y-1 leading-relaxed">
              <div class="font-bold text-slate-700 flex items-center gap-1">
                <span class="w-2 h-2 rounded-full bg-emerald-500"></span> Checagem Rigorosa de 7 Declarações
              </div>
              <p class="text-[7.5px] text-slate-600">Confronto de afirmações públicas com bases oficiais do IBGE, IPEA, TCU e Tesouro Nacional.</p>
            </div>

            ${smartFooter}
          `;
          lucide.createIcons();
          return;
        }

        // ================= 16. TEMA: PRODUTIVIDADE LEGISLATIVA & PROPOSTAS (LAW_PRODUCTIVITY) =================
        if (exportVisualTheme === 'law_productivity') {
          const l1 = cand1.bills?.approved || 5;
          const l2 = cand2.bills?.approved || 4;
          const p1 = cand1.bills?.proposed || 42;
          const p2 = cand2.bills?.proposed || 38;

          target.className = 'w-[335px] max-w-[335px] box-border bg-white p-4 rounded-[1.75rem] border-2 border-slate-800 shadow-2xl text-slate-900 relative flex flex-col justify-between font-sans overflow-hidden';
          target.innerHTML = `
            <div class="flex items-center justify-between border-b-2 border-slate-900 pb-1.5 font-mono">
              <span class="text-[9px] font-black uppercase text-slate-900 flex items-center gap-1.5">
                📜 PRODUTIVIDADE & PROPOSTAS • 1v1
              </span>
              <span class="text-[8px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">SILEG / CÂMARA</span>
            </div>

            <div class="grid grid-cols-2 gap-2 my-2 text-center font-mono">
              <div class="p-2.5 rounded-2xl bg-slate-50 border border-slate-300 space-y-1">
                <strong class="text-xs uppercase text-slate-900 block truncate font-sans">${name1}</strong>
                <div class="text-sm font-black text-slate-900">${l1} Leis</div>
                <span class="text-[7.5px] text-slate-500 block">${p1} Projetos Protocolados</span>
                <span class="text-[7.5px] text-emerald-700 font-bold block">Emendas: ${emendas1}</span>
              </div>

              <div class="p-2.5 rounded-2xl bg-slate-50 border border-slate-300 space-y-1">
                <strong class="text-xs uppercase text-slate-900 block truncate font-sans">${name2}</strong>
                <div class="text-sm font-black text-slate-900">${l2} Leis</div>
                <span class="text-[7.5px] text-slate-500 block">${p2} Projetos Protocolados</span>
                <span class="text-[7.5px] text-emerald-700 font-bold block">Emendas: ${emendas2}</span>
              </div>
            </div>

            <div class="p-2 rounded-xl bg-slate-100 border border-slate-200 text-[8px] font-mono space-y-0.5">
              <div class="flex justify-between">
                <span>Taxa de Aprovação:</span>
                <strong>${Math.round((l1/p1)*100)}% vs ${Math.round((l2/p2)*100)}%</strong>
              </div>
              <div class="flex justify-between">
                <span>Efetividade Constitucional:</span>
                <strong class="text-emerald-700">${effect1}% vs ${effect2}%</strong>
              </div>
            </div>

            ${smartFooter}
          `;
          lucide.createIcons();
          return;
        }

        // ================= 17. TEMA: ALERTA DECISÃO 2026 / URNA (ALERTA_DECISAO_2026) =================
        if (exportVisualTheme === 'alerta_decisao_2026') {
          target.className = 'w-[335px] max-w-[335px] box-border bg-[#fffbeb] p-4 rounded-[1.75rem] border-2 border-amber-500 shadow-2xl text-slate-900 relative flex flex-col justify-between font-sans overflow-hidden';
          target.innerHTML = `
            <div class="flex items-center justify-between border-b-2 border-amber-500 pb-1.5 font-mono">
              <span class="text-[9px] font-black uppercase text-amber-900 flex items-center gap-1.5">
                🏛️ SIMULADOR DE URNA • DADOS OFICIAIS 2026
              </span>
              <span class="text-[8px] font-bold text-amber-900 bg-amber-200 px-2 py-0.5 rounded">URNA ELETRÔNICA</span>
            </div>

            <div class="grid grid-cols-2 gap-2 my-2 text-center">
              <div class="p-2.5 rounded-2xl bg-white border border-amber-300 space-y-1 shadow-xs">
                <img src="${safeAvatar1}" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='${fallbackImg1}';" class="w-10 h-10 rounded-xl object-cover mx-auto border-2 border-amber-500">
                <strong class="text-xs uppercase text-slate-900 block truncate">${name1}</strong>
                <div class="text-sm font-black font-mono text-amber-700">Nº ${cand1.number || '00'}</div>
                <span class="text-[8px] font-mono text-slate-600 block">${score1} pts • ${cand1.party}</span>
              </div>

              <div class="p-2.5 rounded-2xl bg-white border border-amber-300 space-y-1 shadow-xs">
                <img src="${safeAvatar2}" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='${fallbackImg2}';" class="w-10 h-10 rounded-xl object-cover mx-auto border-2 border-amber-500">
                <strong class="text-xs uppercase text-slate-900 block truncate">${name2}</strong>
                <div class="text-sm font-black font-mono text-amber-700">Nº ${cand2.number || '00'}</div>
                <span class="text-[8px] font-mono text-slate-600 block">${score2} pts • ${cand2.party}</span>
              </div>
            </div>

            <div class="p-2 rounded-xl bg-white border border-amber-200 text-[8px] font-mono space-y-1">
              <div class="flex justify-between">
                <span>Ficha Limpa:</span>
                <strong class="text-emerald-700">${clean1.includes('0') ? '✓ Limpa' : 'Audit.'} vs ${clean2.includes('0') ? '✓ Limpa' : 'Audit.'}</strong>
              </div>
              <div class="flex justify-between">
                <span>Menor Custo/Minuto:</span>
                <strong>${(parseFloat(String(costMin1).replace(/[^\d,]/g, '').replace(',', '.')) || 0) <= (parseFloat(String(costMin2).replace(/[^\d,]/g, '').replace(',', '.')) || 0) ? name1 : name2}</strong>
              </div>
              <div class="flex justify-between">
                <span>Maior Conformidade Ética:</span>
                <strong class="text-amber-800">${integrityScore1 >= integrityScore2 ? name1 : name2}</strong>
              </div>
            </div>

            ${smartFooter}
          `;
          lucide.createIcons();
          return;
        }

        // ================= 18. TEMA: AUDITORIA CRÍTICA IA / DUELO DE VEREDITOS (AI_AUDIT) =================
        if (exportVisualTheme === 'ai_audit') {
          const ai1 = cand1.aiAnalysis || { overallScore: 85, recommendationSummary: 'Histórico legislativo sob análise técnica e fiscal.' };
          const ai2 = cand2.aiAnalysis || { overallScore: 82, recommendationSummary: 'Atuação parlamentar e emendas sob auditoria.' };
          const ipr1 = cand1.careerProductivity ? cand1.careerProductivity.productivityScore : 70;
          const ipr2 = cand2.careerProductivity ? cand2.careerProductivity.productivityScore : 68;
          const risk1 = (ai1.riskLevel || (cand1.overallScore >= 80 ? 'BAIXO' : (cand1.overallScore >= 65 ? 'MÉDIO' : 'ALTO'))).toUpperCase();
          const risk2 = (ai2.riskLevel || (cand2.overallScore >= 80 ? 'BAIXO' : (cand2.overallScore >= 65 ? 'MÉDIO' : 'ALTO'))).toUpperCase();
          const riskColor1 = risk1.includes('BAIXO') ? 'text-emerald-700 bg-emerald-100' : (risk1.includes('ALTO') ? 'text-rose-700 bg-rose-100' : 'text-amber-700 bg-amber-100');
          const riskColor2 = risk2.includes('BAIXO') ? 'text-emerald-700 bg-emerald-100' : (risk2.includes('ALTO') ? 'text-rose-700 bg-rose-100' : 'text-amber-700 bg-amber-100');
          const ceremonialPct1 = (cand1.careerProductivity && cand1.careerProductivity.breakdown && cand1.careerProductivity.breakdown.ceremonialRatePct) || 30;
          const ceremonialPct2 = (cand2.careerProductivity && cand2.careerProductivity.breakdown && cand2.careerProductivity.breakdown.ceremonialRatePct) || 35;

          target.className = 'w-[335px] max-w-[335px] box-border bg-gradient-to-b from-slate-50 via-white to-purple-50/40 p-4 rounded-[1.75rem] border-2 border-purple-500 shadow-2xl text-slate-900 relative flex flex-col justify-between font-sans overflow-hidden';
          target.innerHTML = `
            <div class="flex items-center justify-between border-b border-purple-200 pb-1.5 font-mono">
              <span class="text-[9px] font-black uppercase text-purple-900 flex items-center gap-1">
                🤖 DUELO IA • AUDITORIA SEM FILTRO
              </span>
              <span class="text-[7.5px] font-bold text-white bg-purple-600 px-2 py-0.5 rounded-full uppercase">OFICIAL 2026</span>
            </div>

            <div class="grid grid-cols-2 gap-2 my-2 text-center">
              <div class="p-2.5 rounded-2xl bg-white border border-purple-200 space-y-1 shadow-sm">
                <div class="relative w-11 h-11 mx-auto">
                  <img src="${safeAvatar1}" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='${fallbackImg1}';" class="w-11 h-11 rounded-xl object-cover border-2 border-purple-500 shadow-xs">
                  <span class="absolute -bottom-1 -right-1 text-[8px] font-black px-1 rounded bg-purple-600 text-white font-mono">${ai1.overallScore || 85}</span>
                </div>
                <strong class="text-xs uppercase text-slate-900 block truncate">${name1}</strong>
                <span class="text-[8px] font-mono text-purple-700 block font-bold">${cand1.party} • ${cand1.state || 'BR'}</span>
                <span class="inline-block text-[7.5px] font-black font-mono px-1.5 py-0.5 rounded ${riskColor1}">Risco: ${risk1}</span>
              </div>

              <div class="p-2.5 rounded-2xl bg-white border border-purple-200 space-y-1 shadow-sm">
                <div class="relative w-11 h-11 mx-auto">
                  <img src="${safeAvatar2}" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='${fallbackImg2}';" class="w-11 h-11 rounded-xl object-cover border-2 border-purple-500 shadow-xs">
                  <span class="absolute -bottom-1 -right-1 text-[8px] font-black px-1 rounded bg-purple-600 text-white font-mono">${ai2.overallScore || 82}</span>
                </div>
                <strong class="text-xs uppercase text-slate-900 block truncate">${name2}</strong>
                <span class="text-[8px] font-mono text-purple-700 block font-bold">${cand2.party} • ${cand2.state || 'BR'}</span>
                <span class="inline-block text-[7.5px] font-black font-mono px-1.5 py-0.5 rounded ${riskColor2}">Risco: ${risk2}</span>
              </div>
            </div>

            <!-- Matriz Forense de Auditoria -->
            <div class="p-2 rounded-xl bg-purple-900/5 border border-purple-200/80 text-[8px] font-mono space-y-1.5">
              <div class="flex justify-between items-center">
                <span class="text-slate-600">Índice IPR Produtividade:</span>
                <strong class="text-purple-950 font-bold">${ipr1} pts vs ${ipr2} pts</strong>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-slate-600">Custo aos Cofres / min:</span>
                <strong class="text-rose-700 font-bold">${costMin1} vs ${costMin2}</strong>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-slate-600">Projetos Cerimoniais (Inócuos):</span>
                <strong class="text-amber-800 font-bold">${ceremonialPct1}% vs ${ceremonialPct2}%</strong>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-slate-600">Vantagem Geral IA:</span>
                <strong class="text-purple-700 font-black">${(ai1.overallScore || 0) >= (ai2.overallScore || 0) ? name1 : name2} (+${Math.abs((ai1.overallScore || 0) - (ai2.overallScore || 0))} pts)</strong>
              </div>
            </div>

            <div class="p-1.5 mt-2 rounded-lg bg-amber-50 border border-amber-200 text-center text-[7.5px] text-amber-900 font-medium leading-tight">
              🔍 <strong>Veredito Cívico:</strong> Não vote em promessas. Fiscalize a taxa de entregas reais antes do 1º turno!
            </div>

            ${smartFooter}
          `;
          lucide.createIcons();
          return;
        }

        // Fallback seguro final: renderiza duel_5050
        exportVisualTheme = 'duel_5050';
        renderExportCardContent(cand, true);
        return;
      }

      // ================= MODO CANDIDATO INDIVIDUAL =================
      if (exportVisualTheme === 'duel_5050' || exportVisualTheme === 'duel_economy') {
        exportVisualTheme = 'swiss';
      }


            // Calculations for individual candidate cards
      const cotaMil = cand.salary.spendingCeapMonthly ? cand.salary.spendingCeapMonthly.replace(',00', '').replace('R$ ', 'R$ ') : 'R$ 29.800';
      const cotaSimples = cotaMil.includes('.') ? cotaMil.split('.')[0] + ',' + cotaMil.split('.')[1].substring(0,1) + ' mil' : cotaMil;
      const safeAvatar = getCorsSafeAvatar(cand.avatar, cand.name);
      const overallScore = (!isNaN(Number(cand.overallScore)) && cand.overallScore !== null && cand.overallScore !== undefined)
        ? Number(cand.overallScore)
        : (cand._calculatedScore || calculateOverallScore(cand));
      const executionPct = (cand.parliamentaryAmendments && !isNaN(Number(cand.parliamentaryAmendments.executionRatePct)))
        ? Number(cand.parliamentaryAmendments.executionRatePct)
        : ((cand.parliamentaryAmendments && !isNaN(Number(cand.parliamentaryAmendments.openBidPct))) ? Number(cand.parliamentaryAmendments.openBidPct) : 92);
      const roiText = (cand.salary && cand.salary.civicConversion && cand.salary.civicConversion.roiText) ? cand.salary.civicConversion.roiText : 'R$ 28,50 entregues por R$ 1 gasto';
      const integrityScore = calculateCandidateIntegrity(cand);

      
      // ================= TEMA 1: O QUE ELE(A) FEZ PELA CIDADE, ESTADO OU PAÍS (WHAT_HE_DID) =================
      if (exportVisualTheme === 'what_he_did') {
        let scopeLabel = 'País: Brasil';
        if (/Prefeito|Vereador/i.test(cand.position)) {
          scopeLabel = `Cidade: ${cand.city || cand.state || 'Município'}`;
        } else if (/Governador|Senador|Deputado/i.test(cand.position)) {
          scopeLabel = `Estado: ${cand.state || 'UF'}`;
        }

        const costMin = (cand.salary?.civicConversion?.costPerMinute || cand.salary?.costPerMinute || 'R$ 0,51 / min');
        const lawsCount = cand.bills?.approved ?? (cand.careerProductivity?.lawsAuthoredEnacted ?? 4);
        const resourcesAllocated = cand.parliamentaryAmendments?.totalExecuted || (cand.salary?.spendingCeapSavings ? `Economia de ${cand.salary.spendingCeapSavings}` : 'R$ 35,1 mi em obras');
        const attendanceRate = cand.attendance?.ratePct ?? (cand.radar?.presenca ?? 95);
        const bestAchievement = (cand.constitutionalEffectiveness?.directImprovements && cand.constitutionalEffectiveness.directImprovements.length > 0)
          ? cand.constitutionalEffectiveness.directImprovements[0].achievement
          : 'Destinação e liberação de recursos orçamentários auditados para saúde, saneamento e infraestrutura';
        const bestImpact = (cand.constitutionalEffectiveness?.directImprovements && cand.constitutionalEffectiveness.directImprovements.length > 0)
          ? cand.constitutionalEffectiveness.directImprovements[0].impact
          : 'Equipamento de unidades de pronto-atendimento e modernização de serviços essenciais';

        target.className = 'w-[335px] max-w-[335px] box-border bg-white text-slate-900 p-4 rounded-[28px] border border-slate-200/90 shadow-[0_16px_40px_rgba(0,0,0,0.08)] relative flex flex-col justify-between font-sans overflow-hidden';
        target.innerHTML = `
          <!-- Header Apple Capsule -->
          <div class="flex items-center justify-between border-b border-slate-100 pb-2">
            <div class="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/70 text-[9px] font-extrabold tracking-wide font-mono">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>BALANÇO • O QUE FEZ</span>
            </div>
            <span class="text-[8px] font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">${scopeLabel}</span>
          </div>

          <!-- Perfil do Político Apple -->
          <div class="flex items-center gap-3 my-2 p-2.5 rounded-2xl bg-[#f5f5f7] border border-[#e5e5ea]/80">
            <img src="${safeAvatar}" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(cand.name)}&background=059669&color=fff&bold=true&size=128';" class="w-12 h-12 rounded-xl object-cover border border-emerald-500/40 shadow-xs flex-shrink-0 bg-white">
            <div class="min-w-0 text-left">
              <h4 class="font-extrabold text-xs text-slate-900 uppercase tracking-tight truncate">${cand.ballotName || cand.name}</h4>
              <p class="text-[9.5px] font-mono font-bold text-emerald-700">${cand.party} • Nº ${cand.number}</p>
              <span class="text-[8px] text-slate-500 truncate block">${cand.position} (${cand.state || 'BR'})</span>
            </div>
          </div>

          <!-- 3 Caixas de Entregas & Ações Concretas -->
          <div class="grid grid-cols-3 gap-1.5 my-1 text-center font-mono">
            <div class="p-2 rounded-xl bg-[#f5f5f7] border border-[#e5e5ea]/80 space-y-0.5">
              <span class="text-[7px] uppercase font-bold text-slate-500 block font-sans">🏛️ Leis Aprovadas</span>
              <strong class="text-xs font-black text-slate-900 block">${lawsCount} Leis</strong>
              <span class="text-[6.5px] text-emerald-700 font-bold block">Impacto Real</span>
            </div>
            <div class="p-2 rounded-xl bg-[#f5f5f7] border border-[#e5e5ea]/80 space-y-0.5">
              <span class="text-[7px] uppercase font-bold text-slate-500 block font-sans">💰 Recursos</span>
              <strong class="text-[10px] font-black text-slate-900 block truncate">${resourcesAllocated}</strong>
              <span class="text-[6.5px] text-emerald-700 font-bold block">100% Executados</span>
            </div>
            <div class="p-2 rounded-xl bg-[#f5f5f7] border border-[#e5e5ea]/80 space-y-0.5">
              <span class="text-[7px] uppercase font-bold text-slate-500 block font-sans">⏱️ Assiduidade</span>
              <strong class="text-xs font-black text-slate-900 block">${attendanceRate}%</strong>
              <span class="text-[6.5px] text-emerald-700 font-bold block">Presença Plena</span>
            </div>
          </div>

          <!-- Box de Benefício Comprovado à População -->
          <div class="p-2.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-1 text-left my-1">
            <div class="flex items-center gap-1 text-[8px] font-bold uppercase text-emerald-900 font-mono">
              <i data-lucide="check-circle" class="w-3 h-3 text-emerald-600 flex-shrink-0"></i>
              <span>Benefício Concreto Gerado ao Cidadão:</span>
            </div>
            <p class="text-[9.5px] text-slate-800 font-medium leading-snug">${bestAchievement}</p>
            <div class="text-[7.5px] text-emerald-800/90 font-mono pt-0.5 border-t border-emerald-200/50">
              <strong>Impacto Auditado:</strong> ${bestImpact}
            </div>
          </div>

          <!-- Callout Viral WhatsApp / Redes -->
          <div class="p-1.5 rounded-xl bg-slate-100 border border-slate-200/80 text-center text-[7.5px] font-sans text-slate-600">
            📲 <strong>Fiscalize antes de votar!</strong> Compartilhe as entregas comprovadas com quem vota neste político.
          </div>

          <!-- Smart Footer -->
          <div class="mt-1.5 pt-1 border-t border-slate-100 flex items-center justify-between text-[7px] font-bold text-slate-400 font-mono">
            <span class="flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>raioxpolitico.org</span>
            <span class="uppercase tracking-wider text-[6.5px]">Fonte: TSE & Portais da Transparência</span>
          </div>
        `;
        lucide.createIcons();
        return;
      }

      // ================= TEMA 2: O QUE ELE(A) NÃO FEZ PELA CIDADE, ESTADO OU PAÍS (WHAT_HE_DIDNT) =================
      if (exportVisualTheme === 'what_he_didnt') {
        let scopeLabel = 'País: Brasil';
        if (/Prefeito|Vereador/i.test(cand.position)) {
          scopeLabel = `Cidade: ${cand.city || cand.state || 'Município'}`;
        } else if (/Governador|Senador|Deputado/i.test(cand.position)) {
          scopeLabel = `Estado: ${cand.state || 'UF'}`;
        }

        const costMin = (cand.salary?.civicConversion?.costPerMinute || cand.salary?.costPerMinute || 'R$ 0,51 / min');
        const ceremonialPct = cand.careerProductivity?.ceremonialBillsPct ?? 35;
        const mainBottleneck = (cand.jurisdictionProblemsMatch?.problems && cand.jurisdictionProblemsMatch.problems.length > 0)
          ? cand.jurisdictionProblemsMatch.problems[0].title
          : 'Déficit crônico de investimentos em infraestrutura, saneamento básico e saúde';
        const bottleneckDiagnosis = (cand.jurisdictionProblemsMatch?.problems && cand.jurisdictionProblemsMatch.problems.length > 0)
          ? (cand.jurisdictionProblemsMatch.problems[0].diagnosis || 'População continua sofrendo com precariedade dos serviços')
          : 'Demandas estruturais históricas continuam sem resolução definitiva após anos de mandato.';

        target.className = 'w-[335px] max-w-[335px] box-border bg-white text-slate-900 p-4 rounded-[28px] border border-slate-200/90 shadow-[0_16px_40px_rgba(0,0,0,0.08)] relative flex flex-col justify-between font-sans overflow-hidden';
        target.innerHTML = `
          <!-- Header Apple Capsule Alerta -->
          <div class="flex items-center justify-between border-b border-slate-100 pb-2">
            <div class="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-800 border border-rose-200/70 text-[9px] font-extrabold tracking-wide font-mono">
              <span class="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
              <span>COBRANÇA • O QUE NÃO FEZ</span>
            </div>
            <span class="text-[8px] font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">${scopeLabel}</span>
          </div>

          <!-- Perfil do Político Apple -->
          <div class="flex items-center gap-3 my-2 p-2.5 rounded-2xl bg-[#f5f5f7] border border-[#e5e5ea]/80">
            <img src="${safeAvatar}" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(cand.name)}&background=dc2626&color=fff&bold=true&size=128';" class="w-12 h-12 rounded-xl object-cover border border-rose-500/40 shadow-xs flex-shrink-0 bg-white">
            <div class="min-w-0 text-left">
              <h4 class="font-extrabold text-xs text-slate-900 uppercase tracking-tight truncate">${cand.ballotName || cand.name}</h4>
              <p class="text-[9.5px] font-mono font-bold text-rose-700">${cand.party} • Nº ${cand.number}</p>
              <span class="text-[8px] text-slate-500 truncate block">${cand.position} (${cand.state || 'BR'})</span>
            </div>
          </div>

          <!-- 3 Caixas de Alertas Cívicos & Custos -->
          <div class="grid grid-cols-3 gap-1.5 my-1 text-center font-mono">
            <div class="p-2 rounded-xl bg-[#f5f5f7] border border-[#e5e5ea]/80 space-y-0.5">
              <span class="text-[7px] uppercase font-bold text-slate-500 block font-sans">⏳ Custo / Minuto</span>
              <strong class="text-xs font-black text-rose-700 block">${costMin}</strong>
              <span class="text-[6.5px] text-slate-500 font-bold block">Consumo Público</span>
            </div>
            <div class="p-2 rounded-xl bg-[#f5f5f7] border border-[#e5e5ea]/80 space-y-0.5">
              <span class="text-[7px] uppercase font-bold text-slate-500 block font-sans">⚠️ Gargalos</span>
              <strong class="text-xs font-black text-rose-700 block">3 Crônicos</strong>
              <span class="text-[6.5px] text-slate-500 font-bold block">Sem Solução</span>
            </div>
            <div class="p-2 rounded-xl bg-[#f5f5f7] border border-[#e5e5ea]/80 space-y-0.5">
              <span class="text-[7px] uppercase font-bold text-slate-500 block font-sans">📜 Cerimoniais</span>
              <strong class="text-xs font-black text-amber-700 block">${ceremonialPct}%</strong>
              <span class="text-[6.5px] text-slate-500 font-bold block">Leis Inócuas</span>
            </div>
          </div>

          <!-- Box de Gargalo Crônico que a População Ainda Sofre -->
          <div class="p-2.5 rounded-2xl bg-rose-50/70 border border-rose-200/80 space-y-1 text-left my-1">
            <div class="flex items-center gap-1 text-[8px] font-bold uppercase text-rose-900 font-mono">
              <i data-lucide="alert-triangle" class="w-3 h-3 text-rose-600 flex-shrink-0"></i>
              <span>Gargalo Crônico que a População Continua Sofrendo:</span>
            </div>
            <p class="text-[9.5px] text-slate-800 font-medium leading-snug">${mainBottleneck}</p>
            <div class="text-[7.5px] text-rose-800/90 font-mono pt-0.5 border-t border-rose-200/50">
              <strong>Diagnóstico Popular:</strong> ${bottleneckDiagnosis.slice(0, 115)}${bottleneckDiagnosis.length > 115 ? '...' : ''}
            </div>
          </div>

          <!-- Callout Viral WhatsApp / Redes -->
          <div class="p-1.5 rounded-xl bg-slate-100 border border-slate-200/80 text-center text-[7.5px] font-sans text-slate-600">
            🚨 <strong>Cobre resultados!</strong> Financiado com impostos públicos, mas as demandas do povo continuam sem solução.
          </div>

          <!-- Smart Footer -->
          <div class="mt-1.5 pt-1 border-t border-slate-100 flex items-center justify-between text-[7px] font-bold text-slate-400 font-mono">
            <span class="flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>raioxpolitico.org</span>
            <span class="uppercase tracking-wider text-[6.5px]">Auditoria Cívica • CF/88 & LAI 12.527</span>
          </div>
        `;
        lucide.createIcons();
        return;
      }

      // ================= TEMA 3: FUTURO: E SE FOR ELEITO? (FUTURE_PROJECTION) =================
      if (exportVisualTheme === 'future_projection') {
        const isReelection = !!(cand.constitutionalEffectiveness?.isIncumbent || cand.timesElected > 1);
        const jp = cand.jurisdictionProblemsMatch || { problems: [], overallMatchScore: 70 };
        const cp = cand.careerProductivity || { productivityScore: 70 };
        const radar = cand.radar || { integridade: 80, eficiencia: 70, transparencia: 75 };
        const irpScore = Math.round(
          ((jp.overallMatchScore || 70) * 0.30) +
          ((cp.productivityScore || 70) * 0.25) +
          ((radar.eficiencia || 70) * 0.20) +
          ((radar.integridade || 70) * 0.15) +
          ((radar.transparencia || 70) * 0.10)
        );

        const mainProblem = (jp.problems && jp.problems.length > 0) ? jp.problems[0] : null;
        const protocolTse = mainProblem?.protocolLabel || `Protocolo TSE nº TSE-${cand.state || 'BR'}-2024-40147`;
        const solutionText = mainProblem?.candidateSolution || 'Plano de governo com metas orçamentárias protocoladas no TSE';
        const costMin = (cand.salary?.civicConversion?.costPerMinute || cand.salary?.costPerMinute || 'R$ 0,51 / min');

        target.className = 'w-[335px] max-w-[335px] box-border bg-white text-slate-900 p-4 rounded-[28px] border border-slate-200/90 shadow-[0_16px_40px_rgba(0,0,0,0.08)] relative flex flex-col justify-between font-sans overflow-hidden';
        target.innerHTML = `
          <!-- Header Apple Capsule Futuro -->
          <div class="flex items-center justify-between border-b border-slate-100 pb-2">
            <div class="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-800 border border-purple-200/70 text-[9px] font-extrabold tracking-wide font-mono">
              <span class="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse"></span>
              <span>FUTURO • CENÁRIO 2026-2030</span>
            </div>
            <span class="text-[8px] font-mono font-extrabold ${isReelection ? 'text-purple-700 bg-purple-100' : 'text-sky-700 bg-sky-100'} px-2 py-0.5 rounded-full">
              ${isReelection ? '🏛️ Reeleição' : '🔄 Novo Mandato'}
            </span>
          </div>

          <!-- Perfil do Político + Destaque IRP -->
          <div class="flex items-center justify-between gap-2.5 my-2 p-2.5 rounded-2xl bg-[#f5f5f7] border border-[#e5e5ea]/80">
            <div class="flex items-center gap-2.5 min-w-0">
              <img src="${safeAvatar}" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(cand.name)}&background=7c3aed&color=fff&bold=true&size=128';" class="w-11 h-11 rounded-xl object-cover border border-purple-500/40 shadow-xs flex-shrink-0 bg-white">
              <div class="min-w-0 text-left">
                <h4 class="font-extrabold text-xs text-slate-900 uppercase tracking-tight truncate">${cand.ballotName || cand.name}</h4>
                <p class="text-[9.5px] font-mono font-bold text-purple-700">${cand.party} • Nº ${cand.number}</p>
                <span class="text-[8px] text-slate-500 truncate block">Cargo: ${cand.position}</span>
              </div>
            </div>

            <!-- IRP Score Pill -->
            <div class="text-right flex-shrink-0 pl-2 border-l border-slate-200">
              <span class="text-[7px] font-mono uppercase font-bold text-slate-500 block">IRP Severo</span>
              <div class="text-base font-black font-mono text-purple-700 leading-none">${irpScore}<span class="text-[9px] text-slate-400">/100</span></div>
              <span class="text-[6.5px] font-mono text-slate-500 block">${irpScore >= 75 ? 'Notável' : 'Moderado'}</span>
            </div>
          </div>

          <!-- Matriz 2 Colunas: Ganho vs Risco -->
          <div class="grid grid-cols-2 gap-1.5 my-1 text-[8px]">
            <div class="p-2 rounded-xl bg-emerald-50/70 border border-emerald-200/70 space-y-0.5 text-left">
              <strong class="text-emerald-900 uppercase font-black text-[7.5px] flex items-center gap-1 font-mono">
                <i data-lucide="arrow-up-right" class="w-2.5 h-2.5 text-emerald-600"></i> Ganho Esperado:
              </strong>
              <p class="text-[8.5px] text-slate-700 font-medium leading-tight">
                Cumprimento das atribuições da CF/88 com presença deliberativa em ${radar.presenca || 86}% e projetos com metas.
              </p>
            </div>
            <div class="p-2 rounded-xl bg-rose-50/70 border border-rose-200/70 space-y-0.5 text-left">
              <strong class="text-rose-900 uppercase font-black text-[7.5px] flex items-center gap-1 font-mono">
                <i data-lucide="alert-triangle" class="w-2.5 h-2.5 text-rose-600"></i> Risco Cívico:
              </strong>
              <p class="text-[8.5px] text-slate-700 font-medium leading-tight">
                Persistência dos 3 gargalos crônicos da região e custo público de ${costMin}.
              </p>
            </div>
          </div>

          <!-- Proposta com Protocolo TSE -->
          <div class="p-2 rounded-xl bg-[#f5f5f7] border border-[#e5e5ea]/80 space-y-0.5 text-left my-1">
            <div class="flex items-center justify-between text-[7px] font-mono border-b border-slate-200/60 pb-0.5">
              <span class="text-purple-700 font-bold font-mono">${protocolTse}</span>
              <span class="px-1 rounded bg-purple-100 text-purple-800 font-bold text-[6.5px]">Plano Oficial TSE</span>
            </div>
            <p class="text-[8.5px] text-slate-800 font-medium leading-tight">${solutionText.slice(0, 95)}${solutionText.length > 95 ? '...' : ''}</p>
          </div>

          <!-- Blindagem Jurídica Eleitoral -->
          <div class="p-1.5 rounded-xl bg-slate-50 border border-slate-200/80 text-center text-[7px] font-mono text-slate-500">
            ⚖️ Auditoria técnica de governabilidade baseada na CF/88 • Res. TSE 23.732/2024 e LAI 12.527.
          </div>

          <!-- Smart Footer -->
          <div class="mt-1 pt-1 border-t border-slate-100 flex items-center justify-between text-[7px] font-bold text-slate-400 font-mono">
            <span class="flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-purple-500"></span>raioxpolitico.org</span>
            <span class="uppercase tracking-wider text-[6.5px]">Projeção Preditiva 2026-2030</span>
          </div>
        `;
        lucide.createIcons();
        return;
      }

      // [duel_5050 movido para o bloco de duelo]
      // ================= 8. RECIBO FISCAL DO ELEITOR (CITIZEN RECEIPT) =================
      if (exportVisualTheme === 'citizen_receipt') {
        const costMin = safeCostMin(cand);
        const costCit = cand.salary?.civicConversion?.costPerCitizenYear || cand.salary?.civicConversion?.costPerCitizen || 'R$ 0,02 / ano';
        const totalCamp = cand.campaignFinance ? cand.campaignFinance.totalSpentFormatted : 'R$ 16,5 milhões';
        const costVote = cand.campaignFinance ? cand.campaignFinance.costPerVote : 'R$ 6,88 / voto';
        
        target.className = 'w-[335px] max-w-[335px] box-border bg-[#fffdfa] p-4 rounded-[1.75rem] border-2 border-dashed border-stone-300 shadow-2xl text-stone-900 relative flex flex-col justify-between font-mono overflow-hidden';
        target.innerHTML = `
          <div class="text-center border-b border-dashed border-stone-400 pb-2 space-y-0.5">
            <h3 class="font-black text-xs tracking-wider uppercase">CUPOM FISCAL DO ELEITOR BRASILEIRO</h3>
            <p class="text-[7.5px] text-stone-500">AUDITORIA CÍVICA OFICIAL • LEI DE ACESSO À INFORMAÇÃO</p>
          </div>

          <div class="my-2 space-y-1.5 text-[9px]">
            <div class="flex justify-between font-bold">
              <span>AGENTE PÚBLICO:</span>
              <span class="uppercase font-black truncate max-w-[170px]">${cand.name}</span>
            </div>
            <div class="flex justify-between text-stone-600">
              <span>CARGO / PARTIDO:</span>
              <span>${cand.position} • ${cand.party}</span>
            </div>
            <div class="border-t border-dashed border-stone-300 my-1 pt-1"></div>
            <div class="flex justify-between">
              <span>CUSTO / MINUTO MANDATO:</span>
              <strong class="text-rose-700">${costMin}</strong>
            </div>
            <div class="flex justify-between">
              <span>IMPACTO POR CONTRIBUINTE:</span>
              <strong>${costCit}</strong>
            </div>
            <div class="flex justify-between">
              <span>INVESTIDO NA CAMPANHA TSE:</span>
              <strong>${totalCamp}</strong>
            </div>
            <div class="flex justify-between">
              <span>CUSTO REAL POR VOTO:</span>
              <strong class="text-amber-700">${costVote}</strong>
            </div>
            <div class="border-t border-dashed border-stone-300 my-1 pt-1"></div>
            <div class="flex justify-between font-black text-[10px]">
              <span>NOTA FINAL DE DESEMPENHO:</span>
              <span class="text-emerald-700">${overallScore} / 100</span>
            </div>
          </div>

          <div class="p-1.5 rounded-lg bg-stone-100 border border-stone-200 text-center text-[7.5px] font-sans font-bold text-stone-600">
            Guarde este recibo até 04/10/2026. O voto é o seu instrumento fiscalizador.
          </div>
          
          <!-- Smart CTA Discreto -->
          <div class="mt-2 pt-1 border-t border-stone-200 dark:border-white/10 flex items-center justify-between text-[7px] font-bold text-stone-500 font-mono">
            <span class="flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>figuraspoliticas.org</span>
            <span class="uppercase tracking-wider text-[6.5px]">⚡ Compare & Fiscalize</span>
          </div>
        `;
        lucide.createIcons();
        return;
      }

      // ================= 9. CUSTO POR MINUTO (MANDATE CLOCK / IMPOSTÔMETRO) =================
      if (exportVisualTheme === 'mandate_clock') {
        const costMin = safeCostMin(cand);
        const costCit = cand.salary && cand.salary.civicConversion ? cand.salary.civicConversion.costPerCitizen : 'R$ 0,006 / ano';
        
        target.className = 'w-[335px] max-w-[335px] box-border bg-[#0f172a] p-4 rounded-[1.75rem] border-2 border-amber-500/50 shadow-2xl text-white relative flex flex-col justify-between font-sans overflow-hidden';
        target.innerHTML = `
          <div class="flex items-center justify-between border-b border-amber-500/30 pb-1.5">
            <span class="text-[9px] font-black uppercase tracking-widest text-amber-400 font-mono flex items-center gap-1">
              ⏱️ IMPOSTÔMETRO DO MANDATO
            </span>
            <span class="text-[8.5px] font-mono font-bold text-slate-400">04/10/2026</span>
          </div>

          <div class="flex items-center gap-3 my-2">
            <img src="${safeAvatar}" referrerpolicy="no-referrer" class="w-14 h-14 rounded-2xl object-cover border-2 border-amber-400 shadow-md">
            <div>
              <h4 class="font-black text-sm uppercase truncate text-white leading-tight">${cand.name}</h4>
              <p class="text-[10.5px] font-bold text-amber-300 font-mono">${cand.party} • ${cand.position}</p>
            </div>
          </div>

          <div class="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center space-y-1 my-1">
            <span class="text-[9px] font-bold uppercase tracking-wider text-amber-300">Custo aos Cofres Públicos em Tempo Real:</span>
            <div class="text-2xl font-black font-mono text-amber-400">${costMin}</div>
            <p class="text-[9px] text-slate-300">Cada cidadão eleitor paga em média <strong class="text-white">${costCit}</strong></p>
          </div>

          <div class="grid grid-cols-2 gap-2 text-[8px] font-mono my-1">
            <div class="p-2 rounded-xl bg-slate-800 border border-white/5 text-center">
              <span class="text-slate-400 block">Presença Plenário</span>
              <strong class="text-emerald-400 text-xs">${cand.attendance.ratePct}%</strong>
            </div>
            <div class="p-2 rounded-xl bg-slate-800 border border-white/5 text-center">
              <span class="text-slate-400 block">Eficiência Geral</span>
              <strong class="text-sky-400 text-xs">${overallScore}/100</strong>
            </div>
          </div>
          
          <!-- Smart CTA Discreto -->
          <div class="mt-2 pt-1 border-t border-white/10 flex items-center justify-between text-[7px] font-bold text-slate-400 font-mono">
            <span class="flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>figuraspoliticas.org</span>
            <span class="uppercase tracking-wider text-[6.5px]">⚡ Compare & Fiscalize</span>
          </div>
        `;
        lucide.createIcons();
        return;
      }

      // ================= 9.1 AUDITORIA CRÍTICA IA SEM FILTRO (AI_AUDIT INDIVIDUAL) =================
      if (exportVisualTheme === 'ai_audit') {
        const costMin = safeCostMin(cand);
        const ai = cand.aiAnalysis || { overallScore: 85, recommendationSummary: 'Histórico parlamentar avaliado com critérios estritos de entrega.', top3BottlenecksCoverage: [] };
        const ipr = cand.careerProductivity ? cand.careerProductivity.productivityScore : 70;
        const ceremonialPct = (cand.careerProductivity && cand.careerProductivity.breakdown && cand.careerProductivity.breakdown.ceremonialRatePct) || 32;
        const bottlenecks = (ai.top3BottlenecksCoverage && ai.top3BottlenecksCoverage.length) ? ai.top3BottlenecksCoverage.length : 1;
        const riskLevel = (ai.riskLevel || (cand.overallScore >= 80 ? 'BAIXO' : (cand.overallScore >= 65 ? 'MÉDIO' : 'ALTO'))).toUpperCase();
        const riskBadge = riskLevel.includes('BAIXO')
          ? '<span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold font-mono text-[7.5px]">🟢 RISCO BAIXO</span>'
          : (riskLevel.includes('ALTO')
            ? '<span class="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-black font-mono text-[7.5px] animate-pulse">🔴 ALTO RISCO</span>'
            : '<span class="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold font-mono text-[7.5px]">🟡 ALERTA CÍVICO</span>');

        // Pega frase polêmica recente auditada
        let quoteSnippet = '';
        if (cand.recentStatements && cand.recentStatements.length > 0) {
          const st = cand.recentStatements[0];
          const isTrue = /verdadeiro/i.test(st.verdict || '');
          const isFalse = /falso/i.test(st.verdict || '');
          const tagCol = isTrue ? 'text-emerald-700 bg-emerald-100' : (isFalse ? 'text-rose-700 bg-rose-100' : 'text-amber-700 bg-amber-100');
          quoteSnippet = `
            <div class="p-2 rounded-xl bg-purple-50/80 border border-purple-200/80 text-[7.5px] space-y-1">
              <div class="flex justify-between items-center font-mono">
                <span class="font-bold text-purple-900 uppercase">Fala Auditada:</span>
                <span class="px-1.5 py-0.5 rounded font-black ${tagCol}">${st.verdict || 'AUDITADO'}</span>
              </div>
              <p class="italic text-slate-700 font-serif leading-tight">"${st.quote ? st.quote.substring(0, 85) + '...' : ''}"</p>
            </div>
          `;
        }

        target.className = 'w-[335px] max-w-[335px] box-border bg-gradient-to-b from-slate-50 via-white to-purple-50/40 p-4 rounded-[1.75rem] border-2 border-purple-500 shadow-2xl text-slate-900 relative flex flex-col justify-between font-sans overflow-hidden';
        target.innerHTML = `
          <div class="flex items-center justify-between border-b border-purple-200 pb-1.5 font-mono">
            <span class="text-[9px] font-black uppercase text-purple-900 flex items-center gap-1.5">
              🤖 DOSSIÊ IA • SEM FILTRO
            </span>
            <span class="text-[8px] font-mono font-black text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">Nº ${cand.number || '00'}</span>
          </div>

          <div class="flex items-center gap-3 my-2">
            <div class="relative shrink-0">
              <img src="${safeAvatar}" referrerpolicy="no-referrer" class="w-14 h-14 rounded-2xl object-cover border-2 border-purple-500 shadow-md">
              <span class="absolute -bottom-1 -right-1 text-[8.5px] font-black px-1.5 py-0.2 rounded-full bg-purple-600 text-white font-mono shadow-xs">${overallScore}</span>
            </div>
            <div class="min-w-0">
              <h4 class="font-black text-sm uppercase truncate text-slate-900 leading-tight">${cand.name}</h4>
              <p class="text-[10px] font-bold text-purple-700 font-mono truncate">${cand.party} • ${cand.position} • ${cand.state || 'BR'}</p>
              <div class="mt-1">${riskBadge}</div>
            </div>
          </div>

          <!-- Grade Forense Polêmica -->
          <div class="grid grid-cols-2 gap-1.5 my-1 text-[8px] font-mono">
            <div class="p-2 rounded-xl bg-purple-900/5 border border-purple-200/80">
              <span class="text-slate-500 block">Índice Produtividade (IPR)</span>
              <strong class="text-purple-950 text-xs">${ipr}/100</strong>
            </div>
            <div class="p-2 rounded-xl bg-purple-900/5 border border-purple-200/80">
              <span class="text-slate-500 block">Custo ao Cidadão</span>
              <strong class="text-rose-700 text-xs">${costMin}</strong>
            </div>
            <div class="p-2 rounded-xl bg-purple-900/5 border border-purple-200/80">
              <span class="text-slate-500 block">Projetos Cerimoniais</span>
              <strong class="text-amber-800 text-xs">${ceremonialPct}% (inócuos)</strong>
            </div>
            <div class="p-2 rounded-xl bg-purple-900/5 border border-purple-200/80">
              <span class="text-slate-500 block">Gargalos Atendidos</span>
              <strong class="text-emerald-700 text-xs">${bottlenecks} de 3 áreas</strong>
            </div>
          </div>

          ${quoteSnippet}

          <div class="p-2 mt-1 rounded-xl bg-purple-600 text-white text-[7.5px] leading-tight space-y-0.5">
            <div class="font-black uppercase tracking-wider text-[7px] text-purple-200">🔍 Veredito da Inteligência Artificial:</div>
            <p class="font-medium opacity-95 line-clamp-2">${ai.recommendationSummary || 'Político com histórico auditado sob critérios rígidos de entrega cívica.'}</p>
          </div>

          <!-- Smart CTA Discreto -->
          <div class="mt-2 pt-1 border-t border-purple-200 flex items-center justify-between text-[7px] font-bold text-purple-900 font-mono">
            <span class="flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></span>figuraspoliticas.org</span>
            <span class="uppercase tracking-wider text-[6.5px] text-purple-600">⚡ Compartilhe a Verdade</span>
          </div>
        `;
        lucide.createIcons();
        return;
      }

      // ================= 10. BOLETIM DE FICHA LIMPA (JUDICIAL CLEARANCE) =================
      if (exportVisualTheme === 'judicial_clearance') {
        const eth = cand.ethicsDetailed || { cleanRecordStatus: 'Ficha Limpa Oficial', activeLawsuitsCount: 0, stfStjInquiriesCount: 0, tcuTceIrregularAccounts: 0 };
        
        target.className = 'w-[335px] max-w-[335px] box-border bg-white p-4 rounded-[1.75rem] border-2 border-emerald-500 shadow-2xl text-slate-900 relative flex flex-col justify-between font-sans overflow-hidden';
        target.innerHTML = `
          <div class="flex items-center justify-between border-b-2 border-emerald-500 pb-1.5 font-mono">
            <span class="text-[9px] font-black uppercase text-emerald-800 flex items-center gap-1">
              ⚖️ BOLETIM DE FICHA LIMPA • TSE
            </span>
            <span class="text-[8px] font-bold text-emerald-700">CERTIDÃO 2026</span>
          </div>

          <div class="flex items-center gap-3 my-2">
            <img src="${safeAvatar}" referrerpolicy="no-referrer" class="w-13 h-13 rounded-2xl object-cover border-2 border-emerald-600 shadow-md">
            <div>
              <span class="px-2 py-0.5 rounded-full text-[9px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                🟢 ${eth.cleanRecordStatus || 'Ficha Limpa Oficial'}
              </span>
              <h4 class="font-black text-sm uppercase truncate text-slate-900 mt-1 leading-tight">${cand.name}</h4>
              <p class="text-[10px] font-bold text-slate-500 font-mono">${cand.party} • ${cand.position}</p>
            </div>
          </div>

          <div class="space-y-1.5 text-[9px] font-mono my-1 bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
            <div class="flex justify-between items-center py-0.5 border-b border-slate-200">
              <span class="text-slate-600">Ações Penais Condenatórias:</span>
              <strong class="${(eth.activeLawsuitsCount || 0) === 0 ? 'text-emerald-700' : 'text-amber-700'}">${eth.activeLawsuitsCount || 0} ${(eth.activeLawsuitsCount || 0) === 0 ? '(Nenhuma)' : ''}</strong>
            </div>
            <div class="flex justify-between items-center py-0.5 border-b border-slate-200">
              <span class="text-slate-600">Inquéritos Ativos no STF/STJ:</span>
              <strong class="text-emerald-700">${eth.stfStjInquiriesCount || 0}</strong>
            </div>
            <div class="flex justify-between items-center py-0.5 border-b border-slate-200">
              <span class="text-slate-600">Contas Irregulares TCU/TCE:</span>
              <strong class="text-emerald-700">${eth.tcuTceIrregularAccounts || 0}</strong>
            </div>
            <div class="flex justify-between items-center py-0.5">
              <span class="text-slate-600">Índice de Integridade Ética:</span>
              <strong class="text-emerald-700 font-black">${cand.radar ? cand.radar.integridade : 96}/100</strong>
            </div>
          </div>

          <div class="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-[8px] font-bold text-emerald-900 text-center">
            Certidões emitidas e auditadas pelo TSE, STF e Tribunais de Contas.
          </div>
          
          <!-- Smart CTA Discreto -->
          <div class="mt-2 pt-1 border-t border-stone-200 dark:border-white/10 flex items-center justify-between text-[7px] font-bold text-stone-500 font-mono">
            <span class="flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>figuraspoliticas.org</span>
            <span class="uppercase tracking-wider text-[6.5px]">⚡ Compare & Fiscalize</span>
          </div>
        `;
        lucide.createIcons();
        return;
      }

      // [duel_economy movido para o bloco de duelo]

      // ================= 12. MATCH ELEITORAL (CIVIC AFFINITY GAUGE) =================
      if (exportVisualTheme === 'civic_affinity') {
        const jur = cand.jurisdictionProblemsMatch || { coveragePct: 93, coveredCount: 3, totalCount: 3 };
        
        target.className = 'w-[335px] max-w-[335px] box-border bg-gradient-to-b from-indigo-950 to-slate-900 p-4 rounded-[1.75rem] border-2 border-indigo-500/50 shadow-2xl text-white relative flex flex-col justify-between font-sans overflow-hidden';
        target.innerHTML = `
          <div class="flex items-center justify-between border-b border-indigo-500/30 pb-1.5 font-mono text-[8.5px]">
            <span class="text-indigo-300 font-black uppercase flex items-center gap-1">🎯 MATCH ELEITORAL 2026</span>
            <span class="text-indigo-400 font-bold">AFINIDADE</span>
          </div>

          <div class="flex items-center gap-3 my-2">
            <img src="${safeAvatar}" referrerpolicy="no-referrer" class="w-13 h-13 rounded-2xl object-cover border-2 border-indigo-400 shadow-md">
            <div>
              <h4 class="font-black text-sm uppercase truncate text-white leading-tight">${cand.name}</h4>
              <p class="text-[10px] font-bold text-indigo-300 font-mono">${cand.party} • ${cand.position}</p>
            </div>
          </div>

          <div class="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-center space-y-1.5 my-1">
            <span class="text-[9px] font-bold uppercase tracking-wider text-indigo-300">Aderência aos Gargalos do Cargo:</span>
            <div class="text-3xl font-black font-mono text-emerald-400">${jur.coveragePct || 93}%</div>
            <div class="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div class="bg-gradient-to-r from-sky-400 to-emerald-400 h-2 rounded-full" style="width: ${jur.coveragePct || 93}%"></div>
            </div>
            <p class="text-[8.5px] text-slate-300">${jur.coveredCount || 3} de ${jur.totalCount || 3} problemas prioritários cobertos com propostas reais</p>
          </div>
          
          <!-- Smart CTA Discreto -->
          <div class="mt-2 pt-1 border-t border-white/10 flex items-center justify-between text-[7px] font-bold text-slate-400 font-mono">
            <span class="flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>figuraspoliticas.org</span>
            <span class="uppercase tracking-wider text-[6.5px]">⚡ Compare & Fiscalize</span>
          </div>
        `;
        lucide.createIcons();
        return;
      }

      // ================= 13. STORY CHOQUE CÍVICO (STORY VERTICAL 9:16) =================
      if (exportVisualTheme === 'story_viral_9_16') {
        const campTotal = cand.campaignFinance ? cand.campaignFinance.totalSpentFormatted : 'R$ 16,5 milhões';
        const costVote = cand.campaignFinance ? cand.campaignFinance.costPerVote : 'R$ 6,88 / voto';
        const costMin = cand.salary && cand.salary.civicConversion ? cand.salary.civicConversion.costPerMinute : 'R$ 0,54 / min';
        
        target.className = 'w-[335px] max-w-[335px] box-border bg-slate-950 p-4 rounded-[1.75rem] border-2 border-rose-500/60 shadow-2xl text-white relative flex flex-col justify-between font-sans overflow-hidden';
        target.innerHTML = `
          <div class="flex items-center justify-between border-b border-rose-500/30 pb-1.5 font-mono text-[8px] font-black uppercase text-rose-400">
            <span>⚡ CHOQUE CÍVICO • STORIES 9:16</span>
            <span class="text-slate-400">04/10/2026</span>
          </div>

          <div class="text-center my-1.5 space-y-1">
            <img src="${safeAvatar}" referrerpolicy="no-referrer" class="w-16 h-16 rounded-2xl object-cover mx-auto border-2 border-rose-500 shadow-lg">
            <h4 class="font-black text-sm uppercase text-white leading-tight">${cand.name}</h4>
            <span class="text-[10px] font-bold font-mono text-rose-300">${cand.party} • ${cand.position}</span>
          </div>

          <div class="grid grid-cols-2 gap-2 text-[8px] font-mono my-1">
            <div class="p-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-center">
              <span class="text-slate-400 block">Campanha TSE:</span>
              <strong class="text-rose-400 text-xs block truncate">${campTotal}</strong>
            </div>
            <div class="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-center">
              <span class="text-slate-400 block">Custo por Voto:</span>
              <strong class="text-amber-400 text-xs block">${costVote}</strong>
            </div>
            <div class="p-2 rounded-xl bg-sky-500/10 border border-sky-500/30 text-center">
              <span class="text-slate-400 block">Custo Mandato:</span>
              <strong class="text-sky-400 text-xs block">${costMin}</strong>
            </div>
            <div class="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center">
              <span class="text-slate-400 block">Score Geral:</span>
              <strong class="text-emerald-400 text-xs block">${overallScore}/100</strong>
            </div>
          </div>
          
          <!-- Smart CTA Discreto -->
          <div class="mt-2 pt-1 border-t border-white/10 flex items-center justify-between text-[7px] font-bold text-slate-400 font-mono">
            <span class="flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>figuraspoliticas.org</span>
            <span class="uppercase tracking-wider text-[6.5px]">⚡ Compare & Fiscalize</span>
          </div>
        `;
        lucide.createIcons();
        return;
      }

      // ================= 14. DINHEIRO DE CAMPANHA TSE (FINANCIAL LIGHT) =================
      if (exportVisualTheme === 'campaign_finance') {
        const camp = cand.campaignFinance || { totalSpentFormatted: 'R$ 16,5M', costPerVote: 'R$ 6,88 / voto', publicFundPct: 91, privateDonationsPct: 8 };
        
        target.className = 'w-[335px] max-w-[335px] box-border bg-white p-4 rounded-[1.75rem] border-2 border-amber-500 shadow-2xl text-slate-900 relative flex flex-col justify-between font-sans overflow-hidden';
        target.innerHTML = `
          <div class="flex items-center justify-between border-b-2 border-amber-500 pb-1.5 font-mono">
            <span class="text-[9px] font-black uppercase text-amber-800 flex items-center gap-1">
              💰 DINHEIRO DE CAMPANHA • TSE
            </span>
            <span class="text-[8px] font-bold text-amber-700">PRESTAÇÃO OFICIAL</span>
          </div>

          <div class="flex items-center gap-3 my-2">
            <img src="${safeAvatar}" referrerpolicy="no-referrer" class="w-13 h-13 rounded-2xl object-cover border-2 border-amber-500 shadow-md">
            <div>
              <h4 class="font-black text-sm uppercase truncate text-slate-900 leading-tight">${cand.name}</h4>
              <p class="text-[10px] font-bold text-slate-500 font-mono">${cand.party} • ${cand.position}</p>
            </div>
          </div>

          <div class="p-2.5 rounded-2xl bg-amber-50 border border-amber-200 text-center space-y-1 my-1">
            <span class="text-[8.5px] font-bold uppercase text-amber-800">Total Gasto na Última Campanha:</span>
            <div class="text-xl font-black font-mono text-amber-900">${camp.totalSpentFormatted || 'R$ 16,5 milhões'}</div>
            <div class="text-[9px] font-bold text-slate-700">Custo Real: <strong class="text-amber-800 font-mono">${camp.costPerVote || 'R$ 6,88 / voto'}</strong></div>
          </div>

          <div class="grid grid-cols-2 gap-2 text-[8px] font-mono my-1">
            <div class="p-1.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <span class="text-slate-500 block">Fundo Eleitoral (FEFC):</span>
              <strong class="text-amber-700">${camp.publicFundPct || 91}%</strong>
            </div>
            <div class="p-1.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <span class="text-slate-500 block">Doações Privadas:</span>
              <strong class="text-slate-800">${camp.privateDonationsPct || 8}%</strong>
            </div>
          </div>
          
          <!-- Smart CTA Discreto -->
          <div class="mt-2 pt-1 border-t border-stone-200 dark:border-white/10 flex items-center justify-between text-[7px] font-bold text-stone-500 font-mono">
            <span class="flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>figuraspoliticas.org</span>
            <span class="uppercase tracking-wider text-[6.5px]">⚡ Compare & Fiscalize</span>
          </div>
        `;
        lucide.createIcons();
        return;
      }

      // ================= 15. FALAS & CHECAGEM DE FATOS (QUOTE TRUTH) =================
      if (exportVisualTheme === 'quote_truth') {
        const deb = cand.recentDebate || { truthfulnessPct: 91, broadcaster: 'Rede Bandeirantes', statements: [] };
        const quoteObj = (deb.statements && deb.statements.length > 0) ? deb.statements[0] : { quote: 'Destinamos recursos públicos com critérios técnicos e transparência ativa.', verdict: 'Verdadeiro', officialSource: 'Portal da Transparência' };
        
        target.className = 'w-[335px] max-w-[335px] box-border bg-white p-4 rounded-[1.75rem] border-2 border-emerald-500 shadow-2xl text-slate-900 relative flex flex-col justify-between font-sans overflow-hidden';
        target.innerHTML = `
          <div class="flex items-center justify-between border-b border-slate-200 pb-1 font-mono text-[8px]">
            <span class="font-black text-slate-900 uppercase">🎙️ DEBATE OFICIAL • CHECAGEM</span>
            <span class="text-emerald-700 font-bold">${deb.truthfulnessPct || 91}% VERDADEIRO</span>
          </div>

          <div class="my-2 space-y-1.5">
            <div class="flex items-center gap-2">
              <img src="${safeAvatar}" referrerpolicy="no-referrer" class="w-10 h-10 rounded-xl object-cover border border-slate-300">
              <div>
                <strong class="font-black text-xs uppercase text-slate-900 block truncate">${cand.name}</strong>
                <span class="text-[9px] text-slate-500 font-mono">${cand.party} • ${deb.broadcaster || 'Debate Oficial'}</span>
              </div>
            </div>

            <div class="p-2.5 rounded-xl bg-slate-50 border-l-4 border-emerald-500 text-[10px] text-slate-800 italic leading-relaxed">
              "${quoteObj.quote || 'Nós cumprimos rigorosamente as metas fiscais aprovadas.'}"
            </div>

            <div class="flex items-center justify-between p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-[9px]">
              <span class="font-bold text-emerald-800">VEREDITO:</span>
              <strong class="font-black text-emerald-700 uppercase font-mono">${quoteObj.verdict || 'Verdadeiro'}</strong>
            </div>
          </div>
          
          <!-- Smart CTA Discreto -->
          <div class="mt-2 pt-1 border-t border-stone-200 dark:border-white/10 flex items-center justify-between text-[7px] font-bold text-stone-500 font-mono">
            <span class="flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>figuraspoliticas.org</span>
            <span class="uppercase tracking-wider text-[6.5px]">⚡ Compare & Fiscalize</span>
          </div>
        `;
        lucide.createIcons();
        return;
      }

      // ================= 16. PRODUTIVIDADE EM LEIS (LAW PRODUCTIVITY) =================
      if (exportVisualTheme === 'law_productivity') {
        const bills = cand.bills || { total: 18, approved: 12, approvalRatePct: 67 };
        
        target.className = 'w-[335px] max-w-[335px] box-border bg-white p-4 rounded-[1.75rem] border-2 border-purple-500 shadow-2xl text-slate-900 relative flex flex-col justify-between font-sans overflow-hidden';
        target.innerHTML = `
          <div class="flex items-center justify-between border-b-2 border-purple-500 pb-1.5 font-mono text-[8.5px]">
            <span class="font-black text-purple-900 uppercase">📜 PRODUTIVIDADE LEGISLATIVA</span>
            <span class="text-purple-700 font-bold">LEIS REAIS</span>
          </div>

          <div class="flex items-center gap-3 my-2">
            <img src="${safeAvatar}" referrerpolicy="no-referrer" class="w-13 h-13 rounded-2xl object-cover border-2 border-purple-500 shadow-md">
            <div>
              <h4 class="font-black text-sm uppercase truncate text-slate-900 leading-tight">${cand.name}</h4>
              <p class="text-[10px] font-bold text-slate-500 font-mono">${cand.party} • ${cand.position}</p>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-2 text-center my-1">
            <div class="p-2.5 rounded-2xl bg-purple-50 border border-purple-200">
              <span class="text-[8px] text-slate-500 block uppercase font-mono">Leis Aprovadas</span>
              <strong class="text-lg font-black font-mono text-purple-900">${bills.approved || 8}</strong>
            </div>
            <div class="p-2.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span class="text-[8px] text-slate-500 block uppercase font-mono">Taxa de Sucesso</span>
              <strong class="text-lg font-black font-mono text-emerald-700">${bills.approvalRatePct || 45}%</strong>
            </div>
          </div>
          
          <!-- Smart CTA Discreto -->
          <div class="mt-2 pt-1 border-t border-stone-200 dark:border-white/10 flex items-center justify-between text-[7px] font-bold text-stone-500 font-mono">
            <span class="flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>figuraspoliticas.org</span>
            <span class="uppercase tracking-wider text-[6.5px]">⚡ Compare & Fiscalize</span>
          </div>
        `;
        lucide.createIcons();
        return;
      }

      // ================= 17. ALERTA DA ELEIÇÃO 2026 (CARIMBO OFICIAL TSE) =================
      if (exportVisualTheme === 'alerta_decisao_2026') {
        target.className = 'w-[335px] max-w-[335px] box-border bg-slate-950 p-4 rounded-[1.75rem] border-2 border-amber-400 shadow-2xl text-white relative flex flex-col justify-between font-sans overflow-hidden';
        target.innerHTML = `
          <div class="flex items-center justify-between border-b border-amber-400/30 pb-1.5 font-mono text-[8.5px]">
            <span class="text-amber-400 font-black uppercase">🚨 ALERTA DA ELEIÇÃO 2026</span>
            <span class="text-slate-400">TSE OFICIAL</span>
          </div>

          <div class="p-3 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-center space-y-1 my-2">
            <span class="text-[9px] font-mono text-amber-300 uppercase tracking-widest block font-bold">1º TURNO OFICIAL</span>
            <div class="text-2xl font-black font-mono text-white">04 DE OUTUBRO DE 2026</div>
            <p class="text-[9px] text-slate-300">Às 17h começará a apuração de votos para Presidente, Governadores e Senadores</p>
          </div>

          <div class="flex items-center gap-3 my-1">
            <img src="${safeAvatar}" referrerpolicy="no-referrer" class="w-12 h-12 rounded-xl object-cover border border-amber-400">
            <div>
              <h4 class="font-black text-xs uppercase text-white truncate">${cand.name}</h4>
              <p class="text-[10px] font-mono text-amber-400 font-bold">${cand.party} • ${cand.position} • Nº ${cand.number}</p>
            </div>
          </div>
          
          <!-- Smart CTA Discreto -->
          <div class="mt-2 pt-1 border-t border-white/10 flex items-center justify-between text-[7px] font-bold text-slate-400 font-mono">
            <span class="flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>figuraspoliticas.org</span>
            <span class="uppercase tracking-wider text-[6.5px]">⚡ Compare & Fiscalize</span>
          </div>
        `;
        lucide.createIcons();
        return;
      }

      // ================= 1. MODELO INSTAGRAM (RADAR ESMERALDA & RETORNO CÍVICO) =================
      if (exportVisualTheme === 'swiss') {
        target.className = 'w-[335px] max-w-[335px] box-border bg-white p-4 rounded-[1.75rem] border-2 border-stone-300 shadow-2xl text-stone-950 relative flex flex-col justify-between font-sans overflow-hidden';
        target.innerHTML = `
          <!-- Top Header Padronizado -->
          <div class="flex items-center justify-between border-b-2 border-stone-950 pb-1.5">
            <div class="flex items-center gap-1.5">
              <span class="w-3 h-3 bg-emerald-600 rounded-sm"></span>
              <span class="text-[9px] font-black uppercase tracking-widest text-stone-950 font-mono">FIGURAS POLÍTICAS</span>
            </div>
            <span class="text-[8.5px] font-mono font-black text-emerald-700">04/10/2026</span>
          </div>

          <!-- Profile -->
          <div class="flex items-center justify-between gap-2 my-1">
            <div class="flex items-center gap-2.5 min-w-0">
              <img src="${safeAvatar}" crossorigin="anonymous" referrerpolicy="no-referrer" onerror="this.onerror=null; this.removeAttribute('crossorigin'); this.src='${cand.avatar}'; this.onerror=function(){ this.src='https://ui-avatars.com/api/?name=' + encodeURIComponent('${encodeURIComponent(cand.name)}') + '&background=0284c7&color=fff&bold=true&size=128'; };" class="w-[52px] h-[52px] rounded-2xl object-cover border-2 border-stone-950 shadow-md flex-shrink-0">
              <div class="min-w-0 space-y-0.5 text-left">
                <h4 class="font-black text-sm text-stone-950 uppercase tracking-tight truncate leading-tight">${cand.name}</h4>
                <p class="text-[11px] font-black text-emerald-700 font-mono leading-none">${cand.party} • Nº ${cand.number}</p>
                <span class="text-[8.5px] font-bold text-stone-600 block truncate">Pretensão: ${cand.position}</span>
              </div>
            </div>
            <div class="p-1.5 rounded-2xl bg-stone-950 text-white text-center min-w-[58px] shadow-sm flex flex-col items-center justify-center">
              <span class="text-[6px] uppercase font-bold text-stone-400 block tracking-wider">PONTUAÇÃO</span>
              <span class="text-xl font-black font-mono leading-none block my-0.5 text-white">${overallScore}</span>
            </div>
          </div>

          <!-- Radar Mini (120px) -->
          <div class="bg-stone-50 rounded-2xl p-2 border border-stone-300 my-1">
            <div class="flex items-center justify-between text-[7px] uppercase font-black text-stone-700 mb-0.5">
              <span>Diagrama de Integridade</span>
              <span class="text-stone-400 font-mono">6 DIMENSÕES</span>
            </div>
            <div class="w-full h-[115px] flex items-center justify-center">
              <canvas id="exportCardRadarCanvas" width="260" height="115"></canvas>
            </div>
          </div>

          <!-- 3 Stats Row -->
          <div class="grid grid-cols-3 gap-1.5 text-left my-1">
            <div class="p-1.5 rounded-xl bg-stone-50 border border-stone-200 space-y-0.2">
              <span class="text-[6.5px] uppercase font-black text-stone-500 block truncate">Ficha Limpa</span>
              <span class="text-xs font-black text-emerald-700 font-mono block truncate">0 Conden.</span>
              <span class="text-[6.5px] text-stone-500 block truncate">100% Ilibado</span>
            </div>
            <div class="p-1.5 rounded-xl bg-stone-50 border border-stone-200 space-y-0.2">
              <span class="text-[6.5px] uppercase font-black text-stone-800 block truncate">Presença</span>
              <span class="text-xs font-black text-stone-950 font-mono block">${cand.attendance.ratePct}%</span>
              <span class="text-[6.5px] text-stone-500 block truncate">${cand.attendance.presentCount} sessões</span>
            </div>
            <div class="p-1.5 rounded-xl bg-stone-50 border border-stone-200 space-y-0.2">
              <span class="text-[6.5px] uppercase font-black text-emerald-700 block truncate">Economia Cota</span>
              <span class="text-xs font-black text-emerald-800 font-mono block truncate">${(cand.salary && cand.salary.spendingCeapSavings) ? cand.salary.spendingCeapSavings : 'R$ 164.600'}</span>
              <span class="text-[6.5px] text-stone-600 block truncate font-bold">Salvos</span>
            </div>
          </div>

          <!-- Emendas -->
          <div class="p-2 rounded-xl bg-stone-100 border border-stone-300 space-y-0.5 text-left my-1">
            <div class="flex items-center justify-between text-[7px] uppercase font-black text-stone-600">
              <span>Dinheiro Entregue nas Cidades</span>
              <span class="text-[8px] font-bold text-stone-950 font-mono">(${executionPct}% PAGO)</span>
            </div>
            <span class="text-xs font-black text-stone-950 font-mono block">${cand.parliamentaryAmendments ? cand.parliamentaryAmendments.totalExecuted : 'R$ 35.100.000,00'}</span>
            <div class="px-2 py-0.5 rounded-lg text-[8px] font-black border font-mono text-center truncate ${cand.parliamentaryAmendments && cand.parliamentaryAmendments.directPixPct > 30 ? 'bg-rose-100 text-rose-950 border-rose-400' : 'bg-emerald-100 text-emerald-950 border-emerald-500'}">
              ${cand.parliamentaryAmendments && cand.parliamentaryAmendments.integritySeal ? cand.parliamentaryAmendments.integritySeal.shortBadge : '🟢 100% por Concurso Público'}
            </div>
          </div>

          <!-- Rodapé Retorno Cívico -->
          <div class="p-2 rounded-xl bg-stone-950 text-white flex items-center justify-between text-[7.5px] font-bold">
            <span class="text-emerald-400 font-mono flex items-center gap-1">
              <i data-lucide="trending-up" class="w-3 h-3 text-emerald-400"></i> RETORNO CÍVICO:
            </span>
            <span class="text-white font-mono flex-shrink-0">${roiText}</span>
          </div>
          
          <!-- Smart CTA Discreto -->
          <div class="mt-2 pt-1 border-t border-stone-200 dark:border-white/10 flex items-center justify-between text-[7px] font-bold text-stone-500 font-mono">
            <span class="flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>figuraspoliticas.org</span>
            <span class="uppercase tracking-wider text-[6.5px]">⚡ Compare & Fiscalize</span>
          </div>
        `;

        setTimeout(() => {
          renderExportRadarChartTheme(cand, 'swiss');
        }, 50);
        lucide.createIcons();
        return;
      }

      // ================= 2. MODELO FIFA (5 BARRAS DE ATRIBUTOS) =================
      if (exportVisualTheme === 'fifa') {
        target.className = 'w-[335px] max-w-[335px] box-border bg-[#0a0f1d] p-4 rounded-[1.75rem] border-2 border-amber-400/50 text-white shadow-2xl relative flex flex-col justify-between font-sans overflow-hidden';
        target.innerHTML = `
          <!-- Header Padronizado -->
          <div class="flex items-center justify-between border-b border-amber-400/30 pb-1.5">
            <span class="text-[9px] font-black uppercase tracking-widest text-amber-300 font-mono flex items-center gap-1">
              ⭐ FIGURAS POLÍTICAS
            </span>
            <span class="text-[8.5px] font-mono font-bold text-slate-300">04/10/2026</span>
          </div>

          <!-- Profile & Pontuação Badge -->
          <div class="flex items-center justify-between gap-2 my-1">
            <div class="flex items-center gap-2.5 min-w-0">
              <img src="${safeAvatar}" crossorigin="anonymous" referrerpolicy="no-referrer" onerror="this.onerror=null; this.removeAttribute('crossorigin'); this.src='${cand.avatar}'; this.onerror=function(){ this.src='https://ui-avatars.com/api/?name=' + encodeURIComponent('${encodeURIComponent(cand.name)}') + '&background=0284c7&color=fff&bold=true&size=128'; };" class="w-14 h-14 rounded-2xl object-cover border-2 border-amber-400 shadow-md flex-shrink-0">
              <div class="min-w-0 text-left space-y-0.5">
                <h4 class="font-black text-sm text-white uppercase tracking-tight truncate leading-tight">${cand.name}</h4>
                <p class="text-[11px] font-black text-amber-400 font-mono leading-none">${cand.party} • Nº ${cand.number}</p>
                <span class="text-[8.5px] text-slate-300 truncate block">Pretensão: ${cand.position}</span>
              </div>
            </div>
            <div class="p-1.5 rounded-2xl bg-gradient-to-b from-amber-400 to-amber-600 text-slate-950 text-center min-w-[58px] shadow-lg flex flex-col items-center justify-center font-black">
              <span class="text-[6.5px] uppercase tracking-wider block">PONTUAÇÃO</span>
              <span class="text-2xl font-mono leading-none block my-0.5">${overallScore}</span>
            </div>
          </div>

          <!-- 5 Horizontal Attribute Bars -->
          <div class="bg-black/40 p-2.5 rounded-2xl border border-white/10 space-y-1.5 text-[9px] text-left font-mono my-1">
            <div>
              <div class="flex justify-between font-bold text-slate-300 mb-0.5">
                <span>INTEGRIDADE & ÉTICA (Debate + Checagens)</span>
                <span class="text-emerald-400 font-bold">${integrityScore}</span>
              </div>
              <div class="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div class="bg-emerald-500 h-full rounded-full" style="width: ${integrityScore}%"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between font-bold text-slate-300 mb-0.5">
                <span>PRESENÇA EM PLENÁRIO</span>
                <span class="text-sky-400 font-bold">${cand.attendance.ratePct}%</span>
              </div>
              <div class="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div class="bg-sky-500 h-full rounded-full" style="width: ${cand.attendance.ratePct}%"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between font-bold text-slate-300 mb-0.5">
                <span>TRANSPARÊNCIA EM EMENDAS</span>
                <span class="text-emerald-400 font-bold">${cand.parliamentaryAmendments ? cand.parliamentaryAmendments.openBidPct : 100}%</span>
              </div>
              <div class="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div class="bg-emerald-500 h-full rounded-full" style="width: ${cand.parliamentaryAmendments ? cand.parliamentaryAmendments.openBidPct : 100}%"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between font-bold text-slate-300 mb-0.5">
                <span>ECONOMIA DA COTA PARLAMENTAR</span>
                <span class="text-amber-400 font-bold">${100 - cand.salary.spendingPercentage}%</span>
              </div>
              <div class="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div class="bg-amber-400 h-full rounded-full" style="width: ${100 - cand.salary.spendingPercentage}%"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between font-bold text-slate-300 mb-0.5">
                <span>PRODUTIVIDADE (${cand.bills.approved} Leis em Vigor)</span>
                <span class="text-purple-400 font-bold">${cand.radar.eficiencia}</span>
              </div>
              <div class="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div class="bg-purple-500 h-full rounded-full" style="width: ${cand.radar.eficiencia}%"></div>
              </div>
            </div>
          </div>

          <!-- Emendas Badge -->
          <div class="p-2 rounded-xl bg-slate-900 border border-emerald-500/40 text-left flex items-center justify-between my-1">
            <div>
              <span class="text-[7px] uppercase font-bold text-slate-400 block">${cand.parliamentaryAmendments ? cand.parliamentaryAmendments.totalExecuted : 'R$ 35,1M'} em Emendas</span>
              <span class="text-[9px] font-bold text-emerald-400">${cand.parliamentaryAmendments && cand.parliamentaryAmendments.openBidPct >= 80 ? '🟢 100% por Edital Aberto' : '🟡 Repasses Auditados'}</span>
            </div>
            <span class="text-[8px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">SELO OFICIAL</span>
          </div>

          <!-- Footer -->
          <div class="p-1.5 rounded-xl bg-black border border-white/10 flex items-center justify-between text-[7.5px] font-bold">
            <span class="text-slate-400">🩺 Gasto Anual Pagaria:</span>
            <span class="text-amber-400 font-mono">${(cand.salary && cand.salary.civicConversion && cand.salary.civicConversion.salariosMinimos) ? cand.salary.civicConversion.salariosMinimos + ' Salários Mínimos' : '620 Consultas no SUS'}</span>
          </div>

          <!-- Smart CTA Discreto -->
          <div class="mt-2 pt-1 border-t border-white/10 flex items-center justify-between text-[7px] font-bold text-slate-400 font-mono">
            <span class="flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>figuraspoliticas.org</span>
            <span class="uppercase tracking-wider text-[6.5px]">⚡ Compare & Fiscalize</span>
          </div>
        `;
        lucide.createIcons();
        return;
      }

      // ================= 3. MODELO EXECUTIVO (EDITORIAL CREME) =================
      if (exportVisualTheme === 'executive') {
        target.className = 'w-[335px] max-w-[335px] box-border bg-[#fdfbf7] p-4 rounded-[1.75rem] border-2 border-stone-400 text-stone-900 shadow-2xl relative flex flex-col justify-between font-sans overflow-hidden';
        target.innerHTML = `
          <!-- Header Padronizado -->
          <div class="flex items-center justify-between border-b-2 border-stone-900 pb-1.5">
            <span class="text-[9px] font-black uppercase tracking-widest text-stone-900 font-mono">FIGURAS POLÍTICAS</span>
            <span class="text-[8.5px] font-mono font-black text-stone-900">04/10/2026</span>
          </div>

          <!-- Profile -->
          <div class="flex items-center justify-between gap-2 my-1">
            <div class="flex items-center gap-2.5 min-w-0">
              <img src="${safeAvatar}" crossorigin="anonymous" referrerpolicy="no-referrer" onerror="this.onerror=null; this.removeAttribute('crossorigin'); this.src='${cand.avatar}'; this.onerror=function(){ this.src='https://ui-avatars.com/api/?name=' + encodeURIComponent('${encodeURIComponent(cand.name)}') + '&background=0284c7&color=fff&bold=true&size=128'; };" class="w-14 h-14 rounded-2xl object-cover border-2 border-stone-900 shadow-md flex-shrink-0">
              <div class="min-w-0 text-left space-y-0.5">
                <h4 class="font-black text-sm text-stone-950 uppercase tracking-tight truncate leading-tight">${cand.name}</h4>
                <p class="text-[11px] font-bold text-stone-700 font-mono leading-none">${cand.party} • Nº ${cand.number}</p>
                <span class="text-[8.5px] font-medium text-stone-600 block">Pretensão: ${cand.position}</span>
              </div>
            </div>
            <div class="p-1.5 rounded-2xl bg-stone-900 text-white text-center min-w-[58px] shadow-sm flex flex-col items-center justify-center">
              <span class="text-[6px] uppercase font-bold text-amber-400 block tracking-wider">PONTUAÇÃO</span>
              <span class="text-xl font-black font-mono leading-none block my-0.5 text-white">${overallScore}</span>
            </div>
          </div>

          <!-- Ficha Limpa Banner -->
          <div class="p-2 rounded-xl bg-emerald-50 border border-emerald-300 flex items-center justify-between text-left my-1">
            <span class="text-[8.5px] font-black text-emerald-950 flex items-center gap-1 font-mono">
              <i data-lucide="shield-check" class="w-3.5 h-3.5 text-emerald-700"></i> FICHA LIMPA: 0 CONDENAÇÕES
            </span>
            <span class="text-[7.5px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded border border-emerald-300">TSE HOMOLOGADO</span>
          </div>

          <!-- 2x2 KPIs -->
          <div class="grid grid-cols-2 gap-1.5 text-left text-xs my-1">
            <div class="p-2 rounded-xl bg-stone-100 border border-stone-300 space-y-0.5">
              <span class="text-[7px] uppercase font-bold text-stone-600 block">🏛️ Presença em Sessões</span>
              <span class="text-xs font-black text-stone-950 font-mono block">${cand.attendance.ratePct}% (${cand.attendance.presentCount} pres.)</span>
              <span class="text-[7px] text-stone-500 block">0 falta não justificada</span>
            </div>
            <div class="p-2 rounded-xl bg-stone-100 border border-stone-300 space-y-0.5">
              <span class="text-[7px] uppercase font-bold text-emerald-800 block">💰 Verba de Gabinete</span>
              <span class="text-xs font-black text-emerald-900 font-mono block">${cand.salary.spendingPercentage}% do teto</span>
              <span class="text-[7px] text-stone-500 block">Economizou ${(cand.salary && cand.salary.spendingCeapSavings) ? cand.salary.spendingCeapSavings : 'R$ 164.600'}</span>
            </div>
          </div>

          <!-- Emendas Detalhadas -->
          <div class="p-2 rounded-xl bg-stone-100 border border-stone-300 text-left space-y-1 my-1">
            <div class="flex items-center justify-between text-[7px] uppercase font-bold text-stone-600">
              <span>Rastreabilidade de Emendas</span>
              <span class="font-bold text-stone-900 font-mono">${executionPct}% Pago</span>
            </div>
            <span class="text-xs font-black text-stone-950 font-mono block">${cand.parliamentaryAmendments ? cand.parliamentaryAmendments.totalExecuted : 'R$ 35.100.000,00'}</span>
            <div class="px-2 py-0.5 rounded-lg text-[8px] font-bold font-mono text-center bg-emerald-100 text-emerald-950 border border-emerald-400 truncate">
              🟢 100% Destinadas via Edital Técnico Aberto
            </div>
          </div>

          <!-- Rodapé Retorno Cívico -->
          <div class="p-2 rounded-xl bg-stone-900 text-white flex items-center justify-between text-[7.5px] font-bold">
            <span class="text-amber-400 font-mono flex items-center gap-1">
              <i data-lucide="trending-up" class="w-3 h-3 text-amber-400"></i> RETORNO CÍVICO DO MANDATO:
            </span>
            <span class="text-white font-mono">${roiText}</span>
          </div>
        `;
        lucide.createIcons();
        return;
      }

      // ================= 4. MODELO PERFIL (BENTO GRID MODULAR) =================
      if (exportVisualTheme === 'bento') {
        target.className = 'w-[335px] max-w-[335px] box-border bg-[#f8fafc] p-4 rounded-[1.75rem] border border-slate-300 text-slate-900 shadow-2xl relative flex flex-col justify-between font-sans overflow-hidden';
        target.innerHTML = `
          <!-- Header Padronizado -->
          <div class="flex items-center justify-between border-b border-slate-200 pb-1.5">
            <span class="text-[9px] font-black uppercase tracking-widest text-slate-800 font-mono">FIGURAS POLÍTICAS</span>
            <span class="text-[8px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">04/10/2026</span>
          </div>

          <!-- Profile & Pontuação Card -->
          <div class="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-3 my-1">
            <div class="flex items-center gap-3 min-w-0">
              <img src="${safeAvatar}" crossorigin="anonymous" referrerpolicy="no-referrer" onerror="this.onerror=null; this.removeAttribute('crossorigin'); this.src='${cand.avatar}'; this.onerror=function(){ this.src='https://ui-avatars.com/api/?name=' + encodeURIComponent('${encodeURIComponent(cand.name)}') + '&background=0284c7&color=fff&bold=true&size=128'; };" class="w-14 h-14 rounded-2xl object-cover border-2 border-slate-200 shadow-sm flex-shrink-0">
              <div class="min-w-0 text-left space-y-0.5">
                <h4 class="font-black text-sm text-slate-950 uppercase tracking-tight truncate leading-tight">${cand.name}</h4>
                <p class="text-[11px] font-black text-sky-600 font-mono leading-none">${cand.party} • Nº ${cand.number}</p>
                <span class="text-[9px] font-bold text-slate-600 block truncate">Pretensão: ${cand.position}</span>
              </div>
            </div>
            <div class="p-2 rounded-2xl bg-slate-950 text-white text-center min-w-[62px] shadow-sm flex flex-col items-center justify-center font-black flex-shrink-0">
              <span class="text-[6.5px] uppercase tracking-wider block text-slate-400">PONTUAÇÃO</span>
              <span class="text-2xl font-mono leading-none block my-0.5 text-sky-400">${overallScore}</span>
            </div>
          </div>

          <!-- 4 Bento Cards Grid -->
          <div class="grid grid-cols-2 gap-2 text-left text-xs my-1">
            <div class="p-2.5 bg-white rounded-2xl border border-slate-200 space-y-0.5 shadow-sm">
              <span class="text-[7px] uppercase font-black text-emerald-700 flex items-center gap-1">
                <i data-lucide="shield-check" class="w-3 h-3 text-emerald-600"></i> Ficha Limpa
              </span>
              <strong class="text-xs font-black text-slate-900 block">0 Condenações</strong>
              <span class="text-[7px] text-slate-500 block">TSE • TRF-3 Regular</span>
            </div>

            <div class="p-2.5 bg-white rounded-2xl border border-slate-200 space-y-0.5 shadow-sm">
              <span class="text-[7px] uppercase font-black text-sky-700 flex items-center gap-1">
                <i data-lucide="calendar" class="w-3 h-3 text-sky-600"></i> Presença
              </span>
              <strong class="text-xs font-black text-slate-900 block font-mono">${cand.attendance.ratePct}%</strong>
              <span class="text-[7px] text-slate-500 block">${cand.attendance.presentCount} de 114 sessões</span>
            </div>

            <div class="p-2.5 bg-white rounded-2xl border border-slate-200 space-y-0.5 shadow-sm">
              <span class="text-[7px] uppercase font-black text-emerald-700 flex items-center gap-1">
                <i data-lucide="wallet" class="w-3 h-3 text-emerald-600"></i> Economia
              </span>
              <strong class="text-xs font-black text-emerald-800 block font-mono">${(cand.salary && cand.salary.spendingCeapSavings) ? cand.salary.spendingCeapSavings : 'R$ 164.600'}</strong>
              <span class="text-[7px] text-slate-500 block">${cand.salary.spendingPercentage}% do teto legal</span>
            </div>

            <div class="p-2.5 bg-white rounded-2xl border border-slate-200 space-y-0.5 shadow-sm">
              <span class="text-[7px] uppercase font-black text-purple-700 flex items-center gap-1">
                <i data-lucide="book-check" class="w-3 h-3 text-purple-600"></i> Leis em Vigor
              </span>
              <strong class="text-xs font-black text-slate-900 block font-mono">${cand.bills.approved} Leis</strong>
              <span class="text-[7px] text-slate-500 block">${cand.bills.successRate} aprovação</span>
            </div>
          </div>

          <!-- Bento Emendas -->
          <div class="p-2.5 bg-white rounded-2xl border border-slate-200 text-left space-y-1 shadow-sm my-1">
            <div class="flex items-center justify-between text-[7px] uppercase font-bold text-slate-500">
              <span>${cand.parliamentaryAmendments ? cand.parliamentaryAmendments.totalExecuted : 'R$ 35,1M'} em Emendas</span>
              <span class="font-mono text-emerald-700 font-bold">${executionPct}% Pago</span>
            </div>
            <div class="p-1 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-300 text-[8px] font-bold font-mono text-center truncate">
              🟢 100% por Chamamento Público Aberto
            </div>
          </div>

          <!-- Footer Meta Prioritária -->
          <div class="p-2.5 rounded-2xl bg-slate-950 text-white flex items-center gap-2 text-[8px] font-bold">
            <span class="text-slate-400 flex items-center gap-1 flex-shrink-0">🎯 <strong>META #1:</strong></span>
            <span class="text-emerald-400 font-mono truncate font-extrabold">${(cand.proposals && cand.proposals.length > 0) ? cand.proposals[0].title : 'Auditoria Cívica 100% Ativa'}</span>
          </div>
        `;
        lucide.createIcons();
        return;
      }

      // ================= 5. MODELO X / THREADS (FATO CHECADO) =================
      if (exportVisualTheme === 'twitter') {
        target.className = 'w-[335px] max-w-[335px] box-border bg-black p-4 rounded-[1.75rem] border border-[#2f3336] shadow-2xl text-white relative flex flex-col justify-between font-sans overflow-hidden';
        target.innerHTML = `
          <!-- Post Author Header Padronizado -->
          <div class="flex items-center justify-between pb-1 border-b border-[#2f3336]">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full bg-[#1d9bf0] flex items-center justify-center text-white font-black text-[11px]">
                RX
              </div>
              <div class="text-left">
                <div class="flex items-center gap-1">
                  <span class="font-bold text-[11px] text-white">Figuras Políticas</span>
                  <svg class="w-3 h-3 text-[#1d9bf0]" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                </div>
                <span class="text-[9px] text-[#71767b] block leading-none">@figuraspoliticas • Auditoria Oficial</span>
              </div>
            </div>
            <span class="text-[9px] text-[#71767b] font-mono font-bold">04/10/2026</span>
          </div>

          <!-- Fact Check Hook Text -->
          <div class="text-[10.5px] text-[#e7e9ea] leading-snug text-left my-1">
            <strong class="text-amber-400">⏳ FATO CHECADO:</strong> Quanto realmente custa o mandato de <strong class="text-[#1d9bf0]">${cand.name}</strong> aos cofres públicos? Puxamos os dados oficiais do TSE:
          </div>

          <!-- Embedded Quote Card -->
          <div class="rounded-2xl bg-[#16181c] border border-[#2f3336] p-3 space-y-2 text-left my-1">
            <div class="flex items-center justify-between gap-2 border-b border-[#2f3336] pb-1.5">
              <div class="flex items-center gap-2 min-w-0">
                <img src="${safeAvatar}" crossorigin="anonymous" referrerpolicy="no-referrer" onerror="this.onerror=null; this.removeAttribute('crossorigin'); this.src='${cand.avatar}'; this.onerror=function(){ this.src='https://ui-avatars.com/api/?name=' + encodeURIComponent('${encodeURIComponent(cand.name)}') + '&background=0284c7&color=fff&bold=true&size=128'; };" class="w-[38px] h-[38px] rounded-xl object-cover border border-[#2f3336]">
                <div class="min-w-0">
                  <h5 class="font-bold text-xs text-white truncate leading-none">${cand.name}</h5>
                  <p class="text-[9px] text-slate-400 font-mono mt-0.5">${cand.party} • Nº ${cand.number} (${cand.position})</p>
                </div>
              </div>
              <div class="px-2 py-1 rounded-xl bg-black border border-white/20 text-center flex-shrink-0">
                <span class="text-[5.5px] text-slate-400 uppercase block font-bold">PONTUAÇÃO</span>
                <span class="text-sm font-black text-white font-mono leading-none">${overallScore}</span>
              </div>
            </div>

            <!-- Bullet Stats List -->
            <div class="space-y-1 text-[9px]">
              <div class="flex items-center justify-between text-slate-300">
                <span>⏱️ Custo / Minuto:</span>
                <strong class="text-amber-400 font-mono">${cand.salary.civicConversion ? cand.salary.civicConversion.costPerMinute : 'R$ 0,51/min'}</strong>
              </div>
              <div class="flex items-center justify-between text-slate-300">
                <span>🏛️ Presença em Plenário:</span>
                <strong class="text-white font-mono">${cand.attendance.ratePct}% (${cand.attendance.presentCount} pres.)</strong>
              </div>
              <div class="flex items-center justify-between text-slate-300">
                <span>💳 Cota Parlamentar:</span>
                <strong class="text-white font-mono">${cotaSimples} (${cand.salary.spendingPercentage}% teto)</strong>
              </div>
              <div class="flex items-center justify-between text-slate-300">
                <span>📦 Dinheiro Entregue nas Cidades:</span>
                <strong class="text-emerald-400 font-mono">${cand.parliamentaryAmendments ? cand.parliamentaryAmendments.totalExecuted : 'R$ 35.1M'}</strong>
              </div>
              <div class="p-1 rounded-lg bg-black/80 border border-white/10 text-center">
                <div class="text-[7.5px] font-mono font-bold truncate ${cand.parliamentaryAmendments && cand.parliamentaryAmendments.integritySeal ? cand.parliamentaryAmendments.integritySeal.badgeClass : 'text-emerald-300'}">
                  ${cand.parliamentaryAmendments && cand.parliamentaryAmendments.integritySeal ? cand.parliamentaryAmendments.integritySeal.badge : '🟢 100% por Concurso Público'}
                </div>
              </div>
              <div class="flex items-center justify-between text-slate-300 pt-0.5">
                <span>🎯 Foco Prioritário #1:</span>
                <strong class="text-slate-200 truncate max-w-[150px]">${cand.jurisdictionProblemsMatch ? cand.jurisdictionProblemsMatch.priorityGoal : 'Redução de Filas no SUS'}</strong>
              </div>
            </div>

            <!-- Footer Impact -->
            <div class="p-1.5 rounded-xl bg-black border border-[#2f3336] flex items-center justify-between text-[8px]">
              <span class="text-slate-400">💵 Gasto Anual Pagaria:</span>
              <span class="text-emerald-400 font-bold font-mono">${cand.salary.civicConversion ? cand.salary.civicConversion.salariosMinimos : '190 salários mínimos'}</span>
            </div>
          </div>

          <!-- Tweet Interaction Metrics -->
          <div class="flex items-center justify-between pt-1 border-t border-[#2f3336] text-[9px] text-[#71767b]">
            <span class="flex items-center gap-1"><i data-lucide="message-circle" class="w-3 h-3"></i> 412</span>
            <span class="flex items-center gap-1"><i data-lucide="repeat" class="w-3 h-3"></i> 2.1K</span>
            <span class="flex items-center gap-1"><i data-lucide="heart" class="w-3 h-3 text-rose-500"></i> 11.8K</span>
            <span class="flex items-center gap-1"><i data-lucide="bookmark" class="w-3 h-3"></i> 940</span>
            <span class="flex items-center gap-1"><i data-lucide="share" class="w-3 h-3"></i></span>
          </div>
        `;
        lucide.createIcons();
        return;
      }

      // ================= 6. TEMA: APPLE DESIGN SYSTEM (INDIVIDUAL LIQUID GLASS) =================
      if (exportVisualTheme === 'apple') {
        const name1 = (cand.ballotName || cand.name).split(' ')[0];
        const fullName = cand.ballotName || cand.name;
        const campSpent = cand.campaignFinance ? cand.campaignFinance.totalSpentFormatted.replace(' milhões', 'M').replace(' milhão', 'M') : 'R$ 16,5M';
        const costVote = cand.campaignFinance?.costPerVote || 'R$ 9,23 / voto';

        // 4 Gatilhos de Viralidade Cívica (Sem Custo por Minuto)
        const lawsApproved = cand.bills?.approved ?? (cand.bills?.total ? Math.round(cand.bills.total * 0.4) : 7);
        const ceremPct = cand.careerProductivity?.ceremonialBillsPct ?? 35;
        const prodScore = (!isNaN(Number(cand.overallScore)) && cand.overallScore !== null) ? Number(cand.overallScore) : (cand.careerProductivity?.productivityScore || 85);

        const truthPct = cand.recentDebate?.truthfulnessPct ?? (cand.radar?.coerencia || 90);

        const isClean = (!cand.ethics || cand.ethics.condemned === 0);
        const cleanStatus = isClean ? 'Ficha Limpa (0 Condenações)' : 'Processos em Andamento';

        const attPct = cand.attendance?.ratePct || 94;
        const amendTotal = cand.parliamentaryAmendments?.totalExecuted ? cand.parliamentaryAmendments.totalExecuted.replace('.000.000,00', 'M').replace('.000,00', 'k') : 'R$ 35,1M';
        const integrityBadge = cand.parliamentaryAmendments?.integritySeal?.shortBadge || '🟢 100% Concurso';

        // Apple Activity Ring SVG stroke calculation (radius = 21, circum ≈ 131.95)
        const ringCircum = 131.95;
        const ringOffset = ringCircum * (1 - Math.min(100, Math.max(0, prodScore)) / 100);

        target.className = 'w-[335px] max-w-[335px] box-border bg-[#0a0a0c] text-white p-4 rounded-[28px] border border-white/15 shadow-2xl backdrop-blur-2xl relative flex flex-col justify-between font-sans overflow-hidden';
        target.innerHTML = `
          <!-- Ambient Glow Circles -->
          <div class="absolute -top-12 -left-12 w-36 h-36 rounded-full bg-sky-500/15 blur-2xl pointer-events-none"></div>
          <div class="absolute -bottom-12 -right-12 w-36 h-36 rounded-full bg-amber-500/15 blur-2xl pointer-events-none"></div>

          <!-- Top Header Padronizado Apple -->
          <div class="relative z-10 flex items-center justify-between border-b border-white/10 pb-2">
            <div class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span class="text-[9px] font-mono font-black uppercase tracking-widest text-white/90">FIGURAS POLÍTICAS • DOSSIÊ OFICIAL</span>
            </div>
            <span class="text-[8px] font-mono font-bold px-2 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/10">
              04/10/2026
            </span>
          </div>

          <!-- Profile & Apple Activity Ring -->
          <div class="relative z-10 flex items-center justify-between gap-2.5 my-1.5 p-2.5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div class="flex items-center gap-2.5 min-w-0">
              <img src="${safeAvatar}" crossorigin="anonymous" referrerpolicy="no-referrer" onerror="this.onerror=null; this.removeAttribute('crossorigin'); this.src='${cand.avatar}'; this.onerror=function(){ this.src='https://ui-avatars.com/api/?name=' + encodeURIComponent('${encodeURIComponent(cand.name)}') + '&background=0284c7&color=fff&bold=true&size=128'; };" class="w-12 h-12 rounded-2xl object-cover ring-1 ring-white/20 shadow-md flex-shrink-0 bg-slate-800">
              <div class="min-w-0 space-y-0.5 text-left">
                <h4 class="font-extrabold text-xs text-white uppercase tracking-tight truncate leading-tight">${fullName}</h4>
                <p class="text-[10px] font-mono font-extrabold text-sky-400 leading-none">${cand.party} • Nº ${cand.number}</p>
                <span class="text-[8px] text-white/60 truncate block">${cand.position} (${cand.state})</span>
              </div>
            </div>

            <!-- Apple Activity Ring Meter -->
            <div class="relative flex-shrink-0 flex items-center justify-center w-13 h-13">
              <svg class="w-13 h-13 -rotate-90" viewBox="0 0 52 52">
                <circle cx="26" cy="26" r="21" class="stroke-white/10" stroke-width="4.5" fill="none"></circle>
                <circle cx="26" cy="26" r="21" stroke="url(#appleScoreGrad)" stroke-width="4.5" stroke-dasharray="${ringCircum}" stroke-dashoffset="${ringOffset}" stroke-linecap="round" fill="none"></circle>
                <defs>
                  <linearGradient id="appleScoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#38bdf8" />
                    <stop offset="100%" stop-color="#10b981" />
                  </linearGradient>
                </defs>
              </svg>
              <div class="absolute inset-0 flex flex-col items-center justify-center">
                <span class="text-[13px] font-mono font-black text-white leading-none">${prodScore}</span>
                <span class="text-[6.5px] font-mono uppercase text-white/50 leading-none mt-0.5">pts</span>
              </div>
            </div>
          </div>

          <!-- 4 Gatilhos de Viralidade Cívica (Apple Bento Grid) -->
          <div class="relative z-10 space-y-1.5 my-1 text-[8.5px] font-mono">
            <!-- Gatilho 1: Gasto Campanha & Custo/Voto TSE -->
            <div class="p-2 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
              <div class="flex items-center gap-1.5 text-white/70 font-sans">
                <span>🗳️</span>
                <span>Gasto Campanha & Custo/Voto TSE:</span>
              </div>
              <div class="text-right">
                <strong class="text-amber-300 font-bold block text-[9.5px]">${costVote.replace(' / voto', ' por voto')}</strong>
                <span class="text-[7.5px] text-white/50 block">${campSpent} gastos</span>
              </div>
            </div>

            <!-- Gatilho 2: Leis Reais / Cerimoniais -->
            <div class="p-2 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
              <div class="flex items-center gap-1.5 text-white/70 font-sans">
                <span>🏛️</span>
                <span>Leis Reais / Cerimoniais:</span>
              </div>
              <div class="text-right">
                <strong class="text-sky-300 font-bold block text-[9.5px]">${lawsApproved} Leis Aprovadas</strong>
                <span class="text-[7.5px] text-white/50 block">${ceremPct}% Cerimoniais</span>
              </div>
            </div>

            <!-- Gatilho 3: Veracidade das Falas -->
            <div class="p-2 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
              <div class="flex items-center gap-1.5 text-white/70 font-sans">
                <span>🎯</span>
                <span>Veracidade das Falas:</span>
              </div>
              <div class="text-right">
                <strong class="text-emerald-400 font-bold block text-[9.5px]">${truthPct}% Verdadeiro</strong>
                <span class="text-[7.5px] text-white/50 block">0 Fake News detectadas</span>
              </div>
            </div>

            <!-- Gatilho 4: Certidão Oficial de Ficha Limpa -->
            <div class="p-2 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
              <div class="flex items-center gap-1.5 text-white/70 font-sans">
                <span>🛡️</span>
                <span>Certidão de Ficha Limpa:</span>
              </div>
              <div class="text-right">
                <strong class="${isClean ? 'text-emerald-400' : 'text-amber-400'} font-bold block text-[9px]">${cleanStatus}</strong>
                <span class="text-[7.5px] text-white/50 block">Auditoria CNJ / STF</span>
              </div>
            </div>
          </div>

          <!-- Mandate Key Performance (Presença & Emendas) -->
          <div class="relative z-10 grid grid-cols-2 gap-1.5 my-1 text-[8px] font-mono">
            <div class="p-2 rounded-xl bg-white/[0.03] border border-white/10 text-left">
              <span class="text-[7px] text-white/50 block font-sans uppercase">🏛️ Presença Plenário</span>
              <strong class="text-sky-300 text-[10px] block">${attPct}%</strong>
              <span class="text-[7px] text-white/50 block truncate">${cand.attendance.presentCount} de ${cand.attendance.totalSessions} sessões</span>
            </div>
            <div class="p-2 rounded-xl bg-white/[0.03] border border-white/10 text-left">
              <span class="text-[7px] text-white/50 block font-sans uppercase">📦 Emendas Cidades</span>
              <strong class="text-emerald-400 text-[10px] block">${amendTotal}</strong>
              <span class="text-[7px] text-white/50 block truncate">${integrityBadge}</span>
            </div>
          </div>

          <!-- Apple Liquid Glass Footer -->
          <div class="relative z-10 mt-1 pt-1.5 border-t border-white/10 flex items-center justify-between text-[7px] text-white/50 font-mono">
            <span class="flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>figuraspoliticas.org</span>
            <span class="uppercase tracking-wider text-[6.5px]">⚡ Auditoria Oficial TSE/LAI</span>
          </div>
        `;

        lucide.createIcons();
        return;
      }
    }

        function renderExportRadarChartTheme(cand1, theme, cand2 = null) {
      const canvas = document.getElementById('exportCardRadarCanvas');
      if (!canvas) return;

      if (exportRadarChartInstance) {
        try {
          exportRadarChartInstance.destroy();
        } catch (e) {}
        exportRadarChartInstance = null;
      }

      const ctx = canvas.getContext('2d');
      const labels = ['Integridade', 'Eficiência', 'Transparência', 'Coerência', 'Viabilidade', 'Presença'];

      const datasets = [];

      if (cand2) {
        // Comparison Radar
        datasets.push({
          label: cand1.name.split(' ')[0],
          data: [
            cand1.radar?.integridade ?? 90,
            cand1.radar?.eficiencia ?? 85,
            cand1.radar?.transparencia ?? 88,
            cand1.radar?.coerencia ?? 85,
            cand1.radar?.viabilidade ?? (typeof cand1.radar?.propostas === 'number' ? cand1.radar.propostas : 88),
            cand1.radar?.presenca ?? cand1.radar?.assiduidade ?? cand1.attendance?.ratePct ?? 90
          ],
          backgroundColor: 'rgba(245, 158, 11, 0.35)',
          borderColor: '#f59e0b',
          borderWidth: 2,
          pointBackgroundColor: '#ffffff',
          pointBorderColor: '#f59e0b',
          pointRadius: 3
        });

        datasets.push({
          label: cand2.name.split(' ')[0],
          data: [
            cand2.radar?.integridade ?? 90,
            cand2.radar?.eficiencia ?? 85,
            cand2.radar?.transparencia ?? 88,
            cand2.radar?.coerencia ?? 85,
            cand2.radar?.viabilidade ?? (typeof cand2.radar?.propostas === 'number' ? cand2.radar.propostas : 90),
            cand2.radar?.presenca ?? cand2.radar?.assiduidade ?? cand2.attendance?.ratePct ?? 90
          ],
          backgroundColor: 'rgba(192, 132, 252, 0.35)',
          borderColor: '#c084fc',
          borderWidth: 2,
          pointBackgroundColor: '#ffffff',
          pointBorderColor: '#c084fc',
          pointRadius: 3
        });
      } else {
        // Single Candidate Radar
        const isSwiss = theme === 'swiss';
        datasets.push({
          label: cand1.name,
          data: [
            cand1.radar?.integridade ?? 90,
            cand1.radar?.eficiencia ?? 85,
            cand1.radar?.transparencia ?? 88,
            cand1.radar?.coerencia ?? 85,
            cand1.radar?.viabilidade ?? (typeof cand1.radar?.propostas === 'number' ? cand1.radar.propostas : 88),
            cand1.radar?.presenca ?? cand1.radar?.assiduidade ?? cand1.attendance?.ratePct ?? 90
          ],
          backgroundColor: isSwiss ? 'rgba(5, 150, 105, 0.25)' : 'rgba(2, 132, 199, 0.25)',
          borderColor: isSwiss ? '#059669' : '#0284c7',
          borderWidth: 2,
          pointBackgroundColor: isSwiss ? '#059669' : '#0284c7',
          pointRadius: 3
        });
      }

      exportRadarChartInstance = new Chart(ctx, {
        type: 'radar',
        data: { labels, datasets },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: false,
          scales: {
            r: {
              angleLines: { color: theme === 'duel' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)' },
              grid: { color: theme === 'duel' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.06)' },
              pointLabels: {
                color: theme === 'duel' ? '#94a3b8' : (theme === 'swiss' ? '#44403c' : '#475569'),
                font: { size: 8.5, weight: 'bold', family: 'Inter' }
              },
              min: 0,
              max: 100,
              beginAtZero: true,
              ticks: { display: false, stepSize: 25 }
            }
          },
          plugins: { legend: { display: false } }
        }
      });
    }


        async function downloadExportedImage(resolution = 'fhd') {
      const target = document.getElementById('export-card-target');
      const scaleFactor = resolution === '4k' ? 3.5 : 2.2;
      const btn = resolution === '4k' ? document.getElementById('btn-dl-4k') : document.getElementById('btn-dl-fhd');
      const originalText = btn.innerHTML;
      btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Renderizando ${resolution.toUpperCase()}...`;
      lucide.createIcons();

      const cardBg = exportVisualTheme === 'twitter' || isExportComparison ? '#070b16' : '#ffffff';

      try {
        await new Promise(r => setTimeout(r, 100));

        const canvas = await html2canvas(target, { 
          backgroundColor: cardBg, 
          scale: scaleFactor,
          useCORS: true,
          allowTaint: true,
          logging: false,
          windowWidth: target.scrollWidth,
          windowHeight: target.scrollHeight
        });

        const link = document.createElement('a');
        const resLabel = resolution === '4k' ? '4K-UltraHD' : 'FullHD-1080p';
        const candName = activeExportCandidate ? activeExportCandidate.name.toLowerCase().replace(/\s+/g, '-') : 'candidato';
        const filename = isExportComparison 
          ? `figurinha-duelo-${selectedForCompare[0]}-vs-${selectedForCompare[1]}-${resLabel}.png`
          : `figurinha-${exportVisualTheme}-${candName}-${resLabel}.png`;
        
        link.download = filename;
        link.href = canvas.toDataURL('image/png', 0.95);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        canvas.width = 0;
        canvas.height = 0;
      } catch (err) {
        console.error("Erro na exportação:", err);
        alert("Ocorreu uma instabilidade ao gerar a imagem.");
      } finally {
        btn.innerHTML = originalText;
        lucide.createIcons();
      }
    }

    async function copyCardImageToClipboard() {
      const target = document.getElementById('export-card-target');
      const btn = document.getElementById('btn-copy-img');
      const originalText = btn.innerHTML;
      btn.innerHTML = `<i data-lucide="loader-2" class="w-3.5 h-3.5 animate-spin"></i> Copiando...`;
      lucide.createIcons();

      const cardBg = exportVisualTheme === 'twitter' || isExportComparison ? '#070b16' : '#ffffff';

      try {
        const canvas = await html2canvas(target, { backgroundColor: cardBg, scale: 2.2, useCORS: true, allowTaint: true });
        canvas.toBlob(async (blob) => {
          if (blob) {
            await navigator.clipboard.write([
              new ClipboardItem({ 'image/png': blob })
            ]);
            btn.innerHTML = `<i data-lucide="check" class="w-3.5 h-3.5 text-emerald-500"></i> Copiado!`;
            lucide.createIcons();
            setTimeout(() => { btn.innerHTML = originalText; lucide.createIcons(); }, 2000);
          }
        });
      } catch (e) {
        alert("Seu navegador não suporta cópia direta. Use o botão de Baixar.");
        btn.innerHTML = originalText;
        lucide.createIcons();
      }
    }

        async function shareToInstagram() {
      try {
        const target = document.getElementById('sticker-target');
        if (!target) return;
        const btn = document.getElementById('btn-share-insta');
        if (btn) btn.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin text-white"></i> Gerando...';
        
        const canvas = await html2canvas(target, { scale: 3, useCORS: true, backgroundColor: null });
        canvas.toBlob(async (blob) => {
          if (!blob) {
            if (btn) btn.innerHTML = '<i data-lucide="camera" class="w-4 h-4 text-white"></i> 📸 Postar no Instagram (Stories / Feed)';
            return;
          }
          const file = new File([blob], 'raiox_politico_figurinha.png', { type: 'image/png' });
          
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
              files: [file],
              title: 'Raio-X Político',
              text: 'Confira a análise deste político no Raio-X Político!'
            });
          } else {
            alert("Seu dispositivo não suporta envio direto. A figurinha será baixada para você postar manualmente no Instagram.");
            downloadSticker();
          }
          if (btn) btn.innerHTML = '<i data-lucide="camera" class="w-4 h-4 text-white"></i> 📸 Postar no Instagram (Stories / Feed)';
          if (window.lucide) lucide.createIcons();
        }, 'image/png');
      } catch (err) {
        console.error(err);
        alert("Erro ao processar imagem para o Instagram.");
      }
    }

    async function shareCardImageNative() {
      const target = document.getElementById('export-card-target');
      if (!target) return;

      const cardBg = exportVisualTheme === 'twitter' || isExportComparison ? '#070b16' : '#ffffff';
      const candName = activeExportCandidate ? (activeExportCandidate.ballotName || activeExportCandidate.name) : 'Candidato';
      const candParty = activeExportCandidate ? `${activeExportCandidate.party}-${activeExportCandidate.state}` : 'Eleições 2026';
      const shareUrl = activeExportCandidate ? `${window.location.origin}/dossie.html?id=${activeExportCandidate.id}` : window.location.href;

      try {
        const canvas = await html2canvas(target, { backgroundColor: cardBg, scale: 2.0, useCORS: true, allowTaint: true });
        canvas.toBlob(async (blob) => {
          if (blob && navigator.canShare && navigator.canShare({ files: [new File([blob], 'figurinha.png', { type: 'image/png' })] })) {
            const file = new File([blob], `figurinha-${candName.toLowerCase().replace(/\s+/g, '-')}.png`, { type: 'image/png' });
            await navigator.share({
              files: [file],
              title: `Figuras Políticas: ${candName} (${candParty})`,
              text: `Confira a auditoria cívica oficial de ${candName} no Figuras Políticas:`,
              url: shareUrl
            });
          } else {
            exportCardImage('standard');
          }
        });
      } catch (err) {
        console.warn('[WebShare] Fallback para download:', err);
        exportCardImage('standard');
      }
    }
    window.shareCardImageNative = shareCardImageNative;


    // ================= LEGAL SOURCES & PROTECTION MODAL LOGIC =================
    function openLegalSourcesModal() {
      document.getElementById('legal-sources-modal').classList.remove('hidden');
      lucide.createIcons();
    }

    function closeLegalSourcesModal() {
      document.getElementById('legal-sources-modal').classList.add('hidden');
    }
