const {Files} = require('../models')

function findFileById(id) {
  return Files.findById(id)
}

function saveFile(fileInfo) {
  const fileModel = new Files(fileInfo)
  return fileModel.save()
}

exports.saveFile = saveFile
exports.findFileById = findFileById