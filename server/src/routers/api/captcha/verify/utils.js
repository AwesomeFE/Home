export function cleanSession(req) {
  req.session.captcha = '';
  req.session.isCaptchaVerifyPass = false;
}

export function setSession(req, captchaText) {
  req.session.captcha = captchaText;
}