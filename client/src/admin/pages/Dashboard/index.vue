<template>
  <div class="Dashboard skin-blue sidebar-mini">
    <div class="wrapper">
      <v-header />
      Dashboard
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component()
class Dashboard extends Vue {

}

export default Dashboard;
</script>

<style type="text/scss" lang="scss">
.Dashboard {
  .wrapper {
    min-height: 100vh;
  }
}
</style>
