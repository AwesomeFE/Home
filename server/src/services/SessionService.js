exports.cleanVerifySmsSession = (req) => {
  req.session.smsCode = null
  req.session.isSmsVerifyPass = null
}

exports.shouldCheckCaptcha = (session) => {
  if(_isUpToMaxFailedDuration(session.loginFailedAt)) {
    session.loginFailedTimes = 0
  }

  return _isUpToMaxFailedTimes(session.loginFailedTimes)
}

function _isUpToMaxFailedTimes(loginFailedTimes) {
  return loginFailedTimes >= process.env.WEB_LOGIN_FAILED_MAX_TIMES
}

function _isUpToMaxFailedDuration(loginFailedAt) {
  return Date.now() - loginFailedAt > process.env.WEB_LOGIN_FAILED_MAX_DURATION
}