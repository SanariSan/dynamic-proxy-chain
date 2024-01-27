const { cacheFolder, watch, apiRoutes } = require('../cacher');

cacheFolder();
watch();

setTimeout(() => {
  console.dir({ apiRoutes });
}, 1000);

const receiveBody = async (req) => {
  const buffers = [];
  for await (const chunk of req) buffers.push(chunk);
  const data = Buffer.concat(buffers).toString();

  console.dir(`X:${data}:X`);

  let result = '';
  try {
    result = JSON.parse(data);
  } catch (e) {
    console.dir(`X:${data}:X`);
    result = data;
    console.dir(`X:${result}:X`);
  }

  return result;
};

const httpError = (res, status, message) => {
  res.statusCode = status;
  res.end(`"${message}"`);
};

function setupApiHttp({ apiServer }) {
  apiServer.on('request', async (req, res) => {
    const url = req.url === '/' ? '/index.html' : req.url;
    const [section, destination] = url.substring(1).split('/');

    if (section === 'index.html') {
      res.statusCode = 200;
      return res.end('<h1>Index</h1>');
    }

    if (section !== 'api') {
      return httpError(res, 404, 'Not found');
    }

    const method = apiRoutes.get(destination);
    const body = await receiveBody(req);

    try {
      const result = await method(body);

      if (!result) {
        return httpError(res, 500, 'Server error');
      }

      res.end(JSON.stringify(result));
    } catch (err) {
      console.dir({ err });
      httpError(res, 500, `Server error: ${err.message}`);
    }
  });
}

module.exports = setupApiHttp;
