// Verificação contra dados abertos oficiais (Câmara dos Deputados e Senado Federal).
// Para cada deputado federal / senador do catálogo:
//   - confirma identidade (partido, UF) e corrige divergências
//   - baixa a foto oficial (substitui fotos trocadas)
//   - substitui a cota parlamentar (CEAP) pelo valor real publicado (ano anterior completo)
// Gera data/verification_report.json. Uso: node scripts/verify_official.js [--dry]
// Não verificáveis por API (Executivo/estadual/municipal) ficam listados no relatório.

const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');
const { loadCeapByDeputy } = require('./lib/camara_bulk');
const CEAP_LIMITS = require('../data/ceap_limits.json');

const ROOT = path.join(__dirname, '..');
const DATA_FILE = path.join(ROOT, 'data', 'candidates.js');
const REPORT_FILE = path.join(ROOT, 'data', 'verification_report.json');
const START = 'var candidatesData = _root.candidatesData = ';
const CAMARA = 'https://dadosabertos.camara.leg.br/api/v2';
const SENADO = 'https://legis.senado.leg.br/dadosabertos';
const CEAP_YEAR = new Date().getFullYear() - 1;
const dry = process.argv.includes('--dry');

const norm = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
  .replace(/\b(delegad[ao]|capitao|capita|pastor|coronel|major|doutor|dr|dra|professor[a]?|cabo|sargento|comandante|tenente|general|dep|deputad[ao]|senador[a]?)\b/g, ' ')
  .replace(/[^a-z ]/g, ' ').replace(/\s+/g, ' ').trim();
const PARTY_ALIASES = { 'UNIAO': 'UNIÃO', 'UNIÃO BRASIL': 'UNIÃO', 'PODE': 'PODEMOS', 'REPUBLICANOS': 'REPUBLICANOS' };
const normParty = p => { const u = String(p || '').toUpperCase().trim(); return PARTY_ALIASES[u] || u; };
const brl = n => 'R$ ' + n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

async function getJson(url, headers = {}, tries = 3) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: { Accept: 'application/json', ...headers }, signal: AbortSignal.timeout(30000) });
      if (r.ok) return await r.json();
    } catch { /* retry */ }
    await new Promise(r => setTimeout(r, 800 * (i + 1)));
  }
  return null;
}

async function loadCamaraDeputies() {
  const all = [];
  for (let page = 1; page < 20; page++) {
    const j = await getJson(`${CAMARA}/deputados?idLegislatura=57&itens=100&pagina=${page}&ordem=ASC&ordenarPor=nome`);
    if (!j || !j.dados || !j.dados.length) break;
    for (const d of j.dados) if (!all.some(x => x.id === d.id)) all.push(d);
    if (j.dados.length < 100) break;
  }
  return all;
}

async function loadSenators() {
  const j = await getJson(`${SENADO}/senador/lista/atual`);
  const list = j && j.ListaParlamentarEmExercicio && j.ListaParlamentarEmExercicio.Parlamentares.Parlamentar || [];
  return list.map(p => ({
    id: p.IdentificacaoParlamentar.CodigoParlamentar,
    nome: p.IdentificacaoParlamentar.NomeParlamentar,
    nomeCivil: p.IdentificacaoParlamentar.NomeCompletoParlamentar,
    siglaPartido: p.IdentificacaoParlamentar.SiglaPartidoParlamentar,
    siglaUf: p.IdentificacaoParlamentar.UfParlamentar,
    urlFoto: (p.IdentificacaoParlamentar.UrlFotoParlamentar || '').replace(/^http:/, 'https:')
  }));
}

function matchPerson(cand, pool, strict = false) {
  const keys = new Set([cand.ballotName, cand.name].map(norm).filter(Boolean));
  const exact = pool.filter(p => keys.has(norm(p.nome)) || keys.has(norm(p.nomeCivil)));
  const sameUf = exact.filter(p => p.siglaUf === cand.state);
  if (sameUf.length === 1) return sameUf[0];
  if (exact.length === 1) return exact[0];
  if (strict) return null;
  // todos os tokens do nome parlamentar contidos no nome civil/urna do candidato
  const full = norm(cand.name + ' ' + cand.ballotName);
  const loose = pool.filter(p => {
    const t = norm(p.nome).split(' ').filter(x => x.length > 2);
    return (t.length >= 2 || (t.length === 1 && t[0].length >= 5)) && t.every(x => full.split(' ').includes(x));
  });
  const looseUf = loose.filter(p => p.siglaUf === cand.state);
  if (looseUf.length === 1) return looseUf[0];
  return null;
}


async function downloadPhoto(url, dest) {
  const r = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!r.ok) throw new Error('HTTP ' + r.status);
  const buf = Buffer.from(await r.arrayBuffer());
  const out = await sharp(buf).rotate().resize({ width: 640, withoutEnlargement: true })
    .jpeg({ quality: 82, progressive: true, mozjpeg: true }).toBuffer();
  fs.writeFileSync(dest, out);
}

