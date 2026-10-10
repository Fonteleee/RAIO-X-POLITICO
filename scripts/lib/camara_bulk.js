// Leitura dos arquivos em lote (bulk) de dados abertos da Câmara dos Deputados.
// Sem dependências: leitor de ZIP via zlib e parser CSV (separador ';', aspas duplas).

const zlib = require('node:zlib');

async function download(url) {
  const r = await fetch(url, { signal: AbortSignal.timeout(180000) });
  if (!r.ok) throw new Error(`HTTP ${r.status} em ${url}`);
  return Buffer.from(await r.arrayBuffer());
}

// Extrai o primeiro arquivo de um ZIP usando o diretório central (suporta data descriptor).
function unzipFirst(buf) {
  let eocd = -1;
  for (let i = buf.length - 22; i >= Math.max(0, buf.length - 65557); i--) {
    if (buf.readUInt32LE(i) === 0x06054b50) { eocd = i; break; }
  }
  if (eocd < 0) throw new Error('ZIP inválido (EOCD não encontrado)');
  const cdOffset = buf.readUInt32LE(eocd + 16);
  if (buf.readUInt32LE(cdOffset) !== 0x02014b50) throw new Error('ZIP inválido (diretório central)');
  const method = buf.readUInt16LE(cdOffset + 10);
  const compSize = buf.readUInt32LE(cdOffset + 20);
  const localOffset = buf.readUInt32LE(cdOffset + 42);
  const nameLen = buf.readUInt16LE(localOffset + 26);
  const extraLen = buf.readUInt16LE(localOffset + 28);
  const start = localOffset + 30 + nameLen + extraLen;
  const data = buf.subarray(start, start + compSize);
  if (method === 0) return data;
  if (method === 8) return zlib.inflateRawSync(data);
  throw new Error('Método de compressão ZIP não suportado: ' + method);
}

// Parser CSV com aspas; devolve array de objetos usando o cabeçalho.
function parseCsv(text, sep = ';') {
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);
  const rows = [];
  let row = [], field = '', inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; } else inQuotes = false;
      } else field += ch;
    } else if (ch === '"') inQuotes = true;
    else if (ch === sep) { row.push(field); field = ''; }
    else if (ch === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
    else if (ch !== '\r') field += ch;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  const header = rows.shift();
  return rows.filter(r => r.length === header.length).map(r => Object.fromEntries(header.map((h, i) => [h, r[i]])));
}

// Soma da CEAP por deputado (ideCadastro = id da API de dados abertos).
async function loadCeapByDeputy(year) {
  const zip = await download(`https://www.camara.leg.br/cotas/Ano-${year}.csv.zip`);
  const rows = parseCsv(unzipFirst(zip).toString('utf8'));
  const byId = new Map();
  for (const r of rows) {
    if (!r.ideCadastro) continue; // lideranças/partidos
    const e = byId.get(r.ideCadastro) || { total: 0, notas: 0, meses: new Set(), uf: r.sgUF, porTipo: {} };
    const v = Number(String(r.vlrLiquido).replace(',', '.')) || 0;
    e.total += v;
    e.notas++;
    e.meses.add(Number(r.numMes));
    e.porTipo[r.txtDescricao] = (e.porTipo[r.txtDescricao] || 0) + v;
    byId.set(r.ideCadastro, e);
  }
  for (const e of byId.values()) e.total = Math.round(e.total * 100) / 100;
  return { byId, rows: rows.length };
}

module.exports = { download, unzipFirst, parseCsv, loadCeapByDeputy };
