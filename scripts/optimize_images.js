// Reduz fotos de candidatos/judiciário para no máx. 640px de largura (JPEG q82, progressivo).
// Idempotente: só reescreve se o resultado ficar menor. Uso: node scripts/optimize_images.js
const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');

const DIRS = ['img/candidates', 'img/judiciary'].map(d => path.join(__dirname, '..', d));
const MAX_W = 640;

(async () => {
  let before = 0, after = 0, changed = 0;
  for (const dir of DIRS) {
    for (const f of fs.readdirSync(dir).filter(f => /\.jpe?g$/i.test(f))) {
      const p = path.join(dir, f);
      const buf = fs.readFileSync(p);
      before += buf.length;
      const out = await sharp(buf).rotate().resize({ width: MAX_W, withoutEnlargement: true })
        .jpeg({ quality: 82, progressive: true, mozjpeg: true }).toBuffer();
      if (out.length < buf.length) { fs.writeFileSync(p, out); after += out.length; changed++; }
      else after += buf.length;
    }
  }
  console.log(`Imagens reescritas: ${changed} | ${(before / 1048576).toFixed(1)} MB -> ${(after / 1048576).toFixed(1)} MB`);
})();
