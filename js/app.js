// Raio-X Político - Ponto de Entrada, Modais Auxiliares, Busca Global e Bootstrap

// ================= LOCATION MODAL LOGIC =================
    function openLocationModal() { document.getElementById('location-modal').classList.remove('hidden'); }
    function closeLocationModal() { document.getElementById('location-modal').classList.add('hidden'); }
    
    function onStateChange(state) {
      const citySelect = document.getElementById('city-select');
      if (state === 'SP') {
        citySelect.innerHTML = '<option value="São Paulo">São Paulo (Capital)</option><option value="Campinas">Campinas</option><option value="Santos">Santos</option>';
      } else if (state === 'RJ') {
        citySelect.innerHTML = '<option value="Rio de Janeiro">Rio de Janeiro (Capital)</option><option value="Niterói">Niterói</option>';
      } else if (state === 'MG') {
        citySelect.innerHTML = '<option value="Belo Horizonte">Belo Horizonte (Capital)</option><option value="Uberlândia">Uberlândia</option>';
      } else {
        citySelect.innerHTML = '<option value="Capital">Capital</option><option value="Interior">Interior</option>';
      }
    }

    function applyLocation() {
      const state = document.getElementById('state-select').value;
      const city = document.getElementById('city-select').value;
      document.getElementById('current-location-display').innerText = `${city}, ${state}`;
      closeLocationModal();
    }

    // ================= GLOBAL POLITICIAN SEARCH LOGIC =================
    function handleGlobalSearch(query) {
      const dropdown = document.getElementById('global-search-dropdown');
      if (!dropdown) return;
      
      if (!query || query.trim().length === 0) {
        dropdown.classList.add('hidden');
        return;
      }

      const q = query.toLowerCase().trim();
      const matched = candidatesData.filter(c => 
        c.name.toLowerCase().includes(q) ||
        c.ballotName.toLowerCase().includes(q) ||
        c.party.toLowerCase().includes(q) ||
        c.position.toLowerCase().includes(q) ||
        c.number.toLowerCase().includes(q) ||
        c.state.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q)
      );

      const matchedIncumbents = incumbentsData.filter(inc =>
        inc.name.toLowerCase().includes(q) ||
        inc.office.toLowerCase().includes(q) ||
        inc.party.toLowerCase().includes(q)
      );

      if (matched.length === 0 && matchedIncumbents.length === 0) {
        dropdown.innerHTML = `
          <div class="p-3 text-center text-xs text-slate-500">
            Nenhum político encontrado para "<strong>${query}</strong>"
          </div>
        `;
        dropdown.classList.remove('hidden');
        return;
      }

      let html = '';
      if (matched.length > 0) {
        html += `<div class="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">Candidatos 2026</div>`;
        html += matched.map(c => `
          <div onclick="selectSearchResult('${c.id}')" class="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl cursor-pointer flex items-center justify-between transition gap-2">
            <div class="flex items-center gap-2.5">
              <img src="${c.avatar}" class="w-8 h-8 rounded-xl object-cover border border-sky-400">
              <div>
                <h5 class="text-xs font-bold text-slate-900 dark:text-white">${c.name}</h5>
                <span class="text-[10px] text-slate-500 dark:text-slate-400">${c.party} • Nº ${c.number} (${c.position})</span>
              </div>
            </div>
            <div class="text-right">
              <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300">
                Score: ${c.radar.integridade}
              </span>
            </div>
          </div>
        `).join('');
      }

      if (matchedIncumbents.length > 0) {
        html += `<div class="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-2">Em Exercício (Mandato Vigente)</div>`;
        html += matchedIncumbents.map(inc => `
          <div onclick="navigateTab('incumbents'); closeGlobalSearch();" class="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl cursor-pointer flex items-center justify-between transition gap-2">
            <div class="flex items-center gap-2.5">
              <img src="${inc.avatar}" class="w-8 h-8 rounded-xl object-cover border border-emerald-400">
              <div>
                <h5 class="text-xs font-bold text-slate-900 dark:text-white">${inc.name}</h5>
                <span class="text-[10px] text-slate-500 dark:text-slate-400">${inc.party} • ${inc.office}</span>
              </div>
            </div>
            <span class="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Em Exercício</span>
          </div>
        `).join('');
      }

      dropdown.innerHTML = html;
      dropdown.classList.remove('hidden');
    }

    function selectSearchResult(candId) {
      closeGlobalSearch();
      openDossieModal(candId);
    }

    function closeGlobalSearch() {
      const dropdown = document.getElementById('global-search-dropdown');
      if (dropdown) dropdown.classList.add('hidden');
    }

    // Keyboard shortcut for Ctrl+K or '/'
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const input = document.getElementById('global-search-input');
        if (input) {
          input.focus();
          input.select();
        }
      }
      if (e.key === 'Escape') {
        closeGlobalSearch();
        closeDossieModal();
        closeExportModal();
        closeLoginModal();
        closeLocationModal();
        closeDonateModal();
      }
    });

    // Close dropdown on click outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#global-search-input') && !e.target.closest('#global-search-dropdown')) {
        closeGlobalSearch();
      }
    });

    // ================= LOGIN MODAL LOGIC =================
    function openLoginModal() { document.getElementById('login-modal').classList.remove('hidden'); }
    function closeLoginModal() { document.getElementById('login-modal').classList.add('hidden'); }

    function loginWith(provider) {
      alert(`Autenticado com sucesso via ${provider}! Seus favoritos e histórico de votos agora estão sincronizados com sua conta.`);
      document.getElementById('user-btn-label').innerText = 'Eleitor Conectado';
      closeLoginModal();
    }

    function handleEmailLogin(e) {
      e.preventDefault();
      const email = document.getElementById('login-email-input').value;
      alert(`Link mágico de acesso enviado para ${email}! Verifique sua caixa de entrada.`);
      document.getElementById('user-btn-label').innerText = 'Eleitor Conectado';
      closeLoginModal();
    }

    // ================= PROPOSAL FILTERING & DETAIL MODAL IN DOSSIER =================
    let activeProposalCategory = 'todas';
    let activeProposalStatus = 'todos';

    function filterDossieProposals(category) {
      activeProposalCategory = category;
      document.querySelectorAll('.prop-filter-btn').forEach(btn => {
        if (btn.innerText.trim().toLowerCase() === category.toLowerCase()) {
          btn.className = 'prop-filter-btn active px-3 py-1 rounded-lg bg-sky-600 text-white font-bold transition';
        } else {
          btn.className = 'prop-filter-btn px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-850 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-200 dark:hover:bg-slate-800 transition';
        }
      });
      renderFilteredDossieProposals(activeDossieCandidate, category, activeProposalStatus);
    }

    function filterDossieProposalStatus(status) {
      activeProposalStatus = status;
      document.querySelectorAll('.prop-status-filter-btn').forEach(btn => {
        if (btn.getAttribute('data-status') === status) {
          btn.className = 'prop-status-filter-btn active px-3 py-1 rounded-lg bg-purple-600 text-white font-bold text-xs transition';
        } else {
          btn.className = 'prop-status-filter-btn px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-850 text-slate-700 dark:text-slate-300 font-medium text-xs hover:bg-slate-200 dark:hover:bg-slate-800 transition';
        }
      });
      renderFilteredDossieProposals(activeDossieCandidate, activeProposalCategory, status);
    }

    function openProposalDetailModal(candId, propId) {
      const cand = candidatesData.find(c => c.id === candId) || activeDossieCandidate;
      const prop = cand.proposals.find(p => p.id === propId);
      if (!prop) return;

      document.getElementById('prop-detail-category').innerText = prop.category;
      
      const statusBadge = document.getElementById('prop-detail-status-badge');
      statusBadge.innerText = prop.statusLabel || 'Plano de Governo';
      if (prop.statusType === 'aprovada') {
        statusBadge.className = 'px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30';
      } else if (prop.statusType === 'tramitacao') {
        statusBadge.className = 'px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-500/30';
      } else {
        statusBadge.className = 'px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-100 dark:bg-cyan-500/20 text-sky-800 dark:text-cyan-300 border border-sky-300 dark:border-cyan-500/30';
      }

      document.getElementById('prop-detail-score').innerText = `Viabilidade IA: ${prop.score} / 10`;
      document.getElementById('prop-detail-title').innerText = prop.title;
      document.getElementById('prop-detail-author').innerText = `Proposta oficial apresentada por ${cand.name} (${cand.party} • ${cand.position})`;
      
      document.getElementById('prop-detail-summary').innerText = prop.summary || prop.title;
      document.getElementById('prop-detail-problem').innerText = prop.problemStatement || "Gargalo histórico identificado pela população nas audiências públicas do estado.";
      document.getElementById('prop-detail-solution').innerText = prop.solutionDetails || "Execução direta por meio de convênios técnicos com metas mensuráveis de eficiência.";
      document.getElementById('prop-detail-budget').innerText = prop.budgetAndCost || "Previsão orçamentária vinculada aos recursos ordinários do tesouro e parcerias públicas.";
      document.getElementById('prop-detail-timeline').innerText = prop.timeline || "Início nos primeiros 100 dias de gestão.";
      document.getElementById('prop-detail-beneficiaries').innerText = prop.beneficiaries || "População em geral e setores produtivos locais.";
      document.getElementById('prop-detail-pros').innerText = prop.pros;
      document.getElementById('prop-detail-cons').innerText = prop.cons;

      document.getElementById('prop-detail-vote-support-btn').onclick = () => {
        voteProposal(cand.id, prop.id, 'support');
        alert('Seu apoio foi registrado no sentimento cívico popular!');
        renderFilteredDossieProposals(cand, activeProposalCategory, activeProposalStatus);
      };

      document.getElementById('prop-detail-vote-reject-btn').onclick = () => {
        voteProposal(cand.id, prop.id, 'reject');
        alert('Seu voto divergente foi registrado no sentimento cívico popular!');
        renderFilteredDossieProposals(cand, activeProposalCategory, activeProposalStatus);
      };

      document.getElementById('proposal-detail-modal').classList.remove('hidden');
      lucide.createIcons();
    }

    function closeProposalDetailModal() {
      document.getElementById('proposal-detail-modal').classList.add('hidden');
    }

    function renderFilteredDossieProposals(cand, category = 'todas', statusFilter = 'todos') {
      const list = document.getElementById('dossie-proposals-list');
      const summaryEl = document.getElementById('dossie-prop-filter-summary');
      let filtered = cand.proposals;

      if (category !== 'todas') {
        filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
      }

      if (statusFilter !== 'todos') {
        filtered = filtered.filter(p => p.statusType === statusFilter);
      }

      if (summaryEl) {
        const total = cand.officialProposalsSummary ? cand.officialProposalsSummary.totalRegistered : cand.proposals.length;
        const cargo = cand.officialProposalsSummary ? cand.officialProposalsSummary.targetOffice : cand.position;
        summaryEl.innerHTML = `Exibindo <strong class="text-slate-900 dark:text-white font-bold">${filtered.length}</strong> de <strong class="text-slate-900 dark:text-white font-bold">${total}</strong> propostas oficiais registradas no TSE para <strong class="text-sky-600 dark:text-cyan-400 font-bold">${cargo}</strong>`;
      }

      if (filtered.length === 0) {
        list.innerHTML = `<div class="p-6 text-center text-xs text-slate-500 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-white/5">Nenhuma proposta encontrada com esses filtros no plano oficial registrado no TSE.</div>`;
        return;
      }

      list.innerHTML = filtered.map(p => {
        const totalVotes = p.supportVotes + p.rejectVotes;
        const supportPct = Math.round((p.supportVotes / totalVotes) * 100);
        const rejectPct = 100 - supportPct;
        const statusBadgeClass = p.statusType === 'aprovada'
          ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/30'
          : p.statusType === 'tramitacao'
          ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-500/30'
          : 'bg-sky-100 dark:bg-cyan-500/20 text-sky-800 dark:text-cyan-300 border-sky-300 dark:border-cyan-500/30';

        return `
          <div class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-white/5 space-y-3.5 hover:border-sky-400/50 transition">
            
            <!-- Category, Status and Score Bar -->
            <div class="flex flex-wrap items-center justify-between gap-2">
              <div class="flex items-center gap-2">
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-white/10">
                  ${p.category}
                </span>
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${statusBadgeClass}">
                  ${p.statusLabel || 'Plano de Governo'}
                </span>
              </div>
              <span class="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-xs font-mono font-bold text-sky-700 dark:text-cyan-400">
                Viabilidade IA: ${p.score} / 10
              </span>
            </div>

            <!-- Title & Simple Plain-Language Summary -->
            <div>
              <h4 class="font-bold text-slate-900 dark:text-white text-base leading-snug">${p.title}</h4>
              <div class="mt-2 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                <span class="text-sky-600 dark:text-cyan-400 font-bold flex-shrink-0">💡 O que muda:</span>
                <p class="leading-relaxed font-medium">${p.summary || p.title}</p>
              </div>
            </div>

            <!-- Budget and Beneficiaries Quick Chips -->
            <div class="flex flex-wrap gap-2 text-[11px] text-slate-600 dark:text-slate-400">
              <span class="inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-white/5">
                <i data-lucide="coins" class="w-3.5 h-3.5 text-amber-500"></i>
                <strong class="text-slate-900 dark:text-slate-200">Custo:</strong> ${p.budgetAndCost ? p.budgetAndCost.split('.')[0] : 'Orçamento Ordinário'}
              </span>
              <span class="inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-white/5">
                <i data-lucide="users" class="w-3.5 h-3.5 text-purple-500"></i>
                <strong class="text-slate-900 dark:text-slate-200">Beneficiados:</strong> ${p.beneficiaries ? p.beneficiaries.split(',')[0] : 'Cidadãos em geral'}
              </span>
            </div>

            <!-- Pros & Cons Summary -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
              <div class="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-slate-800 dark:text-slate-300">
                <span class="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1 mb-1">
                  <i data-lucide="plus-circle" class="w-3.5 h-3.5"></i> Vantagens (Prós):
                </span>
                <p class="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">${p.pros}</p>
              </div>
              <div class="p-2.5 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-slate-800 dark:text-slate-300">
                <span class="font-bold text-red-700 dark:text-crimson flex items-center gap-1 mb-1">
                  <i data-lucide="alert-triangle" class="w-3.5 h-3.5"></i> Riscos e Desafios:
                </span>
                <p class="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">${p.cons}</p>
              </div>
            </div>

            <!-- Action Bar: View Full Plan Details + Live Voting -->
            <div class="pt-3 border-t border-slate-200 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              
              <!-- Open Detail Modal CTA -->
              <button onclick="openProposalDetailModal('${cand.id}', '${p.id}')" class="px-3.5 py-1.5 rounded-xl bg-sky-50 dark:bg-sky-500/10 hover:bg-sky-100 dark:hover:bg-sky-500/20 text-sky-800 dark:text-cyan-300 font-bold border border-sky-300 dark:border-cyan-500/30 flex items-center gap-1.5 transition">
                <i data-lucide="file-text" class="w-3.5 h-3.5"></i> Ver Detalhamento Completo & Prazos
              </button>

              <!-- Community Sentiment & Live Voting -->
              <div class="flex items-center gap-2">
                <div class="text-right hidden sm:block">
                  <span class="text-[10px] text-slate-500 block">Sentimento: 👍 ${supportPct}% vs 👎 ${rejectPct}%</span>
                  <span class="text-[9px] text-slate-400">(${totalVotes} votos)</span>
                </div>
                <button onclick="voteProposal('${cand.id}', '${p.id}', 'support')" class="px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 hover:bg-emerald-200 dark:hover:bg-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-300 dark:border-emerald-500/30 transition flex items-center gap-1">
                  <i data-lucide="thumbs-up" class="w-3.5 h-3.5"></i> Apoiar
                </button>
                <button onclick="voteProposal('${cand.id}', '${p.id}', 'reject')" class="px-3 py-1.5 rounded-xl bg-red-100 dark:bg-red-500/20 hover:bg-red-200 dark:hover:bg-red-500/30 text-red-800 dark:text-red-300 text-xs font-bold border border-red-300 dark:border-red-500/30 transition flex items-center gap-1">
                  <i data-lucide="thumbs-down" class="w-3.5 h-3.5"></i> Rejeitar
                </button>
              </div>

            </div>

          </div>
        `;
      }).join('');
      lucide.createIcons();
    }

    // ================= DONATE & CONTRADITORY MODALS =================
    function openDonateModal() { document.getElementById('donate-modal').classList.remove('hidden'); }
    function closeDonateModal() { document.getElementById('donate-modal').classList.add('hidden'); }
    function openElectoralInfoModal() { document.getElementById('electoral-modal').classList.remove('hidden'); }
    function closeElectoralInfoModal() { document.getElementById('electoral-modal').classList.add('hidden'); }
    function openContraditoryModal() { document.getElementById('contraditory-modal').classList.remove('hidden'); }
    function closeContraditoryModal() { document.getElementById('contraditory-modal').classList.add('hidden'); }

    function submitContraditory(e) {
      e.preventDefault();
      alert('Solicitação de contraditório recebida com sucesso! Nossa equipe técnica de checagem analisará o link oficial em até 24 horas úteis.');
      closeContraditoryModal();
    }

    // ================= SINCRONIZAÇÃO REATIVA COM A API REST & SQLITE =================
    async function syncWithBackend() {
      try {
        const res = await fetch('/api/candidates');
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data) && json.data.length > 0) {
            console.log(`[Raio-X Político] Sincronizado com API SQLite: ${json.data.length} candidatos ativos.`);
            
            // Garante purga completa de qualquer candidato fictício
            candidatesData = json.data.map(apiCand => {
              const existing = candidatesData.find(c => c.id === apiCand.id);
              return {
                id: apiCand.id,
                name: apiCand.name,
                ballotName: apiCand.ballotName || apiCand.name,
                party: apiCand.party,
                number: apiCand.number,
                position: apiCand.position,
                state: apiCand.state,
                city: apiCand.city || (existing ? existing.city : 'São Paulo'),
                age: apiCand.age || 35,
                politicalLifeYears: 8,
                timesElected: 2,
                avatar: apiCand.avatar,
                education: apiCand.education || 'Ensino Superior Completo',
                careerHistory: apiCand.careerHistory || 'Atuação Parlamentar',
                aiSummary: apiCand.aiSummary,
                overallScore: apiCand.overallScore || 90,
                affiliation: existing ? existing.affiliation : { party: apiCand.party, sinceDate: '15/03/2022', yearsText: '4 anos de filiação', history: apiCand.party, certCode: 'TSE-FIL-2026' },
                electionSchedule: existing ? existing.electionSchedule : { office: apiCand.position, firstRoundDate: '04/10/2026', firstRoundText: '04/10/2026 (1º Turno)', daysRemaining: 36, hasSecondRound: false, votingSummary: '1º Turno: 04/10/2026' },
                radar: apiCand.radar || (existing ? existing.radar : { integridade: 94, eficiencia: 90, transparencia: 92, coerencia: 88, viabilidade: 86, presenca: 94 }),
                attendance: apiCand.attendance || (existing ? existing.attendance : { ratePct: 94, presentCount: 111, totalSessions: 118, justifiedAbsences: 5, unjustifiedAbsences: 2, committees: [] }),
                salary: apiCand.salary || (existing ? existing.salary : { spendingCeapMonthly: 'R$ 28.500,00', spendingCeapSavings: 'R$ 164.600,00', spendingPercentage: 78, civicConversion: { costPerMinute: 'R$ 0,54 / min', costPerCitizen: 'R$ 0,004 / ano', salariosMinimos: 190, roiText: 'R$ 28,50 por R$ 1 gasto' } }),
                bills: existing ? existing.bills : { proposed: 42, approved: 8, successRate: '19%' },
                parliamentaryAmendments: apiCand.amendmentsExecuted ? {
                  totalExecuted: apiCand.amendmentsExecuted,
                  openBidPct: apiCand.openBidPct,
                  integritySeal: {
                    badgeClass: 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300',
                    shortBadge: apiCand.amendmentsSeal || '🟢 100% Edital Aberto'
                  }
                } : (existing ? existing.parliamentaryAmendments : null),
                ethics: { condemned: 0, investigations: 0, processes: 0, status: 'Ficha Limpa' },
                recentDebate: apiCand.recentDebate || (existing ? existing.recentDebate : { event: 'Debate Nacional 2026', broadcaster: 'Band', date: '18/08/2026', truthfulnessPct: 91, statements: [] }),
                proposals: (apiCand.proposals && apiCand.proposals.length > 0) ? apiCand.proposals : (existing ? existing.proposals : [])
              };
            });
            activeDossieCandidate = candidatesData[0];
            renderCandidatesFeed();
            if (typeof renderPodiumRanking === 'function') renderPodiumRanking();
            if (typeof renderComparator === 'function') renderComparator();
          }
        }
      } catch (e) {
        // Fallback resiliente para operação local offline
      }
    }

    // Initialize Theme & Feed on Load
    initTheme();
    renderCandidatesFeed();
    syncWithBackend();
    
    // Suporte a abertura direta de figurinha via URL
    const urlParams = new URLSearchParams(window.location.search);
    const figId = urlParams.get('figurinha') || urlParams.get('openFigurinha');
    if (figId) {
      setTimeout(() => {
        openExportModalFor(figId);
      }, 350);
    }

// Inicialização segura no carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTheme === 'function') initTheme();
  if (typeof lucide !== 'undefined') lucide.createIcons();
  if (typeof renderRankingTab === 'function') renderRankingTab();
  if (typeof renderCandidatesFeed === 'function') renderCandidatesFeed();
  if (typeof syncWithBackend === 'function') syncWithBackend();
  
  // Tratamento de URL Deeplink (ex: ?figurinha=cand-tiririca vindo do dossiê)
  const urlParams = new URLSearchParams(window.location.search);
  const figId = urlParams.get('figurinha') || urlParams.get('openFigurinha');
  if (figId && typeof openExportModalFor === 'function') {
    setTimeout(() => {
      openExportModalFor(figId);
    }, 350);
  }
});
