const httpProxy = require('http-proxy');
const { getCurrentRemoteProxy } = require('./shared');

let remoteProxyClient;
let remoteProxySettings;

function setupRemoteProxyClient() {
  if (remoteProxyClient) remoteProxyClient.removeAllListeners();

  remoteProxyClient = new httpProxy.createProxyServer({});
  remoteProxyClient.on('error', function (err) {
    console.log('ERR:', err);
  });
}

const proxyRequest = (request, response) => {
  const { remoteProxyUsername, remoteProxyPassword, remoteProxyHost, remoteProxyPort } =
    getCurrentRemoteProxy();

  if (remoteProxyUsername && remoteProxyPassword) {
    request.headers['Proxy-Authorization'] =
      'Basic ' + Buffer.from(`${remoteProxyUsername}:${remoteProxyPassword}`).toString('base64');
  }

  remoteProxySettings = {
    target: {
      host: remoteProxyHost,
      port: remoteProxyPort,
    },
    toProxy: true,
    prependPath: false,
  };

  remoteProxyClient.web(request, response, remoteProxySettings);
};

module.exports = {
  setupRemoteProxyClient,
  proxyRequest,
};
