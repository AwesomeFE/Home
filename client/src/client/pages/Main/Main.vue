<template>
  <div>
    <div>
      <textarea v-model="content"></textarea>
      <input type="file" @change="addFiles" multiple>
      <button @click="createBlog">
        创建
      </button>
    </div>

    <button @click="freshBlog">刷新</button>

    <div v-for="blog in blogs">
      <div>{{blog.user}}</div>
      <div>{{blog.content}}</div>
      <div v-for="attachmentId in blog.attachments">
        <img :src="'/api/file/' + attachmentId">
      </div>
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
        form: new FormData(),
        blogs: []
      }
    },
    mounted() {
      this.freshBlog()
    },
    methods: {
      addFiles(event) {
        const files = event.target.files

        for(const file of files) {
          this.form.append('files', file)
        }
      },
      async createBlog() {
        this.form.append('content', this.content)

        await BlogService.createBlog(this.form)
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

<style type="text/scss" lang="scss" scoped>
  img {
    max-width: 100px;
  }
</style>