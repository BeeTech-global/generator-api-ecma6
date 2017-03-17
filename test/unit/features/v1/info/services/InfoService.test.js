const expect = require('expect.js');
const sinon = require('sinon');

const { InfoService } = require('../../../../../../src/features/v1/info/services');

describe('InfoService', function () {
  beforeEach(function () {
    this.infos = [
      { id: '1', info: 'some info' },
    ];
    this.repository = {
      get: () => {},
      getById: () => {},
      post: () => {},
      del: () => {},
    };
    sinon.stub(this.repository, 'get').callsFake((...args) => Promise.resolve(args));
    sinon.stub(this.repository, 'getById').callsFake(id => Promise.resolve(id));
    sinon.stub(this.repository, 'post').callsFake(data => Promise.resolve(data));
    sinon.stub(this.repository, 'del').callsFake(id => Promise.resolve(id));

    this.service = new InfoService(this.repository);
  });

  it('Should call respoitory.get', function () {
    return this.service.get()
      .then(() => expect(this.repository.get.calledOnce).to.eql(true));
  });

  it('Should call respoitory.getById', function () {
    const id = '1';
    return this.service.getById(id)
      .then((result) => {
        expect(this.repository.getById.calledOnce).to.eql(true);
        expect(result).to.eql(id);
      });
  });

  it('Should call respoitory.post', function () {
    const info = {
      id: '2',
      info: 'bla',
    };
    return this.service.post(info)
      .then((result) => {
        expect(this.repository.post.calledOnce).to.eql(true);
        expect(result).to.eql(info);
      });
  });

  it('Should call respoitory.del', function () {
    const id = '1';
    return this.service.del(id)
      .then((result) => {
        expect(this.repository.del.calledOnce).to.eql(true);
        expect(result).to.eql(id);
      });
  });
});
