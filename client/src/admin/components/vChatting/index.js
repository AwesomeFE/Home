import mqtt from 'mqtt'
import template from './template.html'
import Component from 'vue-class-component'

@Component({
  template
})
class vChatting {

  chattingHost = process.env.SERVER_HOST
  chattingPort = process.env.SERVER_PORT

  mounted() {
    this.initMqtt()
  }

  initMqtt() {
    const client = mqtt.connect(`mqtt://${this.chattingHost}:${this.chattingPort}`);
    client.subscribe("mqtt/demo");
    client.on("message", function(topic, payload) {
      alert([topic, payload].join(": "));
    });
    client.publish("mqtt/demo", "hello world!");
  }

}

export default vChatting