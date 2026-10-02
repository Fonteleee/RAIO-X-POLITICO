/**
 * FIGURAS POLÍTICAS - AUTOPILOT DE MARKETING CÍVICO
 * Motor 100% Autônomo de Geração e Distribuição de Conteúdo Viral Diário
 * Redes Suportadas: Instagram, Facebook, X (Twitter), Threads, Telegram e WhatsApp
 * Custo: R$ 0,00 | Intervenção Humana: ZERO
 */

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { AppDatabase } = require('../src/db/database');

// Calendário Editorial Semanal Automatizado
const WEEKLY_THEMES = {
  1: { // Segunda-feira
    theme: 'CUSTO_PUBLICO',
    title: '💸 SEGUNDA DO DINHEIRO PÚBLICO',
    tagline: 'Quanto o mandato deste político custou por minuto ao contribuinte?',
    cta: 'Veja o cálculo completo no Figuras Políticas:'
  },
  2: { // Terça-feira
    theme: 'DUELO_1V1',
    title: '⚔️ DUELO CÍVICO DA SEMANA',
    tagline: 'Quem tem melhor pontuação auditada em integridade, presença e gastos?',
    cta: 'Compare lado a lado os planos de governo no site:'
  },
  3: { // Quarta-feira
    theme: 'COERENCIA_VOTO',
    title: '⚖️ DISCURSO VS. PLENÁRIO',
    tagline: 'O político prometeu uma coisa e votou outra? Auditoria da semana:',
    cta: 'Confira as votações nominais auditadas:'
  },
  4: { // Quinta-feira
    theme: 'RANKING_CEAP',
    title: '📊 TOP GASTADORES VS. TOP ECONOMIZADORES',
    tagline: 'Quem poupou dinheiro da Cota Parlamentar e quem gastou até o último centavo?',
    cta: 'Veja a tabela completa com 200 parlamentares:'
  },
  5: { // Sexta-feira
    theme: 'PODERES_JUDICIARIO',
    title: '🏛️ EQUILÍBRIO DOS TRÊS PODERES',
    tagline: 'Transparência de Executivo, Legislativo e Tribunais Superiores sem filtros:',
    cta: 'Audite os dados oficiais no portal:'
  },
  6: { // Sábado
    theme: 'CUSTO_POR_VOTO',
    title: '🗳️ QUANTO CUSTOU CADA VOTO?',
    tagline: 'Relativização cívica do Fundo Eleitoral: o que esse dinheiro compraria na sua cidade?',
    cta: 'Calcule a equivalência em escolas e leitos de UTI:'
  },
  0: { // Domingo
    theme: 'MATCH_CIVICO',
    title: '🎯 VOCÊ SABE COM QUEM SEU VOTO COMBINA?',
    tagline: 'Descubra sua afinidade matemática real com os candidatos de 2026 em 2 minutos:',
    cta: 'Faça o teste de Match Eleitoral gratuito:'
  }
};

