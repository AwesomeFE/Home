import * as Messages from '../../../constants/messages';

export async function validate(req, res) {
  const {
    LOGIN_FAILED_EXPIRE,
    LOGIN_FAILED_TIMES
  } = process.env;

  const { username, mobile, email, password, captcha } = req.body;
  const isPassportEmpty = !(username || mobile || email);
  const isPasswordEmpty = !password;

  if(isPassportEmpty) {
    throw Messages.UNKNOW_LOGIN_TYPE;
  }

  if(isPasswordEmpty) {
    throw Messages.PASSWORD_EMPTY;
  }

  const {
    userId: sUserId,
    captcha: sCaptcha,
    loginFailedAt: sLoginFailedAt,
    loginFailedTimes: sLoginFailedTimes
  } = req.session;

  if(sUserId) {
    throw Messages.IS_ALREADY_LOGIN;
  }

  if(Date.now() - sLoginFailedAt < LOGIN_FAILED_EXPIRE && sLoginFailedTimes >= LOGIN_FAILED_TIMES) {
    if(!sCaptcha || sCaptcha.toUpperCase() !== captcha.toUpperCase()) {
      throw Messages.CAPTCHA_VERIFY_FAILED;
    }
  }

  delete req.body.captcha;
}

export async function handler(req, res) {
  const ip = req.ip;
  const formData = req.body;
  const loginBy = getLoginType(formData);
}

export function getLoginType(formData) {
  return Object.keys(formData)[0];
}