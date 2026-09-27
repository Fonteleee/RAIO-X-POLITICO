// Figuras Políticas - Simulador Oficial de Urna Eletrônica 2026
// Síntese de Áudio via Web Audio API (Zero dependência externa) & Conscientização Cívica

(function() {
  'use strict';

  // ================= WEB AUDIO API SYNTHESIZER =================
  class UrnaSoundSynth {
    constructor() {
      this.ctx = null;
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    playKeyBeep() {
      try {
        this.init();
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.05);
      } catch (err) {
        console.warn('Audio synth error:', err);
      }
    }

    playErrorBeep() {
      try {
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        [0, 0.1].forEach(delay => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(220, now + delay);
          gain.gain.setValueAtTime(0.2, now + delay);
          gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.08);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + delay);
          osc.stop(now + delay + 0.08);
        });
      } catch (err) {
        console.warn('Audio synth error:', err);
      }
    }

    playTseConfirmSound() {
      try {
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        
        // Sequência harmônica oficial do "pililili" do TSE
        const notes = [
          { freq: 1046.50, start: 0.00, dur: 0.12 }, // C6
          { freq: 1318.51, start: 0.12, dur: 0.12 }, // E6
          { freq: 1567.98, start: 0.24, dur: 0.14 }, // G6
          { freq: 2093.00, start: 0.38, dur: 0.45 }  // C7 longo final
        ];

        notes.forEach(n => {
          const osc = this.ctx.createOscillator();
          const osc2 = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(n.freq, now + n.start);

          // Segundo harmônico sutil para riqueza acústica da urna real
          osc2.type = 'triangle';
          osc2.frequency.setValueAtTime(n.freq * 2, now + n.start);

          gain.gain.setValueAtTime(0.25, now + n.start);
          gain.gain.exponentialRampToValueAtTime(0.001, now + n.start + n.dur);

          osc.connect(gain);
          osc2.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(now + n.start);
          osc.stop(now + n.start + n.dur);
          osc2.start(now + n.start);
          osc2.stop(now + n.start + n.dur);
        });
      } catch (err) {
        console.warn('Audio synth error:', err);
      }
    }
  }

  const audioSynth = new UrnaSoundSynth();

  // ================= URNA STATE =================
  const URNA_OFFICES = {
    'Presidente': { digits: 2, label: 'Presidente da República', helpText: '2 dígitos' },
    'Governador': { digits: 2, label: 'Governador de Estado', helpText: '2 dígitos' },
    'Senador': { digits: 3, label: 'Senador da República', helpText: '3 dígitos' },
    'Deputado Federal': { digits: 4, label: 'Deputado Federal', helpText: '4 dígitos' },
    'Deputado Estadual': { digits: 5, label: 'Deputado Estadual', helpText: '5 dígitos' }
  };

  let currentOffice = 'Presidente';
  let enteredDigits = '';
  let voteStatus = 'empty'; // 'empty', 'typing', 'found', 'blank', 'null', 'confirmed'
  let matchedCandidate = null;

  function initUrna() {
    renderUrnaInterface();
    attachKeyboardShortcuts();
  }

  function getRequiredDigits() {
    return URNA_OFFICES[currentOffice]?.digits || 2;
  }

  function renderUrnaInterface() {
    const container = document.getElementById('tab-urna');
    if (!container) return;

    container.innerHTML = `
      <div class="max-w-5xl mx-auto space-y-4">
        <!-- Sub-header & Seletor de Cargo -->
        <div class="glass-panel p-4 sm:p-5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30 flex items-center gap-1">
                <i data-lucide="check-square" class="w-3.5 h-3.5 text-emerald-600"></i> Simulador Oficial TSE
              </span>
              <span class="text-xs font-mono text-slate-400">Modelo Eletrônico UE2022</span>
            </div>
            <h2 class="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mt-1">
              Simulador de Votação & Educação Cívica
            </h2>
            <p class="text-xs text-slate-500 dark:text-slate-400">
              Digite o número do seu candidato, confira a foto oficial, ouça o áudio da urna e acesse o raio-x do mandato.
            </p>
          </div>

          <!-- Seletor de Cargo -->
          <div class="flex items-center gap-1.5 flex-wrap bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-xl border border-slate-200 dark:border-white/5 text-xs">
            <span class="text-[10px] font-extrabold uppercase text-slate-500 dark:text-slate-400 px-1">Cargo:</span>
            ${Object.keys(URNA_OFFICES).map(off => `
              <button 
                onclick="window.setUrnaOffice('${off}')" 
                class="px-2.5 py-1 rounded-lg font-bold text-xs transition cursor-pointer ${currentOffice === off ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}"
              >
                ${off}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- MÁQUINA DA URNA FÍSICA (LAYOUT LADO A LADO) -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          <!-- TELA LCD DA URNA (7 colunas no Desktop) -->
          <div class="lg:col-span-7 bg-[#dbe4d8] dark:bg-[#121c15] border-8 border-[#3b4348] rounded-3xl p-5 sm:p-7 shadow-2xl min-h-[460px] flex flex-col justify-between font-mono select-none text-slate-900 dark:text-emerald-400 transition-colors">
            
            <div id="urna-screen-content" class="space-y-4">
              <!-- Conteúdo renderizado dinamicamente -->
            </div>

            <!-- Rodapé da Tela LCD com Instruções Oficiais -->
            <div class="border-t-2 border-slate-800/40 dark:border-emerald-500/30 pt-3 text-[11px] leading-tight space-y-1">
              <div class="flex items-center gap-2">
                <span class="font-bold">Aperte a tecla:</span>
              </div>
              <div class="grid grid-cols-2 gap-2 text-[10.5px]">
                <div><strong class="text-emerald-800 dark:text-emerald-300">CONFIRMA</strong> para GRAVAR este voto</div>
                <div><strong class="text-amber-800 dark:text-amber-400">CORRIGE</strong> para REINICIAR este voto</div>
              </div>
            </div>

          </div>

          <!-- TECLADO NUMÉRICO TÁTIL DA URNA (5 colunas no Desktop) -->
          <div class="lg:col-span-5 bg-[#202428] border-4 border-[#14171a] rounded-3xl p-5 sm:p-6 shadow-2xl text-white space-y-4">
            <div class="flex items-center justify-between border-b border-white/10 pb-3">
              <div class="flex items-center gap-2">
                <div class="w-6 h-6 rounded bg-yellow-500/20 border border-yellow-500 flex items-center justify-center font-black text-yellow-400 text-xs">
                  ★
                </div>
                <span class="text-xs font-bold uppercase tracking-wider text-slate-300">Justiça Eleitoral</span>
              </div>
              <span class="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Áudio Ativo
              </span>
            </div>

            <!-- Grid de Teclas 1 a 9 -->
            <div class="grid grid-cols-3 gap-2.5 max-w-[280px] mx-auto pt-1">
              ${[1,2,3,4,5,6,7,8,9].map(n => `
                <button 
                  onclick="window.pressUrnaKey('${n}')" 
                  class="urna-key h-13 rounded-xl bg-gradient-to-b from-[#33383f] to-[#1f2227] hover:from-[#3c424a] hover:to-[#262a30] active:translate-y-1 border-t border-white/20 border-b-2 border-black font-extrabold text-xl font-mono shadow-md flex items-center justify-center cursor-pointer transition-transform"
                >
                  ${n}
                </button>
              `).join('')}
            </div>

            <!-- Tecla 0 Centralizada -->
            <div class="flex justify-center max-w-[280px] mx-auto">
              <button 
                onclick="window.pressUrnaKey('0')" 
                class="urna-key w-22 h-13 rounded-xl bg-gradient-to-b from-[#33383f] to-[#1f2227] hover:from-[#3c424a] hover:to-[#262a30] active:translate-y-1 border-t border-white/20 border-b-2 border-black font-extrabold text-xl font-mono shadow-md flex items-center justify-center cursor-pointer transition-transform"
              >
                0
              </button>
            </div>

            <!-- Teclas Especiais: BRANCO, CORRIGE, CONFIRMA -->
            <div class="grid grid-cols-3 gap-2 pt-2 border-t border-white/10">
              <button 
                onclick="window.pressUrnaBlank()" 
                class="h-12 rounded-xl bg-gradient-to-b from-slate-100 to-slate-300 hover:from-white hover:to-slate-200 active:translate-y-1 border-t border-white border-b-2 border-slate-500 text-slate-900 font-extrabold text-[11px] uppercase tracking-wider shadow-md flex items-center justify-center cursor-pointer transition-transform"
              >
                Branco
              </button>
              <button 
                onclick="window.pressUrnaCorrige()" 
                class="h-12 rounded-xl bg-gradient-to-b from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 active:translate-y-1 border-t border-amber-300 border-b-2 border-amber-900 text-white font-extrabold text-[11px] uppercase tracking-wider shadow-md flex items-center justify-center cursor-pointer transition-transform"
              >
                Corrige
              </button>
              <button 
                onclick="window.pressUrnaConfirma()" 
                class="h-13 -mt-1 rounded-xl bg-gradient-to-b from-emerald-500 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 active:translate-y-1 border-t border-emerald-300 border-b-3 border-emerald-950 text-white font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center cursor-pointer transition-transform"
              >
                Confirma
              </button>
            </div>

            <div class="text-[10px] text-center text-slate-400 font-sans pt-1">
              Dica: Você também pode usar o teclado numérico físico do seu computador.
            </div>
          </div>

        </div>

        <!-- CONTAINER DO CARD CÍVICO PÓS-VOTO -->
        <div id="urna-civic-card-container" class="hidden transition-all duration-300">
          <!-- Renderizado após o CONFIRMA -->
        </div>
      </div>
    `;

    updateUrnaScreen();
    if (window.lucide) lucide.createIcons();
  }

  function updateUrnaScreen() {
    const screen = document.getElementById('urna-screen-content');
    if (!screen) return;

    const reqDigits = getRequiredDigits();

    if (voteStatus === 'confirmed') {
      screen.innerHTML = `
        <div class="py-12 text-center space-y-3">
          <h1 class="text-6xl sm:text-7xl font-black tracking-widest text-slate-900 dark:text-emerald-400 animate-pulse">
            FIM
          </h1>
          <p class="text-base font-bold uppercase tracking-wider text-slate-700 dark:text-emerald-300">
            VOTO GRAVADO COM SUCESSO
          </p>
          <span class="text-xs font-mono text-slate-500 dark:text-emerald-600 block">
            Protocolo Auditável TSE-2026-OK
          </span>
        </div>
      `;
      return;
    }

    if (voteStatus === 'blank') {
      screen.innerHTML = `
        <div class="space-y-4">
          <span class="text-xs uppercase tracking-wider block text-slate-600 dark:text-emerald-500">
            SEU VOTO PARA
          </span>
          <h2 class="text-lg font-black text-slate-900 dark:text-white uppercase">
            ${URNA_OFFICES[currentOffice]?.label}
          </h2>
          <div class="py-10 text-center">
            <span class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-wider border-2 border-dashed border-slate-500 dark:border-emerald-500 px-4 py-2 rounded-xl inline-block">
              VOTO EM BRANCO
            </span>
          </div>
        </div>
      `;
      return;
    }

    // Monta caixas de dígitos
    let digitBoxesHtml = '';
    for (let i = 0; i < reqDigits; i++) {
      const char = enteredDigits[i] || '';
      const isCurrent = i === enteredDigits.length;
      digitBoxesHtml += `
        <div class="w-9 h-12 sm:w-11 sm:h-14 border-2 ${isCurrent ? 'border-slate-900 dark:border-emerald-400 animate-pulse bg-white/40 dark:bg-emerald-950/40' : 'border-slate-700 dark:border-emerald-600'} rounded-lg flex items-center justify-center text-2xl sm:text-3xl font-black text-slate-900 dark:text-emerald-300 font-mono shadow-inner">
          ${char}
        </div>
      `;
    }

    // Tela de Candidato Encontrado
    if (matchedCandidate) {
      const displayName = matchedCandidate.ballotName || matchedCandidate.name;
      const avatarUrl = window.getSafeAvatarUrl ? window.getSafeAvatarUrl(matchedCandidate, displayName) : matchedCandidate.avatar;
      
      screen.innerHTML = `
        <div class="space-y-3">
          <div class="flex items-start justify-between gap-3">
            <div>
              <span class="text-[11px] uppercase tracking-wider block text-slate-600 dark:text-emerald-500">
                SEU VOTO PARA
              </span>
              <h2 class="text-sm sm:text-base font-black text-slate-900 dark:text-white uppercase">
                ${URNA_OFFICES[currentOffice]?.label}
              </h2>
            </div>
            <div class="w-20 h-24 sm:w-24 sm:h-28 rounded-xl border-2 border-slate-800 dark:border-emerald-500 overflow-hidden bg-white shadow-md flex-shrink-0">
              <img 
                src="${avatarUrl}" 
                alt="${displayName}" 
                loading="lazy"
                decoding="async"
                class="w-full h-full object-cover"
                onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=0284c7&color=fff&bold=true&size=128';"
              >
            </div>
          </div>

          <div class="space-y-1">
            <span class="text-xs text-slate-600 dark:text-emerald-500 block font-bold">Número:</span>
            <div class="flex items-center gap-1.5">
              ${digitBoxesHtml}
            </div>
          </div>

          <div class="space-y-0.5 pt-1 text-xs">
            <div><span class="text-slate-600 dark:text-emerald-500 font-bold">Nome:</span> <strong class="text-sm font-black text-slate-900 dark:text-white uppercase">${displayName}</strong></div>
            <div><span class="text-slate-600 dark:text-emerald-500 font-bold">Partido:</span> <strong class="text-slate-900 dark:text-emerald-300 font-bold">${matchedCandidate.party}</strong></div>
            <div><span class="text-slate-600 dark:text-emerald-500 font-bold">Estado:</span> <strong class="text-slate-900 dark:text-emerald-300 font-bold">${matchedCandidate.state}</strong></div>
          </div>
        </div>
      `;
      return;
    }

    // Tela de Voto Nulo (se digitou todos os números e não encontrou candidato)
    if (enteredDigits.length === reqDigits && !matchedCandidate) {
      screen.innerHTML = `
        <div class="space-y-3">
          <span class="text-xs uppercase tracking-wider block text-slate-600 dark:text-emerald-500">
            SEU VOTO PARA
          </span>
          <h2 class="text-sm sm:text-base font-black text-slate-900 dark:text-white uppercase">
            ${URNA_OFFICES[currentOffice]?.label}
          </h2>

          <div class="space-y-1">
            <span class="text-xs text-slate-600 dark:text-emerald-500 block font-bold">Número:</span>
            <div class="flex items-center gap-1.5">
              ${digitBoxesHtml}
            </div>
          </div>

          <div class="p-4 rounded-xl border-2 border-rose-500 bg-rose-500/10 text-rose-900 dark:text-rose-300 text-center space-y-1 my-3">
            <strong class="text-base font-black block">NÚMERO ERRADO / CANDIDATO INEXISTENTE</strong>
            <span class="text-xs uppercase font-bold tracking-wider">VOTO NULO</span>
          </div>
        </div>
      `;
      return;
    }

    // Tela Inicial / Em digitação
    screen.innerHTML = `
      <div class="space-y-4">
        <div>
          <span class="text-xs uppercase tracking-wider block text-slate-600 dark:text-emerald-500">
            SEU VOTO PARA
          </span>
          <h2 class="text-base sm:text-lg font-black text-slate-900 dark:text-white uppercase">
            ${URNA_OFFICES[currentOffice]?.label}
          </h2>
        </div>

        <div class="space-y-1.5">
          <span class="text-xs text-slate-600 dark:text-emerald-500 block font-bold">Número:</span>
          <div class="flex items-center gap-1.5">
            ${digitBoxesHtml}
          </div>
        </div>

        <div class="pt-4 text-xs text-slate-600 dark:text-emerald-500 leading-relaxed">
          <p>Digite os <strong>${reqDigits} dígitos</strong> do seu candidato utilizando o teclado ao lado.</p>
        </div>
      </div>
    `;
  }

  function checkCandidateMatch() {
    const reqDigits = getRequiredDigits();
    if (enteredDigits.length === reqDigits && window.candidatesData) {
      // Procura pelo número e cargo correspondente
      const found = window.candidatesData.find(c => {
        const numMatch = String(c.number) === enteredDigits;
        const posMatch = c.position && c.position.toLowerCase().includes(currentOffice.toLowerCase().split(' ')[0]);
        return numMatch && posMatch;
      }) || window.candidatesData.find(c => String(c.number) === enteredDigits);

      if (found) {
        matchedCandidate = found;
        voteStatus = 'found';
      } else {
        matchedCandidate = null;
        voteStatus = 'null';
      }
    } else {
      matchedCandidate = null;
      voteStatus = enteredDigits.length > 0 ? 'typing' : 'empty';
    }
  }

  // Teclas Interativas da Urna
  window.pressUrnaKey = function(digit) {
    audioSynth.playKeyBeep();
    const reqDigits = getRequiredDigits();
    if (enteredDigits.length < reqDigits && voteStatus !== 'blank') {
      enteredDigits += digit;
      checkCandidateMatch();
      updateUrnaScreen();
    }
  };

  window.pressUrnaBlank = function() {
    audioSynth.playKeyBeep();
    enteredDigits = '';
    matchedCandidate = null;
    voteStatus = 'blank';
    updateUrnaScreen();
  };

  window.pressUrnaCorrige = function() {
    audioSynth.playErrorBeep();
    enteredDigits = '';
    matchedCandidate = null;
    voteStatus = 'empty';
    const cardEl = document.getElementById('urna-civic-card-container');
    if (cardEl) cardEl.classList.add('hidden');
    updateUrnaScreen();
  };

  window.pressUrnaConfirma = function() {
    const reqDigits = getRequiredDigits();
    if (voteStatus === 'blank' || enteredDigits.length === reqDigits) {
      audioSynth.playTseConfirmSound();
      voteStatus = 'confirmed';
      updateUrnaScreen();

      // Revela o Card de Consciência Cívica após o som
      setTimeout(() => {
        showCivicReflectionCard();
      }, 700);
    } else {
      audioSynth.playErrorBeep();
    }
  };

  window.setUrnaOffice = function(officeName) {
    if (URNA_OFFICES[officeName]) {
      currentOffice = officeName;
      enteredDigits = '';
      matchedCandidate = null;
      voteStatus = 'empty';
      renderUrnaInterface();
    }
  };

  // Função para testar candidato diretamente a partir de cards do Feed ou Dossiê
  window.testCandidateInUrna = function(candidateNumber, position) {
    if (window.switchAppleTab) {
      window.switchAppleTab('urna');
    }
    
    // Ajusta o cargo se detectável
    if (position) {
      for (const off of Object.keys(URNA_OFFICES)) {
        if (position.toLowerCase().includes(off.toLowerCase())) {
          currentOffice = off;
          break;
        }
      }
    }

    renderUrnaInterface();
    enteredDigits = String(candidateNumber);
    checkCandidateMatch();
    updateUrnaScreen();

    // Scroll suave até a urna
    const urnaEl = document.getElementById('tab-urna');
    if (urnaEl) urnaEl.scrollIntoView({ behavior: 'smooth' });
  };

  function showCivicReflectionCard() {
    const container = document.getElementById('urna-civic-card-container');
    if (!container) return;

    if (!matchedCandidate) {
      container.innerHTML = `
        <div class="glass-panel p-5 rounded-2xl border-2 border-sky-300 dark:border-sky-500/30 text-center space-y-3">
          <h3 class="text-base font-black text-slate-900 dark:text-white">
            Voto Simulado Concluído!
          </h3>
          <p class="text-xs text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
            Você votou em Branco ou Nulo nesta simulação. Lembre-se de que votos nulos e brancos não vão para nenhum candidato, reduzindo o total de votos válidos da eleição.
          </p>
          <button onclick="window.pressUrnaCorrige()" class="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs cursor-pointer shadow-md transition">
            Simular Voto em Outro Candidato
          </button>
        </div>
      `;
      container.classList.remove('hidden');
      return;
    }

    const c = matchedCandidate;
    const displayName = c.ballotName || c.name;
    const cf = c.campaignFinance;

    container.innerHTML = `
      <div class="glass-panel p-5 sm:p-6 rounded-3xl border-2 border-emerald-400/50 dark:border-emerald-500/40 shadow-xl space-y-4 animate-fade-in">
        <div class="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
          <div class="flex items-center gap-2">
            <span class="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              ✓
            </span>
            <div>
              <h3 class="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                Raio-X do seu Voto Simulado: ${displayName} (${c.party})
              </h3>
              <span class="text-[11px] text-slate-500 dark:text-slate-400 font-mono">Antes de votar em 2026, conheça o histórico oficial:</span>
            </div>
          </div>
          <span class="px-3 py-1 rounded-full text-xs font-black bg-sky-100 dark:bg-sky-500/20 text-sky-800 dark:text-cyan-300 font-mono border border-sky-300 dark:border-sky-500/30">
            Score: ${c.overallScore}/100
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-white/5 space-y-1">
            <span class="text-slate-500 dark:text-slate-400 text-[11px] block font-bold">Situação Jurídica:</span>
            <strong class="text-slate-900 dark:text-white block font-black">
              ${c.legalIntegrity?.status === 'ineligible' ? '⚠️ Inelegível' : (c.legalIntegrity?.status === 'investigated' ? '⚖️ Em Investigação' : '✅ Ficha Limpa Plena')}
            </strong>
            <span class="text-[10px] text-slate-500 dark:text-slate-400">${c.legalIntegrity?.courtAuditNotes || 'Certidão limpa no STF e STJ'}</span>
          </div>

          <div class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-white/5 space-y-1">
            <span class="text-slate-500 dark:text-slate-400 text-[11px] block font-bold">Custo ao Contribuinte:</span>
            <strong class="text-amber-700 dark:text-amber-300 block font-black font-mono">
              ${c.salary?.civicConversion?.costPerMinute || 'R$ 0,51 / min'}
            </strong>
            <span class="text-[10px] text-slate-500 dark:text-slate-400">${c.salary?.spendingCeapMonthly || 'Cota de gabinete'}</span>
          </div>

          <div class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-white/5 space-y-1">
            <span class="text-slate-500 dark:text-slate-400 text-[11px] block font-bold">Custo por Voto TSE:</span>
            <strong class="text-purple-700 dark:text-purple-300 block font-black font-mono">
              ${cf ? cf.costPerVote : 'R$ 8,50 por voto'}
            </strong>
            <span class="text-[10px] text-slate-500 dark:text-slate-400">${cf ? cf.publicFundPct + '% Fundo Eleitoral' : 'Prestação TSE'}</span>
          </div>
        </div>

        <div class="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button onclick="window.pressUrnaCorrige()" class="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-xs cursor-pointer transition">
            ← Votar em Outro Candidato
          </button>

          <div class="flex items-center gap-2">
            <button onclick="openDossie('${c.id}')" class="px-4 py-2 rounded-xl bg-sky-700 hover:bg-sky-600 text-white font-bold text-xs shadow-md cursor-pointer transition flex items-center gap-1.5">
              <i data-lucide="file-text" class="w-3.5 h-3.5"></i> Ver Dossiê Completo
            </button>
            <button onclick="shareUrnaSimulation('${displayName}', '${c.number}', '${c.party}')" class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md cursor-pointer transition flex items-center gap-1.5">
              <i data-lucide="share-2" class="w-3.5 h-3.5"></i> Compartilhar no WhatsApp
            </button>
          </div>
        </div>
      </div>
    `;

    container.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
    container.scrollIntoView({ behavior: 'smooth' });
  }

  window.shareUrnaSimulation = function(name, number, party) {
    const text = `🗳️ Acabei de simular meu voto na Urna Eletrônica 2026 para ${name} (${party} - Nº ${number}) no Observatório Raio-X Político!\nConfira a auditoria de gastos, presença e ficha limpa de todos os candidatos em: ${window.location.origin}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  function attachKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      // Se não estiver na aba urna, ignora
      const tabUrna = document.getElementById('tab-urna');
      if (!tabUrna || tabUrna.classList.contains('hidden')) return;

      if (e.key >= '0' && e.key <= '9') {
        window.pressUrnaKey(e.key);
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        window.pressUrnaCorrige();
      } else if (e.key === 'Enter') {
        window.pressUrnaConfirma();
      }
    });
  }

  // Inicialização no DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUrna);
  } else {
    initUrna();
  }

  // Aliases compatíveis para testes e automação
  window.renderUrnaInterface = renderUrnaInterface;
  window.initUrna = initUrna;
  window.handleUrnaDigit = window.pressUrnaKey;
  window.handleUrnaWhite = window.pressUrnaBlank;
  window.handleUrnaCorrige = window.pressUrnaCorrige;
  window.handleUrnaConfirma = window.pressUrnaConfirma;

})();
