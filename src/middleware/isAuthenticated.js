const responses = require('../responses');

module.exports = function isAuthenticated(req, res, next) {
  if (!req.user) {
    return next(new responses.Unauthorized());
  }

  return next();
};
