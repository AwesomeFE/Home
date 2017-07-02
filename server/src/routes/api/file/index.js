import express from 'express'
import * as handler from './handler'

const router = express.Router()

router.get('/:fileId', handler.getFile)

module.exports = router
