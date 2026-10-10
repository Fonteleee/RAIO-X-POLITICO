// Saneamento de dados: remove conteúdo padronizado/placeholder que não vem de fonte rastreável.
// Idempotente. Uso: node scripts/sanitize_data.js [--dry]
//  - links de debate placeholder (youtube dQw4w9WgXcQ)
//  - falas repetidas idênticas em vários políticos (texto genérico atribuído a pessoas reais)
//  - "certidões" padronizadas (mesmo nº de processo em vários políticos)
//  - rótulos de Ficha Limpa afirmados sem fonte
//  - candidatos duplicados (ver DUPLICATE_IDS)

const fs = require('node:fs');
const path = require('node:path');

const FILE = path.join(__dirname, '..', 'data', 'candidates.js');
const START = 'var candidatesData = _root.candidatesData = ';
const NEUTRAL_RECORD = 'Sem apontamentos verificados nesta base • consulte as certidões oficiais';
const PLACEHOLDER_YT = /dQw4w9WgXcQ/;
// Fotos comprovadamente trocadas/duplicadas (mesma imagem usada para pessoas diferentes): usa placeholder
const PHOTO_PENDING = new Set(['cand-alexandre-ramagem', 'cand-carlos-jordy', 'cand-helio-lopes', 'cand-clarissa-tercio', 'cand-adriana-accorsi', 'cand-keniston-braga']);
const PLACEHOLDER_AVATAR = 'img/placeholder-person.svg';
const DUPLICATE_IDS = new Set(['cand-carol-de-toni']); // mantém cand-caroline-de-toni

const dry = process.argv.includes('--dry');
const raw = fs.readFileSync(FILE, 'utf8');
const crlf = raw.includes('\r\n');
const src = raw.replace(/\r\n/g, '\n');

const startIdx = src.indexOf(START);
const arrStart = startIdx + START.length;
const arrEnd = src.indexOf('\n];\n', arrStart) + 2; // inclui "\n]"
if (startIdx < 0 || arrEnd < arrStart) throw new Error('Formato inesperado de data/candidates.js');

const list = JSON.parse(src.slice(arrStart, arrEnd));
const stats = { removedCandidates: 0, youtube: 0, statements: 0, lawsuits: 0, recordLabels: 0 };

// 1. Duplicados
const kept = list.filter(c => {
  if (DUPLICATE_IDS.has(c.id)) { stats.removedCandidates++; return false; }
  return true;
});

// 2. Textos padronizados (mesma fala / mesmo processo em mais de uma pessoa)
function countBy(fn) {
  const m = new Map();
  kept.forEach(c => fn(c).forEach(k => {
    if (!m.has(k)) m.set(k, new Set());
    m.get(k).add(c.id);
  }));
  return m;
}
const quotes = countBy(c => [...(c.recentStatements || []), ...((c.recentDebate && c.recentDebate.statements) || [])].map(s => s.quote));
const processes = countBy(c => ((c.ethicsDetailed && c.ethicsDetailed.lawsuits) || []).map(l => l.processNumber));
const isTemplatedQuote = q => quotes.get(q) && quotes.get(q).size > 1;
const isTemplatedProcess = p => processes.get(p) && processes.get(p).size > 1;

for (const c of kept) {
  if (PHOTO_PENDING.has(c.id) && c.avatar !== PLACEHOLDER_AVATAR) { c.avatar = PLACEHOLDER_AVATAR; stats.avatars = (stats.avatars || 0) + 1; }
  if (c.recentDebate && PLACEHOLDER_YT.test(c.recentDebate.youtubeUrl || '')) {
    c.recentDebate.youtubeUrl = '';
    stats.youtube++;
  }
  if (Array.isArray(c.recentStatements)) {
    const n = c.recentStatements.length;
    c.recentStatements = c.recentStatements.filter(s => !isTemplatedQuote(s.quote));
    stats.statements += n - c.recentStatements.length;
  }
  if (c.recentDebate && Array.isArray(c.recentDebate.statements)) {
    c.recentDebate.statements = c.recentDebate.statements.filter(s => !isTemplatedQuote(s.quote));
  }
  const eth = c.ethicsDetailed;
  if (eth) {
    if (Array.isArray(eth.lawsuits)) {
      const n = eth.lawsuits.length;
      eth.lawsuits = eth.lawsuits.filter(l => !isTemplatedProcess(l.processNumber));
      stats.lawsuits += n - eth.lawsuits.length;
    }
    if (eth.cleanRecordStatus && eth.cleanRecordStatus !== NEUTRAL_RECORD) {
      eth.cleanRecordStatus = NEUTRAL_RECORD;
      stats.recordLabels++;
    }
  }
}

console.log('Saneamento:', stats);
if (dry) process.exit(0);

let out = src.slice(0, arrStart) + JSON.stringify(kept, null, 2) + src.slice(arrEnd);
if (crlf) out = out.replace(/\n/g, '\r\n');
fs.writeFileSync(FILE, out, 'utf8');
console.log('data/candidates.js atualizado.');
