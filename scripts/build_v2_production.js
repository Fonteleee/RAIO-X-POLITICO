const fs = require('fs');
const path = require('path');

console.log('[Builder V2 Production] Assembling index_v2.html with ultra-compact above-the-fold layout...');

const v1Html = fs.readFileSync('index.html', 'utf8');
const v1Lines = v1Html.split('\n');

function findLine(str, startFrom = 0) {
  for (let i = startFrom; i < v1Lines.length; i++) {
    if (v1Lines[i].includes(str)) return i;
  }
  return -1;
}

const tabFeedStart = findLine('id="tab-feed"');
const tabCompStart = findLine('id="tab-comparator"');
const tabMatchStart = findLine('id="tab-match"');
const tabIncumbentsStart = findLine('id="tab-incumbents"');
const tabRankStart = findLine('id="tab-ranking"');
const modalsStart = findLine('<!-- ================= MODAL: EXPORTADOR DE CARDS');
const footerStart = findLine('<!-- ================= FOOTER');
const glossaryStart = findLine('<!-- ================= MODAL: GLOSS');
const scriptsStart = findLine('<script src="data/candidates.js">');

const tabCompHtml = v1Lines.slice(tabCompStart, tabMatchStart).join('\n');
const tabMatchHtml = v1Lines.slice(tabMatchStart, tabIncumbentsStart).join('\n');
const tabIncumbentsHtml = v1Lines.slice(tabIncumbentsStart, tabRankStart).join('\n');
const tabRankHtml = v1Lines.slice(tabRankStart, modalsStart).join('\n');
const modalsPart1 = v1Lines.slice(modalsStart, footerStart).join('\n');
const modalsPart2 = v1Lines.slice(glossaryStart, scriptsStart).join('\n');

