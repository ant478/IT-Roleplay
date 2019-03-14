const _ = require('lodash');
const Sequelize = require('sequelize');
const models = require('../models');
const USER_PRIVATE_PROPERTIES = require('../models/User').PRIVATE_PROPERTIES;
const responses = require('../responses');
const validationHelper = require('../helpers/userDataValidationHelper');

module.exports.register = async function register(req, res) {
  const { login, email, password } = req.body;

  const isUserInputValid = validationHelper.isLoginValid(login)
    && validationHelper.isEmailValid(email)
    && validationHelper.isPasswordValid(password);

  if (!isUserInputValid) {
    return res.status(400).json(new responses.BadRequest());
  }

  const existingUser = await models.User.findOne({
    where: { [Sequelize.Op.or]: [{ login }, { email }] },
  });

  if (existingUser) {
    return res.status(409).json(new responses.Conflict());
  }

  const newUser = new models.User();

  newUser.set('login', login);
  newUser.set('email', email);
  newUser.setPassword(password);

  const createdUser = await newUser.save();
  const userInstance = await models.User.findByPk(createdUser.id);

  return res.status(201).json(userInstance.toJSON());
};

module.exports.login = async function loginUser(req, res) {
  const { login, password } = req.body;

  const user = await models.User.unscoped().findOne({ where: { login } });

  if (!user || !user.verifyPassword(password)) {
    return res.status(400).json(new responses.BadRequest());
  }

  const json = _.omit(user.toJSON(), USER_PRIVATE_PROPERTIES);

  return res.status(200).json(json);
};

module.exports.logout = function logout(req, res) {
  res.status(200).json({ message: 'OK', code: 200 });
};
