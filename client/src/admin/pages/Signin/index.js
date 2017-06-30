import './style.scss'
import template from './template.html'
import services from '../../services'

import Component from 'vue-class-component'
import {isMobilePhone, isEmail, isEmpty} from 'validator'

@Component({
  template
})
class Signin {

  static isPass = false
  static isFailed = true
  static isFieldEmpty = value => value === null || value === ''

  message = null
  captcha = null
  password = null
  credential = null

  captchaVerifyMessage = null

  async login() {
    try {
      if(this.checkFields() != Signin.isPass) return

      await this.verifyCaptcha()

      const {data:staff} = await services.staff.login(this.passport)

      this.$store.commit('setLoginStaff', staff)
      this.message = null
      this.$router.push('/dashboard')

    } catch (err) {
      const error = services.errorHandler(err)
      this.message = error.isRemoteError ? error.ErrorID : console.error(err)
    }
  }

  async verifyCaptcha() {
    try {
      if(this.checkField('captcha') == Signin.isFailed && !this.isCaptchaPass) return

      const {data} = await services.captcha.verify(this.captcha)
      this.captchaVerifyMessage = data.type
    } catch (err) {
      const error = services.errorHandler(err)
      this.message = error.isRemoteError ? error.ErrorID : console.error(err)
    }
  }

  checkFields() {
    return this.checkField('credential') +
      this.checkField('password') +
      this.checkField('captcha')
  }

  checkField(fieldName) {
    if(Signin.isFieldEmpty(this[fieldName])) {
      this[fieldName] = ''
      return Signin.isFailed
    }
    return Signin.isPass
  }
  
  get isCaptchaPass() {
    return this.captchaVerifyMessage === 'SMS_VERIFY_SUCCESS'
  }

  get passport() {
    let passport = {password: this.password}

    if(!this.credential) {
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

  get $validation() {
    return {
      captchaRequired: this.captcha === '',
      passwordRequired: this.password === '',
      credentialRequired: this.credential === ''
    }
  }
}

export default Signin
