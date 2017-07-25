<template>
  <div>
    <h1>登陆</h1>
    <div>
      <input
        type="text"
        name="credential"
        v-model="formValue.credential"
        placeholder="用户名/邮箱/手机"
        v-validate="getValidate('credential')"
      />
      <span v-show="errors.has('credential')">必填项</span>
    </div>

    <div>
      <input
        type="password"
        name="password"
        placeholder="密码"
        v-model="formValue.password"
        v-validate="getValidate('password')"
      />
      <span v-show="errors.has('password')">必填项</span>
    </div>

    <div v-if="captchaImage">
      <input type="text" placeholder="验证码" v-model="formValue.captcha">
      <div style="width: 100px; height: 50px;">
        <vImage
          :src="captchaImage"
          :clickHandler="freshCaptchaImage">
        </vImage>
      </div>
    </div>

    <button @click="login">递交</button>
  </div>
</template>

<script>
  import {isMobilePhone, isEmail, isEmpty} from 'validator'

  import getValidate from './handler/formValidate'
  import * as SmsService from '../../services/SmsService'
  import * as UserService from '../../services/UserService'
  import * as CaptchaService from '../../services/CaptchaService'

  export default {
    data() {
      return {
        formValue: {
          credential: '',
          password: '',
          captcha: '',
          smsCode: ''
        },
        captchaImage: '',
        captchaOption: {
          width: 100,
          height: 40,
          fontsize: 30,
          offset: 25
        }
      }
    },

    async mounted() {
      if(this.$store.state.user) {
        return this.$router.replace({name: 'Home'})
      }

      await this.freshCaptchaImage()
    },

    computed: {
      passport() {
        const {
          credential,
          password
        } = this.formValue

        let passport = { password }

        if (isMobilePhone(credential, 'zh-CN')) {
          passport.mobile = credential

        } else if (isEmail(credential)) {
          passport.email = credential

        } else {
          passport.username = credential

        }
        return passport
      }
    },

    methods: {
      async login() {
        try {
          await this.$validator.validateAll()

          if(this.errors.errors.length !== 0) return

          if(this.captchaImage) {
            await CaptchaService.verifyCaptcha(this.formValue.captcha)
          }

          await this.$store.dispatch('login', this.passport);

          this.$router.push({name: 'Home'})
        } catch (error) {
          this.freshCaptchaImage()
          console.log(error)
        }
      },

      async freshCaptchaImage() {
        const {captchaImage} = await CaptchaService.getCaptcha({...this.captchaOption, isLogin: true})
        this.captchaImage = captchaImage ? `data:image/png;base64,${captchaImage}` : ''
      },

      getValidate(name) {
        return getValidate(name)
      },

      async getSmsCode() {
        await SmsService.getSmsCode(this.passport.mobile)
      }
    }
  }
</script>

<style type="text/scss" lang="scss">
</style>