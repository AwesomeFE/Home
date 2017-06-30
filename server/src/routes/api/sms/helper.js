exports.cleanVerifySmsSession = (req) => {
  req.session.smsCode = null
  req.session.isSmsVerifyPass = null
}