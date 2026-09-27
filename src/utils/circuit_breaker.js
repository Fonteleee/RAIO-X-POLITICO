// Raio-X Político - Circuit Breaker Pattern para Resiliência de APIs Cívicas
// Protege o sistema contra quedas e sobrecargas das APIs da Câmara dos Deputados e do TSE.
// Regra: Mais de 3 erros 502/504 em 1 minuto -> abre o circuito por 30 minutos e serve cache local.

class CircuitBreaker {
  /**
   * @param {Object} options
   * @param {number} options.maxFailures - Limite de falhas toleradas na janela (padrão: 3)
   * @param {number} options.windowMs - Janela de tempo de monitoramento (padrão: 60.000ms = 1 min)
   * @param {number} options.resetTimeoutMs - Tempo de circuito aberto servindo cache (padrão: 1.800.000ms = 30 min)
   */
  constructor(options = {}) {
    this.maxFailures = options.maxFailures || 3;
    this.windowMs = options.windowMs || 60 * 1000;
    this.resetTimeoutMs = options.resetTimeoutMs || 30 * 60 * 1000;

    this.state = 'CLOSED'; // 'CLOSED' | 'OPEN' | 'HALF-OPEN'
    this.failureTimestamps = [];
    this.openedAt = null;
    this.cache = new Map(); // key -> { data, timestamp }
  }

  getState() {
    if (this.state === 'OPEN') {
      const elapsed = Date.now() - this.openedAt;
      if (elapsed >= this.resetTimeoutMs) {
        this.state = 'HALF-OPEN';
      }
    }
    return this.state;
  }

  isFailureStatus(err) {
    if (!err) return false;
    const status = err.status || err.statusCode || (err.message && err.message.match(/502|504/)) ? 502 : 0;
    return status === 502 || status === 504 || (typeof err.message === 'string' && (err.message.includes('502') || err.message.includes('504')));
  }

  recordFailure(err) {
    const now = Date.now();
    // Limpa falhas fora da janela de 1 minuto
    this.failureTimestamps = this.failureTimestamps.filter(t => (now - t) < this.windowMs);
    this.failureTimestamps.push(now);

    if (this.failureTimestamps.length > this.maxFailures) {
      this.state = 'OPEN';
      this.openedAt = now;
      console.warn(`[CircuitBreaker] ⚠️ Circuito ABERTO! Mais de ${this.maxFailures} erros 502/504 no último minuto. Servindo cache local por ${Math.round(this.resetTimeoutMs / 60000)} minutos.`);
    }
  }

  recordSuccess() {
    this.state = 'CLOSED';
    this.failureTimestamps = [];
    this.openedAt = null;
  }

  /**
   * Executa a chamada remota com resiliência, fallback e cache
   * @param {string} key 
   * @param {Function} asyncFn 
   * @param {*} defaultFallback 
   * @returns {Promise<*>}
   */
  async execute(key, asyncFn, defaultFallback = null) {
    const currentState = this.getState();

    // Circuito aberto: serve imediatamente do cache sem chamar a rede
    if (currentState === 'OPEN') {
      const cached = this.cache.get(key);
      if (cached) {
        return { ...cached.data, _fromLocalCache: true, _circuitState: 'OPEN' };
      }
      return defaultFallback ? { ...defaultFallback, _fromLocalCache: true, _circuitState: 'OPEN' } : { _fromLocalCache: true, _circuitState: 'OPEN' };
    }

    try {
      const result = await asyncFn();
      // Armazena em cache o último retorno íntegro
      this.cache.set(key, { data: result, timestamp: Date.now() });
      if (currentState === 'HALF-OPEN') {
        this.recordSuccess();
      }
      return result;
    } catch (err) {
      if (this.isFailureStatus(err) || currentState === 'HALF-OPEN') {
        this.recordFailure(err);
      }

      // Se após a falha o circuito abriu, serve do cache imediatamente
      if (this.getState() === 'OPEN') {
        const cached = this.cache.get(key);
        if (cached) {
          return { ...cached.data, _fromLocalCache: true, _circuitState: 'OPEN' };
        }
      }
      throw err;
    }
  }

  reset() {
    this.state = 'CLOSED';
    this.failureTimestamps = [];
    this.openedAt = null;
    this.cache.clear();
  }
}

module.exports = { CircuitBreaker };
