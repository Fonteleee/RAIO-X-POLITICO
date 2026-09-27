const fs = require('fs');

const v2 = fs.readFileSync('index_v2.html', 'utf8');

console.log('1. Contains "Veja quem te representa.":', v2.includes('Veja quem te representa.'));
console.log('2. Removed "Versão 2 • Apple Design System & 3D Spatial Experience":', !v2.includes('Versão 2 • Apple Design System & 3D Spatial Experience'));
console.log('3. Removed "Apple Civic Edition • 2026":', !v2.includes('Apple Civic Edition • 2026'));

const appleJs = fs.readFileSync('js/apple_v2.js', 'utf8');
console.log('4. js/apple_v2.js routes to dossie_v2.html:', appleJs.includes('dossie_v2.html') && !appleJs.includes('dossie.html'));

const dossieJs = fs.readFileSync('js/dossie.js', 'utf8');
console.log('5. js/dossie.js supports dossie_v2.html for V2:', dossieJs.includes('dossie_v2.html'));

const dossieV2 = fs.readFileSync('dossie_v2.html', 'utf8');
console.log('6. dossie_v2.html returns to index_v2.html:', dossieV2.includes('index_v2.html') && !dossieV2.includes('href="index.html"'));
console.log('7. dossie_v2.html contains "Veja quem te representa.":', dossieV2.includes('Veja quem te representa.'));
