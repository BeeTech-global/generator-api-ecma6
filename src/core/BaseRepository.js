const EventEmitter = require('events');
const Promise = require('bluebird');

module.exports = class BaseRepository extends EventEmitter {
  constructor() {
    super();

    this.Promise = Promise;

    this.defer = () => {
      const deferred = {};
      function resolver(resolve, reject) {
        deferred.resolve = resolve;
        deferred.reject = reject;
      }
      deferred.promise = new Promise(resolver);
      return deferred;
    };
  }
};
