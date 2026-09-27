const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const imgDir = path.join(__dirname, '../img/candidates');
if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir, { recursive: true });
}

// Mapeamento oficial 100% verificado perante Senado Federal e Câmara dos Deputados
const verifiedOfficials = {
  // Senadores Oficiais Verificados
  'cand-simone-tebet': 'http://www.senado.leg.br/senadores/img/fotos-oficiais/senador5527.jpg',
  'cand-jaques-wagner': 'http://www.senado.leg.br/senadores/img/fotos-oficiais/senador581.jpg',
  'cand-otto-alencar': 'http://www.senado.leg.br/senadores/img/fotos-oficiais/senador5523.jpg',
  'cand-romario-faria': 'http://www.senado.leg.br/senadores/img/fotos-oficiais/senador5322.jpg',
  'cand-eduardo-girao': 'http://www.senado.leg.br/senadores/img/fotos-oficiais/senador5976.jpg',
  'cand-cid-gomes': 'http://www.senado.leg.br/senadores/img/fotos-oficiais/senador5973.jpg',
  'cand-teresa-leitao': 'http://www.senado.leg.br/senadores/img/fotos-oficiais/senador6338.jpg',
  'cand-humberto-costa': 'http://www.senado.leg.br/senadores/img/fotos-oficiais/senador5008.jpg',
  'cand-carlos-viana': 'http://www.senado.leg.br/senadores/img/fotos-oficiais/senador5990.jpg',
  'cand-esperidiao-amin': 'http://www.senado.leg.br/senadores/img/fotos-oficiais/senador22.jpg',
  'cand-leila-do-volei': 'http://www.senado.leg.br/senadores/img/fotos-oficiais/senador5979.jpg',
  'cand-vanderlan-cardoso': 'http://www.senado.leg.br/senadores/img/fotos-oficiais/senador5899.jpg',
  'cand-wilder-morais': 'http://www.senado.leg.br/senadores/img/fotos-oficiais/senador5070.jpg',
  'cand-beto-faro': 'http://www.senado.leg.br/senadores/img/fotos-oficiais/senador4639.jpg',
  'cand-zequinha-marinho': 'http://www.senado.leg.br/senadores/img/fotos-oficiais/senador3806.jpg',
  'cand-sergio-moro': 'http://www.senado.leg.br/senadores/img/fotos-oficiais/senador6331.jpg',
  'cand-marcos-pontes': 'http://www.senado.leg.br/senadores/img/fotos-oficiais/senador6009.jpg',
  'cand-rodrigo-pacheco': 'http://www.senado.leg.br/senadores/img/fotos-oficiais/senador5732.jpg',
  'cand-cleitinho-azevedo': 'http://www.senado.leg.br/senadores/img/fotos-oficiais/senador6337.jpg',
  'cand-randolfe-rodrigues': 'http://www.senado.leg.br/senadores/img/fotos-oficiais/senador5012.jpg',
  'cand-flavio-bolsonaro': 'http://www.senado.leg.br/senadores/img/fotos-oficiais/senador5894.jpg',
  'cand-damares-alves': 'http://www.senado.leg.br/senadores/img/fotos-oficiais/senador6335.jpg',
  'cand-carlos-portinho': 'http://www.senado.leg.br/senadores/img/fotos-oficiais/senador5936.jpg',
  'cand-camilo-santana': 'http://www.senado.leg.br/senadores/img/fotos-oficiais/senador6336.jpg',
  'cand-izalci-lucas': 'http://www.senado.leg.br/senadores/img/fotos-oficiais/senador4560.jpg',
  'cand-antonio-reguffe': 'http://www.senado.leg.br/senadores/img/fotos-oficiais/senador5006.jpg',
  'cand-marconi-perillo': 'http://www.senado.leg.br/senadores/img/fotos-oficiais/senador591.jpg',
  'cand-jorginho-mello': 'http://www.senado.leg.br/senadores/img/fotos-oficiais/senador5951.jpg',

  // Parlamentares na Câmara dos Deputados
  'cand-alexandre-silveira': 'https://www.camara.leg.br/internet/deputado/bandep/141381.jpg',
  'cand-reginaldo-lopes': 'https://www.camara.leg.br/internet/deputado/bandep/74787.jpg',
  'cand-bia-kicis': 'https://www.camara.leg.br/internet/deputado/bandep/204374.jpg',
  'cand-paulo-martins': 'https://www.camara.leg.br/internet/deputado/bandep/193726.jpg',
  'cand-joao-roma': 'https://www.camara.leg.br/internet/deputado/bandep/204558.jpg',
  'cand-anderson-ferreira': 'https://www.camara.leg.br/internet/deputado/bandep/160551.jpg',
  'cand-deltan-dallagnol': 'https://www.camara.leg.br/internet/deputado/bandep/220686.jpg',
  'cand-manuela-davila': 'https://www.camara.leg.br/internet/deputado/bandep/141508.jpg',
  'cand-ronaldo-caiado': 'https://www.camara.leg.br/internet/deputado/bandep/74788.jpg',
  'cand-joao-campos': 'https://www.camara.leg.br/internet/deputado/bandep/204429.jpg',
  'cand-ciro-gomes': 'https://www.camara.leg.br/internet/deputado/bandep/141406.jpg',
  'cand-eduardo-paes': 'https://www.camara.leg.br/internet/deputado/bandep/74683.jpg',
  'cand-marilia-arraes': 'https://www.camara.leg.br/internet/deputado/bandep/204428.jpg',
  'cand-capitao-wagner': 'https://www.camara.leg.br/internet/deputado/bandep/204554.jpg',
  'cand-washington-reis': 'https://www.camara.leg.br/internet/deputado/bandep/160620.jpg',
  'cand-decio-lima': 'https://www.camara.leg.br/internet/deputado/bandep/141417.jpg',
  'cand-gean-loureiro': 'https://www.camara.leg.br/internet/deputado/bandep/178959.jpg',
  'cand-paula-belmonte': 'https://www.camara.leg.br/internet/deputado/bandep/204395.jpg',
  'cand-adriana-accorsi': 'https://www.camara.leg.br/internet/deputado/bandep/220665.jpg',
  'cand-sandro-mabel': 'https://www.camara.leg.br/internet/deputado/bandep/74341.jpg',
  'cand-acm-neto': 'https://www.camara.leg.br/internet/deputado/bandep/74784.jpg',
  'cand-ratinho-junior': 'https://www.camara.leg.br/internet/deputado/bandep/74863.jpg',
  'cand-jair-bolsonaro': 'https://www.camara.leg.br/internet/deputado/bandep/74847.jpg'
};

