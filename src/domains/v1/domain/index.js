const subdomain = require('./subdomain');

const mainPrefix = 'domain';

exports.loadIn = function loadIn(mainRouter, Router) {
  const route = new Router();
  const prefix = require('./routes').loadIn(route, Router); // eslint-disable-line global-require, import/no-dynamic-require
  mainRouter.add(`/${prefix || ''}`, route);

  const subdomainRoute = new Router();
  const subdomainPrefix = subdomain.loadIn(subdomainRoute, Router);
  mainRouter.add(`/${subdomainPrefix || ''}`, subdomainRoute);
  return mainPrefix;
};
