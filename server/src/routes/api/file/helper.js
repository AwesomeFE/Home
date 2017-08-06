import fs from 'fs'
import path from 'path'
import {Types} from 'mongoose'
import Canvas, {Image} from 'canvas'

export function isImageFile(fileInfo) {
  return true
}

export function isImageResize({width, height}) {
  return width || height
}

export function getFilePath(fileInfo) {
  return path.join(__dirname, '../../../../../', fileInfo.destination, fileInfo.filename.toString())
}

export function getImageNewSize(image, options) {
  // 原图尺寸
  const originalWidth = image.width
  const originalHeight = image.height

  // 等比缩放参数，默认为true
  const isSizeLock = (options.locked || 'true') === 'true'

  // 防止缩放尺寸大于原图
  let resizeWidth = options.width <= originalWidth
    ? +options.width
    : originalWidth
  let resizeHeight = options.height <= originalHeight
    ? +options.height
    : originalHeight

  let newSize = {}
  let scaleRatio = 1

  // 是否缩放尺寸等比
  if (isSizeLock) {

    // 选择较小的缩放比
    if (resizeWidth / originalWidth < resizeHeight / originalHeight) {
      scaleRatio = resizeWidth / originalWidth
    } else {
      scaleRatio = resizeHeight / originalHeight
    }

    newSize = {
      width: originalWidth * scaleRatio,
      height: originalHeight * scaleRatio
    }

    // 不考虑等比缩放
  } else {
    newSize = {
      width: resizeWidth,
      height: resizeHeight
    }
  }

  return newSize
}

function _readFile(fd, options) {
  return new Promise((resolve, reject) => {
    fs.readFile(fd, options, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

export async function createResizeImage(fileInfo, options) {
  // 从file新建image对象
  const filePath = getFilePath(fileInfo)
  const image = new Image
  image.src = await _readFile(filePath)

  // 获取resize参数
  const {width, height} = getImageNewSize(image, options)

  // 画canvas
  const canvas = new Canvas(width, height)
  const ctx = canvas.getContext('2d')
  ctx.drawImage(image, 0, 0, width, height)

  const thumbnail = _createThumbnailInfo(fileInfo, {width, height})
  fileInfo.thumbnails.push(thumbnail)
  await _saveThumbnailFile(canvas, thumbnail)

  return await fileInfo.save()
}

function _createThumbnailInfo(fileInfo, {width, height}) {
  const filename = new Types.ObjectId
  return {
    width,
    height,
    encoding: fileInfo.encoding,
    mimetype: 'image/jpeg',
    destination: fileInfo.destination,
    filename,
    path: `${fileInfo.destination}/${filename}`
  }
}

function _saveThumbnailFile(canvas, thumbnail) {
  return new Promise((resolve, reject) => {
    try {
      // 创建文件输出流
      const stream = canvas.jpegStream()
      const filePath = getFilePath(thumbnail)
      const thumbnailOutput = fs.createWriteStream(filePath)

      // 保存文件
      stream.on('data', chunk => thumbnailOutput.write(chunk))
      stream.on('end', () => resolve())

    } catch (error) {
      reject(error)
    }
  })
}

export function getResizeImage(fileInfo, options) {
  try {
    const isSizeLock = (options.locked || 'true') === 'true'
    const isOutImageSize = +options.height > fileInfo.height || +options.width > fileInfo.width

    let suitableThumbnail = null

    for(const thumbnail of fileInfo.thumbnails || []) {
      if(!isSizeLock && thumbnail.width === +options.width && thumbnail.height === +options.height) {
        suitableThumbnail = thumbnail

      } else if(isSizeLock) {
        // 如果截图尺寸超出原图尺寸，选择最大的截图
        if(isOutImageSize && (thumbnail.width < +options.width || thumbnail.height < +options.height)) {
          if(!suitableThumbnail) {
            suitableThumbnail = thumbnail
          } else if(suitableThumbnail.width < thumbnail.width && suitableThumbnail.height < thumbnail.height) {
            suitableThumbnail = thumbnail
          }
        }

        // 如果截图尺寸在原图尺寸范围内，选择最小的截图
        if(!isOutImageSize && (thumbnail.width >= +options.width || thumbnail.height >= +options.height)) {
          if(!suitableThumbnail) {
            suitableThumbnail = thumbnail
          } else if(suitableThumbnail.width > thumbnail.width || suitableThumbnail.height > thumbnail.height) {
            suitableThumbnail = thumbnail
          }
        }
      }
    }

    return suitableThumbnail

  } catch (e) {

    console.log(e)

    return {bigThumbnail: null, smallThumbnail: null}
  }
}