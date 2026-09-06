// Raio-X Político - Testes Automatizados de Integridade Factual e Fotos
// Garante conformidade de fotos oficiais (Câmara, Senado e Executivo) e cargos 2026

const { test, describe } = require('node:test');
const assert = require('node:assert');
const { verifyIntegrity, VERIFIED_SENATE_CODES, VERIFIED_2026_OFFICES } = require('../scripts/verify_data_integrity');
const { AppDatabase } = require('../src/db/database');

describe('Garantia de Integridade de Dados, Fotos Oficiais e Cenário 2026', () => {
  const db = new AppDatabase();

  test('Auditoria Global: Todas as 45 personalidades possuem campos obrigatórios e fotos válidas', () => {
    const result = verifyIntegrity();
    assert.strictEqual(result.success, true, `Erros encontrados na integridade: ${result.errors.join('; ')}`);
    assert.strictEqual(result.totalChecked, 45);
  });

  test('Senadores: Sergio Moro, Rodrigo Pacheco e Marcos Pontes possuem fotos oficiais corretas', () => {
    const moro = db.getCandidateById('cand-sergio-moro');
    assert.ok(moro, 'Sergio Moro deve existir');
    assert.match(moro.avatar, /senador6331\.jpg$/, 'Foto de Sergio Moro deve ser o ID 6331 do Senado');
    assert.doesNotMatch(moro.avatar, /senador5988\.jpg$/, 'Foto de Sergio Moro NUNCA pode ser 5988 (Soraya Thronicke)');
    assert.strictEqual(moro.party, 'PL');

    const pacheco = db.getCandidateById('cand-rodrigo-pacheco');
    assert.ok(pacheco, 'Rodrigo Pacheco deve existir');
    assert.match(pacheco.avatar, /senador5732\.jpg$/, 'Foto de Rodrigo Pacheco deve ser o ID 5732 do Senado');
    assert.doesNotMatch(pacheco.avatar, /senador5982\.jpg$/, 'Foto de Rodrigo Pacheco NUNCA pode ser 5982 (Alessandro Vieira)');

    const pontes = db.getCandidateById('cand-marcos-pontes');
    assert.ok(pontes, 'Marcos Pontes deve existir');
    assert.match(pontes.avatar, /senador6009\.jpg$/, 'Foto de Marcos Pontes deve ser o ID 6009 do Senado');
  });

  test('Executivo 2026: Ciro Gomes, Caiado e Zema estão registrados com cargos e partidos atualizados', () => {
    const ciro = db.getCandidateById('cand-ciro-gomes');
    assert.strictEqual(ciro.position, 'Governador');
    assert.strictEqual(ciro.party, 'PSDB');
    assert.strictEqual(ciro.number, '45');
    assert.strictEqual(ciro.state, 'CE');

    const caiado = db.getCandidateById('cand-ronaldo-caiado');
    assert.strictEqual(caiado.position, 'Presidente da República');
    assert.strictEqual(caiado.party, 'PSD');
    assert.strictEqual(caiado.number, '55');

    const zema = db.getCandidateById('cand-romeu-zema');
    assert.strictEqual(zema.position, 'Presidente da República');
    assert.strictEqual(zema.party, 'NOVO');
    assert.strictEqual(zema.number, '30');
  });
});
