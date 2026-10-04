const fs = require('fs');
let pIndex = 'c:/Users/victo/OneDrive/Documents/Politico/index.html';

if (fs.existsSync(pIndex)) {
  let c = fs.readFileSync(pIndex, 'utf8');
  
  // Replace the entire span with the title text
  c = c.replace(
    /<span class="text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider block">BÚSSOLA ESPACIAL 3D • EQUILÍBRIO DA REPÚBLICA<\/span>\s*/,
    ''
  );
  
  fs.writeFileSync(pIndex, c, 'utf8');
  console.log('Removed text BÚSSOLA ESPACIAL 3D');
}
