import express from 'express'
import * as middleware from './middleware'

const router = express.Router()

router.use(middleware.setDefaultSession)

router.use('/sms', require('./sms'))
router.use('/user', require('./user'))
router.use('/captcha', require('./captcha'))
router.use('/blog', require('./blog'))

//router.use('/staff', require('./staff'))
//router.use('/files', require('./files'))

module.exports = router
