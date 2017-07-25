<template>
</template>

<script>
  import mqtt from 'mqtt/dist/mqtt'

  export default {
    data() {
      return {
        chattingHost: process.env.SERVER_HOST,
        chattingPort: process.env.SERVER_PORT,
        client: null
      }
    },

    mounted() {
      this.initMqtt()
    },

    beforeDestroy() {
      this.client.end()
    },

    methods: {
      initMqtt() {
        this.client = mqtt.connect(`mqtt://${this.chattingHost}:${this.chattingPort}`);
        this.client.subscribe("broadcast");
        this.client.on("message", function(topic, payload) {
          console.log([topic, payload].join(": "));
        });
        this.client.publish("broadcast", "hello world!");
      }
    }
  }
</script>

<style type="text/scss" lang="scss">

</style>