const { proxyRequest } = require('../remote-proxy-client');

// PROXY HTTP
function setupHttp({ server, httpsOnly }) {
  server.on(
    'request',
    httpsOnly
      ? (req, res) => {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('No http allowed');
        }
      : (request, response) => {
          const { protocol, port, hostname, pathname } = new URL(request.url);

          console.log(`[+] HTTP: ${hostname}:${port || '80'}${pathname || ''}`);

          proxyRequest(request, response);
          return;
        },
  );
}

module.exports = setupHttp;
