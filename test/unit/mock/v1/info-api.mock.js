const { infos } = require('./json/info-api.json.js');

module.exports = function load(nock) {
  nock('http://info.com')
    .post('/info', body => body.id !== undefined)
    .times(1)
    .reply(200, (uri, requestBody) => [...infos, requestBody])
    .delete('/info/1')
    .times(1)
    .reply(200, infos.slice(1, 1))
    .get('/info')
    .times(1)
    .reply(200, infos)
    .get('/info/1')
    .times(1)
    .reply(200, infos[0]);
};
