<template>
  <router-view></router-view>
</template>

<script>
  import * as UserService from '../../services/UserService'

  export default {
    data() {
      return {}
    },
    async mounted() {
      await this.getSessionUser()
    },
    methods: {
      async getSessionUser() {
        const userInfo = await UserService.getSessionUser()

        this.$store.commit('setLoginUser', userInfo)
      }
    }
  }
</script>

<style type="text/scss" lang="scss">
</style>