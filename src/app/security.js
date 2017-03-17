const helmet = require('helmet');

module.exports = function security(options) {
  return helmet(options);
};