const appleV2Html = `<!DOCTYPE html>
<html lang="pt-BR" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Figuras Políticas • Versão 2 (Apple Edition) | Auditoria Cívica 2026</title>
  
  <!-- Apple Meta & Theme -->
  <meta name="theme-color" content="#f5f5f7" media="(prefers-color-scheme: light)">
  <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="description" content="Raio-X Político V2. A experiência cívica definitiva para as Eleições 2026. Design System Apple, Liquid Glass, 3D Spatial Tilt, Dynamic Glare e 100% dos dados consolidados.">
  
  <!-- OpenGraph -->
  <meta property="og:title" content="Figuras Políticas V2 • Veja quem te representa.">
  <meta property="og:description" content="Auditoria profunda de gastos, propostas e histórico de 164 personalidades com o rigor estético da Apple.">
  <meta property="og:type" content="website">

  <!-- Google Fonts: Plus Jakarta Sans & JetBrains Mono -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">

  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"SF Pro Text"', '"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
            mono: ['"SF Mono"', '"JetBrains Mono"', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
          },
          colors: {
            apple: {
              canvas: '#f5f5f7',
              canvasDark: '#000000',
              cardLight: '#ffffff',
              cardDark: '#1c1c1e',
              blue: '#0071e3',
              blueHover: '#0077ed',
              blueDark: '#2997ff',
              green: '#34c759',
              orange: '#ff9500',
              purple: '#af52de',
              red: '#ff3b30'
            }
          }
        }
      }
    }
  </script>

  <!-- Lucide Icons, Chart.js & html2canvas -->
  <script src="https://unpkg.com/lucide@latest"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>

  <style>
    :root {
      --ease-apple-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
      --ease-apple-out: cubic-bezier(0.16, 1, 0.3, 1);
      --apple-radius-outer: 28px;
      --apple-radius-card: 22px;
      --apple-radius-inner: 14px;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Plus Jakarta Sans", "Helvetica Neue", sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: optimizeLegibility;
      background-color: #f5f5f7;
      color: #1d1d1f;
      transition: background-color 0.3s ease, color 0.3s ease;
    }

    html.dark body {
      background-color: #000000;
      color: #f5f5f7;
    }

    /* Keynote Text Shimmer */
    @keyframes apple-shimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }

    .apple-headline-shimmer {
      background: linear-gradient(135deg, #1d1d1f 0%, #6e6e73 25%, #1d1d1f 50%, #86868b 75%, #1d1d1f 100%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: apple-shimmer 7s linear infinite;
    }

    html.dark .apple-headline-shimmer {
      background: linear-gradient(135deg, #ffffff 0%, #86868b 25%, #ffffff 50%, #a1a1a6 75%, #ffffff 100%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: apple-shimmer 7s linear infinite;
    }

    /* Liquid Glass Floating Island Header */
    .apple-glass-nav {
      background: rgba(245, 245, 247, 0.85);
      backdrop-filter: blur(28px) saturate(190%);
      -webkit-backdrop-filter: blur(28px) saturate(190%);
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
    }
    html.dark .apple-glass-nav {
      background: rgba(0, 0, 0, 0.85);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    }

    /* 3D Spatial Tilt Card */
    .apple-card-3d {
      perspective: 1200px;
      transform-style: preserve-3d;
      border-radius: var(--apple-radius-card);
      transition: transform 0.5s var(--ease-apple-out), box-shadow 0.5s var(--ease-apple-out), border-color 0.3s ease;
      will-change: transform;
    }

    /* Dynamic Specular Glare */
    .apple-card-glare {
      mix-blend-mode: overlay;
      pointer-events: none;
      transition: opacity 0.35s ease;
    }

    /* Segmented Capsule Control */
    .apple-segmented-container {
      position: relative;
      display: inline-flex;
      background: rgba(0, 0, 0, 0.06);
      padding: 3px;
      border-radius: 9999px;
      border: 1px solid rgba(0, 0, 0, 0.05);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
    }
    html.dark .apple-segmented-container {
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.1);
    }

    .apple-segmented-pill {
      position: absolute;
      top: 3px;
      bottom: 3px;
      border-radius: 9999px;
      background: #ffffff;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.06);
      transition: transform 0.38s var(--ease-apple-spring), width 0.38s var(--ease-apple-spring);
      z-index: 0;
    }
    html.dark .apple-segmented-pill {
      background: #2c2c2e;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
    }

    .apple-segment-btn {
      position: relative;
      z-index: 1;
      padding: 5px 14px;
      border-radius: 9999px;
      font-size: 11.5px;
      font-weight: 600;
      transition: color 0.25s ease;
      display: flex;
      items-center: center;
      gap: 5px;
      cursor: pointer;
    }

    /* Tabular numbers for civic precision */
    .font-mono, td, .tabular-nums {
      font-feature-settings: 'tnum';
      font-variant-numeric: tabular-nums;
    }
  </style>
</head>
<body class="min-h-screen flex flex-col antialiased selection:bg-blue-500 selection:text-white">

  <!-- ================= FLOATING LIQUID GLASS NAVIGATION ================= -->
  <header class="sticky top-0 z-40 apple-glass-nav transition-all duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
      
      <!-- Brand Logo -->
      <div class="flex items-center gap-2.5 cursor-pointer flex-shrink-0" onclick="switchAppleTab('feed')">
        <div class="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
          <i data-lucide="scan-eye" class="w-4 h-4"></i>
        </div>
        <div>
          <h1 class="font-bold text-xs sm:text-sm tracking-tight text-neutral-900 dark:text-white leading-tight">
            Figuras Políticas
          </h1>
          <p class="text-[10px] text-neutral-500 dark:text-neutral-400 font-medium">
            Veja quem te representa.
          </p>
        </div>
      </div>

      <!-- Center Version Switcher Pill (V1 Clássico ⇄ V2 Apple Edition) -->
      <div class="flex items-center p-0.5 bg-black/5 dark:bg-white/10 rounded-full border border-black/5 dark:border-white/10 text-[11px] font-semibold shadow-xs">
        <a href="index.html" class="px-2.5 py-0.5 rounded-full text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition cursor-pointer" title="Voltar para a Versão 1 Clássica">
          V1 Clássico
        </a>
        <span class="px-2.5 py-0.5 rounded-full bg-blue-600 text-white shadow-xs flex items-center gap-1 cursor-default">
          <i data-lucide="sparkles" class="w-3 h-3 text-amber-300"></i> V2 Apple ✦
        </span>
      </div>

      <!-- Global Search Input (Ctrl+K) -->
      <div class="relative flex-1 max-w-xs sm:max-w-sm hidden md:block">
        <div class="relative flex items-center">
          <i data-lucide="search" class="w-3.5 h-3.5 text-neutral-400 absolute left-3 pointer-events-none"></i>
          <input 
            type="text" 
            id="global-search-input"
            oninput="handleGlobalSearch(this.value)"
            onfocus="handleGlobalSearch(this.value)"
            placeholder="Buscar político, partido ou cargo..." 
            class="w-full pl-9 pr-14 py-1.5 bg-black/5 dark:bg-white/10 border border-black/5 dark:border-white/10 rounded-full text-xs font-medium text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition"
          >
          <span class="absolute right-2 px-1.5 py-0.2 rounded-full bg-black/5 dark:bg-white/10 text-[9px] font-mono text-neutral-500 pointer-events-none">
            Ctrl+K
          </span>
        </div>
        
        <!-- Live Instant Search Dropdown -->
        <div id="global-search-dropdown" class="hidden absolute top-full left-0 right-0 mt-2 bg-white/95 dark:bg-neutral-900/95 border border-black/10 dark:border-white/15 rounded-2xl shadow-2xl p-2 z-50 max-h-96 overflow-y-auto space-y-1 backdrop-blur-2xl">
          <!-- Populated dynamically via js/app.js -->
        </div>
      </div>

      <!-- Right Actions: Login, Theme Toggle, Location & Support -->
      <div class="flex items-center gap-1.5 flex-shrink-0">
        <!-- Location Selector -->
        <button onclick="openLocationModal()" class="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/10 border border-black/5 dark:border-white/10 text-[11px] font-medium text-neutral-800 dark:text-neutral-200 hover:bg-black/10 dark:hover:bg-white/15 transition cursor-pointer">
          <i data-lucide="map-pin" class="w-3 h-3 text-blue-600 dark:text-blue-400"></i>
          <span id="current-location-display" class="hidden sm:inline">São Paulo, SP</span>
          <i data-lucide="chevron-down" class="w-2.5 h-2.5 text-neutral-400"></i>
        </button>

        <!-- Theme Toggle Button -->
        <button onclick="toggleAppleTheme()" id="theme-toggle-btn" class="p-1.5 rounded-full bg-black/5 dark:bg-white/10 text-neutral-700 dark:text-neutral-200 hover:bg-black/10 dark:hover:bg-white/15 transition cursor-pointer" title="Alternar Modo Escuro / Claro">
          <i id="theme-toggle-icon" data-lucide="moon" class="w-3.5 h-3.5"></i>
        </button>

        <!-- Login / User Button -->
        <button onclick="openLoginModal()" class="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/10 text-[11px] font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-black/10 dark:hover:bg-white/15 transition cursor-pointer">
          <i data-lucide="user" class="w-3 h-3 text-blue-600 dark:text-blue-400"></i>
          <span id="user-btn-label">Entrar</span>
        </button>

        <!-- Crowdfunding CTA -->
        <button onclick="openDonateModal()" class="hidden sm:flex items-center gap-1 px-3 py-1 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-semibold shadow-xs transition cursor-pointer">
          <i data-lucide="heart" class="w-3 h-3 fill-white/20"></i> Apoiar
        </button>
      </div>

    </div>
  </header>

  <!-- ================= SUB-HEADER: ELECTION TIMELINE & 10 FONTES (COMPACTO) ================= -->
  <section class="border-b border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] py-1 px-4">
    <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 text-[11px]">
      
      <!-- Election Countdown -->
      <div class="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400">
        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span>
          <strong>Apuração TSE 2026:</strong> 
          <span class="text-blue-600 dark:text-blue-400 font-semibold">1º Turno em 04/10/2026</span> • 
          <span class="text-purple-600 dark:text-purple-400 font-semibold">2º Turno em 25/10/2026</span>
        </span>
      </div>

      <!-- Official Sources & Layman Terms -->
      <div class="flex items-center gap-1.5 flex-wrap">
        <button onclick="openGlossaryModal()" class="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 text-neutral-700 dark:text-neutral-300 font-medium text-[10.5px] transition cursor-pointer">
          <i data-lucide="help-circle" class="w-3 h-3 text-amber-500"></i>
          <span>Termos para Leigos</span>
        </button>
        <button onclick="openLegalSourcesModal()" class="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 font-medium text-[10.5px] transition cursor-pointer">
          <i data-lucide="shield-check" class="w-3 h-3 text-emerald-500"></i>
          <span>10 Fontes Oficiais</span>
        </button>
      </div>

    </div>
  </section>

  <!-- ================= KEYNOTE HERO SECTION (COMPACTO ABOVE-THE-FOLD) ================= -->
  <section class="pt-2.5 pb-1 px-4 text-center max-w-4xl mx-auto space-y-1">
    <h2 class="text-xl sm:text-2xl font-black tracking-tight apple-headline-shimmer leading-tight">
      A inteligência eleitoral redesenhada.
    </h2>

    <p class="text-[11.5px] sm:text-xs text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto font-medium leading-snug">
      Auditoria de gastos, propostas e integridade de 164 candidatos e 158 mandatários com 100% dos dados consolidados.
    </p>

    <!-- Live Badges -->
    <div class="flex flex-wrap items-center justify-center gap-1.5 pt-0.5 text-[10px] font-semibold">
      <span class="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20">
        164 Candidatos Auditados
      </span>
      <span class="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20">
        158 Mandatários
      </span>
      <span class="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
        17 Temas de Figurinhas
      </span>
      <span class="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
        100% Fotos Oficiais
      </span>
    </div>
  </section>

  <!-- ================= DYNAMIC CAPSULE SEGMENTED CONTROL ================= -->
  <div class="sticky top-14 z-30 py-1.5 flex justify-center px-4">
    <div class="apple-segmented-container shadow-xs">
      <div id="apple-segmented-pill" class="apple-segmented-pill"></div>

      <button data-apple-tab="feed" class="apple-segment-btn text-black dark:text-white font-bold">
        <i data-lucide="layout-grid" class="w-3.5 h-3.5"></i>
        <span>Feed Cívico</span>
      </button>
      <button data-apple-tab="ranking" class="apple-segment-btn text-neutral-500 dark:text-neutral-400">
        <i data-lucide="trophy" class="w-3.5 h-3.5"></i>
        <span>Ranking Auditado</span>
      </button>
      <button data-apple-tab="comparator" class="apple-segment-btn text-neutral-500 dark:text-neutral-400">
        <i data-lucide="scale" class="w-3.5 h-3.5"></i>
        <span>Comparador 1v1</span>
      </button>
      <button data-apple-tab="match" class="apple-segment-btn text-neutral-500 dark:text-neutral-400">
        <i data-lucide="sparkles" class="w-3.5 h-3.5"></i>
        <span>Match Eleitoral</span>
      </button>
      <button data-apple-tab="incumbents" class="apple-segment-btn text-neutral-500 dark:text-neutral-400">
        <i data-lucide="landmark" class="w-3.5 h-3.5"></i>
        <span>Em Exercício</span>
      </button>
    </div>
  </div>

  <!-- ================= MAIN CONTENT AREA ================= -->
  <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-2 pb-24 lg:pb-14">

    <!-- TAB 1: FEED DE CANDIDATOS -->
    <div id="tab-feed" class="space-y-3">
      <!-- Office Filters & Search Bar in Apple Bento Material (Compacto & Imediato) -->
      <div class="p-2.5 sm:p-3 rounded-2xl bg-white/70 dark:bg-[#1c1c1e]/70 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-xs space-y-2">
        <div class="flex flex-col sm:flex-row items-stretch gap-2">
          <div class="relative flex-1">
            <i data-lucide="search" class="w-3.5 h-3.5 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2"></i>
            <input 
              type="text" 
              id="filter-search" 
              placeholder="Buscar por nome, número, partido ou propostas..." 
              oninput="handleAppleSearch(this.value)"
              class="w-full pl-9 pr-4 py-1.5 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl text-xs font-medium text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition"
            >
          </div>
          <button onclick="resetAppleFeedFilters()" class="px-3 py-1.5 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 text-xs font-semibold text-neutral-700 dark:text-neutral-300 transition cursor-pointer">
            Limpar Filtros
          </button>
        </div>

        <!-- Office Pills -->
        <div class="flex flex-wrap items-center gap-1">
          <button data-office-pill="todos" onclick="setAppleOfficeFilter('todos')" class="px-3 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white shadow-xs cursor-pointer transition">
            Todos (164)
          </button>
          <button data-office-pill="Presidente" onclick="setAppleOfficeFilter('Presidente')" class="px-3 py-1 rounded-full text-xs font-semibold bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white cursor-pointer transition">
            Presidente
          </button>
          <button data-office-pill="Governador" onclick="setAppleOfficeFilter('Governador')" class="px-3 py-1 rounded-full text-xs font-semibold bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white cursor-pointer transition">
            Governador
          </button>
          <button data-office-pill="Senador" onclick="setAppleOfficeFilter('Senador')" class="px-3 py-1 rounded-full text-xs font-semibold bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white cursor-pointer transition">
            Senador
          </button>
          <button data-office-pill="Deputado Federal" onclick="setAppleOfficeFilter('Deputado Federal')" class="px-3 py-1 rounded-full text-xs font-semibold bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white cursor-pointer transition">
            Deputado Federal
          </button>
        </div>
      </div>

      <!-- Feed Stats Header -->
      <div class="flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400 px-1">
        <span id="feed-stats-count">Carregando catálogo de candidatos...</span>
        <span class="font-mono text-[10px]">Clique no card para abrir o dossiê</span>
      </div>

      <!-- Candidate 3D Bento Grid -->
      <div id="candidates-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"></div>

      <!-- Pagination Bar -->
      <div id="pagination-controls" class="p-3.5 rounded-2xl bg-white/70 dark:bg-[#1c1c1e]/70 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div id="pagination-info" class="text-neutral-600 dark:text-neutral-400 font-medium"></div>
        <div id="pagination-buttons" class="flex items-center gap-1.5"></div>
      </div>
    </div>

    <!-- TAB 2: RANKING AUDITADO -->
    ${tabRankHtml}

    <!-- TAB 3: COMPARADOR 1v1 -->
    ${tabCompHtml}

    <!-- TAB 4: MATCH ELEITORAL -->
    ${tabMatchHtml}

    <!-- TAB 5: MANDATÁRIOS EM EXERCÍCIO -->
    ${tabIncumbentsHtml}

  </main>

  <!-- ================= MOBILE NAVIGATION BAR ================= -->
  <nav class="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/80 dark:bg-black/80 border-t border-black/5 dark:border-white/10 backdrop-blur-2xl flex items-center justify-around py-1 px-2 shadow-2xl safe-area-bottom">
    <button onclick="switchAppleTab('feed')" id="mobile-nav-feed" class="flex flex-col items-center justify-center flex-1 py-1 text-[10px] font-bold text-blue-600 dark:text-blue-400 min-h-[44px] transition cursor-pointer">
      <i data-lucide="layout-grid" class="w-5 h-5 mb-0.5"></i>
      <span>Feed</span>
    </button>
    <button onclick="switchAppleTab('ranking')" id="mobile-nav-ranking" class="flex flex-col items-center justify-center flex-1 py-1 text-[10px] font-medium text-neutral-500 dark:text-neutral-400 min-h-[44px] transition cursor-pointer">
      <i data-lucide="trophy" class="w-5 h-5 mb-0.5 text-amber-500"></i>
      <span>Ranking</span>
    </button>
    <button onclick="switchAppleTab('comparator')" id="mobile-nav-comparator" class="flex flex-col items-center justify-center flex-1 py-1 text-[10px] font-medium text-neutral-500 dark:text-neutral-400 min-h-[44px] transition cursor-pointer">
      <i data-lucide="scale" class="w-5 h-5 mb-0.5 text-purple-500"></i>
      <span>Comparar</span>
    </button>
    <button onclick="switchAppleTab('match')" id="mobile-nav-match" class="flex flex-col items-center justify-center flex-1 py-1 text-[10px] font-medium text-neutral-500 dark:text-neutral-400 min-h-[44px] transition cursor-pointer">
      <i data-lucide="sparkles" class="w-5 h-5 mb-0.5 text-amber-500"></i>
      <span>Match</span>
    </button>
    <button onclick="switchAppleTab('incumbents')" id="mobile-nav-incumbents" class="flex flex-col items-center justify-center flex-1 py-1 text-[10px] font-medium text-neutral-500 dark:text-neutral-400 min-h-[44px] transition cursor-pointer">
      <i data-lucide="landmark" class="w-5 h-5 mb-0.5 text-emerald-500"></i>
      <span>Mandatos</span>
    </button>
  </nav>

  <!-- ================= FOOTER ================= -->
  <footer class="mt-auto border-t border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] py-6 px-4 text-xs text-neutral-500 dark:text-neutral-400">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
      <div class="space-y-1">
        <p class="font-bold text-neutral-800 dark:text-neutral-200">Figuras Políticas • Veja quem te representa.</p>
        <p class="text-[11px]">Plataforma independente de transparência cívica e auditoria eleitoral. Dados públicos via LAI nº 12.527/2011.</p>
      </div>
      <div class="flex items-center gap-3 text-[11px] font-medium flex-wrap justify-center">
        <button onclick="openModal('terms-modal')" class="hover:text-black dark:hover:text-white transition cursor-pointer">Termos de Uso</button>
        <span>•</span>
        <button onclick="openModal('legal-sources-modal')" class="hover:text-black dark:hover:text-white transition cursor-pointer">Fontes Oficiais</button>
        <span>•</span>
        <button onclick="openModal('contraditory-modal')" class="hover:text-black dark:hover:text-white transition cursor-pointer">Direito de Resposta</button>
        <span>•</span>
        <a href="index.html" class="text-blue-600 dark:text-blue-400 hover:underline font-semibold cursor-pointer">Acessar V1 Clássico</a>
      </div>
    </div>
  </footer>

  <!-- ================= ALL 11 MODALS (INHERITED & FUNCTIONAL) ================= -->
  <div id="dossie-modal" class="hidden"></div>
  ${modalsPart1}
  ${modalsPart2}

  <!-- ================= CORE SCRIPTS ================= -->
  <script src="data/candidates.js"></script>
  <script src="js/state.js"></script>
  <script src="js/stickers.js"></script>
  <script src="js/ranking.js"></script>
  <script src="js/dossie.js"></script>
  <script src="js/comparator.js"></script>
  <script src="js/quiz.js"></script>
  <script src="js/app.js"></script>
  <script src="js/apple_v2.js"></script>

</body>
</html>
`;

fs.writeFileSync('index_v2.html', appleV2Html, 'utf8');
console.log('[Builder V2 Production] index_v2.html rebuilt successfully with ultra-compact layout!');
console.log('[Builder V2 Production] File size:', fs.statSync('index_v2.html').size, 'bytes');
