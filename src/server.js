// Raio-X Político - Servidor de Produção & API REST
// Desenvolvido em Node.js com node:http e node:sqlite nativos

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');
const { AppDatabase } = require('./db/database');
const { AutoUpdaterService } = require('./services/auto_updater');
const { generateMetricAuditHash } = require('./services/audit_trail');
const { detectConflictOfInterest } = require('./services/conflict_detector');
const { calculatePredictiveMigration } = require('./services/predictive_analytics');
const { candidatesData } = require('../data/candidates');

const PORT = process.env.PORT || 8080;
const PUBLIC_DIR = path.join(__dirname, '..');
const appDb = new AppDatabase();
const autoUpdater = new AutoUpdaterService();

// Content Security Policy (CSP) Estrito e Defensivo
const CSP_DIRECTIVES = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.tailwindcss.com https://unpkg.com https://cdn.jsdelivr.net https://cdnjs.cloudflare.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob: https://www.camara.leg.br https://camara.leg.br https://*.camara.leg.br http://*.camara.leg.br https://www.senado.leg.br https://senado.leg.br https://legis.senado.leg.br https://*.senado.leg.br http://www.senado.leg.br http://senado.leg.br http://*.senado.leg.br https://upload.wikimedia.org https://thumb.wikimedia.org https://divulgacandcontas.tse.jus.br https://images.unsplash.com https://ui-avatars.com https://raw.githubusercontent.com https://api.qrserver.com",
  "connect-src 'self' https://dadosabertos.camara.leg.br https://divulgacandcontas.tse.jus.br",
  "frame-ancestors 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'"
].join('; ');

function getSafeCorsOrigin(req) {
  if (!req) return 'http://localhost:8080';
  const origin = req.headers && req.headers.origin;
  if (!origin) return '*';
  const allowed = [
    'http://localhost:8080',
    'http://127.0.0.1:8080',
    'https://raioxpolitico.org'
  ];
  if (allowed.includes(origin) || origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
    return origin;
  }
  return 'https://raioxpolitico.org';
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8'
};

// Rate Limiter defensivo em memória (Token Bucket por IP para proteção contra DoS/Scraping)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 250;

function checkRateLimit(ip) {
  const now = Date.now();
  const record = rateLimitMap.get(ip) || { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS };
  if (now > record.resetAt) {
    record.count = 1;
    record.resetAt = now + RATE_LIMIT_WINDOW_MS;
  } else {
    record.count++;
  }
  rateLimitMap.set(ip, record);
  return record.count <= RATE_LIMIT_MAX_REQUESTS;
}

// Limpeza de IPs expirados a cada 5 minutos
setInterval(() => {
  const now = Date.now();
  for (const [ip, rec] of rateLimitMap.entries()) {
    if (now > rec.resetAt) rateLimitMap.delete(ip);
  }
}, 5 * 60 * 1000).unref();

function sendJson(res, statusCode, data, extraHeaders = {}, req = null) {
  const request = req || res.req;
  const corsOrigin = getSafeCorsOrigin(request);
  const jsonStr = JSON.stringify(data);
  const jsonBuf = Buffer.from(jsonStr, 'utf8');

  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': corsOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Content-Security-Policy': CSP_DIRECTIVES,
    'Cache-Control': 'no-cache',
    'Vary': 'Accept-Encoding',
    ...extraHeaders
  };

  const acceptEncoding = (request && request.headers && request.headers['accept-encoding']) || '';
  if (jsonBuf.length > 1024 && acceptEncoding.includes('gzip')) {
    headers['Content-Encoding'] = 'gzip';
    const compressed = zlib.gzipSync(jsonBuf, { level: zlib.constants.Z_DEFAULT_COMPRESSION });
    headers['Content-Length'] = compressed.length;
    res.writeHead(statusCode, headers);
    return res.end(compressed);
  } else if (jsonBuf.length > 1024 && acceptEncoding.includes('deflate')) {
    headers['Content-Encoding'] = 'deflate';
    const compressed = zlib.deflateSync(jsonBuf);
    headers['Content-Length'] = compressed.length;
    res.writeHead(statusCode, headers);
    return res.end(compressed);
  }

  headers['Content-Length'] = jsonBuf.length;
  res.writeHead(statusCode, headers);
  res.end(jsonBuf);
}

