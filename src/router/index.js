const { Router } = require('restify-router');
const path = require('path');
const fs = require('fs');

exports.loadIn = function loadIn(server) {
  const mainRouter = new Router();
  const normalizedPath = path.join(__dirname, '../modules');

  fs.readdirSync(normalizedPath).forEach((file) => {
    if (file !== 'index.js') {
      const route = new Router();
      const prefix = require(`../modules/${file}`).loadIn(route, Router); // eslint-disable-line global-require, import/no-dynamic-require
      mainRouter.add(`/${prefix || ''}`, route);
    }
  });
  mainRouter.applyRoutes(server);
};
