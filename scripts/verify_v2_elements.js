const fs = require('fs');

const v2 = fs.readFileSync('index_v2.html', 'utf8');

const elements = [
  'id="ranking-podium-container"',
  'id="comparatorRadarCanvas"',
  'id="exportCardRadarCanvas"',
  'id="ranking-table-body"',
  'id="candidates-grid"',
  'id="quiz-container"',
  'id="incumbents-grid"',
  'id="export-modal"',
  'id="terms-modal"',
  'id="login-modal"',
  'id="location-modal"',
  'id="donate-modal"',
  'id="electoral-modal"',
  'id="proposal-detail-modal"',
  'id="legal-sources-modal"',
  'id="contraditory-modal"',
  'id="compliance-modal"',
  'id="glossary-modal"'
];

console.log('--- Checking index_v2.html elements ---');
elements.forEach(el => {
  console.log(el, '=>', v2.includes(el));
});
