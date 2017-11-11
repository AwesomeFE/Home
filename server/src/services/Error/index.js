import log4js from 'log4js';
import uuid from 'node-uuid';

const SystemLogger = log4js.getLogger('system');

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
    let status = !error.status || error.status >= 500 ? 500 : error.status;

    if(status >= 500) {
      console.error(error);
      SystemLogger.error(error);
    } else if(status >= 400) {
      delete error.message;

      console.warn(error);
      SystemLogger.warn(error);
      status = 200;
    }

    res.status(status).json({
      message: error.message,
      type: error.type,
      id: error.id,
      status: error.status
    });
  }
}

export default ErrorService;