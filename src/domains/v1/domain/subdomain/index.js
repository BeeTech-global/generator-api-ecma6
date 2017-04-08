const mainPrefix = 'subdomain';

exports.loadIn = function loadIn(mainRouter, Router) {
  const route = new Router();
  const prefix = require('./routes').loadIn(route, Router); // eslint-disable-line global-require, import/no-dynamic-require
  mainRouter.add(`/${prefix || ''}`, route);

  return mainPrefix;
};
