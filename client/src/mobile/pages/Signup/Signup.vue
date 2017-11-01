<template>
  <div class="Signup">
    <top-header>
      <div slot="left">back</div>
      <div slot="middle">注册</div>
    </top-header>
    <h1>注册</h1>
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

    <div v-if="passport.mobile">
      <input
        type="text"
        name="smsCode"
        v-model="formValue.smsCode"
        placeholder="手机验证码"
      />
      <button @click="getSmsCode">获取手机验证码</button>
    </div>

    <div>
      <input type="text" placeholder="验证码" v-model="formValue.captcha">
      <div style="width: 100px; height: 50px;">
        <vImage
          :src="captchaImage"
          :clickHandler="freshCaptchaImage">
        </vImage>
      </div>
    </div>

    <button type="button" @click="register">递交</button>
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
          fontsize: 28,
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
      async register() {
        try {
          await this.$validator.validateAll()

          if(this.errors.items.length !== 0) return

          await SmsService.verifySmsCode(this.formValue.smsCode)
          await CaptchaService.verifyCaptcha(this.formValue.captcha)
          await this.$store.dispatch('register', this.passport)

          this.$router.push({name: 'Home'})
        } catch (error) {
          console.log(error)
        }
      },

      async freshCaptchaImage() {
        const {captchaImage} = await CaptchaService.getCaptcha(this.captchaOption)
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