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

  // Reconstruct target URL including search query parameters
  const url = new URL(req.url, `https://${req.headers.host || 'localhost'}`);
  const searchParams = url.searchParams;
  searchParams.delete('path'); // remove the 'path' parameter used for routing
  
  const targetUrl = `https://andre23arruda.pythonanywhere.com/${path}${searchParams.toString() ? '?' + searchParams.toString() : ''}`;

  // Clone headers
  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    // Avoid forwarding the original host and connection headers
    if (key.toLowerCase() !== 'host' && key.toLowerCase() !== 'connection') {
      headers.set(key, value);
    }
  }
  headers.set('host', 'andre23arruda.pythonanywhere.com');

  const fetchOptions = {
    method: req.method,
    headers,
    duplex: 'half',
  };

  // Only pass body for non-GET/HEAD methods
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    fetchOptions.body = req;
  }

  try {
    const response = await fetch(targetUrl, fetchOptions);

    // Forward headers from PythonAnywhere to the client
    response.headers.forEach((value, key) => {
      const lowerKey = key.toLowerCase();
      if (
        lowerKey !== 'transfer-encoding' &&
        lowerKey !== 'content-encoding' &&
        lowerKey !== 'content-length'
      ) {
        res.setHeader(key, value);
      }
    });

    res.status(response.status);

    const data = await response.arrayBuffer();
    res.send(Buffer.from(data));
  } catch (error) {
    console.error('Vercel serverless proxy error:', error);
    res.status(502).json({
      error: 'ROUTER_EXTERNAL_TARGET_CONNECTION_ERROR_BYPASSED',
      message: 'Failed to connect to backend via serverless function proxy',
      details: error.message
    });
  }
}
