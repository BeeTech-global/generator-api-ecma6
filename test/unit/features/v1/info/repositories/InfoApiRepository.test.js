const nock = require('nock');
const expect = require('expect.js');
const { InfoApiRepository } = require('../../../../../../src/features/v1/info/repositories');
const mock = require('../../../../mock/v1/json/info-api.json.js');
require('../../../../mock/v1/info-api.mock')(nock);

describe('InfoApiRepository', function () {
  beforeEach(function () {
    this.infos = mock.infos;
    this.repository = new InfoApiRepository('http://info.com');
  });

  it('Should get all info', function () {
    return this.repository.get()
      .then((infos) => { expect(infos).to.eql(this.infos); });
  });

  it('Should get info by id', function () {
    return this.repository.getById('1')
      .then((info) => { expect(info).to.eql(this.infos[0]); });
  });

  it('Should insert info', function () {
    const info = {
      id: '2',
      info: 'bla',
    };
    const expected = [...this.infos, info];
    return this.repository.post(info)
      .then((infos) => { expect(infos).to.eql(expected); });
  });

  it('Should delete info', function () {
    return this.repository.del('1')
      .then((infos) => { expect(infos).to.have.length(0); });
  });

  it('Should throw exception when not given an url', function () {
    expect(() => new InfoApiRepository()).to.throwException(/Missing baseUrl parameter/);
  });

  describe('Mocks', function mocks() {
    it('All expectations should have been met', function mockExpectations() {
      expect(nock.isDone()).to.be(true);
      expect(nock.pendingMocks()).to.have.length(0);
    });
  });
});
