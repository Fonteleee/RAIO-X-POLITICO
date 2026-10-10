// Fase 1 — Identidade e mandato atual.
//  - TSE 2026 (consulta_cand_2026): número de urna, partido, cargo disputado e resultado → cand.tse2026
//  - TSE 2022 / 2024 (eleitos) + Câmara/Senado (dataVerification de verify_official.js) → cand.status e position
//  - Wikidata (fonte SECUNDÁRIA): óbito (P570) e cargo atual (P39). Nunca corrige sozinho: gera
//    cand.reviewAlerts. Única exceção: óbito confirmado → status.situacao = 'falecido'.
// Uso: node scripts/verify_tse.js [--dry]
const fs = require('node:fs');
const { loadCandidates, loadReport, writeReportSection, norm, today, fetchRetry, sleep } = require('./lib/data_io');
const { listEntries, readEntry, downloadToFile } = require('./lib/zip');
const { csvRows } = require('./lib/csv');
const { tmpFile } = require('./lib/tmp');

const dry = process.argv.includes('--dry');
const TSE_URL = y => `https://cdn.tse.jus.br/estatistica/sead/odsele/consulta_cand/consulta_cand_${y}.zip`;
const ELEITO = /^ELEITO/; // ELEITO, ELEITO POR QP, ELEITO POR MÉDIA
const HOJE = today();
const STOP = new Set(['DAS', 'DOS', 'JUNIOR', 'FILHO', 'NETO']);

// Lê o arquivo BRASIL de um ano, mantendo só as linhas cujo nome civil ou de urna está no conjunto.
async function loadTse(year, keys, filter = () => true, keepAll = false) {
  const zipPath = await downloadToFile(TSE_URL(year), tmpFile(`consulta_cand_${year}.zip`));
  const buf = fs.readFileSync(zipPath);
  const ent = listEntries(buf).find(e => new RegExp(`consulta_cand_${year}_BRASIL\\.csv$`).test(e.name));
  if (!ent) throw new Error(`TSE ${year}: arquivo BRASIL ausente no ZIP`);
  const text = readEntry(buf, ent).toString('latin1');
  let header = null, total = 0; const rows = [];
  for (const r of csvRows(text)) {
    if (!header) { header = r; continue; }
    total++;
    const o = {}; header.forEach((h, i) => { o[h] = r[i]; });
    if (!keepAll && !ELEITO.test(o.DS_SIT_TOT_TURNO) && !keys.has(norm(o.NM_CANDIDATO)) && !keys.has(norm(o.NM_URNA_CANDIDATO))) continue;
    o._nc = norm(o.NM_CANDIDATO); o._nu = norm(o.NM_URNA_CANDIDATO);
    if (filter(o)) rows.push(o);
  }
  return { rows, total };
}

const fem = (cand, tseRow) => tseRow ? /FEMININO/.test(tseRow.DS_GENERO) : /^(Deputada|Senadora|Governadora|Prefeita|Vereadora|Pré-candidata|Presidenta|Vice-Prefeita)/.test(cand.position || '');
function cargoLabel(dsCargo, f) {
  const c = norm(dsCargo);
  const a = f ? 'a' : 'o';
  const map = {
    'PRESIDENTE': 'Presidente da República', 'VICE PRESIDENTE': 'Vice-Presidente da República',
    'GOVERNADOR': f ? 'Governadora' : 'Governador', 'VICE GOVERNADOR': f ? 'Vice-Governadora' : 'Vice-Governador',
    'SENADOR': f ? 'Senadora' : 'Senador', 'DEPUTADO FEDERAL': `Deputad${a} Federal`,
    'DEPUTADO ESTADUAL': `Deputad${a} Estadual`, 'DEPUTADO DISTRITAL': `Deputad${a} Distrital`,
    'PREFEITO': f ? 'Prefeita' : 'Prefeito', 'VICE PREFEITO': f ? 'Vice-Prefeita' : 'Vice-Prefeito',
    'VEREADOR': f ? 'Vereadora' : 'Vereador'
  };
  return map[c] || dsCargo;
}
const titularExecutivo = c => ['PRESIDENTE', 'GOVERNADOR', 'PREFEITO'].includes(norm(c));
const PARTY_ALIASES = { 'UNIAO BRASIL': 'UNIAO', 'PODE': 'PODEMOS', 'PC DO B': 'PCDOB', 'CIDADANIA': 'CIDADANIA' };
const normParty = p => { const u = norm(p); return (PARTY_ALIASES[u] || u).replace(/ /g, ''); };

