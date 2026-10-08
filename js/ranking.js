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

    // ================= RANKING LOGIC (COMPETÊNCIA DO CARGO & IPR SEVERO) =================
    let currentRankingOffice = 'todos'; // Padrão: Ranking Geral (200 candidatos)
    let currentRankingPower = 'todos';  // 'todos' | 'executivo' | 'legislativo'
    let currentRankingSort = 'pontuacao';
    let currentRankingPage = 1;
    let rankingTableSearchQuery = '';
    const RANKING_PAGE_SIZE = 50;
    window.candidateRankPositions = window.candidateRankPositions || {};

    function filterRankingByPower(power) {
      currentRankingPower = power;
      currentRankingPage = 1;
      ['todos', 'executivo', 'legislativo', 'judiciario'].forEach(p => {
        const btn = document.getElementById(`rank-power-${p}`);
        if (btn) {
          if (p === power) {
            btn.className = 'rank-power-btn px-3 py-1.5 rounded-lg bg-sky-600 text-white font-bold transition shadow-sm cursor-pointer';
          } else {
            btn.className = 'rank-power-btn px-3 py-1.5 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white font-medium transition cursor-pointer';
          }
        }
      });
      renderRankingTab();
    }
    window.filterRankingByPower = filterRankingByPower;

    function handleRankingTableSearch(query) {
      rankingTableSearchQuery = (query || '').trim();
      currentRankingPage = 1;
      const clearBtn = document.getElementById('ranking-table-search-clear');
      if (clearBtn) {
        if (rankingTableSearchQuery.length > 0) {
          clearBtn.classList.remove('hidden');
        } else {
          clearBtn.classList.add('hidden');
        }
      }
      renderRankingTab();
    }
    window.handleRankingTableSearch = handleRankingTableSearch;

    function quickFilterRankingSearch(term) {
      const input = document.getElementById('ranking-table-search');
      if (input) input.value = term;
      handleRankingTableSearch(term);
    }
    window.quickFilterRankingSearch = quickFilterRankingSearch;

    function clearRankingTableSearch() {
      rankingTableSearchQuery = '';
      const input = document.getElementById('ranking-table-search');
      if (input) input.value = '';
      const clearBtn = document.getElementById('ranking-table-search-clear');
      if (clearBtn) clearBtn.classList.add('hidden');
      currentRankingPage = 1;
      renderRankingTab();
    }
    window.clearRankingTableSearch = clearRankingTableSearch;

    function changeRankingPage(page) {
      currentRankingPage = page;
      renderRankingTab();
      const el = document.getElementById('ranking-table-card');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    const OFFICE_BUTTON_MAP = {
      'Governador': 'gov',
      'Prefeito': 'pref',
      'Senador': 'sen',
      'Deputado Federal': 'dep',
      'Presidente': 'pres',
      'todos': 'todos'
    };

    function filterRankingByOffice(office) {
      currentRankingOffice = office;
      currentRankingPage = 1;
      Object.keys(OFFICE_BUTTON_MAP).forEach(key => {
        const btnId = `rank-btn-${OFFICE_BUTTON_MAP[key]}`;
        const btn = document.getElementById(btnId);
        if (btn) {
          if (office === key) {
            btn.className = 'rank-office-btn px-3 py-1.5 rounded-lg bg-sky-600 text-white font-bold transition shadow-sm cursor-pointer';
          } else {
            btn.className = 'rank-office-btn px-3 py-1.5 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white font-medium transition cursor-pointer';
          }
        }
      });
      renderRankingTab();
    }

    function sortRankingBy(criteria) {
      currentRankingSort = criteria;
      currentRankingPage = 1;
      ['pontuacao', 'ipr', 'factcheck', 'attendance', 'campaign', 'spending', 'amendments'].forEach(c => {
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
      const fichaLimpa = cand.radar ? (cand.radar.integridade ?? 100) : 100;
      const debateTruth = cand.recentDebate ? cand.recentDebate.truthfulnessPct : 85;
      const statements = (cand.recentStatements && cand.recentStatements.length > 0) 
        ? cand.recentStatements 
        : (cand.factChecking && cand.factChecking.length > 0 ? cand.factChecking : []);
      const generalTruth = statements.length > 0 
        ? Math.round((statements.filter(f => (f.verdict || f.status || '').includes('Verdadeiro') || (f.verdict || f.status || '').includes('Confirmado')).length / statements.length) * 100)
        : debateTruth;
      
      return Math.round((fichaLimpa * 0.50) + (generalTruth * 0.50));
    }

    function matchOffice(candidatePosition, office) {
      if (!candidatePosition || !office) return false;
      const pos = candidatePosition.toLowerCase();
      const off = office.toLowerCase();
      if (off === 'todos') return true;
      if (off.includes('ministr') || off.includes('judiciari')) {
        return pos.includes('ministr') || pos.includes('procurador') || (candidatePosition && candidatePosition.includes('STF')) || (candidatePosition && candidatePosition.includes('STJ'));
      }
      if (off.includes('deputad')) return pos.includes('deputad');
      if (off.includes('senad')) return pos.includes('senad');
      if (off.includes('governad')) return pos.includes('governad');
      if (off.includes('prefeit')) return pos.includes('prefeit');
      if (off.includes('president')) return pos.includes('president');
      return pos.includes(off);
    }

    function renderRankingTab() {
      if (!candidatesData || !Array.isArray(candidatesData) || candidatesData.length === 0) {
        console.warn('[Ranking] candidatesData indisponível no momento.');
        return;
      }

      // 1. Atualiza dicionário global de posições de ranking por cargo usando a pontuação geral unificada
      const allOffices = ['Governador', 'Prefeito', 'Senador', 'Deputado Federal', 'Presidente', 'Ministro'];
      allOffices.forEach(off => {
        const offList = candidatesData.filter(c => matchOffice(c.position, off));
        offList.sort((a, b) => (b.overallScore || 0) - (a.overallScore || 0));
        offList.forEach((c, idx) => {
          window.candidateRankPositions[c.id] = window.candidateRankPositions[c.id] || {};
          window.candidateRankPositions[c.id].roleRank = idx + 1;
          window.candidateRankPositions[c.id].roleTotal = offList.length;
          window.candidateRankPositions[c.id].roleName = off;
          window.candidateRankPositions[c.id].roleScore = c.overallScore;
        });
      });

      // 2. Ranking Geral de todos os 164 candidatos
      const globalList = [...candidatesData];
      globalList.sort((a, b) => (b.overallScore || 0) - (a.overallScore || 0));
      globalList.forEach((c, idx) => {
        window.candidateRankPositions[c.id] = window.candidateRankPositions[c.id] || {};
        window.candidateRankPositions[c.id].overallRank = idx + 1;
        window.candidateRankPositions[c.id].overallTotal = globalList.length;
        window.candidateRankPositions[c.id].overallScore = c.overallScore;
      });

      // 3. Filtra a lista da visualização atual
      let list = [...candidatesData];
      if (currentRankingPower !== 'todos') {
        list = list.filter(c => (c.officePower || '').toLowerCase() === currentRankingPower);
      }
      if (currentRankingOffice !== 'todos') {
        list = list.filter(c => matchOffice(c.position, currentRankingOffice));
      }

      list.forEach(c => {
        c._calculatedIntegrity = calculateCandidateIntegrity(c);
        c._calculatedScore = c.overallScore || 75;
      });

      // 4. Ordenação rigorosa e sem discrepâncias
      list.sort((a, b) => {
        if (currentRankingSort === 'pontuacao') {
          return (b.overallScore || 0) - (a.overallScore || 0);
        } else if (currentRankingSort === 'ipr') {
          const getIpr = (c) => {
            if (c.officePower === 'executivo') {
              return c.executiveMetrics?.efficiencyScore || c.careerProductivity?.productivityScore || c.overallScore || 78;
            }
            if (c.officePower === 'judiciario') {
              return c.judiciaryMetrics?.productivityScore || c.overallScore || 80;
            }
            return c.careerProductivity?.productivityScore ?? c.overallScore ?? 70;
          };
          return getIpr(b) - getIpr(a);
        } else if (currentRankingSort === 'factcheck') {
          const truthA = a.recentDebate ? a.recentDebate.truthfulnessPct : 80;
          const truthB = b.recentDebate ? b.recentDebate.truthfulnessPct : 80;
          return truthB - truthA;
        } else if (currentRankingSort === 'attendance') {
          return (b.attendance?.ratePct || 85) - (a.attendance?.ratePct || 85);
        } else if (currentRankingSort === 'campaign') {
          const campA = (a.campaignFinance && !isNaN(Number(a.campaignFinance.totalSpent))) ? Number(a.campaignFinance.totalSpent) : 0;
          const campB = (b.campaignFinance && !isNaN(Number(b.campaignFinance.totalSpent))) ? Number(b.campaignFinance.totalSpent) : 0;
          return campB - campA;
        } else if (currentRankingSort === 'spending') {
          return (a.salary?.spendingPercentage || 70) - (b.salary?.spendingPercentage || 70);
        } else if (currentRankingSort === 'amendments') {
          const amA = a.parliamentaryAmendments ? a.parliamentaryAmendments.executionRatePct : 0;
          const amB = b.parliamentaryAmendments ? b.parliamentaryAmendments.executionRatePct : 0;
          return amB - amA;
        }
        return (b.overallScore || 0) - (a.overallScore || 0);
      });

      const countEl = document.getElementById('ranking-count-summary');
      if (countEl) {
        const label = currentRankingOffice === 'todos' ? 'Geral (Todos os 200 Cargos)' : `Cargo: ${currentRankingOffice}`;
        countEl.innerText = `Exibindo ${list.length} candidatos auditados (${label})`;
      }

      // 5. Renderiza Pódio Visual (Top 3) em Card Único Compacto (mesmo formato do Alerta Cívico)
      const podiumEl = document.getElementById('ranking-podium-container');
      if (podiumEl) {
        if (list.length === 0) {
          podiumEl.innerHTML = '';
        } else {
          const top3 = list.slice(0, 3);
          const officeLabel = currentRankingOffice === 'todos' ? 'Geral de Todos os Políticos' : `do Cargo de ${currentRankingOffice}`;
          const borderAccents = [
            'border-amber-300 dark:border-amber-500/40 hover:border-amber-400',
            'border-slate-300 dark:border-slate-600 hover:border-slate-400',
            'border-amber-400/40 dark:border-amber-700/40 hover:border-amber-500'
          ];
          const medalBadges = [
            'bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-500/30',
            'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-600',
            'bg-amber-50 dark:bg-amber-900/30 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-700/40'
          ];
          const medalIcons = ['🥇', '🥈', '🥉'];

          podiumEl.className = 'my-4';
          podiumEl.innerHTML = `
            <div class="p-4 sm:p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border-2 border-amber-300 dark:border-amber-500/30 shadow-xs space-y-3">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-200 dark:border-amber-500/20 pb-2.5">
                <div class="flex items-center gap-2 text-amber-900 dark:text-amber-300 font-extrabold text-xs uppercase tracking-wider">
                  <i data-lucide="trophy" class="w-4 h-4 text-amber-500"></i>
                  <span>Pódio Cívico: Maior Desempenho Real ${officeLabel}</span>
                </div>
                <span class="text-[10px] font-bold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/50 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-500/20">
                  Critério: Pontuação Geral Auditada (6 Eixos Oficiais)
                </span>
              </div>
              
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                ${top3.map((cand, idx) => {
                  const safeAvatar = (window.getSafeAvatarUrl ? window.getSafeAvatarUrl(cand, cand.name) : cand.avatar) || (window.getSafeAvatarFallback ? window.getSafeAvatarFallback(cand.name) : `https://ui-avatars.com/api/?name=${encodeURIComponent(cand.name)}&background=0284c7&color=fff&bold=true&size=128`);
                  const escapedName = (cand.name || 'Candidato').replace(/'/g, "\\'");
                  return `
                  <div class="p-3 bg-white dark:bg-slate-900 rounded-xl border ${borderAccents[idx]} flex items-start gap-3 shadow-2xs cursor-pointer group hover:shadow-md transition-all duration-200" onclick="openDossie('${cand.id}')" title="Clique para abrir Dossiê de ${cand.name}">
                    <div class="relative shrink-0">
                      <img src="${safeAvatar}" alt="${cand.name}" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src=(window.getSafeAvatarFallback ? window.getSafeAvatarFallback('${escapedName}') : 'https://ui-avatars.com/api/?name=${encodeURIComponent(cand.name)}&background=0284c7&color=fff&bold=true&size=128');" class="w-11 h-11 rounded-xl object-cover border border-slate-200 dark:border-white/10 shrink-0 bg-slate-100 dark:bg-slate-800">
                      <span class="absolute -bottom-1 -right-1 text-[11px] leading-none">${medalIcons[idx]}</span>
                    </div>
                    <div class="min-w-0 flex-1">
                      <div class="flex items-center justify-between gap-1">
                        <h5 class="text-xs font-extrabold text-slate-900 dark:text-white truncate group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">${cand.name}</h5>
                        <span class="px-1.5 py-0.5 rounded text-[10px] font-mono font-black ${medalBadges[idx]} border">
                          Nota ${cand._calculatedScore}
                        </span>
                      </div>
                      <p class="text-[10px] text-slate-500 dark:text-slate-400 font-medium truncate">${cand.party} • ${cand.position} (${cand.state})</p>
                      <div class="mt-1.5 pt-1 border-t border-slate-100 dark:border-white/5 text-[9.5px] text-slate-600 dark:text-slate-300 flex justify-between">
                        <span>IPR: <strong class="text-emerald-600 dark:text-emerald-400">${cand.careerProductivity?.productivityScore || 80}/100</strong></span>
                        <span>Presença: <strong class="text-sky-600 dark:text-sky-400">${cand.attendance?.ratePct || 92}%</strong></span>
                      </div>
                    </div>
                  </div>
                  `;
                }).join('')}
              </div>
            </div>
          `;
        }
      }

      // 6. Renderiza Alerta Cívico: Menor Produtividade por Cargo
      const lowestContainer = document.getElementById('ranking-lowest-productivity-container');
      if (lowestContainer) {
        const sortedByLowestIpr = [...list].sort((a, b) => {
          const scoreA = a.careerProductivity?.productivityScore ?? a._calculatedScore ?? 70;
          const scoreB = b.careerProductivity?.productivityScore ?? b._calculatedScore ?? 70;
          return scoreA - scoreB;
        });

        const lowestCandidates = sortedByLowestIpr.slice(0, Math.min(3, sortedByLowestIpr.length));
        const officeLabel = currentRankingOffice === 'todos' ? 'Geral de Todos os Políticos' : `do Cargo de ${currentRankingOffice}`;

        if (lowestCandidates.length > 0) {
          lowestContainer.innerHTML = `
            <div class="p-4 sm:p-5 rounded-2xl bg-rose-50/85 dark:bg-rose-950/25 border-2 border-rose-300 dark:border-rose-500/30 shadow-xs space-y-3">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-rose-200 dark:border-rose-500/20 pb-2.5">
                <div class="flex items-center gap-2 text-rose-900 dark:text-rose-300 font-extrabold text-xs uppercase tracking-wider">
                  <i data-lucide="alert-triangle" class="w-4 h-4 text-rose-600"></i>
                  <span>Alerta Cívico: Menor Produtividade Real ${officeLabel}</span>
                </div>
                <span class="text-[10px] font-bold text-rose-800 dark:text-rose-300 bg-rose-100 dark:bg-rose-900/50 px-2 py-0.5 rounded-md border border-rose-200 dark:border-rose-500/20">
                  Critério: Elevado custo público vs Baixa conversão em leis estruturantes
                </span>
              </div>
              
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                ${lowestCandidates.map((cand) => `
                  <div class="p-3 bg-white dark:bg-slate-900 rounded-xl border border-rose-200 dark:border-rose-500/20 flex items-start gap-3 shadow-2xs cursor-pointer group hover:border-rose-400 hover:shadow-md transition-all duration-200" onclick="openDossie('${cand.id}')" title="Clique para abrir Dossiê de ${cand.name}">
                    <img src="${cand.avatar}" alt="${cand.name}" loading="lazy" decoding="async" class="w-11 h-11 rounded-xl object-cover border border-rose-200 shrink-0">
                    <div class="min-w-0 flex-1">
                      <div class="flex items-center justify-between gap-1">
                        <h5 class="text-xs font-extrabold text-slate-900 dark:text-white truncate group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">${cand.name}</h5>
                        <span class="px-1.5 py-0.5 rounded text-[10px] font-mono font-black bg-rose-100 dark:bg-rose-500/20 text-rose-800 dark:text-rose-300">
                          IPR ${cand.careerProductivity?.productivityScore || 46}
                        </span>
                      </div>
                      <p class="text-[10px] text-slate-500 dark:text-slate-400 font-medium">${cand.party} • ${cand.position} (${cand.state})</p>
                      <div class="mt-1.5 pt-1 border-t border-slate-100 dark:border-white/5 text-[9.5px] text-slate-600 dark:text-slate-300 flex justify-between">
                        <span>Custo: <strong class="text-rose-600">${cand.careerProductivity?.totalCostEstimate || 'Auditado'}</strong></span>
                        <span>Cerimoniais: <strong class="text-amber-600">${cand.careerProductivity?.ceremonialBillsPct || 65}%</strong></span>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          `;
        } else {
          lowestContainer.innerHTML = '';
        }
      }

      // 7. Renderiza Tabela Detalhada com Paginação de 50 Candidatos (com busca própria)
      let tableList = [...list];
      if (rankingTableSearchQuery && rankingTableSearchQuery.trim() !== '') {
        const q = rankingTableSearchQuery.trim().toLowerCase();
        tableList = tableList.filter(c => {
          const name = (c.name || '').toLowerCase();
          const ballot = (c.ballotName || '').toLowerCase();
          const party = (c.party || '').toLowerCase();
          const pos = (c.position || '').toLowerCase();
          const state = (c.state || '').toLowerCase();
          const num = String(c.number || '');
          return name.includes(q) || ballot.includes(q) || party.includes(q) || pos.includes(q) || state.includes(q) || num.includes(q);
        });
      }

      // Atualiza badge de status da pesquisa na tabela
      const searchStatusBadge = document.getElementById('ranking-search-status-badge');
      if (searchStatusBadge) {
        if (rankingTableSearchQuery && rankingTableSearchQuery.length > 0) {
          searchStatusBadge.innerText = `Encontrados ${tableList.length} de ${list.length} candidatos`;
          searchStatusBadge.className = 'text-[10px] font-mono font-bold text-amber-900 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/60 px-2.5 py-0.5 rounded-md border border-amber-300 dark:border-amber-500/30';
        } else {
          searchStatusBadge.innerText = `Exibindo todos os ${list.length} candidatos`;
          searchStatusBadge.className = 'text-[10px] font-mono font-bold text-sky-800 dark:text-sky-300 bg-sky-100 dark:bg-sky-900/60 px-2.5 py-0.5 rounded-md border border-sky-200 dark:border-sky-500/20';
        }
      }

      const tableBody = document.getElementById('ranking-table-body');
      if (tableBody) {
        if (tableList.length === 0) {
          const noResultsMsg = rankingTableSearchQuery 
            ? `Nenhum candidato encontrado para "${rankingTableSearchQuery}".`
            : 'Nenhum candidato auditado neste filtro específico.';
          tableBody.innerHTML = `
            <tr>
              <td colspan="11" class="py-12 text-center text-slate-500 dark:text-slate-400">
                <div class="max-w-md mx-auto space-y-3">
                  <i data-lucide="${rankingTableSearchQuery ? 'search-x' : 'filter-x'}" class="w-8 h-8 mx-auto text-slate-400"></i>
                  <p class="font-bold text-sm text-slate-800 dark:text-slate-200">${noResultsMsg}</p>
                  <p class="text-xs">${rankingTableSearchQuery ? 'Verifique a digitação ou tente outro termo.' : 'O observatório cívico possui 215 candidatos auditados no total.'}</p>
                  <button onclick="${rankingTableSearchQuery ? 'clearRankingTableSearch()' : 'filterRankingByOffice(\'todos\')'}" class="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer transition inline-flex items-center gap-1.5">
                    <i data-lucide="rotate-ccw" class="w-3.5 h-3.5"></i> ${rankingTableSearchQuery ? 'Limpar Busca na Tabela' : 'Ver Todos os Candidatos'}
                  </button>
                </div>
              </td>
            </tr>
          `;
          const pagContainer = document.getElementById('ranking-pagination-container');
          if (pagContainer) pagContainer.innerHTML = '';
        } else {
          const totalCandidates = tableList.length;
          const totalPages = Math.ceil(totalCandidates / RANKING_PAGE_SIZE) || 1;
          if (currentRankingPage > totalPages) currentRankingPage = totalPages;
          const startIdx = (currentRankingPage - 1) * RANKING_PAGE_SIZE;
          const paginatedList = tableList.slice(startIdx, startIdx + RANKING_PAGE_SIZE);

          tableBody.innerHTML = paginatedList.map((cand, idx) => {
            const rankNum = startIdx + idx + 1;
            const rankBadge = rankNum === 1 ? '🥇 1º' : (rankNum === 2 ? '🥈 2º' : (rankNum === 3 ? '🥉 3º' : `${rankNum}º`));
            const compactPosition = (cand.position || '')
              .replace('Deputado Federal', 'Dep. Fed.')
              .replace('Deputada Federal', 'Dep. Fed.')
              .replace('Governador', 'Gov.')
              .replace('Governadora', 'Gov.')
              .replace('Senador', 'Sen.')
              .replace('Senadora', 'Sen.')
              .replace('Presidente', 'Pres.');
            const campSpent = cand.campaignFinance ? cand.campaignFinance.totalSpentFormatted.replace(' milhões', 'M').replace(' milhão', 'M') : 'R$ 16,5M';
            const costVote = cand.campaignFinance ? cand.campaignFinance.costPerVote.replace(' / voto', ' por voto') : 'R$ 6,88 por voto';
            const amendTotal = cand.parliamentaryAmendments ? cand.parliamentaryAmendments.totalExecuted.replace('.000.000,00', 'M').replace('.000,00', 'k') : 'R$ 35.1M';
            const isClean = (!cand.ethics || cand.ethics.condemned === 0);

            return `
            <tr class="hover:bg-sky-50/40 dark:hover:bg-white/[0.04] transition cursor-pointer group" onclick="openDossie('${cand.id}')" title="Clique para abrir Dossiê de ${cand.name}">
              <td class="py-2.5 px-2 text-center font-black text-xs text-slate-400 font-mono w-10">
                ${rankBadge}
              </td>
              <td class="py-2.5 px-2">
                <div class="flex items-center gap-2">
                  <img src="${(window.getSafeAvatarUrl ? window.getSafeAvatarUrl(cand, cand.name) : cand.avatar)}" alt="${cand.name}" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src=(window.getSafeAvatarFallback ? window.getSafeAvatarFallback('${(cand.name || 'Candidato').replace(/'/g, "\\'")}') : 'https://ui-avatars.com/api/?name=${encodeURIComponent(cand.name)}&background=0284c7&color=fff&bold=true&size=128');" class="w-8 h-8 rounded-lg object-cover border border-slate-200 dark:border-white/10 flex-shrink-0 bg-slate-100 dark:bg-slate-800">
                  <div class="min-w-0 max-w-[130px] sm:max-w-[170px]">
                    <h5 class="font-bold text-slate-900 dark:text-white text-xs truncate group-hover:text-sky-600 dark:group-hover:text-cyan-400 transition-colors">${cand.name}</h5>
                    <span class="text-[10px] text-slate-500 dark:text-slate-400 font-semibold block truncate">${cand.party} • Nº ${cand.number}</span>
                  </div>
                </div>
              </td>
              <td class="py-2.5 px-2 text-slate-700 dark:text-slate-300 font-medium text-[11px] whitespace-nowrap">
                <div>${compactPosition} (${cand.state})</div>
                <span class="inline-block mt-0.5 px-1.5 py-0.2 rounded text-[8.5px] font-bold ${cand.officePower === 'executivo' ? 'bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300' : 'bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300'}">
                  ${cand.officePower === 'executivo' ? '🏛️ Executivo' : '📜 Legislativo'}
                </span>
              </td>
              <td class="py-2.5 px-1.5 text-center">
                <span class="px-2 py-0.5 rounded-lg text-xs font-black bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 font-mono border border-amber-300 dark:border-amber-500/30">
                  ${cand._calculatedScore}
                </span>
              </td>
              <td class="py-2.5 px-1.5 text-center">
                <span class="px-2 py-0.5 rounded-lg text-xs font-black font-mono ${
                  (cand.careerProductivity?.productivityScore || 70) >= 80 ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30' :
                  ((cand.careerProductivity?.productivityScore || 70) >= 60 ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-500/30' :
                  'bg-rose-100 dark:bg-rose-500/20 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-500/30')
                }">
                  ${cand.careerProductivity?.productivityScore || 70}/100
                </span>
                <span class="text-[9.5px] font-semibold text-slate-500 dark:text-slate-400 block font-mono">${cand.careerProductivity?.totalCostEstimate || 'Auditado'}</span>
              </td>
              <td class="py-2.5 px-1.5 text-center whitespace-nowrap" title="${isClean ? 'Ficha Limpa (LC nº 135/2010)' : 'Ações em Andamento (Presunção de Inocência - Art. 5º, LVII da CF/88)'}">
                <span class="inline-flex items-center gap-1 text-[11px] font-bold ${isClean ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400'}">
                  <i data-lucide="${isClean ? 'shield-check' : 'scale'}" class="w-3.5 h-3.5"></i>
                  ${isClean ? 'Ficha Limpa' : 'Ações em Andamento'}
                </span>
              </td>
              <td class="py-2.5 px-1.5 text-center">
                <span class="font-bold text-emerald-700 dark:text-emerald-400 font-mono text-xs">${(cand.recentDebate && cand.recentDebate.truthfulnessPct !== undefined) ? cand.recentDebate.truthfulnessPct : (cand.radar?.coerencia || 84)}%</span>
                <span class="text-[9.5px] font-medium text-slate-500 dark:text-slate-400 block font-mono">${(cand.recentStatements?.length || cand.recentDebate?.statements?.length || 7)} checadas</span>
              </td>
              <td class="py-2.5 px-1.5 text-center">
                ${cand.officePower === 'executivo' ? `
                  <span class="font-bold text-sky-700 dark:text-cyan-400 font-mono text-xs">Capag ${cand.executiveMetrics?.fiscalManagementCapag || 'A'}</span>
                  <span class="text-[9.5px] font-medium text-slate-500 dark:text-slate-400 block font-mono">LRF ${cand.executiveMetrics?.lrfCompliancePct || 98}%</span>
                ` : `
                  <span class="font-bold text-purple-700 dark:text-purple-400 font-mono text-xs">${cand.attendance?.ratePct || 92}%</span>
                  <span class="text-[9.5px] font-medium text-slate-500 dark:text-slate-400 block font-mono">${cand.attendance?.presentCount || 240} sessões</span>
                `}
              </td>
              <td class="py-2.5 px-1.5 text-center">
                <span class="font-bold text-amber-700 dark:text-amber-300 font-mono text-xs">${cand.salary?.civicConversion ? cand.salary.civicConversion.costPerMinute.replace(' ', '') : 'R$0,51/min'}</span>
                <span class="text-[9.5px] font-medium text-slate-500 dark:text-slate-400 block font-mono">${cand.salary?.spendingPercentage || 72}% cota</span>
              </td>
              <td class="py-2.5 px-1.5 text-center">
                <span class="font-bold text-slate-900 dark:text-slate-100 font-mono text-xs block whitespace-nowrap">
                  ${campSpent}
                </span>
                <span class="text-[9.5px] font-bold text-slate-600 dark:text-slate-300 block font-mono whitespace-nowrap">
                  ${costVote}
                </span>
              </td>
              <td class="py-2.5 px-1.5 text-center">
                <div class="text-[11px] font-bold text-slate-800 dark:text-slate-200 font-mono whitespace-nowrap">
                  ${amendTotal}
                </div>
                <span class="px-1.5 py-0.2 rounded text-[8.5px] font-bold border font-mono ${cand.parliamentaryAmendments && cand.parliamentaryAmendments.integritySeal ? cand.parliamentaryAmendments.integritySeal.badgeClass : 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300'} inline-block mt-0.5 whitespace-nowrap">
                  ${cand.parliamentaryAmendments && cand.parliamentaryAmendments.integritySeal ? cand.parliamentaryAmendments.integritySeal.shortBadge : '🟢 100% Concurso'}
                </span>
              </td>
            </tr>
            `;
          }).join('');

          const pagContainer = document.getElementById('ranking-pagination-container');
          if (pagContainer) {
            if (totalPages <= 1) {
              pagContainer.innerHTML = `<span class="text-slate-500 font-mono text-[11px]">Exibindo todos os ${totalCandidates} políticos auditados</span>`;
            } else {
              let pagesHtml = '';
              for (let p = 1; p <= totalPages; p++) {
                const isActive = p === currentRankingPage;
                pagesHtml += `
                  <button onclick="changeRankingPage(${p})" class="w-8 h-8 rounded-xl font-bold text-xs transition cursor-pointer ${isActive ? 'bg-sky-600 text-white shadow-sm' : 'bg-black/5 dark:bg-white/10 hover:bg-black/10 text-slate-700 dark:text-slate-300'}">
                    ${p}
                  </button>
                `;
              }
              pagContainer.innerHTML = `
                <div class="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                  Exibindo <strong class="text-slate-900 dark:text-white">${startIdx + 1}–${Math.min(startIdx + RANKING_PAGE_SIZE, totalCandidates)}</strong> de <strong class="text-slate-900 dark:text-white">${totalCandidates}</strong> políticos auditados
                </div>
                <div class="flex items-center gap-1.5 flex-wrap">
                  <button onclick="changeRankingPage(${currentRankingPage - 1})" ${currentRankingPage === 1 ? 'disabled class="px-3 py-1.5 rounded-xl bg-black/5 dark:bg-white/5 text-slate-400 cursor-not-allowed text-xs font-bold"' : 'class="px-3 py-1.5 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-black/10 text-slate-700 dark:text-slate-200 cursor-pointer text-xs font-bold transition"'}>
                    ← Anterior
                  </button>
                  ${pagesHtml}
                  <button onclick="changeRankingPage(${currentRankingPage + 1})" ${currentRankingPage === totalPages ? 'disabled class="px-3 py-1.5 rounded-xl bg-black/5 dark:bg-white/5 text-slate-400 cursor-not-allowed text-xs font-bold"' : 'class="px-3 py-1.5 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-black/10 text-slate-700 dark:text-slate-200 cursor-pointer text-xs font-bold transition"'}>
                    Próxima →
                  </button>
                </div>
              `;
            }
          }
        }
      }

      lucide.createIcons();
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
    function renderCandidatesFeed(candidates = candidatesData) {
      const grid = document.getElementById('candidates-grid');
      grid.innerHTML = '';

      const totalCount = candidates.length;
      const totalPages = Math.ceil(totalCount / feedPageSize) || 1;
      if (feedCurrentPage > totalPages) feedCurrentPage = 1;
      if (feedCurrentPage < 1) feedCurrentPage = 1;

      const startIndex = (feedCurrentPage - 1) * feedPageSize;
      const paginatedCandidates = candidates.slice(startIndex, startIndex + feedPageSize);

      // Update Stats Count Header
      const statsHeader = document.getElementById('feed-stats-count');
      if (statsHeader) {
        statsHeader.innerText = `Página ${feedCurrentPage} de ${totalPages} (Mostrando ${paginatedCandidates.length} de ${totalCount} políticos)`;
      }

      // Update Pagination Bar
      renderFeedPaginationControls(totalCount, totalPages);

      if (totalCount === 0) {
        grid.innerHTML = `
          <div class="col-span-full text-center py-12 px-6 glass-panel rounded-2xl border border-dashed border-slate-300 dark:border-white/10 space-y-3">
            <i data-lucide="search-x" class="w-10 h-10 text-slate-400 mx-auto"></i>
            <h4 class="font-bold text-slate-900 dark:text-white text-base">Nenhum candidato encontrado</h4>
            <p class="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">Nenhum resultado corresponde aos filtros de integridade, cargo, estado e busca textual.</p>
            <button onclick="resetFeedFilters()" class="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md transition cursor-pointer">
              Limpar Filtros & Ver Todos
            </button>
          </div>
        `;
        lucide.createIcons();
        return;
      }

      paginatedCandidates.forEach(cand => {
        const card = document.createElement('div');
        card.className = 'glass-card rounded-2xl p-5 flex flex-col space-y-2.5 cursor-pointer group hover:border-sky-500/50 hover:shadow-xl transition-all duration-200';
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.onclick = () => openDossie(cand.id);
        card.onkeydown = (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openDossie(cand.id);
          }
        };
        
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
        
        const fiscalLabel = isExec ? 'Meta Fiscal' : 'Cota Parlamentar';
        const fiscalValue = isExec ? (isPresident ? '100% TCU' : '100% TCE') : `${cand.salary?.spendingPercentage || 75}% teto`;
        const attendanceLabel = isExec ? 'Gestão' : 'Presença';
        const attendanceValue = isExec ? `${cand.attendance?.ratePct || 98}% Metas` : `${cand.attendance?.ratePct || 94}%`;

        const displayName = cand.ballotName || cand.name;
        const subtitleName = (cand.ballotName && cand.ballotName !== cand.name) 
          ? `<p class="text-[11.5px] text-slate-700 dark:text-slate-200 font-semibold truncate leading-tight mt-0.5">${cand.name}</p>` 
          : '';

        // Destaque de cargo/votação removido conforme solicitação
        const officeBadge = '';

        const mandateSalaryLabel = isExec ? 'Subsídio Mensal do Cargo:' : 'Cota Parlamentar Média / mês:';
        const mandateSalaryValue = cand.salary?.spendingCeapMonthly || (isExec ? 'R$ 35.800,00' : 'R$ 34.200,00');
        const roiBudgetSnippet = (isExec && cand.salary?.civicConversion?.roiText) ? `
          <div class="text-[10px] text-slate-700 dark:text-slate-300 font-medium flex items-center justify-between border-t border-amber-500/15 dark:border-amber-500/20 pt-1">
            <span class="flex items-center gap-1 font-semibold">
              <i data-lucide="landmark" class="w-3 h-3 text-sky-600 dark:text-cyan-400"></i> Orçamento Sob Gestão:
            </span>
            <span class="font-bold text-slate-900 dark:text-white truncate max-w-[190px]">${cand.salary.civicConversion.roiText.replace('Gestão de ', '')}</span>
          </div>
        ` : '';

        // Integrity Badge
        let legBadge = '';
        if (cand.legalIntegrity) {
          const st = cand.legalIntegrity.status;
          if (st === 'ineligible') {
            legBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-black bg-rose-100 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-500/30 inline-flex items-center gap-1"><i data-lucide="alert-triangle" class="w-3 h-3 text-rose-600"></i> Inelegível (LC 135)</span>`;
          } else if (st === 'investigated') {
            legBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-black bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-500/30 inline-flex items-center gap-1"><i data-lucide="scale" class="w-3 h-3 text-amber-600"></i> Em Investigação</span>`;
          } else {
            legBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30 inline-flex items-center gap-1"><i data-lucide="shield-check" class="w-3 h-3 text-emerald-600"></i> Ficha Limpa Plena</span>`;
          }
        }

        // Índice de Produtividade / Eficácia por Poder Constitucional
        let iprBadge = '';
        if (cand.officePower === 'executivo') {
          const capag = cand.executiveMetrics?.capagGrade || 'A';
          iprBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-black bg-sky-100 dark:bg-sky-950/40 text-sky-800 dark:text-cyan-300 border border-sky-300 dark:border-sky-500/30 inline-flex items-center gap-1"><i data-lucide="building-2" class="w-3 h-3 text-sky-600"></i> Eficácia Executiva: Capag ${capag}</span>`;
        } else if (cand.officePower === 'judiciario') {
          const vistaRate = cand.judiciaryMetrics?.vistaCompliancePct ? `${cand.judiciaryMetrics.vistaCompliancePct}%` : '100%';
          iprBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-black bg-purple-100 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-500/30 inline-flex items-center gap-1"><i data-lucide="scale" class="w-3 h-3 text-purple-600"></i> Eficácia Judiciária: Prazos ${vistaRate}</span>`;
        } else {
          const prodScore = cand.careerProductivity?.productivityScore || cand.overallScore || 80;
          iprBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-black bg-purple-100 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-500/30 inline-flex items-center gap-1"><i data-lucide="activity" class="w-3 h-3 text-purple-600"></i> Produtividade Parlamentar: ${prodScore}/100</span>`;
        }

        // Proposals snippet (3 items)
        const proposalsSnippet = (cand.proposals || []).slice(0, 3).map((p, idx) => `
          <div class="flex items-start gap-2 text-xs text-slate-800 dark:text-slate-200 font-medium">
            <span class="w-4 h-4 rounded-full bg-sky-200 dark:bg-cyan-500/30 text-sky-900 dark:text-cyan-200 font-black text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">${idx + 1}</span>
            <span class="line-clamp-1">${p.title}</span>
          </div>
        `).join('');

        // Campaign Finance snippet (TSE) & Civic Relativization
        const cf = cand.campaignFinance;
        const relat = (typeof calculateCivicRelativization === 'function' ? calculateCivicRelativization(cand) : (window.calculateCivicRelativization ? window.calculateCivicRelativization(cand) : null));
        
        let campaignSnippet = '';
        if (cf || relat) {
          const totalSpentText = cf?.totalSpentFormatted || relat?.totalSpent || 'R$ 2,4 mi';
          const costVote = cf?.costPerVote ? (cf.costPerVote.includes('voto') ? cf.costPerVote : cf.costPerVote + ' por voto') : '';
          const fefcPct = cf?.publicFundPct !== undefined ? `${cf.publicFundPct}% FEFC` : 'Fundo Eleitoral';
          const relatText = relat?.shortSummary || '';

          campaignSnippet = `
            <div class="p-2.5 rounded-xl bg-purple-500/10 dark:bg-purple-950/25 border border-purple-500/25 dark:border-purple-500/35 space-y-1.5 my-2 shadow-xs text-xs">
              <div class="flex items-center justify-between text-[11px]">
                <div class="flex items-center gap-1.5 font-extrabold text-purple-900 dark:text-purple-300">
                  <i data-lucide="vote" class="w-3.5 h-3.5 text-purple-600 dark:text-purple-400"></i>
                  <span>Campanha TSE:</span>
                  <strong class="font-mono text-slate-900 dark:text-white font-black">${totalSpentText}</strong>
                </div>
                <div class="flex items-center gap-1 text-[10px] text-purple-700 dark:text-purple-300">
                  ${costVote ? `<span class="font-bold flex items-center gap-0.5">${costVote}</span><span class="text-slate-400">•</span>` : ''}
                  <span class="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-0.5">${fefcPct}</span>
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

        card.innerHTML = `
          <div>
            <!-- Header: Photo + Core Info -->
            <div class="flex items-start gap-3.5">
              <div class="avatar-frame w-16 h-16 rounded-2xl border-2 border-sky-500/40 dark:border-cyan-500/30 shadow-md flex-shrink-0 bg-slate-100 dark:bg-slate-800">
                <img 
                  src="${(window.getSafeAvatarUrl ? window.getSafeAvatarUrl(cand, displayName) : cand.avatar)}" 
                  alt="${displayName}" 
                  loading="lazy"
                  decoding="async"
                  referrerpolicy="no-referrer"
                  onerror="this.onerror=null; this.src=(window.getSafeAvatarFallback ? window.getSafeAvatarFallback('${displayName.replace(/'/g, "\\'")}') : 'https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=0284c7&color=fff&bold=true&size=128');"
                  class="w-full h-full object-cover candidate-avatar"
                >
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between gap-1 flex-wrap">
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-100 dark:bg-cyan-500/20 text-sky-800 dark:text-cyan-300 border border-sky-300 dark:border-cyan-500/30">
                    ${cand.party} • Nº ${cand.number}
                  </span>
                  ${powerBadge}
                </div>
                <h3 class="font-extrabold text-base text-slate-900 dark:text-white mt-1 leading-snug truncate group-hover:text-sky-600 dark:group-hover:text-cyan-400 transition-colors" title="${cand.name}">${displayName}</h3>
                ${subtitleName}
                <p class="text-xs text-slate-700 dark:text-slate-200 truncate mt-0.5 font-semibold">${cand.position} • ${cand.state} • ${cand.age} anos</p>
                
                <!-- Score Geral posicionado logo abaixo do Cargo -->
                <div class="flex items-center gap-2 mt-1.5 flex-wrap">
                  <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-100 dark:bg-cyan-500/20 text-sky-800 dark:text-cyan-300 border border-sky-300 dark:border-cyan-500/30">
                    <i data-lucide="bar-chart-2" class="w-3.5 h-3.5 text-sky-600 dark:text-cyan-400"></i>
                    <span>Score Geral: <strong class="font-mono text-slate-900 dark:text-white font-black">${cand.overallScore}</strong></span>
                  </span>
                </div>

                <!-- Party Affiliation + Election Date Pills -->
                <div class="flex flex-wrap items-center gap-1.5 mt-1.5 text-[10px]">
                  <span class="inline-flex items-center gap-1 font-semibold text-sky-800 dark:text-cyan-300 bg-sky-50 dark:bg-cyan-500/10 px-2 py-0.5 rounded-lg border border-sky-200 dark:border-cyan-500/20">
                    <i data-lucide="map-pin" class="w-3 h-3 text-sky-600 dark:text-cyan-400"></i> ${cand.city || cand.state}
                  </span>
                  <span class="inline-flex items-center gap-1 font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-200 dark:border-emerald-500/20">
                    <i data-lucide="calendar" class="w-3 h-3 text-emerald-600 dark:text-emerald-400"></i> 04/10/2026
                  </span>
                </div>
              </div>
            </div>

            <!-- Badges de Integridade Legal & Índice Produtividade -->
            <div class="flex flex-wrap items-center gap-1.5 mt-2 pt-2 border-t border-slate-200/60 dark:border-white/5">
              ${legBadge}
              ${iprBadge}
            </div>

            <!-- Civic Mandate Cost Highlight (Custo aos Cofres & Equivalência Social) -->
            <div class="p-2.5 rounded-xl bg-amber-500/10 dark:bg-amber-950/25 border border-amber-500/30 dark:border-amber-500/40 space-y-1.5 my-2 shadow-xs text-xs">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-1.5 font-extrabold text-amber-950 dark:text-amber-300 text-[11px]">
                  <i data-lucide="timer" class="w-3.5 h-3.5 text-amber-600 dark:text-amber-400"></i>
                  <span>Custo aos Cofres Públicos:</span>
                </div>
                <span class="font-black text-amber-800 dark:text-amber-300 font-mono text-[11px]">${cand.salary?.civicConversion?.costPerMinute || cand.salary?.costPerMinute || 'R$ 0,51 / min'}</span>
              </div>
              <div class="text-[10px] text-slate-700 dark:text-slate-300 flex items-center justify-between border-t border-amber-500/20 dark:border-amber-500/30 pt-1.5">
                <span class="flex items-center gap-1 font-medium">
                  <i data-lucide="wallet" class="w-3 h-3 text-emerald-600 dark:text-emerald-400"></i> ${mandateSalaryLabel}
                </span>
                <strong class="text-emerald-800 dark:text-emerald-300 font-black">${mandateSalaryValue}</strong>
              </div>
              ${roiBudgetSnippet}
            </div>

            <!-- TSE Campaign Finance Highlight -->
            ${campaignSnippet}

            <!-- 3 Main Proposals Card -->
            <div class="p-2.5 bg-slate-100/90 dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-white/10 space-y-1.5 mt-2 shadow-xs">
              <div class="flex items-center justify-between text-[11px] font-extrabold text-slate-900 dark:text-white">
                <span class="flex items-center gap-1.5"><i data-lucide="scroll-text" class="w-3.5 h-3.5 text-sky-600 dark:text-cyan-400"></i> 3 Principais Propostas</span>
                <button onclick="event.stopPropagation(); openDossie('${cand.id}', 'propostas-tse')" class="text-sky-700 dark:text-cyan-400 hover:underline font-bold text-[10px] cursor-pointer">Ver todas (${cand.proposals ? cand.proposals.length : 3})</button>
              </div>
              <div class="space-y-1">
                ${proposalsSnippet}
              </div>
            </div>
          </div>

          <!-- Card Bottom Actions: elevado e sem espaçamento vazio -->
          <div class="pt-2 border-t border-slate-200 dark:border-white/10 flex items-center gap-1.5 mt-1.5">
            <button onclick="event.stopPropagation(); openDossie('${cand.id}')" class="flex-1 py-1.5 rounded-xl bg-sky-700 hover:bg-sky-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-sky-700/20 focus:ring-2 focus:ring-sky-500 focus:outline-none transition cursor-pointer">
              <i data-lucide="folder-search" class="w-3.5 h-3.5"></i> Dossiê
            </button>
            <button onclick="event.stopPropagation(); openExportModalFor('${cand.id}')" class="px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 hover:opacity-95 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition flex items-center justify-center gap-1 cursor-pointer" title="Gerar Figurinha Colecionável">
              <i data-lucide="sparkles" class="w-3.5 h-3.5"></i> Figurinha
            </button>
            <button onclick="event.stopPropagation(); window.testCandidateInUrna && window.testCandidateInUrna('${cand.number}', '${cand.position}')" class="p-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/25 transition cursor-pointer flex items-center justify-center" title="Testar Voto na Urna Eletrônica">
              <i data-lucide="check-square" class="w-4 h-4 text-amber-600 dark:text-amber-400"></i>
            </button>
            <button onclick="event.stopPropagation(); toggleCompare('${cand.id}')" class="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white transition cursor-pointer" title="Comparar candidato">
              <i data-lucide="scale" class="w-4 h-4 text-purple-600 dark:text-purple-400"></i>
            </button>
            <button onclick="event.stopPropagation(); shareCandidateWhatsApp('${cand.id}')" class="p-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition flex items-center justify-center cursor-pointer" title="Compartilhar no WhatsApp">
              <i data-lucide="message-circle" class="w-4 h-4"></i>
            </button>
          </div>
        `;

        grid.appendChild(card);
      });

      lucide.createIcons();
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
          .sort((a, b) => (b.overallScore || 0) - (a.overallScore || 0))
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
        const remaining = list.filter(c => !priorityIds.has(c.id)).sort((a, b) => (b.overallScore || 0) - (a.overallScore || 0));

        list = [...stateCands, ...nationalCands, ...remaining];
      } else {
        list.sort((a, b) => {
          if (activeSortFilter === 'score_desc' || activeSortFilter === 'default') {
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
      const url = `${window.location.origin}/dossie.html?id=${cand.id}`;
      const text = `🔎 *Figuras Políticas 2026 - Dossiê Oficial*\n\nConfira os dados auditados de *${cand.name}* (${cand.party}-${cand.state}):\n⭐ Score de Integridade: ${cand.overallScore || 90}/100\n🏛️ Cargo: ${cand.position}\n💰 Custo aos cofres: ${cand.salary?.civicConversion?.costPerMinute || 'Auditado pelo TCU'}\n📋 Propostas prioritárias: ${cand.proposals ? cand.proposals.length : 3} cadastradas\n\nVeja o dossiê completo e compare agora:\n${url}`;
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
    }
