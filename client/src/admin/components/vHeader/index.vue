<template>
  <header class="vHeader">
    <v-logo />

    <nav class="vHeader__menus">
      <v-nav-menu
        menuClass="fa fa-bars"
      />

      <v-nav-menu
        menuClass="fa fa-gears"
        :isRight="true"
      >
      </v-nav-menu>

      <v-nav-menu
        :imgSrc="avatar"
        :text="user.name"
        :isRight="true"
      >
        <v-profile />
      </v-nav-menu>

      <v-nav-menu
        menuClass="fa fa-flag-o"
        :isRight="true"
      >
      </v-nav-menu>

      <v-nav-menu
        menuClass="fa fa-bell-o"
        :isRight="true"
      />

      <v-nav-menu
        menuClass="fa fa-envelope-o"
        :isRight="true"
      />
    </nav>
  </header>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import defaultUser from './assets/img/defaultUser.jpg';

@Component()
class vHeader extends Vue {
  messages = [];

  get user() {
    return this.$store.state.user.loginUser;
  }

  get avatar() {
    return this.user.avatar ? this.user.avatar : defaultUser;
  }
}

export default vHeader;
</script>

<style type="text/scss" lang="scss">
.vHeader {
  position: fixed;
  top: 0;
  z-index: 1;
  width: 100vw;
  height: 50px;
  background: #3c8dbc;

  .vHeader__menus {
    display: block;
    float: left;
    height: 50px;
    width: calc(100vw - 230px);
  }
}
</style>
