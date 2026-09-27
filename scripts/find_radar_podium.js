const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const lines = html.split('\n');
lines.forEach((l, idx) => {
  if (l.toLowerCase().includes('radar') || l.toLowerCase().includes('podium') || l.toLowerCase().includes('pódio')) {
    console.log(idx + 1, l.trim());
  }
});
