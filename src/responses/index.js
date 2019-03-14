class ErrorResponse {
  constructor(message) {
    this.code = 500;
    this.message = message || 'Internal Server Error.';

    if (process.env.NODE_ENV !== 'production') {
      this.stacktrace = (new Error().stack).split(/\n */);
    }
  }
}

module.exports.InternalServerError = ErrorResponse;

module.exports.Conflict = class Conflict extends ErrorResponse {
  constructor(message) {
    super(message);

    this.code = 409;
    this.message = message || 'Can\'t create instance with passed data.';
  }
};

module.exports.NotFound = class NotFound extends ErrorResponse {
  constructor(message) {
    super(message);

    this.code = 404;
    this.message = message || 'Not found.';
  }
};

module.exports.Forbidden = class Forbidden extends ErrorResponse {
  constructor(message) {
    super(message);

    this.code = 403;
    this.message = message || 'You do not have permission for this operation.';
  }
};

module.exports.Unauthorized = class Unauthorized extends ErrorResponse {
  constructor(message) {
    super(message);

    this.code = 401;
    this.message = message || 'You are not authorized in the system.';
  }
};

module.exports.BadRequest = class BadRequest extends ErrorResponse {
  constructor(message) {
    super(message);

    this.code = 400;
    this.message = message || 'Passed arguments are not valid.';
  }
};

module.exports.OK = class OK {
  constructor(message) {
    this.code = 200;
    this.message = message || 'OK.';
  }
};
