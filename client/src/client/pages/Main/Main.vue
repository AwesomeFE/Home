<template>
  <div>
    <div>
      <textarea v-model="content"></textarea>
      <button @click="createBlog">
        创建
      </button>
    </div>

    <button @click="freshBlog">刷新</button>

    <div v-for="blog in blogs">
      <div>{{blog.user}}</div>
      <div>{{blog.content}}</div>
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
        content: '',
        blogs: []
      }
    },
    mounted() {
      this.freshBlog()
    },
    methods: {
      async createBlog() {
        const content = this.content

        await BlogService.createBlog({content})
      },
      async freshBlog() {
        const {blogs} = await BlogService.searchBlog({
          page: this.page,
          length: this.length
        })

        for(const newBlog of blogs) {
          if(!this.blogs.some(blog => blog._id === newBlog._id)) {
            this.blogs.push(newBlog)
          }
        }

        if(blogs.length < this.length) {

        } else {
          this.page++
        }
      }
    }
  }
</script>

<style type="text/scss" lang="scss">
</style>