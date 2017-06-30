const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GeoLocation = require('./GeoLocation')

const AddressSchema = new Schema({
  country: {
    type: Schema.Types.ObjectId,
    ref: 'Countries'
  },
  province: {
    type: Schema.Types.ObjectId,
    ref: 'Provinces'
  },
  city: {
    type: Schema.Types.ObjectId,
    ref: 'Cities'
  },
  district: {
    type: Schema.Types.ObjectId,
    ref: 'Districts'
  },
  detail: {
    type: String
  },
  geoLocation: {
    type: GeoLocation
  },
  default: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    default: 'isUsing',
    enum: ['isUsing', 'isDeleted']
  }
}, {timestamps: true})

AddressSchema.index({geoLocation: '2dsphere'})

module.exports = AddressSchema
