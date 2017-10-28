import mosca from 'mosca';
import Handler from './Handler';
import { settings } from './settings';

class MqttService extends Handler {

  constructor(httpServer) {
    super();
    this.httpServer = httpServer;
    this.readyHandler = this.readyHandler.bind(this);
    this.connectHandler = this.connectHandler.bind(this);
    this.publishedHandler = this.publishedHandler.bind(this);
  }

  start() {
    this.mqtt = new mosca.Server(settings);

    this.mqtt.attachHttpServer(this.httpServer);

    this.mqtt.on('clientConnected', this.connectHandler);
    this.mqtt.on('published', this.publishedHandler);
    this.mqtt.on('ready', this.readyHandler);
  }
}

export default MqttService;