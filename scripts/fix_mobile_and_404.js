const fs = require('fs');

// 1. Fix apple_v2.js navigation
let pApple = 'c:/Users/victo/OneDrive/Documents/Politico/js/apple_v2.js';
if (fs.existsSync(pApple)) {
  let c = fs.readFileSync(pApple, 'utf8');
  c = c.replace(/dossie_v2\.html/g, 'dossie.html');
  fs.writeFileSync(pApple, c, 'utf8');
  console.log('apple_v2.js fixed 404');
}

// 2. Fix index.html mobile layout
let pIndex = 'c:/Users/victo/OneDrive/Documents/Politico/index.html';
if (fs.existsSync(pIndex)) {
  let c = fs.readFileSync(pIndex, 'utf8');
  
  // Fix pills wrapper
  c = c.replace(
    /<!-- Office Pills -->\s*<div class="flex flex-wrap items-center gap-1">/,
    '<!-- Office Pills -->\n        <div class="flex items-center gap-2 overflow-x-auto no-scrollbar whitespace-nowrap pb-1 w-full max-w-[100vw] px-1">'
  );
  
  // Fix Bússola Espacial 3D wrapper
  c = c.replace(
    /<div class="flex items-center gap-1\.5">\s*<button onclick="setAppleOfficeFilter\('todos'\)"/,
    '<div class="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto no-scrollbar pb-1">\n            <button onclick="setAppleOfficeFilter(\'todos\')"'
  );
  
  fs.writeFileSync(pIndex, c, 'utf8');
  console.log('index.html mobile layout fixed');
}
