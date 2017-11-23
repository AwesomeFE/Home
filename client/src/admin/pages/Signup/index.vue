<template>
  <div class="Signup">
    <top-header>
      <div slot="left" class="Signup__back" @click="goBack"><span class="fa fa-arrow-left"></span></div>
      <div slot="middle" class="Signup_title">{{$t('signup')}}</div>
    </top-header>

    <div class="Switcher">
      <div
        class="Switcher__item"
        @click="changeForm(MOBILE_FORM)"
        :class="{selected: signupType === MOBILE_FORM}">
        {{$t('mobile')}}
      </div>
      <div
        class="Switcher__item"
        @click="changeForm(EMAIL_FORM)"
        :class="{selected: signupType === EMAIL_FORM}">
        {{$t('email')}}
      </div>
    </div>

    <email-form v-if="signupType === EMAIL_FORM" />
    <mobile-form v-if="signupType === MOBILE_FORM" />
  </div>
</template>
<script>
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import EmailForm from './components/EmailForm';
  import MobileForm from './components/MobileForm';

  @Component({
    components: {
      'email-form': EmailForm,
      'mobile-form': MobileForm,
    }
  })
  class Signup extends Vue {
    signupType = 'MOBILE_FORM';

    EMAIL_FORM = 'EMAIL_FORM';
    MOBILE_FORM = 'MOBILE_FORM';

    changeForm(signupType) {
      this.signupType = signupType;
    }

    goBack() {
      this.$router.go(-1);
    }
  }

  export default Signup;
</script>

<style type="text/scss" lang="scss">
.Signup {
  .Signup__back {
    font-size: 27px;
    padding: 0 7px;
  }
  .Signup_title {
    font-size: 20px;
  }
  .Switcher {
    border: 1px solid #848484;
    overflow: hidden;
    border-radius: 3px;
    width: 95%;
    margin: 7px auto;
  }
  .Switcher__item {
    width: 50%;
    float: left;
    text-align: center;
    line-height: 29px;
    color: #333;
    font-size: 14px;
    &.selected {
      background: #848484;
      color: white;
    }
  }
}
</style>

<i18n>
en:
  signup: ""
  mobile: ""
  email: ""
zh-cn:
  signup: "注册"
  mobile: "手机注册"
  email: "邮箱注册"
</i18n>