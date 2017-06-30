import {Schema} from 'mongoose'

const CommentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId
  },
  content: {
    type: String
  },
  reply: {
    type: Schema.Types.ObjectId,
    refs: 'BlogReplies'
  }
}, {timestamps: true})

module.exports = CommentSchema
