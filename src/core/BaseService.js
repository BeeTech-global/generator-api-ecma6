const EventEmitter = require('events');
const Promise = require('bluebird');

module.exports = class BaseService extends EventEmitter {
  constructor(repository) {
    super();
    this.repository = repository;
    this.Promise = Promise;
  }

  post(obj) {
    return this.repository.add(obj);
  }

  get() {
    return this.repository.get();
  }

  getById(id) {
    return this.repository.getById(id);
  }

  del(id) {
    return this.repository.del(id);
  }
};
