import {Schema} from 'mongoose'

const WebMessageSchema = new Schema({
  topic: {
    type: String
  },
  payload: {
    type: String
  },
  qos: {
    type: Number
  },
  retain: {
    type: Boolean
  },
  isFixed: {
    type: Boolean,
    default: false
  },
  isTest: {
    type: Boolean,
  }
}, {timestamps: true})

export default WebMessageSchema