<template>
  <div
    class="vImage"
    :class="wapperClass"
  >
    <img
      class="vImage__img"
      v-show="isLoadComplete"
      :class="imageClass"
      :src="src"
      @load="loadHandler"
      @click="clickHandler"
    >
    <span class="vImage__spinner" v-if="!isLoadComplete">aaa</span>
  </div>
</template>

<script>
  import { Component, Vue, Watch } from 'vue-property-decorator';

  @Component({
    props: {
      src: String,
      wapperClass: String,
      imageClass: String
    }
  })
  class vImage extends Vue {
    isLoadComplete = false;

    @Watch('src')
    onSrcChange(newVal, oldVal) {
      if(newVal !== oldVal) {
        this.isLoadComplete = false;
      }
    }

    loadHandler() {
      this.isLoadComplete = true;
    }

    clickHandler(event) {
      this.$emit('click', event);
    }
  }

  export default vImage;
</script>

<style type="text/scss" lang="scss">
  .vImage{
    width: 100%;
    height: 100%;
    .vImage__img {
      width: 100%;
      height: 100%;
    }
    .vImage__spinner {

    }
  }
</style>