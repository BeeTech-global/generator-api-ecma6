const expect = require('expect.js');
const { InfoMemoryRepository } = require('../../../../../../src/domains/v1/domain/subdomain/repositories');

describe('InfoMemoryRepository', function () {
  beforeEach(function () {
    this.infos = [
      { id: '1', info: 'some info' },
    ];
    this.repository = new InfoMemoryRepository(this.infos);
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
});
