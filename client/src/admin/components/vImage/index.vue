<template>
  <div class="vImage">
    <img
      class="vImage__img"
      v-show="isLoadComplete"
      :src="src"
      @load="loadHandler"
      @click="onClick($event)"
    >
    <span class="vImage__spinner" v-if="!isLoadComplete">aaa</span>
  </div>
</template>

<script>
  export default {
    props: ['src', 'clickHandler'],
    data() {
      return {
        isLoadComplete: false
      }
    },
    watch: {
      src(newVal, oldVal) {
        if(newVal !== oldVal) {
          this.isLoadComplete = false
        }
      }
    },
    mounted() {
    },
    methods: {
      loadHandler() {
        this.isLoadComplete = true
      },
      onClick(event) {
        this.clickHandler && this.clickHandler(event)
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