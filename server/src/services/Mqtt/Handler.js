import log4js from 'log4js';
import { dummyMessage } from './settings';
const GrobalTracer = log4js.getLogger('system');

class Handler {
  readyHandler() {
    this.mqtt.publish(dummyMessage);
    // GrobalTracer.info('Chatting server is up and running.');
  }

  connectHandler(client) {
    // GrobalTracer.info('client connected', client.id);
  }

  publishedHandler(packet, client) {
    // GrobalTracer.info('Published', packet.payload);
  }
}

export default Handler;