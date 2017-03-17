const BaseController = require('../../../../core/BaseController');

module.exports = class InfoController extends BaseController {
  constructor(service) {
    super();
    this.service = service;
  }

  getById(req, res, next) {
    return this.service.getById(req.params.id)
      .then(data => res.send(data))
      .then(next);
  }

  get(req, res, next) {
    return this.service.get()
      .then(data => res.send(data))
      .then(next);
  }

  post(req, res, next) {
    return this.service.post(req.body)
      .then(data => res.send(data))
      .then(next);
  }

  del(req, res, next) {
    return this.service.del(req.params.id)
      .then(data => res.send(data))
      .then(next);
  }
};
