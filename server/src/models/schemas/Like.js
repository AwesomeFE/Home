import {Schema} from 'mongoose'

const LikeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  }
}, {timestamps: true})

export default LikeSchema
