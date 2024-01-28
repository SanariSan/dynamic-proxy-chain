const { RemoteProxy } = require('../remote-proxy-client.js');
const { proxyChain, noProxyChain } = require('./https/index.js');

// PROXY HTTPS
function setupHttps({ server }) {
  server.on('connect', (request, clientSocket, head) => {
    const remoteProxy = RemoteProxy.init();

    if (remoteProxy.isConfigured()) {
      proxyChain(request, clientSocket);
    } else {
      noProxyChain(request, clientSocket, head);
    }
  });
}

module.exports = setupHttps;
