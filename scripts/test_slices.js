const fs = require('fs');
const path = require('path');

console.log('[Builder V2] Starting production assembly of index_v2.html...');

const v1Html = fs.readFileSync('index.html', 'utf8');
const v1Lines = v1Html.split('\n');

// Find boundaries
function findLine(str, startFrom = 0) {
  for (let i = startFrom; i < v1Lines.length; i++) {
    if (v1Lines[i].includes(str)) return i;
  }
  return -1;
}

const tabFeedStart = findLine('id="tab-feed"');
const tabCompStart = findLine('id="tab-comparator"');
const tabMatchStart = findLine('id="tab-match"');
const tabIncumbentsStart = findLine('id="tab-incumbents"');
const tabRankStart = findLine('id="tab-ranking"');
const modalsStart = findLine('<!-- ================= MODAL: EXPORTADOR DE CARDS');
const footerStart = findLine('<!-- ================= FOOTER');
const glossaryStart = findLine('<!-- ================= MODAL: GLOSS');
const scriptsStart = findLine('<script src="data/candidates.js">');

console.log({
  tabFeedStart: tabFeedStart + 1,
  tabCompStart: tabCompStart + 1,
  tabMatchStart: tabMatchStart + 1,
  tabIncumbentsStart: tabIncumbentsStart + 1,
  tabRankStart: tabRankStart + 1,
  modalsStart: modalsStart + 1,
  footerStart: footerStart + 1,
  glossaryStart: glossaryStart + 1,
  scriptsStart: scriptsStart + 1
});

// Extract slices
const tabFeedHtml = v1Lines.slice(tabFeedStart, tabCompStart).join('\n');
const tabCompHtml = v1Lines.slice(tabCompStart, tabMatchStart).join('\n');
const tabMatchHtml = v1Lines.slice(tabMatchStart, tabIncumbentsStart).join('\n');
const tabIncumbentsHtml = v1Lines.slice(tabIncumbentsStart, tabRankStart).join('\n');
const tabRankHtml = v1Lines.slice(tabRankStart, modalsStart).join('\n');

// Modals block 1 (export-modal to right before footer)
const modalsPart1 = v1Lines.slice(modalsStart, footerStart).join('\n');

// Modals block 2 (glossary modal to right before scripts)
const modalsPart2 = v1Lines.slice(glossaryStart, scriptsStart).join('\n');

console.log('[Builder V2] Sections extracted successfully.');
console.log('tabFeed lines:', tabCompStart - tabFeedStart);
console.log('tabComp lines:', tabMatchStart - tabCompStart);
console.log('tabMatch lines:', tabIncumbentsStart - tabMatchStart);
console.log('tabIncumbents lines:', tabRankStart - tabIncumbentsStart);
console.log('tabRank lines:', modalsStart - tabRankStart);
console.log('modalsPart1 lines:', footerStart - modalsStart);
console.log('modalsPart2 lines:', scriptsStart - glossaryStart);
