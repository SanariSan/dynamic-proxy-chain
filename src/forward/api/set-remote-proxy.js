const { setCurrentRemoteProxy } = require('../shared');

module.exports = (proxy) => {
  setCurrentRemoteProxy(proxy);

  const message = 'Updated remote proxy to ' + proxy;
  console.log(message);

  return { data: 'OK' };
};