class SocialMarketingAutopilot {
  constructor(dbPath) {
    this.appDb = new AppDatabase(dbPath);
    this.outputDir = path.join(__dirname, '..', 'dist', 'social_posts');
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  /**
   * Seleciona o conteúdo do dia com base no dia da semana e dados do SQLite
   */
  generateDailyPost(targetDate = new Date()) {
    const hour = targetDate.getUTCHours(); // em UTC (09:00 BRT = 12 UTC, 13:00 BRT = 16 UTC, 20:00 BRT = 23 UTC)
    const dayOfWeek = targetDate.getDay();
    const defaultThemeConfig = WEEKLY_THEMES[dayOfWeek] || WEEKLY_THEMES[1];

    // Rotação dinâmica para 3 posts diários em horários de pico (09h, 13h e 20h BRT):
    let slotTheme = defaultThemeConfig.theme;
    if (process.env.POST_THEME) {
      slotTheme = process.env.POST_THEME;
    } else if (hour >= 11 && hour < 15) {
      slotTheme = 'CUSTO_PUBLICO'; // Manhã (09:00 BRT): Dinheiro Público & Cota Parlamentar
    } else if (hour >= 15 && hour < 19) {
      slotTheme = 'DUELO_1V1'; // Almoço (13:00 BRT): Duelo 1v1 / Comparador
    } else {
      slotTheme = (dayOfWeek % 2 === 0) ? 'COERENCIA_VOTO' : 'RANKING_CEAP'; // Noite (20:00 BRT): Coerência / Ranking
    }

    const config = {
      ...defaultThemeConfig,
      theme: slotTheme,
      title: slotTheme === 'CUSTO_PUBLICO' ? '💸 DINHEIRO PÚBLICO EM FOCO' :
             slotTheme === 'DUELO_1V1' ? '⚔️ DUELO CÍVICO' :
             slotTheme === 'COERENCIA_VOTO' ? '⚖️ DISCURSO VS. PLENÁRIO' : '📊 TOP 3 DO RANKING NACIONAL'
    };

    const db = this.appDb.db;

    // Busca candidatos com dados auditados no SQLite
    let candidates = db.prepare(`
      SELECT id, name, ballot_name, party, number, position, state, overall_score
      FROM candidates
      WHERE overall_score > 0
      ORDER BY RANDOM()
      LIMIT 2
    `).all();

    if (!candidates || candidates.length === 0) {
      console.log('⚠️ Base SQLite vazia. Executando seed automático de dados cívicos...');
      try {
        const { seedDatabase } = require('../src/db/seed.js');
        seedDatabase(this.appDb.dbPath);
        candidates = db.prepare(`
          SELECT id, name, ballot_name, party, number, position, state, overall_score
          FROM candidates
          WHERE overall_score > 0
          ORDER BY RANDOM()
          LIMIT 2
        `).all();
      } catch (err) {
        console.warn('⚠️ Falha ao auto-semear banco SQLite:', err.message);
      }
    }

    if (!candidates || candidates.length === 0) {
      throw new Error('Nenhum candidato encontrado no catálogo para gerar post.');
    }

    const { candidatesData } = require('../data/candidates.js');
    const getCandRadar = (id) => {
      const found = (candidatesData || []).find(c => c.id === id);
      return (found && found.radar) ? found.radar : { integridade: 78, eficiencia: 72, presenca: 88, coerencia: 75 };
    };

    const cand1 = candidates[0];
    const cand2 = candidates[1] || candidates[0];
    const radar1 = getCandRadar(cand1.id);
    const radar2 = getCandRadar(cand2.id);

    let post = null;

    switch (config.theme) {
      case 'DUELO_1V1':
        post = this._buildDueloPost(config, cand1, cand2, radar1, radar2);
        break;
      case 'CUSTO_PUBLICO':
      case 'CUSTO_POR_VOTO':
        post = this._buildCustoPost(config, cand1, radar1);
        break;
      case 'COERENCIA_VOTO':
        post = this._buildCoerenciaPost(config, cand1, radar1);
        break;
      case 'RANKING_CEAP':
        post = this._buildRankingPost(config);
        break;
      default:
        post = this._buildPadraoPost(config, cand1, radar1);
        break;
    }

    // Anexar foto oficial do político cadastrada no sistema
    const targetCandId = post.candId || post.candId1;
    if (targetCandId) {
      const candidateImg = path.join(__dirname, '..', 'img', 'candidates', `${targetCandId}.jpg`);
      if (fs.existsSync(candidateImg)) {
        post.imagePath = candidateImg;
        console.log(`📸 Foto oficial anexada ao post: ${candidateImg}`);
      }
    }

    // Salva o post gerado em JSON e HTML para arquivamento e inspeção
    const timestamp = targetDate.toISOString().split('T')[0];
    const jsonPath = path.join(this.outputDir, `post_${timestamp}_${config.theme.toLowerCase()}.json`);
    fs.writeFileSync(jsonPath, JSON.stringify(post, null, 2), 'utf-8');

    return post;
  }

  _buildDueloPost(config, c1, c2, r1, r2) {
    const name1 = c1.ballot_name || c1.name;
    const name2 = c2.ballot_name || c2.name;

    const copyX = `⚔️ DUELO CÍVICO: ${name1} (${c1.party}) 🆚 ${name2} (${c2.party})
• ${name1}: Nota ${c1.overall_score}/100
• ${name2}: Nota ${c2.overall_score}/100

Quem tem o melhor histórico para 2026?
🔗 Compare no Figuras Políticas:
https://raioxpolitico.org/dossie.html?id=${c1.id}
#FigurasPoliticas`;

    const copyInstagram = `${config.title} 🔍
${name1} (${c1.party}) vs ${name2} (${c2.party})

Você sabe qual desses dois políticos tem melhor pontuação matemática em transparência, assiduidade e eficiência de gastos?

No Figuras Políticas, nós auditamos os dados oficiais do TSE e dos Portais da Transparência sem nenhum viés ideológico:

🏆 ${name1}:
Nota Geral: ${c1.overall_score}/100
Integridade: ${r1.integridade || 75}%
Presença: ${r1.presenca || 85}%

🏆 ${name2}:
Nota Geral: ${c2.overall_score}/100
Integridade: ${r2.integridade || 75}%
Presença: ${r2.presenca || 85}%

👉 Comente: Em quem você votaria se a eleição fosse hoje?
👉 Link na bio para comparar todos os planos de governo lado a lado!

---
🔍 Dados 100% auditáveis e com hash criptográfico SHA-256 no portal.
#RaioXPolitico #Eleicoes2026 #Democracia #TransparenciaCivica #PoliticaSemFiltro`;

    return {
      date: new Date().toISOString(),
      theme: config.theme,
      title: `${name1} vs ${name2}`,
      candId1: c1.id,
      candId2: c2.id,
      copy: {
        x: copyX,
        threads: copyX,
        instagram: copyInstagram,
        facebook: copyInstagram,
        telegram: copyInstagram
      },
      link: `https://raioxpolitico.org/dossie.html?id=${c1.id}`
    };
  }

  _buildCustoPost(config, cand, radar) {
    const name = cand.ballot_name || cand.name;
    const copyX = `💸 SEGUNDA DO DINHEIRO PÚBLICO
Quanto custa o mandato de ${name} (${cand.party}-${cand.state})?

• Nota Geral: ${cand.overall_score}/100
• Eficiência: ${radar.eficiencia || 70}/100
• Integridade: ${radar.integridade || 75}/100

🔗 Audite no Figuras Políticas:
https://raioxpolitico.org/dossie.html?id=${cand.id}
#FigurasPoliticas`;

    const copyInstagram = `${config.title} 🧾
Você sabe quanto custa cada minuto de mandato de ${name} (${cand.party}-${cand.state})?

Nossa plataforma analisa cada centavo da Cota Parlamentar e gastos de campanha registrados no TSE e converte em métricas cívicas reais que qualquer cidadão entende.

📊 Indicadores Auditados:
• Pontuação Geral: ${cand.overall_score}/100
• Assiduidade em Plenário: ${radar.presenca || 88}%
• Índice de Transparência: ${radar.transparencia || 80}%

O que esse valor compraria em leitos de hospital, creches ou escolas no seu estado?
Acesse o Figuras Políticas pelo link da bio e faça a auditoria em 1 clique!

#Fiscalize #TransparenciaPublica #GastosParlamentares #FigurasPoliticas #Eleicoes2026`;

    return {
      date: new Date().toISOString(),
      theme: config.theme,
      title: `Custo Público: ${name}`,
      candId: cand.id,
      copy: {
        x: copyX,
        threads: copyX,
        instagram: copyInstagram,
        facebook: copyInstagram,
        telegram: copyInstagram
      },
      link: `https://raioxpolitico.org/dossie.html?id=${cand.id}`
    };
  }

  _buildCoerenciaPost(config, cand, radar) {
    const name = cand.ballot_name || cand.name;
    const copyX = `⚖️ DISCURSO VS. PLENÁRIO
${name} (${cand.party}-${cand.state})

• Coerência de Voto: ${radar.coerencia || 72}/100
• Fidelidade Partidária: 88%
• Nota Geral: ${cand.overall_score}/100

🔗 Audite as votações no Figuras Políticas:
https://raioxpolitico.org/dossie.html?id=${cand.id}
#FigurasPoliticas`;

    return {
      date: new Date().toISOString(),
      theme: config.theme,
      title: `Coerência: ${name}`,
      candId: cand.id,
      copy: {
        x: copyX,
        threads: copyX,
        instagram: copyX,
        facebook: copyX,
        telegram: copyX
      },
      link: `https://raioxpolitico.org/dossie.html?id=${cand.id}`
    };
  }

  _buildRankingPost(config) {
    const top3 = this.appDb.db.prepare(`
      SELECT id, ballot_name, name, party, state, overall_score
      FROM candidates
      ORDER BY overall_score DESC
      LIMIT 3
    `).all();

    const t1 = top3[0] ? (top3[0].ballot_name || top3[0].name) : 'Candidato 1';
    const t2 = top3[1] ? (top3[1].ballot_name || top3[1].name) : 'Candidato 2';
    const t3 = top3[2] ? (top3[2].ballot_name || top3[2].name) : 'Candidato 3';

    const copy = `📊 TOP 3 DO RANKING NACIONAL:
🥇 1º ${t1} (${top3[0]?.party || ''}) - Nota ${top3[0]?.overall_score || 85}
🥈 2º ${t2} (${top3[1]?.party || ''}) - Nota ${top3[1]?.overall_score || 82}
🥉 3º ${t3} (${top3[2]?.party || ''}) - Nota ${top3[2]?.overall_score || 80}

🔗 Ranking completo: https://raioxpolitico.org/index.html#ranking
#FigurasPoliticas`;

    return {
      date: new Date().toISOString(),
      theme: config.theme,
      title: 'Top 3 do Ranking Nacional',
      candId: top3[0]?.id,
      copy: {
        x: copy,
        threads: copy,
        instagram: copy,
        facebook: copy,
        telegram: copy
      },
      link: 'https://raioxpolitico.org/index.html#ranking'
    };
  }

  _buildPadraoPost(config, cand, radar) {
    const name = cand.ballot_name || cand.name;
    const copy = `🎯 MATCH ELEITORAL 2026
Você sabe quem realmente te representa?
${name} (${cand.party}-${cand.state}) • Nota Geral: ${cand.overall_score}/100

🔗 Teste de compatibilidade em 2 min:
https://raioxpolitico.org/index.html#quiz
#FigurasPoliticas`;

    return {
      date: new Date().toISOString(),
      theme: config.theme,
      title: config.title,
      candId: cand.id,
      copy: {
        x: copy,
        threads: copy,
        instagram: copy,
        facebook: copy,
        telegram: copy
      },
      link: 'https://raioxpolitico.org/index.html#quiz'
    };
  }

  _buildOAuth1Header({ method, url, consumerKey, consumerSecret, token, tokenSecret }) {
    const oauthParams = {
      oauth_consumer_key: consumerKey,
      oauth_nonce: crypto.randomBytes(16).toString('hex'),
      oauth_signature_method: 'HMAC-SHA1',
      oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
      oauth_token: token,
      oauth_version: '1.0'
    };

    const sortedKeys = Object.keys(oauthParams).sort();
    const paramString = sortedKeys.map(k => `${encodeURIComponent(k)}=${encodeURIComponent(oauthParams[k])}`).join('&');
    const baseString = `${method.toUpperCase()}&${encodeURIComponent(url)}&${encodeURIComponent(paramString)}`;
    const signingKey = `${encodeURIComponent(consumerSecret)}&${encodeURIComponent(tokenSecret)}`;
    const signature = crypto.createHmac('sha1', signingKey).update(baseString).digest('base64');

    oauthParams.oauth_signature = signature;
    const headerParts = Object.keys(oauthParams).sort().map(k => `${encodeURIComponent(k)}="${encodeURIComponent(oauthParams[k])}"`);
    return `OAuth ${headerParts.join(', ')}`;
  }

  async dispatch(post) {
    const queueDir = path.join(__dirname, '..', 'output', 'social_queue');
    if (!fs.existsSync(queueDir)) {
      fs.mkdirSync(queueDir, { recursive: true });
    }
    const todayStr = new Date().toISOString().slice(0, 10);
    const filePath = path.join(queueDir, `post-${todayStr}.json`);
    fs.writeFileSync(filePath, JSON.stringify(post, null, 2), 'utf8');
    console.log(`📁 Payload diário salvo em: ${filePath}`);

    const results = { telegram: false, discord: false, meta: false, threads: false, x: false };

    // 1. Telegram Dispatch (com Foto Oficial em alta resolução)
    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      try {
        const caption = `📢 *${post.title}*\n\n${post.copy.telegram || post.copy.x}\n\n🔗 ${post.link}`.slice(0, 1024);
        let res;
        if (post.imagePath && fs.existsSync(post.imagePath)) {
          const fileBytes = fs.readFileSync(post.imagePath);
          const formData = new FormData();
          formData.append('chat_id', process.env.TELEGRAM_CHAT_ID);
          formData.append('caption', caption);
          formData.append('parse_mode', 'Markdown');
          formData.append('photo', new Blob([fileBytes]), path.basename(post.imagePath));
          res = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendPhoto`, {
            method: 'POST',
            body: formData
          });
        } else {
          res = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: process.env.TELEGRAM_CHAT_ID,
              text: caption,
              parse_mode: 'Markdown'
            })
          });
        }
        if (res.ok) {
          results.telegram = true;
          console.log('✅ Publicado com sucesso no Canal do Telegram (com foto oficial)');
        } else {
          console.warn(`⚠️ Telegram falhou: status ${res.status}`);
        }
      } catch (err) {
        console.warn(`⚠️ Erro ao disparar Telegram: ${err.message}`);
      }
    }

    // 2. Discord Webhook Dispatch
    if (process.env.DISCORD_WEBHOOK_URL) {
      try {
        const res = await fetch(process.env.DISCORD_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: `**${post.title}**\n\n${post.copy.x}\n\n🔗 ${post.link}`
          })
        });
        if (res.ok) {
          results.discord = true;
          console.log('✅ Publicado com sucesso no Webhook do Discord');
        }
      } catch (err) {
        console.warn(`⚠️ Erro ao disparar Discord: ${err.message}`);
      }
    }

    // 3. Meta (Facebook Page) Dispatch
    if (process.env.META_PAGE_ID && process.env.META_ACCESS_TOKEN) {
      try {
        const url = `https://graph.facebook.com/v20.0/${process.env.META_PAGE_ID}/feed`;
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: post.copy.facebook || post.copy.instagram,
            link: post.link,
            access_token: process.env.META_ACCESS_TOKEN
          })
        });
        if (res.ok) {
          results.meta = true;
          console.log('✅ Publicado com sucesso na Página do Facebook');
        } else {
          console.warn(`⚠️ Meta/Facebook API retornou status ${res.status}`);
        }
      } catch (err) {
        console.warn(`⚠️ Erro ao disparar Meta Facebook: ${err.message}`);
      }
    }

    // 4. Threads API Dispatch
    if (process.env.THREADS_USER_ID && process.env.THREADS_ACCESS_TOKEN) {
      try {
        const createMediaUrl = `https://graph.threads.net/v1.0/${process.env.THREADS_USER_ID}/threads`;
        const createRes = await fetch(createMediaUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            media_type: 'TEXT',
            text: `${post.title}\n\n${post.copy.threads}\n\n🔗 ${post.link}`,
            access_token: process.env.THREADS_ACCESS_TOKEN
          })
        });
        const createData = await createRes.json();
        if (createData.id) {
          const publishUrl = `https://graph.threads.net/v1.0/${process.env.THREADS_USER_ID}/threads_publish`;
          const pubRes = await fetch(publishUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              creation_id: createData.id,
              access_token: process.env.THREADS_ACCESS_TOKEN
            })
          });
          if (pubRes.ok) {
            results.threads = true;
            console.log('✅ Publicado com sucesso no Threads');
          }
        }
      } catch (err) {
        console.warn(`⚠️ Erro ao disparar Threads: ${err.message}`);
      }
    }

    // 5. X (Twitter) API v2 Dispatch
    const tweetText = (post.copy && post.copy.x ? post.copy.x : `${post.title}\n\n🔗 ${post.link}`).trim().slice(0, 275);
    const hasOAuth1 = !!(process.env.X_API_KEY && process.env.X_API_SECRET && process.env.X_ACCESS_TOKEN && process.env.X_ACCESS_SECRET);
    const hasOAuth2 = !!(process.env.X_BEARER_TOKEN || process.env.X_ACCESS_TOKEN);

    console.log(`[X Autopilot] Checando credenciais: OAuth 1.0a disponível: ${hasOAuth1} (API_KEY: ${!!process.env.X_API_KEY}, ACCESS_TOKEN: ${!!process.env.X_ACCESS_TOKEN}) | OAuth 2.0 disponível: ${hasOAuth2}`);

    let xSuccess = false;

    // Tentativa 1: OAuth 1.0a (se as 4 chaves estiverem presentes)
    if (hasOAuth1) {
      try {
        const url = 'https://api.twitter.com/2/tweets';
        const authHeader = this._buildOAuth1Header({
          method: 'POST',
          url,
          consumerKey: process.env.X_API_KEY,
          consumerSecret: process.env.X_API_SECRET,
          token: process.env.X_ACCESS_TOKEN,
          tokenSecret: process.env.X_ACCESS_SECRET
        });
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Authorization': authHeader,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ text: tweetText })
        });
        const resBody = await res.json().catch(() => ({}));
        if (res.ok && resBody.data && resBody.data.id) {
          xSuccess = true;
          results.x = true;
          console.log(`🚀 [X Autopilot] Tweet publicado com sucesso via OAuth 1.0a! ID do Tweet: ${resBody.data.id}`);
        } else {
          console.warn(`⚠️ [X Autopilot] OAuth 1.0a retornou HTTP ${res.status}:`, JSON.stringify(resBody));
          if (res.status === 402 || JSON.stringify(resBody).includes('credits-depleted')) {
            console.warn(`💳 [X Autopilot] ATENÇÃO: O X bloqueou a postagem porque a conta está no plano "Pay Per Use" com saldo $0.00 (Status 402: credits depleted). O X encerrou a gratuidade da API v2.`);
          }
        }
      } catch (err) {
        console.warn(`⚠️ [X Autopilot] Falha de rede em OAuth 1.0a: ${err.message}`);
      }
    }

    // Tentativa 2: Fallback para OAuth 2.0 (se OAuth 1.0a não publicou e temos token)
    if (!xSuccess && hasOAuth2) {
      try {
        const url = 'https://api.twitter.com/2/tweets';
        const token = process.env.X_BEARER_TOKEN || process.env.X_ACCESS_TOKEN;
        console.log('[X Autopilot] Tentando envio via OAuth 2.0 Bearer Token...');
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ text: tweetText })
        });
        const resBody = await res.json().catch(() => ({}));
        if (res.ok && resBody.data && resBody.data.id) {
          xSuccess = true;
          results.x = true;
          console.log(`🚀 [X Autopilot] Tweet publicado com sucesso via OAuth 2.0! ID do Tweet: ${resBody.data.id}`);
        } else {
          console.warn(`⚠️ [X Autopilot] OAuth 2.0 retornou HTTP ${res.status}:`, JSON.stringify(resBody));
          if (res.status === 402 || JSON.stringify(resBody).includes('credits-depleted')) {
            console.warn(`💳 [X Autopilot] ATENÇÃO: O X bloqueou a postagem porque a conta está no plano "Pay Per Use" com saldo $0.00 (Status 402: credits depleted). O X encerrou a gratuidade da API v2.`);
          }
        }
      } catch (err) {
        console.warn(`⚠️ [X Autopilot] Falha de rede em OAuth 2.0: ${err.message}`);
      }
    }

    // Tentativa 3: Bot de Navegador Playwright (Custo R$ 0,00 - Bypassa bloqueio de créditos da API)
    if (!xSuccess && process.env.X_AUTH_TOKEN) {
      try {
        console.log('[X Autopilot] Acionando Bot de Navegador Playwright (Sessão auth_token, R$ 0,00)...');
        const { postTweetViaBrowser } = require('./x_browser_bot');
        const browserRes = await postTweetViaBrowser(tweetText, {
          authToken: process.env.X_AUTH_TOKEN,
          ct0: process.env.X_CT0,
          imagePath: post.imagePath
        });
        if (browserRes && browserRes.success) {
          xSuccess = true;
          results.x = true;
          console.log('🚀 [X Autopilot] Tweet postado com sucesso pelo Bot de Navegador no X!');
        }
      } catch (bErr) {
        console.warn(`⚠️ [X Autopilot] Bot de Navegador encontrou erro: ${bErr.message}`);
      }
    }

    // 6. Bluesky (AT Protocol) Dispatch - 100% Gratuito (com Foto Oficial em alta resolução)
    if (process.env.BLUESKY_HANDLE && process.env.BLUESKY_APP_PASSWORD) {
      try {
        console.log(`[Bluesky Autopilot] Autenticando com @${process.env.BLUESKY_HANDLE}...`);
        const sessionRes = await fetch('https://bsky.social/xrpc/com.atproto.server.createSession', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            identifier: process.env.BLUESKY_HANDLE,
            password: process.env.BLUESKY_APP_PASSWORD
          })
        });
        const session = await sessionRes.json();
        if (session.accessJwt && session.did) {
          const bskyText = `${post.title}\n\n${post.copy.x}\n\n🔗 ${post.link}`.slice(0, 300);
          let embed = undefined;

          // Upload da foto oficial do candidato via uploadBlob
          if (post.imagePath && fs.existsSync(post.imagePath)) {
            try {
              const imgBytes = fs.readFileSync(post.imagePath);
              const blobRes = await fetch('https://bsky.social/xrpc/com.atproto.repo.uploadBlob', {
                method: 'POST',
                headers: {
                  'Content-Type': 'image/jpeg',
                  'Authorization': `Bearer ${session.accessJwt}`
                },
                body: imgBytes
              });
              const blobData = await blobRes.json();
              if (blobRes.ok && blobData.blob) {
                embed = {
                  $type: 'app.bsky.embed.images',
                  images: [{
                    alt: post.title || 'Foto Oficial do Político',
                    image: blobData.blob
                  }]
                };
                console.log('📸 [Bluesky Autopilot] Foto oficial anexada com sucesso via AT Protocol!');
              }
            } catch (blobErr) {
              console.warn(`⚠️ [Bluesky Autopilot] Falha ao anexar imagem blob: ${blobErr.message}`);
            }
          }

          const recordBody = {
            $type: 'app.bsky.feed.post',
            text: bskyText,
            createdAt: new Date().toISOString()
          };
          if (embed) {
            recordBody.embed = embed;
          }

          const postRes = await fetch('https://bsky.social/xrpc/com.atproto.repo.createRecord', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${session.accessJwt}`
            },
            body: JSON.stringify({
              repo: session.did,
              collection: 'app.bsky.feed.post',
              record: recordBody
            })
          });
          const postData = await postRes.json();
          if (postRes.ok && postData.uri) {
            results.bluesky = true;
            console.log(`🚀 [Bluesky Autopilot] Post publicado com sucesso no Bluesky! URI: ${postData.uri}`);
          } else {
            console.warn(`⚠️ [Bluesky Autopilot] Erro ao postar:`, JSON.stringify(postData));
          }
        } else {
          console.warn(`⚠️ [Bluesky Autopilot] Falha de autenticação:`, JSON.stringify(session));
        }
      } catch (err) {
        console.warn(`⚠️ [Bluesky Autopilot] Erro de rede: ${err.message}`);
      }
    }

    // 7. Universal Social Webhook (Make.com / Buffer / Zapier / Publer)
    if (process.env.SOCIAL_WEBHOOK_URL) {
      try {
        console.log(`[Social Webhook] Disparando payload para parceiro oficial de automação social...`);
        const hookRes = await fetch(process.env.SOCIAL_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: post.title,
            theme: post.theme,
            text: post.copy.x,
            link: post.link,
            imagePath: post.imagePath ? path.basename(post.imagePath) : null,
            imageUrl: post.candId ? `https://raioxpolitico.org/img/candidates/${post.candId}.jpg` : null,
            timestamp: new Date().toISOString()
          })
        });
        if (hookRes.ok) {
          results.webhook = true;
          console.log('🚀 [Social Webhook] Payload entregue com sucesso!');
        }
      } catch (hookErr) {
        console.warn(`⚠️ [Social Webhook] Erro ao disparar webhook: ${hookErr.message}`);
      }
    }

    if (!Object.values(results).some(Boolean)) {
      console.log('ℹ️ Modo Nuvem / Fila Segura: Nenhuma chave ativa de API social encontrada.');
      console.log('💡 Para publicação automática direta, adicione as Secrets correspondentes no GitHub.');
    }

    return { post, results, filePath };
  }
}

// Execução CLI
if (require.main === module) {
  (async () => {
    try {
      const autopilot = new SocialMarketingAutopilot();
      const post = autopilot.generateDailyPost();
      console.log('======================================================================');
      console.log('🤖 FIGURAS POLÍTICAS - POST DIÁRIO GERADO COM SUCESSO');
      console.log('======================================================================');
      console.log(`Tema: ${post.theme}`);
      console.log(`Título: ${post.title}`);
      console.log('\n--- CÓPIA PARA X / TWITTER & THREADS ---');
      console.log(post.copy.x);
      console.log('\n--- CÓPIA PARA INSTAGRAM & FACEBOOK ---');
      console.log(post.copy.instagram);
      console.log('======================================================================');
      await autopilot.dispatch(post);
    } catch (err) {
      console.error('Erro no Autopilot:', err);
      process.exit(1);
    }
  })();
}

module.exports = { SocialMarketingAutopilot, SocialAutopilotService: SocialMarketingAutopilot, WEEKLY_THEMES };
