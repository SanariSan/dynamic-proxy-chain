const httpProxy = require('http-proxy');

let remoteProxyClient;
let remoteProxySettings;

function setupRemoteProxyClient(remoteProxyHost, remoteProxyPort) {
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
  remoteProxyClient.web(request, response, remoteProxySettings);
};

module.exports = {
  setupRemoteProxyClient,
  proxyRequest,
};
