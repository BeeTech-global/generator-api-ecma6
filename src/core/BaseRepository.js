const EventEmitter = require('events');
const Promise = require('bluebird');
const knexConf = require('../common/knexConf.js');
const knex = require('knex')(knexConf);


module.exports = class BaseRepository extends EventEmitter {
  constructor(tableName) {
    super();
    this.tableName = tableName;
    this.knex = knex;
    this.Promise = Promise;
  }

  add(model) {
    return new this.Promise((resolve, reject) => {
      this.knex(this.tableName).insert(model).then(
        obj => resolve({id: obj[0]}),
        err => reject(err)
      )
    });
  }

  get() {
    return this.knex.select().from(this.tableName);
  }

  getById(id) {
    return new this.Promise((resolve, reject) => {
      this.knex.select().from(this.tableName).where('id', id).then(
        obj => resolve(obj[0]),
        err => reject(err)
      )
    });
  }

  del(id) {
    return new this.Promise((resolve, reject) => {
      this.knex(this.tableName).where('id', id).del().then(
        obj => resolve(),
        err => reject(err)
      )
    });
  }
};
