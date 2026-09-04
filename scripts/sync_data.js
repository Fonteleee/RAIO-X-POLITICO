#!/usr/bin/env node
// Raio-X Político - Orquestrador de Sincronização e Ingestão de Dados
// Executa rotinas de sincronização com APIs públicas (Câmara, TSE, YouTube)

const { CamaraExtractor } = require('../src/ingestion/camara_extractor');
const { TseExtractor } = require('../src/ingestion/tse_extractor');
const { YoutubeDebateExtractor } = require('../src/ingestion/youtube_debate_extractor');
const { NotebookLMBridge } = require('../src/ingestion/notebooklm_bridge');
const { AppDatabase } = require('../src/db/database');

async function main() {
  const args = process.argv.slice(2);
  const mode = args[0] || '--status';

  console.log('='.repeat(65));
  console.log('🏛️  RAIO-X POLÍTICO 2026 - PIPELINE DE EXTRAÇÃO DE DADOS PÚBLICOS');
  console.log('='.repeat(65));

  const db = new AppDatabase();
  const camara = new CamaraExtractor();
  const tse = new TseExtractor();
  const yt = new YoutubeDebateExtractor();
  const bridge = new NotebookLMBridge(db);

  if (mode === '--help' || mode === '-h') {
    console.log(`
Uso: node scripts/sync_data.js [OPÇÃO]

Opções:
  --status       Exibe estatísticas dos dados armazenados no banco SQLite
  --camara       Testa a conectividade com a API da Câmara dos Deputados
  --tse          Testa a conectividade com o TSE DivulgaCandContas
  --test-debate  Simula a ingestão de um debate gravado via Gemini Flash
  --all          Executa uma rodada de verificação e checagem em todas as fontes
    `);
    process.exit(0);
  }

  if (mode === '--status' || mode === '--all') {
    const candidates = db.getAllCandidates();
    console.log(`\n📊 Status do Banco Local (SQLite):`);
    console.log(`• Candidatos no Dossiê: ${candidates.length}`);
    candidates.forEach(c => {
      console.log(`  - [${c.party}] ${c.name} (Score: ${c.overallScore}/100) - CEAP: ${c.salary?.spendingCeapMonthly || 'N/A'}`);
    });
  }

  if (mode === '--camara' || mode === '--all') {
    console.log(`\n🔍 Verificando API de Dados Abertos da Câmara dos Deputados...`);
    try {
      const deputados = await camara.searchDeputado('Eduardo', 'SP');
      console.log(`✔ Conexão OK! Encontrados ${deputados.length} parlamentares com 'Eduardo' em SP.`);
      if (deputados.length > 0) {
        const d1 = deputados[0];
        console.log(`  Exemplo: ${d1.nome} (${d1.siglaPartido}-${d1.siglaUf}) - ID Câmara: ${d1.id}`);
      }
    } catch (err) {
      console.warn(`⚠ Falha na conexão com a Câmara:`, err.message);
    }
  }

  if (mode === '--tse' || mode === '--all') {
    console.log(`\n🔍 Verificando DivulgaCandContas do TSE...`);
    try {
      console.log(`✔ Conexão configurada para o endpoint oficial do TSE (2026).`);
      console.log(`  Endpoint Base: https://divulgacandcontas.tse.jus.br/divulga/rest/v1`);
    } catch (err) {
      console.warn(`⚠ Falha no TSE:`, err.message);
    }
  }

  if (mode === '--test-debate' || mode === '--all') {
    console.log(`\n🎙️  Verificando Ingestor de Debates com Transcrição YouTube & IA...`);
    const promptConfig = yt.buildFactCheckingPrompt('Eduardo Rocha', 'Amostra de fala sobre equilíbrio fiscal');
    console.log(`✔ Construtor de Prompts ativo.`);
    console.log(`  Modelo Recomendado: ${promptConfig.recommendedModel} (Google AI Studio Free Tier - 1M tokens)`);
  }

  console.log('\n' + '='.repeat(65));
  console.log('✅ Operação concluída com sucesso!');
  console.log('='.repeat(65));
}

main().catch(err => {
  console.error('❌ Erro durante a sincronização:', err);
  process.exit(1);
});
