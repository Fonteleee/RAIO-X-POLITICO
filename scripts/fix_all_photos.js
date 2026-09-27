const fs = require('fs');
const path = require('path');

const candidatesFile = path.join(__dirname, '../data/candidates.js');
const imgDir = path.join(__dirname, '../img/candidates');
if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir, { recursive: true });
}

async function fetchWithRetry(url, options = {}, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, options);
      if (res.ok) return res;
      if (res.status === 404) return null;
    } catch (e) {
      if (i === retries - 1) throw e;
    }
    await new Promise(r => setTimeout(r, 500 * (i + 1)));
  }
  return null;
}

async function downloadImage(url, destPath) {
  try {
    const res = await fetchWithRetry(url, {
      headers: {
        'User-Agent': 'RaioXPolitico/2.0 (contact@raioxpolitico.org; CivicDataProject)'
      }
    });
    if (!res || !res.ok) return false;
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    if (buffer.length < 500) return false;
    fs.writeFileSync(destPath, buffer);
    return true;
  } catch (e) {
    console.error(`Error downloading ${url}:`, e.message);
    return false;
  }
}

async function getSenatorsMap() {
  const map = new Map();
  try {
    const res = await fetch('https://legis.senado.leg.br/dadosabertos/senador/lista/atual', {
      headers: { 'Accept': 'application/json' }
    });
    const data = await res.json();
    const parlamentares = data?.ListaParlamentarEmExercicio?.Parlamentares?.Parlamentar || [];
    for (const p of parlamentares) {
      const info = p.IdentificacaoParlamentar;
      if (!info) continue;
      const nomeCompleto = (info.NomeCompletoParlamentar || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const nomeParlamentar = (info.NomeParlamentar || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const foto = info.UrlFotoParlamentar;
      map.set(nomeCompleto, foto);
      map.set(nomeParlamentar, foto);
    }
  } catch (e) {
    console.warn('Could not fetch Senate list:', e.message);
  }
  return map;
}

async function searchWikipedia(name) {
  try {
    const searchUrl = `https://pt.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(name)}&limit=3&format=json`;
    const sRes = await fetchWithRetry(searchUrl, { headers: { 'User-Agent': 'RaioXPolitico/2.0' } });
    if (!sRes) return null;
    const sData = await sRes.json();
    const titles = sData[1] || [];
    for (const title of titles) {
      const qUrl = `https://pt.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=600`;
      const qRes = await fetchWithRetry(qUrl, { headers: { 'User-Agent': 'RaioXPolitico/2.0' } });
      if (!qRes) continue;
      const qData = await qRes.json();
      const pages = qData?.query?.pages || {};
      for (const pid of Object.keys(pages)) {
        if (pages[pid].thumbnail?.source) {
          return pages[pid].thumbnail.source;
        }
      }
    }
  } catch (e) {
    // ignore
  }
  return null;
}

async function main() {
  console.log('[Photo Pipeline] Starting complete audit and download of all 164 candidates...');
  const { candidatesData } = require(candidatesFile);
  const senateMap = await getSenatorsMap();

  let fixedCount = 0;
  let alreadyLocal = 0;

  // Custom known verified mappings for high profile candidates
  const explicitVerifiedUrls = {
    'cand-ciro-gomes': 'https://www.camara.leg.br/internet/deputado/bandep/141406.jpg', // Ciro Ferreira Gomes (141406)
    'cand-joao-campos': 'https://www.camara.leg.br/internet/deputado/bandep/204429.jpg', // João Henrique Campos
    'cand-marilia-arraes': 'https://www.camara.leg.br/internet/deputado/bandep/204428.jpg', // Marília Arraes
    'cand-luiz-philippe': 'https://www.camara.leg.br/internet/deputado/bandep/204526.jpg', // Luiz Philippe
    'cand-airton-faleiro': 'https://www.camara.leg.br/internet/deputado/bandep/204495.jpg', // Airton Faleiro
    'cand-jorge-goetten': 'https://www.camara.leg.br/internet/deputado/bandep/214694.jpg', // Jorge Goetten
    'cand-carol-de-toni': 'https://www.camara.leg.br/internet/deputado/bandep/204369.jpg', // Carol de Toni
    'cand-eduardo-paes': 'https://www.camara.leg.br/internet/deputado/bandep/74683.jpg', // Eduardo Paes
    'cand-lidice-da-mata': 'https://www.camara.leg.br/internet/deputado/bandep/139285.jpg', // Lídice da Mata
    'cand-beto-richa': 'https://www.camara.leg.br/internet/deputado/bandep/220683.jpg', // Beto Richa
    'cand-gustavo-gayer': 'https://www.camara.leg.br/internet/deputado/bandep/220568.jpg', // Gustavo Gayer
    'cand-alberto-fraga': 'https://www.camara.leg.br/internet/deputado/bandep/73579.jpg', // Alberto Fraga
    'cand-fernanda-melchionna': 'https://www.camara.leg.br/internet/deputado/bandep/204407.jpg', // Fernanda Melchionna
    'cand-bia-kicis': 'https://www.camara.leg.br/internet/deputado/bandep/204374.jpg', // Bia Kicis
    'cand-simone-tebet': 'http://www.senado.leg.br/senadores/img/fotos-oficiais/senador5529.jpg',
    'cand-otto-alencar': 'http://www.senado.leg.br/senadores/img/fotos-oficiais/senador5537.jpg',
    'cand-jaques-wagner': 'http://www.senado.leg.br/senadores/img/fotos-oficiais/senador5008.jpg',
    'cand-romario-faria': 'http://www.senado.leg.br/senadores/img/fotos-oficiais/senador5531.jpg',
    'cand-eduardo-girao': 'http://www.senado.leg.br/senadores/img/fotos-oficiais/senador5953.jpg',
    'cand-carlos-viana': 'http://www.senado.leg.br/senadores/img/fotos-oficiais/senador5954.jpg',
    'cand-cid-gomes': 'http://www.senado.leg.br/senadores/img/fotos-oficiais/senador5979.jpg',
    'cand-alexandre-silveira': 'https://www.camara.leg.br/internet/deputado/bandep/141381.jpg',
    'cand-cleitinho-azevedo': 'http://www.senado.leg.br/senadores/img/fotos-oficiais/senador6337.jpg',
    'cand-sergio-moro': 'http://www.senado.leg.br/senadores/img/fotos-oficiais/senador6331.jpg',
    'cand-marcos-pontes': 'http://www.senado.leg.br/senadores/img/fotos-oficiais/senador6009.jpg',
    'cand-rodrigo-pacheco': 'http://www.senado.leg.br/senadores/img/fotos-oficiais/senador5732.jpg',
    'cand-flavio-bolsonaro': 'http://www.senado.leg.br/senadores/img/fotos-oficiais/senador5894.jpg',
    'cand-teresa-leitao': 'http://www.senado.leg.br/senadores/img/fotos-oficiais/senador6019.jpg',
    'cand-humberto-costa': 'http://www.senado.leg.br/senadores/img/fotos-oficiais/senador5010.jpg',
    'cand-camilo-santana': 'http://www.senado.leg.br/senadores/img/fotos-oficiais/senador6336.jpg',
    'cand-marconi-perillo': 'http://www.senado.leg.br/senadores/img/fotos-oficiais/senador4531.jpg',
    'cand-beto-faro': 'http://www.senado.leg.br/senadores/img/fotos-oficiais/senador4639.jpg',
    'cand-zequinha-marinho': 'http://www.senado.leg.br/senadores/img/fotos-oficiais/senador5959.jpg',
    'cand-randolfe-rodrigues': 'http://www.senado.leg.br/senadores/img/fotos-oficiais/senador5012.jpg'
  };

  for (const cand of candidatesData) {
    const destFile = path.join(imgDir, `${cand.id}.jpg`);
    const localRel = `img/candidates/${cand.id}.jpg`;

    let targetUrl = explicitVerifiedUrls[cand.id];

    if (!targetUrl) {
      if (cand.avatar && cand.avatar.startsWith('http')) {
        targetUrl = cand.avatar;
      } else if (cand.avatar && cand.avatar.startsWith('img/')) {
        if (fs.existsSync(destFile) && fs.statSync(destFile).size > 1000) {
          alreadyLocal++;
          cand.avatar = localRel;
          continue;
        }
      }
    }

    if (!targetUrl) {
      const cleanName = cand.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      if (senateMap.has(cleanName)) {
        targetUrl = senateMap.get(cleanName);
      }
    }

    if (!targetUrl) {
      targetUrl = await searchWikipedia(cand.name);
    }

    if (targetUrl) {
      console.log(`[Downloading] ${cand.name} (${cand.id}) from ${targetUrl}`);
      const ok = await downloadImage(targetUrl, destFile);
      if (ok) {
        cand.avatar = localRel;
        fixedCount++;
      } else {
        console.warn(`[Download Failed] ${cand.name} - keeping ${cand.avatar}`);
      }
    }
  }

  // Update data/candidates.js
  let fileContent = fs.readFileSync(candidatesFile, 'utf8');
  for (const cand of candidatesData) {
    const regex = new RegExp(`("id":\\s*"${cand.id}"[\\s\\S]*?"avatar":\\s*")[^"]*(")`);
    fileContent = fileContent.replace(regex, `$1${cand.avatar}$2`);
  }
  fs.writeFileSync(candidatesFile, fileContent, 'utf8');

  console.log(`[Photo Pipeline] Done! Processed ${fixedCount} photos, ${alreadyLocal} already local.`);
}

main().catch(console.error);
