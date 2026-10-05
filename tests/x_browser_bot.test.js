// Testes do Bot de Navegador Autônomo para X (Twitter)
// Utiliza Node.js native test runner (node --test)

const test = require('node:test');
const assert = require('node:assert/strict');
const { postTweetViaBrowser } = require('../scripts/x_browser_bot');
const { testXSession } = require('../scripts/test_x_session');

test('X Browser Bot: Validação de Segurança e Parâmetros Obrigatórios', async (t) => {
  await t.test('deve rejeitar se X_AUTH_TOKEN estiver ausente', async () => {
    const origToken = process.env.X_AUTH_TOKEN;
    delete process.env.X_AUTH_TOKEN;
    try {
      await assert.rejects(
        async () => {
          await postTweetViaBrowser('Post de teste', { authToken: '' });
        },
        /X_AUTH_TOKEN/
      );
    } finally {
      if (origToken) process.env.X_AUTH_TOKEN = origToken;
    }
  });

  await t.test('deve rejeitar se o texto do tweet estiver vazio', async () => {
    await assert.rejects(
      async () => {
        await postTweetViaBrowser('', { authToken: 'fake-token-123' });
      },
      /Texto do tweet está vazio/
    );
  });

  await t.test('deve exportar a função postTweetViaBrowser corretamente', () => {
    assert.equal(typeof postTweetViaBrowser, 'function');
  });

  await t.test('deve exportar a função testXSession para diagnóstico de sessão', () => {
    assert.equal(typeof testXSession, 'function');
  });

  await t.test('testXSession deve alertar com código de saída limpo se auth_token ausente', async () => {
    const origToken = process.env.X_AUTH_TOKEN;
    delete process.env.X_AUTH_TOKEN;
    try {
      const res = await testXSession();
      assert.equal(res.success, false);
      assert.equal(res.reason, 'AUTH_TOKEN_MISSING');
    } finally {
      if (origToken) process.env.X_AUTH_TOKEN = origToken;
    }
  });
});
