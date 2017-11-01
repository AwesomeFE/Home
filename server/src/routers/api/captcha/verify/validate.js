import validator from 'validator';
import * as Messages from '../../../../constants/messages';

function validate(req) {
  const captcha = req.body.captcha;

  if(!captcha) {
    throw Messages.CAPTCHA_IS_EMPTY;
  }
}

export default validate;