<template>
  <div>
    <input v-model="search">
    <button @click="onSearch">搜索</button>

    <div>
      <h2>Result</h2>
      <h3>users</h3>
      <div v-for="user in result.users" @click="toUserPage(user._id)">
        <img v-if="user.avatar" :src="'/api/file/' + user.avatar" width="100" height="100">
        <span>{{user.name}}|</span>
        <span>{{user.nickname}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        search: '',
        result: {
          users: [],
          blogs: []
        }
      }
    },
    mounted() {
    },
    methods: {
      async onSearch() {
        this.result.users = (await this.$store.dispatch('searchUsers', this.search)).users
      },

      toUserPage(userId) {
        this.$router.push({name: 'User', params: { userId: userId }})
      }
    }
  }
</script>

<style type="text/scss" lang="scss">
</style>