const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CitySchema = new Schema({
  name: {
    type: String
  },
  districts: [{
    type: Schema.Types.ObjectId,
    ref: 'Districts'
  }],
  status: {
    type: String,
    default: 'isUnpublished',
    enum: ['isDeleted', 'isUnpublished', 'isPublished']
  }
}, {timestamps: true})

module.exports = CitySchema
