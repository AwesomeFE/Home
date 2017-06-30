const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
  }
}, {timestamps: true})

module.exports = ProvinceSchema
