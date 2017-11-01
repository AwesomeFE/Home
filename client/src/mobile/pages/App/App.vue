<template>
  <router-view v-if="isPageInitialized"></router-view>
</template>

<script>
  export default {
    data() {
      return {
        isPageInitialized: false
      }
    },
    async mounted() {
      // await this.$store.dispatch('getSessionUser')

      this.isPageInitialized = true
    }
  }
</script>

<style type="text/scss" lang="scss">
</style>