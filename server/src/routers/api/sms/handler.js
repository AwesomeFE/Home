import casual from 'casual'
import * as helper from './helper'
import * as SMSService from '../../../services/SMSService'
import ErrorService from '../../../services/ErrorService'
import ResponseService from '../../../services/ResponseService'

export async function sendVerifySMS(req, res, next) {
  try {
    const {mobile} = req.query
    const SMSCode = casual.numerify('####')

    // 如果手机号码错误，报错
    if(!helper.isMobile(mobile)) {
      throw ErrorService.SMS_MOBILE_NUMBER_INVALID
    }

    // 向服务发送短信，清空原来的短信session
    await SMSService.sendVerifySMS(mobile, SMSCode)
    helper.cleanVerifySmsSession(req)

    // 重置session中的短信验证码
    req.session.SMSCode = SMSCode
    res.json(ResponseService.SMS_SEND_SUCCESS)

  } catch (error) {
    next(error)
  }
}

export async function verifySMSCode (req, res, next) {
  try {
    const {SMSCode} = req.query

    // 如果短信验证码通过
    if(req.session.SMSCode === SMSCode || process.env.NODE_ENV === 'development') {
      // session中设置通过，并且通知前端
      req.session.isSmsVerifyPass = true
      res.json(ResponseService.SMS_VERIFY_SUCCESS)

    } else {
      // 验证失败，报错
      throw ErrorService.SMS_VERIFY_FAILED
    }
  } catch (error) {
    next(error)
  }
}