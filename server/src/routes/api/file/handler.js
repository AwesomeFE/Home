import fs from 'fs'
import Canvas, {Image} from 'canvas'
import * as FileController from '../../../controllers/File'
import {
  readFile,
  getFilePath,
  isImageFile,
  isImageResize,
  getImageNewSize
} from './helper'

export async function getFile(req, res, next) {
  const fileId = req.params['fileId']
  const {width, height, locked} = req.query

  const fileInfo = await FileController.getFile(fileId)
  const filePath = getFilePath(fileInfo)

  // 文件如果为图片，并且有resize
  if(isImageFile(fileInfo) && isImageResize({width, height})) {

    // 从file新建image对象
    const image = new Image
    image.src = await readFile(filePath)

    // 获取resize参数
    const options = {width, height, locked}
    const size = getImageNewSize(image, options)

    // 画canvas
    const canvas = new Canvas(size.width, size.height)
    const ctx = canvas.getContext('2d')
    ctx.drawImage(image, 0, 0, size.width, size.height)

    // 转成png发送数据
    res.setHeader('Content-Type', 'image/jpeg')
    canvas.pngStream().pipe(res)

    // 如果不是resize图片
  } else {
    res.setHeader('Content-Type', fileInfo.mimetype)
    fs.createReadStream(filePath).pipe(res)
  }
}