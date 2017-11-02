<template>
  <div class="Home">
    <!-- <top-header></top-header>
    <page-nav></page-nav>
    <chatting></chatting>
    <div class="swiper-container" v-swiper>
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="slideImage in slideImages">
          <vImage :src="slideImage"></vImage>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div> -->
  </div>
</template>

<script>
  import slideImage1 from './assets/images/1.jpg'
  import slideImage2 from './assets/images/2.jpg'
  import slideImage3 from './assets/images/3.jpg'

  export default {
    data() {
      return {
        slideImages: [
          slideImage1,
          slideImage2,
          slideImage3
        ]
      }
    },
    methods: {
    }
  }
</script>

<style type="text/scss" lang="scss">
</style>