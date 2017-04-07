const EventEmitter = require('events');
const Promise = require('bluebird');

module.exports = class BaseController extends EventEmitter {
  constructor(service) {
    super();
    this.service = service;
    this.Promise = Promise;
  }

  post(req, res, next) {
    return this.service.post(req.body)
      .then(data => res.send(data))
      .then(next);
  }

  get(req, res, next) {
    return this.service.get()
      .then(data => res.send(data))
      .then(next);
  }

  getById(req, res, next) {
    return this.service.getById(req.params.id)
      .then(data => res.send(data))
      .then(next);
  }

  del(req, res, next) {
    return this.service.del(req.params.id)
      .then(data => res.send({data}))
      .then(next);
  }
};
