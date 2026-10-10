// Leitor de ZIP com múltiplas entradas (sem dependências). Suporta ZIP64 simples.
const zlib = require('node:zlib');
const fs = require('node:fs');
const { fetchRetry } = require('./data_io');

function listEntries(buf) {
  let eocd = -1;
  for (let i = buf.length - 22; i >= Math.max(0, buf.length - 65557); i--) {
    if (buf.readUInt32LE(i) === 0x06054b50) { eocd = i; break; }
  }
  if (eocd < 0) throw new Error('ZIP inválido (EOCD não encontrado)');
  let count = buf.readUInt16LE(eocd + 10);
  let cd = buf.readUInt32LE(eocd + 16);
  if (cd === 0xffffffff || count === 0xffff) {
    const loc = eocd - 20;
    if (buf.readUInt32LE(loc) === 0x07064b50) {
      const z64 = Number(buf.readBigUInt64LE(loc + 8));
      count = Number(buf.readBigUInt64LE(z64 + 32));
      cd = Number(buf.readBigUInt64LE(z64 + 48));
    }
  }
  const out = [];
  for (let n = 0, p = cd; n < count; n++) {
    if (buf.readUInt32LE(p) !== 0x02014b50) throw new Error('ZIP inválido (diretório central)');
    const method = buf.readUInt16LE(p + 10);
    let compSize = buf.readUInt32LE(p + 20);
    let size = buf.readUInt32LE(p + 24);
    const nameLen = buf.readUInt16LE(p + 28), extraLen = buf.readUInt16LE(p + 30), comLen = buf.readUInt16LE(p + 32);
    let local = buf.readUInt32LE(p + 42);
    const name = buf.toString('latin1', p + 46, p + 46 + nameLen);
    // extra ZIP64
    let e = p + 46 + nameLen; const eEnd = e + extraLen;
    while (e < eEnd) {
      const id = buf.readUInt16LE(e), sz = buf.readUInt16LE(e + 2); let q = e + 4;
      if (id === 1) {
        if (size === 0xffffffff) { size = Number(buf.readBigUInt64LE(q)); q += 8; }
        if (compSize === 0xffffffff) { compSize = Number(buf.readBigUInt64LE(q)); q += 8; }
        if (local === 0xffffffff) { local = Number(buf.readBigUInt64LE(q)); q += 8; }
      }
      e += 4 + sz;
    }
    out.push({ name, method, compSize, size, local });
    p += 46 + nameLen + extraLen + comLen;
  }
  return out;
}

function readEntry(buf, ent) {
  const nameLen = buf.readUInt16LE(ent.local + 26), extraLen = buf.readUInt16LE(ent.local + 28);
  const start = ent.local + 30 + nameLen + extraLen;
  const data = buf.subarray(start, start + ent.compSize);
  if (ent.method === 0) return data;
  if (ent.method === 8) return zlib.inflateRawSync(data);
  throw new Error('Compressão ZIP não suportada: ' + ent.method);
}

// Baixa um arquivo para disco (streaming) e devolve o caminho.
async function downloadToFile(url, dest, timeout = 900000) {
  if (fs.existsSync(dest) && fs.statSync(dest).size > 0 && process.env.DATA_CACHE !== '0') {
    const ageH = (Date.now() - fs.statSync(dest).mtimeMs) / 3600000;
    if (ageH < 20) return dest; // cache local de execução
  }
  const r = await fetchRetry(url, { timeout });
  const { Readable } = require('node:stream');
  const { pipeline } = require('node:stream/promises');
  await pipeline(Readable.fromWeb(r.body), fs.createWriteStream(dest + '.part'));
  fs.renameSync(dest + '.part', dest);
  return dest;
}

module.exports = { listEntries, readEntry, downloadToFile };
