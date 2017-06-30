import mosca from 'mosca'
import {dummyMessage} from '../contants'

class MqttService {
  constructor(expressServer) {
    this.dbHost = process.env.DB_HOST
    this.dbPort = process.env.DB_PORT
    this.dbName = process.env.DB_NAME
    this.server = expressServer
    this.fixedMessages = []

    this.settings = {
      backend: {
        type: 'mongo',
        url: `mongodb://${this.dbHost}:${this.dbPort}/${this.dbName}`,
        pubsubCollection: 'ascoltatori',
        mongo: {}
      }
    }

    this.readyHandler = this.readyHandler.bind(this)
  }

  start() {
    this.mqtt = new mosca.Server(this.settings)

    this.mqtt.attachHttpServer(this.server, '')

    this.mqtt.on('clientConnected', (client) => {
      console.log('client connected', client.id)
    })

    this.mqtt.on('published', function (packet, client) {
      console.log('Published', packet.payload)
    })

    this.mqtt.on('ready', this.readyHandler)
  }

  readyHandler() {
    // 解决mosca高CPU占用问题
    this.mqtt.publish(dummyMessage)
    console.info('Chatting server is up and running.')
  }
}

export default MqttService