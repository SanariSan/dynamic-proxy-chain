const httpProxy = require('http-proxy');
const { getCurrentRemoteProxy } = require('./shared');

let remoteProxyClient;
let remoteProxySettings;

function setupRemoteProxyClient({ remoteProxyHost, remoteProxyPort }) {
  if (remoteProxyClient) remoteProxyClient.removeAllListeners();

  remoteProxySettings = {
    target: {
      host: remoteProxyHost,
      port: remoteProxyPort,
    },
    toProxy: true,
    prependPath: false,
  };
  remoteProxyClient = new httpProxy.createProxyServer(remoteProxySettings);
  remoteProxyClient.on('error', function (err) {
    console.log('ERR:', err);
  });
}

const proxyRequest = (request, response) => {
  const { remoteProxyUsername, remoteProxyPassword } = getCurrentRemoteProxy();
  if (remoteProxyUsername && remoteProxyPassword) {
    request.headers['Proxy-Authorization'] =
      'Basic ' + Buffer.from(`${remoteProxyUsername}:${remoteProxyPassword}`).toString('base64');
  }

  remoteProxyClient.web(request, response, remoteProxySettings);
};

module.exports = {
  setupRemoteProxyClient,
  proxyRequest,
};
