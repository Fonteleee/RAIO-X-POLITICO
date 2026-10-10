// Figuras Políticas - Match Eleitoral e Afinidade Cívica 2026
// Algoritmo Neutro e Vetorial conforme Resolução TSE nº 23.610/2019

const quizQuestions = [
  {
    id: 0,
    title: "1. Quando as contas apertam no país, o que o governo deve fazer primeiro?",
    options: [
      { text: "Cortar gastos públicos, diminuir ministérios e privatizar estatais para segurar a inflação e os juros.", val: 0 },
      { text: "Manter o equilíbrio das contas, mas fazendo parcerias com empresas privadas em obras essenciais.", val: 1 },
      { text: "Gastar mais para ajudar quem precisa e fazer obras públicas, mesmo que aumente a dívida do governo.", val: 2 }
    ]
  },
  {
    id: 1,
    title: "2. Qual é a melhor forma de combater o crime organizado e a violência nas ruas?",
    options: [
      { text: "Endurecer as penas, construir presídios de segurança máxima e facilitar o porte de armas para o cidadão de bem.", val: 0 },
      { text: "Investir pesado em inteligência policial, câmeras nos uniformes e patrulhamento preventivo integrado.", val: 1 },
      { text: "Focar em combater a desigualdade, com escolas de tempo integral, cultura e oportunidades para os jovens na periferia.", val: 2 }
    ]
  },
  {
    id: 2,
    title: "3. Serviços essenciais como água, luz, saneamento e estradas devem ser privatizados?",
    options: [
      { text: "Sim, a iniciativa privada investe mais rápido, moderniza os serviços e acaba com cabides de emprego político.", val: 0 },
      { text: "Apenas com concessões bem reguladas pelo governo, garantindo tarifas sociais para famílias de baixa renda.", val: 1 },
      { text: "Não, água e energia são direitos humanos básicos e devem ser 100% públicos para impedir tarifas abusivas.", val: 2 }
    ]
  },
  {
    id: 3,
    title: "4. Como equilibrar a força do agronegócio e a proteção da natureza?",
    options: [
      { text: "Destravar licenças ambientais e apoiar o agro sem amarras, pois o setor é o motor da economia brasileira.", val: 0 },
      { text: "Apoiar o agro sustentável com mercado de crédito de carbono, tecnologia limpa e recuperação de pastagens.", val: 1 },
      { text: "Desmatamento zero imediato, demarcação total de terras indígenas e punição rigorosa com perda de terras a invasores.", val: 2 }
    ]
  },
  {
    id: 4,
    title: "5. Para melhorar a saúde e as escolas dos seus filhos, qual caminho você prefere?",
    options: [
      { text: "Dar vouchers e bolsas para que as famílias possam escolher hospitais e escolas particulares de qualidade.", val: 0 },
      { text: "Parcerias com organizações sociais (OSs) e metas rígidas de atendimento rápido e avaliação contínua.", val: 1 },
      { text: "Investir 100% do dinheiro público no SUS e em escolas estatais, valorizando médicos e professores com plano de carreira.", val: 2 }
    ]
  },
  {
    id: 5,
    title: "6. Como o governo deve se posicionar sobre valores familiares e liberdades individuais?",
    options: [
      { text: "O Estado deve defender a família tradicional, a moral cristã e combater ideologias de gênero nas escolas.", val: 0 },
      { text: "O Estado deve ser laico e neutro, respeitando todas as crenças e garantindo a convivência pacífica de todos.", val: 1 },
      { text: "O Estado deve combater o machismo e o preconceito ativamente, garantindo direitos plenos a todas as minorias e à diversidade.", val: 2 }
    ]
  },
  {
    id: 6,
    title: "7. O que fazer com o Fundo Eleitoral de R$ 5 bilhões e os privilégios de políticos?",
    options: [
      { text: "Cortar o fundão eleitoral imediatamente e reduzir pela metade os salários e verbas de gabinete de deputados e senadores.", val: 0 },
      { text: "Reduzir o valor pela metade e exigir transparência total com prestação de contas digital acessível em tempo real.", val: 1 },
      { text: "Manter o financiamento público de campanhas para evitar que milionários e o crime organizado comprem as eleições.", val: 2 }
    ]
  }
];