async function pool(items, size, fn) {
  const queue = [...items];
  await Promise.all(Array.from({ length: size }, async () => {
    while (queue.length) await fn(queue.shift());
  }));
}

(async () => {
  const raw = fs.readFileSync(DATA_FILE, 'utf8');
  const crlf = raw.includes('\r\n');
  const src = raw.replace(/\r\n/g, '\n');
  const startIdx = src.indexOf(START);
  const arrStart = startIdx + START.length;
  const arrEnd = src.indexOf('\n];\n', arrStart) + 2;
  const list = JSON.parse(src.slice(arrStart, arrEnd));

  console.log(`Baixando CEAP ${CEAP_YEAR} (arquivo em lote da Câmara)...`);
  const ceap = await loadCeapByDeputy(CEAP_YEAR);
  console.log(`CEAP: ${ceap.rows} notas, ${ceap.byId.size} parlamentares`);
  const limits = CEAP_LIMITS[String(CEAP_YEAR)];
  if (!limits) throw new Error(`Sem tabela de teto CEAP para ${CEAP_YEAR} em data/ceap_limits.json`);

  console.log('Baixando listas oficiais...');
  const [deputies, senators] = await Promise.all([loadCamaraDeputies(), loadSenators()]);
  console.log(`Câmara: ${deputies.length} deputados | Senado: ${senators.length} senadores`);
  if (deputies.length < 500 || senators.length < 60) throw new Error('Listas oficiais incompletas; abortando.');

  let previous = {};
  try { JSON.parse(fs.readFileSync(REPORT_FILE, 'utf8')).entries.forEach(e => { previous[e.id] = e; }); } catch { /* primeira execução */ }
  const report = { generatedAt: new Date().toISOString(), ceapYear: CEAP_YEAR, sources: { camara: CAMARA, senado: SENADO }, entries: [] };
  const fetchedAt = new Date().toISOString().slice(0, 10);

  await pool(list, 4, async cand => {
    const isDep = /Deputad[ao] Federal/i.test(cand.position);
    const isSen = /Senador/i.test(cand.position);
    const entry = { id: cand.id, name: cand.ballotName, positionInData: cand.position };

    let hit = null, house = null;
    if (isDep) { hit = matchPerson(cand, deputies); house = 'camara'; }
    else if (isSen) { hit = matchPerson(cand, senators); house = 'senado'; }
    if (!hit && !isDep && !isSen) {
      // pode ser parlamentar com cargo errado nos dados: tenta nas duas casas, exigindo mesma UF
      const d = matchPerson(cand, deputies, true); const s = matchPerson(cand, senators, true);
      if (d && d.siglaUf === cand.state) { hit = d; house = 'camara'; }
      else if (s && s.siglaUf === cand.state) { hit = s; house = 'senado'; }
    }
    if (!hit && (isDep || isSen)) {
      // tenta a outra casa (cargo trocado nos dados)
      const other = isDep ? senators : deputies;
      const o = matchPerson(cand, other, true);
      if (o && o.siglaUf === cand.state) { hit = o; house = isDep ? 'senado' : 'camara'; }
    }

    if (!hit) {
      entry.status = (isDep || isSen) ? 'NAO_ENCONTRADO_NA_CASA' : 'SEM_FONTE_API';
      entry.note = (isDep || isSen)
        ? 'Não consta como parlamentar em exercício nas listas oficiais; revisar cargo/status.'
        : 'Cargo fora do Legislativo federal: verificar manualmente (TSE DivulgaCandContas / sites oficiais).';
      report.entries.push(entry);
      return;
    }

    entry.status = 'VERIFICADO';
    entry.house = house;
    entry.officialName = hit.nome;
    entry.officialId = hit.id;
    entry.changes = [];

    if (house === 'camara') {
      const det = await getJson(`${CAMARA}/deputados/${hit.id}`);
      const st = det && det.dados && det.dados.ultimoStatus;
      if (st) {
        if (st.siglaPartido) hit.siglaPartido = st.siglaPartido;
        if (st.siglaUf) hit.siglaUf = st.siglaUf;
        entry.situacao = st.situacao;
        entry.condicaoEleitoral = st.condicaoEleitoral;
        if (!/Exerc/i.test(st.situacao || '')) entry.note = `Situação oficial atual: ${st.situacao} — cargo exibido pode estar desatualizado.`;
      }
    }

    // Identidade
    const apiParty = normParty(hit.siglaPartido);
    if (!/^S\/?PARTIDO$/.test(apiParty) && normParty(cand.party) !== apiParty) {
      entry.changes.push({ field: 'party', from: cand.party, to: hit.siglaPartido });
      cand.party = hit.siglaPartido;
    }
    if (cand.state !== hit.siglaUf) {
      entry.changes.push({ field: 'state', from: cand.state, to: hit.siglaUf });
      cand.state = hit.siglaUf;
    }
    const expectedPos = house === 'camara'
      ? (/a$/i.test(cand.position.split(' ')[0]) ? 'Deputada Federal' : 'Deputado Federal')
      : (/a$/i.test(cand.position.split(' ')[0]) ? 'Senadora' : 'Senador');
    const posOk = house === 'camara' ? /Deputad[ao] Federal/i.test(cand.position) : /Senador/i.test(cand.position);
    if (!posOk) {
      entry.changes.push({ field: 'position', from: cand.position, to: expectedPos });
      cand.position = expectedPos;
      cand.officePower = 'legislativo';
      if (!Array.isArray(cand.authoredBillsDetailed)) cand.authoredBillsDetailed = [];
    }

    if (cand.officePower === 'legislativo' && !Array.isArray(cand.authoredBillsDetailed)) cand.authoredBillsDetailed = [];

    // Foto oficial
    try {
      if (!dry) await downloadPhoto(hit.urlFoto || hit.urlFoto, path.join(ROOT, 'img', 'candidates', `${cand.id}.jpg`));
      if (cand.avatar !== `img/candidates/${cand.id}.jpg`) {
        entry.changes.push({ field: 'avatar', from: cand.avatar, to: `img/candidates/${cand.id}.jpg` });
        cand.avatar = `img/candidates/${cand.id}.jpg`;
      }
      entry.photo = 'oficial';
    } catch (e) {
      entry.photo = 'falha: ' + e.message;
    }

    // Cota parlamentar real (somente Câmara): arquivo em lote oficial + teto oficial da UF
    if (house === 'camara') {
      const c = ceap.byId.get(String(hit.id));
      const total = c ? c.total : 0;
      const monthsActive = c ? c.meses.size : 0;
      const uf = (c && c.uf) || hit.siglaUf;
      const limit = limits[uf];
      const monthly = Math.round((total / 12) * 100) / 100;
      cand.salary = cand.salary || {};
      cand.salary.spendingCeapMonthlyNum = monthly;
      cand.salary.spendingCeapMonthly = brl(monthly);
      if (limit) {
        cand.salary.limitCeapMonthlyNum = limit;
        cand.salary.limitCeapMonthly = brl(limit);
        cand.salary.spendingPercentage = Math.round((total / (limit * 12)) * 100);
        cand.salary.savedCeapTotal = brl(Math.max(0, Math.round((limit * 12 - total) * 100) / 100));
      }
      const topTipos = c ? Object.entries(c.porTipo).sort((x, y) => y[1] - x[1]).slice(0, 3).map(([tipo, v]) => ({ tipo, valor: Math.round(v * 100) / 100 })) : [];
      entry.ceap = { year: CEAP_YEAR, totalYear: total, notas: c ? c.notas : 0, mesesComDespesa: monthsActive, monthlyAvg: monthly, tetoMensalUF: limit || null };
      cand.salary.ceapSource = {
        fonte: 'Câmara dos Deputados — arquivo oficial de despesas da CEAP',
        ano: CEAP_YEAR, totalAno: total, notasFiscais: c ? c.notas : 0, mesesComDespesa: monthsActive,
        tetoMensalUF: limit || null, maioresDespesas: topTipos, consultadoEm: fetchedAt,
        url: `https://www.camara.leg.br/cotas/Ano-${CEAP_YEAR}.csv.zip`,
        painel: `https://www.camara.leg.br/deputados/${hit.id}`
      };
      if (monthsActive && monthsActive < 12) entry.note = (entry.note ? entry.note + ' ' : '') + `CEAP com despesas em apenas ${monthsActive} meses de ${CEAP_YEAR} (licença/suplência).`;
    }
    cand.dataVerification = { fonte: house === 'camara' ? 'Câmara dos Deputados' : 'Senado Federal', idOficial: String(hit.id), verificadoEm: fetchedAt, situacao: entry.situacao || null, campos: ['identidade', 'foto'].concat(house === 'camara' ? ['ceap'] : []) };
    report.entries.push(entry);
  });

  // preserva o histórico de correções já aplicadas em execuções anteriores
  for (const e of report.entries) {
    const prev = previous[e.id];
    if (prev && prev.changes && prev.changes.length) e.changes = [...prev.changes, ...(e.changes || []).filter(c => !prev.changes.some(p => p.field === c.field && p.to === c.to))];
  }
  report.entries.sort((a, b) => a.id.localeCompare(b.id));
  const count = s => report.entries.filter(e => e.status === s).length;
  report.summary = {
    total: list.length, verificados: count('VERIFICADO'),
    naoEncontradosNaCasa: count('NAO_ENCONTRADO_NA_CASA'), semFonteApi: count('SEM_FONTE_API'),
    comAlteracoes: report.entries.filter(e => e.changes && e.changes.length).length
  };
  console.log(report.summary);
  if (dry) return;

  fs.writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2));
  let out = src.slice(0, arrStart) + JSON.stringify(list, null, 2) + src.slice(arrEnd);
  if (crlf) out = out.replace(/\n/g, '\r\n');
  fs.writeFileSync(DATA_FILE, out, 'utf8');
  console.log('Atualizados: data/candidates.js e data/verification_report.json');
})().catch(e => { console.error(e); process.exit(1); });
