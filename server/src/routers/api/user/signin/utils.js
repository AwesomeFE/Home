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

export function setFailedSession (req) {
  req.session.loginFailedTimes += 1;
  req.session.loginFailedAt = Date.now();
}

export function getLoginType(formData) {
  return Object.keys(formData)[0];
}