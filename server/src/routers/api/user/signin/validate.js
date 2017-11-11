import validator from 'validator';
import * as Messages from '../../../../constants/messages';

const {
  LOGIN_FAILED_EXPIRE,
  LOGIN_FAILED_TIMES
} = process.env;

function validate(req) {
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
    if(!sCaptcha || sCaptcha !== captcha) {
      throw Messages.CAPTCHA_VERIFY_FAILED;
    }
  }
}

export default validate;