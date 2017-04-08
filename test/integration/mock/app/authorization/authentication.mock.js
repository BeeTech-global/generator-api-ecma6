const { tokenInfo } = require('./json/authentication.json.js');

module.exports = function load(nock) {
  nock('http://my-token-info-url')
    .get('/token')
    .times(2)
    .reply(200, tokenInfo);
};
