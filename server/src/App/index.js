import path from 'path';
import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';

import Database from './Database';
import routers from '../routers';

import MqttService from '../services/Mqtt';
import ErrorService from '../services/Error';
import LoggerService from '../services/Logger';

class Application extends Database {

  host = process.env.SERVER_HOST;
  port = process.env.SERVER_PORT;
  sessionSecret = process.env.SERVER_SESSION_SECRET;

  app = express();
  httpServer = null;
  httpLogger = new LoggerService().httpLogger();

  constructor() {
    super();
  }

  createServer() {
    this.httpServer = http.createServer(this.app);
  }

  useHttpLogger() {
    this.app.use(this.httpLogger);
  }

  useBodyParser() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: true}));
  }

  useSession() {
    const sessionStore = session({
      secret: this.sessionSecret,
      store: this.getSessionStore(),
      resave: false,
      saveUninitialized: true
    });

    this.app.use(sessionStore);
  }

  useStaticResource() {
    this.app.use('/public', express.static(path.join(__dirname, '../../../client/dist')));
    this.app.use('/public', express.static(path.join(__dirname, '../../../uploads')));
  }

  useViewEngine() {
    this.app.set('views', path.join(__dirname, '../../client/views'));
    this.app.set('view engine', 'ejs');
  }

  initRouter() {
    this.app.use(routers);
  }

  useWebSocketServer() {
    this.mqttService = new MqttService(this.httpServer);
    this.mqttService.start();
  }

  useErrorHandler() {
    this.app.use(ErrorService.handler);
  }

  /**
   * Startup the server
   * @description use 'http' to serve the 'express' and 'mosca'
   */
  run() {
    this.httpServer.listen(this.port, this.host);
  }
}

export default Application;
