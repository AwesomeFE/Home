export function setSession (req, userId) {
  req.session.userId = userId;
}

export function cleanSession (req) {
  req.session.smsCode = '';
  req.session.captcha = '';
  req.session.loginFailedAt = 0;
  req.session.loginFailedTimes = 0;
  req.session.isSmsVerifyPass = false;
  req.session.isCaptchaVerifyPass = false;
}

export function getRegisterType(formData) {
  return Object.keys(formData)[0];
}