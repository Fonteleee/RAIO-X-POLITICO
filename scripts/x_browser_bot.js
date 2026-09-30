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
      viewport: { width: 1366, height: 1080 },
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
    let tweetCreated = false;
    let createdTweetId = null;

    page.on('response', async (res) => {
      const u = res.url();
      if (u.includes('CreateTweet') || u.includes('/tweets') || u.includes('graphql')) {
        try {
          const body = await res.text();
          apiResponses.push({ url: u.split('?')[0], status: res.status(), body: body.slice(0, 500) });
          console.log(`[X Network API] ${u.split('?')[0]} -> HTTP ${res.status()}`);
          if (u.includes('CreateTweet')) {
            if (res.status() === 200) {
              const parsed = JSON.parse(body);
              const restId = parsed?.data?.create_tweet?.tweet_results?.result?.rest_id;
              if (restId) {
                tweetCreated = true;
                createdTweetId = restId;
                console.log(`🎉 [X Network API] Tweet criado com sucesso! ID do Tweet: ${restId}`);
              }
            } else {
              console.warn(`⚠️ [X Network API] CreateTweet falhou: HTTP ${res.status()} - ${body.slice(0, 300)}`);
            }
          }
        } catch {}
      }
    });

    console.log('[X Browser Bot] Acessando composer do X (https://x.com/compose/post)...');
    await page.goto('https://x.com/compose/post', {
      waitUntil: 'domcontentloaded',
      timeout: 45000
    });
    await page.waitForTimeout(2500);

    const currentUrl = page.url();
    const currentTitle = await page.title().catch(() => '');
    console.log(`[X Browser Bot] Página carregada: URL=${currentUrl} | Título=${currentTitle}`);

    // Salvar captura inicial para auditoria visual
    await page.screenshot({ path: path.join(outputDir, 'x_step1_initial.png') }).catch(() => {});

    // Verificar se foi redirecionado para a tela de login
    if (currentUrl.includes('/login') || currentUrl.includes('/i/flow/login')) {
      throw new Error('Cookie inválido ou expirado: o X redirecionou para a página de login.');
    }

    // Fechar possíveis diálogos de consentimento de cookies ou avisos
    try {
      const dismissSelectors = [
        'button:has-text("Refuse non-essential cookies")',
        'button:has-text("Recusar cookies não essenciais")',
        'button:has-text("Aceitar todos os cookies")',
        'button:has-text("Accept all cookies")',
        'button:has-text("Agora não")',
        'button:has-text("Not now")',
        '[data-testid="SheetDialog"] [role="button"]'
      ];
      for (const sel of dismissSelectors) {
        const btn = page.locator(sel).first();
        if (await btn.isVisible().catch(() => false)) {
          console.log(`[X Browser Bot] Dispensando aviso/overlay: ${sel}...`);
          await btn.click().catch(() => {});
          await page.waitForTimeout(500);
        }
      }
    } catch {}

    console.log('[X Browser Bot] Localizando campo de texto do tweet...');
    const editorSelector = '[data-testid="tweetTextarea_0"], div[role="textbox"][contenteditable="true"]';
    let editor = page.locator(editorSelector).first();
    let isEditorVisible = await editor.isVisible().catch(() => false);

    // Se o modal não abriu direto na rota /compose/post, clicar no botão "Postar" da barra lateral
    if (!isEditorVisible) {
      console.log('[X Browser Bot] Editor não visível imediatamente. Tentando botão da barra lateral [data-testid="SideNav_NewTweet_Button"]...');
      const sideNavBtn = page.locator('[data-testid="SideNav_NewTweet_Button"]').first();
      if (await sideNavBtn.isVisible().catch(() => false)) {
        console.log('[X Browser Bot] Clicando no botão da barra lateral para abrir modal de post...');
        await sideNavBtn.click().catch(() => {});
        await page.waitForTimeout(2000);
        editor = page.locator(editorSelector).first();
        isEditorVisible = await editor.isVisible().catch(() => false);
      }
    }

    // Se ainda não estiver visível, aguardar com diagnóstico estrito
    if (!isEditorVisible) {
      try {
        await page.waitForSelector(editorSelector, { timeout: 20000 });
        editor = page.locator(editorSelector).first();
      } catch (errWait) {
        await page.screenshot({ path: path.join(outputDir, 'x_error_no_editor.png') }).catch(() => {});
        const bodySnippet = await page.innerText('body').catch(() => 'indisponível');
        console.warn(`[X Browser Bot Diagnóstico] URL: ${page.url()} | Título: ${await page.title().catch(() => '')}`);
        console.warn(`[X Browser Bot Diagnóstico] Texto visível:\n${bodySnippet.slice(0, 400)}`);
        throw new Error(`Campo de texto do tweet não encontrado na página ${page.url()}: ${errWait.message}`);
      }
    }

    console.log('[X Browser Bot] Focando no campo de texto...');
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
          const btn = document.querySelector('[data-testid="tweetButton"]') || document.querySelector('[data-testid="tweetButtonInline"]');
          return btn && btn.getAttribute('aria-disabled') !== 'true';
        }, { timeout: 25000 }).catch(() => {
          console.log('[X Browser Bot] Aviso: timeout esperando botão de tweet reabilitar, prosseguindo com envio...');
        });

        console.log('[X Browser Bot] Foto oficial processada e pronta para publicação!');
      } catch (imgErr) {
        console.warn(`⚠️ [X Browser Bot] Falha ao anexar imagem: ${imgErr.message}`);
      }
    }

    // Salvar captura de tela pré-clique para diagnóstico
    await page.screenshot({ path: path.join(outputDir, 'x_before_post.png') }).catch(() => {});

    // Estratégia 1: Focar novamente no editor e disparar atalho nativo Control+Enter com down/up explícito
    console.log('[X Browser Bot] Focando no editor e disparando envio via Control+Enter...');
    await editor.click();
    await editor.focus();
    await page.waitForTimeout(400);
    await page.keyboard.down('Control');
    await page.keyboard.press('Enter');
    await page.keyboard.up('Control');

    // Aguardar até 3s para checar se CreateTweet foi disparado
    for (let i = 0; i < 6; i++) {
      if (tweetCreated) break;
      await page.waitForTimeout(500);
    }

    // Estratégia 2: Se CreateTweet não disparou, clicar no botão de postar oficial
    if (!tweetCreated) {
      console.log('[X Browser Bot] Control+Enter não finalizou envio. Localizando botão oficial de Tweet...');
      const postBtn = page.locator('button[data-testid="tweetButton"], [data-testid="tweetButton"]').first();
      await postBtn.scrollIntoViewIfNeeded().catch(() => {});
      const isVisible = await postBtn.isVisible().catch(() => false);
      if (isVisible) {
        console.log('[X Browser Bot] Clicando no botão oficial de Tweet com scrollIntoView...');
        await postBtn.click({ timeout: 8000 }).catch(async (clkErr) => {
          console.log(`[X Browser Bot] Fallback clique via evaluate no DOM: ${clkErr.message}`);
          await page.evaluate(() => {
            const b = document.querySelector('button[data-testid="tweetButton"]') || document.querySelector('[data-testid="tweetButton"]');
            if (b) b.click();
          });
        });
      } else {
        console.log('[X Browser Bot] Botão não diretamente visível, tentativa programática no DOM...');
        await page.evaluate(() => {
          const b = document.querySelector('button[data-testid="tweetButton"]') || document.querySelector('[data-testid="tweetButton"]');
          if (b) b.click();
        });
      }
    }

    // Aguardar confirmação de rede do CreateTweet por até 10 segundos
    for (let i = 0; i < 10; i++) {
      if (tweetCreated) break;
      await page.waitForTimeout(1000);
    }

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

    if (!tweetCreated) {
      throw new Error(`Falha na confirmação da postagem no X: o endpoint CreateTweet não retornou sucesso. Alertas na tela: ${JSON.stringify(alerts)}`);
    }

    console.log(`🚀 [X Browser Bot] Sucesso absoluto! Tweet ID ${createdTweetId} confirmado na rede do X.`);
    return { success: true, tweetId: createdTweetId, apiResponses, alerts };
  } finally {
    await browser.close();
  }
}

module.exports = { postTweetViaBrowser };
