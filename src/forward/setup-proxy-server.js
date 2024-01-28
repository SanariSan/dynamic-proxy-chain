const http = require('http');
const { setupHttp, setupHttps } = require('./proxy');

function setupProxyServer({ host = '127.0.0.1', port = 3000, proxyHttpsOnly }) {
  const server = http.createServer();

  server.on('error', (e) => {
    if (e.code === 'EADDRINUSE' || e.code === 'EADDRNOTAVAIL') {
      console.log('Address in use or not available, retrying...');
      setTimeout(() => {
        server.close();
        server.listen(port, host);
      }, 5000);
    }
  });

  setupHttp({ server, proxyHttpsOnly });
  setupHttps({ server });

  server.listen(port, host, () => {
    console.log(`Proxy Listening: ${host}:${port}`);
  });
}

module.exports = {
  setupProxyServer,
};
