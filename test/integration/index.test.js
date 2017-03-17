const request = require('supertest');
const expect = require('expect.js');
const app = require('../../src/app/index.js');

describe('App', function () {
  beforeEach(function () {
    this.server = app.server;
  });

  afterEach(function () {
    this.server.close();
  });

  it('Should get info collection', function (done) {
    request(this.server)
      .get('/v1/info')
      .expect((res) => {
        expect(res.body).to.be.an(Array);
      })
      .end(done);
  });

  it('Should get info by id', function (done) {
    request(this.server)
      .get('/v1/info/1')
      .expect((res) => {
        expect(res.body).to.be.an(Object);
      })
      .end(done);
  });

  it('Should det info by id', function (done) {
    request(this.server)
      .del('/v1/info/1')
      .expect((res) => {
        expect(res.body).to.be.an(Object);
      })
      .end(done);
  });
});
