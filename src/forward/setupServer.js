const http = require('http');
const { setupHttp, setupHttps, setupApiHttp } = require('./protocols/index.js');
const { getCurrentRemoteProxy } = require('./shared.js');
const { setupRemoteProxyClient } = require('./remote-proxy-client.js');
const eventEmitter = require('./events.js');

function setupServer({
  httpsOnly,
  host = '127.0.0.1',
  port = 3000,
  apiHost = '127.0.0.1',
  apiPort = 3001,
}) {
  const server = http.createServer();
  const apiServer = http.createServer();

  server.on('error', (e) => {
    if (e.code === 'EADDRINUSE' || e.code === 'EADDRNOTAVAIL') {
      console.log('Address in use or not available, retrying...');
      setTimeout(() => {
        server.close();
        server.listen(port, host);
      }, 5000);
    }
  });

  apiServer.on('error', (e) => {
    if (e.code === 'EADDRINUSE' || e.code === 'EADDRNOTAVAIL') {
      console.log('Address in use or not available, retrying...');
      setTimeout(() => {
        apiServer.close();
        apiServer.listen(apiPort, apiHost);
      }, 5000);
    }
  });

  setupHttp({ server, httpsOnly });
  setupHttps({ server });
  setupApiHttp({ apiServer });

  const proxyObj = getCurrentRemoteProxy();
  setupRemoteProxyClient(proxyObj);

  eventEmitter.on('set-remote-proxy', (proxyObj) => {
    setupRemoteProxyClient(proxyObj);
  });

  server.listen(port, host, () => {
    console.log(`Proxy Listening: ${host}:${port}`);
  });

  apiServer.listen(apiPort, apiHost, () => {
    console.log(`Api Listening: ${apiHost}:${apiPort}`);
  });
}

module.exports = {
  setupServer,
};
