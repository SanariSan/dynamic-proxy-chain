const http = require('http');
const { setupApiHttp } = require('./api/index');

function setupApiServer({ apiHost = '127.0.0.1', apiPort = 3001 }) {
  const apiServer = http.createServer();

  apiServer.on('error', (e) => {
    if (e.code === 'EADDRINUSE' || e.code === 'EADDRNOTAVAIL') {
      console.log('Address in use or not available, retrying...');
      setTimeout(() => {
        apiServer.close();
        apiServer.listen(apiPort, apiHost);
      }, 5000);
    }
  });

  setupApiHttp({ apiServer });

  apiServer.listen(apiPort, apiHost, () => {
    console.log(`Api Listening: ${apiHost}:${apiPort}`);
  });
}

module.exports = {
  setupApiServer,
};
