const { getCurrentRemoteProxy } = require('../shared.js');
const { proxyChain, noProxyChain } = require('./https/index.js');

// PROXY HTTPS
function setupHttps({ server }) {
  server.on('connect', (request, clientSocket, head) => {
    const proxyObj = getCurrentRemoteProxy();

    if (proxyObj.remoteProxyHost && proxyObj.remoteProxyPort) {
      proxyChain(request, clientSocket);
    } else {
      noProxyChain(request, clientSocket, head);
    }
  });
}

module.exports = setupHttps;
