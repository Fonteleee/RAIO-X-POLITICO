const fs = require('fs');
let s = fs.readFileSync('js/sticker_export.js', 'utf8');
s = s.replace("  window.downloadExportedImage = async", "  window.downloadExportedImage = async"); // noop guard
if (!s.includes('window.getCorsSafeAvatar')) {
  s = s.replace("  window.downloadExportedImage = async function (resolution) {",
`  // Em hospedagem estática (GitHub Pages) não existe /api/proxy-image: usa proxy público com CORS.
  var _origAvatar = window.getCorsSafeAvatar;
  window.getCorsSafeAvatar = function (url, name) {
    var isStatic = /github\\.io$/i.test(location.hostname);
    if (isStatic && url && /^https?:\\/\\//i.test(url) && !url.includes('ui-avatars.com') && !url.includes('Portrait_Placeholder')) {
      return 'https://images.weserv.nl/?url=' + encodeURIComponent(url.replace(/^https?:\\/\\//i, '')) + '&w=256&h=256&fit=cover&a=top';
    }
    return _origAvatar ? _origAvatar(url, name) : url;
  };

  window.downloadExportedImage = async function (resolution) {`);
}
fs.writeFileSync('js/sticker_export.js', s);
let h = fs.readFileSync('index.html', 'utf8');
if (!h.includes('js/sticker_export.js')) {
  const m = h.match(/<script src="js\/stickers\.js[^"]*"><\/script>/);
  if (!m) { console.log('stickers.js tag not found'); process.exit(1); }
  h = h.replace(m[0], m[0] + '\n  <script src="js/sticker_export.js"></script>');
  fs.writeFileSync('index.html', h);
}
console.log('done');
