const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
  }
}, {timestamps: true})

module.exports = WebMessageSchema