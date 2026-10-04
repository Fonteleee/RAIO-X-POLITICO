const fs = require('fs');

function replaceInFile(filePath, search, replacement) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes(search)) {
    content = content.replace(search, replacement);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  } else {
    console.log(`Search string not found in ${filePath}`);
  }
}

// 1. Fix app.js candidatesData wipe
replaceInFile(
  'c:/Users/victo/OneDrive/Documents/Politico/js/app.js',
  'window.candidatesData = [];',
  'window.candidatesData = window.candidatesData || [];'
);

// 2. Fix dossie.html Tabs layout
let dossieHtml = fs.readFileSync('c:/Users/victo/OneDrive/Documents/Politico/dossie.html', 'utf8');
// Fix the two tab rows
dossieHtml = dossieHtml.replace(
  '<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1.5">',
  '<div class="flex overflow-x-auto whitespace-nowrap no-scrollbar gap-1.5 snap-x">'
);
dossieHtml = dossieHtml.replace(
  '<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1.5">',
  '<div class="flex overflow-x-auto whitespace-nowrap no-scrollbar gap-1.5 snap-x">'
);
// We also might want to remove the <nav ... space-y-1.5> if we want them all in one row, 
// but keeping them in two horizontal scrolling rows is also fine and less invasive.

// 3. Fix dossie.html button
dossieHtml = dossieHtml.replace(
  'bg-slate-100 dark:bg-slate-800 hover:opacity-95 text-white font-extrabold',
  'bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold'
);
fs.writeFileSync('c:/Users/victo/OneDrive/Documents/Politico/dossie.html', dossieHtml, 'utf8');
console.log('Updated dossie.html');

// 4. Fix index.html Instagram button
let indexHtml = fs.readFileSync('c:/Users/victo/OneDrive/Documents/Politico/index.html', 'utf8');
indexHtml = indexHtml.replace(
  'id="btn-share-insta" class="w-full py-2.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:opacity-95 text-white font-bold',
  'id="btn-share-insta" class="w-full py-2.5 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:opacity-95 text-white font-bold'
);
fs.writeFileSync('c:/Users/victo/OneDrive/Documents/Politico/index.html', indexHtml, 'utf8');
console.log('Updated index.html');

// 5. Fix js/stickers.js shareToInstagram
let stickersJs = fs.readFileSync('c:/Users/victo/OneDrive/Documents/Politico/js/stickers.js', 'utf8');
const oldShare = `    function shareToInstagram() {
      alert("Para postar no Instagram:\\n1. Baixe o card em Full HD\\n2. Abra o Instagram e selecione 'Adicionar ao Story' ou 'Nova Publicao'\\n3. O link do dossi j foi copiado para sua rea de transferncia para usar na figurinha de Link!");
      copyToClipboardShare();
    }`;
const newShare = `    async function shareToInstagram() {
      try {
        const target = document.getElementById('sticker-target');
        if (!target) return;
        const btn = document.getElementById('btn-share-insta');
        if (btn) btn.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin text-white"></i> Gerando...';
        
        const canvas = await html2canvas(target, { scale: 3, useCORS: true, backgroundColor: null });
        canvas.toBlob(async (blob) => {
          if (!blob) {
            if (btn) btn.innerHTML = '<i data-lucide="camera" class="w-4 h-4 text-white"></i> 📸 Postar no Instagram (Stories / Feed)';
            return;
          }
          const file = new File([blob], 'raiox_politico_figurinha.png', { type: 'image/png' });
          
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
              files: [file],
              title: 'Raio-X Político',
              text: 'Confira a análise deste político no Raio-X Político!'
            });
          } else {
            alert("Seu dispositivo não suporta envio direto. A figurinha será baixada para você postar manualmente no Instagram.");
            downloadSticker();
          }
          if (btn) btn.innerHTML = '<i data-lucide="camera" class="w-4 h-4 text-white"></i> 📸 Postar no Instagram (Stories / Feed)';
          if (window.lucide) lucide.createIcons();
        }, 'image/png');
      } catch (err) {
        console.error(err);
        alert("Erro ao processar imagem para o Instagram.");
      }
    }`;
if (stickersJs.includes('function shareToInstagram() {')) {
    // Regex replace to handle different indentations and newlines
    stickersJs = stickersJs.replace(/function shareToInstagram\(\) \{[\s\S]*?copyToClipboardShare\(\);\s*\}/, newShare);
    fs.writeFileSync('c:/Users/victo/OneDrive/Documents/Politico/js/stickers.js', stickersJs, 'utf8');
    console.log('Updated stickers.js');
} else {
    console.log('shareToInstagram not found');
}
