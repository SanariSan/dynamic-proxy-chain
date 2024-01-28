const { parseEnv } = require('../env');
const { setupApiServer } = require('./setup-api-server');
const { setupProxyServer } = require('./setup-proxy-server');
const { monkeyPatchConsole } = require('./util');

process.on('uncaughtException', (e) => {
  console.log(null, e);
});

process.on('unhandledRejection', (e) => {
  console.log(null, e);
});

async function index() {
  const env = parseEnv();
  console.dir({ config: env });

  monkeyPatchConsole({ disableLogging: env.disableLogging === 'true' });

  setupProxyServer(env);
  setupApiServer(env);
}

index();
