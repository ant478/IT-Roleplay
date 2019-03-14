const Sequelize = require('sequelize');
const config = require('./../../config/db.json')[process.env.NODE_ENV || 'development'];

const { User } = require('./User');
const { Character } = require('./Character');

const defineCalls = [User, Character];
const sequelize = new Sequelize(config.database, config.username, config.password, config);

const models = defineCalls.reduce((acc, defineCall) => {
  const model = defineCall(sequelize, Sequelize);

  acc[model.name] = model;

  return acc;
}, {});

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
    if (models[modelName].loadScopes) {
      models[modelName].loadScopes(models);
    }
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;
module.exports = models;
