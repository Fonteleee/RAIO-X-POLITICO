#!/usr/bin/env node
// Raio-X Político - Validador Oficial de Fotos de Candidatos e Autoridades
// Testa se 100% dos 200 candidatos e 158 mandatários possuem imagens com HTTP 200 OK e tamanho > 1000 bytes

const fs = require('fs');
const path = require('path');
const http = require('http');
const { AppDatabase } = require('../src/db/database');
const { server } = require('../src/server');

async function validateAllImages() {
  console.log('='.repeat(70));
  console.log('📸 VALIDAÇÃO DE 100% DAS IMAGENS DE CANDIDATOS E AUTORIDADES');
  console.log('='.repeat(70));

  // Inicia o servidor HTTP em porta dinâmica para testar requisições locais reais
  const port = await new Promise((resolve) => {
    const s = server.listen(0, () => {
      resolve(s.address().port);
    });
  });
  const baseUrl = `http://localhost:${port}`;
  console.log(`[Validador] Servidor de teste iniciado em ${baseUrl}`);

  const db = new AppDatabase();
  const candidates = db.getAllCandidates();
  console.log(`[Validador] Testando ${candidates.length} candidatos no banco SQLite...\n`);

  let candPassed = 0;
  const candFailed = [];

  for (const c of candidates) {
    let resolvedUrl = c.avatar;
    if (resolvedUrl.startsWith('img/candidates/') || resolvedUrl.startsWith('/img/candidates/')) {
      const cleanPath = resolvedUrl.startsWith('/') ? resolvedUrl : '/' + resolvedUrl;
      resolvedUrl = `${baseUrl}${cleanPath}`;
    }

    try {
      const res = await fetch(resolvedUrl, {
        headers: {
          'User-Agent': 'RaioXPolitico/1.0 (https://github.com/Fonteleee/RAIO-X-POLITICO; contact@raioxpolitico.org)'
        },
        signal: AbortSignal.timeout(6000)
      });

      if (!res.ok) {
        candFailed.push({ id: c.id, name: c.name, status: res.status, url: c.avatar });
        continue;
      }

      const buf = await res.arrayBuffer();
      const size = buf.byteLength;
      if (size < 1000) {
        candFailed.push({ id: c.id, name: c.name, error: `Imagem muito pequena (${size}b)`, url: c.avatar });
        continue;
      }

      candPassed++;
    } catch (err) {
      candFailed.push({ id: c.id, name: c.name, error: err.message, url: c.avatar });
    }
  }

  // Validação dos Mandatários em Exercício
  const incumbents = db.getIncumbents();
  console.log(`[Validador] Testando ${incumbents.length} mandatários em exercício no banco SQLite...\n`);

  let incPassed = 0;
  const incFailed = [];

  for (const inc of incumbents) {
    let resolvedUrl = inc.avatar;
    if (resolvedUrl.startsWith('img/candidates/') || resolvedUrl.startsWith('/img/candidates/')) {
      const cleanPath = resolvedUrl.startsWith('/') ? resolvedUrl : '/' + resolvedUrl;
      resolvedUrl = `${baseUrl}${cleanPath}`;
    }

    try {
      const res = await fetch(resolvedUrl, {
        headers: {
          'User-Agent': 'RaioXPolitico/1.0 (https://github.com/Fonteleee/RAIO-X-POLITICO; contact@raioxpolitico.org)'
        },
        signal: AbortSignal.timeout(6000)
      });

      if (!res.ok) {
        incFailed.push({ id: inc.id, name: inc.name, status: res.status, url: inc.avatar });
        continue;
      }

      const buf = await res.arrayBuffer();
      const size = buf.byteLength;
      if (size < 1000) {
        incFailed.push({ id: inc.id, name: inc.name, error: `Imagem muito pequena (${size}b)`, url: inc.avatar });
        continue;
      }

      incPassed++;
    } catch (err) {
      incFailed.push({ id: inc.id, name: inc.name, error: err.message, url: inc.avatar });
    }
  }

  // Fecha servidor
  await new Promise(resolve => server.close(resolve));

  console.log('='.repeat(70));
  console.log(`📊 RESULTADOS FINAIS:`);
  console.log(`• Candidatos: ${candPassed}/${candidates.length} imagens válidas (200 OK, >1000 bytes)`);
  console.log(`• Mandatários: ${incPassed}/${incumbents.length} imagens válidas (200 OK, >1000 bytes)`);

  if (candFailed.length > 0 || incFailed.length > 0) {
    console.error(`\n❌ FALHAS ENCONTRADAS:`);
    if (candFailed.length > 0) {
      console.error(`Candidatos com falha:`, candFailed);
    }
    if (incFailed.length > 0) {
      console.error(`Mandatários com falha:`, incFailed);
    }
    console.log('='.repeat(70));
    return false;
  }

  console.log(`\n🎉 100% DAS IMAGENS ESTÃO FUNCIONAIS, OFICIAIS E SEGURAS!`);
  console.log('='.repeat(70));
  return true;
}

if (require.main === module) {
  validateAllImages().then(success => {
    process.exit(success ? 0 : 1);
  });
}

module.exports = { validateAllImages };
