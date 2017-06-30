const mongoose = require('mongoose')
const validator = require('validator')
const Schema = mongoose.Schema

const StaffSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  mobile: {
    type: String,
    unique: true,
    validate: (value) => validator.isMobilePhone(value, 'zh-CN')
  },
  email: {
    type: String,
    unique: true,
    validate: validator.isEmail
  },
  unionId: {
    type: String
  },
  openId: {
    type: String
  },
  name: {
    type: String,
    default: ''
  },
  avatar: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    default: 'active'
  },
  isOnline: {
    type: Boolean,
    default: false
  },
  lastLoginAt: {
    type: Date
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
}, {timestamps: true})

module.exports = StaffSchema