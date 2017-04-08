const request = require('supertest');
const expect = require('expect.js');
const nock = require('nock');
const app = require('../../src/app/index.js');

require('./mock/app/authorization/authentication.mock')(nock);

describe('App', function () {
  this.timeout(10000);
  beforeEach(function () {
    this.server = app.server;
  });

  afterEach(function () {
    this.server.close();
  });

  it('Should get info collection', function (done) {
    request(this.server)
      .get('/v1/domain/info')
      .expect((res) => {
        expect(res.statusCode).to.be.eql(200);
        expect(res.body).to.be.an(Array);
      })
      .end(done);
  });

  it('Should get info by id', function (done) {
    request(this.server)
      .get('/v1/domain/info/1')
      .expect((res) => {
        expect(res.statusCode).to.be.eql(200);
        expect(res.body).to.be.an(Object);
      })
      .end(done);
  });

  it('Should det info by id', function (done) {
    request(this.server)
      .del('/v1/domain/info/1')
      .expect((res) => {
        expect(res.statusCode).to.be.eql(200);
        expect(res.body).to.be.an(Object);
      })
      .end(done);
  });

  describe('subdomain', function () {
    it('Should get info collection', function (done) {
      request(this.server)
        .get('/v1/domain/subdomain/info')
        .expect((res) => {
          expect(res.statusCode).to.be.eql(200);
          expect(res.body).to.be.an(Array);
        })
        .end(done);
    });

    it('Should get info by id', function (done) {
      request(this.server)
        .get('/v1/domain/subdomain/info/1')
        .expect((res) => {
          expect(res.statusCode).to.be.eql(200);
          expect(res.body).to.be.an(Object);
        })
        .end(done);
    });

    it('Should det info by id', function (done) {
      request(this.server)
        .del('/v1/domain/subdomain/info/1')
        .expect((res) => {
          expect(res.statusCode).to.be.eql(200);
          expect(res.body).to.be.an(Object);
        })
        .end(done);
    });
  });
});
