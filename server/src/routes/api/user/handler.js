import * as UserController from '../../../controllers/User'
import ErrorService from '../../../services/ErrorService'
import ResponseService from '../../../services/ResponseService'
import {DATABASE_ERROR} from '../../../constants'
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
      throw ErrorService.SMS_VERIFY_FAILED
    }

    // 如果图形验证码验证失败，报错
    if (isCaptchaVerifyFailed(session)) {
      throw ErrorService.CAPTCHA_VERIFY_FAILED
    }

    // 通过验证则创建用户，清除注册时的session数据
    const user = await UserController.createUser(userData)
    cleanRegisterSession(req)

    // 设置创建完成的用户session，并且将用户数据发给前端
    setUserSession(req, user)
    res.json({
      ...ResponseService.ACCOUNT_REGISTER_SUCCESS,
      user
    })

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
    const user = await UserController.login(loginData, entryLog)

    // 登陆成功，清空登陆session，并且设置用户session
    cleanLoginSession(req)
    setUserSession(req, user)

    //将用户信息发送给前端
    res.json({
      ...ResponseService.ACCOUNT_LOGIN_SUCCESS,
      user
    })

  } catch (error) {
    // 如果登陆失败，设置登录失败session
    setLoginFailedSession(req)
    next(error)
  }
}

export function logout(req, res) {
  cleanAllSession(req)
  res.json(ResponseService.ACCOUNT_LOGOUT_SUCCESS)
}

export function getSessionUser(req, res) {
  res.json({
    ...ResponseService.SESSION_USER_SUCCESS,
    user: req.session.user
  })
}

export async function makeFriend(req, res, next) {
  const userId = req.params['userId']
  const sessionUser = req.session.user || {}

  await UserController.makeRelation(sessionUser._id, userId, 'friend')

  res.json(ResponseService.RELATIONSHIP_SUCCESS)
}

export async function checkFriendStatus(req, res, next) {
  const userId = req.params['userId']
  const sessionUser = req.session.user || {}

  const relationship = await UserController.getRelationshipStatusBetween(sessionUser._id, userId, 'friend')

  res.json({
    ...ResponseService.RELATIONSHIP_SUCCESS,
    relationship
  })
}

export async function getUserDetailById(req, res, next) {
  const userId = req.params['userId']
  const sessionUser = req.session.user || {}

  const user = await UserController.getUserDetailById(userId, sessionUser._id)

  res.json({
    ...ResponseService.SEARCH_SUCCESS,
    user
  })
}

export async function deleteFriend(req, res, next) {

}