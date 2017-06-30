const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GeoLocationSchema = new Schema({
  type: {
    type: String,
    default: 'Point'
  },
  coordinates: {
    type: [Number]
  }
})

module.exports = GeoLocationSchema