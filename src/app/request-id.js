const cuid = require('cuid');

module.exports = function requestId(options) {
  const { headerName = 'x-request-id' } = options;
  return function requestIdMiddleware(req, res, next) {
    const { reqId = cuid() } = { reqId: req.headers[headerName] };
    req.headers[headerName] = reqId; // eslint-disable-line no-param-reassign
    res.setHeader(headerName, reqId);
    return next();
  };
};
