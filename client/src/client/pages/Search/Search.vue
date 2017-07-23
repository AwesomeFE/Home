<template>
  <input v-model="search">
  <button @click="onSearch"></button>
</template>

<script>
  export default {
    data() {
      return {
        search: ''
      }
    },
    mounted() {
    },
    methods: {
      onSearch() {

      }
    }
  }
</script>

<style type="text/scss" lang="scss">
</style>