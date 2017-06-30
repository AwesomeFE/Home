import Vue from 'vue'
import Component from 'vue-class-component'
import {isMobilePhone, isEmail, isEmpty} from 'validator'

import './style.scss'
import template from './template.html'
import services from '../../services'

@Component({
  template
})
class Signin extends Vue {

  // 输入绑定数据
  credential = null
  password = null
  smsCode = null
  captcha = null

  // 展示数据
  message = null
  captchaImage = ''

  // 静态资源
  static isPass = true
  static isFailed = false
  static isFieldEmpty = value => value === null || value === ''

  /**
   * Vue组件生命周期: mounted
   * 1. 挂在后获取验证码图片
   */
  async mounted() {
    await this.freshCaptchaImage()
  }

  /**
   * 用户登录函数
   * 1. 检查表单填写
   * 2. 有验证码的,检查验证码
   * 3. 用户登录
   */
  async login() {
    try {
      if(!this.checkFields()) {
        throw '请检查表单填写'
      }

      if(this.captchaImage) {
        await this.verifyCaptcha()
        if(!this.checkField('captcha')) {
          return
        }
      }

      const user = await services.user.login(this.passport)
      console.log(user)
    } catch(err) {
      const error = services.errorHandler(err)
      this.message = error.isRemoteError ? error.ErrorID : console.error(err)

      await this.freshCaptchaImage()
    }
  }

  /**
   * 刷新验证码函数
   */
  async freshCaptchaImage() {
    const {captchaImage} = await services.captcha.get(true)

    if(captchaImage) {
      this.captchaImage = `data:image/png;base64,${captchaImage}`
    }
  }

  /**
   * 检查验证码函数
   */
  async verifyCaptcha() {
    try {
      if (!this.checkField('captcha')) return

      const data = await services.captcha.verify(this.captcha)
      console.log(data)
    } catch (err) {
      const error = services.errorHandler(err)
      this.message = error.isRemoteError ? error.ErrorID : console.error(err)
    }
  }

  /**
   * 检查所有必填输入是否正确
   * @returns {Boolean}
   */
  checkFields() {
    return this.checkField('credential') &&
      this.checkField('password')
  }

  /**
   * 检查单个输入项是否正确
   * @param fieldName
   * @returns {boolean}
   */
  checkField(fieldName) {
    if (Signin.isFieldEmpty(this[fieldName])) {
      this[fieldName] = ''
      return Signin.isFailed
    }
    return Signin.isPass
  }

  /**
   * 计算属性: 生成用户登录的passport
   * @returns {{password: *}}
   */
  get passport() {
    let passport = {password: this.password}

    if (!this.credential) {
      return passport

    } else if (isMobilePhone(this.credential, 'zh-CN')) {
      passport.mobile = this.credential

    } else if (isEmail(this.credential)) {
      passport.email = this.credential

    } else {
      passport.username = this.credential
    }

    return passport
  }

  /**
   * 计算属性: 生成输入是否非法
   *
   * @returns
   * {{
   *  credential: {},
   *  password: {},
   *  captcha: {},
   *  smsCode: {}
   * }}
   */
  get $validation() {
    const credential = {}
    const password = {}
    const captcha = {}
    const smsCode = {}

    if(this.credential === '') {
      credential.isInvalid = true
      credential.text = '请输入用户名'

    } else if(this.credential && this.credential.match(/\s+/g)) {
      credential.isInvalid = true
      credential.text = '此处只能包含数字,英文大小写,"@"以及"."符号'
    }

    if(this.password === '') {
      password.isInvalid = true
      password.text = '请输入密码'
    }

    if(this.captcha === '' && true) {
      captcha.isInvalid = true
      captcha.text = '请输入验证码'
    }

    if(this.smsCode === '' && true) {
      smsCode.isInvalid = true
      smsCode.text = '请输入短信验证码'
    }

    return {credential, password, captcha, smsCode}
  }
}

export default Signin
