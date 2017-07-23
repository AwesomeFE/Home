<template>
  <div>
    <h1>账户设定</h1>
    <div>
      <label>
        <span>头像：</span>
        <img width="100" height="100" :src="'/api/file/' + avatar" v-if="avatar" alt="">
        <input type="file" @change="changeAvatar">
      </label>

      <label>
        <span>用户名：</span>
        <input v-model="formValue.username">
      </label>

      <label>
        <span>密码：</span>
        <input v-model="formValue.password">
      </label>

      <label>
        <span>手机号：</span>
        <input v-model="formValue.mobile">
      </label>

      <label>
        <span>邮箱：</span>
        <input v-model="formValue.email">
      </label>

      <label>
        <span>姓名：</span>
        <input v-model="formValue.name">
      </label>

      <label>
        <span>昵称：</span>
        <input v-model="formValue.nickname">
      </label>

      <label>
        <span>所在地：</span>
        <input v-model="formValue.location">
      </label>

      <label>
        <span>性别：</span>
        <input v-model="formValue.gender">
      </label>

      <label>
        <span>感情状态：</span>
        <input v-model="formValue.emotionState">
      </label>

      <label>
        <span>博客：</span>
        <input v-model="formValue.blogUrl">
      </label>

      <label>
        <span>QQ：</span>
        <input v-model="formValue.QQ">
      </label>
    </div>

    <div>
      <button @click="update">保存</button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        formValue: {
          avatar: '',
          username: '',
          password: '',
          mobile: '',
          email: '',
          name: '',
          nickname: '',
          location: '',
          gender: '',
          emotionState: '',
          blogUrl: '',
          QQ: ''
        },
        avatar: '',
        form: new FormData()
      }
    },
    async mounted() {
      await this.$store.dispatch('getSessionUser')

      const profileList = Object.entries(this.$store.state.user)

      for(const [key, value] of profileList) {
        if(key in this.formValue) {
          if(key !== 'avatar') {
            this.formValue[key] = value
          } else {
            this.avatar = value
          }
        }
      }
    },
    methods: {
      async update() {
        const formFields = Object.entries(this.formValue)

        for(const [key, value] of formFields) {
          if(value) {
            this.form.append(key, value)
          }
        }

        await this.$store.dispatch('updateUser', this.form)
      },
      changeAvatar(event) {
        this.formValue.avatar = event.target.files[0]
      }
    }
  }
</script>

<style type="text/scss" lang="scss">
</style>