<template>
  <header class="vHeader">
    <v-logo />

    <nav class="vHeader__menus">
      <v-nav-menu
        menuClass="fa fa-bars"
      />

      <v-nav-menu
        menuClass="fa fa-flag-o"
        :isRight="true"
      >
        <li></li>
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

    <!-- <nav class="navbar navbar-static-top">
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">

          <v-dropdown
            dropdownClass="messages-menu"
            iconClass="fa fa-envelope-o"
            labelClass="label label-success"
            :label="messages.length"
          >
            <v-message
              v-for="message in messages"
              :key="message.id"
              :linkTo="message.url"
              :avatar="message.user.avatar"
              :title="message.user.role"
            >
              {{message}}
            </v-message>
          </v-dropdown>

          <v-dropdown
            dropdownClass="notifications-menu"
            iconClass="fa fa-bell-o"
            labelClass="label label-warning"
            :label="messages.length"
          >
            <v-message
              v-for="message in messages"
              :key="message.id"
              :linkTo="message.url"
              :avatar="message.user.avatar"
              :title="message.user.role"
            >
              {{message}}
            </v-message>
          </v-dropdown>

          <v-dropdown
            dropdownClass="tasks-menu"
            iconClass="fa fa-flag-o"
            labelClass="label label-danger"
            :label="messages.length"
          >
            <v-message
              v-for="message in messages"
              :key="message.id"
              :linkTo="message.url"
              :avatar="message.user.avatar"
              :title="message.user.role"
            >
              {{message}}
            </v-message>
          </v-dropdown>

          <v-dropdown
            dropdownClass="user user-menu"
            iconClass="user-image"
            labelClass="hidden-xs"
            :iconSrc="user.avatar"
            :label="user.name"
          >
            <v-dropdown-profile
              :avatar="user.avatar"
              :name="user.name"
              :job="'Web Developer'"
              :createTime="user.createdAt"
            />
          </v-dropdown>

          <li>
            <a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
          </li>
        </ul>
      </div>
    </nav> -->
  </header>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

import vMessage from './components/vMessage';
import vDropdown from './components/vDropdown';
import vProfile from './components/vProfile';

@Component()
class vHeader extends Vue {
  messages = [];

  get user() {
    return this.$store.state.user.loginUser;
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
