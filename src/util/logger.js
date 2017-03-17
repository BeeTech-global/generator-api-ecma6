const Bunyan = require('bunyan');
const packageJson = require('../../package.json');

const opts = {
  name: `${packageJson.name}-audit-log`,
  streams: [
    {
      stream: process.stdout,
      // type: 'raw',
    },
  ],
};
const logger = Bunyan.createLogger(opts);

module.exports = logger;
