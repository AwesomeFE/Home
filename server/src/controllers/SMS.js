import validator from 'validator'

import * as SMSService from '../services/SMSService'
import ErrorService from '../services/ErrorService'
import ResponseService from '../services/ResponseService'

const isMobile = (mobile) => validator.isMobilePhone(mobile, 'zh-CN')

export async function sendMessage(mobile, code) {
  if (!isMobile(mobile)) {
    throw ErrorService.SMS_MOBILE_NUMBER_INVALID
  }
  await SMSService.sendVerifySMS(mobile, code)

  return ResponseService.SMS_SEND_SUCCESS
}

export function verifyCode(req) {
  const {SMSCode} = req.query

  if (req.session.SMSCode === SMSCode || process.env.NODE_ENV === 'development') {
    req.session.isVerifyPass = true
    return ResponseService.SMS_VERIFY_SUCCESS
  } else {
    throw ErrorService.SMS_VERIFY_FAILED
  }
}