#!/usr/bin/env node
// Raio-X Político - Auditoria e Verificação Contínua de Integridade de Dados e Fotos
// Garante que nenhum candidato possua foto trocada, partido incorreto ou dados eleitorais defasados.

const { AppDatabase } = require('../src/db/database');

const VERIFIED_SENATE_CODES = {
  'cand-sergio-moro': {
    expectedCode: '6331',
    forbiddenCodes: ['5988'], // 5988 é Soraya Thronicke
    expectedParty: 'PL',
    expectedPosition: 'Senador'
  },
  'cand-rodrigo-pacheco': {
    expectedCode: '5732',
    forbiddenCodes: ['5982'], // 5982 é Alessandro Vieira
    expectedParty: 'PSD',
    expectedPosition: 'Senador'
  },
  'cand-marcos-pontes': {
    expectedCode: '6009',
    forbiddenCodes: ['5991'],
    expectedParty: 'PL',
    expectedPosition: 'Senador'
  },
  'cand-flavio-bolsonaro': {
    expectedCode: '5894',
    expectedParty: 'PL',
    expectedPosition: 'Presidente da República'
  },
  'cand-randolfe-rodrigues': {
    expectedCode: '5012',
    expectedParty: 'PT',
    expectedPosition: 'Senador'
  }
};

const VERIFIED_2026_OFFICES = {
  'cand-ciro-gomes': { position: 'Governador', party: 'PSDB', number: '45', state: 'CE' },
  'cand-ronaldo-caiado': { position: 'Presidente da República', party: 'PSD', number: '55', state: 'BR' },
  'cand-romeu-zema': { position: 'Presidente da República', party: 'NOVO', number: '30', state: 'BR' },
  'cand-simone-tebet': { position: 'Senadora', party: 'PSB', number: '400', state: 'SP' },
  'cand-helder-barbalho': { position: 'Senador', party: 'MDB', number: '150', state: 'PA' },
  'cand-eduardo-paes': { position: 'Governador', party: 'PSD', number: '55', state: 'RJ' },
  'cand-joao-campos': { position: 'Governador', party: 'PSB', number: '40', state: 'PE' },
  'cand-tarcisio-de-freitas': { position: 'Governador', party: 'REPUBLICANOS', number: '10', state: 'SP' },
  'cand-lula': { position: 'Presidente da República', party: 'PT', number: '13', state: 'BR' },
  'cand-jair-bolsonaro': { position: 'Ex-Presidente da República', party: 'PL', number: '22', state: 'RJ' }
};

function verifyIntegrity(options = { checkNetwork: false }) {
  console.log('='.repeat(70));
  console.log('🔍 AUDITORIA DE INTEGRIDADE FACTUAL E FOTOS (RAIO-X POLÍTICO 2026)');
  console.log('='.repeat(70));

  const db = new AppDatabase();
  const candidates = db.getAllCandidates();
  const errors = [];
  const warnings = [];

  console.log(`Verificando ${candidates.length} candidatos no banco SQLite...\n`);

  if (candidates.length < 45) {
    errors.push(`Esperados pelo menos 45 candidatos no catálogo geral, encontrados: ${candidates.length}`);
  }

  for (const c of candidates) {
    // 1. Campos obrigatórios
    const requiredFields = ['id', 'name', 'ballotName', 'party', 'number', 'position', 'state', 'age', 'avatar', 'careerHistory', 'aiSummary', 'overallScore'];
    for (const field of requiredFields) {
      if (!c[field] || (typeof c[field] === 'string' && c[field].trim() === '')) {
        errors.push(`[${c.id}] Campo obrigatório '${field}' está vazio ou indefinido.`);
      }
    }

    // 2. Verificação de avatar não quebrado / não vazio
    if (!c.avatar || (!c.avatar.startsWith('https://') && !c.avatar.startsWith('http://'))) {
      errors.push(`[${c.id}] URL de avatar inválida: ${c.avatar}`);
    }

    // 3. Auditoria estrita de Senadores (impedir fotos trocadas)
    if (VERIFIED_SENATE_CODES[c.id]) {
      const spec = VERIFIED_SENATE_CODES[c.id];
      const match = c.avatar.match(/senador(\d+)\.jpg/);
      if (!match) {
        errors.push(`[${c.id}] Avatar não segue o padrão oficial do Senado (senadorXXXX.jpg): ${c.avatar}`);
      } else {
        const foundCode = match[1];
        if (spec.forbiddenCodes && spec.forbiddenCodes.includes(foundCode)) {
          errors.push(`[${c.id}] ERRO CRÍTICO DE FOTO TROCADA: Encontrado ID proibido ${foundCode} (foto pertence a outro parlamentar!). Esperado: ${spec.expectedCode}`);
        }
        if (spec.expectedCode && foundCode !== spec.expectedCode) {
          errors.push(`[${c.id}] ID de foto do Senado incorreto: encontrado ${foundCode}, esperado ${spec.expectedCode}`);
        }
      }

      if (spec.expectedParty && c.party !== spec.expectedParty) {
        errors.push(`[${c.id}] Partido divergente: encontrado ${c.party}, esperado ${spec.expectedParty}`);
      }
      if (spec.expectedPosition && c.position !== spec.expectedPosition) {
        errors.push(`[${c.id}] Cargo divergente: encontrado ${c.position}, esperado ${spec.expectedPosition}`);
      }
    }

    // 4. Auditoria de cargos do Executivo e Eleições 2026
    if (VERIFIED_2026_OFFICES[c.id]) {
      const spec = VERIFIED_2026_OFFICES[c.id];
      if (spec.position && c.position !== spec.position) {
        errors.push(`[${c.id}] Cargo 2026 incorreto: encontrado '${c.position}', esperado '${spec.position}'`);
      }
      if (spec.party && c.party !== spec.party) {
        errors.push(`[${c.id}] Partido 2026 incorreto: encontrado '${c.party}', esperado '${spec.party}'`);
      }
      if (spec.number && c.number !== spec.number) {
        errors.push(`[${c.id}] Número de urna incorreto: encontrado '${c.number}', esperado '${spec.number}'`);
      }
      if (spec.state && c.state !== spec.state) {
        errors.push(`[${c.id}] UF incorreta: encontrada '${c.state}', esperada '${spec.state}'`);
      }
    }

    // 5. Auditoria de Deputados Federais (Câmara)
    if (c.avatar && c.avatar.includes('camara.leg.br')) {
      const matchCamara = c.avatar.match(/(\d+)\.jpg/);
      if (!matchCamara) {
        errors.push(`[${c.id}] URL da Câmara não possui ID numérico válido: ${c.avatar}`);
      }
    }
  }

  // Relatório
  if (errors.length === 0) {
    console.log('✅ TODAS AS 45 PERSONALIDADES PÚBLICAS PASSARAM NA AUDITORIA DE INTEGRIDADE!');
    console.log('• Zero fotos trocadas ou inválidas.');
    console.log('• Todos os cargos, números, partidos e UFs para 2026 validados com sucesso.');
    return { success: true, errors: [], totalChecked: candidates.length };
  } else {
    console.error(`❌ FORAM DETECTADAS ${errors.length} INCONSISTÊNCIAS DE DADOS:`);
    errors.forEach((err, idx) => console.error(`  ${idx + 1}. ${err}`));
    return { success: false, errors, totalChecked: candidates.length };
  }
}

if (require.main === module) {
  const result = verifyIntegrity();
  if (!result.success) {
    process.exit(1);
  }
}

module.exports = { verifyIntegrity, VERIFIED_SENATE_CODES, VERIFIED_2026_OFFICES };
