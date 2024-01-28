const { RemoteProxy } = require('../../proxy');

module.exports = () => {
  const proxy = RemoteProxy.init().currentRemoteProxy;
  const proxyString = RemoteProxy.constructProxyString(proxy);

  const message = 'Current remote proxy is ' + proxyString;
  console.log(message);

  return { data: proxyString };
};
