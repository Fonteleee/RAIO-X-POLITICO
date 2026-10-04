const fs = require('fs');
let dossie = fs.readFileSync('c:/Users/victo/OneDrive/Documents/Politico/dossie.html', 'utf8');

// 1. Remove the tab button
dossie = dossie.replace(/<button onclick="switchTab\('promessas'\)" id="tab-btn-promessas"[\s\S]*?<\/button>\n\s*/, '');

// 2. Remove the promessas tab div
const promessasTabRegex = /<div id="dossie-tab-promessas" class="hidden space-y-4">\s*<div class="glass-panel p-5 rounded-2xl">\s*<h3 class="text-lg font-black text-slate-900 dark:text-white mb-2 flex items-center gap-2"><i data-lucide="check-circle" class="w-5 h-5 text-emerald-500"><\/i> Monitor de Promessas Pós-Eleição<\/h3>\s*<p class="text-xs text-slate-500 mb-4">Acompanhe as promessas de campanha registradas e o status de execução durante os 4 anos de mandato\.<\/p>\s*<div id="promessas-container" class="space-y-3"><\/div>\s*<\/div>\s*<\/div>/;

dossie = dossie.replace(promessasTabRegex, '');

// 3. Inject it inside dossie-tab-historico
const injectionBlock = `
        <!-- MONITOR DE PROMESSAS (MOVIDO PARA HISTÓRICO ÉTICO) -->
        <div class="glass-panel p-5 rounded-2xl mt-6">
          <h3 class="text-lg font-black text-slate-900 dark:text-white mb-2 flex items-center gap-2"><i data-lucide="check-circle" class="w-5 h-5 text-emerald-500"></i> Monitor de Promessas Pós-Eleição</h3>
          <p class="text-xs text-slate-500 mb-4">Acompanhe as promessas de campanha registradas e o status de execução durante os 4 anos de mandato.</p>
          <div id="promessas-container" class="space-y-3"></div>
        </div>
`;

// Find where to inject it. We can prepend it inside dossie-tab-historico.
dossie = dossie.replace(/<div id="dossie-tab-historico" class="hidden space-y-4">/, '<div id="dossie-tab-historico" class="hidden space-y-4">\n' + injectionBlock);

fs.writeFileSync('c:/Users/victo/OneDrive/Documents/Politico/dossie.html', dossie, 'utf8');
console.log('dossie.html updated to move Promessas into Historico Etico');

// Also fix js/dossie.js so it actually renders when we click on a candidate!
let appJs = fs.readFileSync('c:/Users/victo/OneDrive/Documents/Politico/js/dossie.js', 'utf8');
// To make sure renderPromessas is called, let's just make it render whenever switchTab is called, or we can just render it unconditionally if candidatesData is available.
// Actually, earlier we hooked into `window.openDossie`. Let's ensure it's working.
// Wait, the data wasn't showing because I used `(typeof candidatesData !== 'undefined' ? candidatesData : [])` which might be empty if the data isn't loaded yet?
// Wait, the screenshot shows Tarcisio Gomes de Freitas. So the data IS loaded.
// The reason the tab is empty is because `promessas-container` was in the new tab, but `renderPromessas` was only being called in `openDossie`.
// When they refresh the page with `?id=cand-tarcisio`, `openDossie` is NOT called. `loadDossieFromUrl` or `initDossie` is called!
// Let's modify js/dossie.js to call renderPromessas in `populateDossie` or `initDossie`.

// Replace the old hook
if (appJs.includes('// Hook into openDossie')) {
  appJs = appJs.replace(/\/\/ Hook into openDossie[\s\S]*?\}\s*\}\s*$/m, '');
}

// Add it to the main populate loop or as a global function that we call explicitly.
appJs += `
  // Automatically render promises on page load for the active candidate
  document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
          const urlParams = new URLSearchParams(window.location.search);
          const candId = urlParams.get('id');
          if(candId) {
             const cands = (typeof window.candidatesData !== 'undefined') ? window.candidatesData : [];
             const cand = cands.find(c => c.id === candId) || (typeof activeDossieCandidate !== 'undefined' ? activeDossieCandidate : null);
             if (cand && typeof renderPromessas === 'function') {
                 renderPromessas(cand);
             }
          }
      }, 500); // delay to ensure data is loaded
  });
`;

fs.writeFileSync('c:/Users/victo/OneDrive/Documents/Politico/js/dossie.js', appJs, 'utf8');
console.log('js/dossie.js updated');

