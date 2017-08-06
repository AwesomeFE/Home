import {Schema} from 'mongoose'

const FileSchema = new Schema({
  fieldname: {
    type: String
  },
  originalname: {
    type: String
  },
  encoding: {
    type: String
  },
  mimetype: {
    type: String
  },
  destination: {
    type: String
  },
  filename: {
    type: String
  },
  path: {
    type: String
  },
  size: {
    type: Number
  },
  width: {
    type: Number
  },
  height: {
    type: Number
  },
  thumbnails: [{
    width: {
      type: Number
    },
    height: {
      type: Number
    },
    encoding: {
      type: String
    },
    mimetype: {
      type: String
    },
    destination: {
      type: String
    },
    filename: {
      type: String
    },
    path: {
      type: String
    }
  }],
  isTest: {
    type: Boolean,
  }
})

export default FileSchema