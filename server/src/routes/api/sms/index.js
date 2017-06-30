import express from 'express'
import validator from './validator'
import * as handler from './handler'

const router = express.Router()

router.get('/', handler.sendVerifySMS)
router.get('/verify', handler.verifySMSCode)

module.exports = router