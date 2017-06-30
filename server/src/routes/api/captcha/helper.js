exports.shouldCheckCaptcha = (session) => {
  if(_isUpToMaxFailedDuration(session.loginFailedAt)) {
    session.loginFailedTimes = 0
  }

  return _isUpToMaxFailedTimes(session.loginFailedTimes)
}

exports.cleanVerifyCaptchaSession = (req) => {
  req.session.captcha = ''
  req.session.isCaptchaVerifyPass = false
}

exports.isPassVerify = (verifyData, session) => {
  if(session.captcha) {
    return verifyData['captcha'].toLowerCase() === session.captcha.toLowerCase()
  } else {
    return false
  }
}

function _isUpToMaxFailedTimes(loginFailedTimes) {
  return loginFailedTimes >= +process.env.WEB_LOGIN_FAILED_MAX_TIMES
}

function _isUpToMaxFailedDuration(loginFailedAt) {
  return Date.now() - loginFailedAt > +process.env.WEB_LOGIN_FAILED_MAX_DURATION
}