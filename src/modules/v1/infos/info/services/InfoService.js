const BaseService = require('../../../../../core/BaseService');

module.exports = class InfoService extends BaseService {
  constructor(repository) {
    super();

    this.repository = repository;
  }

  get(...args) {
    return this.repository.get(...args);
  }

  getById(id) {
    return this.repository.getById(id);
  }

  post(info) {
    return this.repository.post(info);
  }

  del(id) {
    return this.repository.del(id);
  }
};
