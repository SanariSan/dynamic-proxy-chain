const http = require('http');
const { setupHttp, setupHttps } = require('./proxy');

function setupProxyServer({ proxyHost = '127.0.0.1', proxyPort = 3000, proxyHttpsOnly }) {
  const server = http.createServer();

  server.on('error', (e) => {
    if (e.code === 'EADDRINUSE' || e.code === 'EADDRNOTAVAIL') {
      console.log('Address in use or not available, retrying...');
      setTimeout(() => {
        server.close();
        server.listen(proxyPort, proxyHost);
      }, 5000);
    }
  });

  setupHttp({ server, proxyHttpsOnly });
  setupHttps({ server });

  server.listen(proxyPort, proxyHost, () => {
    console.log(`Proxy Listening: ${proxyHost}:${proxyPort}`);
  });
}

module.exports = {
  setupProxyServer,
};
