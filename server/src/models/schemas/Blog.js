import {Schema} from 'mongoose'
import File from './File'

const BlogSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    refs: 'Users'
  },
  addressId: {
    type: Schema.Types.ObjectId,
    refs: 'Addresses'
  },
  title: {
    type: String
  },
  content: {
    type: String
  },
  attachments: [{
    type: Schema.Types.ObjectId,
    refs: 'Files'
  }],
  visible: {
    type: String,
    default: 'all',
    enum: ['all', 'friend', 'none']
  },
  isShortBlog: {
    type: Boolean
  }
}, {timestamps: true})

export default BlogSchema
