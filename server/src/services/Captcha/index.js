import ccap from 'ccap';
import casual from 'casual';

class CaptchaService {
  constructor(options) {
    this.text = '';
    this.captcha = ccap({
      width: options.width || 256,
      height: options.height || 60,
      offset: options.offset || 40,
      quality: options.quality || 100,
      fontsize: options.fontsize || 57,
      generate: this._generateCaptcha.bind(this)
    });
  }

  _generateCaptcha() {
    this.text = casual.populate('{{letter}}{{letter}}{{letter}}{{letter}}');
    return this.text;
  }

  get() {
    return this.captcha.get();
  }
}

export default CaptchaService;