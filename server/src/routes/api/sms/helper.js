import validator from 'validator'

export function cleanVerifySmsSession(req) {
  req.session.smsCode = null
  req.session.isSmsVerifyPass = null
}

export function isMobile(mobile) {
  return validator.isMobilePhone(mobile, 'zh-CN')
}