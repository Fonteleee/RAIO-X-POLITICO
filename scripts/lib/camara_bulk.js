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
    const e = byId.get(r.ideCadastro) || { total: 0, notas: 0, meses: new Set(), uf: r.sgUF, porTipo: {}, docs: new Set() };
    e.docs.add(r.ideDocumento);
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

// O arquivo em lote deixou de trazer "PASSAGEM AÉREA - SIGEPA" a partir de ago/2025, mas a API
// (com idLegislatura) traz. Soma os documentos da API ausentes no lote; validado contra o portal
// da Câmara (ex.: Carlos Jordy 2025 = R$ 524.534,61; Kim Kataguiri = R$ 153.657,78).
async function addCeapApiExtras(entry, deputyId, year, legislatura = 57) {
  // consulta mês a mês: a paginação da API não tem ordenação estável e perde documentos
  // codDocumento se repete entre linhas distintas (ex.: trechos de um mesmo bilhete), então só se
  // excluem linhas cujo código já está no lote. Linhas idênticas na mesma página são legítimas
  // (ex.: dois recibos iguais); só se descartam repetições entre páginas de um mesmo mês.
  const bulkDocs = new Set(entry.docs);
  let added = 0;
  for (let mes = 1; mes <= 12; mes++) {
    const seenPrevPages = new Set();
    for (let page = 1; page < 20; page++) {
      const seenThisPage = new Set();
      const url = `https://dadosabertos.camara.leg.br/api/v2/deputados/${deputyId}/despesas?idLegislatura=${legislatura}&ano=${year}&mes=${mes}&itens=100&pagina=${page}`;
      let j = null;
      for (let t = 0; t < 3 && !j; t++) {
        try {
          const r = await fetch(url, { headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(30000) });
          if (r.ok) j = await r.json();
        } catch { /* nova tentativa */ }
        if (!j) await new Promise(res => setTimeout(res, 1000 * (t + 1)));
      }
      if (!j) throw new Error(`API despesas indisponível (${year}-${mes})`);
      for (const d of j.dados) {
        const cod = String(d.codDocumento);
        if (bulkDocs.has(cod)) continue;
        const key = [cod, d.dataDocumento, d.numDocumento, d.valorDocumento, d.valorLiquido, d.parcela, d.cnpjCpfFornecedor, d.tipoDespesa].join('|');
        if (seenPrevPages.has(key)) continue;
        seenThisPage.add(key);
        entry.docs.add(cod);
        entry.total += Number(d.valorLiquido) || 0;
        entry.notas++;
        entry.meses.add(Number(d.mes));
        entry.porTipo[d.tipoDespesa] = (entry.porTipo[d.tipoDespesa] || 0) + (Number(d.valorLiquido) || 0);
        added++;
      }
      seenThisPage.forEach(k => seenPrevPages.add(k));
      if (j.dados.length < 100) break;
    }
  }
  entry.total = Math.round(entry.total * 100) / 100;
  return added;
}

module.exports = { download, unzipFirst, parseCsv, loadCeapByDeputy, addCeapApiExtras };
