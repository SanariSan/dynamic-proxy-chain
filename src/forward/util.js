const now = () => Date.now();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const monkeyPatchConsole = ({ disableLogging }) => {
  const log = console.log;
  console.log = function (text, err) {
    if (disableLogging) {
      return;
    }
    const msNow = now();
    const date = new Date(msNow).toISOString().replace(/T/g, ' ').replace(/Z/g, '');

    if (err !== undefined) {
      log(err);
      return;
    }

    log(`[${date}]#[${msNow}] # ${text}`);
  };
};

module.exports = {
  sleep,
  now,
  monkeyPatchConsole,
};
