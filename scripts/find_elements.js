const fs = require('fs');
const lines = fs.readFileSync('index.html', 'utf8').split('\n');

lines.forEach((l, idx) => {
  if (l.includes('id="ranking-podium"')) {
    console.log('ranking-podium at line:', idx + 1);
  }
  if (l.includes('id="compare-radar-chart"')) {
    console.log('compare-radar-chart at line:', idx + 1);
  }
});
