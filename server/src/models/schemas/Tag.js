import {Schema} from 'mongoose'

const TagSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  }
}, {timestamps: true})

export default TagSchema
