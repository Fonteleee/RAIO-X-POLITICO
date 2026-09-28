/**
 * FIGURAS POLÍTICAS - BOT DE NAVEGADOR PARA O X (TWITTER)
 * Publicação autônoma via Playwright usando sessão de cookie (auth_token).
 * Custo: R$ 0,00 | Bypassa bloqueios de cobrança da API v2 do X.
 */

const { chromium } = require('playwright');

/**
 * Publica um post no X através de um navegador Chromium headless
 * @param {string} tweetText - Texto a ser postado (máx 280 caracteres)
 * @param {object} options - Opções adicionais (authToken, ct0, headless)
 */
async function postTweetViaBrowser(tweetText, options = {}) {
  const authToken = (options.authToken || process.env.X_AUTH_TOKEN || '').trim();
  const ct0 = (options.ct0 || process.env.X_CT0 || '').trim();

  if (!authToken) {
    throw new Error('X_AUTH_TOKEN não configurado. Adicione o cookie auth_token nos segredos.');
  }

  const cleanText = (tweetText || '').slice(0, 280);
  if (!cleanText) {
    throw new Error('Texto do tweet está vazio.');
  }

  console.log('[X Browser Bot] Inicializando navegador Chromium headless...');
  const browser = await chromium.launch({
    headless: options.headless !== false,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-blink-features=AutomationControlled'
    ]
  });

  try {
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
      viewport: { width: 1280, height: 720 },
      locale: 'pt-BR',
      timezoneId: 'America/Sao_Paulo'
    });

    // Injetar cookies essenciais de autenticação
    const cookies = [
      {
        name: 'auth_token',
        value: authToken,
        domain: '.x.com',
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'None'
      }
    ];

    if (ct0) {
      cookies.push({
        name: 'ct0',
        value: ct0,
        domain: '.x.com',
        path: '/',
        httpOnly: false,
        secure: true,
        sameSite: 'Lax'
      });
    }

    await context.addCookies(cookies);

    const page = await context.newPage();

    console.log('[X Browser Bot] Acessando composer do X (https://x.com/compose/post)...');
    await page.goto('https://x.com/compose/post', {
      waitUntil: 'domcontentloaded',
      timeout: 45000
    });

    // Verificar se foi redirecionado para a tela de login
    const currentUrl = page.url();
    if (currentUrl.includes('/login') || currentUrl.includes('/i/flow/login')) {
      throw new Error('Cookie inválido ou expirado: o X redirecionou para a página de login.');
    }

    console.log('[X Browser Bot] Localizando campo de texto do tweet...');
    const editorSelector = '[data-testid="tweetTextarea_0"], div[role="textbox"][contenteditable="true"]';
    await page.waitForSelector(editorSelector, { timeout: 30000 });

    const editor = page.locator(editorSelector).first();
    await editor.click();
    await editor.fill(cleanText);

    // Pausa breve para simular comportamento humano e permitir ativação do botão
    await page.waitForTimeout(1500);

    const postButtonSelector = '[data-testid="tweetButton"], [data-testid="tweetButtonInline"]';
    const postButton = page.locator(postButtonSelector).first();
    await postButton.waitFor({ state: 'visible', timeout: 10000 });

    const isDisabled = await postButton.getAttribute('aria-disabled');
    if (isDisabled === 'true') {
      throw new Error('O botão de postar permaneceu desabilitado (texto inválido ou limite excedido).');
    }

    console.log('[X Browser Bot] Clicando em "Postar"...');
    await postButton.click();

    // Aguardar conclusão da requisição de postagem
    await page.waitForTimeout(5000);

    console.log('🚀 [X Browser Bot] Tweet publicado com sucesso via navegador!');
    return { success: true };
  } finally {
    await browser.close();
  }
}

module.exports = { postTweetViaBrowser };
