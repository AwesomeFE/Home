import fs from 'fs'
import path from 'path'

export function isImageFile(fileInfo) {
  return true
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

export function getFilePath(fileInfo) {
  return path.join(__dirname, '../../../../', fileInfo.destination, fileInfo.filename.toString())
}