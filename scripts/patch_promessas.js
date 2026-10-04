const fs = require('fs');

// Patch dossie.html for Promessas
let dossie = fs.readFileSync('dossie.html', 'utf8');
if (!dossie.includes('dossie-tab-promessas')) {
  // 1. Insert Tab Button
  dossie = dossie.replace(
    '<button onclick="switchTab(\'propostas-tse\')" id="tab-btn-propostas-tse"',
    '<button onclick="switchTab(\'promessas\')" id="tab-btn-promessas" role="tab" class="tab-btn px-2.5 py-2 rounded-xl font-medium text-xs flex items-center justify-center gap-1.5 transition cursor-pointer bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"><i data-lucide="check-circle" class="w-4 h-4"></i> Promessas</button>\n            <button onclick="switchTab(\'propostas-tse\')" id="tab-btn-propostas-tse"'
  );
  
  // 2. Insert Tab Content Pane
  dossie = dossie.replace(
    '<div id="dossie-tab-propostas-tse" class="hidden space-y-4">',
    '<div id="dossie-tab-promessas" class="hidden space-y-4">\n        <div class="glass-panel p-5 rounded-2xl">\n          <h3 class="text-lg font-black text-slate-900 dark:text-white mb-2 flex items-center gap-2"><i data-lucide="check-circle" class="w-5 h-5 text-emerald-500"></i> Monitor de Promessas Pós-Eleição</h3>\n          <p class="text-xs text-slate-500 mb-4">Acompanhe as promessas de campanha registradas e o status de execução durante os 4 anos de mandato.</p>\n          <div id="promessas-container" class="space-y-3"></div>\n        </div>\n      </div>\n\n      <div id="dossie-tab-propostas-tse" class="hidden space-y-4">'
  );
  fs.writeFileSync('dossie.html', dossie, 'utf8');
}

// Patch js/dossie.js to render fake promises for now
let js = fs.readFileSync('js/dossie.js', 'utf8');
if (!js.includes('renderPromessas')) {
  js += `
  function renderPromessas(cand) {
    const container = document.getElementById('promessas-container');
    if(!container) return;
    
    // Mock data for promises
    const promessas = [
      { text: "Zeramento da fila de creches", status: "Em Andamento", pct: 45 },
      { text: "Redução do ICMS para combustíveis", status: "Cumprida", pct: 100 },
      { text: "Construção de 3 novos hospitais", status: "Quebrada", pct: 10 }
    ];
    
    let html = '';
    promessas.forEach(p => {
      let color = p.status === 'Cumprida' ? 'emerald' : p.status === 'Quebrada' ? 'red' : 'amber';
      html += \`
        <div class="p-3 border border-slate-200 dark:border-white/10 rounded-xl bg-slate-50 dark:bg-slate-800/50">
          <div class="flex justify-between items-center mb-2">
            <span class="font-bold text-sm text-slate-800 dark:text-slate-200">\${p.text}</span>
            <span class="text-xs font-bold text-\${color}-600 dark:text-\${color}-400 bg-\${color}-100 dark:bg-\${color}-900/30 px-2 py-0.5 rounded-md border border-\${color}-200 dark:border-\${color}-500/30">\${p.status}</span>
          </div>
          <div class="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
            <div class="bg-\${color}-500 h-1.5 rounded-full" style="width: \${p.pct}%"></div>
          </div>
        </div>
      \`;
    });
    container.innerHTML = html;
  }
  
  // Hook into openDossie to render promises
  const oldOpenDossie = window.openDossie;
  if(oldOpenDossie) {
    window.openDossie = function(id) {
      oldOpenDossie(id);
      const cand = (typeof candidatesData !== 'undefined' ? candidatesData : []).find(c => c.id === id);
      if(cand) renderPromessas(cand);
    }
  }
  `;
  fs.writeFileSync('js/dossie.js', js, 'utf8');
}
