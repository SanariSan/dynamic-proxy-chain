const httpProxy = require('http-proxy');

const nullifyIfFalsy = (value) => (value ? value : undefined);

CURRENT_REMOTE_PROXY_DEFAULT = {
  remoteProxyUsername: nullifyIfFalsy(process.env.INITIAL_REMOTE_PROXY_USERNAME),
  remoteProxyPassword: nullifyIfFalsy(process.env.INITIAL_REMOTE_PROXY_PASSWORD),
  remoteProxyHost: nullifyIfFalsy(process.env.INITIAL_REMOTE_PROXY_HOST),
  remoteProxyPort: nullifyIfFalsy(process.env.INITIAL_REMOTE_PROXY_PORT),
};

class RemoteProxy {
  instance;
  #client;

  #currentRemoteProxy = CURRENT_REMOTE_PROXY_DEFAULT;

  constructor() {
    this.#client = new httpProxy.createProxyServer({});
    this.#client.on('error', function (err) {
      console.log('ERR:', err);
    });
  }

  /**
   * Object with proxy config.
   *
   * @param {{
   *  remoteProxyUsername: string,
   *  remoteProxyPassword: string,
   *  remoteProxyHost: string,
   *  remoteProxyPort: string }} proxyObj
   */
  set currentRemoteProxy(proxyObj) {
    this.#currentRemoteProxy = proxyObj;
  }

  get currentRemoteProxy() {
    return this.#currentRemoteProxy;
  }

  isConfigured() {
    return this.#currentRemoteProxy.remoteProxyHost && this.#currentRemoteProxy.remoteProxyPort;
  }

  isProtected() {
    return (
      this.#currentRemoteProxy.remoteProxyUsername && this.#currentRemoteProxy.remoteProxyPassword
    );
  }

  /**
   * Method for proxying http requests.
   * @param {Request} request - request from http.
   * @param {Response} response - response from http.
   */
  proxyRequest = (request, response) => {
    const { remoteProxyUsername, remoteProxyPassword, remoteProxyHost, remoteProxyPort } =
      this.#currentRemoteProxy;

    if (this.isProtected()) {
      request.headers['Proxy-Authorization'] =
        'Basic ' + Buffer.from(`${remoteProxyUsername}:${remoteProxyPassword}`).toString('base64');
    }

    const remoteProxySettings = {
      target: {
        host: remoteProxyHost,
        port: remoteProxyPort,
      },
      toProxy: true,
      prependPath: false,
    };

    this.#client.web(request, response, remoteProxySettings);
  };

  /**
   * Singleton initialization method for RemoteProxy.
   */
  static init() {
    if (this.instance === undefined) {
      this.instance = new RemoteProxy();
    }

    return this.instance;
  }

  /**
   * Function that takes a proxy string.
   *
   * @param string proxy
   */
  static parseProxyString(proxy) {
    if (proxy === '') {
      return CURRENT_REMOTE_PROXY_DEFAULT;
    }

    const splitted = proxy.split('@');
    let parsed;

    if (splitted.length === 1) {
      const [host, port] = splitted[0].split(':');
      parsed = {
        remoteProxyHost: host,
        remoteProxyPort: port,
      };
    } else if (splitted.length === 2) {
      const [username, password] = splitted[0].split(':');
      const [host, port] = splitted[1].split(':');

      parsed = {
        remoteProxyUsername: username,
        remoteProxyPassword: password,
        remoteProxyHost: host,
        remoteProxyPort: port,
      };
    } else {
      throw new Error('Invalid proxy format');
    }

    return parsed;
  }
  /**
   * Function that takes an object with specific properties.
   *
   * @param {{
   *  remoteProxyUsername: string,
   *  remoteProxyPassword: string,
   *  remoteProxyHost: string,
   *  remoteProxyPort: string }} proxyObj
   */
  static constructProxyString(proxyObject) {
    const p = proxyObject;

    const proxyString =
      (p.remoteProxyUsername ?? '') +
      (p.remoteProxyUsername ? ':' : '') +
      (p.remoteProxyPassword ?? '') +
      (p.remoteProxyUsername && p.remoteProxyPassword ? '@' : '') +
      (p.remoteProxyHost ?? '') +
      (p.remoteProxyHost ? ':' : '') +
      (p.remoteProxyPort ?? '');

    return proxyString;
  }
}

module.exports = {
  RemoteProxy,
};
