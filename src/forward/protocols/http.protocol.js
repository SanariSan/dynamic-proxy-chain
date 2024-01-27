const httpProxy = require('http-proxy');
const { proxyRequest } = require('../remote-proxy-client');
const { getCurrentRemoteProxy } = require('../shared');

// PROXY HTTP

const forwardProxy = httpProxy.createProxyServer({});
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

          const proxyObj = getCurrentRemoteProxy();
          if (proxyObj.remoteProxyHost && proxyObj.remoteProxyPort) {
            proxyRequest(request, response);
            return;
          }

          forwardProxy.web(request, response, {
            target: `${protocol}//${hostname}:${port || '80'}`,
          });
        },
  );
}

module.exports = setupHttp;
