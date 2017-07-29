<template>
  <div class="NewBlog">
    <div class="NewBlog__header">
      <span class="NewBlog__close" @click="closeEditor">&times;</span>
      <span class="NewBlog__middle">
        <img class="NewBlog__avatar" v-if="avatarUrl" :src="avatarUrl">
        <img class="NewBlog__avatar" v-else src="./assets/default-avatar.png">
      </span>
      <span class="NewBlog__action">
        <button @click="createBlog" :disabled="formValue.content === ''">发送</button>
      </span>
    </div>

    <div class="NewBlog__body">
      <textarea class="NewBlog__textarea" placeholder="分享新鲜事..." v-model="formValue.content"></textarea>
    </div>

    <div class="NewBlog__footer">
      <div class="NewBlog__labels">
        <div class="NewBlog__label">
          <i class="NewBlog__label--icon fa fa-globe"></i>
          <span class="NewBlog__label--text">公开</span>
        </div>
      </div>
      <div class="NewBlog__panel">
        <div class="NewBlog__panel--action">
          <div class="NewBlog__panel--icon fa fa-image"></div>
          <input class="NewBlog__upload" type="file" @change="addFiles" accept="image/*" multiple />
        </div>
        <div class="NewBlog__panel--action">
          <div class="NewBlog__panel--icon fa fa-at"></div>
        </div>
        <div class="NewBlog__panel--action">
          <div class="NewBlog__panel--icon fa fa-hashtag"></div>
        </div>
        <div class="NewBlog__panel--action">
          <div class="NewBlog__panel--icon fa fa-smile-o"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as BlogService from '../../services/BlogService'

  export default {
    data() {
      return {
        form: new FormData(),
        formValue: {
          content: ''
        }
      }
    },
    computed: {
      avatarUrl() {
        return this.user.avatar ? `/api/file/${this.user.avatar}` : ''
      },
      user() {
        return this.$store.state.user
      }
    },
    mounted() {
      if (!this.user) {
        return this.$router.replace({name: 'Signup'})
      }
    },
    methods: {
      async createBlog() {
        this.form.append('content', this.formValue.content)

        await BlogService.createBlog(this.form)

        this.$router.push({name: 'Main'})
      },
      addFiles(event) {
        const files = event.target.files

        for(const file of files) {
          this.form.append('files', file)
        }
      },
      closeEditor() {
        this.$router.push({name: 'Main'})
      }
    }
  }
</script>

<style type="text/scss" lang="scss">
  $NewBlog__header--height: 50px;

  .NewBlog {
    .NewBlog__header {
      height: 50px;
      padding: 8px;
      box-sizing: border-box;
      width: 100%;
      display: table;
      position: fixed;
      top: 0;
    }
    .NewBlog__close,
    .NewBlog__action,
    .NewBlog__middle {
      display: table-cell;
      height: 100%;
      width: (1 / 3) * 100%;
      vertical-align: middle;
    }
    .NewBlog__close {
      font-size: 26px;
    }
    .NewBlog__action {
      text-align: right;
    }
    .NewBlog__middle {
      text-align: center;
    }
    .NewBlog__avatar {
      height: 31px;
      width: 31px;
      display: inline-block;
      border-radius: 50%;
    }
    .NewBlog__body {
      padding: 50px .6rem 83px .6rem;
    }
    .NewBlog__textarea {
      width: 100%;
      box-sizing: border-box;
      outline: none;
      resize: none;
    }
    .NewBlog__footer {
      position: fixed;
      bottom: 0;
      width: 100%;
      height: 83px;
      background: white;
    }
    .NewBlog__labels {
      height: 43px;
      padding: 10px;
      box-sizing: border-box;
    }
    .NewBlog__label {
      background-color: #f8f8f8;
      color: #4e7cb1;
      padding: 4px 8px;
      border-radius: 50px;
      float: right;
    }
    .NewBlog__panel {
      height: 40px;
      display: table;
      width: 100%;
      box-sizing: border-box;
      background-color: #f6f6f6;
      color: #707070;
    }
    .NewBlog__panel--action {
      width: 25%;
      height: 100%;
      display: table-cell;
      position: relative;
      vertical-align: middle;
      text-align: center;
    }
    .NewBlog__panel--icon {
      font-size: 25px;
    }
    .NewBlog__upload {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
  }
</style>