const fs = require('fs');
['index.html', 'dossie.html', 'match.html'].forEach(f => {
  let p = 'c:/Users/victo/OneDrive/Documents/Politico/' + f;
  if(fs.existsSync(p)) {
    let c = fs.readFileSync(p, 'utf8');
    if(!c.includes('data/candidates.js')) {
      c = c.replace('<script src="js/state.js" defer></script>', '<script src="data/candidates.js" defer></script>\n  <script src="js/state.js" defer></script>');
      fs.writeFileSync(p, c, 'utf8');
      console.log(f + ' fixed');
    }
  }
});
