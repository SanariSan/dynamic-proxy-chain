const eventEmitter = require('./events');

let currentRemoteProxy = {
  remoteProxyUsername: undefined,
  remoteProxyPassword: undefined,
  remoteProxyHost: undefined,
  remoteProxyPort: undefined,
};

/**
 * Function that takes a proxy string.
 *
 * @param string proxy
 */
const parseProxyString = (proxy) => {
  const splitted = proxy.split('@');

  let parsed;

  if (splitted.length === 1) {
    const [host, port] = splitted[0].split(':');
    parsed = {
      remoteProxyHost: host,
      remoteProxyPort: port,
    };
  } else if (splitted.length === 2) {
    const [username, password] = splitted[0].split(':');
    const [host, port] = splitted[1].split(':');

    parsed = {
      remoteProxyUsername: username,
      remoteProxyPassword: password,
      remoteProxyHost: host,
      remoteProxyPort: port,
    };
  } else {
    throw new Error('Invalid proxy format');
  }

  return parsed;
};

/**
 * Function that takes an object with specific properties.
 *
 * @param {{
 *  remoteProxyUsername: string,
 *  remoteProxyPassword: string,
 *  remoteProxyHost: string,
 *  remoteProxyPort: string }} proxyObj
 */
const constructProxyString = (proxyObject) => {
  const p = proxyObject;

  const proxyString =
    (p.remoteProxyUsername ?? '') +
    (p.remoteProxyUsername ? ':' : '') +
    (p.remoteProxyPassword ?? '') +
    (p.remoteProxyUsername && p.remoteProxyPassword ? '@' : '') +
    (p.remoteProxyHost ?? '') +
    (p.remoteProxyHost ? ':' : '') +
    (p.remoteProxyPort ?? '');

  return proxyString;
};

const getCurrentRemoteProxy = () => currentRemoteProxy;

/**
 * Function that takes an object with specific properties.
 *
 * @param {{
 *  remoteProxyUsername: string,
 *  remoteProxyPassword: string,
 *  remoteProxyHost: string,
 *  remoteProxyPort: string }} proxyObj
 */
const setCurrentRemoteProxy = (proxyObj) => {
  currentRemoteProxy = proxyObj;
  eventEmitter.emit('setup-remote-proxy');
};

module.exports = {
  getCurrentRemoteProxy,
  setCurrentRemoteProxy,
  parseProxyString,
  constructProxyString,
};
