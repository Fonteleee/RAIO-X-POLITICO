#!/usr/bin/env node
// Raio-X Político - Pipeline Local de Fotos Oficiais de Candidatos
// Consulta a API do Wikipedia/Wikimedia com User-Agent oficial e baixa fotos JPEGs locais

const fs = require('fs');
const path = require('path');

const USER_AGENT = 'RaioXPolitico/1.0 (https://github.com/Fonteleee/RAIO-X-POLITICO; contact@raioxpolitico.org)';
const TARGET_DIR = path.join(__dirname, '..', 'img', 'candidates');

const WIKI_TITLE_MAP = {
  'cand-gilson-machado': 'Gilson Machado Neto',
  'cand-miguel-coelho': 'Miguel Coelho (político brasileiro)',
  'cand-leila-do-volei': 'Leila Barros',
  'cand-antonio-reguffe': 'José Reguffe',
  'cand-ratinho-junior': 'Ratinho Júnior',
  'cand-lula': 'Luiz Inácio Lula da Silva',
  'cand-gabriel-azevedo': 'COMMONS:File:Gabriel Sousa Marques de Azevedo.jpg'
};

const LOCAL_CANDIDATES = [
  'cand-ronaldo-caiado',
  'cand-bruno-reis',
  'cand-tarcisio-de-freitas',
  'cand-helder-barbalho',
  'cand-romeu-zema',
  'cand-eduardo-leite',
  'cand-ricardo-nunes',
  'cand-lula',
  'cand-fuad-noman',
  'cand-claudio-castro',
  'cand-ratinho-junior',
  'cand-jorginho-mello',
  'cand-ibaneis-rocha',
  'cand-damares-alves',
  'cand-jeronimo-rodrigues',
  'cand-leandro-de-jesus',
  'cand-gilson-machado',
  'cand-miguel-coelho',
  'cand-roberto-claudio',
  'cand-evandro-leitao',
  'cand-goura-nataraj',
  'cand-eduardo-pimentel',
  'cand-cristina-graeml',
  'cand-edegar-pretto',
  'cand-juliana-brizola',
  'cand-sebastiao-melo',
  'cand-carlos-portinho',
  'cand-gabriel-azevedo',
  'cand-mauro-tramonte',
  'cand-bruno-engler',
  'cand-gean-loureiro',
  'cand-topazio-neto',
  'cand-antidio-lunelli',
  'cand-esperidiao-amin',
  'cand-leila-do-volei',
  'cand-antonio-reguffe',
  'cand-izalci-lucas',
  'cand-vanderlan-cardoso',
  'cand-wilder-morais',
  'cand-igor-normando',
  'cand-tulio-gadelha'
];

async function fetchCandidateImage(candidate) {
  const id = candidate.id;
  if (id === 'cand-tulio-gadelha') {
    return 'https://www.camara.leg.br/internet/deputado/bandep/157130.jpg';
  }

  const title = WIKI_TITLE_MAP[id] || candidate.ballotName || candidate.name;

  if (title.startsWith('COMMONS:')) {
    const fileName = title.replace('COMMONS:', '');
    const url = 'https://commons.wikimedia.org/w/api.php?action=query&titles=' + encodeURIComponent(fileName) + '&prop=imageinfo&iiprop=url&format=json';
    const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT }, signal: AbortSignal.timeout(8000) });
    const data = await res.json();
    const p = Object.values(data.query.pages)[0];
    if (p && p.imageinfo && p.imageinfo[0]) {
      return p.imageinfo[0].url;
    }
  } else {
    const url = 'https://pt.wikipedia.org/w/api.php?action=query&titles=' + encodeURIComponent(title) + '&prop=pageimages&format=json&pithumbsize=500';
    const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT }, signal: AbortSignal.timeout(8000) });
    const data = await res.json();
    const p = Object.values(data.query.pages)[0];
    if (p && p.thumbnail && p.thumbnail.source) {
      return p.thumbnail.source;
    }
  }

  return null;
}

async function runPipeline() {
  console.log('[Pipeline de Fotos] Iniciando download e validação...');
  if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR, { recursive: true });
  }

  const { candidatesData } = require('../data/candidates.js');
  let successCount = 0;
  let errorCount = 0;

  for (const id of LOCAL_CANDIDATES) {
    const candidate = candidatesData.find(c => c.id === id);
    if (!candidate) {
      console.warn(`[Pipeline] Candidato não encontrado no catálogo: ${id}`);
      errorCount++;
      continue;
    }

    const destPath = path.join(TARGET_DIR, `${id}.jpg`);
    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 1000) {
      console.log(`[Pipeline] ✓ ${id} já possui imagem local válida (${fs.statSync(destPath).size} bytes)`);
      successCount++;
      continue;
    }

    try {
      const imgUrl = await fetchCandidateImage(candidate);
      if (!imgUrl) {
        throw new Error(`Imagem não encontrada na Wikipedia/Commons para: ${candidate.name}`);
      }

      const res = await fetch(imgUrl, {
        headers: { 'User-Agent': USER_AGENT },
        signal: AbortSignal.timeout(10000)
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status} ao baixar imagem de ${imgUrl}`);
      }

      const buffer = Buffer.from(await res.arrayBuffer());
      if (buffer.byteLength < 1000) {
        throw new Error(`Imagem muito pequena (${buffer.byteLength} bytes)`);
      }

      fs.writeFileSync(destPath, buffer);
      console.log(`[Pipeline] ✓ Baixado ${id}.jpg com sucesso (${buffer.byteLength} bytes)`);
      successCount++;
    } catch (err) {
      console.error(`[Pipeline] ✗ Erro ao processar ${id}:`, err.message);
      errorCount++;
    }
  }

  console.log(`[Pipeline] Finalizado: ${successCount} imagens OK, ${errorCount} erros.`);
  return { successCount, errorCount, total: LOCAL_CANDIDATES.length };
}

if (require.main === module) {
  runPipeline().then(r => {
    if (r.errorCount > 0) process.exit(1);
    process.exit(0);
  });
}

module.exports = { runPipeline, LOCAL_CANDIDATES };
