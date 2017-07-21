import {Schema} from 'mongoose'
import validator from 'validator'

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
  }],
  projection: {
    type: String,
    default: '-addresses -password'
  }
}, {timestamps: true});

export default User;