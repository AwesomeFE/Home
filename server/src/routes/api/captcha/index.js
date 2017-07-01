import express from 'express'
import * as handler from './handler'

const router = express.Router()

router.get('/', handler.getCaptcha)
router.post('/', handler.verifyCaptcha)

module.exports = router