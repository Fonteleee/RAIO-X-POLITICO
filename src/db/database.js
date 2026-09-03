// Raio-X Político - Módulo de Banco de Dados Relacional
// Utiliza node:sqlite nativo do Node.js com consultas 100% parametrizadas (OWASP Compliance)

const { DatabaseSync } = require('node:sqlite');
const fs = require('node:fs');
const path = require('node:path');

const DEFAULT_DB_PATH = path.join(__dirname, '..', '..', 'data', 'raiox.db');

class AppDatabase {
  constructor(dbPath = DEFAULT_DB_PATH) {
    this.dbPath = dbPath;
    
    // Se for arquivo em disco, garante que o diretório data/ existe
    if (this.dbPath !== ':memory:') {
      const dir = path.dirname(this.dbPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    }

    this.db = new DatabaseSync(this.dbPath);
    this.initSchema();
  }

  initSchema() {
    const schemaPath = path.join(__dirname, 'schema.sql');
    if (fs.existsSync(schemaPath)) {
      const schemaSql = fs.readFileSync(schemaPath, 'utf8');
      this.db.exec(schemaSql);
    }
  }

  close() {
    this.db.close();
  }

  // Listagem simplificada para cards de feed e ranking
  getAllCandidates() {
    const stmt = this.db.prepare(`
      SELECT 
        c.id, c.name, c.ballot_name as ballotName, c.party, c.number, c.position, 
        c.state, c.city, c.age, c.avatar, c.overall_score as overallScore,
        m.integridade, m.eficiencia, m.transparencia, m.coerencia, m.viabilidade, m.assiduidade,
        a.rate_pct as attendanceRate, a.present_count as presentCount, a.total_sessions as totalSessions,
        s.monthly_spent as spendingCeapMonthly, s.spending_pct as spendingPercentage,
        s.cost_per_minute as costPerMinute, s.cost_per_citizen as costPerCitizen,
        am.total_executed as amendmentsExecuted, am.open_bid_pct as openBidPct, am.seal_badge as amendmentsSeal,
        p.datafolha as pollDatafolha, p.quaest as pollQuaest
      FROM candidates c
      LEFT JOIN candidate_metrics m ON m.candidate_id = c.id
      LEFT JOIN candidate_attendance a ON a.candidate_id = c.id
      LEFT JOIN candidate_spending s ON s.candidate_id = c.id
      LEFT JOIN candidate_amendments am ON am.candidate_id = c.id
      LEFT JOIN candidate_polls p ON p.candidate_id = c.id
      ORDER BY c.overall_score DESC
    `);
    return stmt.all();
  }

  // Dossiê completo de um candidato
  getCandidateById(id) {
    if (!id || typeof id !== 'string') return null;

    const candStmt = this.db.prepare(`
      SELECT id, name, ballot_name as ballotName, party, number, position, state, city, age, 
             avatar, education, career_history as careerHistory, ai_summary as aiSummary, 
             overall_score as overallScore
      FROM candidates WHERE id = ?
    `);
    const cand = candStmt.get(id);
    if (!cand) return null;

    // Métricas do Radar
    const metricsStmt = this.db.prepare(`SELECT integridade, eficiencia, transparencia, coerencia, viabilidade, assiduidade FROM candidate_metrics WHERE candidate_id = ?`);
    cand.radar = metricsStmt.get(id) || { integridade: 0, eficiencia: 0, transparencia: 0, coerencia: 0, viabilidade: 0, assiduidade: 0 };

    // Assiduidade
    const attStmt = this.db.prepare(`SELECT total_sessions as totalSessions, present_count as presentCount, justified_absences as justifiedAbsences, unjustified_absences as unjustifiedAbsences, rate_pct as ratePct FROM candidate_attendance WHERE candidate_id = ?`);
    cand.attendance = attStmt.get(id) || { totalSessions: 0, presentCount: 0, justifiedAbsences: 0, unjustifiedAbsences: 0, ratePct: 0 };

    // Gastos e Salário
    const spendStmt = this.db.prepare(`SELECT monthly_spent as spendingCeapMonthly, monthly_spent_num as spendingCeapMonthlyNum, limit_amount as limitCeapMonthly, limit_amount_num as limitCeapMonthlyNum, spending_pct as spendingPercentage, saved_total as savedCeapTotal, cost_per_minute as costPerMinute, cost_per_citizen as costPerCitizen, civic_salarios_minimos as civicSalariosMinimos, roi_text as roiText FROM candidate_spending WHERE candidate_id = ?`);
    const spend = spendStmt.get(id) || {};
    cand.salary = {
      spendingCeapMonthly: spend.spendingCeapMonthly || 'R$ 0,00',
      spendingCeapMonthlyNum: spend.spendingCeapMonthlyNum || 0,
      limitCeapMonthly: spend.limitCeapMonthly || 'R$ 0,00',
      limitCeapMonthlyNum: spend.limitCeapMonthlyNum || 0,
      spendingPercentage: spend.spendingPercentage || 0,
      savedCeapTotal: spend.savedCeapTotal || 'R$ 0,00',
      civicConversion: {
        costPerMinute: spend.costPerMinute || 'R$ 0,00',
        costPerCitizenYear: spend.costPerCitizen || 'R$ 0,00',
        salariosMinimos: spend.civicSalariosMinimos || 0,
        roiText: spend.roiText || ''
      }
    };

    // Emendas Parlamentares
    const amendStmt = this.db.prepare(`SELECT protocol, total_allocated as totalAllocated, total_executed as totalExecuted, execution_rate_pct as executionRatePct, open_bid_pct as openBidPct, direct_pix_pct as directPixPct, seal_level as sealLevel, seal_title as sealTitle, seal_badge as sealBadge FROM candidate_amendments WHERE candidate_id = ?`);
    cand.parliamentaryAmendments = amendStmt.get(id) || null;

    // Último Debate Oficial
    const debStmt = this.db.prepare(`SELECT event_name as event, broadcaster, stage, debate_date as date, youtube_url as youtubeUrl, transcription_engine as transcriptionEngine, truthfulness_pct as truthfulnessPct, speaking_time as speakingTime, right_of_reply_granted as rightOfReplyGranted, clashes_count as clashesCount FROM candidate_debate WHERE candidate_id = ?`);
    const deb = debStmt.get(id);
    if (deb) {
      const stmtStmt = this.db.prepare(`SELECT id, timestamp, theme, quote, verdict, verdict_class as verdictClass, fact_check_summary as factCheckSummary, official_source as officialSource, source_link as sourceLink FROM candidate_debate_statements WHERE candidate_id = ? ORDER BY order_index ASC`);
      deb.statements = stmtStmt.all(id) || [];
      cand.recentDebate = deb;
    } else {
      cand.recentDebate = null;
    }

    // Propostas de Governo
    const propStmt = this.db.prepare(`SELECT id, title, category, score, summary, problem_statement as problemStatement, solution_details as solutionDetails, budget_and_cost as budgetAndCost, timeline, pros, cons, support_votes as supportVotes, reject_votes as rejectVotes FROM candidate_proposals WHERE candidate_id = ?`);
    cand.proposals = propStmt.all(id) || [];

    // Pesquisas Eleitorais
    const pollStmt = this.db.prepare(`SELECT datafolha, ipec, quaest, atlas FROM candidate_polls WHERE candidate_id = ?`);
    cand.polls = pollStmt.get(id) || { datafolha: '--%', ipec: '--%', quaest: '--%', atlas: '--%' };

    return cand;
  }

  // Confronto direto entre 2 candidatos
  getComparison(id1, id2) {
    const cand1 = this.getCandidateById(id1);
    const cand2 = this.getCandidateById(id2);
    if (!cand1 || !cand2) return null;
    return { cand1, cand2 };
  }

  // Lista de parlamentares em exercício
  getIncumbents() {
    const stmt = this.db.prepare(`SELECT id, name, party, office, avatar, status FROM incumbents`);
    return stmt.all();
  }

  // Votação cívica em propostas
  voteProposal(proposalId, voteType) {
    if (!proposalId || typeof proposalId !== 'string') return false;
    const column = voteType === 'support' ? 'support_votes' : (voteType === 'reject' ? 'reject_votes' : null);
    if (!column) return false;

    const stmt = this.db.prepare(`UPDATE candidate_proposals SET ${column} = ${column} + 1 WHERE id = ?`);
    const res = stmt.run(proposalId);
    return res.changes > 0;
  }
}

module.exports = { AppDatabase, DEFAULT_DB_PATH };
