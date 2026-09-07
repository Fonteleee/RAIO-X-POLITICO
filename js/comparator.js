// Raio-X Político - Duelos Cívicos 1v1 e Gráficos Comparativos

// ================= COMPARATOR LOGIC (2 CANDIDATES OVERLAID RADAR) =================
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

      sel1.innerHTML = candidatesData.map(c => `<option value="${c.id}" ${c.id === selectedForCompare[0] ? 'selected' : ''}>${c.name} (${c.party})</option>`).join('');
      sel2.innerHTML = candidatesData.map(c => `<option value="${c.id}" ${c.id === selectedForCompare[1] ? 'selected' : ''}>${c.name} (${c.party})</option>`).join('');

      updateComparator();
    }

    function updateComparator() {
      const id1 = document.getElementById('compare-select-1').value;
      const id2 = document.getElementById('compare-select-2').value;
      selectedForCompare = [id1, id2];

      const cand1 = candidatesData.find(c => c.id === id1) || candidatesData[0];
      const cand2 = candidatesData.find(c => c.id === id2) || candidatesData[1];

      const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.1)';
      const labelColor = isDarkMode ? '#e2e8f0' : '#1e293b';
      const tickColor = isDarkMode ? '#64748b' : '#94a3b8';

      // Overlaid Radar Chart (Orange vs Purple, matching user's photo)
      const ctx = document.getElementById('comparatorRadarCanvas').getContext('2d');
      if (comparatorRadarChartInstance) comparatorRadarChartInstance.destroy();

      comparatorRadarChartInstance = new Chart(ctx, {
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
          datasets: [
            {
              label: cand1.name,
              data: [
                cand1.radar.integridade,
                cand1.radar.eficiencia,
                cand1.radar.transparencia,
                cand1.radar.coerencia,
                cand1.radar.viabilidade,
                cand1.radar.assiduidade
              ],
              backgroundColor: 'rgba(217, 119, 6, 0.25)', // Orange/Amber
              borderColor: '#d97706',
              borderWidth: 2.5,
              pointBackgroundColor: '#d97706',
              pointRadius: 4
            },
            {
              label: cand2.name,
              data: [
                cand2.radar.integridade,
                cand2.radar.eficiencia,
                cand2.radar.transparencia,
                cand2.radar.coerencia,
                cand2.radar.viabilidade,
                cand2.radar.assiduidade
              ],
              backgroundColor: 'rgba(147, 51, 234, 0.25)', // Purple
              borderColor: '#9333ea',
              borderWidth: 2.5,
              pointBackgroundColor: '#9333ea',
              pointRadius: 4
            }
          ]
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
            legend: {
              labels: { color: labelColor, font: { weight: 'bold' } }
            }
          }
        }
      });

      // Calculate truthfulness %
      const truth1 = cand1.recentDebate ? cand1.recentDebate.truthfulnessPct : 80;
      const truth2 = cand2.recentDebate ? cand2.recentDebate.truthfulnessPct : 80;

      // Side by Side Table Breakdown
      const breakdown = document.getElementById('comparison-breakdown');
      breakdown.innerHTML = `
        <div class="bg-slate-50 dark:bg-slate-800/90 p-4 rounded-2xl border border-slate-200 dark:border-white/5 space-y-3 text-xs">
          <h4 class="font-bold text-slate-900 dark:text-white text-sm border-b border-slate-200 dark:border-white/10 pb-2 flex items-center justify-between">
            <span>Métrica de Comparação</span>
            <span class="text-amber-700 dark:text-amber-400 font-bold">${cand1.name.split(' ')[0]}</span>
            <span class="text-purple-700 dark:text-purple-400 font-bold">${cand2.name.split(' ')[0]}</span>
          </h4>

          <!-- Emendas & Selo de Integridade -->
          <div class="flex items-center justify-between py-1.5 border-b border-slate-200 dark:border-white/5 bg-slate-100/70 dark:bg-slate-800/50 px-2 rounded-lg">
            <span class="text-slate-800 dark:text-slate-200 font-extrabold flex items-center gap-1.5">
              <i data-lucide="package" class="w-3.5 h-3.5 text-emerald-600"></i> Destinação de Emendas:
            </span>
            <span class="text-[10.5px] font-black text-amber-700 dark:text-amber-300 font-mono">${cand1.parliamentaryAmendments ? cand1.parliamentaryAmendments.totalExecuted : 'R$ 35.1M'} (${cand1.parliamentaryAmendments && cand1.parliamentaryAmendments.integritySeal ? cand1.parliamentaryAmendments.integritySeal.shortBadge : '🟢 100% Concurso'})</span>
            <span class="text-[10.5px] font-black text-purple-700 dark:text-purple-300 font-mono">${cand2.parliamentaryAmendments ? cand2.parliamentaryAmendments.totalExecuted : 'R$ 24.5M'} (${cand2.parliamentaryAmendments && cand2.parliamentaryAmendments.integritySeal ? cand2.parliamentaryAmendments.integritySeal.shortBadge : '🟡 85% Concurso'})</span>
          </div>

          <!-- Checagem Geral de Falas -->
          <div class="flex items-center justify-between py-1 border-b border-slate-200 dark:border-white/5">
            <span class="text-slate-600 dark:text-slate-400 font-medium">Índice de Veracidade das Falas:</span>
            <span class="font-bold text-amber-700 dark:text-amber-400 font-mono flex items-center gap-1">
              ${truth1}% Verdadeiro ${truth1 > truth2 ? '<span class="text-[9px] px-1 py-0.2 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-extrabold">🏆 Mais Factual</span>' : ''}
            </span>
            <span class="font-bold text-purple-700 dark:text-purple-400 font-mono flex items-center gap-1">
              ${truth2}% Verdadeiro ${truth2 > truth1 ? '<span class="text-[9px] px-1 py-0.2 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-extrabold">🏆 Mais Factual</span>' : ''}
            </span>
          </div>

          <div class="flex items-center justify-between py-1 border-b border-slate-200 dark:border-white/5">
            <span class="text-slate-600 dark:text-slate-400">Score Médio Geral:</span>
            <span class="font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1">
              ${Math.round(Object.values(cand1.radar).reduce((a,b)=>a+b)/6)}/100 ${Object.values(cand1.radar).reduce((a,b)=>a+b) > Object.values(cand2.radar).reduce((a,b)=>a+b) ? '<span class="text-[9px] px-1 py-0.2 rounded bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 font-extrabold">⭐ Maior</span>' : ''}
            </span>
            <span class="font-bold text-purple-700 dark:text-purple-400 flex items-center gap-1">
              ${Math.round(Object.values(cand2.radar).reduce((a,b)=>a+b)/6)}/100 ${Object.values(cand2.radar).reduce((a,b)=>a+b) > Object.values(cand1.radar).reduce((a,b)=>a+b) ? '<span class="text-[9px] px-1 py-0.2 rounded bg-purple-100 dark:bg-purple-500/20 text-purple-800 dark:text-purple-300 font-extrabold">⭐ Maior</span>' : ''}
            </span>
          </div>

          <div class="flex items-center justify-between py-1 border-b border-slate-200 dark:border-white/5">
            <span class="text-slate-600 dark:text-slate-400">Taxa de Presença (Plenário):</span>
            <span class="font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1">
              ${cand1.attendance.ratePct}% ${(cand1.attendance.ratePct || 0) > (cand2.attendance.ratePct || 0) ? '<span class="text-[9px] px-1 py-0.2 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-extrabold">📅 Mais Presente</span>' : ''}
            </span>
            <span class="font-bold text-purple-700 dark:text-purple-400 flex items-center gap-1">
              ${cand2.attendance.ratePct}% ${(cand2.attendance.ratePct || 0) > (cand1.attendance.ratePct || 0) ? '<span class="text-[9px] px-1 py-0.2 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-extrabold">📅 Mais Presente</span>' : ''}
            </span>
          </div>

          <div class="flex items-center justify-between py-1 border-b border-slate-200 dark:border-white/5">
            <span class="text-slate-600 dark:text-slate-400">Faltas Não Justificadas:</span>
            <span class="font-bold ${cand1.attendance.unjustifiedAbsences > 3 ? 'text-red-600' : 'text-emerald-600'}">${cand1.attendance.unjustifiedAbsences} faltas</span>
            <span class="font-bold ${cand2.attendance.unjustifiedAbsences > 3 ? 'text-red-600' : 'text-emerald-600'}">${cand2.attendance.unjustifiedAbsences} faltas</span>
          </div>

          <div class="flex items-center justify-between py-1 border-b border-slate-200 dark:border-white/5">
            <span class="text-slate-600 dark:text-slate-400">Gasto Mensal Declarado:</span>
            <span class="font-mono text-amber-700 dark:text-amber-400">${cand1.salary.spendingCeapMonthly}</span>
            <span class="font-mono text-purple-700 dark:text-purple-400">${cand2.salary.spendingCeapMonthly}</span>
          </div>

          <div class="flex items-center justify-between py-1 border-b border-slate-200 dark:border-white/5 bg-amber-50/50 dark:bg-amber-500/5 px-1.5 rounded">
            <span class="text-slate-700 dark:text-slate-300 font-bold flex items-center gap-1">
              <i data-lucide="timer" class="w-3 h-3 text-amber-600 dark:text-amber-400"></i> Custo por Minuto:
            </span>
            <span class="font-black text-amber-700 dark:text-amber-400 font-mono flex items-center gap-1">
              ${cand1.salary.civicConversion ? cand1.salary.civicConversion.costPerMinute : 'R$ 0,51 / min'}
            </span>
            <span class="font-black text-purple-700 dark:text-purple-400 font-mono flex items-center gap-1">
              ${cand2.salary.civicConversion ? cand2.salary.civicConversion.costPerMinute : 'R$ 0,43 / min'}
            </span>
          </div>

          <div class="flex items-center justify-between py-1 border-b border-slate-200 dark:border-white/5 bg-emerald-50/50 dark:bg-emerald-500/5 px-1.5 rounded">
            <span class="text-slate-700 dark:text-slate-300 font-bold flex items-center gap-1">
              <i data-lucide="calculator" class="w-3 h-3 text-emerald-600 dark:text-emerald-400"></i> Custo por Cidadão:
            </span>
            <span class="font-black text-amber-700 dark:text-amber-400 font-mono">${cand1.salary.civicConversion ? cand1.salary.civicConversion.costPerCitizen : 'R$ 0,006 / ano'}</span>
            <span class="font-black text-purple-700 dark:text-purple-400 font-mono">${cand2.salary.civicConversion ? cand2.salary.civicConversion.costPerCitizen : 'R$ 0,005 / ano'}</span>
          </div>

          <div class="flex items-center justify-between py-1 border-b border-slate-200 dark:border-white/5">
            <span class="text-slate-600 dark:text-slate-400">Condenações Judiciais:</span>
            <span class="font-bold text-emerald-600 dark:text-emerald-400">${(cand1.ethics && cand1.ethics.condemned !== undefined) ? cand1.ethics.condemned : 0}</span>
            <span class="font-bold text-emerald-600 dark:text-emerald-400">${(cand2.ethics && cand2.ethics.condemned !== undefined) ? cand2.ethics.condemned : 0}</span>
          </div>

          <div class="flex items-center justify-between py-1 border-b border-slate-200 dark:border-white/5">
            <span class="text-slate-600 dark:text-slate-400">Projetos de Lei Sancionados:</span>
            <span class="font-bold text-amber-700 dark:text-amber-400">${(cand1.bills && cand1.bills.approved !== undefined) ? cand1.bills.approved + ' leis' : '8 leis'}</span>
            <span class="font-bold text-purple-700 dark:text-purple-400">${(cand2.bills && cand2.bills.approved !== undefined) ? cand2.bills.approved + ' leis' : '8 leis'}</span>
          </div>

          <div class="flex items-center justify-between py-1">
            <span class="text-slate-600 dark:text-slate-400">Pesquisa de Voto (Consenso):</span>
            <span class="font-bold text-amber-700 dark:text-amber-400">${(cand1.polls && cand1.polls.datafolha) ? cand1.polls.datafolha : '34%'}</span>
            <span class="font-bold text-purple-700 dark:text-purple-400">${(cand2.polls && cand2.polls.datafolha) ? cand2.polls.datafolha : '32%'}</span>
          </div>
        </div>

        <!-- DUELO NO ÚLTIMO DEBATE OFICIAL (CONFRONTO DIRETO) -->
        <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-white/10 space-y-4">
          <div class="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-rose-500 animate-pulse"></span>
              <span class="font-extrabold text-slate-800 dark:text-slate-100 uppercase tracking-wider text-sm flex items-center gap-1.5">
                🎙️ Desempenho no Último Debate Oficial
              </span>
            </div>
            <span class="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/50 px-2 py-0.5 rounded-lg">18/08/2026 • Band SP</span>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-white/5 space-y-2.5">
              <strong class="text-sm text-slate-900 dark:text-white block font-extrabold text-center border-b border-slate-200 dark:border-white/5 pb-1">${cand1.name.split(' ')[0]}</strong>
              <div class="space-y-2 text-xs text-slate-700 dark:text-slate-200">
                <div class="flex items-center justify-between">
                  <span class="text-slate-500 dark:text-slate-400 font-medium">Veracidade:</span>
                  <strong class="text-emerald-600 dark:text-emerald-400 font-bold text-sm">${cand1.recentDebate ? cand1.recentDebate.truthfulnessPct : 80}%</strong>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-slate-500 dark:text-slate-400 font-medium">Tempo de Fala:</span>
                  <strong class="font-bold text-slate-800 dark:text-slate-100">${cand1.recentDebate ? cand1.recentDebate.speakingTime : '18m 45s'}</strong>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-slate-500 dark:text-slate-400 font-medium">Dir. Resposta:</span>
                  <strong class="font-bold text-slate-800 dark:text-slate-100">${cand1.recentDebate ? cand1.recentDebate.rightOfReplyGranted : 0} concedidos</strong>
                </div>
              </div>
            </div>

            <div class="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-white/5 space-y-2.5">
              <strong class="text-sm text-slate-900 dark:text-white block font-extrabold text-center border-b border-slate-200 dark:border-white/5 pb-1">${cand2.name.split(' ')[0]}</strong>
              <div class="space-y-2 text-xs text-slate-700 dark:text-slate-200">
                <div class="flex items-center justify-between">
                  <span class="text-slate-500 dark:text-slate-400 font-medium">Veracidade:</span>
                  <strong class="text-emerald-600 dark:text-emerald-400 font-bold text-sm">${cand2.recentDebate ? cand2.recentDebate.truthfulnessPct : 80}%</strong>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-slate-500 dark:text-slate-400 font-medium">Tempo de Fala:</span>
                  <strong class="font-bold text-slate-800 dark:text-slate-100">${cand2.recentDebate ? cand2.recentDebate.speakingTime : '19m 10s'}</strong>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-slate-500 dark:text-slate-400 font-medium">Dir. Resposta:</span>
                  <strong class="font-bold text-slate-800 dark:text-slate-100">${cand2.recentDebate ? cand2.recentDebate.rightOfReplyGranted : 0} concedidos</strong>
                </div>
              </div>
            </div>
          </div>

          <div class="text-center pt-1">
            <a href="${cand1.recentDebate ? cand1.recentDebate.youtubeUrl : '#'}" target="_blank" class="text-sm font-bold text-sky-600 dark:text-cyan-400 hover:underline inline-flex items-center gap-1.5">
              <span>Assistir gravação do debate com checagens em tempo real</span>
              <i data-lucide="external-link" class="w-4 h-4"></i>
            </a>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3 text-xs">
          <button onclick="openDossie('${cand1.id}')" class="py-2 rounded-xl bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-500/30 font-bold hover:bg-amber-200 dark:hover:bg-amber-500/30 transition">
            Ver Dossiê ${cand1.name.split(' ')[0]}
          </button>
          <button onclick="openDossie('${cand2.id}')" class="py-2 rounded-xl bg-purple-100 dark:bg-purple-500/20 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-500/30 font-bold hover:bg-purple-200 dark:hover:bg-purple-500/30 transition">
            Ver Dossiê ${cand2.name.split(' ')[0]}
          </button>
        </div>
      `;
    }

    function toggleCompare(candId) {
      if (!selectedForCompare.includes(candId)) {
        selectedForCompare[1] = candId;
      }
      navigateTab('comparator');
    }
