var db_conf = require('../../database.json');
var env = process.env.NODE_ENV || 'development';
var knex_conf = {
  client: db_conf[env].driver,
  connection: {
    filename: db_conf[env].filename
  }
}

if(db_conf[env].driver == 'pg') {
  knex_conf = {
    client: db_conf[env].driver,
    connection: {
      host : db_conf[env].host,
      user : db_conf[env].user,
      password : db_conf[env].password,
      database : db_conf[env].database
    }
  }
}

module.exports = knex_conf;
