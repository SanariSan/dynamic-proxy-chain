const { getCurrentRemoteProxy, constructProxyString } = require('../shared');

module.exports = () => {
  const proxy = getCurrentRemoteProxy();
  const proxyString = constructProxyString(proxy);

  const message = 'Current remote proxy is ' + proxyString;
  console.log(message);

  return { data: proxyString };
};
