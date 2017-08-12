/**
 * 解决mqtt的mongodb高内存占用问题
 */
export const dummyMessage = {
  topic: 'broadcast',
  payload: 'dummy',
  qos: 0,
  retain: false
}

export const DEFAULT_SESSION = {
  version: '0.0.1',
  smsCode: '',
  captcha: '',
  isSmsVerifyPass: false,
  isCaptchaVerifyPass: false,
  loginFailedTimes: 0,
  loginFailedAt: 0,
  sessionUserId: null
}

export const DATABASE_ERROR = {
  DUPLICATE_DATA: 11000
}

export const WEB_VERSION = '0.0.2'