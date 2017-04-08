const dbConf = require('../../database.json');

const config = process.config.NODE_config === 'test' ? 'development' : 'default';
let knexConf = {
  client: dbConf[config].driver,
  connection: {
    filename: dbConf[config].filename,
  },
};

if (dbConf[config].driver === 'pg') {
  knexConf = {
    client: dbConf[config].driver,
    connection: {
      host: dbConf[config].host,
      user: dbConf[config].user,
      password: dbConf[config].password,
      database: dbConf[config].database,
    },
  };
}

module.exports = knexConf;
