const EventEmitter = require('events');
const Promise = require('bluebird');
const sting = require('@beetech/bee-sting')

module.exports = class BaseService extends EventEmitter {
  constructor(repository, schema) {
    super();
    this.repository = repository;
    this.schema = schema;
    this.Promise = Promise;
    this.sting = sting;
  }

  post(obj) {
    return new this.Promise((resolve, reject) => {
      sting.default.validate(obj, this.schema).then(
        (office) => {
          this.repository.add(office).then(
            res => resolve(res),
            err => reject(err)
          )
        },
        err => reject(err)
      );
    });
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
