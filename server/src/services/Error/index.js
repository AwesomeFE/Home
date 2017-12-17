import log4js from 'log4js';
import uuid from 'node-uuid';
import * as Message from '../../constants/messages';

const SystemLogger = log4js.getLogger('system');

class ErrorService extends Error {

  constructor({status, message, type, code}) {
    super(message);
    this.code = code;
    this.type = type;
    this.status = status;
    this.id = uuid.v4();
    this.message = message;
  }

  static handler(errorMessage, req, res, next) {
    let error = new ErrorService(Message.DUPLICATE_DATA);
    let status = !error.status || error.status >= 500 ? 500 : error.status;

    // resolve mongodb duplicate data create
    if(error.code === 11000) {
      status = 200;
      error = new ErrorService(Message);
    }
    else if(status >= 500) {
      console.error(error);
      SystemLogger.error(error);
    }
    else if(status >= 400) {
      console.warn(error);
      delete error.message;
      
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