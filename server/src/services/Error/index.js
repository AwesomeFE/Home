import uuid from 'node-uuid';

class ErrorService extends Error {

  constructor({status, message, type, code}) {
    super(message);
    this.code = code;
    this.type = type;
    this.status = status;
    this.id = uuid.v4();
  }

  static handler(errorMessage, req, res, next) {
    let error = new ErrorService(errorMessage);
    let status = !error.status || error.status > 600 ? 500 : error.status;

    res.status(status).json({
      message: error.message,
      type: error.type,
      id: error.id,
      status: error.status
    });
  }
}

export default ErrorService;