const express = require('express');
const apiConfig = require('./config/api').v1;
const routes = require('./routes/routes');

const app = express();

app.use(apiConfig.path, routes.router);
app.use('/', express.static('./frontend/build'));

app.listen(apiConfig.port, () => {
  /* eslint-disable no-console */
  console.log(`Example app listening on port ${apiConfig.port}!`);
  /* eslint-enable no-console */
});
