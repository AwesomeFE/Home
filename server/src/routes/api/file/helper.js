import fs from 'fs'
import path from 'path'

export function isImageFile(fileInfo) {
  return true
}

export function isImageResize({width, height}) {
  return width || height
}

export function getFilePath(fileInfo) {
  return path.join(__dirname, '../../../../../', fileInfo.destination, fileInfo.filename)
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

export function readFile(fd, options) {
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