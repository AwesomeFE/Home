import {Schema} from 'mongoose'

const CountrySchema = new Schema({
  names: [{
    lang: {
      type: String
    },
    title: {
      type: String
    }
  }],
  desc: {
    type: String,
    required: true,
    unique: true
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  provinces: [{
    type: Schema.Types.ObjectId,
    ref: 'Provinces'
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

export default CountrySchema
