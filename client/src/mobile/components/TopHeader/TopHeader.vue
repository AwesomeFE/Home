<template>
  <nav class="TopHeader">
    <div class="TopHeader__left">
      <slot name="left"></slot>
    </div>
    <div class="TopHeader__middle">
      <slot name="middle"></slot>
    </div>
    <div class="TopHeader__right">
      <slot name="right"></slot>
    </div>
  </nav>
</template>
<script>
  import * as UserService from '../../services/UserService'

  export default {
    computed: {
      userInfo() {
        return this.$store.state.user
      }
    },
    mounted() {
    },
    methods: {
      async logout() {
        await this.$store.dispatch('logout')
      }
    }
  }
</script>
<style type="text/scss" lang="scss">
  $Header-height: 44px;

  .TopHeader {
    width: 100%;
    height: $Header-height;
    background: #f9f9f9;
    position: relative;
    z-index: 1;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
  }
  .TopHeader__left {
    float: left;
    height: $Header-height;
  }
  .TopHeader__middle {
    text-align: middle;
  }
  .TopHeader__right {
    float: right;
    height: $Header-height;
  }
</style>
