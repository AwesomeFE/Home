import express from 'express'
import ErrorService from '../../../services/ErrorService'
import CaptchaService from '../../../services/CaptchaService'
import ResponseService from '../../../services/ResponseService'
import {
  isPassVerify,
  shouldCheckCaptcha,
  cleanVerifyCaptchaSession
} from './helper'

const router = express.Router()

router.get('/', getCaptcha)
router.post('/', verifyCaptcha)

function getCaptcha(req, res, next) {
  const session = req.session
  const isLogin = req.query['isLogin']

  try {
    if(isLogin && !shouldCheckCaptcha(session)) {
      return res.json(ResponseService.NO_NEED_CAPTCHA_VERIFY)
    }

    cleanVerifyCaptchaSession(req)

    const captchaService = new CaptchaService()
    const [captchaText, captchaImage] = captchaService.get()

    req.session.captcha = captchaText
    res.json({
      ...ResponseService.SHOULD_CAPTCHA_VERIFY,
      captchaImage: captchaImage.toString('base64')
    })
  } catch (error) {
    next(error)
  }
}

function verifyCaptcha(req, res, next) {
  const session = req.session
  const verifyData = req.body

  try {
    if(isPassVerify(verifyData, session)) {
      req.session.isCaptchaVerifyPass = true
      res.json(ResponseService.CAPTCHA_VERIFY_SUCCESS)

    } else {
      req.session.isCaptchaVerifyPass = false
      next(ErrorService.CAPTCHA_VERIFY_FAILED)
    }
  } catch (error) {
    next(error)
  }
}

module.exports = router