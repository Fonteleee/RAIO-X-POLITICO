// Leitura/gravação de data/candidates.js preservando o formato (prefixo JS e CRLF).
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..', '..');
const DATA_FILE = path.join(ROOT, 'data', 'candidates.js');
const REPORT_FILE = path.join(ROOT, 'data', 'verification_report.json');
const START = 'var candidatesData = _root.candidatesData = ';
const UA = 'FigurasPoliticasBot/1.0 (+https://github.com/; verificacao de dados publicos)';

function loadCandidates(file = DATA_FILE) {
  const raw = fs.readFileSync(file, 'utf8');
  const crlf = raw.includes('\r\n');
  const src = raw.replace(/\r\n/g, '\n');
  const startIdx = src.indexOf(START);
  const arrStart = startIdx + START.length;
  const arrEnd = src.indexOf('\n];\n', arrStart) + 2;
  if (startIdx < 0 || arrEnd < arrStart) throw new Error('Formato inesperado de data/candidates.js');
  const list = JSON.parse(src.slice(arrStart, arrEnd));
  return {
    list,
    save(newList = list) {
      let out = src.slice(0, arrStart) + JSON.stringify(newList, null, 2) + src.slice(arrEnd);
      if (crlf) out = out.replace(/\n/g, '\r\n');
      fs.writeFileSync(file, out, 'utf8');
    }
  };
}

function loadReport() {
  try { return JSON.parse(fs.readFileSync(REPORT_FILE, 'utf8')); } catch { return {}; }
}
function saveReport(rep) { fs.writeFileSync(REPORT_FILE, JSON.stringify(rep, null, 2)); }

// Grava uma seção (fase) do relatório preservando as demais.
function writeReportSection(name, section) {
  const rep = loadReport();
  rep.fases = rep.fases || {};
  rep.fases[name] = { geradoEm: new Date().toISOString(), ...section };
  saveReport(rep);
}

const sleep = ms => new Promise(r => setTimeout(r, ms));
const today = () => new Date().toISOString().slice(0, 10);

async function fetchRetry(url, opts = {}, tries = 6) {
  let last;
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { ...opts, headers: { 'User-Agent': UA, ...(opts.headers || {}) }, signal: AbortSignal.timeout(opts.timeout || 60000) });
      if (r.ok) return r;
      last = new Error(`HTTP ${r.status} em ${url}`);
      if (r.status === 404) break;
      if (r.status === 429) { // limite de requisições: respeita Retry-After
        const ra = Number(r.headers.get('retry-after')) || 0;
        await sleep(Math.max(ra * 1000, 3000 * (i + 1)));
        continue;
      }
    } catch (e) { last = e; }
    await sleep(1000 * (i + 1));
  }
  throw last;
}
async function getJson(url) {
  try { return await (await fetchRetry(url, { headers: { Accept: 'application/json' } })).json(); } catch { return null; }
}
async function getText(url) {
  try { return await (await fetchRetry(url)).text(); } catch { return null; }
}

const norm = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase().replace(/[^A-Z ]/g, ' ').replace(/\s+/g, ' ').trim();

module.exports = { ROOT, DATA_FILE, REPORT_FILE, UA, loadCandidates, loadReport, saveReport, writeReportSection, sleep, today, fetchRetry, getJson, getText, norm };
