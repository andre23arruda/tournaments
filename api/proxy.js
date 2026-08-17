import https from 'https';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const { path } = req.query;

  if (!path) {
    return res.status(400).json({ error: 'Missing path parameter' });
  }

  // Reconstruct target path including search query parameters
  const url = new URL(req.url, `https://${req.headers.host || 'localhost'}`);
  const searchParams = url.searchParams;
  searchParams.delete('path'); // remove the 'path' parameter used for routing
  
  const targetPath = `/${path}${searchParams.toString() ? '?' + searchParams.toString() : ''}`;

  // Clone headers and exclude hop-by-hop/restricted headers
  const headers = {};
  const excludedHeaders = new Set([
    'host',
    'connection',
    'keep-alive',
    'content-length',
    'transfer-encoding',
    'content-encoding',
    'te',
    'trailer',
    'upgrade'
  ]);

  for (const [key, value] of Object.entries(req.headers)) {
    if (!excludedHeaders.has(key.toLowerCase())) {
      headers[key] = value;
    }
  }
  headers['host'] = 'andre23arruda.pythonanywhere.com';

  const isHead = req.method === 'HEAD';
  const requestMethod = isHead ? 'GET' : req.method;

  const options = {
    hostname: 'andre23arruda.pythonanywhere.com',
    port: 443,
    path: targetPath,
    method: requestMethod,
    headers: headers,
    timeout: 15000, // 15 seconds connection/response timeout
  };

  return new Promise((resolve) => {
    const proxyReq = https.request(options, (proxyRes) => {
      // Forward status code
      res.status(proxyRes.statusCode || 502);

      // Forward headers from PythonAnywhere to the client
      Object.entries(proxyRes.headers).forEach(([key, value]) => {
        const lowerKey = key.toLowerCase();
        if (lowerKey !== 'transfer-encoding') {
          // Rewrite Location headers so the browser stays inside the proxy
          if (lowerKey === 'location' && typeof value === 'string') {
            value = value.replace('https://andre23arruda.pythonanywhere.com', '');
          }
          if (value !== undefined) {
            res.setHeader(key, value);
          }
        }
      });

      if (isHead) {
        res.end();
        resolve();
      } else {
        const chunks = [];
        proxyRes.on('data', (chunk) => {
          chunks.push(chunk);
        });
        proxyRes.on('end', () => {
          res.send(Buffer.concat(chunks));
          resolve();
        });
        proxyRes.on('error', (err) => {
          console.error('Error reading response body from target:', err);
          if (!res.writableEnded) {
            res.status(502).json({
              error: 'ROUTER_EXTERNAL_TARGET_READ_ERROR',
              message: 'Failed to read response from backend',
              details: err.message
            });
          }
          resolve();
        });
      }
    });

    proxyReq.on('error', (error) => {
      console.error('Vercel serverless proxy error:', error);
      if (!res.writableEnded) {
        res.status(502).json({
          error: 'ROUTER_EXTERNAL_TARGET_CONNECTION_ERROR_BYPASSED',
          message: 'Failed to connect to backend via serverless function proxy (https)',
          details: error.message,
          cause: error.stack
        });
      }
      resolve();
    });

    proxyReq.on('timeout', () => {
      console.error('Proxy request timeout after 15000ms');
      proxyReq.destroy();
      if (!res.writableEnded) {
        res.status(504).json({
          error: 'ROUTER_EXTERNAL_TARGET_CONNECTION_TIMEOUT',
          message: 'Connection to backend timed out (https)',
        });
      }
      resolve();
    });

    // Pipe the request body to the proxy request if applicable
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      req.pipe(proxyReq);
    } else {
      proxyReq.end();
    }
  });
}
