import * as UserController from '../../../controllers/User'
import ErrorService from '../../../services/ErrorService'
import ResponseService from '../../../services/ResponseService'
import {DATABASE_ERROR} from '../../../contants'
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
    // 如果是手机注册用户，如果验证码验证失败，报错
    if (isMobileRegister(userData) && isSmsVerifyFailed(session)) {
      throw ErrorService.SMS_VERIFY_ERROR
    }

    // 如果图形验证码验证失败，报错
    if (isCaptchaVerifyFailed(session)) {
      throw ErrorService.CAPTCHA_VERIFY_FAILED
    }

    // 通过验证则创建用户，清除注册时的session数据
    const userInfo = await UserController.createUser(userData)
    cleanRegisterSession(req)

    // 设置创建完成的用户session，并且将用户数据发给前端
    setUserSession(req, userInfo)
    res.json(userInfo)

  } catch (error) {

    // 如果用户存在，报错
    if(error.code === DATABASE_ERROR.DUPLICATE_DATA) {
      next(ErrorService.USER_IS_EXISTED)
    } else {
      // 非法报错
      next(error)
    }
  }
}

export async function login(req, res, next) {
  const session = req.session
  const loginData = req.body

  try {
    // 如果三次登陆失败，则需要检查图形验证码；如果验证码检测失败，报错
    if (shouldCheckCaptcha(session) && isCaptchaVerifyFailed(session)) {
      throw ErrorService.CAPTCHA_VERIFY_FAILED
    }

    // 记录登陆IP数据，用户登录并且创建登陆数据
    const entryLog = {ip: req.ip}
    const userInfo = await UserController.login(loginData, entryLog)

    // 登陆成功，清空登陆session，并且设置用户session
    cleanLoginSession(req)
    setUserSession(req, userInfo)

    //将用户信息发送给前端
    res.json(userInfo)

  } catch (error) {
    // 如果登陆失败，设置登录失败session
    setLoginFailedSession(req)
    next(error)
  }
}

export function logout(req, res) {
  cleanAllSession(req)
  res.json(ResponseService.ACCOUNT_LOGOUT_SUCCESSS)
}

export function getSessionUser(req, res) {
  res.json({
    ...ResponseService.SESSION_USER_SUCCESSS,
    user: req.session.user
  })
}