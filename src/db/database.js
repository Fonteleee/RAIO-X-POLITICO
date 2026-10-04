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
        c.state, c.city, c.age, c.avatar, c.education, c.career_history as careerHistory,
        c.ai_summary as aiSummary, c.overall_score as overallScore,
        m.integridade, m.eficiencia, m.transparencia, m.coerencia, m.viabilidade, m.assiduidade,
        a.rate_pct as attendanceRate, a.present_count as presentCount, a.total_sessions as totalSessions,
        s.monthly_spent as spendingCeapMonthly, s.spending_pct as spendingPercentage,
        s.cost_per_minute as costPerMinute, s.cost_per_citizen as costPerCitizen,
        s.roi_text as roiText,
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
    const candidates = stmt.all();

    // Consolidated queries to prevent N+1 problem
    const allProps = this.db.prepare(`
      SELECT id, candidate_id, title, category, score, summary, budget_and_cost as budgetAndCost, support_votes as supportVotes, reject_votes as rejectVotes 
      FROM candidate_proposals
    `).all();
    const propsByCand = {};
    for (const p of allProps) {
      if (!propsByCand[p.candidate_id]) propsByCand[p.candidate_id] = [];
      propsByCand[p.candidate_id].push(p);
    }

    const allBills = this.db.prepare(`
      SELECT candidate_id, total_proposed as total, annual_avg as annualAvgProposed, approved, annual_approved as annualAvgApproved,
             success_rate_pct as approvalRatePct, fiscal_count as fiscalCount, highlight_json as highlightJson, mandates_json as mandatesJson
      FROM candidate_bills
    `).all();
    const billsByCand = {};
    for (const b of allBills) billsByCand[b.candidate_id] = b;

    const allJur = this.db.prepare(`
      SELECT candidate_id, constitutional_duties as constitutionalDuties, coverage_pct as coveragePct, covered_count as coveredCount,
             total_count as totalCount, priority_goal as priorityGoal, problems_json as problemsJson
      FROM candidate_jurisdiction
    `).all();
    const jurByCand = {};
    for (const j of allJur) jurByCand[j.candidate_id] = j;

    const allCamp = this.db.prepare(`
      SELECT candidate_id, election_year as electionYear, office_elected as officeElected, total_spent as totalSpent,
             total_spent_formatted as totalSpentFormatted, total_received as totalReceived,
             total_received_formatted as totalReceivedFormatted, votes_received as votesReceived,
             cost_per_vote as costPerVote, tse_spending_limit as tseSpendingLimit, status_tse as statusTse,
             public_fund_pct as publicFundPct, private_donations_pct as privateDonationsPct,
             own_resources_pct as ownResourcesPct, crowdfunding_pct as crowdfundingPct,
             top_donors_json as topDonorsJson, top_expenses_json as topExpensesJson, tse_url as tseUrl
      FROM candidate_campaign_finance
    `).all();
    const campByCand = {};
    for (const c of allCamp) campByCand[c.candidate_id] = c;

    const allPolCap = this.db.prepare(`
      SELECT candidate_id, score, level, academic_degree as academicDegree, academic_details as academicDetails,
             political_schools as politicalSchools, political_exam_score as politicalExamScore,
             public_track_record_years as publicTrackRecordYears, public_track_record_text as publicTrackRecordText,
             technical_skills_json as technicalSkillsJson, anti_fool_evaluation as antiFoolEvaluation
      FROM candidate_political_capacity
    `).all();
    const polCapByCand = {};
    for (const pc of allPolCap) polCapByCand[pc.candidate_id] = pc;

    for (const cand of candidates) {
      cand.proposals = propsByCand[cand.id] || [];
      cand.radar = {
        integridade: cand.integridade || 90,
        eficiencia: cand.eficiencia || 90,
        transparencia: cand.transparencia || 90,
        coerencia: cand.coerencia || 85,
        viabilidade: cand.viabilidade || 85,
        assiduidade: cand.assiduidade || 90,
        presenca: cand.assiduidade || 90
      };
      cand.attendance = {
        ratePct: cand.attendanceRate || 94,
        presentCount: cand.presentCount || 118,
        totalSessions: cand.totalSessions || 125,
        justifiedAbsences: (cand.totalSessions || 125) - (cand.presentCount || 118),
        unjustifiedAbsences: Math.max(0, Math.round(((cand.totalSessions || 125) - (cand.presentCount || 118)) * 0.3)),
        committees: []
      };

      const bRow = billsByCand[cand.id];
      if (bRow) {
        cand.bills = {
          total: bRow.total,
          annualAvgProposed: bRow.annualAvgProposed,
          approved: bRow.approved,
          annualAvgApproved: bRow.annualAvgApproved,
          approvalRatePct: bRow.approvalRatePct,
          fiscalCount: bRow.fiscalCount,
          highlightList: bRow.highlightJson ? JSON.parse(bRow.highlightJson) : [],
          mandates: bRow.mandatesJson ? JSON.parse(bRow.mandatesJson) : []
        };
      }

      const jRow = jurByCand[cand.id];
      if (jRow) {
        cand.jurisdictionProblemsMatch = {
          constitutionalDuties: jRow.constitutionalDuties,
          coveragePct: jRow.coveragePct,
          coveredCount: jRow.coveredCount,
          totalCount: jRow.totalCount,
          coverageBadgeText: `${jRow.coveragePct}% (${jRow.coveredCount} de ${jRow.totalCount} Gargalos Cobertos)`,
          priorityGoal: jRow.priorityGoal,
          problems: jRow.problemsJson ? JSON.parse(jRow.problemsJson) : []
        };
      }

      const cRow = campByCand[cand.id];
      if (cRow) {
        cand.campaignFinance = {
          electionYear: cRow.electionYear,
          officeElected: cRow.officeElected,
          totalSpent: cRow.totalSpent,
          totalSpentFormatted: cRow.totalSpentFormatted,
          totalReceived: cRow.totalReceived,
          totalReceivedFormatted: cRow.totalReceivedFormatted,
          votesReceived: cRow.votesReceived,
          votesReceivedFormatted: Number(cRow.votesReceived).toLocaleString('pt-BR'),
          costPerVote: cRow.costPerVote,
          tseSpendingLimit: cRow.tseSpendingLimit,
          statusTse: cRow.statusTse,
          publicFundPct: cRow.publicFundPct,
          privateDonationsPct: cRow.privateDonationsPct,
          ownResourcesPct: cRow.ownResourcesPct,
          crowdfundingPct: cRow.crowdfundingPct,
          topDonors: cRow.topDonorsJson ? JSON.parse(cRow.topDonorsJson) : [],
          topExpenses: cRow.topExpensesJson ? JSON.parse(cRow.topExpensesJson) : [],
          tseUrl: cRow.tseUrl
        };
      }

      cand.salary = {
        spendingCeapMonthly: cand.spendingCeapMonthly || 'R$ 28.500',
        spendingPercentage: cand.spendingPercentage || 75,
        civicConversion: {
          costPerMinute: cand.costPerMinute || 'R$ 0,54 / min',
          costPerCitizen: cand.costPerCitizen || 'R$ 0,004 / ano',
          salariosMinimos: 190,
          roiText: cand.roiText || 'R$ 28,50 por R$ 1 gasto'
        }
      };

      const capRow = polCapByCand[cand.id];
      if (capRow) {
        cand.politicalCapacity = {
          score: capRow.score,
          level: capRow.level,
          academicDegree: capRow.academicDegree,
          academicDetails: capRow.academicDetails,
          politicalSchools: capRow.politicalSchools,
          politicalExamScore: capRow.politicalExamScore,
          publicTrackRecordYears: capRow.publicTrackRecordYears,
          publicTrackRecordText: capRow.publicTrackRecordText,
          technicalSkills: capRow.technicalSkillsJson ? JSON.parse(capRow.technicalSkillsJson) : [],
          antiFoolEvaluation: capRow.antiFoolEvaluation
        };
      }
    }
    return candidates;
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
    const metrics = metricsStmt.get(id) || { integridade: 0, eficiencia: 0, transparencia: 0, coerencia: 0, viabilidade: 0, assiduidade: 0 };
    metrics.presenca = metrics.assiduidade;
    cand.radar = metrics;

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

    // Projetos de Lei & Produtividade
    const billsStmt = this.db.prepare(`
      SELECT total_proposed as total, annual_avg as annualAvgProposed, approved, annual_approved as annualAvgApproved,
             success_rate_pct as approvalRatePct, fiscal_count as fiscalCount, highlight_json as highlightJson, mandates_json as mandatesJson
      FROM candidate_bills WHERE candidate_id = ?
    `);
    const bRow = billsStmt.get(id);
    if (bRow) {
      cand.bills = {
        total: bRow.total,
        annualAvgProposed: bRow.annualAvgProposed,
        approved: bRow.approved,
        annualAvgApproved: bRow.annualAvgApproved,
        approvalRatePct: bRow.approvalRatePct,
        fiscalCount: bRow.fiscalCount,
        highlightList: bRow.highlightJson ? JSON.parse(bRow.highlightJson) : [],
        mandates: bRow.mandatesJson ? JSON.parse(bRow.mandatesJson) : []
      };
    } else {
      cand.bills = null;
    }

    // Matriz de Confronto Cívico & 3 Problemas Constitucionais do Cargo
    const jurStmt = this.db.prepare(`
      SELECT constitutional_duties as constitutionalDuties, coverage_pct as coveragePct, covered_count as coveredCount,
             total_count as totalCount, priority_goal as priorityGoal, problems_json as problemsJson
      FROM candidate_jurisdiction WHERE candidate_id = ?
    `);
    const jRow = jurStmt.get(id);
    if (jRow) {
      let parsed = null;
      try {
        parsed = jRow.problemsJson ? JSON.parse(jRow.problemsJson) : null;
      } catch (e) {
        parsed = null;
      }

      const problemsList = Array.isArray(parsed) ? parsed : (parsed && parsed.problems ? parsed.problems : []);
      cand.jurisdictionProblemsMatch = {
        jurisdiction: (parsed && parsed.jurisdiction) || jRow.constitutionalDuties || 'Âmbito Constitucional',
        competenceLevel: (parsed && parsed.competenceLevel) || 'Competência Constitucional',
        constitutionalBasis: (parsed && parsed.constitutionalBasis) || jRow.constitutionalDuties || 'CF/88',
        coveragePct: (parsed && parsed.overallMatchScore) || jRow.coveragePct || 100,
        coveredCount: jRow.coveredCount || problemsList.length,
        totalCount: jRow.totalCount || problemsList.length,
        coverageBadgeText: `${(parsed && parsed.overallMatchScore) || jRow.coveragePct || 100}% (${problemsList.length} de ${problemsList.length} Gargalos Cobertos)`,
        priorityGoal: jRow.priorityGoal,
        problems: problemsList
      };
    } else {
      cand.jurisdictionProblemsMatch = null;
    }

    // Financiamento e Prestação Oficial de Contas de Campanha (TSE)
    const campStmt = this.db.prepare(`
      SELECT election_year as electionYear, office_elected as officeElected, total_spent as totalSpent,
             total_spent_formatted as totalSpentFormatted, total_received as totalReceived,
             total_received_formatted as totalReceivedFormatted, votes_received as votesReceived,
             cost_per_vote as costPerVote, tse_spending_limit as tseSpendingLimit, status_tse as statusTse,
             public_fund_pct as publicFundPct, private_donations_pct as privateDonationsPct,
             own_resources_pct as ownResourcesPct, crowdfunding_pct as crowdfundingPct,
             top_donors_json as topDonorsJson, top_expenses_json as topExpensesJson, tse_url as tseUrl
      FROM candidate_campaign_finance WHERE candidate_id = ?
    `);
    const cRow = campStmt.get(id);
    if (cRow) {
      cand.campaignFinance = {
        electionYear: cRow.electionYear,
        officeElected: cRow.officeElected,
        totalSpent: cRow.totalSpent,
        totalSpentFormatted: cRow.totalSpentFormatted,
        totalReceived: cRow.totalReceived,
        totalReceivedFormatted: cRow.totalReceivedFormatted,
        votesReceived: cRow.votesReceived,
        votesReceivedFormatted: cRow.votesReceived ? cRow.votesReceived.toLocaleString('pt-BR') : '0',
        costPerVote: cRow.costPerVote,
        tseSpendingLimit: cRow.tseSpendingLimit,
        statusTse: cRow.statusTse,
        publicFundPct: cRow.publicFundPct,
        privateDonationsPct: cRow.privateDonationsPct,
        ownResourcesPct: cRow.ownResourcesPct,
        topDonors: cRow.topDonorsJson ? JSON.parse(cRow.topDonorsJson) : [],
        topExpenses: cRow.topExpensesJson ? JSON.parse(cRow.topExpensesJson) : [],
        tseUrl: cRow.tseUrl || 'https://divulgacandcontas.tse.jus.br/'
      };
    } else {
      cand.campaignFinance = null;
    }

    // Histórico Ético Aprofundado & Fórmula de Integridade
    const ethicsStmt = this.db.prepare(`
      SELECT clean_record_status as cleanRecordStatus, active_lawsuits_count as activeLawsuitsCount,
             stf_stj_inquiries_count as stfStjInquiriesCount, tcu_tce_irregular_accounts as tcuTceIrregularAccounts,
             dismissed_archived_count as dismissedArchivedCount, party_compliance_score as partyComplianceScore,
             integrity_score as integrityScore, integrity_formula_json as integrityFormulaJson, lawsuits_json as lawsuitsJson
      FROM candidate_ethics WHERE candidate_id = ?
    `);
    const ethRow = ethicsStmt.get(id);
    if (ethRow) {
      cand.ethicsDetailed = {
        cleanRecordStatus: ethRow.cleanRecordStatus,
        activeLawsuitsCount: ethRow.activeLawsuitsCount,
        stfStjInquiriesCount: ethRow.stfStjInquiriesCount,
        tcuTceIrregularAccounts: ethRow.tcuTceIrregularAccounts,
        dismissedArchivedCount: ethRow.dismissedArchivedCount,
        partyComplianceScore: ethRow.partyComplianceScore,
        integrityScore: ethRow.integrityScore,
        integrityFormula: ethRow.integrityFormulaJson ? JSON.parse(ethRow.integrityFormulaJson) : null,
        lawsuits: ethRow.lawsuitsJson ? JSON.parse(ethRow.lawsuitsJson) : []
      };
    }

    // 5 Falas Públicas Recentes & Fact-Checking Oficial
    const stmtStmt = this.db.prepare(`
      SELECT id, context_source as contextSource, statement_date as statementDate, quote, verdict,
             verdict_class as verdictClass, fact_check_summary as factCheckSummary,
             official_source as officialSource, source_link as sourceLink, order_index as orderIndex
      FROM candidate_statements WHERE candidate_id = ? ORDER BY order_index ASC
    `);
    cand.recentStatements = stmtStmt.all(id) || [];

    // Capacidade Política, Qualificações Técnicas & Avaliação Anti-Caricatura
    const polCapStmt = this.db.prepare(`
      SELECT score, level, academic_degree as academicDegree, academic_details as academicDetails,
             political_schools as politicalSchools, political_exam_score as politicalExamScore,
             public_track_record_years as publicTrackRecordYears, public_track_record_text as publicTrackRecordText,
             technical_skills_json as technicalSkillsJson, anti_fool_evaluation as antiFoolEvaluation
      FROM candidate_political_capacity WHERE candidate_id = ?
    `);
    const capRow = polCapStmt.get(id);
    if (capRow) {
      cand.politicalCapacity = {
        score: capRow.score,
        level: capRow.level,
        academicDegree: capRow.academicDegree,
        academicDetails: capRow.academicDetails,
        politicalSchools: capRow.politicalSchools,
        politicalExamScore: capRow.politicalExamScore,
        publicTrackRecordYears: capRow.publicTrackRecordYears,
        publicTrackRecordText: capRow.publicTrackRecordText,
        technicalSkills: capRow.technicalSkillsJson ? JSON.parse(capRow.technicalSkillsJson) : [],
        antiFoolEvaluation: capRow.antiFoolEvaluation
      };
    } else {
      cand.politicalCapacity = null;
    }

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

  // Registro e governança de solicitações de contraditório pré-litígio
  addContradictoryRequest({ requesterName, requesterEmail, candidateName, requestType, proofLink, justification }) {
    const crypto = require('node:crypto');
    const id = 'req_' + Date.now() + '_' + crypto.randomBytes(3).toString('hex');
    const hash = crypto.randomBytes(3).toString('hex').toUpperCase();
    const protocol = `FP-CONTRADITORIO-2026-${Date.now().toString().slice(-6)}-${hash}`;
    const createdAt = new Date().toISOString();

    const stmt = this.db.prepare(`
      INSERT INTO civic_contradictory_requests 
      (id, protocol, requester_name, requester_email, candidate_name, request_type, proof_link, justification, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'PENDENTE_ANALISE_48H', ?)
    `);
    stmt.run(
      id,
      protocol,
      requesterName || 'Anônimo',
      requesterEmail || '',
      candidateName || 'Geral',
      requestType || 'Outro',
      proofLink || '',
      justification || '',
      createdAt
    );

    return {
      success: true,
      protocol,
      slaHours: 48,
      status: 'PENDENTE_ANALISE_48H',
      createdAt
    };
  }
}

module.exports = { AppDatabase, DEFAULT_DB_PATH };
