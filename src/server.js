// Raio-X Político - Servidor de Produção & API REST
// Desenvolvido em Node.js com node:http e node:sqlite nativos

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { AppDatabase } = require('./db/database');

const PORT = process.env.PORT || 8080;
const PUBLIC_DIR = path.join(__dirname, '..');
const appDb = new AppDatabase();

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

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Cache-Control': 'no-cache'
  });
  res.end(JSON.stringify(data));
}

function parseBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        resolve({});
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  // Suporte a Preflight CORS
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
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
        'Access-Control-Allow-Origin': '*',
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
          service: 'Raio-X Político API',
          version: '1.0.0',
          database: 'sqlite-connected',
          timestamp: new Date().toISOString()
        });
      }

      // 1.1 Proxy de Imagens Oficial para Figurinhas & html2canvas (CORS Habilitado)
      if (pathname === '/api/proxy-image' && req.method === 'GET') {
        const targetUrl = parsedUrl.searchParams.get('url');
        if (!targetUrl || (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://'))) {
          return sendJson(res, 400, { error: 'Parâmetro url é obrigatório e deve ser http/https' });
        }
        try {
          const upstream = await fetch(targetUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) RaioXPolitico/1.0'
            }
          });
          if (!upstream.ok) {
            return sendJson(res, upstream.status, { error: 'Falha ao recuperar imagem remota' });
          }
          const contentType = upstream.headers.get('content-type') || 'image/jpeg';
          const buffer = Buffer.from(await upstream.arrayBuffer());
          res.writeHead(200, {
            'Content-Type': contentType,
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'public, max-age=86400'
          });
          return res.end(buffer);
        } catch (proxyErr) {
          return sendJson(res, 500, { error: proxyErr.message });
        }
      }

      // 2. Listar todos os candidatos
      if (pathname === '/api/candidates' && req.method === 'GET') {
        const candidates = appDb.getAllCandidates();
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
        const candidate = appDb.getCandidateById(candidateId);
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

      return sendJson(res, 404, { error: 'Endpoint não encontrado' });
    } catch (err) {
      console.error('[API Error]:', err);
      return sendJson(res, 500, { error: 'Erro interno no servidor' });
    }
  }

  // ================= SERVIÇO DE ARQUIVOS ESTÁTICOS =================
  let filePath = pathname === '/' ? '/index.html' : pathname;
  filePath = path.normalize(path.join(PUBLIC_DIR, filePath));

  // Proteção contra Directory Traversal
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('Acesso proibido');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('Arquivo não encontrado');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`[Raio-X Político] Servidor oficial rodando em http://localhost:${PORT}`);
    console.log(`[Raio-X Político] Endpoints REST disponíveis em http://localhost:${PORT}/api/candidates`);
  });
}

module.exports = { server, appDb };
