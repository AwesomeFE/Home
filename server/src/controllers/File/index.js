import {File} from '../../models'

export async function saveFile(fileInfo) {
  return await File.create(fileInfo)
}

export async function getFile(fileId) {
  return await File.findById(fileId)
}