import {Schema} from 'mongoose'

const RelationshipSchema = new Schema({
  records: [{
    from: {
      collection: {
        type: String
      },
      id: {
        type: Schema.Types.ObjectId
      }
    },
    to: {
      collection: {
        type: String
      },
      id: {
        type: Schema.Types.ObjectId
      }
    }
  }],
  type: {
    type: String
  },
  isTest: {
    type: Boolean,
  }
})

export default RelationshipSchema