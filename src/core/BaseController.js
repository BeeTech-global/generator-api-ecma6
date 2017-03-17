const EventEmitter = require('events');
const Promise = require('bluebird');

module.exports = class BaseController extends EventEmitter {
  constructor() {
    super();

    this.Promise = Promise;
  }
};
