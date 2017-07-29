<template>
  <div class="Main">
    <div class="Main__header">
      <div class="Main__viewSelector">
        <span class="Main__viewMode--text">{{user.mobile}}</span>
        <ul class="Main__viewList" style="display: none">
          <li class="Main__viewItem">全部</li>
          <li class="Main__viewItem">好友圈</li>
          <li class="Main__viewItem">个人</li>
        </ul>
      </div>
      <div class="Main__actions">
        <div class="Main__action fa fa-pencil-square-o" @click="createNewBlog"></div>
      </div>
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
    computed: {
      user() {
        return this.$store.state.user
      }
    },
    mounted() {
      this.freshBlog()
    },
    methods: {
      createNewBlog() {
        this.$router.push({name: 'NewBlog'})
      },
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