const path = require('path');
const fs = require('fs');


exports.loadIn = function loadIn(mainRouter, Router) {
  const normalizedPath = path.join(__dirname);
  fs.readdirSync(normalizedPath).forEach((file) => {
    if (file !== 'index.js') {
      const route = new Router();
      const prefix = require(`./${file}`).loadIn(route); // eslint-disable-line global-require, import/no-dynamic-require
      mainRouter.add(`/${prefix || ''}`, route);
    }
  });
};
