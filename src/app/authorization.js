module.exports = function authorization({ domain, subdomain, method, url, grants }) {
  return function authorizationMiddleware(req, res, next) {
    const { url: reqUrl, method: reqMethod } = req;
    let responseFunc = () => {
      res.status(403);
      return res.end();
    };
    grants.forEach((grant) => {
      let hasAccess = true;
      if (!grant || !grant.domain) {
        hasAccess = false;
      }
      if (domain && grant.domain !== domain) {
        hasAccess = false;
      }
      if (subdomain && grant.subdomain !== subdomain) {
        hasAccess = false;
      }
      if (method && reqMethod !== method) {
        hasAccess = false;
      }
      if (url && reqUrl !== url) {
        hasAccess = false;
      }
      if (hasAccess) {
        responseFunc = next;
      }
    });
    return responseFunc();
  };
};
