const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CountrySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  desc: {
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
  }
}, {timestamps: true})

module.exports = CountrySchema