function pickUnique(rows, cand, allowBR = true) {
  if (rows.length <= 1) return rows[0] || null;
  const sq = new Set(rows.map(r => r.SQ_CANDIDATO));
  if (sq.size === 1) return rows[0];
  const uf = rows.filter(r => r.SG_UF === cand.state || (allowBR && r.SG_UF === 'BR'));
  return new Set(uf.map(r => r.SQ_CANDIDATO)).size === 1 ? uf[0] : null;
}
// casa por nome civil exato normalizado; senão nome de urna + UF (único)
function matchTse(cand, rows, fuzzy = true) {
  const civil = norm(String(cand.name).replace(/(.*?)/g, ''));
  const byCivil = rows.filter(r => r._nc === civil);
  const m1 = pickUnique(byCivil, cand);
  if (m1) return m1;
  const urna = norm(cand.ballotName);
  const byUrna = rows.filter(r => r._nu === urna && (r.SG_UF === cand.state || r.SG_UF === 'BR' || r.SG_UE === cand.state));
  if (new Set(byUrna.map(r => r.SQ_CANDIDATO)).size === 1) return byUrna[0];
  // tokens do nome civil do perfil contidos no nome civil + urna do TSE (mesma UF, único)
  const tk = s => norm(s).split(' ').filter(t => t.length > 2 && !STOP.has(t));
  const ct = tk(String(cand.name).replace(/(.*?)/g, ''));
  if (fuzzy && ct.length >= 3) {
    const fz = rows.filter(r => (r.SG_UF === cand.state || r.SG_UF === 'BR') && ct.every(x => (r._tk || (r._tk = new Set((r._nc + ' ' + r._nu).split(' ')))).has(x)));
    if (new Set(fz.map(r => r.SQ_CANDIDATO)).size === 1) return fz[0];
  }
  return null;
}

