<template>
  <div class="BlogDetail">
    <div class="BlogDetail__header">
      <div class="BlogDetail__header--button back">返回</div>
      <div class="BlogDetail__header--button title">微博正文</div>
      <div class="BlogDetail__header--button more fa fa-ellipsis-h"></div>
    </div>
    <article class="BlogDetail__content">
      <div>
        {{author}}
      </div>
      <div>
        {{JSON.stringify(blog)}}
      </div>
    </article>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        blog: null
      }
    },
    computed: {
      blogId() {
        return this.$route.params.blogId
      },
      author() {
        return this.blog && this.blog.user
      }
    },
    mounted() {
      this.getBlogDetail()
    },
    methods: {
      async getBlogDetail() {
        const {blog} = await this.$store.dispatch('blog/getDetail', this.blogId)
        this.blog = blog
      }
    }
  }
</script>

<style type="text/scss" lang="scss">
  .BlogDetail {
    .BlogDetail__header {
      height: 45px;
    }
    .BlogDetail__header--button {
      float: left;
      height: 100%;
      line-height: 45px;
      padding: 0 10px;
      box-sizing: border-box;
      &.back {
        text-align: left;
        width: 15%;
      }
      &.title {
        text-align: center;
        width: 70%;
      }
      &.more {
        text-align: right;
        width: 15%;
      }
    }
    .BlogDetail__content {

    }
  }
</style>