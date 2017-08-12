<template>
  <div class="Main">
    <div class="Main__header">
      <div class="Main__viewSelector">
        <div class="Main__viewMode--text">
          {{me.nickname}}
          <span class="fa fa-angle-down"></span>
        </div>
        <ul class="Main__viewList" style="display: none">
          <li class="Main__viewItem">全部</li>
          <li class="Main__viewItem">好友圈</li>
          <li class="Main__viewItem">个人</li>
        </ul>
      </div>
      <div class="Main__actions">
        <div class="Main__action fa fa-refresh" @click="freshBlog"></div>
        <div class="Main__action fa fa-search" @click="goToNewBlog"></div>
        <div class="Main__action fa fa-pencil" @click="goToNewBlog"></div>
      </div>
    </div>

    <div class="Main__nav">
      <div class="Main__nav--item">首页</div>
      <div class="Main__nav--item">消息</div>
      <div class="Main__nav--item">发现</div>
      <div class="Main__nav--item">我</div>
    </div>

    <div class="Main__body">
      <blog-card v-for="blog in blogs"
                 :blog="blog"
                 :key="blog._id"
                 :me="me"
                 @toggleLike="toggleLike">
      </blog-card>
    </div>
  </div>
</template>

<script>
  import * as BlogService from '../../services/BlogService'

  export default {
    data() {
      return {
        page: 0,
        length: 10,
        blogs: []
      }
    },
    computed: {
      me() {
        return this.$store.state.user
      }
    },
    mounted() {
      this.freshBlog()
    },
    methods: {
      goToNewBlog() {
        this.$router.push({name: 'NewBlog'})
      },
      toggleLike(updatedBlog) {
        const blogIdx = this.blogs.findIndex(blog => blog._id === updatedBlog._id)

        this.blogs.splice(blogIdx, 1, updatedBlog)
      },
      async freshBlog() {
        const pagination = {
          page: this.page,
          length: this.length
        }

        const {blogs: nextBlogs} = await this.$store.dispatch('blog/getMore', pagination)

        for(const nextBlog of nextBlogs) {
          if(!this.blogs.some(blog => blog._id === nextBlog._id)) {
            this.blogs.push(nextBlog)
          }
        }

        if(nextBlogs.length >= this.length) {
          this.page++
        }
      }
    }
  }
</script>

<style type="text/scss" lang="scss">
  .Main {
    min-width: 100vw;
    min-height: 100vh;
    background: #f2f2f2;

    .Main__header,
    .Main__blog {
      background: white;
    }

    .Main__header {
      height: 44px;
      position: relative;
    }
    .Main__viewSelector {
      float: left;
      max-width: 45%;
      height: 100%;
    }
    .Main__viewMode--text {
      width: 100%;
      height: 100%;
      overflow: hidden;
      line-height: 44px;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding-left: 12px;
      color: #333;
      font-size: 1.125rem;
      box-sizing: border-box;
    }
    .Main__actions {
      overflow: hidden;
      height: 100%;
    }
    .Main__action {
      height: 100%;
      line-height: 44px;
      float: right;
      width: 46px;
      text-align: center;
      font-size: 1.6rem;
      color: #444;
    }
    .Main__nav {
      height: 40px;
      background: #f5f5f5;
      margin-bottom: 10px;
      box-shadow: 0 1px 2px rgba(0,0,0,.15);
    }
    .Main__nav--item {
      float: left;
      width: 25%;
      height: 100%;
      text-align: center;
      line-height: 40px;
      font-size: .9275rem;
      &.active {
        font-size: .875rem;
      }
    }
  }
</style>