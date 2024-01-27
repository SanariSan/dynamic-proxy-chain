const { setupServer } = require('./setupServer');
const { monkeyPatchConsole } = require('./util');

monkeyPatchConsole({ disableLogging: process.env.DISABLE_LOGGING === 'true' });

process.on('uncaughtException', (e) => {
  console.log(null, e);
});
process.on('unhandledRejection', (e) => {
  console.log(null, e);
});

async function index() {
  const httpsOnly = process.env.HTTPS_ONLY === 'true';
  const host = process.env.HOST;
  const port = Number(process.env.PORT) || process.env.PORT;
  const apiHost = process.env.API_HOST;
  const apiPort = Number(process.env.API_PORT) || process.env.API_PORT;

  console.dir({ httpsOnly, host, port, apiHost, apiPort });

  setupServer({
    httpsOnly,
    host,
    port,
    apiHost,
    apiPort,
  });
}

index();
