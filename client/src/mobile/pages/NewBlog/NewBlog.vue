<template>
  <transition name="NewBlog">
    <div class="NewBlog">
      <div class="NewBlog__header">
        <span class="NewBlog__close" @click="closeEditor">&times;</span>
        <span class="NewBlog__middle">
          <img class="NewBlog__avatar" v-if="avatarUrl" :src="avatarUrl">
          <img class="NewBlog__avatar" v-else src="./assets/default-avatar.png">
        </span>
        <span class="NewBlog__action">
          <button class="NewBlog__submit" @click="createBlog" :disabled="formValue.content === ''">发送</button>
        </span>
      </div>

      <div class="NewBlog__body">
        <textarea class="NewBlog__textarea" placeholder="分享新鲜事..." v-model="formValue.content"></textarea>
        <div class="NewBlog__images" v-if="images.length">
          <div class="NewBlog__image" v-for="image in images">
            <img class="NewBlog__image--img" :src="image">
          </div>
          <div class="NewBlog__clearFloat"></div>
        </div>
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
            <input class="NewBlog__upload" type="file" @change="addFiles" accept="image/*" multiple/>
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
  </transition>
</template>

<script>
  import * as BlogService from '../../services/BlogService'

  export default {
    data() {
      return {
        form: new FormData(),
        formValue: {
          content: ''
        },
        images: []
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

        for (const file of files) {
          this.form.append('files', file)

          const reader = new FileReader()

          reader.readAsDataURL(file)

          reader.onload = (event) => this.images.push(event.target.result)
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
    width: 100%;
    height: 100%;
    background-color: white;
    .NewBlog__header {
      height: $NewBlog__header--height;
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
    .NewBlog__submit {
      color: #fff;
      background: #ff8200;
      border: 0;
      padding: 0 10px;
      box-sizing: border-box;
      height: 34px;
      border-radius: 3px;
    }
    .NewBlog__submit[disabled] {
      background: #efefef;
      color: #afafaf;
      border: 1px solid #afafaf;
    }
    .NewBlog__body {
      padding: $NewBlog__header--height .6rem 83px .6rem;
    }
    .NewBlog__textarea {
      width: 100%;
      box-sizing: border-box;
      outline: none;
      resize: none;
      height: 200px;
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
    .NewBlog__image {
      float: left;
      width: 100px;
      height: 100px;
      position: relative;
      overflow: hidden;
    }
    .NewBlog__image--img {
      max-width: 100%;
      max-height: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
    }
    .NewBlog__clearFloat {
      clear: both;
    }
    &.NewBlog-enter-active,
    &.NewBlog-leave-active {
      transition: transform .3s ease;
      position: absolute;
    }
    &.NewBlog-enter {
      transform: translateX(100%);
    }
    &.NewBlog-enter-to {
      transform: translateX(0);
    }
    &.NewBlog-leave {
      transform: translateX(0);
    }
    &.NewBlog-leave-to {
      transform: translateX(100%);
    }
  }
</style>