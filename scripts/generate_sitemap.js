// Raio-X Político / Figuras Políticas
// Gerador Dinâmico de Sitemap XML para Indexação no Google (SEO / Sitemaps.org)

const fs = require('node:fs');
const path = require('node:path');
const { candidatesData } = require('../data/candidates.js');

const BASE_URL = (process.env.SITE_URL || 'https://fonteleee.github.io/figuras-politicas').replace(/\/+$/, '');
const OUTPUT_FILE = path.join(__dirname, '..', 'sitemap.xml');

function generateSitemapXml() {
  const today = new Date().toISOString().split('T')[0];

  const staticRoutes = [
    { loc: `${BASE_URL}/`, priority: '1.0', changefreq: 'daily' },
    { loc: `${BASE_URL}/index.html`, priority: '1.0', changefreq: 'daily' },
    { loc: `${BASE_URL}/match.html`, priority: '0.9', changefreq: 'weekly' },
    { loc: `${BASE_URL}/dossie.html`, priority: '0.8', changefreq: 'weekly' }
  ];

  const candidateRoutes = candidatesData.map(cand => ({
    loc: `${BASE_URL}/dossie.html?id=${encodeURIComponent(cand.id)}`,
    priority: '0.8',
    changefreq: 'weekly'
  }));

  const allRoutes = [...staticRoutes, ...candidateRoutes];

  const xmlEntries = allRoutes.map(item => `  <url>
    <loc>${item.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries}
</urlset>
`;

  fs.writeFileSync(OUTPUT_FILE, xml.trim() + '\n', 'utf8');
  console.log(`[Sitemap Generator] ✅ sitemap.xml gerado com sucesso!`);
  console.log(`[Sitemap Generator] Total de URLs catalogadas: ${allRoutes.length}`);
  console.log(`[Sitemap Generator] Base URL: ${BASE_URL}`);
  console.log(`[Sitemap Generator] Arquivo salvo em: ${OUTPUT_FILE}`);
}

if (require.main === module) {
  generateSitemapXml();
}

module.exports = { generateSitemapXml };
