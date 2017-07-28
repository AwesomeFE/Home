<template>
  <div class="Signin">
    <div class="Avatar">
      <img v-if="user" class="Avatar__Image" :src="user.avatar">
      <img v-else class="Avatar__Image" src="./assets/default-avatar.png">
    </div>

    <form class="Form__main">
      <div class="Form__field">
        <span class="Form__field--icon fa fa-user-o"></span>
        <div class="Form__field--body">
          <input class="Form__field--input" type="text" name="credential" placeholder="用户名/邮箱/手机"
                 v-model="formValue.credential"
                 v-validate="getValidate('credential')"/>
        </div>
      </div>

      <div class="Form__field">
        <span class="Form__field--icon fa fa-lock"></span>
        <div class="Form__field--body">
          <input class="Form__field--input" type="password" name="password" placeholder="密码"
                 v-model="formValue.password"
                 v-validate="getValidate('password')"/>
        </div>
      </div>
    </form>

    <form class="Form__addition" v-if="captchaImage">
      <label class="Form__label" for="captcha">验证码</label>
      <input class="Form__field--input" type="text" name="captcha" id="captcha" placeholder="验证码"
             v-model="formValue.captcha"
             v-validate="getValidate('captcha')"/>
      <div class="Form__captcha">
        <vImage
          :src="captchaImage"
          :clickHandler="freshCaptchaImage">
        </vImage>
      </div>
    </form>

    <div v-if="errors.has('credential')" class="Form__warning">
      用户名不能为空
    </div>
    <div v-else-if="errors.has('password')" class="Form__warning">
      密码不能为空
    </div>
    <div v-else-if="errors.has('captcha')" class="Form__warning">
      验证码不能为空
    </div>

    <div class="Form__submit">
      <button class="Form__submit--button" type="button" @click="login">登陆</button>
    </div>
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
        },
        user: null
      }
    },

    async mounted() {
      if (this.$store.state.user) {
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

        let passport = {password}

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

          if (this.errors.errors.length !== 0) return

          if (this.captchaImage) {
            await CaptchaService.verifyCaptcha(this.formValue.captcha)
          }

          await this.$store.dispatch('login', this.passport)

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
  $Form__field--height: 40px;
  .Signin {
    height: 100vh;
    width: 100vw;
    background: #f8f8f8;
    padding-top: 80px;
    box-sizing: border-box;
    .Avatar {
      text-align: center;
      margin-bottom: 27px;
    }
    .Avatar__Image {
      display: block;
      margin: 0 auto;
      width: 70px;
      height: 70px;
      border: rgba(0, 0, 0, 0.1) solid 1px;
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.17);
    }
    .Form__main,
    .Form__addition{
      margin: 27px 0 0 0;
      position: relative;
      padding: 0 20px;
      background: white;
      border-top: 1px solid #d7d7d7;
      border-bottom: 1px solid #d7d7d7;
    }
    .Form__field {
      background: white;
      height: $Form__field--height;
      &:not(:last-child) {
        border-bottom: 1px solid #d7d7d7;
      }
    }
    .Form__field--icon {
      width: 20px;
      height: $Form__field--height;
      margin-right: 20px;
      display: block;
      float: left;
      text-align: center;
      line-height: $Form__field--height;
      font-size: 1.5rem;
    }
    .Form__field--body {
      position: relative;
      overflow: hidden;
      height: $Form__field--height;
    }
    .Form__field--input {
      border: 0;
      width: 100%;
      height: $Form__field--height;
      outline: none;
      display: block;
      box-sizing: border-box;
      background-color: transparent;
    }
    .Form__label {
      position: absolute;
      top: 0;
      left: 0;
      transform: translateY(-100%);
    }
    .Form__captcha {
      position: absolute;
      right: 30px;
      top: 50%;
      transform: translateY(-50%);
      width: $Form__field--height / 50 * 100 * 0.7;
      height: $Form__field--height * 0.7;
    }
    .Form__submit {
      margin: 20px 16px 15px;
    }
    .Form__submit--button {
      width: 100%;
      border: 1px solid #e86b0f;
      color: white;
      background: #ff8200;
      font-size: 1.0625rem;
      padding: 0;
      line-height: $Form__field--height;
      border-radius: 3px;
      outline: none;
    }
    .Form__warning {
      margin: 5px 12px 0;
      font-size: .875rem;
      color: #e24123;
    }
  }
</style>