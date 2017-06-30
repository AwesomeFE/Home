const multer = require('multer')
const uuid = require('node-uuid')
const ErrorService = require('../services/ErrorService')

class StorageService {
  constructor(folderName, fileController) {
    this.destination = `${process.env.SERVER_STORAGE_FOLDER}/${folderName}`
    this.FileController = fileController
    this.storage = multer.diskStorage({
      destination: (req, file, cb) => cb(null, this.destination),
      filename: this.filename.bind(this),
      fileFilter: this.fileFilter.bind(this)
    })


    this.uploader = multer({storage: this.storage})
  }

  saveFileInfo(fileInfo) {
    return this.FileController.saveFile(fileInfo)
  }

  filename(req, file, cb) {
    file.filename = uuid.v4()
    this.saveFileInfo(file)
      .then(() => cb(null, file.filename))
      .catch(() => cb(ErrorService.FILE_UPLOAD_SAVE_ERROR))
  }

  fileFilter(req, file, cb) {
    switch (file.mimetype) {
      case 'image/jpeg':
        cb(null, true)
        break
      default:
        cb(ErrorService.FILE_UPLOAD_TYPE_ERROR)
    }
  }
}

module.exports = StorageService