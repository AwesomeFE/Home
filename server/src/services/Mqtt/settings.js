export const settings = {
  backend: {
    type: 'mongo',
    url: `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    pubsubCollection: 'ascoltatori',
    mongo: {}
  }
};

export const dummyMessage = {
  topic: 'broadcast',
  payload: 'dummy',
  qos: 0,
  retain: false
};
