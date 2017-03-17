const requireDirectory = require('require-directory');

const util = requireDirectory(module, {
  include: path => /.*\.js$/.test(path),
  rename: name => name.replace(/(-)(\w)/gi, g => g[1].toUpperCase()),
});

module.exports = util;
