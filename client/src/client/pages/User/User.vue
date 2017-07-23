<template>
  <div>
    <div>
      {{JSON.stringify(user || {})}}
    </div>
    <div>
      <button v-if="user && relationship === 'none'" @click="makeFriend">添加好友</button>
      <button v-if="user && relationship === 'confirm'" @click="makeFriend">确认好友申请</button>
      <button v-if="user && relationship === 'pending'" disabled>已申请</button>
      <button v-if="user && relationship === 'friend'" disabled>已是好友</button>
    </div>
  </div>
</template>

<script>
  import * as UserService from '../../services/UserService'

  export default {
    data() {
      return {
        user: null,
        relationship: ''
      }
    },
    async mounted() {
      const userId = this.$route.params.userId

      this.user = (await UserService.getUserProfile(userId)).user
      this.relationship = (await UserService.checkFiendWith(userId)).relationship
    },
    methods: {
      async makeFriend() {
        const userId = this.$route.params.userId
        await UserService.makeFriendWith(userId)

        this.relationship = (await UserService.checkFiendWith(userId)).relationship
      }
    }
  }
</script>

<style type="text/scss" lang="scss">
</style>