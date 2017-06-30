import {Schema} from 'mongoose'

const BlogSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId
  },
  title: {
    type: String
  },
  content: {
    type: String
  },
  reply: {
    type: Schema.Types.ObjectId,
    refs: 'BlogReplies'
  }
}, {timestamps: true})

module.exports = BlogSchema
