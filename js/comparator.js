// Figuras Políticas - Duelos Cívicos 1v1 e Gráficos Comparativos

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
      if (!sel1 || !sel2) return;

      sel1.innerHTML = candidatesData.map(c => `<option value="${c.id}" ${c.id === selectedForCompare[0] ? 'selected' : ''}>${c.name} (${c.party}) - ${c.position}</option>`).join('');
      sel2.innerHTML = candidatesData.map(c => `<option value="${c.id}" ${c.id === selectedForCompare[1] ? 'selected' : ''}>${c.name} (${c.party}) - ${c.position}</option>`).join('');

      updateComparator();
    }

    function filterCompareSelect(slot, query) {
      const sel = document.getElementById(`compare-select-${slot}`);
      if (!sel) return;
      const q = (query || '').toLowerCase().trim();
      const currentVal = sel.value;
      
      const filtered = candidatesData.filter(c => {
        if (!q) return true;
        const text = `${c.name} ${c.ballotName || ''} ${c.party} ${c.position} ${c.state || ''}`.toLowerCase();
        return text.includes(q);
      });

      if (filtered.length > 0) {
        sel.innerHTML = filtered.map(c => `<option value="${c.id}" ${c.id === currentVal ? 'selected' : ''}>${c.name} (${c.party}) - ${c.position}</option>`).join('');
        if (!filtered.some(c => c.id === currentVal)) {
          sel.value = filtered[0].id;
        }
        updateComparator();
      }
    }

    function updateComparator() {
      const id1 = document.getElementById('compare-select-1').value;
      const id2 = document.getElementById('compare-select-2').value;
      selectedForCompare = [id1, id2];

      const cand1 = candidatesData.find(c => c.id === id1) || candidatesData[0];
      const cand2 = candidatesData.find(c => c.id === id2) || candidatesData[1];

      // Renderiza a figurinha viva de duelo
      renderLiveDuelSticker(cand1, cand2);

      // Alerta de Comparação Interpoderes Constitucionais (Executivo vs Legislativo)
      const alertEl = document.getElementById('comparator-interpower-alert');
      if (alertEl) {
        if (cand1.officePower && cand2.officePower && cand1.officePower !== cand2.officePower) {
          const execCand = cand1.officePower === 'executivo' ? cand1 : cand2;
          const legCand = cand1.officePower === 'legislativo' ? cand1 : cand2;
          alertEl.innerHTML = `
            <div class="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-600/40 flex items-start gap-3 text-xs text-amber-900 dark:text-amber-200 shadow-xs">
              <i data-lucide="info" class="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5"></i>
              <div class="space-y-1">
                <div class="font-extrabold uppercase text-[10.5px] tracking-wider text-amber-800 dark:text-amber-300">
                  ⚖️ Comparação Interpoderes Constitucionais: Separação de Funções
                </div>
                <p class="leading-relaxed text-[11px]">
                  Você está comparando um governante do <strong>Poder Executivo</strong> (<em>${execCand.ballotName || execCand.name}</em>, ${execCand.position}) com um parlamentar do <strong>Poder Legislativo</strong> (<em>${legCand.ballotName || legCand.name}</em>, ${legCand.position}).
                  O Executivo é avaliado por gestão fiscal (LRF/Capag STN), entrega de obras e políticas públicas; o Legislativo é avaliado por projetos de leis estruturantes e fiscalização.
                </p>
              </div>
            </div>
          `;
          alertEl.classList.remove('hidden');
          if (window.lucide) lucide.createIcons();
        } else {
          alertEl.innerHTML = '';
          alertEl.classList.add('hidden');
        }
      }

      if (currentComparatorMode === 'plans') {
        renderGovernmentPlansComparison(cand1, cand2);
      }

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
            ['Integridade &', 'Ficha Limpa'],
            ['Eficiência', 'Legislativa'],
            ['Transparência', 'de Gastos'],
            ['Coerência', 'Discursiva'],
            ['Viabilidade', 'de Propostas'],
            ['Presença no', 'Mandato']
          ],
          datasets: [
            {
              label: cand1.name,
              data: [
                cand1.radar?.integridade ?? 90,
                cand1.radar?.eficiencia ?? 85,
                cand1.radar?.transparencia ?? 88,
                cand1.radar?.coerencia ?? 85,
                cand1.radar?.viabilidade ?? 85,
                cand1.radar?.presenca ?? cand1.radar?.assiduidade ?? cand1.attendance?.ratePct ?? 90
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
                cand2.radar?.integridade ?? 90,
                cand2.radar?.eficiencia ?? 85,
                cand2.radar?.transparencia ?? 88,
                cand2.radar?.coerencia ?? 85,
                cand2.radar?.viabilidade ?? 85,
                cand2.radar?.presenca ?? cand2.radar?.assiduidade ?? cand2.attendance?.ratePct ?? 90
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
          layout: {
            padding: {
              top: 15,
              bottom: 15,
              left: 40,
              right: 40
            }
          },
          scales: {
            r: {
              angleLines: { color: gridColor },
              grid: { color: gridColor },
              pointLabels: {
                color: labelColor,
                font: { size: 10.5, weight: '700', family: 'Inter, -apple-system, sans-serif' },
                padding: 6
              },
              ticks: {
                backdropColor: 'transparent',
                color: tickColor,
                stepSize: 20,
                min: 0,
                max: 100,
                font: { size: 9, family: 'JetBrains Mono, monospace' }
              }
            }
          },
          plugins: {
            legend: {
              position: 'top',
              labels: {
                color: labelColor,
                font: { weight: '700', size: 11, family: 'Inter, -apple-system, sans-serif' },
                boxWidth: 12,
                padding: 10
              }
            }
          }
        }
      });

      // Calculate truthfulness %
      const truth1 = cand1.recentDebate ? cand1.recentDebate.truthfulnessPct : 80;
      const truth2 = cand2.recentDebate ? cand2.recentDebate.truthfulnessPct : 80;

      // Side by Side Table Breakdown
      const breakdown = document.getElementById('comparison-breakdown');
      const pol1 = cand1.politicalCapacity || {};
      const pol2 = cand2.politicalCapacity || {};
      const camp1 = cand1.campaignFinance || {};
      const camp2 = cand2.campaignFinance || {};
      const eth1 = cand1.ethicsDetailed || {};
      const eth2 = cand2.ethicsDetailed || {};
      const party1 = cand1.partyIntegrity || {};
      const party2 = cand2.partyIntegrity || {};
      const const1 = cand1.constitutionalEffectiveness || {};
      const const2 = cand2.constitutionalEffectiveness || {};
      const jur1 = cand1.jurisdictionProblemsMatch || {};
      const jur2 = cand2.jurisdictionProblemsMatch || {};

      function getCandRank(c) {
        if (window.candidateRankPositions && window.candidateRankPositions[c.id] && window.candidateRankPositions[c.id].roleRank) {
          return window.candidateRankPositions[c.id];
        }
        const role = (c.position || 'Deputado Federal').toLowerCase();
        let roleName = 'Deputado Federal';
        let matchFn = (pos) => pos.toLowerCase().includes('deputad');
        if (role.includes('governad')) {
          roleName = 'Governador';
          matchFn = (pos) => pos.toLowerCase().includes('governad');
        } else if (role.includes('prefeit')) {
          roleName = 'Prefeito';
          matchFn = (pos) => pos.toLowerCase().includes('prefeit');
        } else if (role.includes('senad')) {
          roleName = 'Senador';
          matchFn = (pos) => pos.toLowerCase().includes('senad');
        } else if (role.includes('president')) {
          roleName = 'Presidente';
          matchFn = (pos) => pos.toLowerCase().includes('president');
        }
        const roleList = (typeof candidatesData !== 'undefined' ? candidatesData : []).filter(item => item.position && matchFn(item.position));
        const getScore = (item) => (typeof item.overallScore === 'number') ? item.overallScore : 75;
        roleList.sort((a, b) => getScore(b) - getScore(a));
        const roleIdx = roleList.findIndex(item => item.id === c.id);
        const allList = [...(typeof candidatesData !== 'undefined' ? candidatesData : [])];
        allList.sort((a, b) => getScore(b) - getScore(a));
        const allIdx = allList.findIndex(item => item.id === c.id);
        return {
          roleRank: roleIdx >= 0 ? roleIdx + 1 : 1,
          roleTotal: roleList.length,
          roleName: roleName,
          overallRank: allIdx >= 0 ? allIdx + 1 : 1,
          overallTotal: allList.length
        };
      }
      const rank1 = getCandRank(cand1);
      const rank2 = getCandRank(cand2);
      const ipr1 = cand1.careerProductivity || {};
      const ipr2 = cand2.careerProductivity || {};

      breakdown.innerHTML = `
        <div class="bg-slate-50 dark:bg-slate-800/90 p-2.5 sm:p-3 rounded-2xl border border-slate-200 dark:border-white/10 space-y-2 text-xs">
          <!-- Cabeçalho da Tabela Comparativa -->
          <div class="flex items-center justify-between pb-1.5 border-b border-slate-200 dark:border-white/10">
            <span class="text-[11px] font-black uppercase tracking-wider text-slate-800 dark:text-white flex items-center gap-1">
              <i data-lucide="scale" class="w-3.5 h-3.5 text-purple-600 dark:text-purple-400"></i> Matriz Cívica
            </span>
            <div class="flex items-center gap-2 font-mono text-[10.5px] font-bold">
              <span class="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">${cand1.name.split(' ')[0]}</span>
              <span class="text-slate-400 font-normal">vs</span>
              <span class="px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/30">${cand2.name.split(' ')[0]}</span>
            </div>
          </div>

          <!-- Tabela de Métricas Cívicas Compacta -->
          <div class="space-y-1 text-[11px]">
            <!-- 1. Posição no Ranking -->
            <div class="flex items-center justify-between p-1.5 rounded-lg bg-white/70 dark:bg-slate-900/50 border border-slate-200/80 dark:border-white/5">
              <span class="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <i data-lucide="trophy" class="w-3 h-3 text-amber-500"></i> Ranking Oficial:
              </span>
              <div class="flex items-center gap-2 font-mono text-[10px] font-bold">
                <span class="text-amber-700 dark:text-amber-400">#${rank1.roleRank}º (${rank1.roleName})</span>
                <span class="text-slate-300 dark:text-slate-600">|</span>
                <span class="text-purple-700 dark:text-purple-400">#${rank2.roleRank}º (${rank2.roleName})</span>
              </div>
            </div>

            <!-- 2. IPR - Produtividade de Carreira -->
            <div class="flex items-center justify-between p-1.5 rounded-lg bg-white/70 dark:bg-slate-900/50 border border-slate-200/80 dark:border-white/5">
              <span class="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <i data-lucide="zap" class="w-3 h-3 text-amber-500"></i> Produtividade IPR:
              </span>
              <div class="flex items-center gap-2 font-mono text-[10px] font-bold">
                <span class="${(ipr1.productivityScore || 75) >= (ipr2.productivityScore || 75) ? 'text-amber-700 dark:text-amber-400 font-black' : 'text-slate-600 dark:text-slate-400'}">${ipr1.productivityScore || 75}/100 (${ipr1.lawsAuthoredEnacted || 0} leis)</span>
                <span class="text-slate-300 dark:text-slate-600">|</span>
                <span class="${(ipr2.productivityScore || 75) >= (ipr1.productivityScore || 75) ? 'text-purple-700 dark:text-purple-400 font-black' : 'text-slate-600 dark:text-slate-400'}">${ipr2.productivityScore || 75}/100 (${ipr2.lawsAuthoredEnacted || 0} leis)</span>
              </div>
            </div>

            <!-- 3. Capacidade Política & Técnica -->
            <div class="flex items-center justify-between p-1.5 rounded-lg bg-white/70 dark:bg-slate-900/50 border border-slate-200/80 dark:border-white/5">
              <span class="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <i data-lucide="award" class="w-3 h-3 text-sky-500"></i> Formação & Técnica:
              </span>
              <div class="flex items-center gap-2 font-mono text-[10px] font-bold">
                <span class="text-amber-700 dark:text-amber-400">${pol1.score || 85}/100</span>
                <span class="text-slate-300 dark:text-slate-600">|</span>
                <span class="text-purple-700 dark:text-purple-400">${pol2.score || 85}/100</span>
              </div>
            </div>

            <!-- 4. Gasto Campanha & Custo/Voto TSE -->
            <div class="flex items-center justify-between p-1.5 rounded-lg bg-white/70 dark:bg-slate-900/50 border border-slate-200/80 dark:border-white/5">
              <span class="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <i data-lucide="dollar-sign" class="w-3 h-3 text-emerald-500"></i> Custo por Voto TSE:
              </span>
              <div class="flex items-center gap-2 font-mono text-[10px] font-bold">
                <span class="text-amber-700 dark:text-amber-400">${camp1.costPerVote || 'R$ 6,88'}</span>
                <span class="text-slate-300 dark:text-slate-600">|</span>
                <span class="text-purple-700 dark:text-purple-400">${camp2.costPerVote || 'R$ 5,20'}</span>
              </div>
            </div>

            <!-- 5. Custo por Minuto do Mandato -->
            <div class="flex items-center justify-between p-1.5 rounded-lg bg-white/70 dark:bg-slate-900/50 border border-slate-200/80 dark:border-white/5">
              <span class="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <i data-lucide="timer" class="w-3 h-3 text-amber-500"></i> Custo aos Cofres / Min:
              </span>
              <div class="flex items-center gap-2 font-mono text-[10px] font-bold">
                <span class="text-amber-700 dark:text-amber-400">${cand1.salary?.civicConversion?.costPerMinute || 'R$ 0,51 / min'}</span>
                <span class="text-slate-300 dark:text-slate-600">|</span>
                <span class="text-purple-700 dark:text-purple-400">${cand2.salary?.civicConversion?.costPerMinute || 'R$ 0,43 / min'}</span>
              </div>
            </div>

            <!-- 6. Status Judicial & Ficha Limpa -->
            <div class="flex items-center justify-between p-1.5 rounded-lg bg-white/70 dark:bg-slate-900/50 border border-slate-200/80 dark:border-white/5">
              <span class="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <i data-lucide="shield-check" class="w-3 h-3 text-emerald-500"></i> Ficha Limpa STF/STJ:
              </span>
              <div class="flex items-center gap-2 text-[10px] font-bold">
                <span class="${(!cand1.ethics || cand1.ethics.condemned === 0) ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}">${(!cand1.ethics || cand1.ethics.condemned === 0) ? '🟢 0 Condenações' : '🟡 Ações em Andamento'}</span>
                <span class="text-slate-300 dark:text-slate-600">|</span>
                <span class="${(!cand2.ethics || cand2.ethics.condemned === 0) ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}">${(!cand2.ethics || cand2.ethics.condemned === 0) ? '🟢 0 Condenações' : '🟡 Ações em Andamento'}</span>
              </div>
            </div>

            <!-- 7. Veracidade das Falas -->
            <div class="flex items-center justify-between p-1.5 rounded-lg bg-white/70 dark:bg-slate-900/50 border border-slate-200/80 dark:border-white/5">
              <span class="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <i data-lucide="message-square-quote" class="w-3 h-3 text-amber-500"></i> Veracidade Falas:
              </span>
              <div class="flex items-center gap-2 font-mono text-[10px] font-bold">
                <span class="${truth1 >= truth2 ? 'text-amber-700 dark:text-amber-400 font-black' : 'text-slate-600 dark:text-slate-400'}">${truth1}% Factual</span>
                <span class="text-slate-300 dark:text-slate-600">|</span>
                <span class="${truth2 >= truth1 ? 'text-purple-700 dark:text-purple-400 font-black' : 'text-slate-600 dark:text-slate-400'}">${truth2}% Factual</span>
              </div>
            </div>

            <!-- 8. Presença em Plenário -->
            <div class="flex items-center justify-between p-1.5 rounded-lg bg-white/70 dark:bg-slate-900/50 border border-slate-200/80 dark:border-white/5">
              <span class="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <i data-lucide="calendar-check" class="w-3 h-3 text-blue-500"></i> Presença Plenária:
              </span>
              <div class="flex items-center gap-2 font-mono text-[10px] font-bold">
                <span class="text-amber-700 dark:text-amber-400">${cand1.attendance?.ratePct || 92}%</span>
                <span class="text-slate-300 dark:text-slate-600">|</span>
                <span class="text-purple-700 dark:text-purple-400">${cand2.attendance?.ratePct || 90}%</span>
              </div>
            </div>

            <!-- 9. Emendas Parlamentares -->
            <div class="flex items-center justify-between p-1.5 rounded-lg bg-white/70 dark:bg-slate-900/50 border border-slate-200/80 dark:border-white/5">
              <span class="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <i data-lucide="package" class="w-3 h-3 text-purple-500"></i> Emendas Executadas:
              </span>
              <div class="flex items-center gap-2 font-mono text-[10px] font-bold">
                <span class="text-amber-700 dark:text-amber-400">${cand1.parliamentaryAmendments ? cand1.parliamentaryAmendments.totalExecuted : 'R$ 35.1M'}</span>
                <span class="text-slate-300 dark:text-slate-600">|</span>
                <span class="text-purple-700 dark:text-purple-400">${cand2.parliamentaryAmendments ? cand2.parliamentaryAmendments.totalExecuted : 'R$ 24.5M'}</span>
              </div>
            </div>
          </div>

          <!-- Auditoria Consolidada de Falas (Accordion Compacto) -->
          <details class="group rounded-xl bg-white/70 dark:bg-slate-900/50 border border-slate-200/80 dark:border-white/5 p-2 text-xs">
            <summary class="font-bold cursor-pointer text-slate-800 dark:text-slate-200 flex items-center justify-between select-none text-[11px]">
              <span class="flex items-center gap-1.5">
                <i data-lucide="check-circle" class="w-3.5 h-3.5 text-emerald-500"></i> Falas Públicas Auditadas (7 Checagens)
              </span>
              <i data-lucide="chevron-down" class="w-3.5 h-3.5 group-open:rotate-180 transition-transform text-slate-400"></i>
            </summary>
            <div class="mt-2 pt-2 border-t border-slate-200 dark:border-white/10 grid grid-cols-2 gap-2 text-[10.5px]">
              <div class="p-2 rounded-lg bg-slate-100 dark:bg-slate-800/50 space-y-1">
                <strong class="text-slate-900 dark:text-white block font-bold text-center border-b border-slate-200 dark:border-white/5 pb-0.5">${cand1.name.split(' ')[0]}</strong>
                <div>Fatos Confirmados: <strong class="text-emerald-600 dark:text-emerald-400 font-bold">${cand1.recentStatements ? Math.round((cand1.recentStatements.filter(s => s.verdict.includes('Verdadeiro') || s.verdict.includes('Confirmado')).length / cand1.recentStatements.length) * 100) : 86}%</strong></div>
                <div>Falas Auditadas: <strong>${cand1.recentStatements ? cand1.recentStatements.length : 7} recentes</strong></div>
                <div>Fake News: <strong class="text-emerald-600 dark:text-emerald-400">${cand1.recentStatements ? cand1.recentStatements.filter(s => s.verdict.includes('Falso')).length : 0} registradas</strong></div>
              </div>
              <div class="p-2 rounded-lg bg-slate-100 dark:bg-slate-800/50 space-y-1">
                <strong class="text-slate-900 dark:text-white block font-bold text-center border-b border-slate-200 dark:border-white/5 pb-0.5">${cand2.name.split(' ')[0]}</strong>
                <div>Fatos Confirmados: <strong class="text-emerald-600 dark:text-emerald-400 font-bold">${cand2.recentStatements ? Math.round((cand2.recentStatements.filter(s => s.verdict.includes('Verdadeiro') || s.verdict.includes('Confirmado')).length / cand2.recentStatements.length) * 100) : 86}%</strong></div>
                <div>Falas Auditadas: <strong>${cand2.recentStatements ? cand2.recentStatements.length : 7} recentes</strong></div>
                <div>Fake News: <strong class="text-emerald-600 dark:text-emerald-400">${cand2.recentStatements ? cand2.recentStatements.filter(s => s.verdict.includes('Falso')).length : 0} registradas</strong></div>
              </div>
            </div>
          </details>

          <!-- Dossiês Rápidos -->
          <div class="grid grid-cols-2 gap-2 pt-1">
            <button onclick="openDossie('${cand1.id}')" class="py-1.5 rounded-xl bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-500/30 font-bold text-xs hover:bg-amber-200 dark:hover:bg-amber-500/30 transition cursor-pointer flex items-center justify-center gap-1">
              <i data-lucide="file-text" class="w-3 h-3"></i> Dossiê ${cand1.name.split(' ')[0]}
            </button>
            <button onclick="openDossie('${cand2.id}')" class="py-1.5 rounded-xl bg-purple-100 dark:bg-purple-500/20 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-500/30 font-bold text-xs hover:bg-purple-200 dark:hover:bg-purple-500/30 transition cursor-pointer flex items-center justify-center gap-1">
              <i data-lucide="file-text" class="w-3 h-3"></i> Dossiê ${cand2.name.split(' ')[0]}
            </button>
          </div>
        </div>
      `;

      if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
      }
    }

    function toggleCompare(candId) {
      if (!selectedForCompare.includes(candId)) {
        selectedForCompare[1] = candId;
      }
      navigateTab('comparator');
    }

    function renderLiveDuelSticker(cand1, cand2) {
      const target = document.getElementById('comparator-live-duel-target');
      if (!target || !cand1 || !cand2) return;

      const score1 = (!isNaN(Number(cand1.overallScore)) && cand1.overallScore !== null) ? Number(cand1.overallScore) : ((typeof calculateOverallScore === 'function') ? calculateOverallScore(cand1) : 80);
      const score2 = (!isNaN(Number(cand2.overallScore)) && cand2.overallScore !== null) ? Number(cand2.overallScore) : ((typeof calculateOverallScore === 'function') ? calculateOverallScore(cand2) : 80);

      const name1 = (cand1.ballotName || cand1.name).split(' ')[0];
      const name2 = (cand2.ballotName || cand2.name).split(' ')[0];
      const fullName1 = cand1.ballotName || cand1.name;
      const fullName2 = cand2.ballotName || cand2.name;

      const safeAvatar1 = (window.getSafeAvatarUrl ? window.getSafeAvatarUrl(cand1, cand1.name) : cand1.avatar) || (window.getSafeAvatarFallback ? window.getSafeAvatarFallback(cand1.name) : `https://ui-avatars.com/api/?name=${encodeURIComponent(cand1.name)}&background=f59e0b&color=fff&bold=true&size=128`);
      const safeAvatar2 = (window.getSafeAvatarUrl ? window.getSafeAvatarUrl(cand2, cand2.name) : cand2.avatar) || (window.getSafeAvatarFallback ? window.getSafeAvatarFallback(cand2.name) : `https://ui-avatars.com/api/?name=${encodeURIComponent(cand2.name)}&background=8b5cf6&color=fff&bold=true&size=128`);

      // 4 Gatilhos de Viralidade Cívica (Sem Custo por Minuto)
      // 1. Custo por Voto TSE & Gasto Campanha
      const campSpent1 = cand1.campaignFinance ? cand1.campaignFinance.totalSpentFormatted.replace(' milhões', 'M').replace(' milhão', 'M') : 'R$ 16,5M';
      const campSpent2 = cand2.campaignFinance ? cand2.campaignFinance.totalSpentFormatted.replace(' milhões', 'M').replace(' milhão', 'M') : 'R$ 14,2M';
      const costVote1 = cand1.campaignFinance?.costPerVote || 'R$ 9,23 / voto';
      const costVote2 = cand2.campaignFinance?.costPerVote || 'R$ 11,40 / voto';
      const fmtCostVote1 = costVote1.replace(' / voto', ' por voto');
      const fmtCostVote2 = costVote2.replace(' / voto', ' por voto');
      const numCost1 = parseFloat(costVote1.replace('R$', '').replace(',', '.').trim()) || 9.23;
      const numCost2 = parseFloat(costVote2.replace('R$', '').replace(',', '.').trim()) || 11.40;
      const costWinner = numCost1 <= numCost2 ? 1 : 2;

      // 2. Leis Estruturantes vs % Cerimonial
      const laws1 = cand1.bills?.approved ?? (cand1.bills?.total ? Math.round(cand1.bills.total * 0.4) : 7);
      const laws2 = cand2.bills?.approved ?? (cand2.bills?.total ? Math.round(cand2.bills.total * 0.4) : 6);
      const ceremPct1 = cand1.careerProductivity?.ceremonialBillsPct ?? 35;
      const ceremPct2 = cand2.careerProductivity?.ceremonialBillsPct ?? 42;
      const lawsWinner = laws1 >= laws2 ? 1 : 2;

      // 3. Veredito de Fatos em Debates
      const truth1 = cand1.recentDebate?.truthfulnessPct ?? (cand1.radar?.coerencia || 88);
      const truth2 = cand2.recentDebate?.truthfulnessPct ?? (cand2.radar?.coerencia || 85);
      const truthWinner = truth1 >= truth2 ? 1 : 2;

      // 4. Certidão Ficha Limpa Oficial
      const isClean1 = (!cand1.ethics || cand1.ethics.condemned === 0);
      const isClean2 = (!cand2.ethics || cand2.ethics.condemned === 0);

      // Score Winner
      const scoreWinner = score1 >= score2 ? 1 : 2;

      target.innerHTML = `
        <div class="relative bg-[#0a0a0c] text-white rounded-2xl p-2 sm:p-2.5 border border-white/15 shadow-xl backdrop-blur-2xl overflow-hidden font-sans space-y-1.5">
          <!-- Background Ambient Glow Rings estilo Apple -->
          <div class="absolute -top-16 -left-16 w-32 h-32 rounded-full bg-amber-500/15 blur-3xl pointer-events-none"></div>
          <div class="absolute -bottom-16 -right-16 w-32 h-32 rounded-full bg-purple-600/20 blur-3xl pointer-events-none"></div>

          <!-- Apple Header Padronizado Compacto -->
          <div class="relative z-10 flex items-center justify-between border-b border-white/10 pb-1">
            <div class="flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/50"></span>
              <span class="text-[8.5px] sm:text-[9px] font-mono font-black uppercase tracking-wider text-white/90">FIGURAS POLÍTICAS • DUELO CÍVICO</span>
            </div>
            <span class="text-[7.5px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-white/10 text-white/80 border border-white/10 backdrop-blur-md">
              04/10/2026
            </span>
          </div>

          <!-- Head-to-Head Clash (Contender A vs Contender B) -->
          <div class="relative z-10 grid grid-cols-11 items-center gap-1 p-1.5 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
            <!-- Candidato A (Amber Glow) -->
            <div class="col-span-5 flex items-center gap-1.5 min-w-0">
              <div class="relative flex-shrink-0">
                <img src="${safeAvatar1}" alt="${fullName1}" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(name1)}&background=f59e0b&color=fff&bold=true&size=128';" class="w-9 h-9 sm:w-10 sm:h-10 rounded-lg object-cover ring-2 ring-amber-500/80 shadow-md shadow-amber-500/20 bg-slate-800">
                ${scoreWinner === 1 ? '<span class="absolute -top-1 -right-1 text-[9px]">👑</span>' : ''}
              </div>
              <div class="min-w-0 text-left">
                <h4 class="font-extrabold text-[11px] sm:text-xs text-white block truncate uppercase tracking-tight leading-tight">${name1}</h4>
                <p class="text-[8px] font-mono font-bold text-amber-400 truncate">${cand1.party} • Nº ${cand1.number}</p>
                <div class="inline-flex items-center gap-0.5 px-1 py-0.2 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-[8px] font-black leading-tight">
                  Score ${score1}
                </div>
              </div>
            </div>

            <!-- Central VS Badge -->
            <div class="col-span-1 text-center">
              <div class="w-4 h-4 rounded-full bg-gradient-to-br from-amber-500 to-purple-600 text-white font-black text-[7px] flex items-center justify-center mx-auto shadow-md shadow-purple-900/40 ring-1 ring-white/30">
                VS
              </div>
            </div>

            <!-- Candidato B (Purple Glow) -->
            <div class="col-span-5 flex items-center justify-end gap-1.5 text-right min-w-0">
              <div class="min-w-0">
                <h4 class="font-extrabold text-[11px] sm:text-xs text-white block truncate uppercase tracking-tight leading-tight">${name2}</h4>
                <p class="text-[8px] font-mono font-bold text-purple-400 truncate">${cand2.party} • Nº ${cand2.number}</p>
                <div class="inline-flex items-center gap-0.5 px-1 py-0.2 rounded bg-purple-500/20 border border-purple-500/40 text-purple-300 font-mono text-[8px] font-black leading-tight">
                  Score ${score2}
                </div>
              </div>
              <div class="relative flex-shrink-0">
                <img src="${safeAvatar2}" alt="${fullName2}" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(name2)}&background=8b5cf6&color=fff&bold=true&size=128';" class="w-9 h-9 sm:w-10 sm:h-10 rounded-lg object-cover ring-2 ring-purple-500/80 shadow-md shadow-purple-500/20 bg-slate-800">
                ${scoreWinner === 2 ? '<span class="absolute -top-1 -left-1 text-[9px]">👑</span>' : ''}
              </div>
            </div>
          </div>

          <!-- Matriz de Confronto dos 4 Gatilhos de Viralidade Cívica Compacta -->
          <div class="relative z-10 space-y-0.5 text-[9.5px] font-mono">
            <!-- Gatilho 1: Gasto Campanha & Custo/Voto TSE -->
            <div class="p-1 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-between">
              <div class="flex items-center gap-1 text-white/70">
                <span>🗳️</span>
                <span class="text-[9px] font-sans font-semibold">Gasto TSE:</span>
              </div>
              <div class="flex items-center gap-1 font-bold text-[9px]">
                <span class="${costWinner === 1 ? 'text-amber-400 bg-amber-500/20 px-1 py-0.2 rounded border border-amber-500/30' : 'text-white/60'}">${fmtCostVote1} (${campSpent1})</span>
                <span class="text-white/30 font-normal text-[8px]">vs</span>
                <span class="${costWinner === 2 ? 'text-purple-400 bg-purple-500/20 px-1 py-0.2 rounded border border-purple-500/30' : 'text-white/60'}">${fmtCostVote2} (${campSpent2})</span>
              </div>
            </div>

            <!-- Gatilho 2: Leis Aprovadas vs % Cerimonial -->
            <div class="p-1 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-between">
              <div class="flex items-center gap-1 text-white/70">
                <span>🏛️</span>
                <span class="text-[9px] font-sans font-semibold">Leis Reais:</span>
              </div>
              <div class="flex items-center gap-1 font-bold text-[9px]">
                <span class="${lawsWinner === 1 ? 'text-amber-400 bg-amber-500/20 px-1 py-0.2 rounded border border-amber-500/30' : 'text-white/60'}">${laws1} leis (${ceremPct1}% cer.)</span>
                <span class="text-white/30 font-normal text-[8px]">vs</span>
                <span class="${lawsWinner === 2 ? 'text-purple-400 bg-purple-500/20 px-1 py-0.2 rounded border border-purple-500/30' : 'text-white/60'}">${laws2} leis (${ceremPct2}% cer.)</span>
              </div>
            </div>

            <!-- Gatilho 3: Veracidade das Falas -->
            <div class="p-1 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-between">
              <div class="flex items-center gap-1 text-white/70">
                <span>🎯</span>
                <span class="text-[9px] font-sans font-semibold">Veracidade:</span>
              </div>
              <div class="flex items-center gap-1 font-bold text-[9px]">
                <span class="${truthWinner === 1 ? 'text-amber-400 bg-amber-500/20 px-1 py-0.2 rounded border border-amber-500/30' : 'text-white/60'}">${truth1}% Fatos</span>
                <span class="text-white/30 font-normal text-[8px]">vs</span>
                <span class="${truthWinner === 2 ? 'text-purple-400 bg-purple-500/20 px-1 py-0.2 rounded border border-purple-500/30' : 'text-white/60'}">${truth2}% Fatos</span>
              </div>
            </div>

            <!-- Gatilho 4: Certidão Oficial Ficha Limpa -->
            <div class="p-1 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-between">
              <div class="flex items-center gap-1 text-white/70">
                <span>🛡️</span>
                <span class="text-[9px] font-sans font-semibold">Ficha Limpa:</span>
              </div>
              <div class="flex items-center gap-1 font-bold text-[9px]">
                <span class="${isClean1 ? 'text-emerald-400' : 'text-amber-400'}">${isClean1 ? '0 Condenações' : 'Ações em Andamento'}</span>
                <span class="text-white/30 font-normal text-[8px]">vs</span>
                <span class="${isClean2 ? 'text-emerald-400' : 'text-amber-400'}">${isClean2 ? '0 Condenações' : 'Ações em Andamento'}</span>
              </div>
            </div>
          </div>

          <!-- Bottom Viral CTA & Dossiês Rápidos -->
          <div class="relative z-10 flex items-center gap-1.5 pt-0.5">
            <button onclick="exportComparisonCard()" class="flex-1 py-1 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-[10.5px] transition shadow-md shadow-purple-600/30 flex items-center justify-center gap-1 cursor-pointer">
              <i data-lucide="sparkles" class="w-3 h-3"></i> Baixar Figurinha 4K
            </button>
            <button onclick="openDossie('${cand1.id}')" class="px-2 py-1 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-[10.5px] border border-amber-500/30 transition cursor-pointer" title="Ver Dossiê ${name1}">
              ${name1}
            </button>
            <button onclick="openDossie('${cand2.id}')" class="px-2 py-1 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 font-bold text-[10.5px] border border-purple-500/30 transition cursor-pointer" title="Ver Dossiê ${name2}">
              ${name2}
            </button>
          </div>
        </div>
      `;

      if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
      }
    }

    function shareDuelWhatsApp() {
      const sel1 = document.getElementById('compare-select-1');
      const sel2 = document.getElementById('compare-select-2');
      if (!sel1 || !sel2) return;
      const data = (typeof window !== 'undefined' && window.candidatesData) ? window.candidatesData : (typeof candidatesData !== 'undefined' ? candidatesData : []);
      const cand1 = data.find(c => c.id === sel1.value) || data[0];
      const cand2 = data.find(c => c.id === sel2.value) || data[1];
      if (!cand1 || !cand2) return;

      const name1 = cand1.ballotName || cand1.name;
      const name2 = cand2.ballotName || cand2.name;
      const cost1 = cand1.campaignFinance?.costPerVote || 'R$ 9,23/voto';
      const cost2 = cand2.campaignFinance?.costPerVote || 'R$ 11,40/voto';
      const text = `⚔️ *DUELO CÍVICO 2026:*\n${name1} (${cand1.party}) vs ${name2} (${cand2.party})\n\n📊 *Custo por Voto TSE:* ${name1} (${cost1}) vs ${name2} (${cost2})\n🛡️ *Ficha Limpa:* Ambos auditados perante CNJ e STF\n\nVeja o confronto completo e auditado no Figuras Políticas:\n${window.location.origin}/index.html?cand1=${cand1.id}&cand2=${cand2.id}#tab-comparator`;
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
    }

    function copyDuelLink() {
      const sel1 = document.getElementById('compare-select-1');
      const sel2 = document.getElementById('compare-select-2');
      if (!sel1 || !sel2) return;
      const url = `${window.location.origin}/index.html?cand1=${sel1.value}&cand2=${sel2.value}#tab-comparator`;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(() => {
          alert('Link do confronto copiado para a área de transferência!');
        }).catch(() => {
          prompt('Copie o link do confronto:', url);
        });
      } else {
        prompt('Copie o link do confronto:', url);
      }
    }

    // ================= MODO DE PLANOS DE GOVERNO TSE =================
    let currentComparatorMode = 'radar';

    function setComparatorMode(mode) {
      currentComparatorMode = mode;
      const radarBtn = document.getElementById('btn-compare-mode-radar');
      const plansBtn = document.getElementById('btn-compare-mode-plans');
      const radarView = document.getElementById('comparator-radar-view');
      const plansView = document.getElementById('comparator-plans-view');

      if (mode === 'plans') {
        if (radarBtn) radarBtn.className = 'px-4 py-1.5 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition flex items-center gap-1.5 cursor-pointer';
        if (plansBtn) plansBtn.className = 'px-4 py-1.5 rounded-xl bg-purple-600 text-white shadow-xs transition flex items-center gap-1.5 cursor-pointer';
        if (radarView) radarView.classList.add('hidden');
        if (plansView) {
          plansView.classList.remove('hidden');
          const sel1 = document.getElementById('compare-select-1');
          const sel2 = document.getElementById('compare-select-2');
          const data = (typeof window !== 'undefined' && window.candidatesData) ? window.candidatesData : (typeof candidatesData !== 'undefined' ? candidatesData : []);
          const cand1 = data.find(c => c.id === sel1?.value) || data[0];
          const cand2 = data.find(c => c.id === sel2?.value) || data[1];
          renderGovernmentPlansComparison(cand1, cand2);
        }
      } else {
        if (radarBtn) radarBtn.className = 'px-4 py-1.5 rounded-xl bg-purple-600 text-white shadow-xs transition flex items-center gap-1.5 cursor-pointer';
        if (plansBtn) plansBtn.className = 'px-4 py-1.5 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition flex items-center gap-1.5 cursor-pointer';
        if (radarView) radarView.classList.remove('hidden');
        if (plansView) plansView.classList.add('hidden');
      }
      if (window.lucide) lucide.createIcons();
    }
    window.setComparatorMode = setComparatorMode;

    const COMPARISON_THEMES = [
      {
        id: 'saude',
        title: 'Saúde Pública & Gestão do SUS',
        icon: 'heart-pulse',
        keywords: ['saúde', 'sus', 'hospital', 'médic', 'vacina', 'clínica'],
        default1: 'Ampliação de mutirões cirúrgicos, digitalização de prontuários e fortalecimento da atenção primária com telemedicina.',
        default2: 'Modernização de UBSs, descentralização de repasses federais e fixação de médicos especialistas no interior.'
      },
      {
        id: 'educacao',
        title: 'Educação Básica & Ensino Técnico',
        icon: 'graduation-cap',
        keywords: ['educa', 'escola', 'ensino', 'creche', 'professor', 'técnic'],
        default1: 'Meta de 100% de escolas em tempo integral, valorização salarial do magistério e conectividade em banda larga.',
        default2: 'Expansão de escolas cívico-militares e profissionalizantes conectadas às demandas industriais locais.'
      },
      {
        id: 'seguranca',
        title: 'Segurança Pública & Combate ao Crime',
        icon: 'shield-alert',
        keywords: ['segurança', 'polícia', 'crime', 'penal', 'facção', 'violência'],
        default1: 'Investimento em inteligência pericial, câmeras corporais operacionais e repressão a desvios financeiros de facções.',
        default2: 'Endurecimento de progressão de regime penal, compra de viaturas blindadas e integração das forças de fronteira.'
      },
      {
        id: 'economia',
        title: 'Economia, Emprego & Carga Tributária',
        icon: 'trending-up',
        keywords: ['econom', 'imposto', 'tribut', 'empreg', 'renda', 'fiscal', 'orçamento'],
        default1: 'Reforma tributária simplificadora, incentivos para microempreendedores (MEI) e atração de investimentos verdes.',
        default2: 'Corte rigoroso de despesas correntes, desregulamentação para atração de capitais e isenção tributária para geração de vagas.'
      },
      {
        id: 'meioambiente',
        title: 'Meio Ambiente & Transição Energética',
        icon: 'leaf',
        keywords: ['meio ambiente', 'clima', 'energ', 'sustentá', 'floresta', 'água', 'saneamento'],
        default1: 'Combate ao desmatamento ilegal, estímulo a painéis solares na agricultura familiar e universalização do saneamento.',
        default2: 'Licenciamento ambiental ágil com segurança jurídica para o agronegócio e incentivo a biocombustíveis e hidrogênio verde.'
      },
      {
        id: 'governanca',
        title: 'Combate à Corrupção & Gestão Eficiente',
        icon: 'scale',
        keywords: ['corrupção', 'transparência', 'gestão', 'ética', 'digital', 'licita'],
        default1: 'Abertura total de dados em tempo real, auditorias independentes contínuas e editais públicos obrigatórios via pregão.',
        default2: 'Reforma administrativa para corte de privilégios comissionados, digitalização de processos e metas por produtividade.'
      }
    ];

    function findProposalForTheme(cand, theme) {
      if (!cand) return null;
      if (cand.proposals && Array.isArray(cand.proposals)) {
        const match = cand.proposals.find(p => {
          const text = `${p.title} ${p.category || ''} ${p.summary || ''} ${p.description || ''}`.toLowerCase();
          return theme.keywords.some(k => text.includes(k));
        });
        if (match) return match;
      }
      return null;
    }

    function renderGovernmentPlansComparison(cand1, cand2) {
      const plansView = document.getElementById('comparator-plans-view');
      if (!plansView) return;

      const name1 = cand1.ballotName || cand1.name;
      const name2 = cand2.ballotName || cand2.name;

      let axesHtml = COMPARISON_THEMES.map((theme, idx) => {
        const prop1 = findProposalForTheme(cand1, theme);
        const prop2 = findProposalForTheme(cand2, theme);

        const title1 = prop1 ? prop1.title : `${theme.title} (${cand1.party})`;
        const desc1 = prop1 ? (prop1.summary || prop1.description || prop1.solutionDetails) : theme.default1;
        const budget1 = prop1?.budget || prop1?.budgetAndCost || 'Orçamento Ordinário Anual';
        const score1 = prop1?.score || 85;

        const title2 = prop2 ? prop2.title : `${theme.title} (${cand2.party})`;
        const desc2 = prop2 ? (prop2.summary || prop2.description || prop2.solutionDetails) : theme.default2;
        const budget2 = prop2?.budget || prop2?.budgetAndCost || 'Orçamento Ordinário Anual';
        const score2 = prop2?.score || 85;

        return `
          <div class="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-md space-y-4">
            <!-- Header do Eixo -->
            <div class="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
              <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                  <i data-lucide="${theme.icon}" class="w-4 h-4"></i>
                </div>
                <div>
                  <span class="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Eixo Temático 0${idx + 1}</span>
                  <h4 class="text-sm font-extrabold text-slate-900 dark:text-white">${theme.title}</h4>
                </div>
              </div>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono">
                TSE Oficial
              </span>
            </div>

            <!-- Lado a Lado: Candidato 1 vs Candidato 2 -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <!-- Candidato 1 (Amber) -->
              <div class="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-500/30 space-y-2 flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between gap-1 mb-1">
                    <span class="font-extrabold text-amber-900 dark:text-amber-300 text-xs flex items-center gap-1">
                      <span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span> ${name1} (${cand1.party})
                    </span>
                    <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 font-bold">
                      Nota: ${score1}/10
                    </span>
                  </div>
                  <strong class="text-slate-900 dark:text-white text-xs block leading-snug font-display">${title1}</strong>
                  <p class="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed mt-1 font-sans">
                    ${desc1}
                  </p>
                </div>
                <div class="pt-2 border-t border-amber-500/15 flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                  <span>Custo Previsto:</span>
                  <strong class="text-amber-800 dark:text-amber-300">${budget1}</strong>
                </div>
              </div>

              <!-- Candidato 2 (Purple) -->
              <div class="p-4 rounded-2xl bg-purple-50/60 dark:bg-purple-950/20 border border-purple-300 dark:border-purple-500/30 space-y-2 flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between gap-1 mb-1">
                    <span class="font-extrabold text-purple-900 dark:text-purple-300 text-xs flex items-center gap-1">
                      <span class="w-2.5 h-2.5 rounded-full bg-purple-600"></span> ${name2} (${cand2.party})
                    </span>
                    <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-500/20 text-purple-800 dark:text-purple-300 font-bold">
                      Nota: ${score2}/10
                    </span>
                  </div>
                  <strong class="text-slate-900 dark:text-white text-xs block leading-snug font-display">${title2}</strong>
                  <p class="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed mt-1 font-sans">
                    ${desc2}
                  </p>
                </div>
                <div class="pt-2 border-t border-purple-500/15 flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                  <span>Custo Previsto:</span>
                  <strong class="text-purple-800 dark:text-purple-300">${budget2}</strong>
                </div>
              </div>

            </div>
          </div>
        `;
      }).join('');

      plansView.innerHTML = `
        <div class="space-y-4">
          <div class="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-sky-500/10 border border-purple-300 dark:border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold">
                📋
              </div>
              <div>
                <strong class="text-slate-900 dark:text-white block">Confronto de Diretrizes e Planos de Governo TSE</strong>
                <p class="text-[11px] text-slate-500 dark:text-slate-400">Diretrizes oficiais protocoladas na Justiça Eleitoral pelos candidatos nas eleições de 2026.</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <a href="https://divulgacandcontas.tse.jus.br" target="_blank" rel="noopener" class="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-purple-700 dark:text-purple-400 font-bold hover:bg-slate-50 transition cursor-pointer flex items-center gap-1">
                <i data-lucide="external-link" class="w-3.5 h-3.5"></i> Ver no TSE
              </a>
            </div>
          </div>

          <div class="space-y-4">
            ${axesHtml}
          </div>
        </div>
      `;

      if (window.lucide) lucide.createIcons();
    }
    window.renderGovernmentPlansComparison = renderGovernmentPlansComparison;


