import {Schema} from 'mongoose'

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
    refs: 'Attachments'
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
