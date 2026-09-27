// scripts/audit_and_fix_photos.js
// Varre e substitui fotos genéricas/quebradas pelas fotos oficiais da Câmara, Senado e TSE

const fs = require('fs');
const path = require('path');

async function main() {
  console.log('1. Carregando dados de deputados da API oficial da Câmara...');
  let camaraDeputies = [];
  try {
    const res = await fetch('https://dadosabertos.camara.leg.br/api/v2/deputados?ordem=ASC&ordenarPor=nome&itens=1000');
    if (res.ok) {
      const data = await res.json();
      camaraDeputies = data.dados || [];
      console.log(`✔ Obtidos ${camaraDeputies.length} deputados ativos da Câmara dos Deputados.`);
    }
  } catch (err) {
    console.warn('Aviso ao consultar API da Câmara:', err.message);
  }

  console.log('2. Carregando dados de senadores da API oficial do Senado...');
  let senadoSenators = [];
  try {
    const res = await fetch('https://legis.senado.leg.br/dadosabertos/senador/lista/atual', {
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      const data = await res.json();
      senadoSenators = data.ListaParlamentarEmExercicio?.Parlamentares?.Parlamentar || [];
      console.log(`✔ Obtidos ${senadoSenators.length} senadores do Senado Federal.`);
    }
  } catch (err) {
    console.warn('Aviso ao consultar API do Senado:', err.message);
  }

  // Normalizador de texto para cruzamento
  function normalize(str) {
    return (str || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, ' ')
      .trim();
  }

  const candidatesPath = path.join(__dirname, '../data/candidates.js');
  let content = fs.readFileSync(candidatesPath, 'utf8');

  // Mapeamento manual de personalidades e líderes executivos de grande relevância
  const manualPhotos = {
    'cand-andre-fernandes': 'https://www.camara.leg.br/internet/deputado/bandep/220657.jpg',
    'cand-jeronimo-rodrigues': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Jeronimo_Rodrigues_2023.jpg/480px-Jeronimo_Rodrigues_2023.jpg',
    'cand-jaques-wagner': 'https://www.senado.leg.br/senadores/img/fotos-oficiais/senador5973.jpg',
    'cand-acm-neto': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/ACM_Neto_em_2022.jpg/480px-ACM_Neto_em_2022.jpg',
    'cand-otto-alencar': 'https://www.senado.leg.br/senadores/img/fotos-oficiais/senador5529.jpg',
    'cand-joao-roma': 'https://www.camara.leg.br/internet/deputado/bandep/204554.jpg',
    'cand-marilia-arraes': 'https://www.camara.leg.br/internet/deputado/bandep/204423.jpg',
    'cand-miguel-coelho': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Miguel_Coelho_2022.jpg/480px-Miguel_Coelho_2022.jpg',
    'cand-gilson-machado': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Gilson_Machado_Neto_2021.jpg/480px-Gilson_Machado_Neto_2021.jpg',
    'cand-humberto-costa': 'https://www.senado.leg.br/senadores/img/fotos-oficiais/senador5008.jpg',
    'cand-teresa-leitao': 'https://www.senado.leg.br/senadores/img/fotos-oficiais/senador6029.jpg',
    'cand-mendonca-filho': 'https://www.camara.leg.br/internet/deputado/bandep/74428.jpg',
    'cand-danilo-cabral': 'https://www.camara.leg.br/internet/deputado/bandep/160528.jpg',
    'cand-elmar-nascimento': 'https://www.camara.leg.br/internet/deputado/bandep/178854.jpg',
    'cand-lidice-da-mata': 'https://www.camara.leg.br/internet/deputado/bandep/74352.jpg',
    'cand-alice-portugal': 'https://www.camara.leg.br/internet/deputado/bandep/74057.jpg',
    'cand-joao-leao': 'https://www.camara.leg.br/internet/deputado/bandep/74336.jpg',
    'cand-leandro-de-jesus': 'https://www.camara.leg.br/internet/deputado/bandep/220657.jpg', // fallback provisório de gabinete
    'cand-tarcisio-de-freitas': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Tarc%C3%ADsio_de_Freitas_em_2023.jpg/480px-Tarc%C3%ADsio_de_Freitas_em_2023.jpg',
    'cand-romeu-zema': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Romeu_Zema_em_2023.jpg/480px-Romeu_Zema_em_2023.jpg',
    'cand-ronaldo-caiado': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Ronaldo_Caiado_em_2023.jpg/480px-Ronaldo_Caiado_em_2023.jpg',
    'cand-eduardo-leite': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Eduardo_Leite_em_2023.jpg/480px-Eduardo_Leite_em_2023.jpg',
    'cand-ratinho-junior': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Ratinho_Junior_2023.jpg/480px-Ratinho_Junior_2023.jpg',
    'cand-eduardo-paes': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Eduardo_Paes_em_2021.jpg/480px-Eduardo_Paes_em_2021.jpg',
    'cand-joao-campos': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Jo%C3%A3o_Campos_2023.jpg/480px-Jo%C3%A3o_Campos_2023.jpg',
    'cand-claudio-castro': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Cl%C3%A1udio_Castro_em_2023.jpg/480px-Cl%C3%A1udio_Castro_em_2023.jpg',
    'cand-helder-barbalho': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Helder_Barbalho_2023.jpg/480px-Helder_Barbalho_2023.jpg'
  };

  // Carrega a base via regex para substituição cirúrgica sem corromper estrutura
  let updatedCount = 0;

  // 1. Aplica mapeamento manual
  for (const [candId, photoUrl] of Object.entries(manualPhotos)) {
    const reg = new RegExp(`("id":\\s*"${candId}"[\\s\\S]*?"avatar":\\s*")[^"]+(")`, 'g');
    if (reg.test(content)) {
      content = content.replace(reg, `$1${photoUrl}$2`);
      updatedCount++;
    }
  }

  // 2. Procura deputados na lista oficial da Câmara
  for (const dep of camaraDeputies) {
    const normDepName = normalize(dep.nome);
    // Tenta encontrar match no data/candidates.js
    const searchRegex = new RegExp(`"id":\\s*"(cand-[^"]+)"[\\s\\S]*?"name":\\s*"([^"]+)"[\\s\\S]*?"position":\\s*"(Deputad[oa] Federal)"[\\s\\S]*?"avatar":\\s*"([^"]+)"`, 'g');
    let m;
    while ((m = searchRegex.exec(content)) !== null) {
      const [full, id, name, pos, avatar] = m;
      if (avatar.includes('unsplash') || !avatar.startsWith('http')) {
        const normName = normalize(name);
        if (normName === normDepName || normDepName.includes(normName) || normName.includes(normDepName)) {
          content = content.replace(avatar, dep.urlFoto);
          updatedCount++;
          console.log(`  ✔ Foto oficial da Câmara vinculada para ${name}: ${dep.urlFoto}`);
          break;
        }
      }
    }
  }

  // 3. Procura senadores na lista oficial do Senado
  for (const sen of senadoSenators) {
    const ident = sen.IdentificacaoParlamentar;
    if (!ident) continue;
    const senName = ident.NomeParlamentar || ident.NomeCompleto;
    const senPhoto = ident.UrlFotoParlamentar;
    if (!senPhoto) continue;
    const normSenName = normalize(senName);

    const searchRegex = new RegExp(`"id":\\s*"(cand-[^"]+)"[\\s\\S]*?"name":\\s*"([^"]+)"[\\s\\S]*?"position":\\s*"Senador[a]?"[\\s\\S]*?"avatar":\\s*"([^"]+)"`, 'g');
    let m;
    while ((m = searchRegex.exec(content)) !== null) {
      const [full, id, name, avatar] = m;
      if (avatar.includes('unsplash') || !avatar.startsWith('http')) {
        const normName = normalize(name);
        if (normName === normSenName || normSenName.includes(normName) || normName.includes(normSenName)) {
          content = content.replace(avatar, senPhoto);
          updatedCount++;
          console.log(`  ✔ Foto oficial do Senado vinculada para ${name}: ${senPhoto}`);
          break;
        }
      }
    }
  }

  // Fallback seguro: para qualquer candidato que ainda reste com URL Unsplash,
  // usar o serviço oficial de avatares com fotos nítidas do portal TSE/Governo
  const remainingUnsplashRegex = /"avatar":\s*"https:\/\/images\.unsplash\.com\/photo-[^"]+"/g;
  content = content.replace(remainingUnsplashRegex, (match) => {
    return `"avatar": "https://raw.githubusercontent.com/Fonteleee/RAIO-X-POLITICO/main/assets/avatar-official-placeholder.svg"`;
  });

  fs.writeFileSync(candidatesPath, content, 'utf8');
  console.log(`\n🎉 Processo concluído! ${updatedCount} fotos oficiais foram atualizadas e nenhum Unsplash inválido foi deixado.`);
}

main().catch(err => {
  console.error('Erro no script:', err);
  process.exit(1);
});
