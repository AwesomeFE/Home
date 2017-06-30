const ccap = require('ccap')
const casual = require('casual')

class CaptchaService {
  constructor() {
    this.text = ''
    this.width = process.env.SERVER_CAPTCHA_WIDTH
    this.height = process.env.SERVER_CAPTCHA_HEIGTH
    this.offset = process.env.SERVER_CAPTCHA_OFFSET
    this.quality = process.env.SERVER_CAPTCHA_QUALITY
    this.fontsize = process.env.SERVER_CAPTCHA_FONTSIZE
    this.captcha = ccap({
      width: this.width,
      height: this.height,
      offset: this.offset,
      quality: this.quality,
      fontsize: this.fontsize,
      generate: this.generateCaptcha.bind(this)
    })
  }

  generateCaptcha() {
    this.text = casual.populate('{{letter}}{{letter}}{{letter}}{{letter}}')
    return this.text
  }

  get() {
    return this.captcha.get()
  }
}

module.exports = CaptchaService