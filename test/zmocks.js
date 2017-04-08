const nock = require('nock');
const expect = require('expect.js');

describe('Mocks', function mocks() {
  it('All expectations should have been met', function mockExpectations() {
    expect(nock.pendingMocks()).to.have.length(0);
    expect(nock.isDone()).to.be(true);
  });
});
