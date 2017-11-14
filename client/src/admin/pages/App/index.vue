<template>
  <div class="App">

    <template v-if="user">
      <v-header />
      <!-- <v-sidebar /> -->
    </template>

    <router-view v-if="isPageRended"></router-view>

    <transition name="fade">
      <v-loading v-show="!isPageRended"></v-loading>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component()
class App extends Vue {
  isPageRended = false;

  get user() {
    return this.$store.state.user.loginUser;
  }

  async mounted() {
    try {
      await this.$store.dispatch('user/getSession');

      if(this.user) {
        this.$router.push('dashboard');
      } else {
        this.$router.push('signin');
      }

      this.isPageRended = true;
    } catch(e) {
      console.log(e);
    }
  }
}

export default App;
</script>

<style type="text/scss" lang="scss">
.App {
  background: #f2f2f2;
  position: relative;
  height: 100vh;
  overflow-y: auto;
}
</style>