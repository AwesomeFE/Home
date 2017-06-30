const mongoose = require('mongoose')
const validator = require('validator')
const Schema = mongoose.Schema
const {Address} = require('./Address')

const User = new Schema({
  username:  {
    type: String,
    unique: true,
    sparse: true
  },
  password: {
    type: String
  },
  mobile: {
    type: String,
    unique: true,
    sparse: true,
    validate: (value) => validator.isMobilePhone(value, 'zh-CN')
  },
  email:   {
    type: String,
    unique: true,
    sparse: true,
    validate: validator.isEmail
  },
  unionId: {
    type: String,
    unique: true,
    sparse: true
  },
  openId: {
    type: String
  },
  name: {
    type: String
  },
  addresses: [{
    type: Schema.Types.ObjectId,
    ref: 'Addresses'
  }]
}, {timestamps: true});

module.exports = User;