// Diretório temporário para downloads grandes (fora de data/).
const fs = require('node:fs'); const os = require('node:os'); const path = require('node:path');
const DIR = process.env.DATA_TMP || path.join(os.tmpdir(), 'figuras-politicas-dados');
fs.mkdirSync(DIR, { recursive: true });
module.exports = { TMP: DIR, tmpFile: n => path.join(DIR, n) };
