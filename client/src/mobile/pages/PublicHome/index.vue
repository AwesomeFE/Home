<template>
  <div class="PublicHome">
    <top-header :stylesheet="topHeaderStyle">
      <router-link to="" slot="left" class="Logo">
        <img src="./assets/Logo.svg">
      </router-link>
      <div slot="right" class="Actions">
        <router-link to="signup">{{$t('signup')}}</router-link>
        <span>/</span>
        <router-link to="signin">{{$t('signin')}}</router-link>
      </div>
    </top-header>
  </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component()
class PublicHome extends Vue {
  topHeaderStyle = {
    height: '54px',
    boxShadow: 'inherit'
  };
}

export default PublicHome;
</script>

<style type="text/scss" lang="scss" scoped>
.PublicHome {
  .Logo {
    display: block;
    padding-left: 20px;
    height: 70%;
    img {
      height: 100%;
    }
  }
  .Actions {
    line-height: 54px;
    padding-right: 20px;
    color: #ff8200;
  }
}
</style>

<i18n>
zh:
  signin: "登陆"
  signup: "注册"
en:
  signin: "SignIn"
  signup: "SignUp"
</i18n>