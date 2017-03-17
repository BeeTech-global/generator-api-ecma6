module.exports = function authorization() {
  return function authorizationMiddleware(req, res, next) {
    // implements authorization rules
    return next();
  };
};
