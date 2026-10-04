// js/match.js

const QUESTIONS = [
  { id: 'q1', text: 'Você apoia a redução da maioridade penal para 16 anos para crimes hediondos?' },
  { id: 'q2', text: 'O teto de gastos públicos deve ser mantido rigorosamente, sem exceções, para garantir a responsabilidade fiscal?' },
  { id: 'q3', text: 'Deve haver cotas raciais e sociais em universidades e concursos públicos?' },
  { id: 'q4', text: 'A privatização de empresas estatais (ex: Correios, Petrobras) é positiva para a economia do país?' },
  { id: 'q5', text: 'O porte de armas deve ser flexibilizado para cidadãos comuns sem antecedentes criminais?' },
  { id: 'q6', text: 'O aborto deve ser legalizado e tratado como questão de saúde pública?' },
  { id: 'q7', text: 'Deve haver taxação sobre grandes fortunas para financiar programas sociais?' }
];

const POLITICIANS = [
  { name: 'Candidato A', office: 'Presidente', party: 'PL', image: 'https://i.pravatar.cc/150?img=11', positions: { q1: 1, q2: 1, q3: -1, q4: 1, q5: 1, q6: -1, q7: -1 } },
  { name: 'Candidata B', office: 'Senadora', party: 'PT', image: 'https://i.pravatar.cc/150?img=5', positions: { q1: -1, q2: -1, q3: 1, q4: -1, q5: -1, q6: 1, q7: 1 } },
  { name: 'Candidato C', office: 'Dep. Federal', party: 'PSDB', image: 'https://i.pravatar.cc/150?img=8', positions: { q1: -1, q2: 1, q3: 1, q4: 1, q5: -1, q6: 0, q7: -1 } },
  { name: 'Candidata D', office: 'Presidente', party: 'PSOL', image: 'https://i.pravatar.cc/150?img=9', positions: { q1: -1, q2: -1, q3: 1, q4: -1, q5: -1, q6: 1, q7: 1 } },
  { name: 'Candidato E', office: 'Governador', party: 'NOVO', image: 'https://i.pravatar.cc/150?img=12', positions: { q1: 1, q2: 1, q3: -1, q4: 1, q5: 1, q6: -1, q7: -1 } },
  { name: 'Candidata F', office: 'Dep. Federal', party: 'MDB', image: 'https://i.pravatar.cc/150?img=1', positions: { q1: 1, q2: 0, q3: 1, q4: 0, q5: -1, q6: -1, q7: 0 } },
];

let currentQuestionIndex = 0;
const userAnswers = {};

function initMatch() {
  renderQuestion();
}

