import {File} from '../../models'
import ErrorService from '../../services/ErrorService'
import {
  isImageFile,
  readFile,
  getFilePath
} from './helper'
import {Image} from 'canvas'

export async function saveFile(fileInfo) {
  let filesDoc = await File.create(fileInfo)
  let result = []

  for(const fileDoc of filesDoc || []) {
    if(isImageFile(fileDoc)) {
      const filePath = getFilePath(fileDoc)
      const image = new Image
      image.src = await readFile(filePath)
      fileDoc.width = image.width
      fileDoc.height = image.height
    }

    result.push(await fileDoc.save())
  }

  return result
}

export async function getFile(fileId) {
  const fileDoc = await File.findById(fileId)

  if(!fileDoc) {
    throw ErrorService.FILE_NOT_FIND
  }

  return fileDoc
}