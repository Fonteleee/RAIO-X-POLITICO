/**
 * FIGURAS POLÍTICAS - BOT DE NAVEGADOR PARA O X (TWITTER)
 * Publicação autônoma via Playwright usando sessão de cookie (auth_token).
 * Custo: R$ 0,00 | Bypassa bloqueios de cobrança da API v2 do X.
 * 
 * ARQUITETURA DE RESILIÊNCIA & FALLBACK MULTINÍVEL:
 * 1. Estratégia Principal: Publicação enriquecida COM FOTO OFICIAL do político.
 * 2. Fallback Imediato: Se houver qualquer timeout/recusa de mídia no X,
 *    degrada graciosamente para TEXTO PURO + LINK DO DOSSIÊ (método comprovado).
 * 3. Confirmação de Rede: Valida o endpoint GraphQL CreateTweet (HTTP 200 + rest_id).
 */

const path = require('node:path');
const fs = require('node:fs');
const crypto = require('node:crypto');
const { chromium } = require('playwright');

/**
 * Executa uma tentativa de postagem com timeout, auto-dispensa de overlays e submissão redundante.
 * @param {import('playwright').Page} page
 * @param {string} cleanText
 * @param {string|null} imagePath
 * @param {string} strategyName
 * @param {string} outputDir
 * @returns {Promise<{success: boolean, tweetId: string|null, alerts: string[]}>}
 */
