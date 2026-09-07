const fs = require('fs');

// 1. Update dossie.html: fix exportCard redirect
let dossie = fs.readFileSync('dossie.html', 'utf8');
const oldDossieTarget = `function exportCard() {
      showToast('Gerando figurinha oficial do candidato...');
      window.location.href = \`index.html#ranking\`;
    }`;
const newDossieTarget = `function exportCard() {
      if (!currentCand) return;
      showToast('Abrindo figurinha oficial de ' + (currentCand.ballotName || currentCand.name) + '...');
      window.location.href = \`index.html?figurinha=\${encodeURIComponent(currentCand.id)}\`;
    }`;

if (dossie.includes(oldDossieTarget)) {
  dossie = dossie.replace(oldDossieTarget, newDossieTarget);
  fs.writeFileSync('dossie.html', dossie, 'utf8');
  console.log('✔ dossie.html exportCard atualizado com sucesso');
} else {
  console.log('ℹ dossie.html já atualizado ou target não encontrado');
}

// 2. Update index.html
let index = fs.readFileSync('index.html', 'utf8');

// Add getCorsSafeAvatar helper right before renderExportCardContent
const anchorFn = 'function renderExportCardContent(cand, isComparison = false) {';
if (!index.includes('function getCorsSafeAvatar(')) {
  const replacement = `function getCorsSafeAvatar(url, name = 'Candidato') {
      if (!url) return 'https://ui-avatars.com/api/?name=' + encodeURIComponent(name) + '&background=0284c7&color=fff&bold=true&size=128';
      if (url.startsWith('http://') || url.startsWith('https://')) {
        return '/api/proxy-image?url=' + encodeURIComponent(url);
      }
      return url;
    }

    function renderExportCardContent(cand, isComparison = false) {`;
  index = index.replace(anchorFn, replacement);
  console.log('✔ getCorsSafeAvatar helper adicionado ao index.html');
}

// Ensure single candidate calculations define safeAvatar, overallScore and executionPct
const oldCalc = 'const overallScore = cand._calculatedScore || calculateOverallScore(cand);';
const newCalc = `const safeAvatar = getCorsSafeAvatar(cand.avatar, cand.name);
      const overallScore = (!isNaN(Number(cand.overallScore)) && cand.overallScore !== null && cand.overallScore !== undefined)
        ? Number(cand.overallScore)
        : (cand._calculatedScore || calculateOverallScore(cand));
      const executionPct = (cand.parliamentaryAmendments && !isNaN(Number(cand.parliamentaryAmendments.executionRatePct)))
        ? Number(cand.parliamentaryAmendments.executionRatePct)
        : ((cand.parliamentaryAmendments && !isNaN(Number(cand.parliamentaryAmendments.openBidPct))) ? Number(cand.parliamentaryAmendments.openBidPct) : 92);`;

if (index.includes(oldCalc)) {
  index = index.replace(oldCalc, newCalc);
  console.log('✔ overallScore e executionPct atualizados no index.html');
}

// Replace cand.avatar in the single candidate themes with safeAvatar and error recovery
const imgTargets = [
  'w-[52px] h-[52px] rounded-2xl object-cover border-2 border-stone-950 shadow-md flex-shrink-0',
  'w-14 h-14 rounded-2xl object-cover border-2 border-amber-400 shadow-md flex-shrink-0',
  'w-14 h-14 rounded-2xl object-cover border-2 border-stone-900 shadow-md flex-shrink-0',
  'w-14 h-14 rounded-2xl object-cover border-2 border-slate-200 shadow-sm flex-shrink-0',
  'w-[38px] h-[38px] rounded-xl object-cover border border-[#2f3336]',
  'w-[54px] h-[54px] rounded-2xl object-cover border border-slate-200 shadow-sm flex-shrink-0'
];

imgTargets.forEach(cls => {
  const searchStr = `<img src="\${cand.avatar}" crossorigin="anonymous" referrerpolicy="no-referrer" class="${cls}">`;
  const replaceStr = `<img src="\${safeAvatar}" crossorigin="anonymous" referrerpolicy="no-referrer" onerror="this.onerror=null; this.removeAttribute('crossorigin'); this.src='\${cand.avatar}'; this.onerror=function(){ this.src='https://ui-avatars.com/api/?name=' + encodeURIComponent('\${encodeURIComponent(cand.name)}') + '&background=0284c7&color=fff&bold=true&size=128'; };" class="${cls}">`;
  if (index.includes(searchStr)) {
    index = index.replace(searchStr, replaceStr);
    console.log(`✔ Substituído avatar para classe: ${cls.slice(0, 20)}...`);
  }
});

// Replace % PAGO patterns
index = index.replaceAll('${cand.parliamentaryAmendments ? cand.parliamentaryAmendments.executionRatePct : 91}% PAGO', '${executionPct}% PAGO');
index = index.replaceAll('${cand.parliamentaryAmendments ? cand.parliamentaryAmendments.executionRatePct : 91}% Pago', '${executionPct}% Pago');
index = index.replaceAll('${cand.parliamentaryAmendments ? cand.parliamentaryAmendments.executionRatePct : 91}% pago', '${executionPct}% pago');
console.log('✔ Padrões (% PAGO) corrigidos');

// Check URL param handler on load
if (!index.includes("urlParams.get('figurinha')")) {
  index = index.replace(
    'syncWithBackend();',
    `syncWithBackend();
    
    // Suporte a abertura direta de figurinha via URL
    const urlParams = new URLSearchParams(window.location.search);
    const figId = urlParams.get('figurinha') || urlParams.get('openFigurinha');
    if (figId) {
      setTimeout(() => {
        openExportModalFor(figId);
      }, 350);
    }`
  );
  console.log('✔ URL parameter handler adicionado ao index.html');
}

fs.writeFileSync('index.html', index, 'utf8');
console.log('🎉 Atualizações concluídas em index.html e dossie.html!');
