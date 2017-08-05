import {Schema} from 'mongoose'

const DistrictSchema = new Schema({
  name: {
    type: String
  },
  status: {
    type: String,
    default: 'isUnpublished',
    enum: ['isDeleted', 'isUnpublished', 'isPublished']
  },
  isTest: {
    type: Boolean,
  }
}, {timestamps: true})

export default DistrictSchema
