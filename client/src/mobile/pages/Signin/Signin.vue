<template>
  <div class="Signin">
    <div class="Avatar">
      <img v-if="user" class="Avatar__Image" :src="user.avatar">
      <img v-else class="Avatar__Image" src="./assets/default-avatar.png">
    </div>

    <form class="Form">
      <div class="Form__field">
        <span class="Form__field--icon fa fa-user-o"></span>
        <input class="Form__field--input" type="text" name="credential" placeholder="用户名/邮箱/手机"
               v-model="formValue.credential"
               v-validate="getValidate('credential')"/>
        <span class="Form__field--warning"
              v-show="errors.has('credential')">
          必填项
        </span>
      </div>

      <div class="Form__field">
        <span class="Form__field--icon fa fa-lock"></span>
        <input class="Form__field--input" type="password" name="password" placeholder="密码"
               v-model="formValue.password"
               v-validate="getValidate('password')"/>
        <span class="Form__field--warning"
              v-show="errors.has('password')">
          必填项
        </span>
      </div>
    </form>

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
  .Signin {
    height: 100vh;
    width: 100vw;
    .Avatar {
      text-align: center;
      margin: 80px 0 27px 0;
    }
    .Avatar__Image {
      display: block;
      margin: 0 auto;
      width: 70px;
      height: 70px;
    }
    .Form {
      margin: 27px 0;
      padding: 0 20px;
      border-top: 1px solid #d7d7d7;
      border-bottom: 1px solid #d7d7d7;
    }
    .Form__field {
      height: 40px;
      &:not(:last-child) {
        border-bottom: 1px solid #d7d7d7;
      }
    }
    .Form__field--icon {
      margin-right: 20px;
      display: block;
      float: left;
      width: 20px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      font-size: 1.5rem;
    }
    .Form__field--input {
      display: block;
      float: left;
      height: 40px;
      box-sizing: border-box;
      border: 0;
      outline: none;
      background-color: rgb(255, 255, 255);
    }
  }
</style>