import multer from 'multer'
import express from 'express'
import UserController from '../../../controllers/User'
import ErrorService from '../../../services/ErrorService'
import ResponseService from '../../../services/ResponseService'
import {
  isMobileRegister,
  isSmsVerifyFailed,
  isCaptchaVerifyFailed,
  shouldCheckCaptcha,
  cleanAllSession,
  cleanLoginSession,
  cleanRegisterSession,
  setUserSession,
  setLoginFailedSession,
} from './helper'

const router = express.Router()
const upload = multer({dest: 'uploads/users/'})

async function register(req, res, next) {
  const session = req.session
  const userData = req.body

  try {
    if (isMobileRegister(userData) && isSmsVerifyFailed(session)) {
      throw ErrorService.SMS_VERIFY_ERROR
    }

    if (isCaptchaVerifyFailed(session)) {
      throw ErrorService.CAPTCHA_VERIFY_FAILED
    }

    const userInfo = await UserController.createUser(userData)
    cleanRegisterSession(req)

    setUserSession(req, userInfo)
    res.json(userInfo)
  } catch (error) {
    next(error)
  }
}


async function login(req, res, next) {
  const session = req.session
  const loginData = req.body

  try {
    if (shouldCheckCaptcha(session) && isCaptchaVerifyFailed(session)) {
      throw ErrorService.CAPTCHA_VERIFY_FAILED
    }

    const entryLog = {ip: req.ip}
    const userInfo = await UserController.login(loginData, entryLog)

    cleanLoginSession(req)
    setUserSession(req, userInfo)
    res.json(userInfo)

  } catch (error) {
    setLoginFailedSession(req)
    next(error)
  }
}

function logout(req, res) {
  cleanAllSession(req)
  res.json(ResponseService.ACCOUNT_LOGOUT_SUCCESSS)
}

function getSessionUser(req, res) {
  res.json(req.session.user)
}

router.get('/', getSessionUser)
router.get('/logout', logout)
//router.get('/:accountId', getUserById)

router.post('/login', login)
router.post('/register', register)
//router.post('/:accountId', upload.single('avatar'), editAccountById)

module.exports = router
