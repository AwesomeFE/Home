import * as utils from './utils';
import validate from './validate';

import * as Messages from '../../../../constants/messages';
import CaptchaService from '../../../../services/Captcha';

async function generate(req, res, next) {
  try {
    validate(req);

    const { width, height, offset, quality, fontsize } = req.query;
    const [captchaText, captchaImage] = new CaptchaService({ width, height, offset, quality, fontsize }).get();

    utils.cleanSession(req);
    utils.setSession(req, captchaText);

    res.json({
      ...Messages.SHOULD_CAPTCHA_VERIFY,
      data: captchaImage.toString('base64')
    });
  } catch(message) {
    next(message);
  }
}

export default generate;