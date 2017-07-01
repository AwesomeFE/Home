export function isMobileRegister(userInfo) {
  return !!userInfo.mobile
}

export function isSmsVerifyFailed(session) {
  return !session.isSmsVerifyPass
}

export function isCaptchaVerifyFailed(session) {
  return !session.isCaptchaVerifyPass
}

export function shouldCheckCaptcha(session) {
  if(_isUpToMaxFailedDuration(session.loginFailedAt)) {
    session.loginFailedTimes = 0
  }

  return _isUpToMaxFailedTimes(session.loginFailedTimes)
}

export function cleanRegisterSession(req) {
  req.session.smsCode = ''
  req.session.captcha = ''
  req.session.isSmsVerifyPass = false
  req.session.isCaptchaVerifyPass = false
}

export function cleanLoginSession(req) {
  req.session.captcha = ''
  req.session.loginFailedAt = 0
  req.session.loginFailedTimes = 0
  req.session.isCaptchaVerifyPass = false
}

export function setUserSession(req, user) {
  req.session.user = user
}

export function setLoginFailedSession(req) {
  req.session.loginFailedTimes++
  req.session.loginFailedAt = Date.now()
}

export function cleanAllSession(req) {
  Object.keys(req.session).filter(key => key !== 'cookie').forEach(key => delete req.session[key])
}

function _isUpToMaxFailedTimes(loginFailedTimes) {
  return loginFailedTimes >= +process.env.WEB_LOGIN_FAILED_MAX_TIMES
}

function _isUpToMaxFailedDuration(loginFailedAt) {
  return Date.now() - loginFailedAt > +process.env.WEB_LOGIN_FAILED_MAX_DURATION
}