function renderQuestion() {
  const container = document.getElementById('quiz-container');
  if (currentQuestionIndex >= QUESTIONS.length) {
    showResults();
    return;
  }

  const q = QUESTIONS[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / QUESTIONS.length) * 100;

  container.innerHTML = `
    <div class="mb-6 w-full bg-black/5 dark:bg-white/10 rounded-full h-2">
      <div class="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300" style="width: ${progress}%"></div>
    </div>
    
    <div class="absolute inset-x-0 top-10 bottom-0 flex flex-col bg-white dark:bg-[#1c1c1e] rounded-[32px] shadow-2xl border border-black/5 dark:border-white/10 p-6 sm:p-8 swipe-card text-center items-center justify-center">
      <span class="px-3 py-1 bg-black/5 dark:bg-white/10 rounded-full text-[10px] font-black text-neutral-500 dark:text-neutral-400 mb-6 uppercase tracking-widest">
        Proposta ${currentQuestionIndex + 1} / ${QUESTIONS.length}
      </span>
      
      <h3 class="text-xl sm:text-2xl font-bold mb-10 text-neutral-900 dark:text-white leading-snug">
        "${q.text}"
      </h3>
      
      <div class="flex gap-4 w-full mt-auto">
        <button onclick="answerQuestion(-1)" class="flex-1 py-4 px-2 bg-red-50 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 font-black rounded-2xl transition flex flex-col items-center justify-center gap-1">
          <i data-lucide="x" class="w-6 h-6"></i>
          <span class="text-xs uppercase tracking-wider">Discordo</span>
        </button>
        <button onclick="answerQuestion(1)" class="flex-1 py-4 px-2 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-black rounded-2xl transition flex flex-col items-center justify-center gap-1">
          <i data-lucide="check" class="w-6 h-6"></i>
          <span class="text-xs uppercase tracking-wider">Concordo</span>
        </button>
      </div>
      
      <button onclick="answerQuestion(0)" class="mt-6 px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition">
        Pular / Não tenho opinião
      </button>
    </div>
  `;
  
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

function answerQuestion(value) {
  const q = QUESTIONS[currentQuestionIndex];
  userAnswers[q.id] = value;
  
  const card = document.querySelector('.swipe-card');
  if (card) {
    if (value > 0) {
      card.style.transform = 'translateX(120%) rotate(15deg)';
    } else if (value < 0) {
      card.style.transform = 'translateX(-120%) rotate(-15deg)';
    } else {
      card.style.transform = 'translateY(120%)';
    }
    card.style.opacity = '0';
  }

  setTimeout(() => {
    currentQuestionIndex++;
    renderQuestion();
  }, 350);
}

function showResults() {
  document.getElementById('quiz-container').classList.add('hidden');
  const resultsContainer = document.getElementById('results-container');
  resultsContainer.classList.remove('hidden');

  // Calculate affinity
  const results = POLITICIANS.map(p => {
    let score = 0;
    let maxScore = 0;
    QUESTIONS.forEach(q => {
      const uAns = userAnswers[q.id];
      const pAns = p.positions[q.id];
      
      // Se usuário respondeu algo válido (!= 0)
      if (uAns !== 0) {
        maxScore += 1;
        if (uAns === pAns) {
          score += 1;
        } else if (pAns === 0) {
          // Politico neutro, meio ponto de divergência ou ignoramos? Vamos pontuar 0.5 por não ter opinião radical contrária
          score += 0.5; 
        }
      }
    });
    
    const affinity = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
    return { ...p, affinity };
  }).sort((a, b) => b.affinity - a.affinity);

  const list = document.getElementById('matches-list');
  list.innerHTML = results.slice(0, 5).map((p, index) => {
    let affinityColor = 'text-red-500';
    let ringColor = 'ring-red-500/30';
    if (p.affinity >= 70) {
      affinityColor = 'text-emerald-500';
      ringColor = 'ring-emerald-500/50';
    } else if (p.affinity >= 40) {
      affinityColor = 'text-amber-500';
      ringColor = 'ring-amber-500/50';
    }

    const isTop = index === 0;

    return `
      <div class="flex items-center gap-4 p-4 bg-white dark:bg-[#1c1c1e] rounded-[24px] shadow-sm border border-black/5 dark:border-white/10 hover:shadow-md transition-shadow">
        <div class="relative">
          <img src="${p.image}" class="w-16 h-16 rounded-full object-cover ring-4 ${isTop ? 'ring-purple-500' : ringColor}">
          ${isTop ? '<div class="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full p-1.5 shadow-lg"><i data-lucide="crown" class="w-3.5 h-3.5"></i></div>' : ''}
        </div>
        <div class="flex-1">
          <div class="flex items-center gap-2">
            <h4 class="font-bold text-base text-gray-900 dark:text-white leading-tight">${p.name}</h4>
            <span class="px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/10 text-[10px] font-black uppercase text-neutral-600 dark:text-neutral-400">${p.party}</span>
          </div>
          <span class="text-xs font-semibold text-neutral-500 flex items-center gap-1 mt-1">
            <i data-lucide="landmark" class="w-3 h-3"></i> ${p.office}
          </span>
        </div>
        <div class="flex flex-col items-end justify-center">
          <span class="text-2xl font-black ${affinityColor}">${p.affinity}%</span>
          <span class="text-[9px] text-neutral-400 uppercase font-black tracking-widest">Afinidade</span>
        </div>
      </div>
    `;
  }).join('');
  
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

document.addEventListener('DOMContentLoaded', initMatch);
