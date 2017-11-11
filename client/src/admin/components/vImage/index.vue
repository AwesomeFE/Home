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
  export default {
    props: {
      src: String,
      wapperClass: String,
      imageClass: String
    },
    data() {
      return {
        isLoadComplete: false
      }
    },
    watch: {
      src(newVal, oldVal) {
        if(newVal !== oldVal) {
          this.isLoadComplete = false;
        }
      }
    },
    mounted() {
    },
    methods: {
      loadHandler() {
        this.isLoadComplete = true;
      },
      clickHandler(event) {
        this.$emit('click', event);
      }
    }
  }
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