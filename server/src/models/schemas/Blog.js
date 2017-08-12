import {Schema} from 'mongoose'
import LikeSchema from './Like'

const BlogSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  },
  addressId: {
    type: Schema.Types.ObjectId,
    ref: 'Addresses'
  },
  title: {
    type: String
  },
  content: {
    type: String
  },
  attachments: [{
    type: Schema.Types.ObjectId,
    ref: 'Files'
  }],
  like: [LikeSchema],
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Tags'
  }],
  linkedBlog: {
    type: Schema.Types.ObjectId,
    ref: 'Blogs'
  },
  visible: {
    type: String,
    default: 'all',
    enum: ['all', 'friend', 'none']
  },
  createBy: {
    type: String
  },
  isTest: {
    type: Boolean,
  }
}, {timestamps: true})

export default BlogSchema
