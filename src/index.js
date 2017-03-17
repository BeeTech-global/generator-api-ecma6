const settings = require('./settings');
const app = require('./app');

app.server.listen(settings.port, () => {
  console.log(`${app.server.name} listening at ${app.server.url}`);
});
