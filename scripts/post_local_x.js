/**
 * FIGURAS POLÍTICAS - DISPARO SOCIAL LOCAL NO X (IP RESIDENCIAL)
 * Permite publicar diretamente no X a partir do seu próprio computador,
 * contornando 100% qualquer bloqueio de IP de datacenter da nuvem.
 * 
 * Uso: node scripts/post_local_x.js
 */

const path = require('node:path');
const fs = require('node:fs');
const { SocialAutopilotService } = require('./social_autopilot');

async function runLocalSocialPost() {
  console.log('======================================================');
  console.log('🇧🇷 FIGURAS POLÍTICAS - AUTOPILOT LOCAL (IP RESIDENCIAL)');
  console.log('======================================================');

  const autopilot = new SocialAutopilotService();
  const post = autopilot.generateDailyPost(new Date());

  console.log(`\n📋 Pauta Gerada:`);
  console.log(`• Título: ${post.title}`);
  console.log(`• Tema: ${post.theme}`);
  console.log(`• Foto Oficial: ${post.imagePath || 'Nenhuma'}`);
  console.log(`• Link Dossiê: ${post.link}`);
  console.log(`\n📝 Texto do Tweet:\n${post.copy.x}\n`);

  console.log('🚀 Iniciando envio através da conexão local...');
  const results = await autopilot.dispatch(post);

  console.log('\n======================================================');
  console.log('📊 RESULTADO DA TRANSMISSÃO:');
  console.log(JSON.stringify(results, null, 2));
  console.log('======================================================\n');
}

if (require.main === module) {
  runLocalSocialPost().catch((err) => {
    console.error('❌ Erro no envio local:', err.message);
    process.exit(1);
  });
}

module.exports = { runLocalSocialPost };
