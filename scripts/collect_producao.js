// Fase 3 — Produção legislativa e emendas.
//  Câmara: proposicoes-AAAA.csv + proposicoesAutores-AAAA.csv (2023–2026), PL/PLP/PEC com ordemAssinatura=1.
//  Senado: /dadosabertos/processo?codigoParlamentarAutor={id} (o serviço /senador/{id}/autorias está
//          descontinuado pelo próprio Senado); primeiro autor = primeiro nome do campo "autoria".
//  Emendas: Portal da Transparência (EmendasParlamentares.csv), por "Nome do Autor da Emenda".
// Downloads grandes vão para o diretório temporário (scripts/lib/tmp.js), nunca para data/.
// Uso: node scripts/collect_producao.js [--dry]
const fs = require('node:fs');
const { loadCandidates, writeReportSection, getJson, sleep, norm } = require('./lib/data_io');
const { listEntries, readEntry, downloadToFile } = require('./lib/zip');
const { csvRows, brNum } = require('./lib/csv');
const { tmpFile } = require('./lib/tmp');
const { GRUPOS, indicador, setIndicator, casaDe, brl, pct } = require('./lib/indicators');

const dry = process.argv.includes('--dry');
const ANOS = [2023, 2024, 2025, 2026].filter(a => a <= new Date().getFullYear());
const INICIO_LEG = '2023-02-01';
const TIPOS = new Set(['PL', 'PLP', 'PEC']);
const ANO_EMENDAS = new Date().getFullYear() - 1;
const camaraUrl = (k, a) => `https://dadosabertos.camara.leg.br/arquivos/${k}/csv/${k}-${a}.csv`;
const EMENDAS_URL = 'https://portaldatransparencia.gov.br/download-de-dados/emendas-parlamentares/UNICO';

function* objRows(text) {
  let h = null;
  for (const r of csvRows(text)) { if (!h) { h = r; continue; } const o = {}; for (let i = 0; i < h.length; i++) o[h[i]] = r[i]; yield o; }
}
const ordenaDestaques = (a, b) => (b.lei - a.lei) || String(b.data).localeCompare(String(a.data));

async function camara(list, rep) {
  const ids = new Map();
  for (const c of list) { const k = casaDe(c); if (k && k.casa === 'camara') ids.set(k.id, c); }
  const props = new Map();
  const autorias = new Map(); // idDeputado -> Set(idProposicao)
  for (const ano of ANOS) {
    const fp = await downloadToFile(camaraUrl('proposicoes', ano), tmpFile(`proposicoes-${ano}.csv`));
    let n = 0;
    for (const o of objRows(fs.readFileSync(fp, 'utf8'))) {
      n++;
      if (!TIPOS.has(o.siglaTipo) || (o.dataApresentacao || '') < INICIO_LEG) continue;
      props.set(o.id, { sigla: o.siglaTipo, numero: o.numero, ano: Number(o.ano), ementa: o.ementa, situacao: o.ultimoStatus_descricaoSituacao || 'Sem situação informada', data: o.dataApresentacao, url: `https://www.camara.leg.br/propostas-legislativas/${o.id}` });
    }
    const fa = await downloadToFile(camaraUrl('proposicoesAutores', ano), tmpFile(`proposicoesAutores-${ano}.csv`));
    let na = 0;
    for (const o of objRows(fs.readFileSync(fa, 'utf8'))) {
      na++;
      if (o.ordemAssinatura !== '1' || !ids.has(o.idDeputadoAutor)) continue;
      if (!autorias.has(o.idDeputadoAutor)) autorias.set(o.idDeputadoAutor, new Set());
      autorias.get(o.idDeputadoAutor).add(o.idProposicao);
    }
    rep.camara.arquivos.push({ ano, proposicoes: n, autores: na });
    if (n < 5000 || na < 5000) throw new Error(`Câmara ${ano}: arquivo de proposições incompleto (${n}/${na}); abortando sem gravar.`);
  }
  for (const [id, c] of ids) {
    const lista = [...(autorias.get(id) || [])].map(p => props.get(p)).filter(Boolean)
      .map(p => ({ ...p, lei: /Transformad[oa] em Norma Jur[íi]dica/i.test(p.situacao) ? 1 : 0 }));
    const leis = lista.filter(p => p.lei).length;
    const porTipo = ['PL', 'PLP', 'PEC'].map(t => `${lista.filter(p => p.sigla === t).length} ${t}`).join(', ');
    rep.camara.comDado++;
    const ind = indicador({
      valor: lista.length, unidade: 'qtd', rotulo: 'Proposições como primeiro autor',
      detalhe: `${lista.length} proposições (${porTipo}) apresentadas como primeiro autor desde fev/2023; ${leis} ${leis === 1 ? 'transformada' : 'transformadas'} em norma jurídica.`,
      grupoComparacao: GRUPOS.camara, fonte: 'Câmara dos Deputados — arquivos de proposições e autores (dados abertos)',
      url: `https://www.camara.leg.br/busca-portal/proposicoes/pesquisa-simplificada?autor=${id}`, ano: Math.max(...ANOS),
      transformadasEmLei: leis, periodo: `${INICIO_LEG} a hoje`
    });
    ind.destaques = lista.sort(ordenaDestaques).slice(0, 5).map(({ sigla, numero, ano, ementa, situacao, url }) => ({ sigla, numero, ano, ementa, situacao, url }));
    setIndicator(c, 'producaoLegislativa', ind);
  }
}

