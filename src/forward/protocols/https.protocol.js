const { proxyChain } = require('./https/index.js');

// PROXY HTTPS
function setupHttps({ server }) {
  server.on('connect', (request, clientSocket, head) => {
    proxyChain(request, clientSocket);
  });
}

module.exports = setupHttps;
