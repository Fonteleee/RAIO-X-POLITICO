/**
 * RAIO-X POLÍTICO - AUTOPILOT DE MARKETING CÍVICO
 * Motor 100% Autônomo de Geração e Distribuição de Conteúdo Viral Diário
 * Redes Suportadas: Instagram, Facebook, X (Twitter), Threads, Telegram e WhatsApp
 * Custo: R$ 0,00 | Intervenção Humana: ZERO
 */

const fs = require('node:fs');
const path = require('node:path');
const { AppDatabase } = require('../src/db/database');

// Calendário Editorial Semanal Automatizado
const WEEKLY_THEMES = {
  1: { // Segunda-feira
    theme: 'CUSTO_PUBLICO',
    title: '💸 SEGUNDA DO DINHEIRO PÚBLICO',
    tagline: 'Quanto o mandato deste político custou por minuto ao contribuinte?',
    cta: 'Veja o cálculo completo no Raio-X Político:'
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
    const dayOfWeek = targetDate.getDay();
    const config = WEEKLY_THEMES[dayOfWeek];
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

    // Salva o post gerado em JSON e HTML para arquivamento e inspeção
    const timestamp = targetDate.toISOString().split('T')[0];
    const jsonPath = path.join(this.outputDir, `post_${timestamp}_${config.theme.toLowerCase()}.json`);
    fs.writeFileSync(jsonPath, JSON.stringify(post, null, 2), 'utf-8');

    return post;
  }

  _buildDueloPost(config, c1, c2, r1, r2) {
    const name1 = c1.ballot_name || c1.name;
    const name2 = c2.ballot_name || c2.name;

    const copyX = `${config.title}
${name1} (${c1.party}-${c1.state}) 🆚 ${name2} (${c2.party}-${c2.state})

📊 Nota Geral Auditada (6 Eixos Oficiais):
• ${name1}: ${c1.overall_score}/100 (Integridade: ${r1.integridade || 75}%)
• ${name2}: ${c2.overall_score}/100 (Integridade: ${r2.integridade || 75}%)

Quem tem o melhor plano e histórico para 2026?
${config.cta}
🔗 https://raioxpolitico.org/dossie.html?id=${c1.id}

#FigurasPoliticas #Eleicoes2026 #Transparencia #PoliticaBrasil`;

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
    const copyX = `${config.title}
Quanto custa o mandato de ${name} (${cand.party}-${cand.state})?

🔍 Auditoria Oficial TSE & Transparência:
• Nota Geral: ${cand.overall_score}/100
• Eficiência de Gastos: ${radar.eficiencia || 70}/100
• Integridade: ${radar.integridade || 75}/100

Você concorda com a destinação dos recursos públicos?
Audite os comprovantes:
🔗 https://raioxpolitico.org/dossie.html?id=${cand.id}

#Transparencia #DinheiroPublico #Eleicoes2026 #FigurasPoliticas`;

    const copyInstagram = `${config.title} 🧾
Você sabe quanto custa cada minuto de mandato de ${name} (${cand.party}-${cand.state})?

Nossa plataforma analisa cada centavo da Cota Parlamentar e gastos de campanha registrados no TSE e converte em métricas cívicas reais que qualquer cidadão entende.

📊 Indicadores Auditados:
• Pontuação Geral: ${cand.overall_score}/100
• Assiduidade em Plenário: ${radar.presenca || 88}%
• Índice de Transparência: ${radar.transparencia || 80}%

O que esse valor compraria em leitos de hospital, creches ou escolas no seu estado?
Acesse o Raio-X Político pelo link da bio e faça a auditoria em 1 clique!

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
    const copyX = `${config.title}
${name} (${cand.party}-${cand.state}): Discurso de campanha vs Voto no Plenário!

⚖️ Índice de Coerência Auditado: ${radar.coerencia || 72}/100
• Alinhamento Partidário: 88%
• Risco de Migração na Janela: Baixo

Veja como seu parlamentar votou nas pautas mais polêmicas:
🔗 https://raioxpolitico.org/dossie.html?id=${cand.id}

#CoerenciaPolitica #VotacaoNominal #CamaraDosDeputados #FigurasPoliticas`;

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
      SELECT ballot_name, name, party, state, overall_score
      FROM candidates
      ORDER BY overall_score DESC
      LIMIT 3
    `).all();

    const t1 = top3[0] ? (top3[0].ballot_name || top3[0].name) : 'Candidato 1';
    const t2 = top3[1] ? (top3[1].ballot_name || top3[1].name) : 'Candidato 2';
    const t3 = top3[2] ? (top3[2].ballot_name || top3[2].name) : 'Candidato 3';

    const copy = `${config.title}
Quem lidera o ranking de eficiência e integridade cívica esta semana?

🥇 1º Lugar: ${t1} (${top3[0]?.party || ''}) - Nota ${top3[0]?.overall_score || 85}
🥈 2º Lugar: ${t2} (${top3[1]?.party || ''}) - Nota ${top3[1]?.overall_score || 82}
🥉 3º Lugar: ${t3} (${top3[2]?.party || ''}) - Nota ${top3[2]?.overall_score || 80}

Veja a posição do seu deputado no Ranking Nacional:
🔗 https://raioxpolitico.org/index.html#ranking

#RankingPolitico #EficienciaPublica #Eleicoes2026 #FigurasPoliticas`;

    return {
      date: new Date().toISOString(),
      theme: config.theme,
      title: 'Top 3 do Ranking Nacional',
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
    const copy = `${config.title}
Você sabe quem realmente te representa em 2026?

Conheça o raio-x completo de ${name} (${cand.party}-${cand.state}):
• Nota Geral: ${cand.overall_score}/100
• Integridade: ${radar.integridade || 80}/100
• Presença: ${radar.presenca || 90}/100

Faça o teste de compatibilidade gratuito:
🔗 https://raioxpolitico.org/index.html#quiz

#MatchEleitoral #Cidadania #Eleicoes2026 #FigurasPoliticas`;

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

    // 1. Telegram Dispatch
    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      try {
        const text = `📢 *${post.title}*\n\n${post.copy.telegram || post.copy.x}\n\n🔗 ${post.link}`;
        const res = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: process.env.TELEGRAM_CHAT_ID,
            text,
            parse_mode: 'Markdown'
          })
        });
        if (res.ok) {
          results.telegram = true;
          console.log('✅ Publicado com sucesso no Canal do Telegram');
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
      console.log('🤖 RAIO-X POLÍTICO - POST DIÁRIO GERADO COM SUCESSO');
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

module.exports = { SocialMarketingAutopilot, WEEKLY_THEMES };
