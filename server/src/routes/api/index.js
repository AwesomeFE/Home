import express from 'express'

const router = express.Router()

router.use('/sms', require('./sms'))
router.use('/user', require('./user'))
router.use('/blog', require('./blog'))
router.use('/file', require('./file'))
router.use('/captcha', require('./captcha'))

//router.use('/staff', require('./staff'))

module.exports = router
