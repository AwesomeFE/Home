import * as utils from './utils';
import validate from './validate';

import * as Messages from '../../../../constants/messages';
import CaptchaService from '../../../../services/Captcha';

async function verify(req, res, next) {
  try {
    validate(req);

    const sCaptcha = req.session.captcha;
    const captcha = req.body.captcha;

    if(captcha.toUpperCase() !== sCaptcha.toUpperCase()) {
      req.session.isCaptchaVerifyPass = false;
      throw Messages.CAPTCHA_VERIFY_FAILED;
    }

    req.session.isCaptchaVerifyPass = true;
    res.json(Messages.REQUEST_SUSSESS);

  } catch(message) {
    next(message);
  }
}

export default verify;