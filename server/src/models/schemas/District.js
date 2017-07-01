import {Schema} from 'mongoose'

const DistrictSchema = new Schema({
  name: {
    type: String
  },
  status: {
    type: String,
    default: 'isUnpublished',
    enum: ['isDeleted', 'isUnpublished', 'isPublished']
  }
}, {timestamps: true})

export default DistrictSchema
