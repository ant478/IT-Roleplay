require('module-alias/register');

const express = require('express');
const app = express();
const apiConfig = require('config/api').v1;
const routes = require('routes/routes');

app.use(apiConfig.path, routes.router);

app.listen(apiConfig.port, function () {
  console.log(`Example app listening on port ${apiConfig.port}!`);
});
