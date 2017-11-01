import validator from 'validator';
import * as Messages from '../../../../constants/messages';

const { LOGIN_FAILED_TIMES } = process.env;

function validate(req) {
  const { isLogin } = req.query;
  const sLoginFailedAt = req.session.loginFailedAt;
  const sLoginFailedTimes = req.session.loginFailedTimes;

  if(isLogin && sLoginFailedTimes < LOGIN_FAILED_TIMES) {
    throw Messages.NO_NEED_CAPTCHA_VERIFY;
  }
}

export default validate;