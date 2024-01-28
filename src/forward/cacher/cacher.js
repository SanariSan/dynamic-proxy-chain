const pathModule = require('node:path');
const fs = require('node:fs');

const cacheFileCurry = (folderPath, cacheMap, onSuccess) =>
  (cacheFile = (filename) => {
    const filePath = pathModule.resolve(process.cwd(), folderPath, filename);
    const key = pathModule.basename(filePath, '.js');
    try {
      const libPath = require.resolve(filePath);
      delete require.cache[libPath];
    } catch (e) {
      console.error(e);
      return;
    }
    try {
      const file = require(filePath);
      cacheMap.set(key, file);
      onSuccess(filePath);
    } catch (e) {
      console.error(e);
      cacheMap.delete(key);
    }
  });

const cacheFolderCurry = (folderPath, cacheFileFn) =>
  (cacheFolder = () => {
    fs.readdir(pathModule.resolve(process.cwd(), folderPath), (err, files) => {
      if (err) return;
      files.forEach(cacheFileFn);
    });
  });

const watchCurry = (folderPath, cacheFileFn) =>
  (watch = () => {
    fs.watch(pathModule.resolve(process.cwd(), folderPath), (event, file) => {
      cacheFileFn(file);
    });
  });

module.exports = {
  cacheFileCurry,
  cacheFolderCurry,
  watchCurry,
};
