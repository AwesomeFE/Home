import fs from 'fs'
import path from 'path'
import * as FileController from '../../../controllers/File'

export async function getFile(req, res, next) {
  const fileId = req.params['fileId']

  const fileInfo = await FileController.getFile(fileId)

  res.setHeader('Content-Type', fileInfo.mimetype)
  fs.createReadStream(path.join(__dirname, '../../../../../', fileInfo.destination, fileInfo.filename)).pipe(res)
}