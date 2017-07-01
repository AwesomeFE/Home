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

export async function register(req, res, next) {
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

export async function login(req, res, next) {
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

export function logout(req, res) {
  cleanAllSession(req)
  res.json(ResponseService.ACCOUNT_LOGOUT_SUCCESSS)
}

export function getSessionUser(req, res) {
  res.json(req.session.user)
}