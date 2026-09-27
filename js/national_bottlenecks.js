// Observatório dos 30 Maiores Gargalos Nacionais do Brasil (2026-2030)
// Lógica de Renderização, Filtros por Eixo e Modal de Candidatos Proponentes

let currentBottleneckAxis = 'todos';
let activeBottleneckModal = null;

function filterBottlenecksByAxis(axisId) {
  currentBottleneckAxis = axisId;
  
  // Atualiza botões de filtro
  document.querySelectorAll('.bottleneck-axis-btn').forEach(btn => {
    const isSelected = btn.dataset.axis === axisId;
    if (isSelected) {
      btn.className = 'bottleneck-axis-btn px-3 py-1.5 rounded-full text-xs font-bold bg-purple-600 text-white shadow-xs transition cursor-pointer';
    } else {
      btn.className = 'bottleneck-axis-btn px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer';
    }
  });

  renderNationalBottlenecksGrid();
}
window.filterBottlenecksByAxis = filterBottlenecksByAxis;

function getCandidatesCoveringBottleneck(bottleneckId) {
  if (typeof candidatesData === 'undefined') return [];
  return candidatesData.filter(cand => {
    return Array.isArray(cand.nationalBottlenecksCoverage) && cand.nationalBottlenecksCoverage.includes(bottleneckId);
  });
}
window.getCandidatesCoveringBottleneck = getCandidatesCoveringBottleneck;

function renderNationalBottlenecksGrid() {
  const container = document.getElementById('national-bottlenecks-grid');
  if (!container || typeof NATIONAL_BOTTLENECKS === 'undefined') return;

  const filtered = currentBottleneckAxis === 'todos' 
    ? NATIONAL_BOTTLENECKS 
    : NATIONAL_BOTTLENECKS.filter(b => b.axisId === currentBottleneckAxis);

  container.innerHTML = filtered.map(b => {
    const axis = NATIONAL_AXES[b.axisId] || { name: 'Eixo Geral', color: 'purple', icon: 'compass' };
    const coveringCandidates = getCandidatesCoveringBottleneck(b.id);
    const count = coveringCandidates.length;

    let badgeColor = 'bg-rose-100 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800/40';
    if (b.urgency === 'Alta') badgeColor = 'bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800/40';

    return `
      <div class="p-5 rounded-3xl bg-white/80 dark:bg-[#1c1c1e]/80 backdrop-blur-xl border border-slate-200/60 dark:border-white/10 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md transition flex flex-col justify-between gap-4 group">
        <div class="space-y-2.5">
          <div class="flex items-center justify-between gap-2">
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-100 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800/40">
              ${axis.name}
            </span>
            <span class="px-2 py-0.5 rounded-md text-[9.5px] font-extrabold border ${badgeColor}">
              Urgência: ${b.urgency}
            </span>
          </div>

          <div>
            <div class="text-[10px] font-mono text-slate-400 font-bold">GARGALO NACIONAL #${b.id}</div>
            <h4 class="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-tight group-hover:text-purple-600 dark:group-hover:text-purple-400 transition">
              ${b.title}
            </h4>
          </div>

          <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            ${b.diagnosis}
          </p>

          <div class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-white/5 space-y-1 text-[11px]">
            <div class="text-slate-500 dark:text-slate-400 font-mono text-[9.5px]">
              📍 <strong>Impacto:</strong> ${b.impact}
            </div>
            <div class="text-slate-500 dark:text-slate-400 font-mono text-[9.5px]">
              ⚖️ <strong>Competência:</strong> ${b.competence}
            </div>
          </div>
        </div>

        <div class="pt-3 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between gap-2">
          <div class="flex items-center gap-1.5">
            <div class="flex -space-x-1.5 overflow-hidden">
              ${coveringCandidates.slice(0, 3).map(c => `
                <img class="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover" loading="lazy" decoding="async" src="${c.avatar || 'img/placeholder.svg'}" alt="${c.name}" onerror="this.src='img/placeholder.svg'">
              `).join('')}
            </div>
            <span class="text-[11px] font-bold text-slate-700 dark:text-slate-300">
              <strong>${count}</strong> político${count !== 1 ? 's' : ''} propondo
            </span>
          </div>

          <button onclick="openBottleneckDetailsModal(${b.id})" class="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/40 dark:hover:bg-purple-900/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/40 text-xs font-bold transition flex items-center gap-1 cursor-pointer">
            <span>Ver Propostas</span>
            <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      </div>
    `;
  }).join('');

  if (window.lucide) lucide.createIcons();
}
window.renderNationalBottlenecksGrid = renderNationalBottlenecksGrid;

