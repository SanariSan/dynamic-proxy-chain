const httpProxy = require('http-proxy');
const { RemoteProxy } = require('../remote-proxy-client');

// PROXY HTTP
const forwardProxy = httpProxy.createProxyServer({});
function setupHttp({ server, proxyHttpsOnly }) {
  server.on(
    'request',
    proxyHttpsOnly
      ? (req, res) => {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('No http allowed');
        }
      : (request, response) => {
          const { protocol, port, hostname, pathname } = new URL(request.url);

          console.log(`[+] HTTP: ${hostname}:${port || '80'}${pathname || ''}`);

          const remoteProxy = RemoteProxy.init();
          if (remoteProxy.isConfigured()) {
            RemoteProxy.init().proxyRequest(request, response);
            return;
          }

          forwardProxy.web(request, response, {
            target: `${protocol}//${hostname}:${port || '80'}`,
          });
        },
  );
}

module.exports = setupHttp;
