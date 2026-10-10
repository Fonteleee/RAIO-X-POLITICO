// Iterador CSV rápido (aspas duplas, separador configurável). Gera arrays; a 1ª linha é o cabeçalho.
function* csvRows(text, sep = ';') {
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);
  const n = text.length; const S = sep.charCodeAt(0);
  let i = 0;
  while (i < n) {
    const row = [];
    for (;;) {
      let field;
      if (text.charCodeAt(i) === 34) { // campo entre aspas
        let j = i + 1; let buf = '';
        for (;;) {
          const k = text.indexOf('"', j);
          if (k < 0) { buf += text.slice(j); j = n; break; }
          buf += text.slice(j, k);
          if (text.charCodeAt(k + 1) === 34) { buf += '"'; j = k + 2; } else { j = k + 1; break; }
        }
        field = buf; i = j;
        while (i < n && text.charCodeAt(i) !== S && text.charCodeAt(i) !== 10) i++; // ignora lixo até o separador
        if (field !== '' && text.charCodeAt(i - 1) === 13 && i > 0) { /* \r tratado abaixo */ }
      } else {
        let j = i;
        while (j < n) { const c = text.charCodeAt(j); if (c === S || c === 10) break; j++; }
        field = text.slice(i, j); i = j;
      }
      if (field.endsWith('\r')) field = field.slice(0, -1);
      row.push(field);
      if (i >= n || text.charCodeAt(i) === 10) { i++; break; }
      i++; // separador
    }
    if (row.length > 1 || row[0] !== '') yield row;
  }
}

// Converte "1.234,56" em número.
const brNum = s => { const v = Number(String(s || '').replace(/\./g, '').replace(',', '.')); return Number.isFinite(v) ? v : 0; };

module.exports = { csvRows, brNum };
