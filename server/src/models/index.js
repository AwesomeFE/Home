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
import RelationshipSchema from './schemas/Relationship'
import WebMessageSchema from './schemas/WebMessage'

// 地址定位数据模型
export const Country = mongoose.model('Countries', CountrySchema)
export const Province = mongoose.model('Provinces', ProvinceSchema)
export const City = mongoose.model('Cities', CitySchema)
export const District = mongoose.model('Districts', DistrictSchema)
export const Address = mongoose.model('Addresses', AddressSchema)

// 用户数据模型
export const User = mongoose.model('Users', UserSchema)
export const EntryLog = mongoose.model('EntryLogs', EntryLogSchema)
export const Relationship = mongoose.model('Relationships', RelationshipSchema)

// 博客数据模型
export const Blog = mongoose.model('Blogs', BlogSchema)
export const Comment = mongoose.model('Comments', CommentSchema)

// 网站数据模型
export const File = mongoose.model('Files', FileSchema)
export const WebMessage = mongoose.model('WebMessages', WebMessageSchema)
