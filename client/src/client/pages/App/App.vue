<template>
  <router-view v-if="isPageInitialized"></router-view>
</template>

<script>
  import * as UserService from '../../services/UserService'

  export default {
    data() {
      return {
        isPageInitialized: false
      }
    },
    async mounted() {
      await this.getSessionUser()

      this.isPageInitialized = true
    },
    methods: {
      async getSessionUser() {
        const {user} = await UserService.getSessionUser()

        this.$store.commit('setLoginUser', user)
      }
    }
  }
</script>

<style type="text/scss" lang="scss">
</style>