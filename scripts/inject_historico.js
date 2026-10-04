const fs = require('fs');

const injectionBlock = `
        <!-- MONITOR DE PROMESSAS (MOVIDO PARA HISTÓRICO ÉTICO) -->
        <div class="glass-panel p-5 rounded-2xl mt-6 border border-emerald-200/50 bg-emerald-50/10 mb-6">
          <h3 class="text-lg font-black text-slate-900 dark:text-white mb-2 flex items-center gap-2"><i data-lucide="check-circle" class="w-5 h-5 text-emerald-500"></i> Monitor de Promessas Pós-Eleição</h3>
          <p class="text-xs text-slate-500 mb-4">Acompanhe as promessas de campanha registradas e o status de execução durante os 4 anos de mandato.</p>
          <div id="promessas-container" class="space-y-3"></div>
        </div>
`;

let dossie = fs.readFileSync('c:/Users/victo/OneDrive/Documents/Politico/dossie.html', 'utf8');

// Ensure we don't inject multiple times
if (!dossie.includes('MONITOR DE PROMESSAS')) {
    dossie = dossie.replace(
        /<div id="tab-sec-historico-etico" class="tab-section hidden space-y-6">/,
        '<div id="tab-sec-historico-etico" class="tab-section hidden space-y-6">\n' + injectionBlock
    );
    fs.writeFileSync('c:/Users/victo/OneDrive/Documents/Politico/dossie.html', dossie, 'utf8');
    console.log('Successfully injected into tab-sec-historico-etico');
} else {
    console.log('Already injected.');
}
