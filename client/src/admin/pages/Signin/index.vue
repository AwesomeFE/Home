<template>
  <div class="Signin login-box">
    <div class="login-logo">
      <router-link to="signin">
        <b>Admin</b>WB
      </router-link>
    </div>

    <div class="login-box-body">
      <p
        class="login-box-msg"
        v-show="message || remoteMessage"
      >
        {{$t(message) || $t(remoteMessage)}}
      </p>

      <v-input
        type="text"
        name="credential"
        validate="required"
        iconClass="glyphicon glyphicon-envelope"
        v-model="credential"
        :placeholder="$t('credential')"
        :disabled="disabled"
      />
      <v-input
        type="password"
        name="password"
        validate="required"
        iconClass="glyphicon glyphicon-lock"
        v-model="password"
        :placeholder="$t('password')"
        :disabled="disabled"
      />
      <div class="row" v-if="!!captchaImage">
        <div class="col-xs-8">
          <v-input
            type="captcha"
            name="captcha"
            validate="required"
            iconClass="fa fa-font"
            v-model="captcha"
            :placeholder="$t('captcha')"
            :disabled="disabled"
          />
        </div>
        <div class="col-xs-4">
          <v-image
            wapperClass="Signin__captcha--wapper"
            imageClass="Signin__captcha--image important"
            :src="captchaImage"
            @click="changeCaptcha"
            :disabled="disabled"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-xs-8">
          <v-checkbox
            class="checkbox"
            :title="$t('rememberMe')"
            v-model="isRemember"
            :disabled="disabled"
          />
        </div>
        <div class="col-xs-4">
          <v-button
            className="btn-primary"
            @click="signin"
            :disabled="disabled"
          >
            {{$t('signin')}}
          </v-button>
        </div>
      </div>

      <div class="Signin__linkGourp">
        <router-link to="forget">
          {{$t('forgetPassword')}}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import validator from 'validator';
  import Component from 'vue-class-component';
  import {
    USER_NOT_FOUND,
    PASSWORD_ERROR,
    REQUEST_SUSSESS,
    CAPTCHA_VERIFY_FAILED
  } from '../../constants';

  @Component()
  class Signin extends Vue {
    credential = '';
    password = '';
    captcha = '';
    isRemember = false;

    captchaImage = null;
    disabled = false;
    remoteMessage = '';

    get passport() {
      let passportType = 'username';
      passportType = validator.isEmail(this.credential) ? 'email' : passportType;
      passportType = validator.isMobilePhone(this.credential, 'zh-CN') ? 'mobile' : passportType;

      return {
        [passportType]: this.credential,
        password: this.password,
        captcha: this.captcha
      };
    }

    get message() {
      const errorItem = this.$validator.errors.items.find(item => item.msg);
      return errorItem ? errorItem.msg : '';
    }

    async mounted() {
      this.captchaImage = await this.$store.dispatch('captcha/getCaptcha', {
        width: 200, height: 60, offset: 40, quality: 100, fontsize: 57, isLogin: true
      });
    }

    async changeCaptcha() {
      this.captchaImage = await this.$store.dispatch('captcha/getCaptcha', {
        width: 200, height: 60, offset: 40, quality: 100, fontsize: 57, isLogin: true
      });
    }

    async signin() {
      this.disabled = true;

      try {
        const isValid = await this.$validator.validateAll();

        if(isValid) {
          await this.$store.dispatch('user/signin', this.passport);
          this.$router.push('dashboard');
        }
      } catch(message) {
        this.remoteMessage = message.type;
        this.changeCaptcha();
      }

      this.disabled = false;
    }
  }

  export default Signin;
</script>

<style type="text/scss" lang="scss">
  .Signin {
    .checkbox {
      margin: 10px 0;
    }
    .Signin__linkGourp {
      margin-top: 10px;
    }
    .Signin__captcha--wapper {
      overflow: hidden;
      height: 34px;
    }
    .Signin__captcha--image.important {
      height: 34px;
      width: 113px;
      float: left;
    }
  }
</style>

<i18n>
zh-cn:
  credential: '用户名/邮箱/手机号'
  password: '密码'
  signin: '登陆'
  captcha: '验证码'
  rememberMe: '自动登陆'
  forgetPassword: '忘记密码？'
  The captcha field is required.: 验证码不能为空
  The password field is required.: 密码不能为空
  The credential field is required.: 登录用户名不能为空
  CAPTCHA_VERIFY_FAILED: 验证码错误
  USER_NOT_FOUND: 用户不存在
  PASSWORD_ERROR: 密码错误
</i18n>