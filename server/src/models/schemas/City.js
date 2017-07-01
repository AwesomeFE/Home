import {Schema} from 'mongoose'

const CitySchema = new Schema({
  name: {
    type: String
  },
  districts: [{
    type: Schema.Types.ObjectId,
    ref: 'Districts'
  }],
  status: {
    type: String,
    default: 'isUnpublished',
    enum: ['isDeleted', 'isUnpublished', 'isPublished']
  }
}, {timestamps: true})

export default CitySchema
