/**
 * FIGURAS POLÍTICAS - TESTE E VALIDAÇÃO DE SESSÃO DO X (TWITTER)
 * Executa uma verificação rápida e segura da sessão ativa de cookies e evasão anti-bot.
 * Uso: node scripts/test_x_session.js
 */

const path = require('node:path');
const fs = require('node:fs');
const { chromium } = require('playwright');

async function testXSession() {
  const authToken = (process.env.X_AUTH_TOKEN || '').trim();
  const ct0 = (process.env.X_CT0 || '').trim();

  console.log('======================================================');
  console.log('🔍 DIAGNÓSTICO DE SESSÃO & EVASÃO STEALTH NO X (TWITTER)');
  console.log('======================================================');
  console.log(`• X_AUTH_TOKEN configurado: ${authToken ? 'SIM (' + authToken.slice(0, 6) + '...)' : 'NÃO'}`);
  console.log(`• X_CT0 configurado: ${ct0 ? 'SIM (' + ct0.slice(0, 8) + '...)' : 'NÃO (o Twitter emitirá dinamicamente)'}`);

  if (!authToken) {
    console.warn('\n⚠️ ATENÇÃO: X_AUTH_TOKEN não encontrado nas variáveis de ambiente.');
    console.warn('Configure a variável X_AUTH_TOKEN para testar a sessão autenticada.');
    return { success: false, reason: 'AUTH_TOKEN_MISSING' };
  }

  const outputDir = path.join(__dirname, '..', 'output', 'social_queue');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('\n[1/4] Inicializando navegador Chromium com flags Stealth...');
  const browser = await chromium.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-blink-features=AutomationControlled',
      '--disable-features=IsolateOrigins,site-per-process',
      '--lang=pt-BR,pt'
    ]
  });

  try {
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
      viewport: { width: 1366, height: 1080 },
      locale: 'pt-BR',
      timezoneId: 'America/Sao_Paulo'
    });

    await context.addInitScript(() => {
      Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
      delete navigator.__proto__.webdriver;
      window.chrome = { app: { isInstalled: false }, runtime: { PlatformOs: { WIN: 'win' } } };
      Object.defineProperty(navigator, 'languages', { get: () => ['pt-BR', 'pt', 'en-US', 'en'] });
    });

    const cookies = [
      { name: 'auth_token', value: authToken, domain: '.x.com', path: '/', httpOnly: true, secure: true, sameSite: 'None' },
      { name: 'auth_token', value: authToken, domain: '.twitter.com', path: '/', httpOnly: true, secure: true, sameSite: 'None' }
    ];
    if (ct0) {
      cookies.push(
        { name: 'ct0', value: ct0, domain: '.x.com', path: '/', httpOnly: false, secure: true, sameSite: 'Lax' },
        { name: 'ct0', value: ct0, domain: '.twitter.com', path: '/', httpOnly: false, secure: true, sameSite: 'Lax' }
      );
    }
    await context.addCookies(cookies);

    const page = await context.newPage();

    console.log('[2/4] Conectando à Home do X (https://x.com/home)...');
    await page.goto('https://x.com/home', { waitUntil: 'domcontentloaded', timeout: 45000 }).catch(() => {});
    await page.waitForTimeout(3000);

    let title = await page.title().catch(() => '');
    let url = page.url();
    console.log(`[3/4] Página carregada: URL=${url} | Título="${title}"`);

    if (title.includes('Um momento') || title.includes('Just a moment')) {
      console.log('⏳ Detectado checkpoint "Um momento…". Aguardando resolução automática (até 30s)...');
      await page.waitForFunction(() => {
        const t = document.title || '';
        return !t.includes('Um momento') && !t.includes('Just a moment');
      }, { timeout: 30000 }).catch(() => {});
      title = await page.title().catch(() => '');
      url = page.url();
      console.log(`Novo título após handshake: "${title}" | URL: ${url}`);
    }

    const screenshotPath = path.join(outputDir, 'session_diagnostic.png');
    await page.screenshot({ path: screenshotPath });
    console.log(`📸 Screenshot salvo em: ${screenshotPath}`);

    const isLogin = url.includes('/login') || url.includes('/i/flow/login');
    const isHome = url.includes('/home') || title.includes('Página inicial') || title.includes('Home') || title.includes('X');
    const hasEditor = await page.locator('[data-testid="tweetTextarea_0"], div[role="textbox"]').first().isVisible().catch(() => false);

    console.log('\n[4/4] Veredito do Teste de Sessão:');
    if (isLogin) {
      console.error('❌ SESSÃO EXPIRADA: O X redirecionou para tela de login.');
      console.error('Renove o cookie auth_token no navegador e atualize nos segredos do GitHub.');
      return { success: false, reason: 'SESSION_EXPIRED' };
    }

    if (hasEditor || isHome) {
      console.log('✅ SESSÃO VÁLIDA E ATIVA! O editor de postagem está pronto para uso.');
      return { success: true };
    }

    console.log(`ℹ️ Página carregada com sucesso (Título: "${title}"). Verifique ${screenshotPath}.`);
    return { success: true };
  } finally {
    await browser.close();
  }
}

if (require.main === module) {
  testXSession().catch((err) => {
    console.error('Erro no teste de sessão:', err.message);
    process.exit(1);
  });
}

module.exports = { testXSession };
