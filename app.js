const path = require('path');
const express = require('express');
const apiConfig = require('./config/api').v1;
const routes = require('./src/routes/routes');

const app = express();

app.use(apiConfig.path, routes.router);
app.use(express.static('./frontend/build'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './frontend/build/index.html'));
});

app.listen(apiConfig.port, () => {
  /* eslint-disable no-console */
  console.log(`Example app listening on port ${apiConfig.port}!`);
  /* eslint-enable no-console */
});
