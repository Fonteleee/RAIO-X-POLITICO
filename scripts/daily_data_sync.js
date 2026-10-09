// Raio-X Político / Figuras Políticas
// Motor de Sincronização Diária, Manutenção Autônoma e Atualização Cívica

const { AutoUpdaterService } = require('../src/services/auto_updater');
const { generateSitemapXml } = require('./generate_sitemap');
const { execSync } = require('node:child_process');
const path = require('node:path');

async function runDailySync() {
  console.log('=====================================================');
  console.log('🏛️ FIGURAS POLÍTICAS - CICLO DIÁRIO DE AUTO-MANUTENÇÃO');
  console.log('=====================================================');

  // 1. Executar ciclo de manutenção cívica e auditoria criptográfica
  const autoUpdater = new AutoUpdaterService();
  const maintenanceResult = await autoUpdater.runDailyMaintenance();
  console.log('[1/4] Manutenção diária concluída:', maintenanceResult.status);

  // 2. Regenerar Sitemap.xml para SEO / Google Search Console
  console.log('[2/4] Atualizando sitemap.xml...');
  generateSitemapXml();

  // 3. Re-sincronizar banco de dados SQLite
  console.log('[3/4] Sincronizando SQLite local (seed)...');
  try {
    execSync('node src/db/seed.js', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
  } catch (err) {
    console.error('Aviso ao semear banco:', err.message);
  }

  // 4. Executar verificação dos testes
  console.log('[4/4] Verificando integridade operacional com testes...');
  try {
    execSync('npm test --silent', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
    console.log('✅ Todos os testes passaram com sucesso!');
  } catch (err) {
    console.error('Falha nos testes durante a sincronização:', err.message);
    process.exit(1);
  }

  console.log('=====================================================');
  console.log('🎉 CICLO DIÁRIO CONCLUÍDO COM SUCESSO (CUSTO ZERO)');
  console.log('=====================================================');
}

if (require.main === module) {
  runDailySync().catch(err => {
    console.error('Erro fatal no ciclo diário:', err);
    process.exit(1);
  });
}

module.exports = { runDailySync };