function serve404Page(res) {
  const notFoundPath = path.join(PUBLIC_DIR, '404.html');
  if (fs.existsSync(notFoundPath)) {
    const html = fs.readFileSync(notFoundPath, 'utf8');
    res.writeHead(404, {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'Content-Security-Policy': CSP_DIRECTIVES,
      'Cache-Control': 'no-cache'
    });
    return res.end(html);
  }
  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Página não encontrada (Erro 404)');
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    let size = 0;
    const MAX_SIZE = 100 * 1024; // 100 KB
    req.on('data', chunk => {
      size += chunk.length;
      if (size > MAX_SIZE) {
        req.destroy();
        reject(new Error('PAYLOAD_TOO_LARGE'));
        return;
      }
      body += chunk;
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        resolve({});
      }
    });
    req.on('error', () => resolve({}));
  });
}

const server = http.createServer(async (req, res) => {
  const clientIp = req.socket.remoteAddress || '127.0.0.1';
  
  // Rate Limiter defensivo contra abusos de requisição e scraping descontrolado
  if (!checkRateLimit(clientIp)) {
    return sendJson(res, 429, { 
      success: false, 
      error: 'Limite de requisições excedido (Rate Limit: máx 250 req/min). Aguarde 60 segundos.',
      code: 429 
    }, { 'Retry-After': '60' });
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  // Suporte a Preflight CORS Seguro
  if (req.method === 'OPTIONS') {
    const corsOrigin = getSafeCorsOrigin(req);
    res.writeHead(204, {
      'Access-Control-Allow-Origin': corsOrigin,
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN'
    });
    return res.end();
  }

  // ================= ROTAS ESPECIAIS (AI-SEO) =================
  if (pathname === '/llms.txt' && req.method === 'GET') {
    const llmsPath = path.join(PUBLIC_DIR, 'llms.txt');
    if (fs.existsSync(llmsPath)) {
      const content = fs.readFileSync(llmsPath, 'utf8');
      res.writeHead(200, {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Access-Control-Allow-Origin': getSafeCorsOrigin(req),
        'X-Content-Type-Options': 'nosniff',
        'Content-Security-Policy': CSP_DIRECTIVES,
        'Cache-Control': 'public, max-age=3600'
      });
      return res.end(content);
    }
  }

  // ================= ROTAS DE API REST =================
  if (pathname.startsWith('/api/')) {
    try {
      // 1. Health check
      if (pathname === '/api/health' && req.method === 'GET') {
        return sendJson(res, 200, {
          status: 'online',
          service: 'Figuras Políticas API',
          version: '1.0.0',
          database: 'sqlite-connected',
          timestamp: new Date().toISOString()
        }, {}, req);
      }

      // 1.0 Documentação OpenAPI/REST para pesquisadores e imprensa
      if (pathname === '/api/docs' && req.method === 'GET') {
        return sendJson(res, 200, {
          openapi: '3.0.0',
          info: {
            title: 'API Figuras Políticas',
            version: '1.0.0',
            description: 'API Pública de Transparência Eleitoral, Produtividade Parlamentar e Conformidade Institucional'
          },
          status: 'online',
          endpoints: [
            { path: '/api/candidates', method: 'GET', description: 'Catálogo de personalidades públicas e magistrados' },
            { path: '/api/candidates/{id}', method: 'GET', description: 'Dossiê individual detalhado com métricas e acervo' },
            { path: '/api/incumbents', method: 'GET', description: 'Mandatários em exercício' },
            { path: '/api/audit/{id}', method: 'GET', description: 'Auditoria criptográfica com Hash SHA-256 e SLA de contraditório' },
            { path: '/api/compare?c1={id}&c2={id}', method: 'GET', description: 'Duelo e comparação direta 1v1' },
            { path: '/api/proposals/{id}/vote', method: 'POST', description: 'Votação cívica cidadã (apoio ou rejeição)' },
            { path: '/api/contraditory', method: 'POST', description: 'Canal oficial de contraditório com SLA 48h' }
          ]
        }, {}, req);
      }

      // 1.0.1 Auditoria Criptográfica & SLA de Contraditório
      if (pathname.startsWith('/api/audit/') && req.method === 'GET') {
        const parts = pathname.split('/');
        const candId = parts[3]; // /api/audit/{id}
        const cand = candidatesData.find(c => c.id === candId);
        if (!cand) {
          return sendJson(res, 404, { success: false, error: 'Candidato não encontrado para auditoria', candidateId: candId }, {}, req);
        }
        const audit = generateMetricAuditHash(cand);
        const conflict = detectConflictOfInterest(cand);
        const predictive = calculatePredictiveMigration(cand);

        return sendJson(res, 200, {
          success: true,
          audit,
          conflictAnalysis: conflict,
          predictiveAnalysis: predictive
        }, {}, req);
      }

      // 1.1 Proxy de Imagens Oficial para Figurinhas & html2canvas (CORS Habilitado com Proteção SSRF)
      if (pathname === '/api/proxy-image' && req.method === 'GET') {
        const targetUrl = parsedUrl.searchParams.get('url');
        if (!targetUrl || (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://'))) {
          return sendJson(res, 400, { error: 'Parâmetro url é obrigatório e deve ser http/https' });
        }

        let parsedTarget;
        try {
          parsedTarget = new URL(targetUrl);
        } catch {
          return sendJson(res, 400, { error: 'URL inválida' });
        }

        const ALLOWED_HOSTS = [
          'www.camara.leg.br',
          'camara.leg.br',
          'www.senado.leg.br',
          'senado.leg.br',
          'divulgacandcontas.tse.jus.br',
          'tse.jus.br',
          'ui-avatars.com',
          'images.unsplash.com',
          'upload.wikimedia.org',
          'thumb.wikimedia.org',
          'raw.githubusercontent.com',
          'avatars.githubusercontent.com'
        ];

        const host = parsedTarget.hostname.toLowerCase();
        const isAllowed = ALLOWED_HOSTS.some(h => host === h || host.endsWith('.' + h));
        const isPrivate = host === 'localhost' || host === '127.0.0.1' || host.startsWith('192.168.') || host.startsWith('10.') || host.startsWith('172.') || host === '169.254.169.254';

        if (!isAllowed || isPrivate) {
          return sendJson(res, 403, { error: 'Domínio externo não autorizado para proxy de imagens' });
        }

        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 4000);
          const upstream = await fetch(targetUrl, {
            signal: controller.signal,
            headers: {
              'User-Agent': 'RaioXPolitico/1.0 (https://github.com/Fonteleee/RAIO-X-POLITICO; contact@raioxpolitico.org)'
            }
          });
          clearTimeout(timeoutId);

          if (upstream.ok) {
            const contentType = upstream.headers.get('content-type') || 'image/jpeg';
            const buffer = Buffer.from(await upstream.arrayBuffer());
            res.writeHead(200, {
              'Content-Type': contentType,
              'Access-Control-Allow-Origin': '*',
              'Cache-Control': 'public, max-age=86400'
            });
            return res.end(buffer);
          }
        } catch (proxyErr) {
          // Continua para o fallback seguro em caso de indisponibilidade externa
        }

        // Fallback neutro elegante (slate) em vez da antiga silhueta azul cega
        const fallbackSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="#1e293b"/><circle cx="100" cy="80" r="40" fill="#64748b"/><path d="M40 170 Q100 120 160 170" fill="#64748b"/></svg>';
        res.writeHead(200, {
          'Content-Type': 'image/svg+xml',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=86400'
        });
        return res.end(fallbackSvg);
      }

      // 2. Listar todos os candidatos (com autoridades do Judiciário integradas)
      if (pathname === '/api/candidates' && req.method === 'GET') {
        const candidates = appDb.getAllCandidates();
        try {
          const { judiciaryAuthorities } = require('../data/judiciary_authorities');
          if (Array.isArray(judiciaryAuthorities)) {
            const existingIds = new Set(candidates.map(c => c.id));
            judiciaryAuthorities.forEach(j => {
              if (!existingIds.has(j.id)) candidates.push(j);
            });
          }
        } catch {}

        const pageParam = parsedUrl.searchParams.get('page');
        const limitParam = parsedUrl.searchParams.get('limit');
        
        if (pageParam || limitParam) {
          const page = parseInt(pageParam) || 1;
          const limit = parseInt(limitParam) || 50;
          const startIndex = (page - 1) * limit;
          const endIndex = page * limit;
          const paginatedCandidates = candidates.slice(startIndex, endIndex);

          return sendJson(res, 200, { 
            success: true, 
            count: paginatedCandidates.length, 
            total: candidates.length,
            page,
            totalPages: Math.ceil(candidates.length / limit),
            data: paginatedCandidates 
          });
        }

        return sendJson(res, 200, { success: true, count: candidates.length, data: candidates });
      }

      // 3. Comparador / Duelo direto (1v1)
      if (pathname === '/api/compare' && req.method === 'GET') {
        const c1 = parsedUrl.searchParams.get('c1');
        const c2 = parsedUrl.searchParams.get('c2');
        if (!c1 || !c2) {
          return sendJson(res, 400, { error: 'Parâmetros c1 e c2 são obrigatórios' });
        }
        const comparison = appDb.getComparison(c1, c2);
        if (!comparison) {
          return sendJson(res, 404, { error: 'Um ou ambos os candidatos não foram encontrados' });
        }
        return sendJson(res, 200, { success: true, data: comparison });
      }

      // 4. Políticos em Exercício
      if (pathname === '/api/incumbents' && req.method === 'GET') {
        const incumbents = appDb.getIncumbents();
        return sendJson(res, 200, { success: true, count: incumbents.length, data: incumbents });
      }

      // 5. Dossiê completo de um candidato específico (/api/candidates/:id)
      const candMatch = pathname.match(/^\/api\/candidates\/([a-zA-Z0-9_-]+)$/);
      if (candMatch && req.method === 'GET') {
        const candidateId = candMatch[1];
        let candidate = appDb.getCandidateById(candidateId);
        if (!candidate && candidateId.startsWith('jud-')) {
          try {
            const { judiciaryAuthorities } = require('../data/judiciary_authorities');
            candidate = judiciaryAuthorities.find(j => j.id === candidateId);
          } catch {}
        }
        if (!candidate) {
          return sendJson(res, 404, { error: `Candidato ${candidateId} não encontrado` });
        }
        return sendJson(res, 200, { success: true, data: candidate });
      }

      // 6. Votação cívica em propostas
      const voteMatch = pathname.match(/^\/api\/proposals\/([a-zA-Z0-9_-]+)\/vote$/);
      if (voteMatch && req.method === 'POST') {
        const proposalId = voteMatch[1];
        const body = await parseBody(req);
        const voteType = body.voteType || body.type; // 'support' ou 'reject'

        if (!['support', 'reject'].includes(voteType)) {
          return sendJson(res, 400, { error: 'voteType deve ser "support" ou "reject"' });
        }

        const success = appDb.voteProposal(proposalId, voteType);
        if (!success) {
          return sendJson(res, 404, { error: 'Proposta não encontrada' });
        }
        return sendJson(res, 200, { success: true, message: 'Voto registrado com sucesso' });
      }

      // 7. Canal de Contraditório Pré-Litígio e Retificação Factual (Compliance LAI 12.527/11)
      if (pathname === '/api/contraditory' && req.method === 'POST') {
        const body = await parseBody(req);
        if (!body.requesterEmail || !body.justification) {
          return sendJson(res, 400, { error: 'E-mail do requerente e justificativa fundamentada são obrigatórios' });
        }
        const result = appDb.addContradictoryRequest({
          requesterName: body.requesterName || body.name,
          requesterEmail: body.requesterEmail || body.email,
          candidateName: body.candidateName || body.candidate,
          requestType: body.requestType || body.type,
          proofLink: body.proofLink || body.link,
          justification: body.justification
        });
        return sendJson(res, 201, result);
      }

      // 8. Auto-Atualização Diária dos Dados Cívicos (Câmara, Senado e TSE)
      if (pathname === '/api/admin/auto-update') {
        const result = await autoUpdater.runDailyMaintenance();
        return sendJson(res, 200, result);
      }

      return sendJson(res, 404, { error: 'Endpoint não encontrado' });
    } catch (err) {
      if (err.message === 'PAYLOAD_TOO_LARGE') {
        return sendJson(res, 413, { error: 'Payload Too Large' });
      }
      console.error('[API Error]:', err);
      return sendJson(res, 500, { error: 'Erro interno no servidor' });
    }
  }

  // ================= REDIRECIONAMENTOS DE CONSOLIDAÇÃO DE VERSÃO =================
  // Garante que index_v2.html e dossie_v2.html sejam automaticamente unificados na versão principal
  if (pathname === '/index_v2.html') {
    const qs = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
    res.writeHead(302, { 
      'Location': '/' + qs,
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    });
    return res.end();
  }

  if (pathname === '/dossie_v2.html') {
    const qs = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
    res.writeHead(302, { 
      'Location': '/dossie.html' + qs,
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    });
    return res.end();
  }

  // ================= SERVIÇO DE ARQUIVOS ESTÁTICOS SEGURO =================
  let filePath = pathname === '/' ? '/index.html' : pathname;
  filePath = path.normalize(path.join(PUBLIC_DIR, filePath));

  // Proteção contra Directory Traversal
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('Acesso proibido');
  }

  // Proteção contra acesso a arquivos e pastas confidenciais/internos
  const relPath = path.relative(PUBLIC_DIR, filePath).replace(/\\/g, '/').toLowerCase();
  const FORBIDDEN_PREFIXES = [
    'src/',
    'tests/',
    'scratch/',
    '.git',
    '.gemini',
    'package.json',
    'package-lock.json',
    '.gitignore',
    '.env'
  ];
  const isForbidden = FORBIDDEN_PREFIXES.some(p => 
    relPath === p || 
    relPath.startsWith(p) ||
    relPath.endsWith('.db') ||
    relPath.endsWith('.sqlite') ||
    relPath.includes('.env') ||
    relPath === 'data/raiox.db'
  );

  if (isForbidden) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('Acesso proibido a arquivos de infraestrutura e dados internos');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      const accept = req.headers.accept || '';
      if (accept.includes('text/html') || pathname.endsWith('.html') || !pathname.includes('.')) {
        return serve404Page(res);
      }
      res.writeHead(404, { 
        'Content-Type': 'application/json; charset=utf-8',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN'
      });
      return res.end(JSON.stringify({ success: false, error: 'Recurso não encontrado', code: 404 }));
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Determina política de Cache-Control por tipo de recurso
    let cacheControl;
    if (ext.match(/\.(jpg|jpeg|png|svg|ico|webp)$/)) {
      cacheControl = 'public, max-age=604800, stale-while-revalidate=86400';
    } else if (ext.match(/\.(js|css|woff2?|ttf|eot)$/)) {
      cacheControl = process.env.NODE_ENV === 'production' ? 'public, max-age=86400, stale-while-revalidate=3600' : 'no-cache, must-revalidate';
    } else if (ext === '.html') {
      cacheControl = 'no-cache, must-revalidate';
    } else {
      cacheControl = 'public, max-age=3600';
    }

    // Suporte a ETag determinístico e resposta 304 Not Modified
    const etag = `W/"${stats.size.toString(16)}-${Math.floor(stats.mtimeMs).toString(16)}"`;
    if (req.headers['if-none-match'] === etag) {
      res.writeHead(304, {
        'ETag': etag,
        'Cache-Control': cacheControl,
        'Vary': 'Accept-Encoding'
      });
      return res.end();
    }

    const headers = { 
      'Content-Type': contentType,
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Content-Security-Policy': CSP_DIRECTIVES,
      'Cache-Control': cacheControl,
      'ETag': etag,
      'Vary': 'Accept-Encoding'
    };

    if (cacheControl.includes('no-cache')) {
      headers['Pragma'] = 'no-cache';
      headers['Expires'] = '0';
    }

    // Compressão gzip / deflate para arquivos baseados em texto
    const isCompressible = /\.(html|css|js|json|svg|txt|xml|md)$/.test(ext) && stats.size > 512;
    const acceptEncoding = req.headers['accept-encoding'] || '';

    if (isCompressible && acceptEncoding.includes('gzip')) {
      headers['Content-Encoding'] = 'gzip';
      res.writeHead(200, headers);
      const stream = fs.createReadStream(filePath);
      const gzip = zlib.createGzip({ level: zlib.constants.Z_DEFAULT_COMPRESSION });
      return stream.pipe(gzip).pipe(res);
    } else if (isCompressible && acceptEncoding.includes('deflate')) {
      headers['Content-Encoding'] = 'deflate';
      res.writeHead(200, headers);
      const stream = fs.createReadStream(filePath);
      const deflate = zlib.createDeflate();
      return stream.pipe(deflate).pipe(res);
    }

    headers['Content-Length'] = stats.size;
    res.writeHead(200, headers);
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`[Raio-X Político] Servidor oficial rodando em http://localhost:${PORT}`);
    console.log(`[Raio-X Político] Endpoints REST disponíveis em http://localhost:${PORT}/api/candidates`);
    autoUpdater.scheduleDailyWorker();
  });
}

module.exports = { server, appDb };
