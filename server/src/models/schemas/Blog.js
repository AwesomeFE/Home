import {Schema} from 'mongoose'

const BlogSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    refs: 'Users'
  },
  title: {
    type: String
  },
  content: {
    type: String
  },
  comments: [{
    type: Schema.Types.ObjectId,
    refs: 'Comments'
  }],
  attachments: [{
    type: Schema.Types.ObjectId,
    refs: 'Attachments'
  }]
}, {timestamps: true})

export default BlogSchema
