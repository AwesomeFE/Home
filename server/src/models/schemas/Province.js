import {Schema} from 'mongoose'

const ProvinceSchema = new Schema({
  name: {
    type: String
  },
  cities: [{
    type: Schema.Types.ObjectId,
    ref: 'Cities'
  }],
  status: {
    type: String,
    default: 'isUnpublished',
    enum: ['isDeleted', 'isUnpublished', 'isPublished']
  },
  isTest: {
    type: Boolean,
  }
}, {timestamps: true})

export default ProvinceSchema
