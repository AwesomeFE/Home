<template>
  <div>
    <input v-model="search">
    <button @click="onSearch"></button>
  </div>
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