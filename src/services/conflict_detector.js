// Raio-X Político - Motor de Detecção de Conflito de Interesses
// Regra Cívica: Alerta automaticamente quando um parlamentar vota favoravelmente a um setor
// que respondeu por mais de 20% do seu financiamento eleitoral.

/**
 * Analisa a correlação entre financiamento de campanha por setor e votos nominais no parlamento
 * @param {Object} cand 
 * @returns {Object}
 */
function detectConflictOfInterest(cand) {
  if (!cand) {
    return { hasConflictRisk: false, severity: 'BAIXO', status: 'DADOS_INSUFICIENTES' };
  }

  // Setores econômicos financiadores da campanha
  const sectorFunding = cand.sectorFunding || [];
  // Votações nominais relevantes em matérias regulatórias/tributárias
  const nominalVotes = cand.nominalVotes || [];

  // Localiza setores com concentração superior ao limiar prudencial de 20%
  const heavySectors = sectorFunding.filter(s => Number(s.percentage || 0) > 20.0);

  if (heavySectors.length === 0) {
    return {
      hasConflictRisk: false,
      severity: 'BAIXO',
      status: 'ISENTO_DE_CONFLITO',
      alertMessage: '🛡️ Sem Conflito Detectado: Financiamento eleitoral difuso (< 20% de concentração setorial).',
      maxSectorConcentration: sectorFunding.length > 0 ? Math.max(...sectorFunding.map(s => Number(s.percentage || 0))) : 0
    };
  }

  // Verifica se há votos nominais favoráveis a esses setores concentrados
  for (const sectorItem of heavySectors) {
    const matchingVotes = nominalVotes.filter(v => 
      v.sector && v.sector.toLowerCase().includes(sectorItem.sector.toLowerCase().split(' ')[0])
    );

    for (const vote of matchingVotes) {
      // Votou SIM a projeto com benefício direto ao setor, ou NÃO a projeto que limitaria o setor
      const votedProSector = (vote.vote === 'SIM' && vote.proSectorBeneficial === true) ||
                             (vote.vote === 'NÃO' && vote.proSectorBeneficial === false);

      if (votedProSector) {
        return {
          hasConflictRisk: true,
          severity: 'ALTO',
          status: 'CONFLITO_POTENCIAL',
          conflictSector: sectorItem.sector,
          financingPercentage: Number(sectorItem.percentage),
          financingAmount: sectorItem.amount || 'Não informado',
          billId: vote.billId || 'Proposição Nominal',
          billTitle: vote.billTitle || 'Matéria Legislativa Setorial',
          parliamentaryVote: vote.vote,
          alertMessage: `⚠️ Alerta de Conflito de Interesses: Parlamentar votou favoravelmente a proposição do setor de ${sectorItem.sector}, responsável por ${sectorItem.percentage}% de sua arrecadação de campanha (acima do limiar de 20%).`,
          recommendation: 'Recomenda-se auditoria pelo Conselho de Ética e transparência declaratória prévia nos termos do regimento interno.'
        };
      }
    }
  }

  return {
    hasConflictRisk: false,
    severity: 'BAIXO',
    status: 'ISENTO_DE_CONFLITO_EM_VOTACOES',
    alertMessage: '🛡️ Isento de Conflito em Votações: Embora possua setor com financiamento expressivo, o parlamentar não registrou votações favoráveis divergentes do interesse público.',
    monitoredSectors: heavySectors.map(s => s.sector)
  };
}

module.exports = { detectConflictOfInterest };
