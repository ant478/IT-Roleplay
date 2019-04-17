const _ = require('lodash');
const passport = require('passport');
const Sequelize = require('sequelize');
const models = require('../models');
const USER_PRIVATE_PROPERTIES = require('../models/User').PRIVATE_PROPERTIES;
const responses = require('../responses');
const validationHelper = require('../helpers/userInputValidationHelper');

module.exports.isLoggenIn = function isLoggedIn(req, res) {
  if (!req.user) {
    return res.status(401).json(new responses.Unauthorized());
  }

  return res.status(200).json(new responses.OK());
};

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

module.exports.login = function loginUser(req, res, next) {
  const { login, password } = req.body;

  const isUserInputValid = validationHelper.isLoginValid(login)
    && validationHelper.isPasswordValid(password);

  if (!isUserInputValid) {
    return res.status(400).json(new responses.BadRequest());
  }

  return passport.authenticate('local', (error, user, strategyError) => {
    if (error || strategyError) {
      return next(error || strategyError);
    }

    return req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }

      const json = _.omit(user.toJSON(), USER_PRIVATE_PROPERTIES);

      return res.status(200).json(json);
    });
  })(req, res, next);
};

module.exports.logout = function logout(req, res) {
  req.logout();
  return res.status(200).json(new responses.OK());
};
