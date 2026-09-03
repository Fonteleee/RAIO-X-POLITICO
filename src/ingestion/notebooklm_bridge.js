// Raio-X Político - Bridge de Ingestão do NotebookLM & Debates Oficiais
// Automatiza a extração e inserção de falas transcritas com carimbos de tempo e provas oficiais

const { AppDatabase } = require('../db/database');

class NotebookLMBridge {
  constructor(db = null) {
    this.db = db || new AppDatabase();
  }

  /**
   * Processa o resultado de um debate analisado via NotebookLM e atualiza o banco SQLite
   * @param {Object} debateData - Dados consolidados do debate
   */
  async ingestDebateResult(debateData) {
    if (!debateData || !debateData.candidateId) {
      throw new Error('candidateId é obrigatório para ingestão de debate');
    }

    const { candidateId, event, broadcaster, stage, date, youtubeUrl, transcriptionEngine, truthfulnessPct, speakingTime, rightOfReplyGranted, clashesCount, statements } = debateData;

    const rawDb = this.db.db;

    rawDb.exec('BEGIN TRANSACTION');
    try {
      // Atualiza ou insere o registro mestre do debate para o candidato
      const upsertDebate = rawDb.prepare(`
        INSERT INTO candidate_debate (candidate_id, event_name, broadcaster, stage, debate_date, youtube_url, transcription_engine, truthfulness_pct, speaking_time, right_of_reply_granted, clashes_count)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(candidate_id) DO UPDATE SET
          event_name = excluded.event_name,
          broadcaster = excluded.broadcaster,
          stage = excluded.stage,
          debate_date = excluded.debate_date,
          youtube_url = excluded.youtube_url,
          transcription_engine = excluded.transcription_engine,
          truthfulness_pct = excluded.truthfulness_pct,
          speaking_time = excluded.speaking_time,
          right_of_reply_granted = excluded.right_of_reply_granted,
          clashes_count = excluded.clashes_count
      `);

      upsertDebate.run(
        candidateId,
        event || 'Debate Oficial 2026',
        broadcaster || 'Emissora Oficial',
        stage || '1º Turno',
        date || new Date().toISOString().split('T')[0],
        youtubeUrl || '',
        transcriptionEngine || 'NotebookLM AI Audio Engine v2.4 (Diarização & Timestamps)',
        truthfulnessPct || 80,
        speakingTime || '18 min 00 seg',
        rightOfReplyGranted || 0,
        clashesCount || 0
      );

      // Limpa falas anteriores desse candidato no debate e reinsere as checadas
      const deleteStatements = rawDb.prepare(`DELETE FROM candidate_debate_statements WHERE candidate_id = ?`);
      deleteStatements.run(candidateId);

      if (Array.isArray(statements)) {
        const insertStmt = rawDb.prepare(`
          INSERT INTO candidate_debate_statements (id, candidate_id, timestamp, theme, quote, verdict, verdict_class, fact_check_summary, official_source, source_link, order_index)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        statements.forEach((stmt, idx) => {
          const verdictClass = stmt.verdict.toLowerCase().includes('verdadeiro')
            ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/30'
            : (stmt.verdict.toLowerCase().includes('falso')
              ? 'bg-rose-100 dark:bg-rose-500/20 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-500/30'
              : 'bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-500/30');

          insertStmt.run(
            stmt.id || `stmt-${candidateId}-${Date.now()}-${idx}`,
            candidateId,
            stmt.timestamp || '00:00:00',
            stmt.theme || 'Geral',
            stmt.quote,
            stmt.verdict,
            stmt.verdictClass || verdictClass,
            stmt.factCheckSummary || '',
            stmt.officialSource || 'Portal da Transparência',
            stmt.sourceLink || 'https://www.tse.jus.br',
            idx
          );
        });
      }

      rawDb.exec('COMMIT');
      console.log(`[NotebookLM Bridge] Ingestão de debate concluída com sucesso para o candidato ${candidateId}!`);
      return { success: true, candidateId, statementsCount: statements ? statements.length : 0 };
    } catch (err) {
      rawDb.exec('ROLLBACK');
      console.error('[NotebookLM Bridge] Erro na ingestão de debate:', err);
      throw err;
    }
  }
}

module.exports = { NotebookLMBridge };
