const fs = require('fs');

console.log('[Builder Dossie V2] Generating dossie_v2.html with Apple Design System & 3D Spatial Experience...');

let content = fs.readFileSync('dossie.html', 'utf8');

// 1. Navigation links isolated to index_v2.html and dossie_v2.html
content = content.replace(/href="index\.html"/g, 'href="index_v2.html"');
content = content.replace(/'index\.html'/g, "'index_v2.html'");
content = content.replace(/`index\.html\?figurinha=/g, '`index_v2.html?figurinha=');
content = content.replace(/`dossie\.html\?/g, '`dossie_v2.html?');
content = content.replace(/'dossie\.html'/g, "'dossie_v2.html'");
content = content.replace(/"dossie\.html"/g, '"dossie_v2.html"');

// 2. Page Title & Apple Theme Meta
content = content.replace(
  /<title id="page-title">.*?<\/title>/,
  '<title id="page-title">Dossiê do Candidato • Figuras Políticas V2 (Apple Edition)</title>'
);

const appleHeadMeta = `
  <!-- Apple Meta & Theme -->
  <meta name="theme-color" content="#f5f5f7" media="(prefers-color-scheme: light)">
  <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
`;
content = content.replace('<meta name="referrer" content="no-referrer">', '<meta name="referrer" content="no-referrer">' + appleHeadMeta);

// 3. Apple Tailwind Config
const v1TailwindConfigRegex = /<script>\s*tailwind\.config\s*=\s*\{[\s\S]*?\}\s*<\/script>/;
const appleTailwindConfig = `<script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"SF Pro Text"', '"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
            display: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"Plus Jakarta Sans"', 'sans-serif'],
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
  </script>`;
content = content.replace(v1TailwindConfigRegex, appleTailwindConfig);

// 4. Apple CSS Variables & Styles
const appleRootStyles = `
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
      background-color: #000000 !important;
      color: #f5f5f7 !important;
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

    /* Tabular numbers for civic precision */
    .font-mono, td, .tabular-nums {
      font-feature-settings: 'tnum';
      font-variant-numeric: tabular-nums;
    }
  </style>
`;
content = content.replace('</head>', appleRootStyles + '\n</head>');

// 5. Body tag
content = content.replace(
  /<body class="[^"]*">/,
  '<body class="bg-[#f5f5f7] dark:bg-black text-neutral-900 dark:text-neutral-100 font-sans min-h-screen flex flex-col transition-colors duration-300 antialiased selection:bg-blue-500 selection:text-white">'
);

// 6. Header
const oldHeaderRegex = /<header class="sticky top-0 z-40 bg-white\/90 dark:bg-slate-900\/90[\s\S]*?<\/header>/;
const appleHeader = `<header class="sticky top-0 z-40 apple-glass-nav transition-all duration-300 px-4 sm:px-8 py-2.5">
    <div class="max-w-7xl mx-auto flex items-center justify-between gap-3">
      
      <!-- Voltar ao Início & Brand -->
      <div class="flex items-center gap-3">
        <a href="index_v2.html" class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 text-neutral-800 dark:text-neutral-200 font-semibold text-xs border border-black/5 dark:border-white/10 transition shadow-xs cursor-pointer">
          <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i>
          <span>Voltar ao Raio-X</span>
        </a>
        <div class="h-4 w-px bg-black/10 dark:bg-white/15 hidden sm:block"></div>
        <div class="flex items-center gap-2">
          <span class="text-xs font-bold tracking-tight text-neutral-900 dark:text-white">Figuras Políticas • <span class="text-blue-600 dark:text-blue-400 font-bold">Dossiê Oficial 2026</span></span>
          <span class="hidden xl:inline-flex items-center gap-1 text-[10.5px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
            <i data-lucide="shield-check" class="w-3.5 h-3.5"></i> Dados Oficiais Auditados
          </span>
        </div>

        <!-- Seletor Rápido de Candidato -->
        <div class="hidden sm:flex items-center ml-1">
          <select id="quick-cand-select" onchange="switchCandidateDossie(this.value)" class="bg-black/5 dark:bg-white/10 text-neutral-800 dark:text-neutral-200 border border-black/5 dark:border-white/10 rounded-full px-3 py-1 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/30 cursor-pointer max-w-[200px] sm:max-w-[240px] truncate">
            <option value="">Alternar candidato...</option>
          </select>
        </div>
      </div>

      <!-- Ações: Figurinha IA, Compartilhar WhatsApp, Imprimir & Tema -->
      <div class="flex items-center gap-2">
        <button onclick="exportCardWithTheme('ai_audit')" class="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-95 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-indigo-500/20 transition cursor-pointer" title="Gerar Figurinha da Análise IA">
          <i data-lucide="sparkles" class="w-3.5 h-3.5"></i>
          <span class="hidden sm:inline">Figurinha IA</span>
        </button>

        <button onclick="shareOnWhatsApp()" class="px-3.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition cursor-pointer" title="Compartilhar no WhatsApp">
          <i data-lucide="share-2" class="w-3.5 h-3.5"></i>
          <span class="hidden sm:inline">WhatsApp</span>
        </button>

        <button onclick="window.print()" class="p-1.5 sm:px-3 sm:py-1.5 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 text-neutral-700 dark:text-neutral-300 font-semibold text-xs border border-black/5 dark:border-white/10 transition flex items-center gap-1.5 cursor-pointer" title="Imprimir / Salvar PDF">
          <i data-lucide="printer" class="w-3.5 h-3.5"></i>
          <span class="hidden sm:inline">Imprimir</span>
        </button>

        <button onclick="toggleTheme()" class="p-1.5 rounded-full bg-black/5 dark:bg-white/10 text-neutral-700 dark:text-neutral-200 hover:bg-black/10 dark:hover:bg-white/15 transition cursor-pointer" title="Alternar Modo Escuro / Claro">
          <i id="theme-icon" data-lucide="moon" class="w-4 h-4"></i>
        </button>
      </div>

    </div>
  </header>`;
content = content.replace(oldHeaderRegex, appleHeader);

// 7. Tabs Navigation Bar (Segmented Capsule Material)
content = content.replace(
  '<nav class="p-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-xs space-y-2">',
  '<nav class="p-1.5 rounded-2xl bg-black/[0.04] dark:bg-white/[0.06] backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-xs space-y-1">'
);

// Tab button classes in switchTab
content = content.replace(
  "const inactiveClass = 'tab-btn px-3.5 py-2 rounded-xl font-medium text-xs flex items-center gap-1.5 transition cursor-pointer bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700';",
  "const inactiveClass = 'tab-btn px-2.5 py-2 rounded-xl font-medium text-xs flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5';"
);
content = content.replace(
  "const activeClass = 'tab-btn active px-3.5 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition cursor-pointer bg-sky-600 text-white shadow-xs';",
  "const activeClass = 'tab-btn active px-2.5 py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer bg-blue-600 text-white shadow-md shadow-blue-500/25';"
);

// Tab buttons in initial HTML
content = content.replace(
  'class="tab-btn active px-2.5 py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer bg-sky-600 text-white shadow-xs"',
  'class="tab-btn active px-2.5 py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer bg-blue-600 text-white shadow-md shadow-blue-500/25"'
);
content = content.replace(
  /class="tab-btn px-2\.5 py-2 rounded-xl font-medium text-xs flex items-center justify-center gap-1\.5 transition cursor-pointer bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"/g,
  'class="tab-btn px-2.5 py-2 rounded-xl font-medium text-xs flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"'
);

// 8. Visual Material Replacements (Slate -> Apple Canvas, Liquid Glass, Bento)
// Cards:
content = content.replace(/rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white\/10 shadow-sm/g, 'rounded-3xl bg-white/75 dark:bg-[#1c1c1e]/75 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-lg');
content = content.replace(/rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white\/10 shadow-xs/g, 'rounded-3xl bg-white/75 dark:bg-[#1c1c1e]/75 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-lg');
content = content.replace(/rounded-3xl bg-white dark:bg-slate-900 border-2 border-indigo-300 dark:border-indigo-500\/40 shadow-xl/g, 'rounded-3xl bg-white/75 dark:bg-[#1c1c1e]/75 backdrop-blur-xl border-2 border-indigo-500/30 dark:border-indigo-500/40 shadow-xl');
content = content.replace(/rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white\/10 shadow-xs/g, 'rounded-2xl bg-white/75 dark:bg-[#1c1c1e]/75 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-md');
content = content.replace(/rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white\/10/g, 'rounded-2xl bg-white/75 dark:bg-[#1c1c1e]/75 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-md');
content = content.replace(/rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white\/10/g, 'rounded-xl bg-white/75 dark:bg-[#1c1c1e]/75 backdrop-blur-xl border border-black/5 dark:border-white/10');
content = content.replace(/bg-white dark:bg-slate-900/g, 'bg-white/75 dark:bg-[#1c1c1e]/75 backdrop-blur-xl');

// Inner subcards & bento boxes:
content = content.replace(/bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white\/5/g, 'bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/5');
content = content.replace(/bg-slate-50 dark:bg-slate-800\/80 border border-slate-200 dark:border-white\/5/g, 'bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/5');
content = content.replace(/bg-slate-50 dark:bg-slate-800\/60 border border-slate-200 dark:border-white\/5/g, 'bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/5');
content = content.replace(/bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-white\/5/g, 'bg-black/[0.02] dark:bg-white/[0.03] rounded-xl border border-black/5 dark:border-white/5');
content = content.replace(/bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white\/5/g, 'bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/5');
content = content.replace(/bg-slate-100\/90 dark:bg-slate-800\/90 rounded-xl border border-slate-200\/80 dark:border-white\/10/g, 'bg-black/[0.02] dark:bg-white/[0.03] rounded-xl border border-black/5 dark:border-white/5');
content = content.replace(/bg-slate-100 dark:bg-slate-800\/80 rounded-xl border border-slate-200 dark:border-white\/10/g, 'bg-black/[0.02] dark:bg-white/[0.03] rounded-xl border border-black/5 dark:border-white/5');
content = content.replace(/bg-slate-100 dark:bg-slate-800/g, 'bg-black/5 dark:bg-white/10');
content = content.replace(/bg-slate-50 dark:bg-slate-950/g, 'bg-black/[0.02] dark:bg-white/[0.03]');
content = content.replace(/bg-slate-50 dark:bg-slate-900/g, 'bg-black/[0.02] dark:bg-white/[0.03]');
content = content.replace(/bg-slate-50 dark:bg-slate-800/g, 'bg-black/[0.02] dark:bg-white/[0.03]');

// Borders:
content = content.replace(/border-slate-200 dark:border-white\/10/g, 'border-black/5 dark:border-white/10');
content = content.replace(/border-slate-200 dark:border-white\/5/g, 'border-black/5 dark:border-white/5');
content = content.replace(/border-slate-200\/80 dark:border-white\/10/g, 'border-black/5 dark:border-white/10');
content = content.replace(/border-slate-200\/60 dark:border-white\/5/g, 'border-black/5 dark:border-white/5');
content = content.replace(/border-slate-100 dark:border-white\/5/g, 'border-black/5 dark:border-white/5');

// Typography Colors:
content = content.replace(/text-slate-900 dark:text-white/g, 'text-neutral-900 dark:text-white');
content = content.replace(/text-slate-800 dark:text-slate-200/g, 'text-neutral-800 dark:text-neutral-200');
content = content.replace(/text-slate-700 dark:text-slate-300/g, 'text-neutral-700 dark:text-neutral-300');
content = content.replace(/text-slate-600 dark:text-slate-400/g, 'text-neutral-600 dark:text-neutral-400');
content = content.replace(/text-slate-500 dark:text-slate-400/g, 'text-neutral-500 dark:text-neutral-400');
content = content.replace(/text-slate-400 dark:text-slate-500/g, 'text-neutral-400 dark:text-neutral-500');

// Sky/Cyan -> Apple Blue:
content = content.replace(/text-sky-600 dark:text-cyan-400/g, 'text-blue-600 dark:text-blue-400');
content = content.replace(/text-sky-700 dark:text-cyan-400/g, 'text-blue-600 dark:text-blue-400');
content = content.replace(/text-sky-800 dark:text-cyan-300/g, 'text-blue-700 dark:text-blue-300');
content = content.replace(/text-sky-900 dark:text-cyan-200/g, 'text-blue-800 dark:text-blue-200');
content = content.replace(/bg-sky-600 hover:bg-sky-500/g, 'bg-blue-600 hover:bg-blue-500');
content = content.replace(/bg-sky-700 hover:bg-sky-600/g, 'bg-blue-600 hover:bg-blue-500');
content = content.replace(/bg-sky-600/g, 'bg-blue-600');
content = content.replace(/bg-sky-700/g, 'bg-blue-600');
content = content.replace(/border-sky-500 dark:border-cyan-500\/50/g, 'border-blue-500/40 dark:border-blue-400/30');
content = content.replace(/border-sky-500/g, 'border-blue-500');
content = content.replace(/bg-sky-100 dark:bg-cyan-500\/20 text-sky-800 dark:text-cyan-300 border border-sky-300 dark:border-cyan-500\/30/g, 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20');
content = content.replace(/bg-sky-50 dark:bg-cyan-500\/10 border border-sky-200 dark:border-cyan-500\/20/g, 'bg-blue-500/10 border border-blue-500/20');

// Emerald, Amber, Rose Tints:
content = content.replace(/bg-emerald-50 dark:bg-emerald-500\/10 border border-emerald-200 dark:border-emerald-500\/20/g, 'bg-emerald-500/10 border border-emerald-500/20');
content = content.replace(/bg-amber-50 dark:bg-amber-500\/10 border border-amber-200 dark:border-amber-500\/20/g, 'bg-amber-500/10 border border-amber-500/20');
content = content.replace(/bg-rose-50 dark:bg-rose-500\/10 border border-rose-200 dark:border-rose-500\/20/g, 'bg-rose-500/10 border border-rose-500/20');

// Chart.js Palette in Radar & CEAP Charts (Apple System Blue):
content = content.replace(
  "backgroundColor: isDarkMode ? 'rgba(14, 165, 233, 0.25)' : 'rgba(2, 132, 199, 0.15)',",
  "backgroundColor: isDarkMode ? 'rgba(41, 151, 255, 0.25)' : 'rgba(0, 113, 227, 0.15)',"
);
content = content.replace(
  "borderColor: '#0284c7',",
  "borderColor: isDarkMode ? '#2997ff' : '#0071e3',"
);
content = content.replace(
  "pointBackgroundColor: '#0284c7',",
  "pointBackgroundColor: isDarkMode ? '#2997ff' : '#0071e3',"
);
// For CEAP chart:
content = content.replace(
  "borderColor: '#0284c7',",
  "borderColor: isDarkMode ? '#2997ff' : '#0071e3',"
);
content = content.replace(
  "backgroundColor: 'rgba(2, 132, 199, 0.1)',",
  "backgroundColor: isDarkMode ? 'rgba(41, 151, 255, 0.15)' : 'rgba(0, 113, 227, 0.08)',"
);
content = content.replace(
  "pointBackgroundColor: '#0284c7'",
  "pointBackgroundColor: isDarkMode ? '#2997ff' : '#0071e3'"
);
content = content.replace(/background=0284c7/g, 'background=0071e3');

// 9. Write out dossie_v2.html
fs.writeFileSync('dossie_v2.html', content, 'utf8');

console.log('[Builder Dossie V2] dossie_v2.html updated with Apple Design System!');
console.log('[Builder Dossie V2] Size:', fs.statSync('dossie_v2.html').size, 'bytes');

