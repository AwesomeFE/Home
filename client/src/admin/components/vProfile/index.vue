<template>
  <div class="vProfile">
    <div></div>
    <div></div>
    <div class="vProfile__footer">
      <button class="btn">{{$t('Profile')}}</button>
      <button class="btn right" @click="signout">{{$t('Signout')}}</button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component()
class vProfile extends Vue {
  signout() {
    this.$store.dispatch('user/signout');
  }
}

export default vProfile;
</script>

<style type="text/scss" lang="scss">
.vProfile {
  width: 280px;
  background-color: white;

  .vProfile__footer {
    padding: 10px;
    background: #f9f9f9;
  }

  .right {
    float: right;
  }
}
</style>

<i18n>
zh-cn:
  Profile: "我的账号"
  Signout: "登出"
</i18n>