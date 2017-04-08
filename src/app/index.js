const restify = require('restify');
const packageJson = require('../../package.json');
const routes = require('../router');
const security = require('./security');
const authorization = require('./authorization');
const authentication = require('./authentication');
const localization = require('./authentication');
const requestId = require('./request-id');
const logRequests = require('./logger');
const { logger } = require('../util');

const requestIdHeaderName = 'x-request-id';
const supportedLanguages = ['pt-BR', 'en'];

const server = restify.createServer({
  name: packageJson.name,
  version: packageJson.version,
});

server.pre(restify.pre.sanitizePath());
server.pre(security());
server.pre(requestId({ headerName: requestIdHeaderName }));
server.use(localization(supportedLanguages));
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.authorizationParser());
server.use(authentication());
server.use((req, res, next) =>
  authorization({
    domain: 'domain',
    grants: req.token.grants,
  })(req, res, next));

server.on('after', logRequests(logger));

server.on('uncaughtException', (req, res, route, err) => {
  logger.fatal({ req, res, err });

  const customError = { message: 'Internal server error' };

  customError[requestIdHeaderName] = req.headers[requestIdHeaderName];

  res.status(500);

  res.send(customError);
});

routes.loadIn(server);

exports.server = server;
