const { getCurrentRemoteProxy } = require('../shared');

module.exports = () => {
  const proxy = getCurrentRemoteProxy();

  const message = 'Current remote proxy is ' + proxy;
  console.log(message);

  return { data: proxy };
};
