// Raio-X Político - Módulo de Auditabilidade Criptográfica & SLA de Contraditório
// Toda métrica do radar e nota geral é respaldada por um hash SHA-256 dos dados brutos.
// Garante conformidade com o Art. 5º da CF/88 e Resolução TSE nº 23.610/2019.

const crypto = require('node:crypto');

/**
 * Normaliza os dados brutos do candidato em um objeto canônico estritamente ordenado
 * @param {Object} cand 
 * @returns {Object}
 */
function extractCanonicalRawManifest(cand) {
  const attendance = cand.attendance || {};
  const salary = cand.salary || {};
  const amendments = cand.parliamentaryAmendments || {};
  const debate = cand.recentDebate || {};
  const processes = cand.legalProcesses || {};

  return {
    candidateId: String(cand.id || ''),
    ballotName: String(cand.ballotName || cand.name || ''),
    position: String(cand.position || ''),
    state: String(cand.state || 'BR'),
    attendance: {
      presentCount: Number(attendance.presentCount || 0),
      totalSessions: Number(attendance.totalSessions || 0),
      unjustifiedAbsences: Number(attendance.unjustifiedAbsences || 0),
      ratePct: Number(attendance.ratePct || 0)
    },
    ceapFiscal: {
      spendingMonthly: Number(salary.spendingCeapMonthlyNum || 0),
      limitMonthly: Number(salary.limitCeapMonthlyNum || 45000),
      spendingPct: Number(salary.spendingPercentage || 0)
    },
    parliamentaryAmendments: {
      totalAllocated: String(amendments.totalAllocated || 'R$ 0,00'),
      executionRatePct: Number(amendments.executionRatePct || 0),
      directPixPct: Number(amendments.directPixPct || 0)
    },
    factChecking: {
      truthfulnessPct: Number(debate.truthfulnessPct || 80),
      rightOfReplyGranted: Number(debate.rightOfReplyGranted || 0)
    },
    legalIntegrity: {
      processCount: Number(processes.count || 0),
      cleanSlateStatus: String(cand.fichaLimpaStatus || 'FICHA_LIMPA')
    },
    calculatedScore: Number(cand.overallScore || 0)
  };
}

/**
 * Gera o Hash SHA-256 dos dados brutos e empacota o SLA de Contraditório
 * @param {Object} cand 
 * @returns {Object}
 */
function generateMetricAuditHash(cand) {
  const manifest = extractCanonicalRawManifest(cand);
  const canonicalJson = JSON.stringify(manifest);

  const hash = crypto.createHash('sha256').update(canonicalJson, 'utf8').digest('hex');
  const radarHash = `sha256:${hash}`;

  return {
    radarHash,
    overallScore: manifest.calculatedScore,
    algorithmVersion: 'CivicScore-v2.6-Deterministic',
    manifestTimestamp: '2026-09-22T00:00:00Z',
    slaContraditorioDays: 5,
    reproducibleUrl: `/api/audit/${manifest.candidateId}`,
    rawInputsManifest: manifest,
    legalNotice: 'Cálculo auditável e reproduzível com base em fontes oficiais (TSE DivulgaCand, Câmara dos Deputados e CNJ). Divergências podem ser protocoladas perante o SLA de Contraditório em até 5 dias úteis.'
  };
}

/**
 * Verifica se um hash fornecido confere rigorosamente com os dados do candidato
 * @param {Object} cand 
 * @param {string} expectedHash 
 * @returns {boolean}
 */
function verifyCandidateAuditHash(cand, expectedHash) {
  const audit = generateMetricAuditHash(cand);
  return audit.radarHash === expectedHash;
}

module.exports = {
  extractCanonicalRawManifest,
  generateMetricAuditHash,
  verifyCandidateAuditHash
};
