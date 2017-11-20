<template>
  <div class="App">

    <template v-if="user && !isNotFound">
      <v-header />
      <v-sidebar />
    </template>

    <router-view v-if="!isPageLoading"></router-view>

    <transition name="fade">
      <v-loading v-show="isPageLoading"></v-loading>
    </transition>
  </div>
</template>

<script>
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component()
class App extends Vue {
  isPageLoading = true;

  get user() {
    return this.$store.state.user.loginUser;
  }

  get isNotFound() {
    return !this.$route.name;
  }

  @Watch('user')
  onUserChange() {
    this.user
      ? this.$router.push('dashboard')
      : this.$router.push('signin');
  }

  async mounted() {
    try {
      await this.$store.dispatch('user/getSession');
      this.isPageLoading = false;
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
  min-width: 720px;
}
</style>