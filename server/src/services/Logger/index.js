import morgan from 'morgan';
import log4js from 'log4js';

class LoggerService {
  constructor() {
    log4js.configure({
      appenders: {
        system: this.getLoggerConfig('system'),
        http: this.getLoggerConfig('http'),
        controller: this.getLoggerConfig('controller'),
      },
      categories: {
        default: {
          appenders: [
            'http',
            'system',
            'controller',
          ],
          level: 'debug'
        }
      }
    })
  }

  getLoggerConfig(loggerName) {
    return {
      type: 'dateFile',
      filename: `${process.env.LOG_PATH}/${loggerName}/${loggerName}.log`,
      pattern: '.yyyy-MM-dd',
      daysToKeep: 30,
      keepFileExt: true,
      compress: true
    };
  }

  httpLogger() {
    const httpLogger = log4js.getLogger('http');
    const morganFormat = ':remote-addr :method :url :status :response-time ms';
    const mroganOptions = { stream: { write: str => httpLogger.info(str.trim()) } };

    return morgan(morganFormat, mroganOptions);
  }
}

export default LoggerService