function openBottleneckDetailsModal(bottleneckId) {
  const b = NATIONAL_BOTTLENECKS.find(x => x.id === bottleneckId);
  if (!b) return;

  const modal = document.getElementById('bottleneck-details-modal');
  if (!modal) return;

  const titleEl = document.getElementById('modal-bottleneck-title');
  const axisEl = document.getElementById('modal-bottleneck-axis');
  const diagEl = document.getElementById('modal-bottleneck-diagnosis');
  const solEl = document.getElementById('modal-bottleneck-solution');
  const listEl = document.getElementById('modal-bottleneck-candidates-list');

  const axis = NATIONAL_AXES[b.axisId] || { name: 'Eixo Geral' };

  if (titleEl) titleEl.innerText = `Gargalo #${b.id}: ${b.title}`;
  if (axisEl) axisEl.innerText = `${axis.name} • Competência: ${b.competence}`;
  if (diagEl) diagEl.innerText = b.diagnosis;
  if (solEl) solEl.innerText = b.suggestedSolution;

  const candidates = getCandidatesCoveringBottleneck(b.id);

  if (listEl) {
    if (candidates.length === 0) {
      listEl.innerHTML = `
        <div class="p-6 text-center text-slate-500 dark:text-slate-400 text-xs">
          Nenhum candidato mapeado com plano de ação protocolado no TSE especificamente para este gargalo.
        </div>
      `;
    } else {
      listEl.innerHTML = candidates.map(c => {
        const isExec = c.officePower === 'executivo';
        return `
          <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
            <div class="flex items-center gap-3">
              <img src="${c.avatar || 'img/placeholder.svg'}" loading="lazy" decoding="async" class="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-white/10" alt="${c.name}" onerror="this.src='img/placeholder.svg'">
              <div>
                <div class="flex items-center gap-1.5">
                  <span class="font-bold text-xs text-slate-900 dark:text-white">${c.ballotName || c.name}</span>
                  <span class="px-1.5 py-0.2 rounded text-[9.5px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono">${c.party}-${c.state || 'BR'}</span>
                  <span class="px-1.5 py-0.2 rounded text-[9.5px] font-bold ${isExec ? 'bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300' : 'bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300'}">
                    ${isExec ? 'Executivo' : 'Legislativo'}
                  </span>
                </div>
                <div class="text-[11px] text-slate-500 dark:text-slate-400">
                  Cargo: ${c.position} • IPR Severo: <strong class="font-mono text-purple-600 dark:text-purple-400">${c.careerProductivity?.productivityScore || 75}/100</strong>
                </div>
                <div class="text-[10px] text-slate-600 dark:text-slate-300 pt-0.5">
                  <strong>Diretriz TSE:</strong> Solução estruturante cadastrada no plano de governo para 2026.
                </div>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <a href="dossie.html?id=${c.id}&tab=futuro-eleito" class="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition shadow-xs flex items-center gap-1 cursor-pointer">
                <span>Dossiê & Propostas</span>
                <i data-lucide="arrow-up-right" class="w-3.5 h-3.5"></i>
              </a>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  modal.classList.remove('hidden');
  if (window.lucide) lucide.createIcons();
}
window.openBottleneckDetailsModal = openBottleneckDetailsModal;

function closeBottleneckDetailsModal() {
  const modal = document.getElementById('bottleneck-details-modal');
  if (modal) modal.classList.add('hidden');
}
window.closeBottleneckDetailsModal = closeBottleneckDetailsModal;
