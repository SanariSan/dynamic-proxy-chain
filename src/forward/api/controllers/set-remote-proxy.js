const { RemoteProxy } = require('../../proxy');

// log:pass@host:port OR host:port
module.exports = (proxy) => {
  const parsed = RemoteProxy.parseProxyString(proxy);
  RemoteProxy.init().currentRemoteProxy = parsed;

  const message = 'Updated remote proxy to ' + proxy;
  console.log(message);

  return { data: 'OK' };
};
