const request = require('request-promise').defaults({
  json: true,
});
const BaseRepository = require('../../../../../core/BaseRepository.js');
const { throwMissingParameter } = require('../../../../../util');

module.exports = class InfoApiRepository extends BaseRepository {
  constructor(baseUrl) {
    super();

    const { url = throwMissingParameter('baseUrl') } = { url: baseUrl };

    this.baseUrl = url;
  }

  get() {
    return request.get(`${this.baseUrl}/info`);
  }

  getById(id) {
    return request.get(`${this.baseUrl}/info/${id}`);
  }

  post(info) {
    return request.post({ url: `${this.baseUrl}/info`, body: info });
  }

  del(id) {
    return request.del(`${this.baseUrl}/info/${id}`);
  }
};
