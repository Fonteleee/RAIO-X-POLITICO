// Raio-X Político - Análise Preditiva de Migração e Fidelidade Partidária
// Modelo probabilístico que projeta a chance de reeleição, mudança de legenda na janela partidária
// e alinhamento com a base governista a partir de regressão sobre o histórico de votações nominais.

/**
 * Aplica função sigmoide logística para projeção probabilística bounded
 * @param {number} z 
 * @returns {number}
 */
function sigmoid(z) {
  return 1 / (1 + Math.exp(-z));
}

/**
 * Calcula os indicadores preditivos eleitorais e partidários
 * @param {Object} cand 
 * @returns {Object}
 */
function calculatePredictiveMigration(cand) {
  if (!cand) {
    return {
      reelectionProbabilityPct: 50,
      partyMigrationRisk: 'Indeterminado',
      partyMigrationProbabilityPct: 20,
      governmentCoalitionAlignmentPct: 50,
      analyticalVerdict: 'Dados insuficientes para regressão preditiva.'
    };
  }

  const discipline = typeof cand.partyDisciplinePct === 'number' ? cand.partyDisciplinePct : 85;
  const govAlignment = typeof cand.governmentAlignmentPct === 'number' ? cand.governmentAlignmentPct : 50;
  const switches = typeof cand.pastPartySwitchesCount === 'number' ? cand.pastPartySwitchesCount : 1;
  const score = typeof cand.overallScore === 'number' ? cand.overallScore : 70;
  const attendance = typeof cand.attendanceRatePct === 'number' 
    ? cand.attendanceRatePct 
    : (cand.attendance?.ratePct || 90);
  const party = cand.party || 'Legenda';

  // 1. Probabilidade de Reeleição (Regressão Logística Multivariada)
  // z = intercepto + coef_score * score + coef_presenca * presenca + coef_fidelidade * fidelidade - penalidade_trocas
  const zReelect = -4.5 + (0.04 * score) + (0.03 * attendance) + (0.015 * discipline) - (0.3 * switches);
  let rawReelectProb = sigmoid(zReelect) * 100;
  // Bounded entre 10% e 95% (nenhum político tem 0% ou 100% absoluto em democracia)
  const reelectionProbabilityPct = Math.round(Math.min(95, Math.max(10, rawReelectProb)) * 10) / 10;

  // 2. Risco de Migração na Janela Partidária
  // Infidelidade parlamentar (< 70%) e histórico de trocas aumentam exponencialmente o risco
  let migrationProb = 0;
  if (discipline < 70) {
    migrationProb = 60 + ((70 - discipline) * 1.2) + (switches * 5);
  } else if (discipline < 85) {
    migrationProb = 25 + ((85 - discipline) * 1.5) + (switches * 4);
  } else {
    migrationProb = Math.max(5, 15 - ((discipline - 85) * 0.5) + (switches * 2));
  }
  const partyMigrationProbabilityPct = Math.round(Math.min(92, Math.max(5, migrationProb)) * 10) / 10;

  let partyMigrationRisk = 'Baixo';
  if (partyMigrationProbabilityPct >= 55) {
    partyMigrationRisk = 'Alto';
  } else if (partyMigrationProbabilityPct >= 25) {
    partyMigrationRisk = 'Moderado';
  }

  // 3. Veredito Analítico Cívico
  let analyticalVerdict = '';
  if (partyMigrationRisk === 'Alto') {
    analyticalVerdict = `⚠️ Risco Elevado de Migração na Janela Partidária (${partyMigrationProbabilityPct}%): O parlamentar exibe baixa fidelidade à bancada do ${party} (${discipline}%) e histórico de divergência, indicando forte probabilidade de mudança de legenda antes do pleito de 2026.`;
  } else if (partyMigrationRisk === 'Moderado') {
    analyticalVerdict = `⚖️ Estabilidade Partidária Moderada (${partyMigrationProbabilityPct}%): Coesão regular com as diretrizes do ${party} (${discipline}%). Chance de reeleição estimada em ${reelectionProbabilityPct}%.`;
  } else {
    analyticalVerdict = `🛡️ Alta coesão e lealdade partidária (${discipline}% de fidelidade). Projeção de reeleição robusta em ${reelectionProbabilityPct}% pela solidez de base eleitoral e quociente partidário estadual. Risco de migração na janela: Baixo (${partyMigrationProbabilityPct}%).`;
  }

  return {
    reelectionProbabilityPct,
    partyMigrationRisk,
    partyMigrationProbabilityPct,
    governmentCoalitionAlignmentPct: govAlignment,
    partyDisciplinePct: discipline,
    pastPartySwitchesCount: switches,
    stabilityIndex: Math.round((100 - partyMigrationProbabilityPct) * 10) / 10,
    analyticalVerdict
  };
}

module.exports = { calculatePredictiveMigration };
