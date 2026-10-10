// Raio-X Político - Serviço de Auto-Atualização e Auto-Manutenção Cívica
// Agendamento Diário às 08:00 da manhã via Cron / Worker
// Sincroniza dados com API da Câmara, Senado Federal e TSE

const fs = require('node:fs');
const path = require('node:path');
const { AppDatabase, DEFAULT_DB_PATH } = require('../db/database');
const { CamaraExtractor } = require('../ingestion/camara_extractor');
const { TseExtractor } = require('../ingestion/tse_extractor');

class AutoUpdaterService {
  constructor(dbPath = DEFAULT_DB_PATH) {
    this.appDb = new AppDatabase(dbPath);
    this.db = this.appDb.db;
    this.ensureAuditTable();
  }

  ensureAuditTable() {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS system_audit_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp TEXT NOT NULL,
        service_name TEXT NOT NULL,
        status TEXT NOT NULL,
        records_checked INTEGER DEFAULT 0,
        records_updated INTEGER DEFAULT 0,
        details TEXT,
        execution_time_ms INTEGER
      );
    `);
  }

  async runDailyMaintenance() {
    const startTime = Date.now();
    console.log(`[AutoUpdater 08:00] Iniciando ciclo diário de auto-manutenção dos dados cívicos...`);
    let checkedCount = 0;
    let updatedCount = 0;
    const details = [];

    try {
      // 1. Verificar registros de candidatos
      const candidates = this.db.prepare('SELECT id, name, position, state FROM candidates').all();
      checkedCount = candidates.length;

      // 2. Verificação de integridade (somente leitura): nenhuma métrica é alterada aqui.
      // A atualização real a partir de Câmara/Senado/TSE ainda não está implementada;
      // os extratores em src/ingestion devem alimentar o seed explicitamente.
      const orphanAttendance = this.db.prepare(
        'SELECT COUNT(*) AS n FROM candidate_attendance WHERE candidate_id NOT IN (SELECT id FROM candidates)'
      ).get().n;
      details.push(`Verificação de integridade: ${checkedCount} candidatos, ${orphanAttendance} registros órfãos. Nenhum dado foi alterado.`);

      // 3. Log de Auditoria
      const durationMs = Date.now() - startTime;
      const logStmt = this.db.prepare(`
        INSERT INTO system_audit_logs (timestamp, service_name, status, records_checked, records_updated, details, execution_time_ms)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);

      const nowIso = new Date().toISOString();
      logStmt.run(
        nowIso,
        'AutoUpdater_08h_Daily',
        'SUCCESS',
        checkedCount,
        updatedCount,
        details.join(' | '),
        durationMs
      );

      console.log(`[AutoUpdater 08:00] Manutenção concluída em ${durationMs}ms: ${updatedCount}/${checkedCount} checados.`);
      return {
        status: 'SUCCESS',
        timestamp: nowIso,
        checkedCount,
        updatedCount,
        durationMs,
        scheduledDailyAt: '08:00 AM (Horário de Brasília)'
      };
    } catch (err) {
      console.error(`[AutoUpdater 08:00] Falha na auto-manutenção:`, err.message);
      const durationMs = Date.now() - startTime;
      this.db.prepare(`
        INSERT INTO system_audit_logs (timestamp, service_name, status, records_checked, records_updated, details, execution_time_ms)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).run(
        new Date().toISOString(),
        'AutoUpdater_08h_Daily',
        'ERROR',
        checkedCount,
        updatedCount,
        err.message,
        durationMs
      );
      throw err;
    }
  }

  scheduleDailyWorker() {
    console.log(`[AutoUpdater] Agendador ativo: Cálculo inteligente ativado para as 08:00.`);
    
    const scheduleNext = () => {
      const now = new Date();
      let nextRun = new Date();
      nextRun.setHours(8, 0, 0, 0);
      
      if (now.getTime() >= nextRun.getTime()) {
        nextRun.setDate(nextRun.getDate() + 1);
      }
      
      const timeToNextRun = nextRun.getTime() - now.getTime();
      console.log(`[AutoUpdater] Próxima execução em ${Math.round(timeToNextRun / 60000)} minutos.`);
      
      setTimeout(async () => {
        try {
          await this.runDailyMaintenance();
        } catch (err) {
          console.error('[AutoUpdater Scheduled] Erro:', err);
        } finally {
          scheduleNext();
        }
      }, timeToNextRun);
    };

    scheduleNext();
  }
}

// Se executado diretamente via linha de comando
if (require.main === module) {
  const service = new AutoUpdaterService();
  service.runDailyMaintenance()
    .then(res => {
      console.log('Resultado:', JSON.stringify(res, null, 2));
      process.exit(0);
    })
    .catch(err => {
      console.error('Erro fatal:', err);
      process.exit(1);
    });
}

module.exports = { AutoUpdaterService };
