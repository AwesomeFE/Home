const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EntryLogSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  loginAt: {
    type: Date,
    default: Date.now()
  },
  ip: {
    type: String,
    required: true
  },
  loginBy: {
    type: String,
    enum: ['username', 'mobile', 'email', 'wechat']
  },
  onlineAt: {
    type: Date
  },
  offlineAt: {
    type: Date
  },
  status: {
    type: String,
    default: 'isActive',
    enum: ['isDeleted', 'isActive']
  }
})

module.exports = EntryLogSchema
