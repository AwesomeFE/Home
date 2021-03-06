import {Schema} from 'mongoose'
import {isMobilePhone, isEmail} from 'validator'
import Address from './Address'
import Projection from './Projection'

const UserSchema = new Schema({
  username:  {
    type: String,
    unique: true,
    sparse: true,
  },
  password: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    unique: true,
    sparse: true
  },
  email:   {
    type: String,
    unique: true,
    sparse: true
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
  nickname: {
    type: String,
    unique: true,
    sparse: true,
    required: function() {
      return this.nickname === ''
    }
  },
  birthday: {
    type: Date
  },
  location: {
    type: Address
  },
  gender: {
    type: String
  },
  emotionState: {
    type: String,
    default: 'single',
    enum: ['single', 'married', 'inLove']
  },
  blogUrl: {
    type: String
  },
  QQ: {
    type: String
  },
  addresses: [{
    type: Schema.Types.ObjectId,
    ref: 'Addresses'
  }],
  projections: {
    type: [Projection]
  },
  avatar: {
    type: Schema.Types.ObjectId,
    refs: 'Files'
  },
  roles: [{
    type: Schema.Types.ObjectId,
    ref: 'Roles'
  }],
  isTest: {
    type: Boolean,
  }
}, {timestamps: true})

export default UserSchema