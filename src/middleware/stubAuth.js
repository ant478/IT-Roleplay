const asyncHandler = require('express-async-handler');
const models = require('../models');

module.exports = asyncHandler(async (req, res, next) => {
  if (process.env.NODE_ENV === 'production' || !req.headers['stub-auth-user-id']) {
    return next();
  }

  const userId = Number(req.headers['stub-auth-user-id']);

  req.user = await models.User.findByPk(userId);

  return next();
});
