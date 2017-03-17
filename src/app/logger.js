module.exports = (customLogger) => {
  const logger = customLogger;

  return function loggerMiddleware(req, res, route, err) {
    req.logger = logger;  // eslint-disable-line no-param-reassign
    logger.info({ req, res, err });
  };
};
