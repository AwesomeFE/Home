import {Schema} from 'mongoose'

const GeoLocationSchema = new Schema({
  type: {
    type: String,
    default: 'Point'
  },
  coordinates: {
    type: [Number]
  },
  isTest: {
    type: Boolean,
  }
})

export default GeoLocationSchema