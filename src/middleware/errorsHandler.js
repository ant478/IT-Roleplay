module.exports = function errorsHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  const error = {
    code: err.code || 500,
    message: err.message || 'Internal Server Error.',
  };

  if (process.env.NODE_ENV !== 'production') {
    error.stacktrace = (new Error().stack).split(/\n */);
  }

  return res.status(error.code).json(error);
};
