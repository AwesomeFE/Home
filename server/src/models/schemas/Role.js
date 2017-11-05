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
  }
}, {timestamps: true});

export default RoleSchema;
