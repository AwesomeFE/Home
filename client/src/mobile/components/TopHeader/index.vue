<template>
  <nav class="TopHeader" :style="stylesheet">
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
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: {
    stylesheet: Object
  }
})
class TopHeader extends Vue {
}

export default TopHeader;
</script>
<style type="text/scss" lang="scss" scoped>
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
    z-index: 1;
    left: 0;
  }
  .TopHeader__middle {
    text-align: center;
    left: 0;
    width: 100%;
    z-index: 0;
  }
  .TopHeader__right {
    right: 0;
    z-index: 1;
  }
  .TopHeader__left,
  .TopHeader__middle,
  .TopHeader__right {
    top: 0;
    height: 100%;
    position: absolute;
    & > * {
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }
  }
</style>
