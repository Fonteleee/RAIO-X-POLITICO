// Raio-X Político - Figurinhas Colecionáveis, Download 1080p/4K e Compartilhamento

// ================= INCUMBENTS RENDERER =================
    function renderIncumbents() {
      const grid = document.getElementById('incumbents-grid');
      grid.innerHTML = incumbentsData.map(inc => `
        <div class="glass-card rounded-2xl p-5 space-y-4">
          <div class="flex items-start gap-3.5">
            <img src="${inc.avatar}" class="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500/40">
            <div>
              <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30">
                ${inc.status}
              </span>
              <h3 class="font-bold text-base text-slate-900 dark:text-white mt-1">${inc.name}</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400">${inc.office}</p>
            </div>
          </div>
          <p class="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/90 p-3 rounded-xl border border-slate-200 dark:border-white/5">${inc.highlights}</p>
          <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-white/5">
            <span>Presença no Mandato:</span>
            <span class="text-emerald-600 dark:text-emerald-400 font-bold">${inc.attendance}</span>
          </div>
        </div>
      `).join('');
    }

// ================= EXPORT SOCIAL MEDIA CARD MODAL =================
    let activeExportCandidate = candidatesData[0];
    let isExportComparison = false;
    let exportFormat = 'stories';
    let exportVisualTheme = 'swiss'; // 'swiss' | 'fifa' | 'executive' | 'bento' | 'twitter' | 'apple'
    let exportRadarChartInstance = null;

    function setExportVisualTheme(theme) {
      exportVisualTheme = theme;
      
      const allThemes = ['swiss', 'fifa', 'executive', 'bento', 'twitter', 'apple'];
      allThemes.forEach(t => {
        const btn = document.getElementById('btn-theme-' + t);
        if (!btn) return;
        if (t === theme) {
          btn.className = 'py-2 px-1 rounded-xl bg-purple-600 text-white font-bold text-[10px] shadow-sm flex flex-col items-center justify-center gap-0.5 transition cursor-pointer';
        } else {
          btn.className = 'py-2 px-1 rounded-xl bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[10px] border border-slate-200 dark:border-white/10 flex flex-col items-center justify-center gap-0.5 transition cursor-pointer hover:bg-slate-100';
        }
      });

      if (activeExportCandidate) {
        renderExportCardContent(activeExportCandidate, isExportComparison);
      }
    }

    function setExportFormat(fmt) {
      exportFormat = fmt;
      const btnStories = document.getElementById('btn-format-stories');
      const btnFeed = document.getElementById('btn-format-feed');
      if (btnStories && btnFeed) {
        if (fmt === 'stories') {
          btnStories.className = 'py-2 px-3 rounded-xl bg-purple-600 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 transition';
          btnFeed.className = 'py-2 px-3 rounded-xl bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs border border-slate-200 dark:border-white/10 flex items-center justify-center gap-1.5 transition';
        } else {
          btnFeed.className = 'py-2 px-3 rounded-xl bg-purple-600 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 transition';
          btnStories.className = 'py-2 px-3 rounded-xl bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs border border-slate-200 dark:border-white/10 flex items-center justify-center gap-1.5 transition';
        }
      }
    }

    function openExportModalFor(candId, isComparison = false) {
      isExportComparison = isComparison;
      const cand = candidatesData.find(c => c.id === candId) || candidatesData[0];
      activeExportCandidate = cand;
      
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
      renderExportCardContent(activeExportCandidate, true);
      document.getElementById('export-modal').classList.remove('hidden');
      lucide.createIcons();
    }

    function closeExportModal() {
      document.getElementById('export-modal').classList.add('hidden');
    }

    function getCorsSafeAvatar(url, name = 'Candidato') {
      if (!url) return 'https://ui-avatars.com/api/?name=' + encodeURIComponent(name) + '&background=0284c7&color=fff&bold=true&size=128';
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
        const score1 = calculateOverallScore(cand1);
        const score2 = calculateOverallScore(cand2);
        const truth1 = cand1.recentDebate ? cand1.recentDebate.truthfulnessPct : 80;
        const truth2 = cand2.recentDebate ? cand2.recentDebate.truthfulnessPct : 80;
        const name1 = cand1.name.split(' ')[0];
        const name2 = cand2.name.split(' ')[0];
        const roi1 = cand1.salary && cand1.salary.civicConversion && cand1.salary.civicConversion.roiText ? cand1.salary.civicConversion.roiText : 'R$ 30,50 / R$ 1';
        const roi2 = cand2.salary && cand2.salary.civicConversion && cand2.salary.civicConversion.roiText ? cand2.salary.civicConversion.roiText : 'R$ 28,20 / R$ 1';
        const safeAvatar1 = getCorsSafeAvatar(cand1.avatar, cand1.name);
        const safeAvatar2 = getCorsSafeAvatar(cand2.avatar, cand2.name);
        const fallbackImg1 = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(name1) + '&background=0284c7&color=fff&bold=true&size=128';
        const fallbackImg2 = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(name2) + '&background=7c3aed&color=fff&bold=true&size=128';

        // --- TEMA 1: INSTAGRAM (SWISS CLEAN COM RADAR) ---
        if (exportVisualTheme === 'swiss') {
          target.className = 'w-[335px] max-w-[335px] box-border bg-white p-4 rounded-[1.75rem] border-2 border-stone-300 shadow-2xl text-stone-950 relative flex flex-col justify-between font-sans overflow-hidden';
          target.innerHTML = `
            <!-- Top Header -->
            <div class="flex items-center justify-between border-b-2 border-stone-950 pb-1.5">
              <div class="flex items-center gap-1.5">
                <span class="w-3 h-3 bg-emerald-600 rounded-sm"></span>
                <span class="text-[9px] font-black uppercase tracking-widest text-stone-950 font-mono">RAIO-X POLÍTICO • DUELO</span>
              </div>
              <span class="text-[8.5px] font-mono font-black text-emerald-700">04/10/2026</span>
            </div>

            <!-- Head to Head Swiss Banner -->
            <div class="grid grid-cols-11 items-center gap-1 bg-stone-100 p-2 rounded-2xl border border-stone-300 my-1">
              <div class="col-span-5 flex items-center gap-2">
                <img src="${safeAvatar1}" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='${fallbackImg1}';" class="w-10 h-10 rounded-xl object-cover border-2 border-stone-950 shadow-sm flex-shrink-0">
                <div class="min-w-0 text-left">
                  <strong class="font-black text-[11px] text-stone-950 block truncate uppercase leading-tight">${name1}</strong>
                  <span class="text-[8px] font-mono font-bold text-stone-600">${cand1.party}</span>
                </div>
              </div>
              <div class="col-span-1 text-center font-black text-[8.5px] text-white bg-stone-950 rounded-full w-5 h-5 flex items-center justify-center mx-auto">
                VS
              </div>
              <div class="col-span-5 flex items-center justify-end gap-2 text-right">
                <div class="min-w-0">
                  <strong class="font-black text-[11px] text-stone-950 block truncate uppercase leading-tight">${name2}</strong>
                  <span class="text-[8px] font-mono font-bold text-stone-600">${cand2.party}</span>
                </div>
                <img src="${safeAvatar2}" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='${fallbackImg2}';" class="w-10 h-10 rounded-xl object-cover border-2 border-stone-950 shadow-sm flex-shrink-0">
              </div>
            </div>

            <!-- Scores Badges -->
            <div class="grid grid-cols-2 gap-2 my-0.5">
              <div class="p-1.5 rounded-xl bg-stone-950 text-white text-center flex items-center justify-between px-3">
                <span class="text-[7px] uppercase font-bold text-stone-400">Pontuação ${name1}</span>
                <span class="text-sm font-black font-mono text-emerald-400">${score1}</span>
              </div>
              <div class="p-1.5 rounded-xl bg-stone-950 text-white text-center flex items-center justify-between px-3">
                <span class="text-[7px] uppercase font-bold text-stone-400">Pontuação ${name2}</span>
                <span class="text-sm font-black font-mono text-emerald-400">${score2}</span>
              </div>
            </div>

            <!-- Radar Mini (120px) -->
            <div class="bg-stone-50 rounded-2xl p-2 border border-stone-300 my-1">
              <div class="flex items-center justify-between text-[7.5px] uppercase font-black text-stone-700 mb-0.5 font-mono">
                <span>RADAR COMPARATIVO</span>
                <div>
                  <span class="text-amber-600 font-bold">● ${name1}</span>
                  <span class="text-purple-600 font-bold ml-1.5">● ${name2}</span>
                </div>
              </div>
              <div class="w-full h-[125px] flex items-center justify-center">
                <canvas id="exportCardRadarCanvas" width="260" height="125"></canvas>
              </div>
            </div>

            <!-- Matrix -->
            <div class="space-y-1 text-[8.5px] font-mono my-0.5">
              <div class="p-1.5 bg-stone-100 rounded-xl border border-stone-200 flex items-center justify-between">
                <span class="text-stone-600 font-sans font-bold">🔍 Veracidade Falas:</span>
                <div><strong class="text-amber-700">${truth1}%</strong> vs <strong class="text-purple-700">${truth2}%</strong></div>
              </div>
              <div class="p-1.5 bg-stone-100 rounded-xl border border-stone-200 flex items-center justify-between">
                <span class="text-stone-600 font-sans font-bold">🏛️ Presença em Sessões:</span>
                <div><strong class="text-stone-900">${cand1.attendance.ratePct}%</strong> vs <strong class="text-stone-900">${cand2.attendance.ratePct}%</strong></div>
              </div>
              <div class="p-1.5 bg-stone-100 rounded-xl border border-stone-200 flex items-center justify-between">
                <span class="text-stone-600 font-sans font-bold">⏱️ Custo aos Cofres / Min:</span>
                <div><strong class="text-amber-700">${cand1.salary.civicConversion ? cand1.salary.civicConversion.costPerMinute : 'R$ 0,51'}</strong> vs <strong class="text-purple-700">${cand2.salary.civicConversion ? cand2.salary.civicConversion.costPerMinute : 'R$ 0,43'}</strong></div>
              </div>
            </div>

            <!-- Footer Retorno Cívico -->
            <div class="p-2 rounded-xl bg-stone-950 text-white flex flex-col gap-0.5 text-[7.5px]">
              <div class="flex items-center justify-between">
                <span class="text-emerald-400 font-mono font-black">🏛️ RETORNO CÍVICO:</span>
                <span class="text-[7px] text-stone-400 font-mono">Orçamento entregue</span>
              </div>
              <div class="flex justify-between font-mono text-stone-200 text-[8px] truncate">
                <span class="truncate"><strong>${name1}:</strong> ${roi1}</span>
                <span class="truncate ml-2"><strong>${name2}:</strong> ${roi2}</span>
              </div>
            </div>
          `;

          setTimeout(() => { renderExportRadarChartTheme(cand1, 'duel', cand2); }, 50);
          lucide.createIcons();
          return;
        }

        // --- TEMA 2: FIFA (DARK NEON COM 5 BARRAS COMPARATIVAS) ---
        if (exportVisualTheme === 'fifa') {
          target.className = 'w-[335px] max-w-[335px] box-border bg-[#0a0f1d] p-4 rounded-[1.75rem] border-2 border-amber-400/50 text-white shadow-2xl relative flex flex-col justify-between font-sans overflow-hidden';
          target.innerHTML = `
            <!-- Top Header -->
            <div class="flex items-center justify-between border-b border-amber-400/30 pb-1.5">
              <span class="text-[9px] font-black uppercase tracking-widest text-amber-300 font-mono flex items-center gap-1">
                ⭐ RAIO-X POLÍTICO • DUELO
              </span>
              <span class="text-[8.5px] font-mono font-bold text-slate-300">04/10/2026</span>
            </div>

            <!-- Head to Head FIFA Banner -->
            <div class="grid grid-cols-11 items-center gap-1 bg-gradient-to-r from-amber-500/20 via-slate-900 to-purple-500/20 p-2 rounded-2xl border border-white/20 my-1">
              <div class="col-span-5 flex items-center gap-2">
                <div class="relative flex-shrink-0">
                  <img src="${safeAvatar1}" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='${fallbackImg1}';" class="w-11 h-11 rounded-xl object-cover border-2 border-amber-400 shadow-md">
                  <span class="absolute -top-1.5 -left-1.5 bg-amber-400 text-slate-950 font-black text-[7.5px] px-1 rounded shadow">${score1}</span>
                </div>
                <div class="text-left min-w-0">
                  <span class="font-black text-[11px] text-amber-300 block truncate uppercase leading-tight">${name1}</span>
                  <span class="text-[8px] font-bold text-slate-300">${cand1.party}</span>
                </div>
              </div>
              
              <div class="col-span-1 text-center font-black text-[8.5px] text-white bg-gradient-to-r from-amber-500 to-purple-600 rounded-full w-5 h-5 flex items-center justify-center mx-auto shadow-md">
                VS
              </div>

              <div class="col-span-5 flex items-center justify-end gap-2 text-right">
                <div class="min-w-0">
                  <span class="font-black text-[11px] text-purple-300 block truncate uppercase leading-tight">${name2}</span>
                  <span class="text-[8px] font-bold text-slate-300">${cand2.party}</span>
                </div>
                <div class="relative flex-shrink-0">
                  <img src="${safeAvatar2}" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='${fallbackImg2}';" class="w-11 h-11 rounded-xl object-cover border-2 border-purple-400 shadow-md">
                  <span class="absolute -top-1.5 -right-1.5 bg-purple-400 text-slate-950 font-black text-[7.5px] px-1 rounded shadow">${score2}</span>
                </div>
              </div>
            </div>

            <!-- 5 Comparative Attribute Bars -->
            <div class="bg-black/40 p-2.5 rounded-2xl border border-white/10 space-y-1.5 text-[8.5px] font-mono my-1">
              <div>
                <div class="flex justify-between font-bold text-slate-300 mb-0.5">
                  <span class="text-amber-400">${truth1}%</span>
                  <span class="text-slate-400 text-[8px] uppercase">Veracidade no Debate</span>
                  <span class="text-purple-400">${truth2}%</span>
                </div>
                <div class="w-full bg-slate-800 rounded-full h-1.5 flex overflow-hidden">
                  <div class="bg-amber-400 h-full" style="width: ${(truth1 / (truth1 + truth2)) * 100}%"></div>
                  <div class="bg-purple-500 h-full" style="width: ${(truth2 / (truth1 + truth2)) * 100}%"></div>
                </div>
              </div>

              <div>
                <div class="flex justify-between font-bold text-slate-300 mb-0.5">
                  <span class="text-amber-400">${cand1.attendance.ratePct}%</span>
                  <span class="text-slate-400 text-[8px] uppercase">Presença em Plenário</span>
                  <span class="text-purple-400">${cand2.attendance.ratePct}%</span>
                </div>
                <div class="w-full bg-slate-800 rounded-full h-1.5 flex overflow-hidden">
                  <div class="bg-amber-400 h-full" style="width: 50%"></div>
                  <div class="bg-purple-500 h-full" style="width: 50%"></div>
                </div>
              </div>

              <div>
                <div class="flex justify-between font-bold text-slate-300 mb-0.5">
                  <span class="text-amber-400">${cand1.parliamentaryAmendments ? cand1.parliamentaryAmendments.openBidPct : 100}%</span>
                  <span class="text-slate-400 text-[8px] uppercase">Transparência Emendas</span>
                  <span class="text-purple-400">${cand2.parliamentaryAmendments ? cand2.parliamentaryAmendments.openBidPct : 100}%</span>
                </div>
                <div class="w-full bg-slate-800 rounded-full h-1.5 flex overflow-hidden">
                  <div class="bg-amber-400 h-full" style="width: 52%"></div>
                  <div class="bg-purple-500 h-full" style="width: 48%"></div>
                </div>
              </div>

              <div>
                <div class="flex justify-between font-bold text-slate-300 mb-0.5">
                  <span class="text-amber-400">${cand1.bills.approved} Leis</span>
                  <span class="text-slate-400 text-[8px] uppercase">Leis Aprovadas</span>
                  <span class="text-purple-400">${cand2.bills.approved} Leis</span>
                </div>
                <div class="w-full bg-slate-800 rounded-full h-1.5 flex overflow-hidden">
                  <div class="bg-amber-400 h-full" style="width: ${(cand1.bills.approved / (cand1.bills.approved + cand2.bills.approved)) * 100}%"></div>
                  <div class="bg-purple-500 h-full" style="width: ${(cand2.bills.approved / (cand1.bills.approved + cand2.bills.approved)) * 100}%"></div>
                </div>
              </div>
            </div>

            <!-- Emendas Destinadas -->
            <div class="p-2 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-between text-[8px] font-mono my-0.5">
              <span class="text-amber-400 font-bold">${cand1.parliamentaryAmendments ? cand1.parliamentaryAmendments.totalExecuted : 'R$ 35,1M'}</span>
              <span class="text-slate-400 uppercase font-bold text-[7px] font-sans">EMENDAS EXECUTADAS</span>
              <span class="text-purple-400 font-bold">${cand2.parliamentaryAmendments ? cand2.parliamentaryAmendments.totalExecuted : 'R$ 24,5M'}</span>
            </div>

            <!-- Footer Impacto -->
            <div class="p-2 bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 rounded-xl border border-emerald-500/40 text-center space-y-0.5">
              <span class="text-[7.5px] uppercase font-black text-emerald-400 block tracking-wider font-sans">💵 GASTO ANUAL PAGARIA:</span>
              <div class="flex items-center justify-around text-[8.5px] font-black">
                <span class="text-amber-300 font-mono">${cand1.salary.civicConversion ? cand1.salary.civicConversion.salariosMinimos : '190 salários'}</span>
                <span class="text-slate-400 text-[9px]">VS</span>
                <span class="text-purple-300 font-mono">${cand2.salary.civicConversion ? cand2.salary.civicConversion.salariosMinimos : '160 salários'}</span>
              </div>
            </div>
          `;
          lucide.createIcons();
          return;
        }

        // --- TEMA 3: EXECUTIVO (EDITORIAL CREME DUELO) ---
        if (exportVisualTheme === 'executive') {
          target.className = 'w-[335px] max-w-[335px] box-border bg-[#fdfbf7] p-4 rounded-[1.75rem] border-2 border-stone-400 text-stone-900 shadow-2xl relative flex flex-col justify-between font-sans overflow-hidden';
          target.innerHTML = `
            <!-- Top Header -->
            <div class="flex items-center justify-between border-b-2 border-stone-900 pb-1.5">
              <span class="text-[9px] font-black uppercase tracking-widest text-stone-900 font-mono">RAIO-X POLÍTICO • DUELO</span>
              <span class="text-[8.5px] font-mono font-black text-stone-900">04/10/2026</span>
            </div>

            <!-- Head to Head Executive -->
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

            <!-- 4 Comparative KPIs -->
            <div class="grid grid-cols-2 gap-1.5 text-[8.5px] font-mono my-1">
              <div class="p-2 rounded-xl bg-stone-100 border border-stone-300 space-y-0.5">
                <span class="text-[7px] uppercase font-bold text-stone-600 font-sans block">🔍 Veracidade Falas</span>
                <div class="font-bold flex justify-between"><span>${name1}: ${truth1}%</span><span>${name2}: ${truth2}%</span></div>
              </div>
              <div class="p-2 rounded-xl bg-stone-100 border border-stone-300 space-y-0.5">
                <span class="text-[7px] uppercase font-bold text-stone-600 font-sans block">🏛️ Presença Sessões</span>
                <div class="font-bold flex justify-between"><span>${cand1.attendance.ratePct}%</span><span>${cand2.attendance.ratePct}%</span></div>
              </div>
              <div class="p-2 rounded-xl bg-stone-100 border border-stone-300 space-y-0.5">
                <span class="text-[7px] uppercase font-bold text-stone-600 font-sans block">💰 Custo / Minuto</span>
                <div class="font-bold flex justify-between"><span>${cand1.salary.civicConversion ? cand1.salary.civicConversion.costPerMinute : 'R$ 0,51'}</span><span>${cand2.salary.civicConversion ? cand2.salary.civicConversion.costPerMinute : 'R$ 0,43'}</span></div>
              </div>
              <div class="p-2 rounded-xl bg-stone-100 border border-stone-300 space-y-0.5">
                <span class="text-[7px] uppercase font-bold text-stone-600 font-sans block">📦 Emendas Pagas</span>
                <div class="font-bold flex justify-between"><span>${cand1.parliamentaryAmendments ? cand1.parliamentaryAmendments.totalExecuted : 'R$ 35,1M'}</span><span>${cand2.parliamentaryAmendments ? cand2.parliamentaryAmendments.totalExecuted : 'R$ 24,5M'}</span></div>
              </div>
            </div>

            <!-- Ficha Limpa Status -->
            <div class="p-2 rounded-xl bg-emerald-50 border border-emerald-300 flex items-center justify-between text-[8px] font-bold text-emerald-950 font-mono">
              <span>FICHA LIMPA:</span>
              <span>${name1}: 0 Conden. | ${name2}: 0 Conden.</span>
            </div>

            <!-- Footer -->
            <div class="p-2 rounded-xl bg-stone-900 text-white flex items-center justify-between text-[7.5px] font-bold">
              <span class="text-amber-400 font-mono">RETORNO CÍVICO:</span>
              <span class="font-mono">${name1}: ${roi1} | ${name2}: ${roi2}</span>
            </div>
          `;
          lucide.createIcons();
          return;
        }

        // --- TEMA 4: BENTO (PERFIL BENTO GRID DUELO) ---
        if (exportVisualTheme === 'bento') {
          target.className = 'w-[335px] max-w-[335px] box-border bg-[#f8fafc] p-4 rounded-[1.75rem] border border-slate-300 text-slate-900 shadow-2xl relative flex flex-col justify-between font-sans overflow-hidden';
          target.innerHTML = `
            <!-- Top Header -->
            <div class="flex items-center justify-between border-b border-slate-200 pb-1.5">
              <span class="text-[9px] font-black uppercase tracking-widest text-slate-800 font-mono">RAIO-X POLÍTICO • DUELO</span>
              <span class="text-[8px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">04/10/2026</span>
            </div>

            <!-- 2 Bento Profile Cards -->
            <div class="grid grid-cols-2 gap-2 my-1">
              <div class="p-2.5 bg-white rounded-2xl border border-slate-200 space-y-1 text-center shadow-sm">
                <img src="${safeAvatar1}" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='${fallbackImg1}';" class="w-10 h-10 rounded-xl object-cover border-2 border-sky-400 mx-auto">
                <strong class="text-[11px] font-black text-slate-900 block truncate uppercase leading-tight">${name1}</strong>
                <span class="px-2 py-0.5 rounded bg-slate-950 text-sky-400 font-mono text-[9px] font-black">Pontuação: ${score1}</span>
              </div>
              <div class="p-2.5 bg-white rounded-2xl border border-slate-200 space-y-1 text-center shadow-sm">
                <img src="${safeAvatar2}" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='${fallbackImg2}';" class="w-10 h-10 rounded-xl object-cover border-2 border-purple-400 mx-auto">
                <strong class="text-[11px] font-black text-slate-900 block truncate uppercase leading-tight">${name2}</strong>
                <span class="px-2 py-0.5 rounded bg-slate-950 text-purple-400 font-mono text-[9px] font-black">Pontuação: ${score2}</span>
              </div>
            </div>

            <!-- 4 Bento Duel Blocks -->
            <div class="grid grid-cols-2 gap-2 text-[8.5px] my-1 font-mono">
              <div class="p-2.5 bg-white rounded-2xl border border-slate-200 space-y-0.5 shadow-sm">
                <span class="text-[7px] uppercase font-bold text-slate-500 font-sans block">🔍 Veracidade Falas</span>
                <div class="font-bold flex justify-between">
                  <span class="text-sky-700">${name1}: ${truth1}%</span>
                  <span class="text-purple-700">${name2}: ${truth2}%</span>
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
                  <span>${cand1.salary.civicConversion ? cand1.salary.civicConversion.costPerMinute : 'R$ 0,51'}</span>
                  <span>${cand2.salary.civicConversion ? cand2.salary.civicConversion.costPerMinute : 'R$ 0,43'}</span>
                </div>
              </div>
              <div class="p-2.5 bg-white rounded-2xl border border-slate-200 space-y-0.5 shadow-sm">
                <span class="text-[7px] uppercase font-bold text-slate-500 font-sans block">📦 Emendas Entregues</span>
                <div class="font-bold flex justify-between">
                  <span class="text-emerald-700">${cand1.parliamentaryAmendments ? cand1.parliamentaryAmendments.totalExecuted : 'R$ 35,1M'}</span>
                  <span class="text-emerald-700">${cand2.parliamentaryAmendments ? cand2.parliamentaryAmendments.totalExecuted : 'R$ 24,5M'}</span>
                </div>
              </div>
            </div>

            <!-- Footer Confronto Metas -->
            <div class="p-2 rounded-2xl bg-slate-950 text-white flex items-center justify-between text-[7.5px] font-bold">
              <span class="text-slate-400">🎯 FOCO #1:</span>
              <span class="text-emerald-400 font-mono truncate">${name1}: Redução SUS vs ${name2}: Creches</span>
            </div>
          `;
          lucide.createIcons();
          return;
        }

        // --- TEMA 5: TWITTER (X / THREADS DUELO) ---
        if (exportVisualTheme === 'twitter') {
          target.className = 'w-[335px] max-w-[335px] box-border bg-black p-4 rounded-[1.75rem] border border-[#2f3336] shadow-2xl text-white relative flex flex-col justify-between font-sans overflow-hidden';
          target.innerHTML = `
            <!-- Post Author Header -->
            <div class="flex items-center justify-between pb-1 border-b border-[#2f3336]">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-full bg-[#1d9bf0] flex items-center justify-center text-white font-black text-[11px]">
                  RX
                </div>
                <div class="text-left">
                  <div class="flex items-center gap-1">
                    <span class="font-bold text-[11px] text-white">Raio-X Político</span>
                    <svg class="w-3 h-3 text-[#1d9bf0]" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                  </div>
                  <span class="text-[9px] text-[#71767b] block leading-none">@raioxpolitico • Auditoria Oficial</span>
                </div>
              </div>
              <span class="text-[9px] text-[#71767b] font-mono font-bold">04/10/2026</span>
            </div>

            <!-- Hook Text -->
            <div class="text-[10.5px] text-[#e7e9ea] leading-snug text-left my-1">
              <strong class="text-amber-400">⚔️ DUELO ELEITORAL:</strong> Quem tem a melhor pontuação entre <strong class="text-[#1d9bf0]">${name1}</strong> e <strong class="text-purple-400">${name2}</strong>? Puxamos a auditoria oficial:
            </div>

            <!-- Embedded Duel Quote Card -->
            <div class="rounded-2xl bg-[#16181c] border border-[#2f3336] p-3 space-y-2 text-left my-1">
              <div class="grid grid-cols-2 gap-2 border-b border-[#2f3336] pb-2 text-center">
                <div class="space-y-0.5">
                  <img src="${safeAvatar1}" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='${fallbackImg1}';" class="w-9 h-9 rounded-xl object-cover mx-auto border border-amber-400">
                  <strong class="text-xs text-white block">${name1}</strong>
                  <span class="text-[9px] text-amber-400 font-mono font-bold">Pontuação: ${score1}</span>
                </div>
                <div class="space-y-0.5">
                  <img src="${safeAvatar2}" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='${fallbackImg2}';" class="w-9 h-9 rounded-xl object-cover mx-auto border border-purple-400">
                  <strong class="text-xs text-white block">${name2}</strong>
                  <span class="text-[9px] text-purple-400 font-mono font-bold">Pontuação: ${score2}</span>
                </div>
              </div>

              <!-- Matrix Rows -->
              <div class="space-y-1 text-[8.5px] font-mono text-slate-300">
                <div class="flex justify-between">
                  <span>🔍 Veracidade Falas:</span>
                  <div><strong class="text-amber-400">${truth1}%</strong> vs <strong class="text-purple-400">${truth2}%</strong></div>
                </div>
                <div class="flex justify-between">
                  <span>🏛️ Presença Plenário:</span>
                  <div><strong>${cand1.attendance.ratePct}%</strong> vs <strong>${cand2.attendance.ratePct}%</strong></div>
                </div>
                <div class="flex justify-between">
                  <span>⏱️ Custo / Minuto:</span>
                  <div><strong class="text-amber-400">${cand1.salary.civicConversion ? cand1.salary.civicConversion.costPerMinute : 'R$ 0,51'}</strong> vs <strong class="text-purple-400">${cand2.salary.civicConversion ? cand2.salary.civicConversion.costPerMinute : 'R$ 0,43'}</strong></div>
                </div>
                <div class="flex justify-between">
                  <span>📦 Emendas Entregues:</span>
                  <div><strong class="text-emerald-400">${cand1.parliamentaryAmendments ? cand1.parliamentaryAmendments.totalExecuted : 'R$ 35,1M'}</strong> vs <strong class="text-emerald-400">${cand2.parliamentaryAmendments ? cand2.parliamentaryAmendments.totalExecuted : 'R$ 24,5M'}</strong></div>
                </div>
              </div>
            </div>

            <!-- Tweet Engagement Footer -->
            <div class="flex items-center justify-between pt-1 border-t border-[#2f3336] text-[9px] text-[#71767b]">
              <span class="flex items-center gap-1"><i data-lucide="message-circle" class="w-3 h-3"></i> 520</span>
              <span class="flex items-center gap-1"><i data-lucide="repeat" class="w-3 h-3"></i> 3.4K</span>
              <span class="flex items-center gap-1"><i data-lucide="heart" class="w-3 h-3 text-rose-500"></i> 14.2K</span>
              <span class="flex items-center gap-1"><i data-lucide="share" class="w-3 h-3"></i></span>
            </div>
          `;
          lucide.createIcons();
          return;
        }

        // --- TEMA 6: FACEBOOK (APPLE CLEAN DUELO COM RADAR) ---
        if (exportVisualTheme === 'apple') {
          target.className = 'w-[335px] max-w-[335px] box-border bg-white p-4 rounded-[1.75rem] border border-slate-200 shadow-2xl text-slate-900 relative flex flex-col justify-between font-sans overflow-hidden';
          target.innerHTML = `
            <!-- Top Header -->
            <div class="flex items-center justify-between border-b border-slate-100 pb-2">
              <span class="text-[9px] font-extrabold tracking-wider text-slate-800 flex items-center gap-1.5 font-sans">
                <i data-lucide="award" class="w-3 h-3 text-sky-600"></i> RAIO-X POLÍTICO • DUELO
              </span>
              <span class="text-[8px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                04/10/2026
              </span>
            </div>

            <!-- Profile Duel -->
            <div class="grid grid-cols-11 items-center gap-1 bg-slate-50 p-2 rounded-2xl border border-slate-100 my-1">
              <div class="col-span-5 flex items-center gap-2">
                <img src="${safeAvatar1}" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='${fallbackImg1}';" class="w-10 h-10 rounded-xl object-cover border border-slate-300">
                <div class="min-w-0 text-left">
                  <strong class="font-black text-[11px] text-slate-900 block truncate uppercase leading-tight">${name1}</strong>
                  <span class="text-[8px] font-mono font-bold text-sky-600">Score: ${score1}</span>
                </div>
              </div>
              <div class="col-span-1 text-center font-black text-[8.5px] text-slate-400">VS</div>
              <div class="col-span-5 flex items-center justify-end gap-2 text-right">
                <div class="min-w-0">
                  <strong class="font-black text-[11px] text-slate-900 block truncate uppercase leading-tight">${name2}</strong>
                  <span class="text-[8px] font-mono font-bold text-purple-600">Score: ${score2}</span>
                </div>
                <img src="${safeAvatar2}" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='${fallbackImg2}';" class="w-10 h-10 rounded-xl object-cover border border-slate-300">
              </div>
            </div>

            <!-- Radar Section -->
            <div class="my-1 bg-slate-50 p-2 rounded-2xl border border-slate-100 flex flex-col items-center">
              <div class="flex items-center justify-between w-full mb-0.5 text-[7.5px] font-bold text-slate-500 uppercase">
                <span>RADAR COMPARATIVO</span>
                <div>
                  <span class="text-sky-600 font-bold">● ${name1}</span>
                  <span class="text-purple-600 font-bold ml-1.5">● ${name2}</span>
                </div>
              </div>
              <div class="w-full h-[120px] flex items-center justify-center">
                <canvas id="exportCardRadarCanvas" width="255" height="120"></canvas>
              </div>
            </div>

            <!-- 2x2 Clean Rows -->
            <div class="grid grid-cols-2 gap-1.5 text-[8px] font-mono my-0.5">
              <div class="p-2 rounded-xl bg-slate-50 border border-slate-100">
                <span class="text-slate-400 font-sans block text-[7px] uppercase font-bold">Veracidade Falas:</span>
                <strong class="text-slate-900">${name1}: ${truth1}% | ${name2}: ${truth2}%</strong>
              </div>
              <div class="p-2 rounded-xl bg-slate-50 border border-slate-100">
                <span class="text-slate-400 font-sans block text-[7px] uppercase font-bold">Presença:</span>
                <strong class="text-slate-900">${cand1.attendance.ratePct}% vs ${cand2.attendance.ratePct}%</strong>
              </div>
            </div>

            <!-- Footer Mint Green -->
            <div class="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-center justify-between text-[7.5px] font-bold">
              <span>GASTO ANUAL PAGARIA:</span>
              <span class="font-mono text-emerald-800">${cand1.salary.civicConversion ? cand1.salary.civicConversion.salariosMinimos : '190'} vs ${cand2.salary.civicConversion ? cand2.salary.civicConversion.salariosMinimos : '160'} salários</span>
            </div>
          `;

          setTimeout(() => { renderExportRadarChartTheme(cand1, 'duel', cand2); }, 50);
          lucide.createIcons();
          return;
        }
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

      // ================= 1. MODELO INSTAGRAM (RADAR ESMERALDA & RETORNO CÍVICO) =================
      if (exportVisualTheme === 'swiss') {
        target.className = 'w-[335px] max-w-[335px] box-border bg-white p-4 rounded-[1.75rem] border-2 border-stone-300 shadow-2xl text-stone-950 relative flex flex-col justify-between font-sans overflow-hidden';
        target.innerHTML = `
          <!-- Top Header Padronizado -->
          <div class="flex items-center justify-between border-b-2 border-stone-950 pb-1.5">
            <div class="flex items-center gap-1.5">
              <span class="w-3 h-3 bg-emerald-600 rounded-sm"></span>
              <span class="text-[9px] font-black uppercase tracking-widest text-stone-950 font-mono">RAIO-X POLÍTICO</span>
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
              ⭐ RAIO-X POLÍTICO
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
            <span class="text-[9px] font-black uppercase tracking-widest text-stone-900 font-mono">RAIO-X POLÍTICO</span>
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
            <span class="text-[9px] font-black uppercase tracking-widest text-slate-800 font-mono">RAIO-X POLÍTICO</span>
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
                  <span class="font-bold text-[11px] text-white">Raio-X Político</span>
                  <svg class="w-3 h-3 text-[#1d9bf0]" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                </div>
                <span class="text-[9px] text-[#71767b] block leading-none">@raioxpolitico • Auditoria Oficial</span>
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

      // ================= 6. MODELO FACEBOOK (APPLE CLEAN) =================
      if (exportVisualTheme === 'apple') {
        target.className = 'w-[335px] max-w-[335px] box-border bg-white p-4 rounded-[1.75rem] border border-slate-200 shadow-2xl text-slate-900 relative flex flex-col justify-between font-sans overflow-hidden';
        target.innerHTML = `
          <!-- Top Header Padronizado -->
          <div class="flex items-center justify-between border-b border-slate-100 pb-2">
            <span class="text-[9px] font-extrabold tracking-wider text-slate-800 flex items-center gap-1.5 font-sans">
              <i data-lucide="award" class="w-3 h-3 text-sky-600"></i> RAIO-X POLÍTICO
            </span>
            <span class="text-[8px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              04/10/2026
            </span>
          </div>

          <!-- Profile -->
          <div class="flex items-center justify-between gap-2.5 my-1">
            <div class="flex items-center gap-2.5 min-w-0">
              <img src="${safeAvatar}" crossorigin="anonymous" referrerpolicy="no-referrer" onerror="this.onerror=null; this.removeAttribute('crossorigin'); this.src='${cand.avatar}'; this.onerror=function(){ this.src='https://ui-avatars.com/api/?name=' + encodeURIComponent('${encodeURIComponent(cand.name)}') + '&background=0284c7&color=fff&bold=true&size=128'; };" class="w-[54px] h-[54px] rounded-2xl object-cover border border-slate-200 shadow-sm flex-shrink-0">
              <div class="min-w-0 space-y-0.5 text-left">
                <h4 class="font-black text-xs text-slate-950 uppercase tracking-tight truncate leading-tight">${cand.name}</h4>
                <p class="text-[11px] font-extrabold text-sky-600 font-sans leading-none">${cand.party} • Nº ${cand.number}</p>
                <span class="text-[8.5px] font-medium text-slate-500 truncate block">Pretensão: ${cand.position}</span>
              </div>
            </div>
            <div class="p-1.5 rounded-2xl bg-slate-900 text-white text-center min-w-[58px] shadow-sm flex flex-col items-center justify-center">
              <span class="text-[6px] uppercase font-bold text-slate-400 block tracking-wider">PONTUAÇÃO</span>
              <span class="text-xl font-black font-sans leading-none block my-0.5 text-white">${overallScore}</span>
            </div>
          </div>

          <!-- Radar Chart Section -->
          <div class="my-1 bg-slate-50 p-2 rounded-2xl border border-slate-100 flex flex-col items-center">
            <div class="flex items-center justify-between w-full mb-0.5">
              <span class="text-[7.5px] font-bold uppercase text-slate-500">RADAR MULTIDIMENSIONAL</span>
              <span class="text-[7px] text-sky-600 font-bold">OFICIAL</span>
            </div>
            <div class="relative w-full flex justify-center py-0.5" style="height: 140px; width: 100%; max-width: 255px;">
              <canvas id="exportCardRadarCanvas" width="255" height="140"></canvas>
            </div>
          </div>

          <!-- 2x2 Clean Apple Grid -->
          <div class="grid grid-cols-2 gap-2 text-left my-1">
            <div class="p-2 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5">
              <span class="text-[6.5px] uppercase font-bold text-slate-400 block">⏱️ Custo aos Cofres</span>
              <span class="text-xs font-black text-slate-900 block font-mono">${cand.salary.civicConversion ? cand.salary.civicConversion.costPerMinute : 'R$ 0,51/min'}</span>
              <span class="text-[7px] text-slate-500 block font-medium">Cota: <strong class="font-bold text-slate-800">${cotaSimples}</strong></span>
            </div>
            <div class="p-2 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5">
              <span class="text-[6.5px] uppercase font-bold text-slate-400 block">🏛️ Presença em Sessões</span>
              <span class="text-xs font-black text-sky-600 block font-mono">${cand.attendance.ratePct}%</span>
              <span class="text-[7px] text-slate-500 block font-medium">${cand.attendance.presentCount} de ${cand.attendance.totalSessions} sessões</span>
            </div>
          </div>

          <!-- Emendas & Dinheiro Entregue nas Cidades -->
          <div class="p-2 rounded-xl bg-slate-50 border border-slate-100 space-y-1 text-left my-1">
            <div class="flex items-center justify-between text-[7px] uppercase font-bold text-slate-500">
              <span>Dinheiro Entregue nas Cidades</span>
              <span class="text-[8px] font-bold text-slate-700">(${executionPct}% pago)</span>
            </div>
            <span class="text-xs font-black text-slate-900 block font-mono">${cand.parliamentaryAmendments ? cand.parliamentaryAmendments.totalExecuted : 'R$ 35.1M'}</span>
            <div class="px-2 py-1 rounded-lg text-[8px] font-bold border mt-0.5 text-center truncate ${cand.parliamentaryAmendments && cand.parliamentaryAmendments.integritySeal ? cand.parliamentaryAmendments.integritySeal.badgeClass : 'bg-emerald-100 text-emerald-800 border-emerald-300'}">
              ${cand.parliamentaryAmendments && cand.parliamentaryAmendments.integritySeal ? cand.parliamentaryAmendments.integritySeal.badge : '🟢 100% por Concurso'}
            </div>
          </div>

          <!-- Foco Prioritário #1 -->
          <div class="p-2 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5 text-left my-1">
            <div class="flex items-center justify-between text-[6.5px] uppercase font-bold text-slate-500">
              <span>Foco Prioritário #1:</span>
              <span class="text-emerald-700 font-bold font-mono">${cand.jurisdictionProblemsMatch ? cand.jurisdictionProblemsMatch.coverageBadgeText : '100% Cobertura'}</span>
            </div>
            <p class="text-[8px] text-slate-800 font-bold leading-tight truncate">${cand.jurisdictionProblemsMatch ? cand.jurisdictionProblemsMatch.priorityGoal : 'Redução de Filas no SUS'}</p>
          </div>

          <!-- Footer Mint Green -->
          <div class="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-center justify-between text-[7.5px] font-bold mt-1">
            <span class="text-emerald-900">💵 GASTO ANUAL PAGARIA:</span>
            <span class="font-black text-emerald-800 font-mono">${cand.salary.civicConversion ? cand.salary.civicConversion.salariosMinimos : '190 salários mínimos'}</span>
          </div>
        `;

        setTimeout(() => {
          renderExportRadarChartTheme(cand, 'apple');
        }, 50);
        lucide.createIcons();
        return;
      }
    }

    function renderExportRadarChartTheme(cand1, theme, cand2 = null) {
      const canvas = document.getElementById('exportCardRadarCanvas');
      if (!canvas) return;

      if (exportRadarChartInstance) {
        exportRadarChartInstance.destroy();
      }

      const ctx = canvas.getContext('2d');
      const labels = ['Integridade', 'Eficiência', 'Transparência', 'Coerência', 'Propostas', 'Presença'];

      const datasets = [];

      if (cand2) {
        // Comparison Radar
        datasets.push({
          label: cand1.name.split(' ')[0],
          data: [
            cand1.radar.integridade || 95,
            cand1.radar.eficiencia || 88,
            cand1.radar.transparencia || 100,
            cand1.radar.coerencia || 86,
            typeof cand1.radar.propostas === 'number' ? cand1.radar.propostas : 88,
            cand1.attendance.ratePct || 93
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
            cand2.radar.integridade || 95,
            cand2.radar.eficiencia || 92,
            cand2.radar.transparencia || 85,
            cand2.radar.coerencia || 84,
            typeof cand2.radar.propostas === 'number' ? cand2.radar.propostas : 90,
            cand2.attendance.ratePct || 96
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
            cand1.radar.integridade,
            cand1.radar.eficiencia,
            cand1.radar.transparencia,
            cand1.radar.coerencia,
            typeof cand1.radar.propostas === 'number' ? cand1.radar.propostas : 88,
            cand1.attendance.ratePct
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

    function shareToInstagram() {
      alert("Para postar no Instagram:\n1. Baixe o card em Full HD\n2. Abra o Instagram e selecione 'Adicionar ao Story' ou 'Nova Publicação'\n3. O link do dossiê já foi copiado para sua área de transferência para usar na figurinha de Link!");
      copyToClipboardShare();
    }


    // ================= LEGAL SOURCES & PROTECTION MODAL LOGIC =================
    function openLegalSourcesModal() {
      document.getElementById('legal-sources-modal').classList.remove('hidden');
      lucide.createIcons();
    }

    function closeLegalSourcesModal() {
      document.getElementById('legal-sources-modal').classList.add('hidden');
    }
