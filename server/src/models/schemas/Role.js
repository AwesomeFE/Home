import {Schema} from 'mongoose';

const RoleSchema = new Schema({
  names: [{
    lang: {
      type: String
    },
    title: {
      type: String
    }
  }],
  isAdmin: {
    type: Boolean,
    default: false
  },
  auth: [{
    type: String
  }]
}, {timestamps: true});

export default RoleSchema;
