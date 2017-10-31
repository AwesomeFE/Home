import * as FileController from '../../../controllers/File'
import {
  getFilePath,
  isImageFile,
  isImageResize,
  getResizeImage,
  createResizeImage
} from './helper'

export async function getFile(req, res, next) {
  try {
    const fileId = req.params['fileId']
    const {width, height, locked} = req.query

    let fileInfo = await FileController.getFile(fileId)
    let filePath = getFilePath(fileInfo)

    // 文件如果为图片，并且有resize
    if(isImageFile(fileInfo) && isImageResize({width, height})) {
      let resizeImageInfo = getResizeImage(fileInfo, {width, height, locked})

      if(!resizeImageInfo) {
        fileInfo = await createResizeImage(fileInfo, {width, height, locked})
        resizeImageInfo = getResizeImage(fileInfo, {width, height, locked})
      }

      filePath = getFilePath(resizeImageInfo)
      fileInfo = resizeImageInfo
    }

    res.setHeader('Content-Type', fileInfo.mimetype)
    res.sendFile(filePath)
  } catch (error) {
    next(error)
  }
}