async function senado(list, rep) {
  for (const c of list) {
    const k = casaDe(c);
    if (!k || k.casa !== 'senado') continue;
    const j = await getJson(`https://legis.senado.leg.br/dadosabertos/processo?codigoParlamentarAutor=${k.id}&dataInicioApresentacao=${INICIO_LEG}`);
    await sleep(300);
    if (!Array.isArray(j)) { rep.senado.falhas.push(c.id); continue; }
    const nome = norm((c.dataVerification && c.dataVerification.nomeParlamentar) || c.ballotName);
    const lista = j.filter(p => TIPOS.has(String(p.identificacao || '').split(' ')[0]))
      .filter(p => { const primeiro = String(p.autoria || '').split(',')[0]; return norm(primeiro.replace(/\(.*$/, '')).replace(/^SENADORA? /, '') === nome; })
      .map(p => {
        const [sigla, nAno] = String(p.identificacao).split(' ');
        const [numero, ano] = (nAno || '').split('/');
        const situacao = p.situacaoAtual || p.siglaTipoDeliberacao || 'Sem situação informada';
        return { sigla, numero, ano: Number(ano), ementa: p.ementa, situacao, data: p.dataApresentacao, url: `https://www25.senado.leg.br/web/atividade/materias/-/materia/${p.codigoMateria}`, lei: /NORMA|TRANSFORMAD/i.test(situacao + ' ' + (p.siglaTipoDeliberacao || '')) ? 1 : 0 };
      });
    const leis = lista.filter(p => p.lei).length;
    rep.senado.comDado++;
    const ind = indicador({
      valor: lista.length, unidade: 'qtd', rotulo: 'Proposições como primeiro autor',
      detalhe: `${lista.length} proposições (PL, PLP e PEC) apresentadas como primeiro autor desde fev/2023; ${leis} ${leis === 1 ? 'transformada' : 'transformadas'} em norma jurídica.`,
      grupoComparacao: GRUPOS.senado, fonte: 'Senado Federal — dados abertos de processos legislativos',
      url: `https://www25.senado.leg.br/web/senadores/senador/-/perfil/${k.id}`, ano: Math.max(...ANOS),
      transformadasEmLei: leis, periodo: `${INICIO_LEG} a hoje`
    });
    ind.destaques = lista.sort(ordenaDestaques).slice(0, 5).map(({ sigla, numero, ano, ementa, situacao, url }) => ({ sigla, numero, ano, ementa, situacao, url }));
    setIndicator(c, 'producaoLegislativa', ind);
  }
}

async function emendas(list, rep) {
  const zp = await downloadToFile(EMENDAS_URL, tmpFile('emendas.zip'));
  const buf = fs.readFileSync(zp);
  const ent = listEntries(buf).find(e => /^EmendasParlamentares\.csv$/i.test(e.name));
  if (!ent) throw new Error('Emendas: EmendasParlamentares.csv ausente no ZIP; abortando.');
  const porAutor = new Map(); let n = 0;
  for (const o of objRows(readEntry(buf, ent).toString('latin1'))) {
    n++;
    if (o['Ano da Emenda'] !== String(ANO_EMENDAS)) continue;
    const k = norm(o['Nome do Autor da Emenda']);
    const e = porAutor.get(k) || { empenhado: 0, pago: 0, pix: 0, qtd: 0, codigo: o['Código do Autor da Emenda'] };
    const emp = brNum(o['Valor Empenhado']);
    e.empenhado += emp;
    e.pago += brNum(o['Valor Pago']) + brNum(o['Valor Restos A Pagar Pagos']);
    if (/Transfer[êe]ncias Especiais/i.test(o['Tipo de Emenda'])) e.pix += emp;
    e.qtd++;
    porAutor.set(k, e);
  }
  rep.emendas.linhas = n; rep.emendas.autoresNoAno = porAutor.size;
  if (n < 50000 || porAutor.size < 400) throw new Error(`Emendas: arquivo incompleto (${n} linhas, ${porAutor.size} autores em ${ANO_EMENDAS}); abortando sem gravar.`);
  for (const c of list) {
    const k = casaDe(c);
    if (!k) continue;
    const nomes = [c.dataVerification.nomeParlamentar, c.ballotName].filter(Boolean).map(norm);
    const e = nomes.map(x => porAutor.get(x)).find(Boolean);
    if (!e) { rep.emendas.semCorrespondencia.push(c.id); setIndicator(c, 'emendas', null); continue; }
    rep.emendas.comDado++;
    const pixPct = e.empenhado ? pct(e.pix, e.empenhado) : 0;
    setIndicator(c, 'emendas', indicador({
      valor: Math.round(e.pago * 100) / 100, unidade: 'R$', rotulo: `Emendas pagas em ${ANO_EMENDAS}`,
      detalhe: `${brl(e.pago)} pagos (inclui restos a pagar) de ${brl(e.empenhado)} empenhados em ${e.qtd} emendas de ${ANO_EMENDAS}; ${pixPct.toLocaleString('pt-BR')}% do empenhado em Transferências Especiais ("emenda Pix").`,
      grupoComparacao: k.casa === 'camara' ? GRUPOS.camara : GRUPOS.senado,
      fonte: 'Portal da Transparência (CGU) — emendas parlamentares', url: 'https://portaldatransparencia.gov.br/emendas/consulta?autor=' + encodeURIComponent(e.codigo), ano: ANO_EMENDAS,
      empenhado: Math.round(e.empenhado * 100) / 100, transferenciasEspeciaisPct: pixPct, codigoAutor: e.codigo
    }));
  }
}

(async () => {
  const { list, save } = loadCandidates();
  const rep = { camara: { arquivos: [], comDado: 0 }, senado: { comDado: 0, falhas: [] }, emendas: { ano: ANO_EMENDAS, comDado: 0, semCorrespondencia: [] } };
  await camara(list, rep);
  await senado(list, rep);
  await emendas(list, rep);
  const nSen = list.filter(c => (casaDe(c) || {}).casa === 'senado').length;
  console.log(JSON.stringify({ camara: rep.camara.comDado, senado: rep.senado.comDado, senadoFalhas: rep.senado.falhas.length, emendas: rep.emendas.comDado, emendasSem: rep.emendas.semCorrespondencia.length }));
  if (nSen && rep.senado.comDado < nSen * 0.7) throw new Error('Senado: menos de 70% dos senadores com processos; abortando sem gravar.');
  if (dry) return;
  save();
  writeReportSection('producaoEmendas', rep);
})().catch(e => { console.error(e); process.exit(1); });
