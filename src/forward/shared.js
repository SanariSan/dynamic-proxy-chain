const eventEmitter = require('./events');

// host:port
let currentRemoteProxy = '127.0.0.1:1337';

const getCurrentRemoteProxy = () => currentRemoteProxy;
const setCurrentRemoteProxy = (proxy) => {
  currentRemoteProxy = proxy;
  eventEmitter.emit('set-remote-proxy', proxy);
};

module.exports = {
  getCurrentRemoteProxy,
  setCurrentRemoteProxy,
};
