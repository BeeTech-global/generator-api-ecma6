const restify = require('restify');
const packageJson = require('../../package.json');
const routes = require('../router');
const security = require('./security');
const authorization = require('./authorization');
const requestId = require('./request-id');
const logRequests = require('./logger');
const { logger } = require('../util');

const requestIdHeaderName = 'x-request-id';

const server = restify.createServer({
  name: packageJson.name,
  version: packageJson.version,
});

server.pre(restify.pre.sanitizePath());
server.pre(security());
server.pre(authorization());
server.pre(requestId({ headerName: requestIdHeaderName }));
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.on('after', logRequests(logger));

server.on('uncaughtException', (req, res, route, err) => {
  logger.fatal({ req, res, err });

  const customError = { message: 'Internal server error' };

  customError[requestIdHeaderName] = req.headers[requestIdHeaderName];

  res.statusCode = 500; // eslint-disable-line no-param-reassign

  res.send(customError);
});

routes.loadIn(server);

exports.server = server;
