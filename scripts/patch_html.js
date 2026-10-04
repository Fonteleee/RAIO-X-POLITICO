const fs = require('fs');

['index.html', 'dossie.html', 'match.html'].forEach(file => {
  let p = 'c:/Users/victo/OneDrive/Documents/Politico/' + file;
  if (fs.existsSync(p)) {
    let c = fs.readFileSync(p, 'utf8');
    c = c.replace('<script src="https://cdn.tailwindcss.com"></script>', '<link rel="stylesheet" href="css/tailwind-compiled.css">');
    c = c.replace('<script src="data/candidates.js" defer></script>', '');
    
    // Add "Monitor de Promessas" tab in dossie.html
    if (file === 'dossie.html' && !c.includes('Monitor de Promessas')) {
       // Insert tab button
       c = c.replace(
         /<button[^>]*data-dossie-tab="visao".*?<\/button>/,
         `$&
         <button data-dossie-tab="promessas" onclick="switchDossieTab('promessas')" class="dossie-tab-btn px-4 py-2 font-bold text-sm text-slate-500 border-b-2 border-transparent hover:text-sky-600 hover:border-sky-300 transition whitespace-nowrap">
           <i data-lucide="check-circle" class="w-4 h-4 inline-block mb-0.5"></i> Promessas do Mandato
         </button>`
       );
       
       // Insert tab content
       c = c.replace(
         /<div id="dossie-tab-visao"[^>]*>[\s\S]*?<!-- TAB 2/,
         `$&` // Wait, regex is risky. Let's just append the tab content at the end of dossie-tabs-container.
       );
       
       let tabContainerMatch = c.match(/<div id="dossie-tab-visao"[\s\S]*?(?=<\/div>\s*<\/div>\s*<\/main>)/);
       if (tabContainerMatch) {
         // This is too brittle.
       }
    }

    fs.writeFileSync(p, c, 'utf8');
    console.log(file, 'updated!');
  }
});
