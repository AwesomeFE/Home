import log4js from 'log4js';
import mongoose from 'mongoose';
import session from 'express-session';
import connectMongo from 'connect-mongo';
const GrobalTracer = log4js.getLogger('system');

mongoose.Promise = global.Promise;

class Database {
  dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
  };

  getSessionStore() {
    const MongoStore = connectMongo(session);

    return new MongoStore({mongooseConnection: mongoose.connection});
  }

  connectDB() {
    const { host, port, name, username, password } = this.dbConfig;
    const options = {
      user: username,
      pass: password,
      useMongoClient: true,
      promiseLibrary: global.Promise
    };

    if(!options.user) {
      delete options.user;
    }
    if(!options.pass) {
      delete options.pass;
    }

    return mongoose
      .connect(`mongodb://${host}:${port}/${name}`, options)
      .then(() => GrobalTracer.info(`Connect database mongodb://${host}:${port}/${name} successfully!`));
  }
}

export default Database;