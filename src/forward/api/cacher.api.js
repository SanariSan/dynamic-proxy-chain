const path = require('path');

const { cacheFileCurry, cacheFolderCurry, watchCurry } = require('../cacher/index');

const apiRoutes = new Map();

const apiPath = './src/forward/api/controllers';
const cacheApiFile = cacheFileCurry(apiPath, apiRoutes, (filePath) => {
  const route = path.basename(filePath, '.js');
  console.log(`[API] Cached route: /${route}`);
});
const cacheApiFolder = cacheFolderCurry(apiPath, cacheApiFile);
const watchApiFolder = watchCurry(apiPath, cacheApiFile);

module.exports = {
  cacheApiFolder,
  watchApiFolder,
  apiRoutes,
};
