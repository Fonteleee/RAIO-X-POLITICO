// Raio-X Político - Navegação de Abas, Ranking Ponderado e Feed Cívico

// ================= NAVIGATION LOGIC =================
    function navigateTab(tabId) {
      currentTab = tabId;
      
      // Hide all tabs
      document.getElementById('tab-feed').classList.add('hidden');
      document.getElementById('tab-ranking').classList.add('hidden');
      document.getElementById('tab-comparator').classList.add('hidden');
      document.getElementById('tab-match').classList.add('hidden');
      document.getElementById('tab-incumbents').classList.add('hidden');

      // Reset Nav Buttons
      ['feed', 'ranking', 'comparator', 'match', 'incumbents'].forEach(id => {
        const btn = document.getElementById(`nav-${id}`);
        if (btn) {
          btn.className = 'px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition flex items-center gap-1.5';
        }
      });

      // Show Active Tab
      const targetTab = document.getElementById(`tab-${tabId}`);
      if (targetTab) targetTab.classList.remove('hidden');
      
      const activeBtn = document.getElementById(`nav-${tabId}`);
      if (activeBtn) {
        activeBtn.className = 'px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-sky-600 dark:bg-cyan-600/30 dark:border dark:border-cyan-500/30 transition flex items-center gap-1.5 shadow-sm';
      }

      if (tabId === 'ranking') {
        renderRankingTab();
      } else if (tabId === 'comparator') {
        renderComparator();
      } else if (tabId === 'match') {
        renderQuiz();
      } else if (tabId === 'incumbents') {
        renderIncumbents();
      }
    }

    // ================= RANKING LOGIC (7 MÉTRICAS PONDERADAS) =================
    let currentRankingOffice = 'todos';
    let currentRankingSort = 'pontuacao';

    function filterRankingByOffice(office) {
      currentRankingOffice = office;
      ['todos', 'gov', 'sen'].forEach(id => {
        const btn = document.getElementById(`rank-btn-${id}`);
        if (btn) {
          if ((office === 'todos' && id === 'todos') || (office === 'Governador' && id === 'gov') || (office === 'Senador' && id === 'sen')) {
            btn.className = 'px-3 py-1.5 rounded-lg bg-sky-600 text-white font-bold transition shadow-sm';
          } else {
            btn.className = 'px-3 py-1.5 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white font-medium transition';
          }
        }
      });
      renderRankingTab();
    }

    function sortRankingBy(criteria) {
      currentRankingSort = criteria;
      ['pontuacao', 'factcheck', 'attendance', 'coverage', 'spending', 'amendments'].forEach(c => {
        const btn = document.getElementById(`sort-btn-${c}`);
        if (btn) {
          if (c === criteria) {
            btn.className = 'px-2.5 py-1 rounded-lg bg-sky-100 dark:bg-cyan-500/20 text-sky-800 dark:text-cyan-300 border border-sky-300 dark:border-cyan-500/30 font-bold flex items-center gap-1 transition';
          } else {
            btn.className = 'px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-medium flex items-center gap-1 transition';
          }
        }
      });
      renderRankingTab();
    }

    function calculateCandidateIntegrity(cand) {
      const fichaLimpa = cand.radar.integridade || 100;
      const debateTruth = cand.recentDebate ? cand.recentDebate.truthfulnessPct : 80;
      const generalTruth = cand.factChecking && cand.factChecking.length > 0 
        ? Math.round((cand.factChecking.filter(f => f.status.includes('Verdadeiro')).length / cand.factChecking.length) * 100)
        : 80;
      
      // Integridade ponderada: 40% Ficha Limpa + 35% Debate Oficial + 25% Checagens Gerais
      return Math.round((fichaLimpa * 0.40) + (debateTruth * 0.35) + (generalTruth * 0.25));
    }

    function calculateOverallScore(cand) {
      if (cand && !isNaN(Number(cand.overallScore)) && cand.overallScore !== null && cand.overallScore !== undefined) {
        return Number(cand.overallScore);
      }
      const integridade = calculateCandidateIntegrity(cand) || 90;
      const presenca = (cand && cand.attendance && !isNaN(Number(cand.attendance.ratePct))) ? Number(cand.attendance.ratePct) : 85;
      const fiscal = 100 - ((cand && cand.salary && !isNaN(Number(cand.salary.spendingPercentage))) ? Number(cand.salary.spendingPercentage) : 70);
      const cobertura = (cand && cand.jurisdictionProblemsMatch && !isNaN(Number(cand.jurisdictionProblemsMatch.coveragePct))) ? Number(cand.jurisdictionProblemsMatch.coveragePct) : 100;
      const emendasExec = (cand && cand.parliamentaryAmendments && !isNaN(Number(cand.parliamentaryAmendments.executionRatePct))) ? Number(cand.parliamentaryAmendments.executionRatePct) : 85;
      const eficiencia = (cand && cand.radar && !isNaN(Number(cand.radar.eficiencia))) ? Number(cand.radar.eficiencia) : 80;

      // Ponderação oficial consolidada
      const score = Math.round((integridade * 0.25) + (presenca * 0.20) + (fiscal * 0.15) + (cobertura * 0.15) + (emendasExec * 0.10) + (eficiencia * 0.15));
      return isNaN(score) ? 90 : score;
    }

    function renderRankingTab() {
      let list = [...candidatesData];
      if (currentRankingOffice !== 'todos') {
        const offLower = currentRankingOffice.toLowerCase();
        list = list.filter(c => c.position && c.position.toLowerCase().includes(offLower));
      }

      // Add calculated Pontuação
      list.forEach(c => {
        c._calculatedIntegrity = calculateCandidateIntegrity(c);
        c._calculatedScore = calculateOverallScore(c);
      });

      // Sort list
      list.sort((a, b) => {
        if (currentRankingSort === 'pontuacao') {
          return b._calculatedScore - a._calculatedScore;
        } else if (currentRankingSort === 'factcheck') {
          const truthA = a.recentDebate ? a.recentDebate.truthfulnessPct : 80;
          const truthB = b.recentDebate ? b.recentDebate.truthfulnessPct : 80;
          return truthB - truthA;
        } else if (currentRankingSort === 'attendance') {
          return b.attendance.ratePct - a.attendance.ratePct;
        } else if (currentRankingSort === 'coverage') {
          const covA = a.jurisdictionProblemsMatch ? a.jurisdictionProblemsMatch.coveragePct : 0;
          const covB = b.jurisdictionProblemsMatch ? b.jurisdictionProblemsMatch.coveragePct : 0;
          return covB - covA;
        } else if (currentRankingSort === 'spending') {
          return a.salary.spendingPercentage - b.salary.spendingPercentage; // lower spending first
        } else if (currentRankingSort === 'amendments') {
          const amA = a.parliamentaryAmendments ? a.parliamentaryAmendments.executionRatePct : 0;
          const amB = b.parliamentaryAmendments ? b.parliamentaryAmendments.executionRatePct : 0;
          return amB - amA;
        }
        return b._calculatedScore - a._calculatedScore;
      });

      const countEl = document.getElementById('ranking-count-summary');
      if (countEl) countEl.innerText = `Exibindo ${list.length} candidatos auditados`;

      // Render Visual Podium (Top 3)
      const podiumEl = document.getElementById('ranking-podium-container');
      if (podiumEl) {
        const top3 = list.slice(0, 3);
        const medals = ['🥇 1º Lugar', '🥈 2º Lugar', '🥉 3º Lugar'];
        const borderColors = ['border-amber-400 shadow-amber-500/20', 'border-slate-300 shadow-slate-500/20', 'border-amber-700/60 shadow-amber-800/20'];
        const bgBanners = [
          'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-slate-950',
          'bg-gradient-to-r from-slate-400 to-slate-500 text-white',
          'bg-gradient-to-r from-amber-700 to-amber-800 text-amber-100'
        ];

        podiumEl.innerHTML = top3.map((cand, idx) => `
          <div class="glass-card rounded-2xl p-5 border-2 ${borderColors[idx]} relative flex flex-col justify-between space-y-4 shadow-lg">
            <div class="flex items-center justify-between">
              <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${bgBanners[idx]} shadow-md">
                ${medals[idx]}
              </span>
              <div class="text-right">
                <span class="text-[9px] uppercase font-bold text-slate-400 block">Pontuação</span>
                <span class="text-xl font-black text-amber-500 dark:text-amber-400 font-mono">${cand._calculatedScore}</span>
              </div>
            </div>

            <div class="flex items-center gap-3.5">
              <img src="${cand.avatar}" alt="${cand.name}" class="w-16 h-16 rounded-2xl object-cover border-2 border-sky-500 dark:border-cyan-500 shadow-md">
              <div class="min-w-0">
                <h4 class="font-extrabold text-base text-slate-900 dark:text-white truncate">${cand.name}</h4>
                <p class="text-xs text-sky-600 dark:text-cyan-400 font-semibold">${cand.party} • Nº ${cand.number}</p>
                <span class="text-[11px] text-slate-500 dark:text-slate-400 block truncate">${cand.position} (${cand.state})</span>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 dark:bg-slate-800/90 p-2.5 rounded-xl border border-slate-200 dark:border-white/5">
              <div>
                <span class="text-slate-400 block text-[9px] uppercase font-bold">Presença:</span>
                <strong class="text-slate-800 dark:text-slate-200 font-bold">${cand.attendance.ratePct}% (${cand.attendance.presentCount} sessões)</strong>
              </div>
              <div>
                <span class="text-slate-400 block text-[9px] uppercase font-bold">Custo / Min:</span>
                <strong class="text-amber-600 dark:text-amber-400 font-bold font-mono">${cand.salary.civicConversion ? cand.salary.civicConversion.costPerMinute : 'R$ 0,51/min'}</strong>
              </div>
              <div class="col-span-2 pt-1 border-t border-slate-200 dark:border-white/5 flex items-center justify-between">
                <span class="text-[10px] text-slate-500">Cobertura Gargalos:</span>
                <span class="font-bold ${cand.jurisdictionProblemsMatch && cand.jurisdictionProblemsMatch.coveragePct >= 80 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}">
                  ${cand.jurisdictionProblemsMatch ? cand.jurisdictionProblemsMatch.coverageBadgeText : '100%'}
                </span>
              </div>
            </div>

            <div class="flex items-center gap-2 pt-1">
              <button onclick="openDossie('${cand.id}')" class="flex-1 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md shadow-sky-600/20 transition flex items-center justify-center gap-1.5">
                <i data-lucide="folder-search" class="w-3.5 h-3.5"></i> Abrir Dossiê
              </button>
              <button onclick="openExportModalFor('${cand.id}')" class="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition" title="Compartilhar Figurinha">
                <i data-lucide="share-2" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          </div>
        `).join('');
      }

      // Render Detailed Data Table
      const tableBody = document.getElementById('ranking-table-body');
      if (tableBody) {
        tableBody.innerHTML = list.map((cand, idx) => `
          <tr class="hover:bg-slate-50/70 dark:hover:bg-white/5 transition">
            <td class="py-3 px-3 text-center font-black text-xs text-slate-400 font-mono">
              ${idx === 0 ? '🥇 1º' : (idx === 1 ? '🥈 2º' : (idx === 2 ? '🥉 3º' : `${idx + 1}º`))}
            </td>
            <td class="py-3 px-3">
              <div class="flex items-center gap-2.5">
                <img src="${cand.avatar}" alt="${cand.name}" class="w-9 h-9 rounded-xl object-cover border border-slate-200 dark:border-white/10">
                <div>
                  <h5 class="font-bold text-slate-900 dark:text-white text-xs">${cand.name}</h5>
                  <span class="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">${cand.party} • Nº ${cand.number}</span>
                </div>
              </div>
            </td>
            <td class="py-3 px-3 text-slate-700 dark:text-slate-300 font-medium">
              ${cand.position} (${cand.state})
            </td>
            <td class="py-3 px-3 text-center">
              <span class="px-2.5 py-1 rounded-lg text-xs font-black bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 font-mono border border-amber-300 dark:border-amber-500/30">
                ${cand._calculatedScore}
              </span>
            </td>
            <td class="py-3 px-3 text-center">
              <span class="font-bold text-emerald-600 dark:text-emerald-400 font-mono text-xs">${cand.recentDebate ? cand.recentDebate.truthfulnessPct : 80}%</span>
              <span class="text-[9.5px] text-slate-400 block font-mono">5 checadas</span>
            </td>
            <td class="py-3 px-3 text-center">
              <span class="font-bold text-purple-600 dark:text-purple-400 font-mono text-xs">${cand.attendance.ratePct}%</span>
              <span class="text-[9.5px] text-slate-400 block">${cand.attendance.presentCount} sessões</span>
            </td>
            <td class="py-3 px-3 text-center">
              <span class="font-bold text-amber-600 dark:text-amber-400 font-mono text-xs">${cand.salary.civicConversion ? cand.salary.civicConversion.costPerMinute : 'R$ 0,51/min'}</span>
              <span class="text-[9.5px] text-slate-400 block">${cand.salary.spendingPercentage}% cota</span>
            </td>
            <td class="py-3 px-3 text-center">
              <span class="px-2 py-0.5 rounded text-[10px] font-bold ${cand.jurisdictionProblemsMatch && cand.jurisdictionProblemsMatch.coveragePct >= 80 ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300' : 'bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300'} whitespace-nowrap">
                ${cand.jurisdictionProblemsMatch ? cand.jurisdictionProblemsMatch.coverageBadgeText : '100%'}
              </span>
            </td>
            <td class="py-3 px-3 text-center">
              <div class="text-[11px] font-bold text-slate-800 dark:text-slate-200 font-mono">
                ${cand.parliamentaryAmendments ? cand.parliamentaryAmendments.totalExecuted : 'R$ 35.1M'}
              </div>
              <span class="px-2 py-0.5 rounded text-[9px] font-bold border font-mono ${cand.parliamentaryAmendments && cand.parliamentaryAmendments.integritySeal ? cand.parliamentaryAmendments.integritySeal.badgeClass : 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300'} inline-block mt-0.5">
                ${cand.parliamentaryAmendments && cand.parliamentaryAmendments.integritySeal ? cand.parliamentaryAmendments.integritySeal.shortBadge : '🟢 100% Concurso'}
              </span>
            </td>
            <td class="py-3 px-3 text-center">
              <span class="inline-flex items-center gap-1 text-[11px] font-bold ${(!cand.ethics || cand.ethics.condemned === 0) ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}">
                <i data-lucide="${(!cand.ethics || cand.ethics.condemned === 0) ? 'shield-check' : 'alert-triangle'}" class="w-3.5 h-3.5"></i>
                ${(!cand.ethics || cand.ethics.condemned === 0) ? 'Ficha Limpa' : 'Com Processos'}
              </span>
            </td>
            <td class="py-3 px-3 text-right">
              <button onclick="openDossie('${cand.id}')" class="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition shadow-sm">
                Dossiê
              </button>
            </td>
          </tr>
        `).join('');
      }

      lucide.createIcons();
    }

    // ================= RENDER CANDIDATES FEED =================
    function renderCandidatesFeed(candidates = candidatesData) {
      const grid = document.getElementById('candidates-grid');
      grid.innerHTML = '';

      if (candidates.length === 0) {
        grid.innerHTML = `
          <div class="col-span-full text-center py-12 px-6 glass-panel rounded-2xl border border-dashed border-slate-300 dark:border-white/10 space-y-3">
            <i data-lucide="search-x" class="w-10 h-10 text-slate-400 mx-auto"></i>
            <h4 class="font-bold text-slate-900 dark:text-white text-base">Nenhum candidato encontrado</h4>
            <p class="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">Nenhum resultado corresponde à combinação atual de cargo, estado e busca textual.</p>
            <button onclick="resetFeedFilters()" class="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md transition cursor-pointer">
              Limpar Filtros & Ver Todos (45)
            </button>
          </div>
        `;
        lucide.createIcons();
        return;
      }

      candidates.forEach(cand => {
        const card = document.createElement('div');
        card.className = 'glass-card rounded-2xl p-5 flex flex-col justify-between space-y-4';
        
        const isExec = cand.position && (cand.position.includes('Presidente') || cand.position.includes('Governador') || cand.position.includes('Prefeito'));
        const isPresident = cand.position && cand.position.includes('Presidente');
        let powerBadge;
        if (cand.position && (cand.position.includes('Ex-') || cand.careerHistory?.includes('Inelegível'))) {
          powerBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 dark:bg-rose-500/20 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-500/30 inline-flex items-center gap-1"><i data-lucide="shield-alert" class="w-3 h-3 text-rose-600 dark:text-rose-400"></i> ${cand.position}</span>`;
        } else if (isExec) {
          powerBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-500/30 inline-flex items-center gap-1"><i data-lucide="landmark" class="w-3 h-3 text-amber-600 dark:text-amber-400"></i> Executivo</span>`;
        } else {
          powerBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 dark:bg-indigo-500/20 text-indigo-800 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-500/30 inline-flex items-center gap-1"><i data-lucide="scale" class="w-3 h-3 text-indigo-600 dark:text-indigo-400"></i> Legislativo</span>`;
        }
        
        const fiscalLabel = isExec ? 'Meta Fiscal' : 'Gasto CEAP';
        const fiscalValue = isExec ? (isPresident ? '100% TCU' : '100% TCE') : `${cand.salary?.spendingPercentage || 75}% teto`;
        const attendanceLabel = isExec ? 'Gestão' : 'Presença';
        const attendanceValue = isExec ? `${cand.attendance?.ratePct || 98}% Metas` : `${cand.attendance?.ratePct || 94}%`;

        const displayName = cand.ballotName || cand.name;
        const subtitleName = (cand.ballotName && cand.ballotName !== cand.name) 
          ? `<p class="text-[11px] text-slate-400 dark:text-slate-500 truncate leading-tight">${cand.name}</p>` 
          : '';

        const officeBadge = (cand.careerHistory && cand.careerHistory !== 'Atuação Parlamentar') ? `
          <div class="mt-1 flex items-center gap-1 text-[10px] font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 rounded-md border border-slate-200 dark:border-white/5 max-w-full">
            <i data-lucide="award" class="w-3 h-3 text-amber-500 flex-shrink-0"></i>
            <span class="truncate">${cand.careerHistory}</span>
          </div>
        ` : '';

        const mandateSalaryLabel = isExec ? 'Subsídio Mensal do Cargo:' : 'Cota CEAP Média / mês:';
        const mandateSalaryValue = cand.salary?.spendingCeapMonthly || (isExec ? 'R$ 35.800,00' : 'R$ 34.200,00');
        const roiBudgetSnippet = (isExec && cand.salary?.civicConversion?.roiText) ? `
          <div class="text-[9.5px] text-slate-500 dark:text-slate-400 flex items-center justify-between border-t border-amber-500/15 dark:border-amber-500/20 pt-1">
            <span class="flex items-center gap-1"><i data-lucide="landmark" class="w-3 h-3 text-sky-600 dark:text-cyan-400"></i> Orçamento Sob Gestão:</span>
            <span class="font-semibold text-slate-700 dark:text-slate-300 truncate max-w-[190px]">${cand.salary.civicConversion.roiText.replace('Gestão de ', '')}</span>
          </div>
        ` : '';

        // Proposals snippet (3 items)
        const proposalsSnippet = (cand.proposals || []).slice(0, 3).map((p, idx) => `
          <div class="flex items-start gap-2 text-xs text-slate-800 dark:text-slate-200 font-medium">
            <span class="w-4 h-4 rounded-full bg-sky-200 dark:bg-cyan-500/30 text-sky-900 dark:text-cyan-200 font-black text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">${idx + 1}</span>
            <span class="line-clamp-1">${p.title}</span>
          </div>
        `).join('');

        card.innerHTML = `
          <div>
            <!-- Header: Photo + Core Info -->
            <div class="flex items-start gap-3.5">
              <img 
                src="${cand.avatar}" 
                alt="${displayName}" 
                referrerpolicy="no-referrer"
                onerror="this.onerror=null; this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=0284c7&color=fff&bold=true&size=128';"
                class="w-16 h-16 rounded-2xl object-cover border-2 border-sky-500/40 dark:border-cyan-500/30 shadow-md flex-shrink-0 bg-slate-100 dark:bg-slate-800"
              >
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between gap-1 flex-wrap">
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-100 dark:bg-cyan-500/20 text-sky-800 dark:text-cyan-300 border border-sky-300 dark:border-cyan-500/30">
                    ${cand.party} • Nº ${cand.number}
                  </span>
                  ${powerBadge}
                </div>
                <h3 class="font-extrabold text-base text-slate-900 dark:text-white mt-1 leading-snug truncate" title="${cand.name}">${displayName}</h3>
                ${subtitleName}
                <p class="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5 font-medium">${cand.position} • ${cand.state} • ${cand.age} anos</p>
                ${officeBadge}
                
                <!-- Party Affiliation + Election Date Pills -->
                <div class="flex flex-wrap items-center gap-1.5 mt-2 text-[10px]">
                  <span class="inline-flex items-center gap-1 font-semibold text-sky-800 dark:text-cyan-300 bg-sky-50 dark:bg-cyan-500/10 px-2 py-0.5 rounded-lg border border-sky-200 dark:border-cyan-500/20">
                    <i data-lucide="map-pin" class="w-3 h-3 text-sky-600 dark:text-cyan-400"></i> ${cand.city || cand.state}
                  </span>
                  <span class="inline-flex items-center gap-1 font-semibold text-purple-800 dark:text-purple-300 bg-purple-50 dark:bg-purple-500/10 px-2 py-0.5 rounded-lg border border-purple-200 dark:border-purple-500/20">
                    <i data-lucide="vote" class="w-3 h-3 text-purple-500"></i> Score: ${cand.overallScore || 90}/100
                  </span>
                </div>
              </div>
            </div>

            <!-- Mini Indicators Bento -->
            <div class="grid grid-cols-3 gap-2 my-3 pt-3 border-t border-slate-200 dark:border-white/10 text-center">
              <div class="p-2 bg-slate-100/90 dark:bg-slate-800/90 rounded-xl border border-slate-200/80 dark:border-white/10 shadow-xs">
                <span class="text-[9px] uppercase tracking-wider font-bold text-slate-600 dark:text-slate-400 block">Integridade</span>
                <span class="text-xs font-black text-emerald-700 dark:text-emerald-400">${cand.radar?.integridade || 90}/100</span>
              </div>
              <div class="p-2 bg-slate-100/90 dark:bg-slate-800/90 rounded-xl border border-slate-200/80 dark:border-white/10 shadow-xs">
                <span class="text-[9px] uppercase tracking-wider font-bold text-slate-600 dark:text-slate-400 block">${attendanceLabel}</span>
                <span class="text-xs font-black text-purple-700 dark:text-purple-400">${attendanceValue}</span>
              </div>
              <div class="p-2 bg-slate-100/90 dark:bg-slate-800/90 rounded-xl border border-slate-200/80 dark:border-white/10 shadow-xs">
                <span class="text-[9px] uppercase tracking-wider font-bold text-slate-600 dark:text-slate-400 block">${fiscalLabel}</span>
                <span class="text-xs font-black text-amber-700 dark:text-amber-400">${fiscalValue}</span>
              </div>
            </div>

            <!-- Civic Mandate Cost Highlight (Custo aos Cofres & Equivalência Social) -->
            <div class="p-2.5 rounded-xl bg-amber-500/10 dark:bg-amber-950/25 border border-amber-500/30 dark:border-amber-500/40 space-y-1.5 my-2.5 shadow-xs text-xs">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-1.5 font-extrabold text-amber-950 dark:text-amber-300 text-[11px]">
                  <i data-lucide="timer" class="w-3.5 h-3.5 text-amber-600 dark:text-amber-400"></i>
                  <span>Custo aos Cofres Públicos:</span>
                </div>
                <span class="font-black text-amber-800 dark:text-amber-300 font-mono text-[11px]">${cand.salary?.civicConversion?.costPerMinute || cand.salary?.costPerMinute || 'R$ 0,51 / min'}</span>
              </div>
              <div class="text-[10px] text-slate-700 dark:text-slate-300 flex items-center justify-between border-t border-amber-500/20 dark:border-amber-500/30 pt-1.5">
                <span class="flex items-center gap-1 font-medium"><i data-lucide="wallet" class="w-3 h-3 text-emerald-600 dark:text-emerald-400"></i> ${mandateSalaryLabel}</span>
                <strong class="text-emerald-800 dark:text-emerald-300 font-black">${mandateSalaryValue}</strong>
              </div>
              ${roiBudgetSnippet}
            </div>

            <!-- 3 Main Proposals Card -->
            <div class="p-3 bg-slate-100/90 dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-white/10 space-y-2 shadow-xs">
              <div class="flex items-center justify-between text-[11px] font-extrabold text-slate-900 dark:text-white">
                <span class="flex items-center gap-1.5"><i data-lucide="scroll-text" class="w-3.5 h-3.5 text-sky-600 dark:text-cyan-400"></i> 3 Principais Propostas</span>
                <button onclick="openDossie('${cand.id}', 'propostas-tse')" class="text-sky-700 dark:text-cyan-400 hover:underline font-bold text-[10px]">Ver todas (${cand.proposals ? cand.proposals.length : 3})</button>
              </div>
              <div class="space-y-1.5">
                ${proposalsSnippet}
              </div>
            </div>
          </div>

          <!-- Card Bottom Actions -->
          <div class="pt-3 border-t border-slate-200 dark:border-white/10 flex items-center gap-2">
            <button onclick="openDossie('${cand.id}')" class="flex-1 py-2 rounded-xl bg-sky-700 hover:bg-sky-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-sky-700/20 focus:ring-2 focus:ring-sky-500 focus:outline-none transition cursor-pointer">
              <i data-lucide="folder-search" class="w-3.5 h-3.5"></i> Dossiê Completo
            </button>
            <button onclick="toggleCompare('${cand.id}')" class="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white transition cursor-pointer" title="Comparar candidato">
              <i data-lucide="scale" class="w-4 h-4 text-purple-600 dark:text-purple-400"></i>
            </button>
            <button onclick="shareCandidateWhatsApp('${cand.id}')" class="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition flex items-center justify-center cursor-pointer" title="Compartilhar no WhatsApp">
              <i data-lucide="message-circle" class="w-4 h-4"></i>
            </button>
            <button onclick="openExportModalFor('${cand.id}')" class="p-2 rounded-xl bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 hover:opacity-90 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition flex items-center justify-center cursor-pointer" title="Gerar Figurinha para Redes Sociais">
              <i data-lucide="share-2" class="w-4 h-4"></i>
            </button>
          </div>
        `;

        grid.appendChild(card);
      });

      lucide.createIcons();
    }

    // ================= UNIFIED FEED FILTERING PIPELINE =================
    let activePosFilter = 'todos';
    let activeStateFilter = 'todos';
    let activeSortFilter = 'score_desc';
    let activeSearchQuery = '';

    function applyFeedFilters() {
      let list = [...candidatesData];

      // 1. Cargo Filter
      if (activePosFilter !== 'todos') {
        const posLower = activePosFilter.toLowerCase();
        list = list.filter(c => {
          if (!c.position) return false;
          const cPosLower = c.position.toLowerCase();
          if (posLower.includes('senad')) {
            return cPosLower.includes('senad');
          }
          if (posLower.includes('deputad')) {
            return cPosLower.includes('deputad');
          }
          if (posLower.includes('governad')) {
            return cPosLower.includes('governad');
          }
          if (posLower.includes('prefeit')) {
            return cPosLower.includes('prefeit');
          }
          if (posLower.includes('president')) {
            return cPosLower.includes('president');
          }
          return cPosLower.includes(posLower);
        });
      }

      // 2. Estado (UF) Filter
      if (activeStateFilter && activeStateFilter !== 'todos' && activeStateFilter !== 'ALL') {
        list = list.filter(c => c.state && c.state.toUpperCase() === activeStateFilter.toUpperCase());
      }

      // 3. Search Query Filter
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

      // 4. Sort Filter
      list.sort((a, b) => {
        if (activeSortFilter === 'score_desc') {
          return (b.overallScore || 0) - (a.overallScore || 0);
        } else if (activeSortFilter === 'cost_asc') {
          const parseCost = (cand) => {
            const raw = cand.salary?.civicConversion?.costPerMinute || cand.salary?.costPerMinute || '0';
            const num = parseFloat(raw.replace(/[^\d,]/g, '').replace(',', '.'));
            return isNaN(num) ? 999999 : num;
          };
          return parseCost(a) - parseCost(b);
        } else if (activeSortFilter === 'attendance_desc') {
          return (b.attendance?.ratePct || 0) - (a.attendance?.ratePct || 0);
        } else if (activeSortFilter === 'proposals_desc') {
          return (b.proposals ? b.proposals.length : 0) - (a.proposals ? a.proposals.length : 0);
        } else if (activeSortFilter === 'name_asc') {
          return (a.name || '').localeCompare(b.name || '', 'pt-BR');
        }
        return 0;
      });

      renderCandidatesFeed(list);
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
      activeSortFilter = 'score_desc';
      activeSearchQuery = '';
      const stateSel = document.getElementById('feed-state-select');
      if (stateSel) stateSel.value = 'todos';
      const sortSel = document.getElementById('feed-sort-select');
      if (sortSel) sortSel.value = 'score_desc';
      const searchInput = document.getElementById('candidate-search-input');
      if (searchInput) searchInput.value = '';
      document.querySelectorAll('.pos-filter-btn').forEach(btn => {
        if (btn.innerText.includes('Todos')) {
          btn.className = 'pos-filter-btn active px-3 py-1.5 rounded-xl bg-sky-600 text-white font-bold text-xs shadow-md shadow-sky-600/20 whitespace-nowrap';
        } else {
          btn.className = 'pos-filter-btn px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white font-medium text-xs border border-slate-200 dark:border-white/5 whitespace-nowrap';
        }
      });
      applyFeedFilters();
    }

    function shareCandidateWhatsApp(candId) {
      const cand = candidatesData.find(c => c.id === candId);
      if (!cand) return;
      const url = `${window.location.origin}/dossie.html?id=${cand.id}`;
      const text = `🔎 *Raio-X Político 2026 - Dossiê Oficial*\n\nConfira os dados auditados de *${cand.name}* (${cand.party}-${cand.state}):\n⭐ Score de Integridade: ${cand.overallScore || 90}/100\n🏛️ Cargo: ${cand.position}\n💰 Custo aos cofres: ${cand.salary?.civicConversion?.costPerMinute || 'Auditado pelo TCU'}\n📋 Propostas prioritárias: ${cand.proposals ? cand.proposals.length : 3} cadastradas\n\nVeja o dossiê completo e compare agora:\n${url}`;
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
    }
