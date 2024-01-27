const { setCurrentRemoteProxy, parseProxyString } = require('../shared');

// log:pass@host:port OR host:port
module.exports = (proxy) => {
  const parsed = parseProxyString(proxy);
  setCurrentRemoteProxy(parsed);

  const message = 'Updated remote proxy to ' + proxy;
  console.log(message);

  return { data: 'OK' };
};