async function executeTweetAttempt(page, cleanText, imagePath, strategyName, outputDir) {
  console.log(`\n======================================================`);
  console.log(`[X Bot] Executando: ${strategyName} (Foto: ${imagePath ? 'SIM' : 'NÃO'})`);
  console.log(`======================================================`);

  let tweetCreated = false;
  let createdTweetId = null;

  // Interceptor de rede dedicado para CreateTweet
  const responseHandler = async (res) => {
    const u = res.url();
    if (u.includes('CreateTweet')) {
      try {
        const status = res.status();
        const body = await res.text();
        console.log(`[X Network API] CreateTweet -> HTTP ${status}`);
        if (status === 200) {
          const parsed = JSON.parse(body);
          const restId = parsed?.data?.create_tweet?.tweet_results?.result?.rest_id;
          if (restId) {
            tweetCreated = true;
            createdTweetId = restId;
            console.log(`🎉 [X Network API] Tweet criado com sucesso! ID do Tweet: ${restId}`);
          }
        } else {
          console.warn(`⚠️ [X Network API] CreateTweet erro ${status}: ${body.slice(0, 300)}`);
        }
      } catch (parseErr) {
        console.warn(`[X Network API] Falha ao processar corpo do CreateTweet: ${parseErr.message}`);
      }
    }
  };

  page.on('response', responseHandler);

  try {
    // 1. Navegar para a Home (rota mais estável do ecossistema do X)
    console.log('[X Bot] Acessando timeline inicial (https://x.com/home)...');
    await page.goto('https://x.com/home', {
      waitUntil: 'domcontentloaded',
      timeout: 35000
    }).catch(() => {});
    await page.waitForTimeout(2500);

    const currentUrl = page.url();
    console.log(`[X Bot] URL ativa: ${currentUrl} | Título: ${await page.title().catch(() => '')}`);

    // Verificar se caiu na tela de login
    if (currentUrl.includes('/login') || currentUrl.includes('/i/flow/login')) {
      throw new Error('Cookie inválido ou expirado: o X redirecionou para a página de login.');
    }

    // 2. Fechar possíveis diálogos de cookies, avisos ou notificações
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
          console.log(`[X Bot] Dispensando overlay: ${sel}...`);
          await btn.click().catch(() => {});
          await page.waitForTimeout(400);
        }
      }
    } catch {}

    // 3. Localizar o editor de texto (modal ou inline da home)
    const editorSelector = '[data-testid="tweetTextarea_0"], div[role="textbox"][contenteditable="true"]';
    let editor = page.locator(editorSelector).first();
    let isEditorVisible = await editor.isVisible().catch(() => false);

    // Se o editor inline não estiver aberto, tentar abrir modal via botão lateral
    if (!isEditorVisible) {
      console.log('[X Bot] Tentando abrir modal via botão lateral [data-testid="SideNav_NewTweet_Button"]...');
      const sideNavBtn = page.locator('[data-testid="SideNav_NewTweet_Button"]').first();
      if (await sideNavBtn.isVisible().catch(() => false)) {
        await sideNavBtn.click().catch(() => {});
        await page.waitForTimeout(2000);
        editor = page.locator(editorSelector).first();
        isEditorVisible = await editor.isVisible().catch(() => false);
      }
    }

    // Se ainda não estiver visível, tentar rota direta /compose/post
    if (!isEditorVisible) {
      console.log('[X Bot] Navegando para rota direta https://x.com/compose/post...');
      await page.goto('https://x.com/compose/post', {
        waitUntil: 'domcontentloaded',
        timeout: 30000
      }).catch(() => {});
      await page.waitForTimeout(2500);
      editor = page.locator(editorSelector).first();
      isEditorVisible = await editor.isVisible().catch(() => false);
    }

    if (!isEditorVisible) {
      await page.waitForSelector(editorSelector, { timeout: 12000 });
      editor = page.locator(editorSelector).first();
    }

    console.log('[X Bot] Focando no campo de texto...');
    await editor.click();
    await page.waitForTimeout(400);

    // Limpar conteúdo anterior
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Backspace');
    await page.waitForTimeout(200);

    // Digitar texto
    console.log(`[X Bot] Digitando texto do tweet (${cleanText.length} caracteres)...`);
    await editor.pressSequentially(cleanText, { delay: 8 });
    await page.waitForTimeout(1000);

    // 4. Anexar imagem oficial se fornecida
    if (imagePath && fs.existsSync(imagePath)) {
      try {
        console.log(`[X Bot] Anexando foto oficial do político: ${imagePath}...`);
        const fileInput = page.locator('input[data-testid="fileInput"], input[type="file"][accept*="image"], input[type="file"]').first();
        await fileInput.waitFor({ state: 'attached', timeout: 10000 });
        await fileInput.setInputFiles(path.resolve(imagePath));
        console.log('[X Bot] Aguardando processamento da foto pelo X...');

        // Aguardar preview ou reabilitação do botão de postar
        await page.waitForFunction(() => {
          const btn = document.querySelector('[data-testid="tweetButton"]') || document.querySelector('[data-testid="tweetButtonInline"]');
          return btn && btn.getAttribute('aria-disabled') !== 'true';
        }, { timeout: 18000 }).catch(() => {
          console.log('[X Bot] Timeout aguardando botão de tweet reabilitar, prosseguindo com envio...');
        });
        console.log('[X Bot] Processamento de foto concluído.');
      } catch (imgErr) {
        console.warn(`⚠️ [X Bot] Aviso ao anexar imagem: ${imgErr.message}. Continuando tentativa...`);
      }
    }

    // Salvar captura pré-clique
    await page.screenshot({ path: path.join(outputDir, `x_${strategyName.toLowerCase()}_before.png`) }).catch(() => {});

    // 5. Enviar tweet
    // Estratégia A: Foco no editor + atalho nativo Control+Enter
    console.log('[X Bot] Focando no editor e disparando envio via Control+Enter...');
    await editor.click();
    await editor.focus();
    await page.waitForTimeout(300);
    await page.keyboard.down('Control');
    await page.keyboard.press('Enter');
    await page.keyboard.up('Control');

    // Aguardar até 3s para conferir se CreateTweet foi disparado
    for (let i = 0; i < 6; i++) {
      if (tweetCreated) break;
      await page.waitForTimeout(500);
    }

    // Estratégia B: Se CreateTweet não disparou, clicar no botão oficial
    if (!tweetCreated) {
      console.log('[X Bot] Control+Enter não finalizou envio, acionando botão oficial de Tweet...');
      const postBtn = page.locator('button[data-testid="tweetButton"], button[data-testid="tweetButtonInline"], [data-testid="tweetButton"]').first();
      await postBtn.scrollIntoViewIfNeeded().catch(() => {});
      const isPostBtnVisible = await postBtn.isVisible().catch(() => false);
      if (isPostBtnVisible) {
        await postBtn.click({ timeout: 6000 }).catch(async () => {
          console.log('[X Bot] Fallback: disparo via click programático no DOM...');
          await page.evaluate(() => {
            const b = document.querySelector('button[data-testid="tweetButton"]') || document.querySelector('button[data-testid="tweetButtonInline"]');
            if (b) b.click();
          });
        });
      }
    }

    // Aguardar confirmação de rede do CreateTweet por até 8 segundos
    for (let i = 0; i < 8; i++) {
      if (tweetCreated) break;
      await page.waitForTimeout(1000);
    }

    // Salvar captura pós-clique
    await page.screenshot({ path: path.join(outputDir, `x_${strategyName.toLowerCase()}_after.png`) }).catch(() => {});

    const alerts = await page.locator('[data-testid="toast"], [role="alert"]').allInnerTexts().catch(() => []);
    if (alerts.length > 0) {
      console.log(`[X Bot] Alertas na tela: ${JSON.stringify(alerts)}`);
    }

    return { success: tweetCreated, tweetId: createdTweetId, alerts };
  } finally {
    page.off('response', responseHandler);
  }
}

