const fs = require('fs');

const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');

const tabs = ['tab-feed', 'tab-ranking', 'tab-comparator', 'tab-match', 'tab-incumbents'];
tabs.forEach(t => {
  const idx = lines.findIndex(l => l.includes('id="' + t + '"'));
  console.log(t, '=> Line:', idx + 1);
});
