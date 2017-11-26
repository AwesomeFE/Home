<template>
  <aside class="vSidebar">
    <header class="vSidebar__header">
      <img class="vSidebar__avatar" :src="avatar">
      <div class="vSidebar__username">{{user.name}}</div>
      <div class="vSidebar__online">Online</div>
    </header>
    <section class="vSidebar__body">
      <ul class="vSidebar__menus">
        <v-side-menu
          :title="$t('Overview')"
          to="/dashboard"
          iconClass="fa fa-dashboard"
        />
        <v-side-menu
          :title="$t('User')"
          to="/user"
          iconClass="fa fa-user"
        />
        <v-side-menu
          :title="$t('Country')"
          to="/country"
          iconClass="fa fa-globe"
        />
      </ul>
    </section>
  </aside>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import defaultUser from './assets/img/defaultUser.jpg';

@Component()
class vSidebar extends Vue {
  get user() {
    return this.$store.state.user.loginUser;
  }

  get avatar() {
    return this.user.avatar ? this.user.avatar : defaultUser;
  }
}

export default vSidebar;
</script>

<style type="text/scss" lang="scss">
@import '../../assets/scss/variables';

.vSidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 230px;
  margin-top: 50px;
  min-height: 100vh;
  background: #222d32;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  color: white;

  .vSidebar__header {
    padding: 10px;
    overflow: hidden;
  }
  .vSidebar__avatar {
    width: 45px;
    height: 45px;
    float: left;
    border-radius: 50%;
    margin-right: 15px;
  }
  .vSidebar__username {
    padding-top: 5px;
    margin-left: 60px;
  }
  .vSidebar__online {
    @include font-size(11);
    margin-left: 60px;
  }
  .vSidebar__body {

  }
  .vSidebar__menus {

  }
  .vSidebar__menu {
    padding: 12px 5px 12px 15px;
  }
}
</style>

<i18n>
zh-cn:
  Overview: "概况"
  User: "用户"
  Country: "国家"
  Online: "在线"
</i18n>