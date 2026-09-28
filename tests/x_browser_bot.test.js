// Testes do Bot de Navegador Autônomo para X (Twitter)
// Utiliza Node.js native test runner (node --test)

const test = require('node:test');
const assert = require('node:assert/strict');
const { postTweetViaBrowser } = require('../scripts/x_browser_bot');

test('X Browser Bot: Validação de Segurança e Parâmetros Obrigatórios', async (t) => {
  await t.test('deve rejeitar se X_AUTH_TOKEN estiver ausente', async () => {
    await assert.rejects(
      async () => {
        await postTweetViaBrowser('Post de teste', { authToken: '' });
      },
      /X_AUTH_TOKEN não configurado/
    );
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
});
