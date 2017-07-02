import {Schema} from 'mongoose'

const RelationshipSchema = new Schema({
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
  },
  type: {
    type: String
  }
})

export default RelationshipSchema