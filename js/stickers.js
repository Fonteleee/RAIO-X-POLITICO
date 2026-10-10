// Figuras Políticas - Figurinhas Colecionáveis, Download 1080p/4K e Compartilhamento

// ================= INCUMBENTS RENDERER (158 MANDATÁRIOS COM FILTROS) =================
    let activeIncumbentCargo = 'todos';
    let activeIncumbentState = 'todos';
    let activeIncumbentSearch = '';

    function renderIncumbents() {
      const grid = document.getElementById('incumbents-grid');
      if (!grid) return;

      const data = (typeof window !== 'undefined' && window.incumbentsData) ? window.incumbentsData : (typeof incumbentsData !== 'undefined' ? incumbentsData : []);
      
      let filtered = [...data];

      // Filtro de Cargo
      if (activeIncumbentCargo !== 'todos') {
        filtered = filtered.filter(inc => {
          if (inc.cargoCategory) return inc.cargoCategory === activeIncumbentCargo;
          const off = (inc.office || '').toLowerCase();
          return off.includes(activeIncumbentCargo);
        });
      }

      // Filtro de Estado
      if (activeIncumbentState !== 'todos') {
        filtered = filtered.filter(inc => inc.state && inc.state.toUpperCase() === activeIncumbentState.toUpperCase());
      }

      // Filtro de Busca
      if (activeIncumbentSearch) {
        const q = activeIncumbentSearch.toLowerCase().trim();
        filtered = filtered.filter(inc => 
          (inc.name && inc.name.toLowerCase().includes(q)) ||
          (inc.fullName && inc.fullName.toLowerCase().includes(q)) ||
          (inc.party && inc.party.toLowerCase().includes(q)) ||
          (inc.office && inc.office.toLowerCase().includes(q))
        );
      }

      if (filtered.length === 0) {
        grid.innerHTML = `
          <div class="col-span-full text-center py-10 px-4 glass-card rounded-2xl border border-dashed border-slate-300 dark:border-white/10 space-y-2">
            <i data-lucide="search-x" class="w-8 h-8 text-slate-400 mx-auto"></i>
            <h4 class="font-bold text-slate-900 dark:text-white text-sm">Nenhum mandatário encontrado</h4>
            <p class="text-xs text-slate-500 dark:text-slate-400">Tente ajustar o filtro de cargo, estado ou termo de busca.</p>
          </div>
        `;
        if (typeof lucide !== 'undefined') lucide.createIcons();
        return;
      }

      grid.innerHTML = filtered.map(inc => `
        <div class="glass-card rounded-2xl p-5 space-y-4 flex flex-col justify-between">
          <div class="space-y-3">
            <div class="flex items-start gap-3.5">
              <div class="avatar-frame w-16 h-16 rounded-2xl border-2 border-emerald-500/40 shadow-sm flex-shrink-0 bg-slate-100 dark:bg-slate-800">
                <img 
                  src="${(window.getSafeAvatarUrl ? window.getSafeAvatarUrl(inc, inc.name) : inc.avatar)}" 
                  alt="${inc.name}" 
                  referrerpolicy="no-referrer"
                  onerror="this.onerror=null; this.src=(window.getSafeAvatarFallback ? window.getSafeAvatarFallback('${(inc.name || 'Mandatário').replace(/'/g, "\\'")}') : 'https://ui-avatars.com/api/?name=${encodeURIComponent(inc.name)}&background=059669&color=fff&bold=true&size=128');"
                  class="w-full h-full object-cover candidate-avatar"
                >
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between gap-1 flex-wrap">
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30">
                    ${inc.status}
                  </span>
                </div>
                <h3 class="font-extrabold text-base text-slate-900 dark:text-white mt-1 leading-tight truncate" title="${inc.name}">${inc.name}</h3>
                <p class="text-xs text-emerald-600 dark:text-emerald-400 font-medium truncate">${inc.party}</p>
                <p class="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">${inc.office}</p>
              </div>
            </div>

            <p class="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200 dark:border-white/5 line-clamp-3">
              ${inc.highlights}
            </p>
          </div>

          <div class="space-y-3 pt-3 border-t border-slate-200 dark:border-white/10">
            ${(() => {
              const linked = (typeof candidatesData !== 'undefined' ? candidatesData : []).find(c => c.id === inc.candidateId);
              const I = window.Indicadores;
              if (!I || !linked) return `<p class="text-xs text-slate-500 dark:text-slate-400">Dado indisponível — sem fonte oficial verificável</p>`;
              const itens = I.lista(linked).slice(0, 2);
              if (!itens.length) return `<p class="text-xs text-slate-500 dark:text-slate-400">${I.esc(I.SEM_FONTE)}</p>`;
              return itens.map(x => `<div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400"><span>${I.esc(x.ind.rotulo || I.DEFS[x.key].rotulo)} <span class="text-[10px]">(${I.esc(x.ind.fonte || '')})</span></span><strong class="text-slate-900 dark:text-white font-mono font-bold">${I.esc(I.formatValor(x.ind))}</strong></div>`).join('');
            })()}

            <button 
              onclick="openDossie('${inc.candidateId}')" 
              class="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition cursor-pointer flex items-center justify-center gap-1.5"
            >
              <i data-lucide="folder-search" class="w-3.5 h-3.5"></i>
              <span>Ver dossiê</span>
            </button>
          </div>
        </div>
      `).join('');

      if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    function filterIncumbentCargo(cargo) {
      activeIncumbentCargo = cargo;
      document.querySelectorAll('.inc-cargo-btn').forEach(btn => {
        if ((cargo === 'todos' && btn.innerText.includes('Todos')) || btn.innerText.toLowerCase().includes(cargo)) {
          btn.className = 'inc-cargo-btn active px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold whitespace-nowrap cursor-pointer shadow-sm';
        } else {
          btn.className = 'inc-cargo-btn px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border border-slate-200 dark:border-white/5 whitespace-nowrap cursor-pointer hover:bg-slate-100';
        }
      });
      renderIncumbents();
    }

    function filterIncumbentState(uf) {
      activeIncumbentState = uf;
      renderIncumbents();
    }

    function filterIncumbentSearch(query) {
      activeIncumbentSearch = query;
      renderIncumbents();
    }


// ================= EXPORT SOCIAL MEDIA CARD MODAL =================
    function safeCostMin(cand) {
      if (!cand) return 'R$ 0,51/min';
      const val = cand.salary && cand.salary.civicConversion && cand.salary.civicConversion.costPerMinute;
      if (!val || typeof val !== 'string') return 'R$ 0,51/min';
      return val.replace(' / min', '/min').trim();
    }

    function safeVal(val, fallback = '') {
      if (val === undefined || val === null || val === 'undefined' || val === 'null' || Number.isNaN(val)) return fallback;
      return val;
    }

    let activeExportCandidate = candidatesData[0];
    let isExportComparison = false;
    let exportFormat = 'stories';
    let exportVisualTheme = 'swiss'; // 'swiss' | 'fifa' | 'executive' | 'bento' | 'twitter' | 'apple'
    let exportRadarChartInstance = null;
    let exportRadarTimeout = null;

    function setExportVisualTheme(theme) {
      exportVisualTheme = theme;
      
      const allThemes = [
        'what_he_did', 'what_he_didnt', 'future_projection',
        'swiss', 'fifa', 'executive', 'bento', 'twitter', 'apple',
        'duel_5050', 'citizen_receipt', 'mandate_clock', 'ai_audit', 'judicial_clearance',
        'duel_economy', 'civic_affinity', 'story_viral_9_16', 'campaign_finance',
        'quote_truth', 'law_productivity', 'alerta_decisao_2026'
      ];
      const isAppleV2 = window.location.pathname.includes('_v2') || !!document.querySelector('.apple-card-3d') || !!document.getElementById('brand-v2-badge');

      allThemes.forEach(t => {
        const btn = document.getElementById('btn-theme-' + t);
        if (!btn) return;
        if (t === theme) {
          btn.className = isAppleV2
            ? 'sticker-opt-btn py-2 px-1 rounded-2xl bg-blue-600 text-white font-bold text-[10px] shadow-md shadow-blue-500/25 flex flex-col items-center justify-center gap-0.5 transition cursor-pointer'
            : 'sticker-opt-btn py-2 px-1 rounded-xl bg-purple-600 text-white font-bold text-[10px] shadow-sm flex flex-col items-center justify-center gap-0.5 transition cursor-pointer';
        } else {
          btn.className = isAppleV2
            ? 'sticker-opt-btn py-2 px-1 rounded-2xl bg-white/70 dark:bg-white/5 text-neutral-700 dark:text-neutral-300 font-medium text-[10px] border border-black/5 dark:border-white/10 flex flex-col items-center justify-center gap-0.5 transition cursor-pointer hover:bg-black/5 dark:hover:bg-white/10'
            : 'sticker-opt-btn py-2 px-1 rounded-xl bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[10px] border border-slate-200 dark:border-white/10 flex flex-col items-center justify-center gap-0.5 transition cursor-pointer hover:bg-slate-100';
        }
      });

      if (activeExportCandidate) {
        renderExportCardContent(activeExportCandidate, isExportComparison);
      }
    }

    function filterStickersCategory(cat) {
      const isAppleV2 = window.location.pathname.includes('_v2') || !!document.querySelector('.apple-card-3d') || !!document.getElementById('brand-v2-badge');
      const filters = ['all', 'whatsapp', 'instagram', 'twitter'];
      filters.forEach(f => {
        const btn = document.getElementById('stk-filter-' + f);
        if (!btn) return;
        if (f === cat) {
          btn.className = isAppleV2
            ? 'flex-1 py-1 rounded-full bg-white dark:bg-[#2c2c2e] text-neutral-900 dark:text-white font-bold shadow-xs transition cursor-pointer'
            : 'flex-1 py-1 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs transition';
        } else {
          btn.className = isAppleV2
            ? 'flex-1 py-1 rounded-full text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition cursor-pointer'
            : 'flex-1 py-1 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition';
        }
      });

      const buttons = document.querySelectorAll('.sticker-opt-btn');
      buttons.forEach(btn => {
        const btnCat = btn.getAttribute('data-stk-cat') || '';
        const isDuelOnly = btn.getAttribute('data-duel-only') === 'true';

        // Regra de Ouro do Usuário: Se for figurinha individual, OMITIR 100% figurinhas de duelo!
        if (!isExportComparison && isDuelOnly) {
          btn.style.display = 'none';
          return;
        }

        const cats = btnCat.split(' ');
        if (cat === 'all' || cats.includes(cat) || cats.includes('all')) {
          btn.style.display = 'flex';
        } else {
          btn.style.display = 'none';
        }
      });
    }

    function setExportFormat(fmt) {
      exportFormat = fmt;
      const isAppleV2 = window.location.pathname.includes('_v2') || !!document.querySelector('.apple-card-3d') || !!document.getElementById('brand-v2-badge');
      const btnStories = document.getElementById('btn-format-stories');
      const btnFeed = document.getElementById('btn-format-feed');
      if (btnStories && btnFeed) {
        if (fmt === 'stories') {
          btnStories.className = isAppleV2
            ? 'py-1.5 px-3 rounded-full bg-blue-600 text-white font-bold text-xs shadow-md shadow-blue-500/25 flex items-center justify-center gap-1.5 transition cursor-pointer'
            : 'py-2 px-3 rounded-xl bg-purple-600 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 transition';
          btnFeed.className = isAppleV2
            ? 'py-1.5 px-3 rounded-full text-neutral-700 dark:text-neutral-300 font-medium text-xs flex items-center justify-center gap-1.5 transition cursor-pointer hover:bg-black/5 dark:hover:bg-white/5'
            : 'py-2 px-3 rounded-xl bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs border border-slate-200 dark:border-white/10 flex items-center justify-center gap-1.5 transition';
        } else {
          btnFeed.className = isAppleV2
            ? 'py-1.5 px-3 rounded-full bg-blue-600 text-white font-bold text-xs shadow-md shadow-blue-500/25 flex items-center justify-center gap-1.5 transition cursor-pointer'
            : 'py-2 px-3 rounded-xl bg-purple-600 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 transition';
          btnStories.className = isAppleV2
            ? 'py-1.5 px-3 rounded-full text-neutral-700 dark:text-neutral-300 font-medium text-xs flex items-center justify-center gap-1.5 transition cursor-pointer hover:bg-black/5 dark:hover:bg-white/5'
            : 'py-2 px-3 rounded-xl bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs border border-slate-200 dark:border-white/10 flex items-center justify-center gap-1.5 transition';
        }
      }
    }

    function openExportModalFor(candId, isComparison = false, initialTheme = null) {
      if (initialTheme) {
        exportVisualTheme = initialTheme;
      }
      isExportComparison = isComparison;
      const cand = candidatesData.find(c => c.id === candId) || candidatesData[0];
      activeExportCandidate = cand;

      // Se for candidato individual e o tema ativo for duelo, volta ao modelo padrão
      if (!isComparison && (exportVisualTheme === 'duel_5050' || exportVisualTheme === 'duel_economy')) {
        exportVisualTheme = 'swiss';
      }

      // Se for duelo e o tema não for compatível com duelo, reseta para duel_5050
      const validDuelThemes = ['swiss', 'fifa', 'executive', 'bento', 'twitter', 'apple', 'duel_5050', 'citizen_receipt', 'mandate_clock', 'ai_audit', 'judicial_clearance', 'duel_economy', 'civic_affinity', 'story_viral_9_16', 'campaign_finance', 'quote_truth', 'law_productivity', 'alerta_decisao_2026'];
      if (isComparison && !validDuelThemes.includes(exportVisualTheme)) {
        exportVisualTheme = 'duel_5050';
      }

      filterStickersCategory('all');
      setExportVisualTheme(exportVisualTheme);
      renderExportCardContent(cand, isComparison);
      document.getElementById('export-modal').classList.remove('hidden');
      lucide.createIcons();
    }

    function exportComparisonCard() {
      isExportComparison = true;
      if (selectedForCompare.length < 2) {
        selectedForCompare = ['cand-tabata-amaral', 'cand-kim-kataguiri'];
      }
      activeExportCandidate = candidatesData.find(c => c.id === selectedForCompare[0]) || candidatesData[0];

      const validDuelThemes = ['swiss', 'fifa', 'executive', 'bento', 'twitter', 'apple', 'duel_5050', 'citizen_receipt', 'mandate_clock', 'ai_audit', 'judicial_clearance', 'duel_economy', 'civic_affinity', 'story_viral_9_16', 'campaign_finance', 'quote_truth', 'law_productivity', 'alerta_decisao_2026'];
      if (!validDuelThemes.includes(exportVisualTheme)) {
        exportVisualTheme = 'duel_5050';
      }

      filterStickersCategory('all');
      setExportVisualTheme(exportVisualTheme);
      renderExportCardContent(activeExportCandidate, true);
      document.getElementById('export-modal').classList.remove('hidden');
      lucide.createIcons();
    }

    function exportComparisonWithTheme(theme = 'ai_audit') {
      exportVisualTheme = theme;
      exportComparisonCard();
    }

    function closeExportModal() {
      if (typeof exportRadarChartInstance !== 'undefined' && exportRadarChartInstance) {
        exportRadarChartInstance.destroy();
        exportRadarChartInstance = null;
      }
      document.getElementById('export-modal').classList.add('hidden');
    }

    function getCorsSafeAvatar(url, name = 'Candidato') {
      if (!url || url.includes('Portrait_Placeholder') || url.includes('thumb.wikimedia.org')) {
        return 'https://ui-avatars.com/api/?name=' + encodeURIComponent(name) + '&background=0284c7&color=fff&bold=true&size=128';
      }
      if (url.startsWith('http://') || url.startsWith('https://')) {
        return '/api/proxy-image?url=' + encodeURIComponent(url);
      }
      return url;
    }

    // Figurinha com até 3 indicadores oficiais (valor, fonte e data). Sem nota, radar ou eixos.
    // Sem indicadores: mostra apenas cargo e situação real do mandato.
    function stickerIndicatorsHtml(c, max) {
      const I = window.Indicadores;
      const E = I.esc;
      const itens = I.lista(c).slice(0, max || 3);
      if (!itens.length) {
        return `<div class="p-3 rounded-2xl bg-white/[0.05] border border-white/10 text-center space-y-1">
          <p class="text-xs font-bold text-white">${E(c.position || 'Cargo não informado')}</p>
          <p class="text-[11px] text-white/70">${E(I.status(c).rotulo)}</p>
          <p class="text-[10px] text-white/50">Indicadores oficiais indisponíveis para este perfil.</p>
        </div>`;
      }
      return itens.map(x => {
        const p = I.percentil(c, x.key, candidatesData);
        return `<div class="p-2.5 rounded-2xl bg-white/[0.05] border border-white/10 space-y-0.5">
          <div class="flex items-center justify-between gap-2">
            <span class="text-[10px] font-bold uppercase tracking-wider text-white/70">${E(x.ind.rotulo || I.DEFS[x.key].rotulo)}</span>
            <strong class="font-mono text-base text-white">${E(I.formatValor(x.ind))}</strong>
          </div>
          ${x.ind.detalhe ? `<p class="text-[10px] text-white/70">${E(x.ind.detalhe)}</p>` : ''}
          ${typeof p === 'number' ? `<p class="text-[10px] text-sky-300">${x.key === 'cotaParlamentar' ? 'Mais econômico que' : 'Melhor que'} ${Math.round(p)}% dos pares</p>` : ''}
          <p class="text-[9px] text-white/50">Fonte: ${E(x.ind.fonte || 'oficial')}${x.ind.consultadoEm ? ` · ${E(I.dataBR(x.ind.consultadoEm))}` : ''}</p>
        </div>`;
      }).join('');
    }

    function stickerHeaderHtml(c, cor) {
      const I = window.Indicadores;
      const E = I.esc;
      const avatar = getCorsSafeAvatar(c.avatar, c.name);
      return `<div class="flex items-center gap-3">
        <img src="${E(avatar)}" alt="${E(c.name)}" crossorigin="anonymous" referrerpolicy="no-referrer" onerror="this.onerror=null;this.src='favicon.svg'" class="w-16 h-16 rounded-2xl object-cover ring-2 ${cor} bg-slate-800">
        <div class="min-w-0">
          <h4 class="font-black text-lg text-white leading-tight truncate">${E(c.ballotName || c.name)}</h4>
          <p class="text-xs text-white/70 truncate">${E(c.party || '')} • ${E(c.position || '')}${c.state ? ` • ${E(c.state)}` : ''}</p>
          <div class="mt-1">${I.statusBadgeHtml(c)}</div>
        </div>
      </div>`;
    }

    function renderExportCardContent(cand, isComparison = false) {
      const target = document.getElementById('export-card-target');
      if (!target || !window.Indicadores) return;
      const moldura = (corpo) => `
        <div class="flex flex-col gap-3 h-full">
          <div class="px-2.5 py-1 rounded-full border border-sky-400/40 flex items-center justify-between text-[9px] font-black tracking-widest text-sky-300 uppercase">
            <span>FIGURAS POLÍTICAS • 2026</span><span>INDICADORES OFICIAIS</span>
          </div>
          ${corpo}
          <div class="mt-auto pt-2 border-t border-white/10 text-[9px] text-white/60 leading-snug">
            Dados de fontes oficiais (Câmara, Senado, TSE, Portal da Transparência). Sem nota geral. Veja links e datas no dossiê.
          </div>
        </div>`;

      if (isComparison) {
        const cand1 = candidatesData.find(c => c.id === selectedForCompare[0]) || candidatesData[0];
        const cand2 = candidatesData.find(c => c.id === selectedForCompare[1]) || candidatesData[1];
        target.innerHTML = moldura(`
          ${stickerHeaderHtml(cand1, 'ring-amber-500/80')}
          <div class="space-y-1.5">${stickerIndicatorsHtml(cand1, 2)}</div>
          <div class="text-center text-xs font-black text-white/60">VS</div>
          ${stickerHeaderHtml(cand2, 'ring-purple-500/80')}
          <div class="space-y-1.5">${stickerIndicatorsHtml(cand2, 2)}</div>
        `);
      } else {
        const t = cand.tse2026;
        const tse = (t && t.cargo) ? `<p class="text-[11px] text-emerald-300">Eleição 2026: ${Indicadores.esc(t.cargo)}${t.numero ? ` nº ${Indicadores.esc(t.numero)}` : ''}${t.situacaoTurno ? ` — ${Indicadores.esc(t.situacaoTurno)}` : ''}</p>` : '';
        target.innerHTML = moldura(`
          ${stickerHeaderHtml(cand, 'ring-sky-500/80')}
          ${tse}
          <div class="space-y-2">${stickerIndicatorsHtml(cand, 3)}</div>
        `);
      }
      if (window.lucide) lucide.createIcons();
    }


    async function generateCanvasSecurely(target, scaleFactor, bg) {
        // Clone the element to render it properly off-screen
        const clone = target.cloneNode(true);
        // Force width for 9:16 aspect ratio base
        const baseWidth = 420; 
        clone.style.width = baseWidth + 'px';
        clone.style.height = 'auto';
        clone.style.position = 'absolute';
        clone.style.top = '-9999px';
        clone.style.left = '-9999px';
        clone.style.transform = 'none';
        clone.style.maxWidth = 'none';
        clone.style.maxHeight = 'none';
        clone.style.margin = '0';
        clone.style.overflow = 'visible';
        
                // Remove truncate to avoid text clipping
        const truncates = clone.querySelectorAll('.truncate, [class*="line-clamp-"]');
        truncates.forEach(el => {
            el.className = el.className.replace(/truncate/g, '').replace(/line-clamp-\d+/g, '');
            el.style.whiteSpace = 'normal';
            el.style.overflow = 'visible';
            el.style.display = 'block'; // Overwrite webkit-box
        });
        
        document.body.appendChild(clone);
        await new Promise(r => setTimeout(r, 200));
        
        const canvas = await html2canvas(clone, {
            backgroundColor: bg,
            scale: scaleFactor,
            useCORS: true,
            allowTaint: true,
            logging: false,
            width: baseWidth,
            height: clone.scrollHeight
        });
        
        document.body.removeChild(clone);
        return canvas;
    }

    async function downloadExportedImage(resolution = 'fhd') {
      const target = document.getElementById('export-card-target');
      const scaleFactor = resolution === '4k' ? 3.5 : 2.2;
      const btn = resolution === '4k' ? document.getElementById('btn-dl-4k') : document.getElementById('btn-dl-fhd');
      const originalText = btn.innerHTML;
      btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Renderizando ${resolution.toUpperCase()}...`;
      lucide.createIcons();

      const cardBg = exportVisualTheme === 'twitter' || isExportComparison ? '#070b16' : '#ffffff';

      try {
        await new Promise(r => setTimeout(r, 100));

        const canvas = await generateCanvasSecurely(target, scaleFactor, cardBg);

        const link = document.createElement('a');
        const resLabel = resolution === '4k' ? '4K-UltraHD' : 'FullHD-1080p';
        const candName = activeExportCandidate ? activeExportCandidate.name.toLowerCase().replace(/\s+/g, '-') : 'candidato';
        const filename = isExportComparison 
          ? `figurinha-duelo-${selectedForCompare[0]}-vs-${selectedForCompare[1]}-${resLabel}.png`
          : `figurinha-${exportVisualTheme}-${candName}-${resLabel}.png`;
        
        link.download = filename;
        link.href = canvas.toDataURL('image/png', 0.95);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        canvas.width = 0;
        canvas.height = 0;
      } catch (err) {
        console.error("Erro na exportação:", err);
        alert("Ocorreu uma instabilidade ao gerar a imagem.");
      } finally {
        btn.innerHTML = originalText;
        lucide.createIcons();
      }
    }

    async function copyCardImageToClipboard() {
      const target = document.getElementById('export-card-target');
      const btn = document.getElementById('btn-copy-img');
      const originalText = btn.innerHTML;
      btn.innerHTML = `<i data-lucide="loader-2" class="w-3.5 h-3.5 animate-spin"></i> Copiando...`;
      lucide.createIcons();

      const cardBg = exportVisualTheme === 'twitter' || isExportComparison ? '#070b16' : '#ffffff';

      try {
        const canvas = await generateCanvasSecurely(target, scaleFactor, cardBg);
        canvas.toBlob(async (blob) => {
          if (blob) {
            await navigator.clipboard.write([
              new ClipboardItem({ 'image/png': blob })
            ]);
            btn.innerHTML = `<i data-lucide="check" class="w-3.5 h-3.5 text-emerald-500"></i> Copiado!`;
            lucide.createIcons();
            setTimeout(() => { btn.innerHTML = originalText; lucide.createIcons(); }, 2000);
          }
        });
      } catch (e) {
        alert("Seu navegador não suporta cópia direta. Use o botão de Baixar.");
        btn.innerHTML = originalText;
        lucide.createIcons();
      }
    }

        async function shareToInstagram() {
      try {
        const target = document.getElementById('export-card-target');
        if (!target) return;
        const btn = document.getElementById('btn-share-insta');
        if (btn) btn.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin text-white"></i> Gerando...';
        
        const canvas = await generateCanvasSecurely(target, scaleFactor, cardBg);
        canvas.toBlob(async (blob) => {
          if (!blob) {
            if (btn) btn.innerHTML = '<i data-lucide="camera" class="w-4 h-4 text-white"></i> 📸 Postar no Instagram (Stories / Feed)';
            return;
          }
          const file = new File([blob], 'raiox_politico_figurinha.png', { type: 'image/png' });
          
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
              files: [file],
              title: 'Raio-X Político',
              text: 'Confira a análise deste político no Raio-X Político!'
            });
          } else {
            alert("Seu dispositivo não suporta envio direto. A figurinha será baixada para você postar manualmente no Instagram.");
            downloadExportedImage('fhd');
          }
          if (btn) btn.innerHTML = '<i data-lucide="camera" class="w-4 h-4 text-white"></i> 📸 Postar no Instagram (Stories / Feed)';
          if (window.lucide) lucide.createIcons();
        }, 'image/png');
      } catch (err) {
        console.error(err);
        alert("Erro ao processar imagem para o Instagram.");
      }
    }

    async function shareCardImageNative() {
      const target = document.getElementById('export-card-target');
      if (!target) return;

      const cardBg = exportVisualTheme === 'twitter' || isExportComparison ? '#070b16' : '#ffffff';
      const candName = activeExportCandidate ? (activeExportCandidate.ballotName || activeExportCandidate.name) : 'Candidato';
      const candParty = activeExportCandidate ? `${activeExportCandidate.party}-${activeExportCandidate.state}` : 'Eleições 2026';
      const shareUrl = activeExportCandidate ? new URL(`dossie.html?id=${encodeURIComponent(activeExportCandidate.id)}`, window.location.href).href : window.location.href;

      try {
        const canvas = await generateCanvasSecurely(target, scaleFactor, cardBg);
        canvas.toBlob(async (blob) => {
          if (blob && navigator.canShare && navigator.canShare({ files: [new File([blob], 'figurinha.png', { type: 'image/png' })] })) {
            const file = new File([blob], `figurinha-${candName.toLowerCase().replace(/\s+/g, '-')}.png`, { type: 'image/png' });
            await navigator.share({
              files: [file],
              title: `Figuras Políticas: ${candName} (${candParty})`,
              text: `Confira a auditoria cívica oficial de ${candName} no Figuras Políticas:`,
              url: shareUrl
            });
          } else {
            exportCardImage('standard');
          }
        });
      } catch (err) {
        console.warn('[WebShare] Fallback para download:', err);
        exportCardImage('standard');
      }
    }
    window.shareCardImageNative = shareCardImageNative;


    // ================= LEGAL SOURCES & PROTECTION MODAL LOGIC =================
    function openLegalSourcesModal() {
      document.getElementById('legal-sources-modal').classList.remove('hidden');
      lucide.createIcons();
    }

    function closeLegalSourcesModal() {
      document.getElementById('legal-sources-modal').classList.add('hidden');
    }


