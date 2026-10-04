const fs = require('fs');
for (const f of ['index.html', 'dossie.html']) {
  let s = fs.readFileSync(f, 'utf8');
  if (!s.includes('.z-60{')) {
    s = s.replace('</head>', '  <style>.z-60{z-index:60 !important}.z-70{z-index:70}</style>\n</head>');
  }
  if (f === 'index.html') {
    // remove label text
    s = s.replace(/\s*<span class="text-xs font-mono font-bold text-purple-700[^>]*>BALAN[^<]*<\/span>/, '');
    s = s.replace(/\s*<h3 class="text-sm sm:text-base font-bold text-neutral-900 dark:text-white tracking-tight">Equil[^<]*<\/h3>/, '');
    // 3D icon, 15% bigger (40px -> 46px, icon 20 -> 23)
    s = s.replace(
      /<div class="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 text-white flex items-center justify-center shadow-md shadow-purple-500\/20">\s*<i data-lucide="scale" class="w-5 h-5"><\/i>/,
      '<div class="flex items-center justify-center text-white" style="width:46px;height:46px;border-radius:16px;background:linear-gradient(145deg,#a78bfa 0%,#7c3aed 55%,#5b21b6 100%);box-shadow:0 8px 16px -4px rgba(91,33,182,.55),0 2px 0 rgba(255,255,255,.45) inset,0 -3px 6px rgba(0,0,0,.25) inset;transform:perspective(200px) rotateX(8deg);">\n                <i data-lucide="scale" style="width:23px;height:23px;filter:drop-shadow(0 2px 2px rgba(0,0,0,.45));" stroke-width="2.25"></i>'
    );
  }
  fs.writeFileSync(f, s);
  console.log(f, 'ok');
}
