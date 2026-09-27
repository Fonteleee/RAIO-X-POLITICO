// Script de unificação para apontar avatares para os arquivos locais já existentes em img/candidates/
const fs = require('fs');
const path = require('path');

const candidatesFilePath = path.join(__dirname, '../data/candidates.js');
let fileContent = fs.readFileSync(candidatesFilePath, 'utf8');

// Atualiza candidatesData e incumbentsData
const { candidatesData, incumbentsData } = require('../data/candidates');

let updatedCandidatesCount = 0;
candidatesData.forEach(cand => {
  const localImg = `img/candidates/${cand.id}.jpg`;
  const absPath = path.join(__dirname, '..', localImg);
  if (fs.existsSync(absPath)) {
    cand.avatar = localImg;
    updatedCandidatesCount++;
  }
});

let updatedIncumbentsCount = 0;
if (Array.isArray(incumbentsData)) {
  incumbentsData.forEach(inc => {
    const candId = inc.candidateId || inc.id.replace('inc-', '');
    const localImg = `img/candidates/${candId}.jpg`;
    const absPath = path.join(__dirname, '..', localImg);
    if (fs.existsSync(absPath)) {
      inc.avatar = localImg;
      updatedIncumbentsCount++;
    }
  });
}

console.log(`Atualizados ${updatedCandidatesCount} candidatos e ${updatedIncumbentsCount} mandatários para imagens locais.`);

// Reescreve candidates.js preservando as funções e exportações
// Extrai o bloco de funções a partir de calculateCivicRelativization / detectConflictOfInterest
const splitIdx = fileContent.indexOf('function getSafeAvatarUrl');
if (splitIdx === -1) {
  console.error('Não foi possível localizar function getSafeAvatarUrl');
  process.exit(1);
}

const functionsBlock = fileContent.substring(splitIdx);

const newContent = `// Catálogo Completo de Candidatos e Autoridades - Raio-X Político 2026
var _root = typeof window !== 'undefined' ? window : global;
var candidatesData = _root.candidatesData = ${JSON.stringify(candidatesData, null, 2)};

var incumbentsData = _root.incumbentsData = ${JSON.stringify(incumbentsData, null, 2)};

${functionsBlock}
`;

fs.writeFileSync(candidatesFilePath, newContent, 'utf8');
console.log('Arquivo data/candidates.js atualizado com sucesso!');
