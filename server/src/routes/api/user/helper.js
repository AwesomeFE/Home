exports.isMobileRegister = (userInfo) => {
  return !!userInfo.mobile
}

exports.isSmsVerifyFailed = (session) => {
  return !session.isSmsVerifyPass
}

exports.isCaptchaVerifyFailed = (session) => {
  return !session.isCaptchaVerifyPass
}

exports.shouldCheckCaptcha = (session) => {
  if(_isUpToMaxFailedDuration(session.loginFailedAt)) {
    session.loginFailedTimes = 0
  }

  return _isUpToMaxFailedTimes(session.loginFailedTimes)
}

exports.cleanRegisterSession = (req) => {
  req.session.smsCode = ''
  req.session.captcha = ''
  req.session.isSmsVerifyPass = false
  req.session.isCaptchaVerifyPass = false
}

exports.cleanLoginSession = (req) => {
  req.session.captcha = ''
  req.session.loginFailedAt = 0
  req.session.loginFailedTimes = 0
  req.session.isCaptchaVerifyPass = false
}

exports.setUserSession = (req, user) => {
  req.session.user = user
}

exports.setLoginFailedSession = (req) => {
  req.session.loginFailedTimes++
  req.session.loginFailedAt = Date.now()
}

exports.cleanAllSession = (req) => {
  Object.keys(req.session).forEach(key => delete req.session[key])
}

function _isUpToMaxFailedTimes(loginFailedTimes) {
  return loginFailedTimes >= +process.env.WEB_LOGIN_FAILED_MAX_TIMES
}

function _isUpToMaxFailedDuration(loginFailedAt) {
  return Date.now() - loginFailedAt > +process.env.WEB_LOGIN_FAILED_MAX_DURATION
}