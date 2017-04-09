const request = require('request-promise');

module.exports = function authentication({
  error,
  requestValidadeTokenOptions = { method: 'GET', json: true, uri: 'http://my-token-info-url/token' },
} = {}) {
  return function authenticationMiddleware(req, res, next) {
    if (!req.header('authorization')) {
      return res.send(401, error);
    }
    const token = req.header('authorization').split('Bearer')[1];
    const params = requestValidadeTokenOptions.params || {};
    params.token = token;
    return request(requestValidadeTokenOptions)
      .then((tokenInfo) => {
        req.token = tokenInfo; // eslint-disable-line
        return next();
      })
      .catch(err => res.send(err));
  };
};