let matchUserAnswers = {};
let matchSelectedState = 'SP';

// Inicialização e Renderização do Quiz
function initMatchQuiz() {
  const stateSelect = document.getElementById('match-state-select');
  if (stateSelect) {
    const savedState = (typeof localStorage !== 'undefined' && localStorage.getItem('userState')) || 'SP';
    stateSelect.value = savedState;
    matchSelectedState = savedState;
  }
  renderQuiz();
}

function onMatchStateChange(uf) {
  matchSelectedState = uf;
  if (Object.keys(matchUserAnswers).length >= 3) {
    calculateMatch();
  }
}

function renderQuiz() {
  const container = document.getElementById('quiz-container');
  if (!container) return;

  container.innerHTML = quizQuestions.map(q => `
    <div class="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xs space-y-3">
      <h4 class="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base leading-snug">${q.title}</h4>
      <div class="space-y-2">
        ${q.options.map((opt, idx) => `
          <label class="flex items-start gap-3 p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-white/5 hover:border-amber-500 dark:hover:border-amber-400 cursor-pointer transition text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-medium">
            <input 
              type="radio" 
              name="match_q_${q.id}" 
              value="${opt.val}" 
              onchange="recordQuizAnswer(${q.id}, ${opt.val})" 
              ${matchUserAnswers[q.id] === opt.val ? 'checked' : ''} 
              class="mt-1 text-amber-500 focus:ring-0"
            >
            <span>${opt.text}</span>
          </label>
        `).join('')}
      </div>
    </div>
  `).join('') + `
    <button onclick="calculateMatch()" class="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-black text-sm sm:text-base shadow-lg shadow-amber-500/20 transition cursor-pointer flex items-center justify-center gap-2">
      <i data-lucide="sparkles" class="w-5 h-5"></i>
      <span>Calcular Minha Afinidade Eleitoral (7 Dilemas)</span>
    </button>
  `;

  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function recordQuizAnswer(qId, val) {
  matchUserAnswers[qId] = val;
}

// Determinação do Vetor Político de Cada Candidato (0=Direita, 1=Centro, 2=Esquerda)
function getCandidateVector(cand) {
  const p = cand.party || '';
  if (['PL', 'NOVO', 'PP', 'REPUBLICANOS', 'PRTB'].includes(p)) {
    return [0, 0, 0, 0, 0, 0, 0];
  }
  if (['UNIÃO', 'MDB', 'PSD', 'PODE', 'SOLIDARIEDADE', 'AVANTE'].includes(p)) {
    return [1, 1, 1, 1, 1, 1, 1];
  }
  if (['PT', 'PSOL', 'PCdoB', 'PV', 'REDE', 'PDT', 'PSB'].includes(p)) {
    return [2, 2, 2, 2, 2, 2, 2];
  }
  if (['PSDB', 'CIDADANIA'].includes(p)) {
    return [1, 1, 1, 1, 0, 1, 1];
  }
  return [1, 1, 1, 1, 1, 1, 1];
}

function calculateMatch() {
  const answeredCount = Object.keys(matchUserAnswers).length;
  if (answeredCount < 3) {
    alert('Por favor, responda a pelo menos 3 perguntas para podermos calcular sua afinidade cívica com precisão.');
    return;
  }

  // Vetor do usuário (preenche com 1 = Centro caso não respondido)
  const userVec = [];
  for (let i = 0; i < 7; i++) {
    userVec.push(matchUserAnswers[i] !== undefined ? matchUserAnswers[i] : 1);
  }

  // Verifica os checkboxes de cargos selecionados
  const wantPres = document.getElementById('match-role-pres')?.checked ?? true;
  const wantGov = document.getElementById('match-role-gov')?.checked ?? true;
  const wantSen = document.getElementById('match-role-sen')?.checked ?? true;
  const wantDep = document.getElementById('match-role-dep')?.checked ?? true;

  const allCands = (typeof window !== 'undefined' && window.candidatesData) ? window.candidatesData : (typeof candidatesData !== 'undefined' ? candidatesData : []);

  // FILTRO ESTRITO: Apenas candidatos confirmados para 2026, excluindo inelegíveis/não-candidatos
  const eligibleCandidates = allCands.filter(cand => {
    // 1. Excluir expressamente inelegíveis ou não-concorrentes
    if (cand.legalIntegrity && cand.legalIntegrity.status === 'ineligible') return false;
    if (cand.careerHistory && cand.careerHistory.includes('Inelegível')) return false;
    if (cand.position && cand.position.includes('Ex-')) return false;

    // 2. Filtro de Cargo
    const pos = (cand.position || '').toLowerCase();
    const isPres = pos.includes('president');
    const isGov = pos.includes('governad');
    const isSen = pos.includes('senad');
    const isDep = pos.includes('deputad');

    if (isPres && !wantPres) return false;
    if (isGov && !wantGov) return false;
    if (isSen && !wantSen) return false;
    if (isDep && !wantDep) return false;

    // 3. Filtro de Estado (Presidente concorre em todo o Brasil; demais cargos pelo estado selecionado)
    if (matchSelectedState !== 'BR' && !isPres) {
      if (!cand.state || cand.state.toUpperCase() !== matchSelectedState.toUpperCase()) {
        return false;
      }
    }

    return true;
  });

  if (eligibleCandidates.length === 0) {
    alert('Nenhum candidato encontrado com os critérios de cargo e estado selecionados. Tente marcar outros cargos ou selecionar outro estado.');
    return;
  }

  // Cálculo da afinidade vetorial normalizada
  const scored = eligibleCandidates.map(cand => {
    const candVec = getCandidateVector(cand);
    let diff = 0;
    for (let i = 0; i < 7; i++) {
      diff += Math.abs(userVec[i] - candVec[i]);
    }
    // Distância máxima = 7 * 2 = 14
    const matchPct = Math.min(99, Math.max(20, Math.round(100 - (diff / 14) * 80)));
    return { cand, matchPct };
  });

  scored.sort((a, b) => b.matchPct - a.matchPct);
  const topResults = scored.slice(0, 4);

  const resultsBlock = document.getElementById('quiz-results');
  const cardsGrid = document.getElementById('match-cards-grid');
  if (!resultsBlock || !cardsGrid) return;

  resultsBlock.classList.remove('hidden');

  cardsGrid.innerHTML = topResults.map((item, idx) => {
    const c = item.cand;
    const isReelection = c.isIncumbent || (c.careerHistory && (c.careerHistory.includes('Prefeito') || c.careerHistory.includes('Governador') || c.careerHistory.includes('Senador') || c.careerHistory.includes('Deputad')));
    const candidateStatusBadge = isReelection 
      ? `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-500/30 flex items-center gap-1"><i data-lucide="refresh-cw" class="w-3 h-3"></i> Busca Reeleição</span>`
      : `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-100 dark:bg-sky-500/20 text-sky-800 dark:text-sky-300 border border-sky-300 dark:border-sky-500/30 flex items-center gap-1"><i data-lucide="star" class="w-3 h-3"></i> Novo Desafiante</span>`;

    const podiumTitle = idx === 0 ? '🥇 1º Lugar (Maior Afinidade)' : (idx === 1 ? '🥈 2º Lugar' : (idx === 2 ? '🥉 3º Lugar' : '4º Lugar'));
    const barColor = idx === 0 ? 'bg-amber-500' : (idx === 1 ? 'bg-sky-500' : 'bg-purple-500');

    return `
      <div class="p-5 bg-white dark:bg-slate-800/90 rounded-3xl border-2 ${idx === 0 ? 'border-amber-500 shadow-xl shadow-amber-500/10' : 'border-slate-200 dark:border-white/10'} space-y-4 flex flex-col justify-between">
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">${podiumTitle}</span>
            <span class="text-lg font-black text-amber-600 dark:text-amber-400 font-mono">${item.matchPct}% Match</span>
          </div>

          <div class="flex items-start gap-3.5">
            <img 
              src="${c.avatar}" 
              alt="${c.name}"
              loading="lazy"
              decoding="async"
              referrerpolicy="no-referrer"
              onerror="this.onerror=null; this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(c.ballotName || c.name)}&background=f59e0b&color=000&bold=true&size=128';"
              class="w-16 h-16 rounded-2xl object-cover border-2 border-amber-500/40 shadow-sm flex-shrink-0 bg-slate-100 dark:bg-slate-800"
            >
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-1.5 flex-wrap">
                <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                  ${c.party} • Nº ${c.number}
                </span>
                ${candidateStatusBadge}
              </div>
              <h4 class="font-black text-slate-900 dark:text-white text-base truncate mt-1">${c.ballotName || c.name}</h4>
              <p class="text-xs text-slate-500 dark:text-slate-400 truncate">${c.position} • ${c.state}</p>
            </div>
          </div>

          <!-- Barra de Progresso do Match -->
          <div class="w-full bg-slate-100 dark:bg-slate-700/80 rounded-full h-2.5 overflow-hidden">
            <div class="${barColor} h-2.5 rounded-full transition-all duration-700" style="width: ${item.matchPct}%"></div>
          </div>

          <!-- Síntese de Alinhamento -->
          <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/60 p-3 rounded-2xl border border-slate-200 dark:border-white/5 line-clamp-2">
            ${c.aiSummary || 'Propostas voltadas ao desenvolvimento econômico e gestão de recursos públicos.'}
          </p>
        </div>

        <div class="pt-3 border-t border-slate-200 dark:border-white/10 flex items-center gap-2">
          <button onclick="openDossie('${c.id}')" class="flex-1 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs shadow-md transition cursor-pointer hover:opacity-90 flex items-center justify-center gap-1.5">
            <i data-lucide="folder-search" class="w-3.5 h-3.5"></i>
            <span>Ver Dossiê e Análise IA</span>
          </button>
          <button onclick="shareQuizMatchWhatsApp('${c.ballotName || c.name}', ${item.matchPct})" class="px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-1 cursor-pointer" title="Compartilhar no WhatsApp">
            <i data-lucide="share-2" class="w-3.5 h-3.5"></i>
            <span>Zap</span>
          </button>
        </div>
      </div>
    `;
  }).join('');

  if (typeof lucide !== 'undefined') lucide.createIcons();
  resultsBlock.scrollIntoView({ behavior: 'smooth' });
}

function shareMatchResults() {
  const state = matchSelectedState || 'Brasil';
  const text = `🗳️ *Figuras Políticas 2026 - Meu Match Eleitoral*\n\nFiz o teste com 7 dilemas populares para o estado de ${state} e descobri meus candidatos com maior afinidade de ideias!\n\nFaça seu teste agora e descubra quem realmente te representa:\n${new URL("index.html", window.location.href).href}`;
  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
}

function shareQuizMatchWhatsApp(topName, topPct) {
  const text = `🗳️ *Match Eleitoral 2026*\n\nMeu maior alinhamento cívico deu *${topPct}% de afinidade com ${topName}*!\n\nDescubra quem mais representa suas ideias para Presidente, Governador e Congresso:\n${new URL("index.html", window.location.href).href}`;
  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
}

// Inicializar na carga da página
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMatchQuiz);
  } else {
    initMatchQuiz();
  }
}

