const BaseRepository = require('../../../../core/BaseRepository.js');
const knexConf = require('../../../../common/knexConf.js');
const knex = require('knex')(knexConf);


module.exports = class InfoMemoryRepository extends BaseRepository {
  constructor(infos) {
    super();

    this.data = infos || [
      { info: 'Some information', id: '1' },
      { info: 'Some information', id: '2' },
    ];
  }

  get() {
    const deferred = this.defer();
    deferred.resolve(this.data);
    return deferred.promise;
  }

  getById(id) {
    const result = this.data.find(i => i.id === id);
    return this.Promise.resolve(result);
  }

  post(info) {
    this.data.push(info);
    return this.Promise.resolve(this.data);
  }

  del(id) {
    this.data = this.data.filter(element => id !== element.id);
    return this.Promise.resolve(this.data);
  }
};
