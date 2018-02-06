<template>
  <div class="MobileForm">
    <sign-up-select
      name="countryCode"
      v-model="countryCode"
      :options="countryOptions"
    />

    <sign-up-input
      type="text"
      name="mobile"
      validator="required"
      v-model="mobile"
      :title="$t('mobile.title')"
      :placeholder="$t('mobile.placeholder')"
      :errorString="$t('mobile.error')"
      :disabled="disabled" />

    <sign-up-input
      type="password"
      name="password"
      validator="required"
      v-model="password"
      :title="$t('password.title')"
      :placeholder="$t('password.placeholder')"
      :errorString="$t('password.error')"
      :disabled="disabled" />
    
    <div
      class="btn"
      @click="submit"
      :disabled="disabled"
    >
      {{$t('submit')}}
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import SignUpInput from './SignUpInput';
  import SignUpSelect from './SignUpSelect';

  @Component({
    components: {
      'sign-up-input': SignUpInput,
      'sign-up-select': SignUpSelect
    }
  })
  class MobileForm extends Vue {
    countryCode = '0086';
    mobile = '';
    password = '';
    smsCode = '';
    countryOptions = [];
    disabled = false;

    mounted() {
      this.setCountryOptions();
    }

    async setCountryOptions() {
      const countries = await this.$store.dispatch('getCountries');

      for(const country of countries) {
        this.countryOptions.push({
          title: country.names.find(item => item.lang === 'zh-cn').title,
          value: country.code
        });
      }
    }

    async submit() {
      this.disabled = true;

      try {
        await this.$validator.validateAll();
      } catch(e) {

      }

      this.disabled = false;
    }
  }

  export default MobileForm;
</script>

<style type="text/scss" lang="scss">
.MobileForm {
  .btn {
    background: #ff8200;
    border: 1px solid #e86b0f;
    color: white;
    margin: 1px 10px;
    line-height: 43px;
    text-align: center;
    font-size: 17px;
    border-radius: 3px;
  }
}
</style>

<i18n>
en:
  mobile.title: ""
  mobile.placeholder: ""
  password.title: ""
  password.placeholder: ""
  required: ""
zh:
  mobile.title: "登录名（手机号）"
  mobile.placeholder: "请输入手机号"
  mobile.error: "手机号码不能为空"
  password.title: "设置密码"
  password.placeholder: "6~16位数字或字母，区分大小写"
  password.error: "密码不能为空"
  submit: "获取短信验证码"
</i18n>