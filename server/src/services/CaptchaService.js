const ccap = require('ccap')
const casual = require('casual')

class CaptchaService {
  constructor(options) {
    this.text = ''
    this.captcha = ccap({
      width: options.width || 200,
      height: options.height || 70,
      offset: options.offset || 20,
      quality: options.quality || 40,
      fontsize: options.fontsize || 100,
      generate: this._generateCaptcha.bind(this)
    })
  }

  _generateCaptcha() {
    this.text = casual.populate('{{letter}}{{letter}}{{letter}}{{letter}}')
    return this.text
  }

  get() {
    return this.captcha.get()
  }
}

module.exports = CaptchaService