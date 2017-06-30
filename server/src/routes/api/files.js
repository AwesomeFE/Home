const fs = require('fs')
const path = require('path')
const express = require('express')
const router = express.Router()

const {FileController} = require('../../controllers')

router.get('/:fileId', getFile)

async function getFile(req, res, next) {
  try {
    const fileId = req.params['fileId']
    const fileInfo = await FileController.findFileById(fileId)

    res.setHeader('Content-Type', fileInfo.mimetype)
    fs.createReadStream(path.join(__dirname, '../../../../', fileInfo.destination, fileInfo.originalname)).pipe(res)
  } catch(error) {
    next(error)
  }
}

module.exports = router