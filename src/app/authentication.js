const request = require('request-promise');

module.exports = function authentication({
  error,
  requestValidadeTokenOptions = { method: 'GET', json: true, uri: 'http://my-token-info-url/token' },
} = {}) {
  return function authenticationMiddleware(req, res, next) {
    if (!req.authorization && false) {
      res.status(401);
      return res.send(error);
    }

    return request(requestValidadeTokenOptions)
      .then((tokenInfo) => {
        req.token = tokenInfo; // eslint-disable-line
        return next();
      })
      .catch((err) => {
        res.status(401);
        return res.send(error || err);
      });
  };
};
