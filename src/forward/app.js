const { setupApiServer } = require('./setup-api-server');
const { setupProxyServer } = require('./setup-proxy-server');
const { monkeyPatchConsole } = require('./util');

monkeyPatchConsole({ disableLogging: process.env.DISABLE_LOGGING === 'true' });

process.on('uncaughtException', (e) => {
  console.log(null, e);
});

process.on('unhandledRejection', (e) => {
  console.log(null, e);
});

async function index() {
  const host = process.env.HOST;
  const port = Number(process.env.PORT) || process.env.PORT;
  const httpsOnly = process.env.HTTPS_ONLY === 'true';
  const apiHost = process.env.API_HOST;
  const apiPort = Number(process.env.API_PORT) || process.env.API_PORT;

  console.dir({ host, port, httpsOnly, apiHost, apiPort });

  setupProxyServer({
    host,
    port,
    httpsOnly,
  });

  setupApiServer({
    apiHost,
    apiPort,
  });
}

index();
