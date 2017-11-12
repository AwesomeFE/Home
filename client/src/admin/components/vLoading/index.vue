<template>
  <div class="vLoading" :class="className">
    <img class="vLoading-img" src="./assets/loading.gif">
    <span class="vLoading-text">{{$t('loadingText')}}</span>
  </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: {
    className: String,
    isShow: Boolean
  }
})
class vLoading extends Vue {
}

export default vLoading;
</script>

<style type="text/scss" lang="scss">
.vLoading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  background: #f2f2f2;
  overflow: hidden;
  .vLoading-img {
    float: left;
    display: block;
    height: 20px;
    margin-right: 5px;
  }
  .vLoading-text {
    color: #7c7c7c;
    height: 20px;
    line-height: 20px;
  }
}
</style>

<i18n>
zh:
  loadingText: "加载中..."
en:
  loadingText: "Loading..."
</i18n>