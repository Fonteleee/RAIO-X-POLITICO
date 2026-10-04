const fs = require('fs');

let html = fs.readFileSync('c:/Users/victo/OneDrive/Documents/Politico/dossie.html', 'utf8');

// Add candidates.js if missing
if (!html.includes('<script src="data/candidates.js" defer></script>')) {
    html = html.replace(
        '<script src="data/judiciary_authorities.js" defer></script>',
        '<script src="data/candidates.js" defer></script>\n  <script src="data/judiciary_authorities.js" defer></script>'
    );
}

// Remove or comment out the fetch block
const fetchRegex = /\/\/ Tenta buscar da API REST.*?catch \(e\) \{[^\}]+\}/s;
html = html.replace(fetchRegex, '/* Fetch bloqueado para performance (GitHub Pages static) */');

fs.writeFileSync('c:/Users/victo/OneDrive/Documents/Politico/dossie.html', html, 'utf8');
console.log('Fixed dossie.html missing candidates and fetch latency');
