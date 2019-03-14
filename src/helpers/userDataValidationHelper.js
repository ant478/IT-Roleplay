const _ = require('lodash');
const emailValidator = require('email-validator');

module.exports.isLoginValid = function isLoginValid(login) {
  return _.isString(login) && login.length > 3;
};

module.exports.isEmailValid = function isEmailValid(email) {
  return _.isString(email) && emailValidator.validate(email);
};

module.exports.isPasswordValid = function isPasswordValid(password) {
  return _.isString(password) && password.length > 5;
};
