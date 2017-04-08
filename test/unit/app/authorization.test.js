const request = require('supertest');
const app = require('restify');
const authorization = require('../../../src/app/authorization');

describe('Authorization', function () {
  beforeEach(function () {
    this.domain = 'domain';
    this.subdomain = 'subdomain';
    this.grants = [
      { domain: this.domain, subdomain: this.subdomain }];
    this.server = app.createServer();
  });

  afterEach(function () {
    this.server.close();
  });

  it('Should can access', function (done) {
    const { domain, subdomain, grants } = this;
    const path = '/can';

    this.server.get(path, (req, res, next) =>
      authorization({ domain, subdomain, grants })(req, res, next),
      (req, res) => { res.end(); });

    request(this.server)
      .get(path)
      .expect(200)
      .end(done);
  });

  it('Should cannot access other domain', function (done) {
    const { domain, subdomain } = this;
    const grants = [{ domain: 'unknown' }];
    const path = '/cannot';

    this.server.get(path, (req, res, next) =>
      authorization({ domain, subdomain, grants })(req, res, next),
      (req, res) => { res.end(); });

    request(this.server)
      .get(path)
      .expect(403)
      .end(done);
  });
});
