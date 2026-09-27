#!/usr/bin/env node
// Raio-X Político - Atualizador de Avatares Locais em data/candidates.js e executive_and_senate_data.js

const fs = require('fs');
const path = require('path');
const { LOCAL_CANDIDATES } = require('./download_candidate_photos');

function applyLocalAvatars() {
  const candidatesFilePath = path.join(__dirname, '..', 'data', 'candidates.js');
  const { candidatesData, incumbentsData } = require(candidatesFilePath);

  let cUpdated = 0;
  for (const c of candidatesData) {
    if (LOCAL_CANDIDATES.includes(c.id)) {
      c.avatar = 'img/candidates/' + c.id + '.jpg';
      cUpdated++;
    }
  }

  let iUpdated = 0;
  for (const inc of incumbentsData) {
    if (LOCAL_CANDIDATES.includes(inc.candidateId)) {
      inc.avatar = 'img/candidates/' + inc.candidateId + '.jpg';
      iUpdated++;
    }
  }

  const content = `// Figuras Políticas - Catálogo Oficial de Candidatos e Mandatários em Exercício 2026

const candidatesData = ${JSON.stringify(candidatesData, null, 2)};

const incumbentsData = ${JSON.stringify(incumbentsData, null, 2)};

function getSafeAvatarUrl(url, name = 'Candidato') {
  if (!url) return 'https://ui-avatars.com/api/?name=' + encodeURIComponent(name) + '&background=0284c7&color=fff&bold=true&size=128';
  if (url.includes('senado.leg.br') || url.includes('wikimedia.org') || url.includes('wikipedia.org')) {
    return '/api/proxy-image?url=' + encodeURIComponent(url);
  }
  return url;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { candidatesData, incumbentsData, getSafeAvatarUrl };
}

if (typeof window !== 'undefined') {
  window.candidatesData = candidatesData;
  window.incumbentsData = incumbentsData;
  window.getSafeAvatarUrl = getSafeAvatarUrl;
}
`;

  fs.writeFileSync(candidatesFilePath, content, 'utf8');
  console.log(`[Avatares Locais] data/candidates.js atualizado com sucesso (${cUpdated} candidatos, ${iUpdated} em exercício).`);

  const execPath = path.join(__dirname, '..', 'src', 'ingestion', 'executive_and_senate_data.js');
  if (fs.existsSync(execPath)) {
    const { EXECUTIVE_AND_SENATE_POLITICIANS } = require(execPath);
    let eUpdated = 0;
    for (const p of EXECUTIVE_AND_SENATE_POLITICIANS) {
      if (LOCAL_CANDIDATES.includes(p.id)) {
        p.avatar = 'img/candidates/' + p.id + '.jpg';
        eUpdated++;
      }
    }
    const execContent = `// Ingestão Estruturada de Lideranças do Executivo e Senado 2026

const EXECUTIVE_AND_SENATE_POLITICIANS = ${JSON.stringify(EXECUTIVE_AND_SENATE_POLITICIANS, null, 2)};

module.exports = {
  EXECUTIVE_AND_SENATE_POLITICIANS
};
`;
    fs.writeFileSync(execPath, execContent, 'utf8');
    console.log(`[Avatares Locais] executive_and_senate_data.js atualizado com sucesso (${eUpdated} líderes).`);
  }
}

if (require.main === module) {
  applyLocalAvatars();
}

module.exports = { applyLocalAvatars };
