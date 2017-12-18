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
      errorString="" />

    <sign-up-input
      type="password"
      name="password"
      validator="required"
      v-model="password"
      :title="$t('password.title')"
      :placeholder="$t('password.placeholder')"
      errorString="" />
  </div>
</template>

<script>
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import SignUpInput from './SignUpInput';
  import SignUpSelect from './SignUpSelect';
  import getValidateRules from '../handler/formValidate';

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

    mounted() {
      this.setCountryList();
    }

    async setCountryList() {
      const countryList = await this.$store.dispatch('getCountryList');

      for(const country of countryList) {
        const { title } = country.names.find(item => item.lang === 'zh-cn');

        this.countryOptions.push({ title, value: country.code });
      }
    }

    getValidateRules(name) {
      return getValidateRules(name);
    }
  }

  export default MobileForm;
</script>

<style type="text/scss" lang="scss">

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
  password.title: "设置密码"
  password.placeholder: "6~16位数字或字母，区分大小写"
  required: "必填项"
</i18n>