/**
 * Publica um post no X através de um navegador Chromium headless com Fallback Multinível
 * @param {string} tweetText - Texto a ser postado (máx 280 caracteres)
 * @param {object} options - Opções adicionais (authToken, ct0, imagePath, headless)
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

    let finalResult = null;

    // =========================================================================
    // ESTRATÉGIA 1 (Principal): Tentar Publicação COM FOTO OFICIAL (se houver)
    // =========================================================================
    if (options.imagePath && fs.existsSync(options.imagePath)) {
      try {
        console.log('[X Autopilot] Tentando Estratégia Principal: Publicação COM FOTO OFICIAL...');
        const resMain = await executeTweetAttempt(page, cleanText, options.imagePath, 'COM_FOTO', outputDir);
        if (resMain && resMain.success) {
          console.log(`🚀 [X Autopilot] Sucesso na Estratégia Principal com foto! Tweet ID: ${resMain.tweetId}`);
          return { success: true, tweetId: resMain.tweetId, withPhoto: true };
        }
        console.warn('⚠️ [X Autopilot] Estratégia com foto não confirmou CreateTweet na rede. Acionando Fallback 1: Modo Texto Puro...');
      } catch (errMain) {
        console.warn(`⚠️ [X Autopilot] Erro na tentativa com foto: ${errMain.message}. Acionando Fallback 1: Modo Texto Puro...`);
      }
    }

    // =========================================================================
    // ESTRATÉGIA 2 (Fallback Imediato): Publicação em MODO TEXTO PURO (comprovado)
    // =========================================================================
    console.log('[X Autopilot] Executando Fallback 1: Publicação em Texto Puro com Link Oficial...');
    try {
      const resFallback = await executeTweetAttempt(page, cleanText, null, 'FALLBACK_TEXTO_PURO', outputDir);
      if (resFallback && resFallback.success) {
        console.log(`🚀 [X Autopilot] Sucesso no Fallback em Texto Puro! Tweet ID: ${resFallback.tweetId}`);
        return { success: true, tweetId: resFallback.tweetId, withPhoto: false };
      }
      finalResult = resFallback;
    } catch (errFallback) {
      console.warn(`⚠️ [X Autopilot] Fallback em texto puro também encontrou erro: ${errFallback.message}`);
    }

    // Se ambas as estratégias falharem, salvar screenshot final e reportar erro
    await page.screenshot({ path: path.join(outputDir, 'x_final_failure.png') }).catch(() => {});
    throw new Error(`Falha no envio do tweet em todas as estratégias (Com Foto e Fallback Texto Puro). Alertas: ${JSON.stringify(finalResult?.alerts || [])}`);
  } finally {
    await browser.close();
  }
}

module.exports = { postTweetViaBrowser };
