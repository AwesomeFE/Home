import mongoose from 'mongoose'
import BlogSchema from './schemas/Blog'
import CitySchema from './schemas/City'
import FileSchema from './schemas/File'
import UserSchema from './schemas/User'
import CommentSchema from './schemas/Comment'
import AddressSchema from './schemas/Address'
import CountrySchema from './schemas/Country'
import ProvinceSchema from './schemas/Province'
import DistrictSchema from './schemas/District'
import EntryLogSchema from './schemas/EntryLog'
import WebMessageSchema from './schemas/WebMessage'

export const City = mongoose.model('Cities', CitySchema)
export const User = mongoose.model('Users', UserSchema)
export const Blog = mongoose.model('Blogs', BlogSchema)
export const Comment = mongoose.model('Comments', CommentSchema)
export const Address = mongoose.model('Addresses', AddressSchema)
export const Country = mongoose.model('Countries', CountrySchema)
export const Province = mongoose.model('Provinces', ProvinceSchema)
export const District = mongoose.model('Districts', DistrictSchema)
export const EntryLog = mongoose.model('EntryLogs', EntryLogSchema)
export const File = mongoose.model('Files', FileSchema)
export const WebMessage = mongoose.model('WebMessages', WebMessageSchema)
