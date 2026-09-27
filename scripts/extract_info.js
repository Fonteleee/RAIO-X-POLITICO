const fs = require('fs');

const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');

const markers = [
  '<!-- ================= MODAL: EXPORTADOR DE CARDS',
  '<!-- ================= MODAL: TERMOS DE USO',
  '<!-- ================= MODAL: LOGIN',
  '<!-- ================= MODAL: SELETOR DE LOCALIZA',
  '<!-- ================= MODAL: APOIO C',
  '<!-- ================= MODAL: INFORMA',
  '<!-- ================= MODAL: DETALHAMENTO COMPLETO',
  '<!-- ================= MODAL: AUDITORIA DAS FONTES',
  '<!-- ================= MODAL: CONTRADIT',
  '<!-- ================= MODAL: COMPLIANCE',
  '<!-- ================= MODAL: GLOSS',
  '<!-- ================= FOOTER',
  '<script src="data/candidates.js">'
];

markers.forEach(m => {
  const idx = lines.findIndex(l => l.includes(m));
  console.log(m, '=> Line:', idx + 1);
});
