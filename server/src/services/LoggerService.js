import morgan from 'morgan'
import log4js from 'log4js'

class LoggerService {
  constructor() {
    this.path = process.env.LOG_PATH

    log4js.configure({
      appenders: [{
        type: 'console'
      }, {
        type: 'dateFile',
        category: ['system', 'console'],
        filename: this.path,
        pattern: '.yyyy-MM-dd.log',
        maxLogSize: 1000000,
        alwaysIncludePattern: true
      }],
      replaceConsole: true
    })

    let morganFormat = ':remote-addr :method :url :status :response-time ms'
    let mroganOptions = {}

    mroganOptions.stream = {
      write(str) {
        console.log(str.trim());
      }
    }

    return morgan(morganFormat, mroganOptions)
  }

}

export default LoggerService