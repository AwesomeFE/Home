import {Schema} from 'mongoose'

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
  visible: {
    type: String,
    default: 'all',
    enum: ['all', 'friend', 'none']
  },
  isShortBlog: {
    type: Boolean
  },
  createBy: {
    type: String
  },
  isTest: {
    type: Boolean,
  }
}, {timestamps: true})

export default BlogSchema
