const EventEmitter = require('events');
const Promise = require('bluebird');

module.exports = class BaseService extends EventEmitter {
  constructor() {
    super();

    this.Promise = Promise;
  }
};
