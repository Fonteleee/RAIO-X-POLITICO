// Raio-X Político - Match Eleitoral e Afinidade com Candidatos

// ================= MATCH ELEITORAL (QUIZ VETORIAL DINÂMICO) =================
    const quizQuestions = [
      {
        id: 0,
        title: "1. Qual deve ser o modelo econômico e fiscal prioritário do Brasil?",
        options: [
          { text: "Livre mercado amplo, privatizações, teto de gastos rígido e desregulamentação", val: 0 },
          { text: "Parcerias público-privadas, responsabilidade fiscal com investimentos estratégicos e regulação", val: 1 },
          { text: "Estado indutor com fortes investimentos públicos, reindustrialização e tributação de super-ricos", val: 2 }
        ]
      },
      {
        id: 1,
        title: "2. Como enfrentar a segurança pública e o crime organizado?",
        options: [
          { text: "Endurecimento de penas, enquadramento de facções como terrorismo e apoio ao porte de armas", val: 0 },
          { text: "Policiamento de proximidade, integração de inteligência interestadual e tecnologia preditiva", val: 1 },
          { text: "Foco prioritário em direitos humanos, combate ao racismo estrutural e desmilitarização progressiva", val: 2 }
        ]
      },
      {
        id: 2,
        title: "3. Qual é a sua visão sobre privatizações e concessões de serviços públicos?",
        options: [
          { text: "Apoio total à desestatização de estatais e concessão de saneamento, portos e rodovias", val: 0 },
          { text: "Concessões seletivas e parcerias com agências reguladoras fortes que garantam metas sociais", val: 1 },
          { text: "Contrário a privatizações: serviços essenciais (saúde, água, educação e energia) 100% públicos", val: 2 }
        ]
      },
      {
        id: 3,
        title: "4. Como equilibrar preservação ambiental e desenvolvimento econômico?",
        options: [
          { text: "Priorizar o agronegócio e produção energética, simplificando licenças ambientais para destravar obras", val: 0 },
          { text: "Agro sustentável com mercado de carbono, transição energética planejada e bioeconomia", val: 1 },
          { text: "Desmatamento zero imediato, demarcação integral de terras indígenas e veto a exploração fóssil", val: 2 }
        ]
      },
      {
        id: 4,
        title: "5. Qual deve ser a prioridade para combater a desigualdade social?",
        options: [
          { text: "Redução de tributos sobre empresas para acelerar criação de empregos formais e mérito individual", val: 0 },
          { text: "Transferência de renda condicionada à educação e bolsas de permanência (ex: Pé-de-Meia)", val: 1 },
          { text: "Renda básica cidadã universal, aumento real contínuo do salário mínimo e fortalecimento total do SUS", val: 2 }
        ]
      }
    ];

    // Vetores ideológicos calibrados para os líderes públicos (0=Direita/Liberal, 1=Centro/Reformista, 2=Progressista/Esquerda)
    const CANDIDATE_VECTORS = {
      'cand-lula': [2, 1, 2, 2, 2],
      'cand-jair-bolsonaro': [0, 0, 0, 0, 0],
      'cand-ciro-gomes': [2, 1, 2, 1, 2],
      'cand-simone-tebet': [1, 1, 1, 1, 1],
      'cand-tarcisio-de-freitas': [0, 1, 0, 1, 0],
      'cand-romeu-zema': [0, 0, 0, 0, 0],
      'cand-ronaldo-caiado': [0, 0, 1, 0, 1],
      'cand-eduardo-leite': [1, 1, 1, 1, 1],
      'cand-helder-barbalho': [1, 1, 1, 2, 1],
      'cand-claudio-castro': [0, 0, 1, 0, 1],
      'cand-rodrigo-pacheco': [1, 1, 1, 1, 1],
      'cand-sergio-moro': [0, 0, 0, 1, 0],
      'cand-marcos-pontes': [0, 1, 0, 1, 0],
      'cand-flavio-bolsonaro': [0, 0, 0, 0, 0],
      'cand-randolfe-rodrigues': [2, 1, 2, 2, 2],
      'cand-ricardo-nunes': [1, 1, 1, 1, 1],
      'cand-eduardo-paes': [1, 1, 1, 1, 1],
      'cand-joao-campos': [1, 1, 1, 1, 2],
      'cand-fuad-noman': [1, 1, 1, 1, 1],
      'cand-bruno-reis': [1, 1, 1, 1, 1],
      'cand-tabata-amaral': [1, 1, 1, 1, 1],
      'cand-kim-kataguiri': [0, 0, 0, 0, 0],
      'cand-nikolas-ferreira': [0, 0, 0, 0, 0],
      'cand-erika-hilton': [2, 2, 2, 2, 2],
      'cand-samia-bomfim': [2, 2, 2, 2, 2],
      'cand-marcel-van-hattem': [0, 0, 0, 0, 0],
      'cand-baleia-rossi': [1, 1, 1, 1, 1],
      'cand-gleisi-hoffmann': [2, 1, 2, 2, 2],
      'cand-luiza-erundina': [2, 2, 2, 2, 2],
      'cand-duda-salabert': [2, 2, 2, 2, 2],
      'cand-marco-feliciano': [0, 0, 0, 0, 0],
      'cand-mario-frias': [0, 0, 0, 0, 0],
      'cand-luiz-philippe-orleans-braganca': [0, 0, 0, 0, 0],
      'cand-celia-xakriaba': [2, 2, 2, 2, 2],
      'cand-chico-alencar': [2, 2, 2, 2, 2],
      'cand-guilherme-boulos': [2, 2, 2, 2, 2],
      'cand-eduardo-bolsonaro': [0, 0, 0, 0, 0],
      'cand-aecio-neves': [1, 1, 1, 1, 0],
      'cand-jandira-feghali': [2, 2, 2, 2, 2],
      'cand-ricardo-salles': [0, 0, 0, 0, 0],
      'cand-orlando-silva': [2, 1, 2, 1, 2],
      'cand-carla-zambelli': [0, 0, 0, 0, 0],
      'cand-maria-do-rosario': [2, 2, 2, 2, 2],
      'cand-tiririca': [1, 1, 1, 1, 1],
      'cand-rodrigo-valadares': [0, 0, 0, 0, 0]
    };

    let userAnswers = {};

    function renderQuiz() {
      const container = document.getElementById('quiz-container');
      container.innerHTML = quizQuestions.map(q => `
        <div class="p-4 bg-slate-50 dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-white/5 space-y-3">
          <h4 class="font-bold text-slate-900 dark:text-white text-sm">${q.title}</h4>
          <div class="space-y-2">
            ${q.options.map((opt, idx) => `
              <label class="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-white/5 hover:border-sky-500 dark:hover:border-cyan-500/40 cursor-pointer transition text-xs text-slate-700 dark:text-slate-300">
                <input type="radio" name="q_${q.id}" value="${opt.val}" onchange="recordQuizAnswer(${q.id}, ${opt.val})" ${userAnswers[q.id] === opt.val ? 'checked' : ''} class="text-sky-600 focus:ring-0">
                <span>${opt.text}</span>
              </label>
            `).join('')}
          </div>
        </div>
      `).join('') + `
        <button onclick="calculateMatch()" class="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-sm shadow-md transition cursor-pointer flex items-center justify-center gap-2">
          <i data-lucide="sparkles" class="w-4 h-4"></i>
          <span>Calcular Minha Afinidade Cívica (45 Candidatos)</span>
        </button>
      `;
      lucide.createIcons();
    }

    function recordQuizAnswer(qId, val) {
      userAnswers[qId] = val;
    }

    function calculateMatch() {
      const answeredKeys = Object.keys(userAnswers);
      if (answeredKeys.length < 3) {
        alert('Por favor, responda pelo menos 3 perguntas para calcularmos sua afinidade com precisão.');
        return;
      }

      const userVector = [
        userAnswers[0] !== undefined ? userAnswers[0] : 1,
        userAnswers[1] !== undefined ? userAnswers[1] : 1,
        userAnswers[2] !== undefined ? userAnswers[2] : 1,
        userAnswers[3] !== undefined ? userAnswers[3] : 1,
        userAnswers[4] !== undefined ? userAnswers[4] : 1
      ];

      const scoredList = candidatesData.map(cand => {
        const candVec = CANDIDATE_VECTORS[cand.id] || [1, 1, 1, 1, 1];
        let diff = 0;
        for (let i = 0; i < 5; i++) {
          diff += Math.abs(userVector[i] - candVec[i]);
        }
        const baseMatch = Math.round(100 - (diff / 10) * 55);
        const matchPct = Math.min(98, Math.max(38, baseMatch + Math.round((cand.overallScore || 90) / 30)));
        return {
          cand,
          matchPct
        };
      });

      scoredList.sort((a, b) => b.matchPct - a.matchPct);
      const top3 = scoredList.slice(0, 3);

      document.getElementById('quiz-results').classList.remove('hidden');
      const grid = document.getElementById('match-cards-grid');

      grid.innerHTML = top3.map((item, idx) => {
        const c = item.cand;
        const medal = idx === 0 ? '🥇 1º Lugar (Maior Afinidade)' : idx === 1 ? '🥈 2º Lugar' : '🥉 3º Lugar';
        const barColor = idx === 0 ? 'bg-emerald-500' : idx === 1 ? 'bg-sky-500' : 'bg-purple-500';
        return `
          <div class="p-4 bg-white dark:bg-slate-800/90 rounded-2xl border ${idx === 0 ? 'border-emerald-500 dark:border-emerald-500/50 shadow-md shadow-emerald-500/10' : 'border-slate-200 dark:border-white/10'} space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">${medal}</span>
              <span class="text-base font-black ${idx === 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-sky-600 dark:text-cyan-400'}">${item.matchPct}% Match</span>
            </div>

            <div class="flex items-center gap-3">
              <img src="${c.avatar}" alt="${c.name}" class="w-12 h-12 rounded-xl object-cover border-2 border-sky-500/30 flex-shrink-0">
              <div class="min-w-0 flex-1">
                <h4 class="font-bold text-slate-900 dark:text-white text-sm truncate">${c.name}</h4>
                <p class="text-[11px] text-slate-500 dark:text-slate-400 truncate">${c.party} • ${c.position} • ${c.state}</p>
              </div>
            </div>

            <!-- Match Progress Bar -->
            <div class="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
              <div class="${barColor} h-2 rounded-full transition-all duration-500" style="width: ${item.matchPct}%"></div>
            </div>

            <div class="pt-2 flex items-center gap-2">
              <button onclick="openDossie('${c.id}')" class="flex-1 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition cursor-pointer">
                Ver Dossiê
              </button>
              <button onclick="shareQuizMatchWhatsApp('${c.name}', ${item.matchPct})" class="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition flex items-center gap-1 cursor-pointer" title="Compartilhar resultado no WhatsApp">
                <i data-lucide="share-2" class="w-3.5 h-3.5"></i> Zap
              </button>
            </div>
          </div>
        `;
      }).join('') + `
        <div class="col-span-full pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button onclick="shareQuizMatchWhatsApp('${top3[0].cand.name}', ${top3[0].matchPct})" class="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md shadow-emerald-600/20 transition flex items-center justify-center gap-2 cursor-pointer">
            <i data-lucide="message-circle" class="w-4 h-4"></i>
            <span>Compartilhar Meu Match no WhatsApp</span>
          </button>
          <button onclick="renderQuiz()" class="text-xs text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-cyan-400 font-medium underline cursor-pointer">
            Refazer Quiz com outras respostas
          </button>
        </div>
      `;

      lucide.createIcons();
      document.getElementById('quiz-results').scrollIntoView({ behavior: 'smooth' });
    }

    function shareQuizMatchWhatsApp(topName, topPct) {
      const text = `🗳️ *Quiz de Afinidade Cívica 2026*\n\nFiz o teste no Raio-X Político e meu principal match eleitoral deu *${topPct}% de afinidade com ${topName}*!\n\nDescubra quem mais representa suas ideias para Presidente, Governador e Congresso:\n${window.location.origin}`;
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
    }
