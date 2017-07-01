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
        const {user} = await UserService.getSessionUser()

        this.$store.commit('setLoginUser', user)
      }
    }
  }
</script>

<style type="text/scss" lang="scss">
</style>