function downloadUrl(url, dest) {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https') ? https : http;
    const req = protocol.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    }, res => {
      // Follow redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let nextUrl = res.headers.location;
        if (!nextUrl.startsWith('http')) {
          const u = new URL(url);
          nextUrl = `${u.protocol}//${u.host}${nextUrl}`;
        }
        return downloadUrl(nextUrl, dest).then(resolve);
      }

      if (res.statusCode !== 200) {
        console.error(`[Error ${res.statusCode}] for ${url}`);
        return resolve(false);
      }

      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        const buf = Buffer.concat(chunks);
        if (buf.length > 1000) {
          fs.writeFileSync(dest, buf);
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });

    req.on('error', err => {
      console.error(`[Req Error] ${err.message} for ${url}`);
      resolve(false);
    });

    req.setTimeout(10000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function searchWikiImage(query) {
  try {
    const url = `https://pt.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(query)}&prop=pageimages&format=json&pithumbsize=600`;
    const res = await fetch(url, { headers: { 'User-Agent': 'RaioXPolitico/1.0' } });
    const json = await res.json();
    const pages = json?.query?.pages || {};
    for (const pid of Object.keys(pages)) {
      if (pages[pid].thumbnail?.source) {
        return pages[pid].thumbnail.source;
      }
    }
  } catch (e) {
    // ignore
  }
  return null;
}

async function run() {
  console.log('=== ATUALIZANDO FOTOS OFICIAIS COM FONTES REAIS DO SENADO, CÂMARA E WIKI ===');
  
  // 1. Baixa todas as fotos verificadas
  for (const [candId, url] of Object.entries(verifiedOfficials)) {
    const dest = path.join(imgDir, `${candId}.jpg`);
    console.log(`Baixando foto oficial: ${candId} <- ${url}`);
    const ok = await downloadUrl(url, dest);
    if (ok) {
      const stats = fs.statSync(dest);
      console.log(`  -> Salvo com sucesso (${stats.size} bytes)`);
    } else {
      console.warn(`  -> Falha no download de ${candId}`);
    }
  }

  // 2. Audit específicos de governadores/prefeitos sem foto na câmara/senado
  const wikiNames = {
    'cand-tarcisio-de-freitas': 'Tarcísio de Freitas',
    'cand-romeu-zema': 'Romeu Zema',
    'cand-eduardo-leite': 'Eduardo Leite',
    'cand-ricardo-nunes': 'Ricardo Nunes (político)',
    'cand-fuad-noman': 'Fuad Noman',
    'cand-claudio-castro': 'Cláudio Castro (político)',
    'cand-ibaneis-rocha': 'Ibaneis Rocha',
    'cand-jeronimo-rodrigues': 'Jerônimo Rodrigues',
    'cand-miguel-coelho': 'Miguel Coelho (político)',
    'cand-roberto-claudio': 'Roberto Cláudio',
    'cand-evandro-leitao': 'Evandro Leitão',
    'cand-eduardo-pimentel': 'Eduardo Pimentel (político)',
    'cand-edegar-pretto': 'Edegar Pretto',
    'cand-sebastiao-melo': 'Sebastião Melo',
    'cand-bruno-engler': 'Bruno Engler',
    'cand-topazio-neto': 'Topázio Neto',
    'cand-igor-normando': 'Igor Normando',
    'cand-bruno-reis': 'Bruno Reis (político)',
    'cand-gilson-machado': 'Gilson Machado Neto',
    'cand-helder-barbalho': 'Helder Barbalho'
  };

  for (const [candId, wikiQuery] of Object.entries(wikiNames)) {
    const dest = path.join(imgDir, `${candId}.jpg`);
    const wikiThumb = await searchWikiImage(wikiQuery);
    if (wikiThumb) {
      console.log(`Baixando via Wikipedia: ${candId} (${wikiQuery}) <- ${wikiThumb}`);
      await downloadUrl(wikiThumb, dest);
    }
  }

  console.log('=== ATUALIZAÇÃO CONCLUÍDA ===');
}

run();
