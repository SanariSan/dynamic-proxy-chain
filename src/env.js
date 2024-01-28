class EnvNotFoundError extends Error {
  constructor(envKey) {
    super(`Environment variable ${envKey} is not defined`);
  }
}

class EnvValueMismatchError extends Error {
  constructor(envKey, value) {
    super(`Environment variable ${envKey} has invalid value: ${value}`);
  }
}

function parseEnv() {
  // todo: validate if want to
  const env = {
    proxyHost: process.env.PROXY_HOST,
    proxyPort: Number(process.env.PROXY_PORT) || process.env.PROXY_PORT,
    apiHost: process.env.API_HOST,
    apiPort: Number(process.env.API_PORT) || process.env.API_PORT,
    proxyHttpsOnly: process.env.PROXY_HTTPS_ONLY === 'true',
    initialRemoteProxyUsername: process.env.INITIAL_REMOTE_PROXY_USERNAME,
    initialRemoteProxyPassword: process.env.INITIAL_REMOTE_PROXY_PASSWORD,
    initialRemoteProxyHost: process.env.INITIAL_REMOTE_PROXY_HOST,
    initialRemoteProxyPort: process.env.INITIAL_REMOTE_PROXY_PORT,
    disableLogging: process.env.DISABLE_LOGGING,
  };

  const isIp = (s) => /^(?:\d{1,3}\.){3}\d{1,3}$/.test(s);
  const isPort = (s) =>
    !Number.isNaN(Number.parseInt(s)) && Number.parseInt(s) >= 0 && Number.parseInt(s) <= 65535;

  switch (true) {
    case env.proxyHost === undefined:
      throw new EnvNotFoundError('PROXY_HOST');
    case env.proxyHost !== undefined && !isIp(env.proxyHost):
      throw new EnvValueMismatchError('PROXY_HOST', env.proxyHost);
    case env.proxyPort === undefined:
      throw new EnvNotFoundError('PROXY_PORT');
    case env.proxyPort !== undefined && !isPort(env.proxyPort):
      throw new EnvValueMismatchError('PROXY_PORT', env.proxyPort);
    case env.apiHost === undefined:
      throw new EnvNotFoundError('API_HOST');
    case env.apiHost !== undefined && !isIp(env.apiHost):
      throw new EnvValueMismatchError('API_HOST', env.apiHost);
    case env.apiPort === undefined:
      throw new EnvNotFoundError('API_PORT');
    case env.apiPort !== undefined && !isPort(env.apiPort):
      throw new EnvValueMismatchError('API_PORT', env.apiPort);
    case env.proxyHttpsOnly === undefined:
      throw new EnvNotFoundError('PROXY_HTTPS_ONLY');
    case env.initialRemoteProxyUsername === undefined:
      throw new EnvNotFoundError('INITIAL_REMOTE_PROXY_USERNAME');
    case env.initialRemoteProxyPassword === undefined:
      throw new EnvNotFoundError('INITIAL_REMOTE_PROXY_PASSWORD');
    case env.initialRemoteProxyHost !== undefined && !isIp(env.initialRemoteProxyHost):
      throw new EnvValueMismatchError('INITIAL_REMOTE_PROXY_HOST', env.initialRemoteProxyHost);
    case env.initialRemoteProxyPort !== undefined && !isPort(env.initialRemoteProxyPort):
      throw new EnvValueMismatchError('INITIAL_REMOTE_PROXY_PORT', env.initialRemoteProxyPort);
    case env.disableLogging === undefined:
      throw new EnvNotFoundError('DISABLE_LOGGING');
    default:
      break;
  }

  return env;
}

module.exports = {
  parseEnv,
};
