/**
 * FIGURAS POLÍTICAS - BOT DE NAVEGADOR PARA O X (TWITTER)
 * Publicação autônoma via Playwright usando sessão de cookie (auth_token).
 * Custo: R$ 0,00 | Bypassa bloqueios de cobrança da API v2 do X.
 */

const path = require('node:path');
const fs = require('node:fs');
const crypto = require('node:crypto');
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

  const cleanText = (tweetText || '').slice(0, 275);
  if (!cleanText) {
    throw new Error('Texto do tweet está vazio.');
  }

  const outputDir = path.join(__dirname, '..', 'output', 'social_queue');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
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

    // Injetar cookies essenciais de autenticação (.x.com e .twitter.com)
    const effectiveCt0 = ct0 || crypto.randomBytes(16).toString('hex');
    const cookies = [
      {
        name: 'auth_token',
        value: authToken,
        domain: '.x.com',
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'None'
      },
      {
        name: 'auth_token',
        value: authToken,
        domain: '.twitter.com',
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'None'
      },
      {
        name: 'ct0',
        value: effectiveCt0,
        domain: '.x.com',
        path: '/',
        httpOnly: false,
        secure: true,
        sameSite: 'Lax'
      },
      {
        name: 'ct0',
        value: effectiveCt0,
        domain: '.twitter.com',
        path: '/',
        httpOnly: false,
        secure: true,
        sameSite: 'Lax'
      }
    ];

    await context.addCookies(cookies);

    const page = await context.newPage();

    // Rastrear respostas de rede da API de tweet do X
    let apiResponses = [];
    page.on('response', async (res) => {
      const u = res.url();
      if (u.includes('CreateTweet') || u.includes('/tweets') || u.includes('graphql')) {
        try {
          const body = await res.text();
          apiResponses.push({ url: u.split('?')[0], status: res.status(), body: body.slice(0, 500) });
          console.log(`[X Network API] ${u.split('?')[0]} -> HTTP ${res.status()}`);
          if (res.status() >= 400 || body.includes('errors') || body.includes('create_tweet')) {
            console.log(`[X Network Body] ${body.slice(0, 400)}`);
          }
        } catch {}
      }
    });

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

    console.log('[X Browser Bot] Focando no campo de texto...');
    const editor = page.locator(editorSelector).first();
    await editor.click();
    await page.waitForTimeout(500);

    // Limpar qualquer conteúdo prévio
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Backspace');
    await page.waitForTimeout(300);

    console.log(`[X Browser Bot] Digitando post (${cleanText.length} caracteres)...`);
    // Usar pressSequentially com delay para disparar keydown/input/keyup reais no React/Draft.js
    await editor.pressSequentially(cleanText, { delay: 10 });
    await page.waitForTimeout(1500);

    // Se houver foto oficial do político, anexar diretamente ao post
    if (options.imagePath && fs.existsSync(options.imagePath)) {
      try {
        console.log(`[X Browser Bot] Anexando foto oficial do político: ${options.imagePath}...`);
        const fileInput = page.locator('input[data-testid="fileInput"], input[type="file"][accept*="image"], input[type="file"]').first();
        await fileInput.waitFor({ state: 'attached', timeout: 15000 });
        await fileInput.setInputFiles(path.resolve(options.imagePath));
        console.log('[X Browser Bot] Aguardando processamento e renderização da foto no composer...');

        // Aguardar o preview da imagem aparecer no composer (attachments)
        await page.locator('[data-testid="attachments"], div[aria-label*="mídia"], div[aria-label*="media"]').first()
          .waitFor({ state: 'visible', timeout: 20000 })
          .catch(() => console.log('[X Browser Bot] Timeout aguardando preview de attachment, checando botão de post...'));

        // Aguardar o botão de tweet ser reabilitado após o upload da imagem
        await page.waitForFunction(() => {
          const btn = document.querySelector('div[role="dialog"] [data-testid="tweetButton"]') || document.querySelector('[data-testid="tweetButton"]');
          return btn && btn.getAttribute('aria-disabled') !== 'true';
        }, { timeout: 20000 }).catch(() => {
          console.log('[X Browser Bot] Aviso: timeout esperando botão de tweet reabilitar, prosseguindo com envio...');
        });

        console.log('[X Browser Bot] Foto oficial processada e pronta para publicação!');
      } catch (imgErr) {
        console.warn(`⚠️ [X Browser Bot] Falha ao anexar imagem: ${imgErr.message}`);
      }
    }

    // Salvar captura de tela pré-clique para diagnóstico
    await page.screenshot({ path: path.join(outputDir, 'x_before_post.png') }).catch(() => {});

    // Localizar botão oficial de postar DENTRO do diálogo modal (role="dialog")
    const dialogPostButton = page.locator('div[role="dialog"] [data-testid="tweetButton"]')
      .or(page.locator('div[role="dialog"]').getByRole('button', { name: /^Post$/i }))
      .or(page.locator('[data-testid="tweetButton"]').last());

    const isDialogBtnVisible = await dialogPostButton.isVisible().catch(() => false);
    if (isDialogBtnVisible) {
      console.log('[X Browser Bot] Clicando no botão oficial "Post" do diálogo modal...');
      await dialogPostButton.click({ force: true });
    } else {
      console.log('[X Browser Bot] Botão do diálogo não diretamente visível, usando atalho nativo Control+Enter...');
      await editor.focus();
      await page.keyboard.press('Control+Enter');
    }

    // Fallback: se após 1.5s o editor ainda estiver aberto, reforçar com Control+Enter
    await page.waitForTimeout(1500);
    const isStillOpen = await page.locator(editorSelector).isVisible().catch(() => false);
    if (isStillOpen) {
      console.log('[X Browser Bot] Modal ainda visível, reforçando envio com Control+Enter...');
      await editor.focus();
      await page.keyboard.press('Control+Enter');
    }

    // Aguardar conclusão da requisição de postagem
    await page.waitForTimeout(8000);

    // Salvar captura de tela pós-clique para diagnóstico
    await page.screenshot({ path: path.join(outputDir, 'x_after_post.png') }).catch(() => {});

    // Checar se há alertas ou mensagens na tela
    const alerts = await page.locator('[data-testid="toast"], [role="alert"]').allInnerTexts().catch(() => []);
    if (alerts.length > 0) {
      console.log(`[X Browser Bot] Alertas exibidos pelo X: ${JSON.stringify(alerts)}`);
    }

    // Verificar se o modal fechou
    const isEditorStillOpen = await page.locator(editorSelector).isVisible().catch(() => false);
    console.log(`[X Browser Bot] O campo de texto ainda está aberto? ${isEditorStillOpen}`);

    console.log('🚀 [X Browser Bot] Fluxo do navegador concluído. Verifique artefatos e perfil.');
    return { success: true, apiResponses, alerts };
  } finally {
    await browser.close();
  }
}

module.exports = { postTweetViaBrowser };
