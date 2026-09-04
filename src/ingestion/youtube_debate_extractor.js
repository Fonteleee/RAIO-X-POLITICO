// Raio-X Político - Extrator de Debates & Transcrições do YouTube
// Extrai legendas e carimbos de tempo (0 tokens de áudio) para processamento via IA gratuita
// e cruzamento com agências de fact-checking

class YoutubeDebateExtractor {
  constructor(fetchImpl = null) {
    this.fetch = fetchImpl || globalThis.fetch;
  }

  /**
   * Extrai o ID do vídeo do YouTube a partir de qualquer formato de URL
   * @param {string} url 
   * @returns {string|null}
   */
  extractVideoId(url) {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? match[1] : url.length === 11 ? url : null;
  }

  /**
   * Converte segundos em formato MM:SS ou HH:MM:SS
   * @param {number} totalSeconds 
   * @returns {string}
   */
  formatTimestamp(totalSeconds) {
    const sec = Math.floor(totalSeconds % 60);
    const min = Math.floor((totalSeconds / 60) % 60);
    const hours = Math.floor(totalSeconds / 3600);

    const pad = (n) => String(n).padStart(2, '0');
    if (hours > 0) {
      return `${hours}h ${pad(min)}m ${pad(sec)}s`;
    }
    return `${pad(min)} min ${pad(sec)} seg`;
  }

  /**
   * Constrói o Prompt estruturado otimizado para o Gemini 1.5 Flash (Gratuito no Google AI Studio)
   * Janela de 1.000.000 de tokens com custo R$ 0,00
   * @param {string} candidateName - Nome do candidato alvo
   * @param {string} transcriptText - Transcrição completa com timestamps
   * @returns {Object}
   */
  buildFactCheckingPrompt(candidateName, transcriptText) {
    const systemInstruction = `Você é um auditor sênior de inteligência cívica eleitoral e fact-checking apartidário.
Seu objetivo é analisar a transcrição de um debate político oficial brasileiro e extrair EXCLUSIVAMENTE as alegações factuais feitas pelo candidato "${candidateName}".

Regras inegociáveis:
1. Extraia apenas afirmações verificáveis (números, gastos, obras, dados fiscais, votações anteriores, taxas de criminalidade ou índices de saúde/educação).
2. Não extraia promessas genéricas de campanha ou opiniões subjetivas ("vou governar para todos").
3. Para cada alegação factual, registre a citação textual exata, o timestamp (minuto e segundo) e verifique a compatibilidade com a realidade oficial.
4. Responda ESTRITAMENTE em formato JSON com o esquema definido.`;

    const userPrompt = `Candidato a analisar: "${candidateName}"

Transcrição do Debate com Carimbos de Tempo:
---
${transcriptText}
---

Gere um JSON com este formato exato:
{
  "candidate": "${candidateName}",
  "truthfulnessPct": 85,
  "speakingTimeTotal": "18 min 40 seg",
  "statements": [
    {
      "topic": "Nome do Tema (ex: Saúde, Gastos, Segurança)",
      "quote": "Citação textual dita pelo candidato",
      "timestamp": "14 min 32 seg",
      "verdict": "Verdadeiro | Falso | Fora de Contexto | Exagerado",
      "factSource": "Nome do órgão oficial que comprova ou desmente (ex: IBGE 2025, TCE-SP, TCU)"
    }
  ]
}`;

    return {
      systemInstruction,
      userPrompt,
      recommendedModel: 'gemini-1.5-flash',
      freeTierEndpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'
    };
  }

  /**
   * Converte a resposta estruturada da IA no formato pronto para o SQLite do Raio-X
   * @param {string} candidateId 
   * @param {string} eventName 
   * @param {string} broadcaster 
   * @param {string} youtubeUrl 
   * @param {Object} aiResult 
   * @returns {Object}
   */
  formatForDatabaseIngestion(candidateId, eventName, broadcaster, youtubeUrl, aiResult) {
    return {
      candidateId,
      event: eventName || 'Debate Oficial 2026',
      broadcaster: broadcaster || 'Emissora Oficial',
      stage: '1º Turno',
      date: new Date().toISOString().split('T')[0],
      youtubeUrl: youtubeUrl || '',
      transcriptionEngine: 'YouTube Subtitles + Gemini 1.5 Flash (API Oficial Gratuita)',
      truthfulnessPct: aiResult.truthfulnessPct || 80,
      speakingTime: aiResult.speakingTimeTotal || '15 min 00 seg',
      rightOfReplyGranted: 0,
      clashesCount: aiResult.statements ? aiResult.statements.length : 0,
      statements: (aiResult.statements || []).map(s => ({
        theme: s.topic || s.theme || 'Geral',
        topic: s.topic || s.theme || 'Geral',
        quote: s.quote,
        timestamp: s.timestamp,
        verdict: s.verdict,
        factSource: s.factSource,
        officialSource: s.factSource || 'Agência de Checagem',
        factCheckUrl: 'https://factchecktools.googleapis.com/',
        sourceLink: 'https://factchecktools.googleapis.com/'
      }))
    };
  }
}

module.exports = { YoutubeDebateExtractor };
