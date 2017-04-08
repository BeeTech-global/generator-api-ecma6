const settings = require('./settings');
const app = require('./app');
const logger = require('./util/logger');

app.server.listen(settings.port, () => {
  logger.info(`${app.server.name} listening at ${app.server.url}`);
});
