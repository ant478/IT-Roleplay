const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const apiConfig = require('./config/api');
const routes = require('./src/routes/routes');
const errorsHandler = require('./src/middleware/errorsHandler');

const app = express();

app.use(bodyParser.json());
app.use(apiConfig.path, routes.router);
app.use(express.static('./frontend/build'));
app.use(errorsHandler);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './frontend/build/index.html'));
});

app.listen(apiConfig.port, () => {
  /* eslint-disable no-console */
  console.log(`Example app listening on port ${apiConfig.port}!`);
  /* eslint-enable no-console */
});
