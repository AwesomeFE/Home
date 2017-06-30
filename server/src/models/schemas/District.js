const mongoose = require('mongoose')
const Schema = mongoose.Schema

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

module.exports = DistrictSchema
