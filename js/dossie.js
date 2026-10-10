// Figuras Políticas - Dossiê Detalhado, Emendas, Gastos CEAP e Radar

// ================= DOSSIE NAVIGATION LOGIC (PÁGINA COMPLETA DEDICADA) =================
    function openDossie(candId, initialSubTab = 'visao-geral') {
      const isV2 = window.location.pathname.includes('_v2') || window.location.href.includes('_v2');
      const isProto = window.location.pathname.includes('/prototypes/');
      const base = isV2 ? 'dossie_v2.html' : 'dossie.html';
      const target = isProto ? `../${base}?id=${candId}&tab=${initialSubTab}` : `${base}?id=${candId}&tab=${initialSubTab}`;
      window.location.href = target;
    }

    function openDossieModal(candId, initialSubTab = 'visao-geral') {
      openDossie(candId, initialSubTab);
    }

    function _legacyPopulateDossieModal(candId, initialSubTab = 'visao-geral') {
      const cand = candidatesData.find(c => c.id === candId) || candidatesData[0];
      activeDossieCandidate = cand;

      // Populate Header
      document.getElementById('dossie-avatar').src = (window.getSafeAvatarUrl ? window.getSafeAvatarUrl(cand, cand.name) : cand.avatar);
      document.getElementById('dossie-name').innerText = cand.name;
      document.getElementById('dossie-party-badge').innerText = `${cand.party} • Nº ${cand.number}`;
      document.getElementById('dossie-number-badge').innerText = cand.position;
      document.getElementById('dossie-subinfo').innerText = `${cand.city}, ${cand.state} • ${cand.age} anos (${cand.politicalLifeYears} anos de vida pública) • Eleito ${cand.timesElected}x`;

      // Header Badges for Affiliation, Election Date & Civic Cost
      document.getElementById('dossie-affiliation-badge').innerHTML = `<i data-lucide="calendar" class="w-3.5 h-3.5"></i> Filiação: ${cand.affiliation.party} desde ${cand.affiliation.sinceDate} (${cand.affiliation.yearsText})`;
      document.getElementById('dossie-election-badge').innerHTML = `<i data-lucide="vote" class="w-3.5 h-3.5 text-purple-500"></i> Eleição: ${cand.electionSchedule.firstRoundText} (Faltam ${cand.electionSchedule.daysRemaining} dias)`;
      if (cand.salary && cand.salary.civicConversion) {
        document.getElementById('dossie-cost-badge-text').innerText = `Custo aos Cofres: ${cand.salary.civicConversion.costPerMinute}`;
        document.getElementById('dossie-overview-cost-minute').innerText = cand.salary.civicConversion.costPerMinute;
        document.getElementById('dossie-overview-cost-citizen').innerText = cand.salary.civicConversion.costPerCitizen;
      }

      // Stats Bento (6 Cards)
      document.getElementById('dossie-stat-age').innerText = `${cand.age} anos`;
      document.getElementById('dossie-stat-career').innerText = `${cand.politicalLifeYears} anos de carreira`;
      document.getElementById('dossie-stat-affiliation').innerText = cand.affiliation.party;
      document.getElementById('dossie-stat-affiliation-hist').innerText = `Desde ${cand.affiliation.sinceDate} (${cand.affiliation.yearsText})`;
      document.getElementById('dossie-stat-election').innerText = cand.electionSchedule.firstRoundDate;
      document.getElementById('dossie-stat-election-count').innerText = cand.electionSchedule.hasSecondRound ? `1ºT: 04/10 • 2ºT: 25/10` : `Turno Único (Faltam 36 dias)`;
      
      document.getElementById('dossie-stat-integrity').innerText = `${cand.radar.integridade}/100`;
      document.getElementById('dossie-stat-spending').innerText = cand.salary.spendingCeapMonthly;
      document.getElementById('dossie-stat-spending-compare').innerText = `Média SP: ${cand.salary.spendingStateAverage}`;
      document.getElementById('dossie-stat-spending-compare').className = cand.salary.spendingPercentage < 80 ? 'text-[10px] text-emerald-600 dark:text-emerald-400 font-medium' : 'text-[10px] text-amber-600 dark:text-amber-400 font-medium';
      document.getElementById('dossie-stat-attendance-rate').innerText = `${cand.attendance.ratePct}%`;
      document.getElementById('dossie-stat-attendance-desc').innerText = `${cand.attendance.presentCount} de ${cand.attendance.totalSessions} sessões`;

      // Summary & Bio
      document.getElementById('dossie-ai-summary').innerText = cand.aiSummary;
      document.getElementById('dossie-education').innerText = cand.education;
      document.getElementById('dossie-career-history').innerText = cand.careerHistory;

      // Attendance (Presença x Faltas) Subtab
      document.getElementById('dossie-att-total').innerText = cand.attendance.totalSessions;
      document.getElementById('dossie-att-present').innerText = cand.attendance.presentCount;
      document.getElementById('dossie-att-present-pct').innerText = `${cand.attendance.ratePct}% de Presença`;
      document.getElementById('dossie-att-justified').innerText = cand.attendance.justifiedAbsences;
      document.getElementById('dossie-att-unjustified').innerText = cand.attendance.unjustifiedAbsences;
      document.getElementById('dossie-att-bar-candidate').style.width = `${cand.attendance.ratePct}%`;
      document.getElementById('dossie-att-bar-candidate-label').innerText = `${cand.attendance.ratePct}% (${cand.attendance.presentCount} presenças / ${cand.attendance.unjustifiedAbsences} faltas)`;

      document.getElementById('dossie-att-committees').innerHTML = cand.attendance.committees.map(com => `
        <div class="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-white/5 flex items-center justify-between">
          <span class="font-medium text-slate-800 dark:text-slate-200">${com.name}</span>
          <span class="font-bold text-sky-700 dark:text-cyan-400">${com.presences}</span>
        </div>
      `).join('');

      // Ethics Subtab (Certidões Negativas + Ações Positivas / Negativas + Processos)
      document.getElementById('dossie-proc-accused').innerText = cand.ethics.accused;
      document.getElementById('dossie-proc-judged').innerText = cand.ethics.judged;
      document.getElementById('dossie-proc-condemned').innerText = cand.ethics.condemned;
      document.getElementById('dossie-party-score-bar').style.width = `${cand.ethics.partyScore * 10}%`;
      document.getElementById('dossie-party-score-val').innerText = `${cand.ethics.partyScore} / 10`;

      // 1. Render Negative Certificates
      const certsList = document.getElementById('dossie-certificates-list');
      if (certsList) {
        if (cand.ethics.negativeCertificates && cand.ethics.negativeCertificates.length > 0) {
          certsList.innerHTML = cand.ethics.negativeCertificates.map(cert => `
            <div class="p-3 bg-white dark:bg-slate-900 rounded-xl border ${cert.valid ? 'border-emerald-300 dark:border-emerald-500/30' : 'border-amber-300 dark:border-amber-500/30'} flex items-start justify-between gap-2 text-xs">
              <div class="space-y-0.5">
                <span class="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                  <i data-lucide="${cert.valid ? 'check-circle' : 'alert-circle'}" class="w-3.5 h-3.5 ${cert.valid ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}"></i>
                  ${cert.name}
                </span>
                <p class="text-[11px] text-slate-500 dark:text-slate-400">${cert.issuer}</p>
                <div class="flex items-center gap-2 text-[10px] text-slate-400 font-mono mt-1">
                  <span>Cód: ${cert.code}</span>
                  <span>•</span>
                  <span>Emissão: ${cert.date}</span>
                </div>
              </div>
              <span class="px-2 py-0.5 rounded text-[10px] font-bold ${cert.valid ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300' : 'bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300'} whitespace-nowrap">
                ${cert.status}
              </span>
            </div>
          `).join('');
        } else {
          certsList.innerHTML = `<div class="col-span-2 text-xs text-slate-500 p-2">Certidões em processo de sincronização eletrônica.</div>`;
        }
      }

      // 2. Render Positive Actions
      const posList = document.getElementById('dossie-positive-actions-list');
      if (posList) {
        if (cand.ethics.positiveActions && cand.ethics.positiveActions.length > 0) {
          posList.innerHTML = cand.ethics.positiveActions.map(act => `
            <div class="p-3 bg-white dark:bg-slate-900 rounded-xl border border-emerald-200 dark:border-emerald-500/20 space-y-1.5 text-xs">
              <div class="flex items-center justify-between gap-1">
                <span class="font-bold text-emerald-900 dark:text-emerald-300">${act.title}</span>
                <span class="px-2 py-0.5 rounded text-[9px] font-extrabold bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 whitespace-nowrap">${act.tag}</span>
              </div>
              <p class="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">${act.desc}</p>
              <div class="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100 dark:border-white/5 font-mono">
                <span>Período: ${act.date}</span>
                <span>Fonte: ${act.source}</span>
              </div>
            </div>
          `).join('');
        } else {
          posList.innerHTML = `<div class="text-xs text-slate-500 p-2">Nenhuma prática em destaque cadastrada para este mandato.</div>`;
        }
      }

      // 3. Render Negative Actions / Alert Points
      const negList = document.getElementById('dossie-negative-actions-list');
      if (negList) {
        if (cand.ethics.negativeActions && cand.ethics.negativeActions.length > 0) {
          negList.innerHTML = cand.ethics.negativeActions.map(act => `
            <div class="p-3 bg-white dark:bg-slate-900 rounded-xl border ${act.severity === 'high' ? 'border-red-300 dark:border-red-500/30' : 'border-amber-200 dark:border-amber-500/20'} space-y-1.5 text-xs">
              <div class="flex items-center justify-between gap-1">
                <span class="font-bold text-amber-950 dark:text-amber-300">${act.title}</span>
                <span class="px-2 py-0.5 rounded text-[9px] font-extrabold ${act.severity === 'high' ? 'bg-red-100 dark:bg-red-500/20 text-red-800 dark:text-red-300' : 'bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300'} whitespace-nowrap">${act.tag}</span>
              </div>
              <p class="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">${act.desc}</p>
              <div class="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100 dark:border-white/5 font-mono">
                <span>Período: ${act.date}</span>
                <span>Fonte: ${act.source}</span>
              </div>
            </div>
          `).join('');
        } else {
          negList.innerHTML = `<div class="text-xs text-slate-500 p-2">Nenhum ponto de alerta identificado para este candidato.</div>`;
        }
      }

      // 4. Render CNJ Process List
      const procList = document.getElementById('dossie-process-list');
      if (cand.ethics.processes.length === 0) {
        procList.innerHTML = `<div class="p-3 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl border border-emerald-300 dark:border-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs">✓ Nenhuma ação penal ou por improbidade em curso encontrada nos tribunais oficiais.</div>`;
      } else {
        procList.innerHTML = cand.ethics.processes.map(p => `
          <div class="p-4 bg-slate-50 dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-white/5 space-y-2 text-xs">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-200 dark:border-white/10 pb-2">
              <div>
                <span class="font-black text-slate-900 dark:text-white">${p.court}</span>
                <span class="text-slate-400 font-mono text-[11px] ml-1.5">${p.number}</span>
              </div>
              <span class="px-2 py-0.5 rounded text-[10px] font-bold ${p.statusBadgeClass || (p.status.includes('Arquivado') || p.status.includes('Absolvido') ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300' : 'bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300')}">
                ${p.status}
              </span>
            </div>
            <p class="font-bold text-slate-800 dark:text-slate-200 text-xs">${p.title}</p>
            ${p.subject ? `<p class="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">${p.subject}</p>` : ''}
            <div class="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200 dark:border-white/5 text-[10px] text-slate-400">
              <span>${p.rapporteur ? `Relator: ${p.rapporteur}` : ''} • Fase: <strong class="text-slate-600 dark:text-slate-300">${p.currentStage || 'Em Instrução'}</strong></span>
              <a href="${p.link}" target="_blank" class="inline-flex items-center gap-1 text-sky-700 dark:text-cyan-400 hover:underline font-bold">
                <span>Acessar Autos Oficiais</span>
                <i data-lucide="external-link" class="w-3 h-3"></i>
              </a>
            </div>
          </div>
        `).join('');
      }

      // Salary & Spending Subtab (Detalhamento Inteligente de Gastos)
      renderDossieSpending(cand);

      // Proposals & Voting Subtab (Total de Propostas Oficiais para o Cargo Concorrendo)
      const propSummary = cand.officialProposalsSummary || {
        totalRegistered: cand.proposals.length,
        targetOffice: cand.electionSchedule ? cand.electionSchedule.office : cand.position,
        tseProtocol: "TSE-PL-2026-SP-5501",
        status: "Plano de Governo Registrado & Homologado"
      };

      const propTabBtn = document.getElementById('dossie-tab-btn-propostas-teses');
      if (propTabBtn) {
        propTabBtn.innerText = `📜 Propostas Oficiais (${propSummary.totalRegistered})`;
      }

      const targetOfficeEl = document.getElementById('dossie-prop-target-office');
      if (targetOfficeEl) targetOfficeEl.innerText = propSummary.targetOffice;

      const propTotalCountEl = document.getElementById('dossie-prop-total-count');
      if (propTotalCountEl) propTotalCountEl.innerText = `${propSummary.totalRegistered} propostas estruturantes`;

      const propProtocolEl = document.getElementById('dossie-prop-protocol');
      if (propProtocolEl) propProtocolEl.innerText = propSummary.tseProtocol;

      const propTotalBadgeEl = document.getElementById('dossie-prop-total-badge');
      if (propTotalBadgeEl) propTotalBadgeEl.innerText = `${propSummary.totalRegistered} Registradas`;

      const propOfficeShortEl = document.getElementById('dossie-prop-office-short');
      if (propOfficeShortEl) propOfficeShortEl.innerText = cand.position;

      activeProposalCategory = 'todas';
      activeProposalStatus = 'todos';
      document.querySelectorAll('.prop-filter-btn').forEach((btn, idx) => {
        btn.className = idx === 0 
          ? 'prop-filter-btn active px-3 py-1 rounded-lg bg-sky-600 text-white font-bold transition'
          : 'prop-filter-btn px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-200 dark:hover:bg-slate-800 transition';
      });
      document.querySelectorAll('.prop-status-filter-btn').forEach((btn, idx) => {
        btn.className = idx === 0 
          ? 'prop-status-filter-btn active px-3 py-1 rounded-lg bg-purple-600 text-white font-bold text-xs transition'
          : 'prop-status-filter-btn px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 font-medium text-xs hover:bg-slate-200 dark:hover:bg-slate-800 transition';
      });
      renderFilteredDossieProposals(cand, 'todas', 'todos');

      // Bills (PLs) Subtab (Média Distribuída por Ano e Mandato)
      const b = cand.bills;
      document.getElementById('dossie-pls-total').innerText = b.total;
      if (document.getElementById('dossie-pls-annual-avg')) {
        document.getElementById('dossie-pls-annual-avg').innerText = b.annualAvgProposed ? b.annualAvgProposed.toFixed(1) : (b.total / (cand.politicalLifeYears || 4)).toFixed(1);
      }
      document.getElementById('dossie-pls-approved').innerText = b.approved;
      if (document.getElementById('dossie-pls-approved-annual')) {
        document.getElementById('dossie-pls-approved-annual').innerText = b.annualAvgApproved ? b.annualAvgApproved.toFixed(1) : (b.approved / (cand.politicalLifeYears || 4)).toFixed(1);
      }
      if (document.getElementById('dossie-pls-success-rate')) {
        document.getElementById('dossie-pls-success-rate').innerText = b.approvalRatePct ? `${b.approvalRatePct}%` : `${Math.round((b.approved/b.total)*100)}%`;
      }
      if (document.getElementById('dossie-pls-fiscal-count')) {
        const fiscalTotal = b.fiscalActions ? (b.fiscalActions.requestsForInfo + b.fiscalActions.publicHearings + b.fiscalActions.committeeReports) : 32;
        document.getElementById('dossie-pls-fiscal-count').innerText = fiscalTotal;
      }

      // Render Mandates History Table
      const mandatesTable = document.getElementById('dossie-mandates-table');
      if (mandatesTable) {
        if (b.mandatesHistory && b.mandatesHistory.length > 0) {
          mandatesTable.innerHTML = b.mandatesHistory.map(m => `
            <tr class="hover:bg-slate-100/50 dark:hover:bg-white/5 transition">
              <td class="py-2.5 px-2.5 font-bold text-slate-900 dark:text-white">${m.period}</td>
              <td class="py-2.5 px-2.5 text-slate-600 dark:text-slate-300">${m.office}</td>
              <td class="py-2.5 px-2.5 font-mono text-center font-bold text-slate-800 dark:text-slate-200">${m.proposed} PLs</td>
              <td class="py-2.5 px-2.5 font-mono text-center font-black text-emerald-600 dark:text-emerald-400">${m.approved} leis</td>
              <td class="py-2.5 px-2.5 font-mono text-center font-bold text-purple-600 dark:text-purple-400">${m.successRate}</td>
              <td class="py-2.5 px-2.5 text-[11px] text-slate-500 dark:text-slate-400">${m.focus}</td>
            </tr>
          `).join('');
        } else {
          mandatesTable.innerHTML = `
            <tr>
              <td colspan="6" class="py-3 text-center text-slate-400 text-xs">Histórico em fase de estruturação.</td>
            </tr>
          `;
        }
      }

      // Highlight Bills
      document.getElementById('dossie-pls-list').innerHTML = cand.bills.highlightList.map(pl => `
        <div class="p-3 bg-slate-50 dark:bg-slate-800/90 rounded-xl border border-slate-200 dark:border-white/5 flex items-center justify-between text-xs">
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 rounded-lg bg-sky-100 dark:bg-cyan-500/20 text-sky-700 dark:text-cyan-400 flex items-center justify-center font-bold text-[10px]">
              ${pl.year || 'LEI'}
            </span>
            <div>
              <span class="text-slate-900 dark:text-white font-bold block">${pl.title}</span>
              ${pl.scope ? `<span class="text-[10px] text-slate-400">Área: ${pl.scope}</span>` : ''}
            </div>
          </div>
          <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 whitespace-nowrap ml-2">${pl.status}</span>
        </div>
      `).join('');

      // Fact Checking & Debate Subtab Renderer
      renderDossieFactCheckingAndDebate(cand);

      // Polls
      document.getElementById('poll-datafolha').innerText = cand.polls.datafolha;
      document.getElementById('poll-ipec').innerText = cand.polls.ipec;
      document.getElementById('poll-quaest').innerText = cand.polls.quaest;
      document.getElementById('poll-atlas').innerText = cand.polls.atlas;

      // Parliamentary Amendments & Jurisdiction Problems Renderers
      renderDossieAmendments(cand);
      renderDossieJurisdictionProblems(cand);

      // Show Modal and trigger Radar Chart
      document.getElementById('dossie-modal').classList.remove('hidden');
      switchDossieSubTab(initialSubTab);
      renderSingleRadar(cand.radar);
      lucide.createIcons();
    }

    function closeDossieModal() {
      if (typeof singleRadarChartInstance !== 'undefined' && singleRadarChartInstance) {
        singleRadarChartInstance.destroy();
        singleRadarChartInstance = null;
      }
      if (typeof dossieSpendingChartInstance !== 'undefined' && dossieSpendingChartInstance) {
        dossieSpendingChartInstance.destroy();
        dossieSpendingChartInstance = null;
      }
      const modal = document.getElementById('dossie-modal');
      if (modal) modal.classList.add('hidden');
    }

    // ================= PARLIAMENTARY AMENDMENTS RENDERER =================
    function renderDossieAmendments(cand) {
      const am = cand.parliamentaryAmendments;
      if (!am) return;

      const protEl = document.getElementById('dossie-amendments-protocol');
      if (protEl) protEl.innerText = am.protocol;

      const badgeEl = document.getElementById('dossie-amendments-transparency-badge');
      if (badgeEl) {
        if (am.integritySeal) {
          badgeEl.innerText = am.integritySeal.badge;
          badgeEl.className = `px-3 py-1 rounded-xl text-xs font-bold font-mono border ${am.integritySeal.badgeClass}`;
        } else {
          badgeEl.innerText = am.transparencyBadge || '100% Concurso Aberto';
          badgeEl.className = `px-3 py-1 rounded-xl text-xs font-bold font-mono border ${am.transparencyClass}`;
        }
      }

      const totalAllocEl = document.getElementById('dossie-amendments-total-allocated');
      if (totalAllocEl) totalAllocEl.innerText = am.totalAllocated;

      const totalExecEl = document.getElementById('dossie-amendments-total-executed');
      if (totalExecEl) totalExecEl.innerText = am.totalExecuted;

      const rateEl = document.getElementById('dossie-amendments-rate-badge');
      if (rateEl) rateEl.innerText = `${am.executionRatePct}% do valor prometido já pago`;

      const openBidEl = document.getElementById('dossie-amendments-open-bid-pct');
      if (openBidEl) openBidEl.innerText = `${am.openBidPct}%`;

      const pixEl = document.getElementById('dossie-amendments-pix-pct');
      if (pixEl) pixEl.innerText = `${am.directPixPct}%`;

      const pixStatusEl = document.getElementById('dossie-amendments-pix-status');
      if (pixStatusEl) {
        pixStatusEl.innerText = am.directPixPct === 0 ? 'Zero repasse secreto / sem edital' : `${am.directPixPct}% enviado via Pix sem projeto prévio`;
      }

      const destTable = document.getElementById('dossie-amendments-destinations-table');
      if (destTable && am.destinations) {
        destTable.innerHTML = am.destinations.map(d => `
          <tr class="hover:bg-slate-50 dark:hover:bg-white/5 transition">
            <td class="py-2.5 px-3 font-bold text-slate-900 dark:text-white">${d.city}</td>
            <td class="py-2.5 px-3 text-slate-600 dark:text-slate-300 font-medium">${d.entity}</td>
            <td class="py-2.5 px-3">
              <span class="px-2 py-0.5 rounded text-[10px] font-bold ${d.modality.includes('Aberto') ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300' : (d.modality.includes('Pix') ? 'bg-red-100 dark:bg-red-500/20 text-red-800 dark:text-red-300' : 'bg-purple-100 dark:bg-purple-500/20 text-purple-800 dark:text-purple-300')}">
                ${d.modality}
              </span>
            </td>
            <td class="py-2.5 px-3 text-right font-mono font-bold text-slate-900 dark:text-white">${d.amount}</td>
            <td class="py-2.5 px-3 text-center ${d.statusClass || 'text-slate-500'}">${d.status}</td>
          </tr>
        `).join('');
      }
    }

    function getConstitutionalDutyFallback(c) {
      const pos = (c.position || '').toLowerCase();
      if (pos.includes('presidente')) {
        return 'Art. 84 da CF/88: Chefia do Estado e de Governo, direção da administração pública federal, preservação da estabilidade das instituições e execução das diretrizes orçamentárias nacionais.';
      }
      if (pos.includes('governador')) {
        return 'Art. 25 a 28 e Art. 144 da CF/88: Chefia do Executivo Estadual, comando das forças de segurança pública (PM, PC e Penal), gestão da média e alta complexidade de saúde e cumprimento rigoroso da Lei de Responsabilidade Fiscal.';
      }
      if (pos.includes('prefeito')) {
        return 'Art. 29 a 31 da CF/88: Gestão dos serviços públicos locais, ordenamento do solo urbano, transporte coletivo, atenção básica de saúde e educação infantil/fundamental.';
      }
      if (pos.includes('senad')) {
        return 'Art. 48 a 52 da CF/88: Representação dos Estados da federação, sabatina e aprovação de ministros do STF e autoridades superiores, fiscalização orçamentária e deliberação sobre o teto da dívida pública consolidada.';
      }
      return 'Art. 48 a 51 e Art. 166 da CF/88: Elaboração e votação de leis de abrangência nacional, fiscalização contábil-financeira do Executivo com auxílio do TCU e destinação de emendas parlamentares impositivas.';
    }

    // ================= JURISDICTION PROBLEMS MATCH RENDERER =================
    function renderDossieJurisdictionProblems(cand) {
      if (!cand) return;
      const jp = cand.jurisdictionProblemsMatch;

      const badgeScore = document.getElementById('dossie-coverage-score-text');
      if (badgeScore) {
        badgeScore.innerText = (jp && jp.coverageBadgeText) ? jp.coverageBadgeText : '100% (3 de 3 Gargalos Cobertos)';
      }

      const compBadge = document.getElementById('dossie-competence-badge');
      if (compBadge) {
        const sphere = cand.position || 'Constitucional';
        let jur = (jp && jp.jurisdiction && jp.jurisdiction.length <= 25) ? jp.jurisdiction : (cand.state || 'Nacional');
        compBadge.innerText = `Esfera: ${sphere} (${jur})`;
        compBadge.title = `Esfera Constitucional: ${cand.position} (${jur})`;
      }

      const constBadge = document.getElementById('dossie-const-article-badge');
      if (constBadge) {
        constBadge.innerText = (jp && jp.constitutionalBasis) ? jp.constitutionalBasis : 'Art. 48 a 75 da CF/88';
      }

      const dutiesEl = document.getElementById('dossie-constitutional-duties-text');
      if (dutiesEl) {
        dutiesEl.innerText = (jp && jp.constitutionalDuties) ? jp.constitutionalDuties : getConstitutionalDutyFallback(cand);
      }

      const gridEl = document.getElementById('dossie-jurisdiction-problems-grid');
      if (gridEl) {
        if (jp && Array.isArray(jp.problems) && jp.problems.length > 0) {
          gridEl.innerHTML = jp.problems.map(prob => `
            <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border ${prob.isCovered ? 'border-purple-200 dark:border-purple-500/20' : 'border-red-200 dark:border-red-500/30'} space-y-2.5 shadow-sm">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-white/5 pb-2">
                <div class="flex items-center gap-2">
                  <span class="px-2 py-0.5 rounded text-[10px] font-extrabold border ${prob.badgeColor}">
                    ${prob.title}
                  </span>
                </div>
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black ${prob.isCovered ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300' : 'bg-red-100 dark:bg-red-500/20 text-red-800 dark:text-red-300'}">
                  ${prob.isCovered ? '✓ Proposta Oficial no TSE' : '⚠️ Gargalo Descoberto no Plano'}
                </span>
              </div>

              <!-- Diagnosis vs Proposed Solution -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div class="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-white/5 space-y-1">
                  <span class="text-[10px] uppercase font-bold text-red-600 dark:text-red-400 flex items-center gap-1">
                    <i data-lucide="alert-octagon" class="w-3 h-3"></i> O Problema Real da População:
                  </span>
                  <p class="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">${prob.diagnosis || 'Auditoria de metas em andamento perante o plano de governo.'}</p>
                </div>

                <div class="p-2.5 rounded-lg ${prob.isCovered ? 'bg-purple-50/70 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-500/30' : 'bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-500/30'} space-y-1">
                  <span class="text-[10px] uppercase font-bold ${prob.isCovered ? 'text-purple-700 dark:text-purple-300' : 'text-red-600 dark:text-red-400'} flex items-center gap-1">
                    <i data-lucide="sparkles" class="w-3 h-3"></i> Solução Registrada no Plano de Governo:
                  </span>
                  <p class="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed font-medium">${prob.candidateSolution || 'Compatibilização com diretrizes do plano de metas.'}</p>
                </div>
              </div>

              <!-- Targets and Budget -->
              <div class="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-white/5 text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                <span>🎯 Meta: <strong class="text-slate-900 dark:text-white font-bold">${prob.metricTarget || 'Meta oficial estipulada'}</strong></span>
                <span>💰 Custo: <strong class="text-slate-900 dark:text-white font-bold">${prob.budget || 'Dotação LOA'}</strong></span>
                <span class="text-purple-600 dark:text-purple-400 font-bold">${prob.tseProposalRef || 'TSE 2026'}</span>
              </div>
            </div>
          `).join('');
        } else {
          gridEl.innerHTML = `
            <div class="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-dashed border-slate-200 dark:border-white/10 text-center space-y-2 col-span-full">
              <p class="text-xs font-semibold text-slate-600 dark:text-slate-400">Cruzamento de gargalos em processamento contínuo perante o plano oficial registrado no TSE.</p>
              <p class="text-[11px] text-slate-400 dark:text-slate-500">Fontes: TSE DivulgaCandContas & Sistema de Acompanhamento Parlamentar (SIAP).</p>
            </div>
          `;
        }
      }
    }

    // ================= SPENDING INTELLIGENCE RENDERER =================
    let dossieSpendingChartInstance = null;

    function renderDossieSpending(cand) {
      const s = cand.salary;
      document.getElementById('dossie-savings-badge').innerText = s.savingsTotalText;
      document.getElementById('dossie-salary-current').innerText = s.current;
      document.getElementById('dossie-salary-current-desc').innerText = `Cargo Atual: ${s.currentDesc}`;
      document.getElementById('dossie-salary-future').innerText = s.future;
      document.getElementById('dossie-salary-future-desc').innerText = s.futureDesc;

      document.getElementById('dossie-spending-val').innerText = `${s.spendingCeapMonthly} / mês (${s.spendingPercentage}% do teto)`;
      document.getElementById('dossie-spending-bar').style.width = `${Math.min(100, s.spendingPercentage)}%`;
      document.getElementById('dossie-spending-limit-val').innerText = s.spendingCeapLimit;
      document.getElementById('dossie-spending-avg-val').innerText = s.spendingStateAverage;
      document.getElementById('dossie-spending-party-val').innerText = s.spendingPartyAverage;

      document.getElementById('dossie-spending-breakdown-tags').innerHTML = s.topExpenses.map(e => `
        <span class="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 text-slate-700 dark:text-slate-300 font-medium">${e}</span>
      `).join('');

      // AI Anomaly & Audit Cards
      const auditsContainer = document.getElementById('dossie-ai-audits-list');
      if (s.aiAudits && s.aiAudits.length > 0) {
        auditsContainer.innerHTML = s.aiAudits.map(a => `
          <div class="p-3.5 rounded-xl border ${a.type === 'positive' ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-500/30' : 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-500/30'} space-y-1.5 flex flex-col justify-between">
            <div class="space-y-1">
              <div class="flex items-center justify-between gap-1">
                <span class="text-xs font-bold ${a.type === 'positive' ? 'text-emerald-800 dark:text-emerald-300' : 'text-amber-800 dark:text-amber-300'} flex items-center gap-1.5">
                  <i data-lucide="${a.type === 'positive' ? 'shield-check' : 'alert-triangle'}" class="w-4 h-4 flex-shrink-0"></i>
                  ${a.title}
                </span>
              </div>
              <p class="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">${a.desc}</p>
            </div>
            <div class="pt-1">
              <span class="text-[9px] font-bold px-2 py-0.5 rounded inline-block ${a.type === 'positive' ? 'bg-emerald-200 dark:bg-emerald-500/30 text-emerald-900 dark:text-emerald-200' : 'bg-amber-200 dark:bg-amber-500/30 text-amber-900 dark:text-amber-200'}">
                ${a.status}
              </span>
            </div>
          </div>
        `).join('');
      }

      // Top Vendors Cards
      const vendorsContainer = document.getElementById('dossie-top-vendors-list');
      if (s.topVendors && s.topVendors.length > 0) {
        vendorsContainer.innerHTML = s.topVendors.map(v => `
          <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 space-y-2 shadow-sm">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div class="space-y-0.5">
                <div class="flex flex-wrap items-center gap-2">
                  <strong class="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">${v.name}</strong>
                  <span class="text-[10px] font-mono text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">CNPJ: ${v.cnpj}</span>
                </div>
                <p class="text-[11px] text-sky-700 dark:text-cyan-400 font-medium">${v.category} • ${v.receiptsCount} notas fiscais emitidas</p>
              </div>
              <div class="flex items-center gap-3 text-right">
                <div>
                  <span class="text-[10px] text-slate-400 block">${v.sharePct}% da cota anual</span>
                  <span class="text-sm font-black text-slate-900 dark:text-white">${v.totalAmount}</span>
                </div>
                <span class="px-2.5 py-1 rounded-lg text-[10px] font-bold border ${v.riskClass}">${v.riskBadge}</span>
              </div>
            </div>
            <div class="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-white/5 text-[11px] text-slate-600 dark:text-slate-400 flex items-start gap-2">
              <i data-lucide="bot" class="w-3.5 h-3.5 text-purple-500 flex-shrink-0 mt-0.5"></i>
              <span><strong>Parecer de Inteligência Cívica:</strong> ${v.aiInsight}</span>
            </div>
          </div>
        `).join('');
      }

      // Civic Conversion
      if (s.civicConversion) {
        document.getElementById('dossie-cost-per-minute').innerText = s.civicConversion.costPerMinute;
        document.getElementById('dossie-cost-per-citizen').innerText = s.civicConversion.costPerCitizen;
        document.getElementById('dossie-calc-merendas').innerText = s.civicConversion.merendas;
        document.getElementById('dossie-calc-consultas').innerText = s.civicConversion.consultasSus;
        document.getElementById('dossie-calc-salarios').innerText = s.civicConversion.salariosMinimos;
        document.getElementById('dossie-calc-passagens').innerText = s.civicConversion.passagensOnibus;
      }

      // Recent Receipts Table
      const receiptsContainer = document.getElementById('dossie-recent-receipts-table');
      if (s.recentReceipts && s.recentReceipts.length > 0) {
        receiptsContainer.innerHTML = s.recentReceipts.map(r => `
          <tr class="hover:bg-slate-50 dark:hover:bg-slate-850/50 transition">
            <td class="py-2.5 px-3 font-mono text-[11px] text-slate-500">${r.date}</td>
            <td class="py-2.5 px-3">
              <strong class="block text-slate-900 dark:text-white font-semibold">${r.vendor}</strong>
              <span class="font-mono text-[10px] text-slate-400">${r.cnpj}</span>
            </td>
            <td class="py-2.5 px-3 font-mono text-[11px] text-slate-600 dark:text-slate-300">${r.doc}</td>
            <td class="py-2.5 px-3 text-slate-600 dark:text-slate-300 text-[11px]">${r.desc}</td>
            <td class="py-2.5 px-3 text-right font-black text-slate-900 dark:text-white">${r.val}</td>
            <td class="py-2.5 px-3 text-center">
              <span class="px-2 py-0.5 rounded text-[10px] font-bold ${r.audit.includes('Regular') ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300'}">${r.audit}</span>
            </td>
          </tr>
        `).join('');
      }

      // Patrimony
      document.getElementById('dossie-patrimony-evolution').innerHTML = s.patrimonyEvolution.map(item => `
        <div class="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-white/5 text-center">
          <span class="text-[10px] text-slate-500 dark:text-slate-400 font-mono">${item.year}</span>
          <p class="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">${item.val}</p>
        </div>
      `).join('');

      // Render Monthly Chart
      renderDossieMonthlySpendingChart(s.monthlyTimeline);
    }

    function renderDossieMonthlySpendingChart(timeline) {
      const canvas = document.getElementById('dossieSpendingMonthlyChart');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (dossieSpendingChartInstance) {
        dossieSpendingChartInstance.destroy();
      }

      if (!timeline || timeline.length === 0) return;

      const labels = timeline.map(t => t.month);
      const candData = timeline.map(t => t.val);
      const limitData = timeline.map(t => t.limit);
      const avgData = timeline.map(t => t.avg);

      dossieSpendingChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Gasto do Candidato (R$)',
              data: candData,
              backgroundColor: isDarkMode ? 'rgba(56, 189, 248, 0.75)' : 'rgba(2, 132, 199, 0.85)',
              borderRadius: 6,
              barPercentage: 0.6
            },
            {
              label: 'Média Estadual SP (R$)',
              data: avgData,
              type: 'line',
              borderColor: isDarkMode ? '#94a3b8' : '#64748b',
              borderWidth: 2,
              borderDash: [4, 4],
              pointRadius: 3,
              pointBackgroundColor: '#64748b',
              fill: false
            },
            {
              label: 'Teto Máximo Legal (R$)',
              data: limitData,
              type: 'line',
              borderColor: '#ef4444',
              borderWidth: 1.5,
              pointRadius: 0,
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              grid: { color: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)' },
              ticks: {
                color: isDarkMode ? '#94a3b8' : '#64748b',
                font: { size: 10 },
                callback: function(value) { return 'R$ ' + (value / 1000) + 'k'; }
              }
            },
            x: {
              grid: { display: false },
              ticks: { color: isDarkMode ? '#94a3b8' : '#64748b', font: { size: 10, weight: 'bold' } }
            }
          },
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: {
                color: isDarkMode ? '#f8fafc' : '#1e293b',
                boxWidth: 12,
                font: { size: 10, weight: 'bold' }
              }
            },
            tooltip: {
              callbacks: {
                label: function(ctx) {
                  return `${ctx.dataset.label}: R$ ${ctx.parsed.y.toLocaleString('pt-BR')}`;
                }
              }
            }
          }
        }
      });
    }

    function switchDossieSubTab(subTabId) {
      const subTabs = [
        'visao-geral',
        'presenca-faltas',
        'historico-etico',
        'gastos-salarios',
        'propostas-teses',
        'leis-projetos',
        'fact-checking',
        'pesquisas-tse'
      ];

      subTabs.forEach(id => {
        const sec = document.getElementById(`dossie-sec-${id}`);
        if (sec) sec.classList.add('hidden');
      });

      const inactiveClass = 'dossie-tab-btn px-2.5 py-2 rounded-xl font-medium text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/20 transition flex items-center justify-center gap-1.5 text-center shadow-xs cursor-pointer';
      const activeClass = 'dossie-tab-btn active px-2.5 py-2 rounded-xl font-bold text-xs text-sky-700 dark:text-cyan-300 bg-sky-50 dark:bg-cyan-500/15 border-2 border-sky-500 dark:border-cyan-500 transition flex items-center justify-center gap-1.5 text-center shadow-sm cursor-pointer';

      document.querySelectorAll('.dossie-tab-btn').forEach(btn => {
        btn.className = inactiveClass;
      });

      const activeSec = document.getElementById(`dossie-sec-${subTabId}`);
      if (activeSec) activeSec.classList.remove('hidden');

      const activeBtn = document.getElementById(`dossie-tab-btn-${subTabId}`);
      if (activeBtn) {
        activeBtn.className = activeClass;
      }

      if (subTabId === 'gastos-salarios' && activeDossieCandidate) {
        setTimeout(() => {
          renderDossieMonthlySpendingChart(activeDossieCandidate.salary.monthlyTimeline);
        }, 50);
      }

      lucide.createIcons();
    }

    async function voteProposal(candId, propId, type) {
      const cand = candidatesData.find(c => c.id === candId) || activeDossieCandidate;
      if (!cand) return;
      const prop = cand.proposals.find(p => p.id === propId);
      if (!prop) return;

      if (type === 'support') prop.supportVotes++;
      else prop.rejectVotes++;

      renderFilteredDossieProposals(cand, activeProposalCategory, activeProposalStatus);

      // Persistência assíncrona no SQLite via API
      try {
        await fetch(`/api/proposals/${encodeURIComponent(propId)}/vote`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ voteType: type })
        });
      } catch (err) {
        // Modo offline / fallback resiliente
      }
    }

    // ================= RADAR CHART RENDERER (ADAPTIVE LIGHT / DARK) =================
    function renderSingleRadar(radarData) {
      const ctx = document.getElementById('singleDossieRadarCanvas').getContext('2d');
      if (singleRadarChartInstance) singleRadarChartInstance.destroy();

      const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.1)';
      const labelColor = isDarkMode ? '#e2e8f0' : '#1e293b';
      const tickColor = isDarkMode ? '#64748b' : '#94a3b8';
      const primaryColor = isDarkMode ? '#06b6d4' : '#0284c7';
      const bgAreaColor = isDarkMode ? 'rgba(6, 182, 212, 0.25)' : 'rgba(2, 132, 199, 0.2)';

      singleRadarChartInstance = new Chart(ctx, {
        type: 'radar',
        data: {
          labels: [
            'Integridade',
            'Eficiência Leg.',
            'Transparência Gastos',
            'Coerência Discursiva',
            'Viabilidade Propostas',
            'Presença'
          ],
          datasets: [{
            label: 'Índice de Qualidade',
            data: [
              radarData.integridade,
              radarData.eficiencia,
              radarData.transparencia,
              radarData.coerencia,
              radarData.viabilidade,
              radarData.assiduidade
            ],
            backgroundColor: bgAreaColor,
            borderColor: primaryColor,
            borderWidth: 2.5,
            pointBackgroundColor: primaryColor,
            pointBorderColor: '#ffffff',
            pointHoverBackgroundColor: '#ffffff',
            pointHoverBorderColor: primaryColor,
            pointRadius: 4.5
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              angleLines: { color: gridColor },
              grid: { color: gridColor },
              pointLabels: {
                color: labelColor,
                font: { size: 11, weight: 'bold', family: 'Inter' }
              },
              ticks: {
                backdropColor: 'transparent',
                color: tickColor,
                stepSize: 20,
                min: 0,
                max: 100
              }
            }
          },
          plugins: {
            legend: { display: false }
          }
        }
      });
    }


    // ================= FACT CHECKING & RECENT DEBATE RENDERER =================
    function renderDossieFactCheckingAndDebate(cand) {
      const debateContainer = document.getElementById('dossie-recent-debate-container');
      const factListContainer = document.getElementById('dossie-factchecking-list');
      
      const deb = cand.recentDebate;
      if (debateContainer && deb && deb.hasDebate) {
        debateContainer.innerHTML = `
          <!-- DEBATE BANNER & METADATA -->
          <div class="p-5 rounded-2xl bg-gradient-to-r from-purple-900/40 via-slate-900 to-sky-900/40 border border-purple-400/30 shadow-xl space-y-4 text-white">
            
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-rose-600 text-white flex items-center gap-1 shadow-sm">
                    <span class="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                    Último Debate Oficial
                  </span>
                  <span class="text-[10px] font-mono text-slate-300">${deb.date} às ${deb.time}</span>
                </div>
                <h4 class="text-base font-black text-white flex items-center gap-2">
                  ${deb.event}
                </h4>
                <p class="text-xs text-slate-300">
                  Organização: <strong>${deb.broadcaster}</strong> • Fase: <strong>${deb.stage}</strong>
                </p>
              </div>

              <!-- YouTube Link Button -->
              <a href="${deb.youtubeUrl}" target="_blank" class="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg transition flex-shrink-0">
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                <span>Assistir no YouTube</span>
                <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
              </a>
            </div>

            <!-- NotebookLM AI Transcript Badge & Disclaimer -->
            <div class="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
              <div class="flex items-center gap-2.5">
                <span class="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center font-black text-base flex-shrink-0">
                  🤖
                </span>
                <div>
                  <span class="font-bold text-white block text-sm">Motor de Transcrição: ${deb.transcriptionEngine}</span>
                  <span class="text-xs text-slate-400">Diarização automática de áudio e extração de 5 falas com carimbos de tempo.</span>
                </div>
              </div>
              <span class="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-400/30 text-xs font-mono font-bold ml-2 flex-shrink-0">Auditado</span>
            </div>

            <!-- 4 Debate KPIs Grid -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div class="p-4 rounded-xl bg-emerald-500/20 border border-emerald-400/30 space-y-1 text-center">
                <span class="text-xs uppercase font-bold text-emerald-200 block tracking-wide">Índice de Verdade</span>
                <span class="text-2xl font-black text-emerald-300 font-mono block">${deb.truthfulnessPct}%</span>
                <span class="text-xs text-emerald-200/80 font-semibold">Verdadeiro</span>
              </div>
              <div class="p-4 rounded-xl bg-sky-500/20 border border-sky-400/30 space-y-1 text-center">
                <span class="text-xs uppercase font-bold text-sky-200 block tracking-wide">Tempo de Fala</span>
                <span class="text-xl font-black text-sky-300 font-mono block">${deb.speakingTime}</span>
                <span class="text-xs text-sky-200/80 font-semibold">Usado no Debate</span>
              </div>
              <div class="p-4 rounded-xl bg-slate-600/40 border border-slate-400/30 space-y-1 text-center">
                <span class="text-xs uppercase font-bold text-slate-200 block tracking-wide">Dir. de Resposta</span>
                <span class="text-2xl font-black text-white font-mono block">${deb.rightOfReplyGranted}</span>
                <span class="text-xs text-slate-300 font-semibold">Concedidos</span>
              </div>
              <div class="p-4 rounded-xl bg-purple-500/20 border border-purple-400/30 space-y-1 text-center">
                <span class="text-xs uppercase font-bold text-purple-200 block tracking-wide">Confrontos</span>
                <span class="text-2xl font-black text-purple-300 font-mono block">${deb.clashesCount}</span>
                <span class="text-xs text-purple-200/80 font-semibold">Embates Diretos</span>
              </div>
            </div>

            <!-- 5 DEBATE STATEMENTS WITH TIMESTAMPS -->
            <div class="space-y-3 pt-2">
              <span class="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <i data-lucide="mic" class="w-3.5 h-3.5 text-rose-400"></i>
                5 Principais Falas do Candidato no Debate (Transcritas & Checadas):
              </span>

              <div class="space-y-2.5">
                ${deb.statements.map((stmt, idx) => `
                  <div class="p-3.5 rounded-xl bg-slate-900/90 border border-white/10 space-y-2 text-left shadow-sm">
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2">
                      <div class="flex items-center gap-2">
                        <span class="px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-mono font-black flex items-center gap-1">
                          <i data-lucide="clock" class="w-3 h-3 text-purple-400"></i> ${stmt.timestamp}
                        </span>
                        <span class="text-[10px] font-bold text-slate-300 font-sans">
                          🏷️ ${stmt.theme}
                        </span>
                      </div>
                      <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black border ${stmt.verdictClass}">
                        ${stmt.verdict}
                      </span>
                    </div>

                    <!-- Verbatim Statement Quote -->
                    <p class="text-xs font-medium text-slate-100 italic leading-relaxed">
                      "${stmt.quote}"
                    </p>

                    <!-- Fact Check Explanation & Source -->
                    <div class="p-2.5 rounded-lg bg-black/40 border border-white/5 space-y-1 text-xs">
                      <p class="text-[11px] text-slate-300 leading-relaxed">
                        🔍 <strong>Checagem Técnica:</strong> ${stmt.factCheckSummary}
                      </p>
                      <div class="flex items-center justify-between pt-1 border-t border-white/5 text-[10px]">
                        <span class="text-slate-400 font-mono">Fonte Oficial: <strong class="text-slate-200">${stmt.officialSource}</strong></span>
                        <a href="${stmt.sourceLink}" target="_blank" class="text-sky-400 hover:underline font-bold flex items-center gap-1">
                          <span>Ver Prova Oficial</span>
                          <i data-lucide="external-link" class="w-3 h-3"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

          </div>
        `;
      }

      // General Statements with Speech Date
      if (factListContainer && cand.factChecking) {
        factListContainer.innerHTML = cand.factChecking.map(f => `
          <div class="p-4 bg-slate-50 dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-white/5 space-y-2">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-white/5 pb-2">
              <div class="flex items-center gap-2">
                <span class="px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-[10px] font-mono font-bold flex items-center gap-1">
                  📅 ${f.date || 'Recente'}
                </span>
                <span class="text-[10.5px] font-bold text-sky-700 dark:text-cyan-400">
                  ${f.context || 'Declaração Pública'}
                </span>
              </div>
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black border ${
                f.status.includes('Verdadeiro') ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/30' :
                f.status.includes('Falso') ? 'bg-red-100 dark:bg-red-500/20 text-red-800 dark:text-red-300 border-red-300 dark:border-red-500/30' :
                'bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-500/30'
              }">
                ${f.status}
              </span>
            </div>

            <p class="text-xs text-slate-900 dark:text-white font-medium italic leading-relaxed">${f.statement}</p>
            
            <div class="flex items-center justify-between pt-1 text-[10px] text-slate-500 dark:text-slate-400 font-mono">
              <span>Fonte: <strong class="text-slate-700 dark:text-slate-300">${f.source}</strong></span>
              ${f.link && f.link !== '#' ? `<a href="${f.link}" target="_blank" class="text-sky-600 dark:text-cyan-400 hover:underline flex items-center gap-1 font-bold">Verificar Fonte <i data-lucide="external-link" class="w-3 h-3"></i></a>` : ''}
            </div>
          </div>
        `).join('');
      }
    }


// ================= ESPECTRO DE VOZ & SIMULADOR DE IMPACTO NO BOLSO =================
function burstSpectrum() {
  const bars = document.querySelectorAll('#voice-spectrum .voice-bar');
  bars.forEach(b => {
    b.classList.remove('burst');
    void b.offsetWidth;
    b.classList.add('burst');
  });
  setTimeout(() => bars.forEach(b => b.classList.remove('burst')), 700);
}

window.burstSpectrum = burstSpectrum;

  function renderPromessas(cand) {
    const container = document.getElementById('promessas-container');
    if(!container) return;
    
    // Mock data for promises
    const promessas = [
      { text: "Zeramento da fila de creches", status: "Em Andamento", pct: 45 },
      { text: "Redução do ICMS para combustíveis", status: "Cumprida", pct: 100 },
      { text: "Construção de 3 novos hospitais", status: "Quebrada", pct: 10 }
    ];
    
    let html = '';
    promessas.forEach(p => {
      let color = p.status === 'Cumprida' ? 'emerald' : p.status === 'Quebrada' ? 'red' : 'amber';
      html += `
        <div class="p-3 border border-slate-200 dark:border-white/10 rounded-xl bg-slate-50 dark:bg-slate-800/50">
          <div class="flex justify-between items-center mb-2">
            <span class="font-bold text-sm text-slate-800 dark:text-slate-200">${p.text}</span>
            <span class="text-xs font-bold text-${color}-600 dark:text-${color}-400 bg-${color}-100 dark:bg-${color}-900/30 px-2 py-0.5 rounded-md border border-${color}-200 dark:border-${color}-500/30">${p.status}</span>
          </div>
          <div class="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
            <div class="bg-${color}-500 h-1.5 rounded-full" style="width: ${p.pct}%"></div>
          </div>
        </div>
      `;
    });
    container.innerHTML = html;
  }
  
  
  // Automatically render promises on page load for the active candidate
  document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
          const urlParams = new URLSearchParams(window.location.search);
          const candId = urlParams.get('id');
          if(candId) {
             const cands = (typeof window.candidatesData !== 'undefined') ? window.candidatesData : [];
             const cand = cands.find(c => c.id === candId) || (typeof activeDossieCandidate !== 'undefined' ? activeDossieCandidate : null);
             if (cand && typeof renderPromessas === 'function') {
                 renderPromessas(cand);
             }
          }
      }, 500); // delay to ensure data is loaded
  });
