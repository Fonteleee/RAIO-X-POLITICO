const fs = require('fs');

['index.html', 'dossie.html', 'match.html'].forEach(f => {
  let p = 'c:/Users/victo/OneDrive/Documents/Politico/' + f;
  if(fs.existsSync(p)) {
    let c = fs.readFileSync(p, 'utf8');
    c = c.replace('<link rel="stylesheet" href="css/tailwind-compiled.css">', '<script src="https://cdn.tailwindcss.com"></script>');
    fs.writeFileSync(p, c, 'utf8');
    console.log(f + ' reverted Tailwind');
  }
});

// Fallback Inteligente no app.js para GitHub Pages (onde a API REST no existe)
let pApp = 'c:/Users/victo/OneDrive/Documents/Politico/js/app.js';
if(fs.existsSync(pApp)) {
  let c = fs.readFileSync(pApp, 'utf8');
  
  // Replace the fetch logic to use window.candidatesData if fetch fails or returns 404
  if (!c.includes('// Fallback Inteligente')) {
    c = c.replace(
      /const res = await fetch\('\/api\/candidates'\);/g,
      `const res = await fetch('/api/candidates').catch(() => ({ ok: false })); // Fallback Inteligente`
    );
    
    // Add logic after the fetch attempt to use window.candidatesData
    c = c.replace(
      /if \(res\.ok\) \{[\s\S]*?const json = await res\.json\(\);/,
      `if (res.ok) {
          const json = await res.json();`
    );
    // Actually it's easier to just append a fallback check right before renderCandidatesFeed()
    // Wait, replacing a specific block is safer.
    c = c.replace(
      /if \(res\.ok\) \{/,
      `if (res.ok) {`
    );
  }
  
  // A much simpler fallback: at the start of syncWithBackend, if on Github Pages, just skip fetch
  if (!c.includes('if (window.location.hostname.includes("github.io"))')) {
     c = c.replace(
       'async function syncWithBackend() {',
       'async function syncWithBackend() {\n      if (window.location.hostname.includes("github.io") || window.location.protocol === "file:") {\n        console.log("GitHub Pages / Local file detectado. Usando dados estáticos.");\n        if (typeof renderCandidatesFeed === "function") renderCandidatesFeed(candidatesData);\n        return;\n      }'
     );
  }
  fs.writeFileSync(pApp, c, 'utf8');
  console.log('app.js fallback injected');
}

// Global Image Fallback
let pRanking = 'c:/Users/victo/OneDrive/Documents/Politico/js/ranking.js';
if(fs.existsSync(pRanking)) {
  let c = fs.readFileSync(pRanking, 'utf8');
  // ensure images have onerror
  c = c.replace(/<img([^>]*)src="\$\{cand\.imageUrl\}"([^>]*)>/g, '<img$1src="${cand.imageUrl}" onerror="this.src=\'https://via.placeholder.com/150?text=Sem+Foto\'"$2>');
  fs.writeFileSync(pRanking, c, 'utf8');
  console.log('ranking.js image fallback injected');
}