// ---------- Wikidata (secundária) ----------
async function sparql(query) {
  const r = await fetchRetry('https://query.wikidata.org/sparql', {
    method: 'POST', timeout: 120000,
    headers: { Accept: 'application/sparql-results+json', 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'query=' + encodeURIComponent(query)
  });
  return (await r.json()).results.bindings;
}
async function loadWikidata(list) {
  const out = new Map(); // cand.id -> {qid, death, positions:[{label,start,end}]}
  const labels = new Map();
  for (const c of list) for (const l of [c.ballotName, c.name]) if (l) { const k = l.replace(/["\\]/g, ''); if (!labels.has(k)) labels.set(k, new Set()); labels.get(k).add(c.id); }
  const all = [...labels.keys()];
  for (let i = 0; i < all.length; i += 80) {
    const chunk = all.slice(i, i + 80);
    const q = `SELECT ?lab ?item ?death ?posLabel ?start ?end WHERE {
      VALUES ?lab { ${chunk.map(l => `"${l}"@pt`).join(' ')} }
      { ?item rdfs:label ?lab } UNION { ?item skos:altLabel ?lab }
      ?item wdt:P31 wd:Q5; wdt:P27 wd:Q155; wdt:P106 wd:Q82955.
      OPTIONAL { ?item wdt:P570 ?death }
      OPTIONAL { ?item p:P39 ?st. ?st ps:P39 ?pos. OPTIONAL { ?st pq:P580 ?start } OPTIONAL { ?st pq:P582 ?end }
                 ?pos rdfs:label ?posLabel. FILTER(LANG(?posLabel)='pt') }
    }`;
    const rows = await sparql(q);
    const byLabel = new Map();
    for (const b of rows) {
      const lab = b.lab.value; const qid = b.item.value.split('/').pop();
      if (!byLabel.has(lab)) byLabel.set(lab, new Map());
      const m = byLabel.get(lab);
      if (!m.has(qid)) m.set(qid, { qid, death: null, positions: [] });
      const e = m.get(qid);
      if (b.death) e.death = b.death.value.slice(0, 10);
      if (b.posLabel) {
        const p = { label: b.posLabel.value, start: b.start ? b.start.value.slice(0, 10) : null, end: b.end ? b.end.value.slice(0, 10) : null };
        if (!e.positions.some(x => x.label === p.label && x.start === p.start && x.end === p.end)) e.positions.push(p);
      }
    }
    for (const [lab, m] of byLabel) {
      if (m.size !== 1) continue; // homônimos: ignora
      const e = [...m.values()][0];
      // óbito anterior a 2019 indica homônimo (o catálogo só tem políticos ativos) → descarta a entidade
      if (e.death && e.death < '2019-01-01') continue;
      for (const id of labels.get(lab)) if (!out.has(id)) out.set(id, e);
    }
    await sleep(1000);
  }
  return out;
}
function wikidataCurrent(e) {
  const limite = new Date(Date.now() - 8 * 365 * 864e5).toISOString().slice(0, 10);
  return e.positions.filter(p => p.start && p.start <= HOJE && p.start >= limite && (!p.end || p.end > HOJE));
}
const MANDATO_KEYWORDS = [
  [/Vice-Presidente/i, /vice-presidente/i], [/Presidente/i, /presidente do brasil|presidente da rep/i],
  [/Vice-Governador/i, /vice-governador/i], [/Governador/i, /^governador/i],
  [/Senador/i, /senador/i], [/Deputad. Federal/i, /deputad[oa()]* federal/i],
  [/Deputad. (Estadual|Distrital)/i, /deputad[oa()]* (estadual|distrital)|assembleia/i],
  [/Vice-Prefeit/i, /vice-prefeit/i], [/Prefeit/i, /^prefeit/i], [/Vereador/i, /vereador/i]
];

(async () => {
  const { list, save } = loadCandidates();
  const keys = new Set(); list.forEach(c => { keys.add(norm(c.name)); keys.add(norm(c.ballotName)); });

  console.log('TSE 2026...');
  const t26 = await loadTse(2026, keys, r => !/VICE|SUPLENTE/.test(norm(r.DS_CARGO)), true);
  console.log('TSE 2022...');
  const t22 = await loadTse(2022, keys);
  console.log('TSE 2024...');
  const t24 = await loadTse(2024, keys);
  console.log(`TSE: 2026=${t26.total} linhas, 2022=${t22.total}, 2024=${t24.total}`);
  if (t26.total < 20000 || t22.total < 25000 || t24.total < 400000) throw new Error('Arquivo do TSE incompleto; abortando sem gravar.');

  // 2026: uma linha por SQ_CANDIDATO (maior turno)
  const bySq = new Map();
  for (const r of t26.rows) { const p = bySq.get(r.SQ_CANDIDATO); if (!p || Number(r.NR_TURNO) > Number(p.NR_TURNO)) bySq.set(r.SQ_CANDIDATO, r); }
  const rows26 = [...bySq.values()];
  const eleitos22 = t22.rows.filter(r => ELEITO.test(r.DS_SIT_TOT_TURNO));
  const eleitos24 = t24.rows.filter(r => ELEITO.test(r.DS_SIT_TOT_TURNO));
  // 2022/2024 por SQ (maior turno) para pegar resultado final
  const lastTurn = rows => { const m = new Map(); for (const r of rows) { const p = m.get(r.SQ_CANDIDATO); if (!p || Number(r.NR_TURNO) > Number(p.NR_TURNO)) m.set(r.SQ_CANDIDATO, r); } return [...m.values()]; };
  const fin22 = lastTurn(t22.rows).filter(r => ELEITO.test(r.DS_SIT_TOT_TURNO));
  const fin24 = lastTurn(t24.rows).filter(r => ELEITO.test(r.DS_SIT_TOT_TURNO));
  void eleitos22; void eleitos24;

  console.log('Wikidata (secundária)...');
  let wd = new Map();
  try { wd = await loadWikidata(list); } catch (e) { console.warn('Wikidata indisponível:', e.message); }
  console.log(`Wikidata: ${wd.size} perfis identificados`);

  const report = { fontes: { tse2026: TSE_URL(2026), tse2022: TSE_URL(2022), tse2024: TSE_URL(2024), wikidata: 'https://query.wikidata.org/sparql' }, correcoes: [], revisar: [], resumo: {} };
  const cnt = { tse2026: 0, numero: 0, partido: 0, cargo: 0, status: {}, alertas: 0 };

  for (const c of list) {
    const changes = [];
    const alerts = [];
    const set = (field, to, fonte) => { if (String(c[field]) !== String(to)) { changes.push({ field, from: c[field], to, fonte }); c[field] = to; } };

    // ---- TSE 2026 ----
    // casamento forte (nome exato / urna+UF) em todos os anos antes de recorrer ao aproximado
    const strong = matchTse(c, rows26, false) || matchTse(c, fin24, false) || matchTse(c, fin22, false) || matchTse(c, t22.rows, false) || matchTse(c, t24.rows, false);
    const fz = !strong;
    const m26 = matchTse(c, rows26, fz);
    if (m26) {
      cnt.tse2026++;
      c.tse2026 = {
        cargo: cargoLabel(m26.DS_CARGO, fem(c, m26)), uf: m26.SG_UF, numero: m26.NR_CANDIDATO, partido: m26.SG_PARTIDO,
        situacaoTurno: m26.DS_SIT_TOT_TURNO, turno: Number(m26.NR_TURNO), sqCandidato: m26.SQ_CANDIDATO,
        situacaoCandidatura: m26.DS_SITUACAO_CANDIDATURA,
        fonte: 'TSE — Candidaturas 2026 (dados abertos)', consultadoEm: HOJE,
        url: `https://divulgacandcontas.tse.jus.br/divulga/#/candidato/2026/${m26.SG_UF === 'BR' ? 'BR' : m26.SG_UF}`
      };
      if (String(c.number) !== String(m26.NR_CANDIDATO)) { set('number', m26.NR_CANDIDATO, 'TSE 2026'); cnt.numero++; }
      if (normParty(c.party) !== normParty(m26.SG_PARTIDO)) { set('party', m26.SG_PARTIDO, 'TSE 2026'); cnt.partido++; }
    } else if (c.tse2026) delete c.tse2026;

    // ---- mandato atual ----
    const m24 = matchTse(c, fin24, fz);
    const m22 = matchTse(c, fin22, fz);
    const anyTse = strong || m26 || m24 || m22;
    const w = wd.get(c.id);
    const dv = c.dataVerification;
    let status = null;

    if (w && w.death) {
      status = { situacao: 'falecido', mandatoAtual: `Falecido em ${w.death.split('-').reverse().join('/')}`, fonte: 'Wikidata (secundária, P570)', dataObito: w.death };
      alerts.push({ tipo: 'obito', mensagem: `Wikidata registra óbito em ${w.death}. Perfil marcado como falecido; confirmar.`, fonte: `https://www.wikidata.org/wiki/${w.qid}` });
    } else if (dv && /Câmara|Senado/.test(dv.fonte || '')) {
      const casa = /Câmara/.test(dv.fonte);
      const sit = dv.situacao || (casa ? '' : 'Exercício');
      const label = casa ? cargoLabel('DEPUTADO FEDERAL', fem(c)) : cargoLabel('SENADOR', fem(c));
      const extra = { cargo: casa ? 'DEPUTADO FEDERAL' : 'SENADOR', uf: c.state, idOficial: dv.idOficial };
      if (/Exerc/i.test(sit)) status = { situacao: 'em_exercicio', mandatoAtual: `${label} (${c.state})`, fonte: dv.fonte, ...extra };
      else if (/Licen|Afast/i.test(sit)) status = { situacao: 'licenciado', mandatoAtual: `${label} (${c.state}) — ${sit}`, fonte: dv.fonte, ...extra };
      else status = { situacao: 'sem_mandato', mandatoAtual: `Sem mandato em exercício (${dv.fonte}: ${sit || 'situação não informada'})`, fonte: dv.fonte };
    }

    const desincompat = (row, ano) => titularExecutivo(row.DS_CARGO) && m26 && !(norm(m26.DS_CARGO) === norm(row.DS_CARGO) && (m26.SG_UF === row.SG_UF));
    if (!status && m24) {
      const lbl = `${cargoLabel(m24.DS_CARGO, fem(c, m24))} de ${titleCase(m24.NM_UE)} (${m24.SG_UF})`;
      if (desincompat(m24)) status = { situacao: 'sem_mandato', mandatoAtual: `Ex-${lbl}: deixou o cargo para disputar ${c.tse2026.cargo} em 2026 (desincompatibilização, CF art. 14 §6)`, fonte: 'TSE 2024 + TSE 2026' };
      else status = { situacao: 'em_exercicio', mandatoAtual: `${lbl}, mandato 2025–2028`, fonte: 'TSE — Eleições 2024 (eleito)', cargo: norm(m24.DS_CARGO), uf: m24.SG_UF, municipio: titleCase(m24.NM_UE) };
    }
    if (!status && m22) {
      const uf = m22.SG_UF === 'BR' ? '' : ` (${m22.SG_UF})`;
      const lbl = `${cargoLabel(m22.DS_CARGO, fem(c, m22))}${uf}`;
      if (desincompat(m22)) status = { situacao: 'sem_mandato', mandatoAtual: `Ex-${lbl}: deixou o cargo para disputar ${c.tse2026.cargo} em 2026 (desincompatibilização, CF art. 14 §6)`, fonte: 'TSE 2022 + TSE 2026' };
      else {
        status = { situacao: 'em_exercicio', mandatoAtual: `${lbl}, mandato 2023–2026`, fonte: 'TSE — Eleições 2022 (eleito)', cargo: norm(m22.DS_CARGO), uf: m22.SG_UF };
        if (/DEPUTADO FEDERAL|SENADOR/.test(norm(m22.DS_CARGO))) alerts.push({ tipo: 'exercicio_nao_confirmado', mensagem: `Eleito ${lbl} em 2022, mas o exercício não foi confirmado pela API da Casa (pode estar licenciado, p.ex. como ministro).`, fonte: TSE_URL(2022) });
      }
    }
    if (!status && anyTse) status = { situacao: 'sem_mandato', mandatoAtual: 'Sem mandato eletivo identificado no TSE (2022/2024) nem nas Casas', fonte: 'TSE 2022/2024/2026' };
    if (!status) status = { situacao: 'nao_verificado', mandatoAtual: null, fonte: null };
    status.verificadoEm = HOJE;

    // Wikidata: cargo atual divergente → alerta (nunca corrige)
    if (w && !w.death) {
      const cur = wikidataCurrent(w);
      const mand = status.mandatoAtual || '';
      const ok = cur.some(p => MANDATO_KEYWORDS.some(([a, b]) => a.test(mand) && b.test(p.label)));
      const naoEletivo = cur.filter(p => !MANDATO_KEYWORDS.some(([, b]) => b.test(p.label)) && !/presidente d[ao] (c[aâ]mara|senado)|l[ií]der/i.test(p.label));
      if (cur.length && !ok && status.situacao !== 'sem_mandato') {
        alerts.push({ tipo: 'cargo_atual', mensagem: `Wikidata indica cargo atual "${cur.map(p => p.label).join('; ')}", diferente de "${mand || 'não verificado'}".`, fonte: `https://www.wikidata.org/wiki/${w.qid}` });
      } else if (naoEletivo.length) {
        alerts.push({ tipo: 'cargo_atual', mensagem: `Wikidata indica cargo não eletivo em curso: ${naoEletivo.map(p => `${p.label} (desde ${p.start})`).join('; ')}.`, fonte: `https://www.wikidata.org/wiki/${w.qid}` });
      } else if (status.situacao === 'sem_mandato' && cur.length) {
        alerts.push({ tipo: 'cargo_atual', mensagem: `Sem mandato pelas fontes primárias, mas Wikidata indica "${cur.map(p => p.label).join('; ')}".`, fonte: `https://www.wikidata.org/wiki/${w.qid}` });
      }
    }
    if (/^Ex-/.test(c.position) && status.situacao === 'em_exercicio' && !/Câmara|Senado/.test(status.fonte)) alerts.push({ tipo: 'cargo_atual', mensagem: `O perfil estava marcado como "${c.position}", mas o TSE indica eleição para mandato ainda vigente (${status.mandatoAtual}). Confirmar se houve renúncia/cassação.`, fonte: status.fonte });
    if (status.situacao === 'nao_verificado') alerts.push({ tipo: 'sem_fonte', mensagem: 'Perfil não encontrado no TSE (2022/2024/2026), nas Casas nem no Wikidata; revisar manualmente.', fonte: null });

    // position = mandato atual (nunca o cargo disputado)
    let pos = c.position;
    if (status.situacao === 'em_exercicio' || status.situacao === 'licenciado') {
      pos = status.mandatoAtual.split(/ \(| de |,/)[0];
    } else if (status.situacao === 'falecido') {
      const prev = (m24 && cargoLabel(m24.DS_CARGO, fem(c, m24))) || (m22 && cargoLabel(m22.DS_CARGO, fem(c, m22))) || c.position.replace(/^Ex-/, '');
      pos = `Ex-${prev} (falecido)`;
    } else if (status.situacao === 'sem_mandato') {
      if (/^(Governador|Prefeit|Senador|Deputad|Vereador|Presidente|Vice)/.test(c.position)) {
        pos = m26 ? `${fem(c, m26) ? 'Candidata' : 'Candidato'} a ${c.tse2026.cargo} em 2026` : 'Sem mandato eletivo';
      }
    }
    if (pos !== c.position) { set('position', pos, status.fonte); cnt.cargo++; }

    c.status = status;
    cnt.status[status.situacao] = (cnt.status[status.situacao] || 0) + 1;
    // preserva alertas de outras fases
    const outros = (c.reviewAlerts || []).filter(a => !['obito', 'cargo_atual', 'sem_fonte', 'exercicio_nao_confirmado'].includes(a.tipo));
    c.reviewAlerts = [...outros, ...alerts];
    if (!c.reviewAlerts.length) delete c.reviewAlerts;
    cnt.alertas += alerts.length;
    if (changes.length) report.correcoes.push({ id: c.id, nome: c.ballotName, changes });
    if (alerts.length) report.revisar.push({ id: c.id, nome: c.ballotName, alertas: alerts });
  }

  report.resumo = cnt;
  console.log(JSON.stringify(cnt));
  if (cnt.tse2026 < 100) throw new Error(`Só ${cnt.tse2026} perfis casados no TSE 2026 (esperado ≥100); abortando sem gravar.`);
  if (dry) { fs.writeFileSync(tmpFile('identidade_dry.json'), JSON.stringify(report, null, 2)); return; }
  save();
  // preserva o histórico de correções de execuções anteriores (re-execuções não repetem a correção)
  const prev = ((loadReport().fases || {}).identidade || {}).correcoes || [];
  for (const p of prev) {
    const cur = report.correcoes.find(x => x.id === p.id);
    if (!cur) report.correcoes.push(p);
    else cur.changes = [...p.changes.filter(a => !cur.changes.some(b => b.field === a.field && b.to === a.to)), ...cur.changes];
  }
  writeReportSection('identidade', report);
  console.log('Fase 1 gravada.');
})().catch(e => { console.error(e); process.exit(1); });

function titleCase(s) {
  return String(s || '').toLowerCase().replace(/(^|\s)(\S)/g, (m, a, b) => a + b.toUpperCase()).replace(/\b(De|Da|Do|Das|Dos|E)\b/g, x => x.toLowerCase());
}
