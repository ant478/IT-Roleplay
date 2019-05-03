const _ = require('lodash');
const emailValidator = require('email-validator');
const { DATA_PROPERTIES } = require('../models/Character');

module.exports.isLoginValid = function isLoginValid(login) {
  return _.isString(login) && login.length > 1;
};

module.exports.isEmailValid = function isEmailValid(email) {
  return _.isString(email) && emailValidator.validate(email);
};

module.exports.isPasswordValid = function isPasswordValid(password) {
  return _.isString(password) && password.length > 5;
};

module.exports.isCharacterNameValid = function isCharacterNameValid(name) {
  return _.isString(name) && name.length > 1;
};

module.exports.isAvatarValid = function isAvatarValid(avatarId) {
  return _.isString(avatarId) || (avatarId === null);
};

module.exports.isCharacterDataValid = function isCharacterDataValid(data) {
  return !!data && DATA_PROPERTIES.reduce((acc, property) => acc && !!data[property], true);
};

const MIN_LIMIT = 0;
const MAX_LIMIT = 100;

module.exports.isLimitValid = function isLimitValid(limit) {
  return !!limit && !Number.isNaN(limit) && (MIN_LIMIT <= limit) && (limit <= MAX_LIMIT);
};

const MIN_OFFSET = 0;

module.exports.isOffsetValid = function isOffsetValid(offset) {
  return !!offset && !Number.isNaN(offset) && (MIN_OFFSET <= offset);
};
