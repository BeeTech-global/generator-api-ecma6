const request = require('supertest');
const app = require('../../../src/app/index.js');

describe('App', function () {
  beforeEach(function () {
    this.server = app.server;
    this.server.get('/error', () => { throw new Error('Forced error'); });
  });

  afterEach(function () {
    this.server.close();
  });

  it('Should return 404 for "/"', function (done) {
    request(this.server)
      .get('/')
      .expect(404)
      .end(done);
  });

  it('Should handler error', function (done) {
    request(this.server)
      .get('/error')
      .expect(500)
      .end(done);
  });
});
