import path from 'path'
import http from 'http'
import express from 'express'
import bodyParser from 'body-parser'
import session from 'express-session'
import connectMongo from 'connect-mongo'

import WebRoutes from './routes/web'
import ApiRoutes from './routes/api'
import * as middleware from './routes/middleware'

import MqttService from './services/MqttService'
import ErrorService from './services/ErrorService'
import LoggerService from './services/LoggerService'
import DatabaseService from './services/DatabaseService'

class App {
  constructor() {
    this.SERVER_PORT = process.env.SERVER_PORT
    this.SERVER_HOST = process.env.SERVER_HOST
    this.SERVER_SESSION_SECRET = process.env.SERVER_SESSION_SECRET

    this.logger = {}
    this.server = {}
    this.httpServer = {}
    this.mqttService = {}
    this.sessionStore = {}

    this.createServerInstance()
    this.initSystemLogger()
    this.useBodyParser()
    this.useSession()
    this.useStaticResource()
    this.useViewEngine()
    this.initRouter()
    this.useWebSocketServer()
    this.useErrorHandler()
  }

  initSystemLogger() {
    this.logger = new LoggerService()
    this.server.use(this.logger)
  }

  createServerInstance() {
    this.server = express()
    this.httpServer = http.createServer()
  }

  useBodyParser() {
    this.server.use(bodyParser.json())
    this.server.use(bodyParser.urlencoded({extended: true}))
  }

  useSession() {
    const MongoStore = connectMongo(session)
    this.sessionStore = session({
      secret: this.SERVER_SESSION_SECRET,
      store: new MongoStore({mongooseConnection: DatabaseService.connection}),
      resave: false, // 平行的请求, session store会竞争
      saveUninitialized: true
    })
    this.server.use(this.sessionStore)
  }

  useStaticResource() {
    this.server.use('/public', express.static(path.join(__dirname, '../../client/dist')))
    this.server.use('/public', express.static(path.join(__dirname, '../../uploads')))
  }

  useViewEngine() {
    this.server.set('views', path.join(__dirname, '../../client/views'))
    this.server.set('view engine', 'ejs')
  }

  initRouter() {
    this.server.use(middleware.setDefaultSession)
    this.server.use('/api', ApiRoutes)
    this.server.use('/', WebRoutes)
  }

  useWebSocketServer() {
    this.mqttService = new MqttService(this.httpServer)
    this.mqttService.start()
  }

  useErrorHandler() {
    this.server.use(ErrorService.handler)
  }

  async connectDatabase() {
    await DatabaseService.connect()
  }

  run() {
    // 用node http模块 来伺服express和mosca
    this.httpServer
      .on('request', this.server)
      .listen(this.SERVER_PORT, this.SERVER_HOST)
  }
}

export default App
