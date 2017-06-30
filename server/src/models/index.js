import mongoose from 'mongoose'

export const City = mongoose.model('Cities', require('./schemas/City'))
export const User = mongoose.model('Users', require('./schemas/User'))
export const Address = mongoose.model('Addresses', require('./schemas/Address'))
export const Country = mongoose.model('Countries', require('./schemas/Country'))
export const Province = mongoose.model('Provinces', require('./schemas/Province'))
export const District = mongoose.model('Districts', require('./schemas/District'))
export const EntryLog = mongoose.model('EntryLogs', require('./schemas/EntryLog'))
export const WebMessage = mongoose.model('WebMessages', require('./schemas/WebMessage'))
export const Blog = mongoose.model('Blogs', require('./schemas/Blog'))
export const Comment = mongoose.model('Comments', require('./schemas/Comment'))

// module.exports = {
//   Country: mongoose.model('Countries', require('./schemas/Country')),
//   Province: mongoose.model('Provinces', require('./schemas/Province')),
//   City: mongoose.model('Cities', require('./schemas/City')),
//   District: mongoose.model('Districts', require('./schemas/District')),
//   Address: mongoose.model('Addresses', require('./schemas/Address')),
//   EntryLog: mongoose.model('EntryLogs', require('./schemas/EntryLog')),
//   User: mongoose.model('Users', require('./schemas/User')),
//   WebMessage: mongoose.model('WebMessages', require('./schemas/WebMessage')),
//
//   WebSettings: mongoose.model('WebSettings', require('./schemas/WebSetting')),
//   Staff: mongoose.model('Staff', require('./schemas/Staff')),
//   Files: mongoose.model('Files', require('./schemas/File'))
// }