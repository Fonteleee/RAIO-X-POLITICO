const fs = require('fs');
const path = require('path');

const newCandidatePhotos = {
  'cand-marina-helena': 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Marina_Helena_home_%28cropped%29.jpg',
  'cand-lucas-pavanato': 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Lucas_Pavanato.jpg',
  'cand-amanda-vettorazzo': 'https://upload.wikimedia.org/wikipedia/commons/6/62/Amanda_Vettrazo_em_2024.jpg',
  'cand-celso-russomanno': 'https://www.camara.leg.br/internet/deputado/bandep/73441.jpg',
  'cand-carlos-zarattini': 'https://www.camara.leg.br/internet/deputado/bandep/141398.jpg',
  'cand-alexandre-ramagem': 'https://www.camara.leg.br/internet/deputado/bandep/220559.jpg',
  'cand-pedro-paulo': 'https://www.camara.leg.br/internet/deputado/bandep/122974.jpg',
  'cand-carlos-jordy': 'https://www.camara.leg.br/internet/deputado/bandep/204462.jpg',
  'cand-dani-cunha': 'https://www.camara.leg.br/internet/deputado/bandep/220563.jpg',
  'cand-alvaro-damiao': 'https://upload.wikimedia.org/wikipedia/commons/a/aa/14_04_2025_-_Encontro_com_%C3%81lvaro_Dami%C3%A3o%2C_Prefeito_de_Belo_Horizonte_%2854453669608%29_%28cropped%29.jpg',
  'cand-bella-goncalves': 'https://upload.wikimedia.org/wikipedia/commons/6/65/2024_BELLA_GON%C3%87ALVES_CANDIDATO_VICE-PREFEITO_MG_BELO_HORIZONTE_TSE_%28130002172273%29.jpg',
  'cand-junio-amaral': 'https://www.camara.leg.br/internet/deputado/bandep/204373.jpg',
  'cand-eros-biondini': 'https://www.camara.leg.br/internet/deputado/bandep/160640.jpg',
  'cand-olivia-santana': 'https://upload.wikimedia.org/wikipedia/commons/5/5f/2023-03-30_Semin%C3%A1rio_-_Cuidar%2C_Verbo_Transitivo_06_%28cropped%29.jpg',
  'cand-leo-prates': 'https://www.camara.leg.br/internet/deputado/bandep/220551.jpg',
  'cand-pastor-sargento-isidorio': 'https://www.camara.leg.br/internet/deputado/bandep/204565.jpg',
  'cand-katia-oliveira': 'https://upload.wikimedia.org/wikipedia/commons/8/84/FBA50001648299_div_Katia_Oliveira.jpg',
  'cand-carmelo-neto': 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Cneto2.jpg',
  'cand-priscila-costa': 'https://upload.wikimedia.org/wikipedia/commons/8/87/Discuss%C3%A3o_e_vota%C3%A7%C3%A3o_de_propostas._Dep._Priscila_Costa_%28PL_-_CE%29_%28cropped%29.jpg',
  'cand-celio-studart': 'https://www.camara.leg.br/internet/deputado/bandep/204555.jpg',
  'cand-eunicio-oliveira': 'https://www.camara.leg.br/internet/deputado/bandep/74786.jpg',
  'cand-ney-leprevost': 'https://upload.wikimedia.org/wikipedia/commons/9/94/Ney_Leprevost_%2832216964898%29_%28cropped2%29.jpg',
  'cand-maria-victoria': 'https://upload.wikimedia.org/wikipedia/commons/c/cb/2024_Maria_Victoria_Barros_%28cropped%2901.jpg',
  'cand-guilherme-kilter': 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Guilherme_Kilter_em_2024.jpg',
  'cand-dani-portela': 'https://upload.wikimedia.org/wikipedia/commons/2/24/DANIPORTELAALEPE.jpg',
  'cand-pedro-campos': 'https://www.camara.leg.br/internet/deputado/bandep/220677.jpg',
  'cand-maria-arraes': 'https://www.camara.leg.br/internet/deputado/bandep/220674.jpg',
  'cand-felipe-camozzato': 'https://upload.wikimedia.org/wikipedia/commons/7/76/Sess%C3%A3o_Solene_de_outorga_do_t%C3%ADtulo_de_Cidad%C3%A3o_de_Porto_Alegre_a_Felipe_Camozzato_13_%28cropped%29.jpg',
  'cand-comandante-nadia': 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Cerim%C3%B4nia_de_posse_da_presidente_Comandante_N%C3%A1dia_como_prefeita_de_Porto_Alegre_EDE_8554_%28cropped%29.jpg',
  'cand-jesse-sangalli': 'https://upload.wikimedia.org/wikipedia/commons/f/f0/JCM6214_Posse_da_Legislatura_2025-2028_e_do_Prefeito_Sebasti%C3%A3o_Melo_-_Retrato_Vereador_Jess%C3%A9_Sangali.jpg',
  'cand-david-almeida': 'https://upload.wikimedia.org/wikipedia/commons/f/f0/David_Almeida.jpg',
  'cand-amom-mandel': 'https://www.camara.leg.br/internet/deputado/bandep/220575.jpg',
  'cand-capitao-alberto-neto': 'https://www.camara.leg.br/internet/deputado/bandep/204561.jpg',
  'cand-eduardo-braga': 'https://www.senado.leg.br/senadores/img/fotos-oficiais/senador5002.jpg',
  'cand-fred-rodrigues': 'https://upload.wikimedia.org/wikipedia/commons/7/73/2024_FRED_RODRIGUES_CANDIDATO_PREFEITO_GO_GOI%C3%82NIA_TSE_%2890002008544%29.jpg',
  'cand-major-vitor-hugo': 'https://www.camara.leg.br/internet/deputado/bandep/204377.jpg'
};

async function download(url, dest) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'RaioXPolitico/1.0 (contact@raioxpolitico.org)' } });
    if (!res.ok) {
      console.log('FAIL HTTP', res.status, url);
      return false;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 1000) {
      console.log('FAIL SIZE', buf.length, url);
      return false;
    }
    fs.writeFileSync(dest, buf);
    console.log('OK', path.basename(dest), buf.length, 'bytes');
    return true;
  } catch(e) {
    console.log('FAIL ERR', e.message, url);
    return false;
  }
}

async function run() {
  console.log('Baixando fotos dos 36 novos candidatos...');
  let ok = 0;
  for (const [id, url] of Object.entries(newCandidatePhotos)) {
    const dest = path.join(__dirname, '..', 'img', 'candidates', id + '.jpg');
    const res = await download(url, dest);
    if (res) ok++;
  }
  console.log(`Concluído: ${ok}/${Object.keys(newCandidatePhotos).length} fotos baixadas com sucesso.`);
}

run();
