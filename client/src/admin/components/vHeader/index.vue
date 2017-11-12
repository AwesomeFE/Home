<template>
  <header class="main-header">

    <router-link to="" class="logo">
      <span class="logo-lg"><b>Admin</b>LTE</span>
    </router-link>

    <nav class="navbar navbar-static-top">
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">

          <v-dropdown
            dropdownClass="messages-menu"
            iconClass="fa fa-envelope-o"
            labelClass="label-success"
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
            labelClass="label-warning"
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
            labelClass="label-danger"
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

          <v-dropdown dropdownClass="user user-menu">
            <a class="dropdown-toggle" slot="dropdown-toggle">
              <img class="user-image" :src="user.avatar">
              <span class="hidden-xs">{{user.name}}</span>
            </a>

            <v-dropdown-profile />

          </v-dropdown>

          <li>
            <a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

import vMessage from './components/vMessage';
import vDropdown from './components/vDropdown';
import vProfile from './components/vProfile';

@Component({
  components: {
    'v-dropdown': vDropdown,
    'v-dropdown-message': vMessage,
    'v-dropdown-profile': vProfile
  }
})
class vHeader extends Vue {
  messages = [];

  get user() {
    return this.$store.state.user.loginUser;
  }
}

export default vHeader;
</script>

<style type="text/scss" lang="scss">

</style>
