<template>
  <div class="BlogCard" @click="viewDetail">
    <header class="BlogCard__header">
      <img class="BlogCard__user--avatar"
           v-if="userAvatar"
           :src="userAvatar"
           @click="viewUser">
      <img class="BlogCard__user--avatar"
           src="./assets/default-avatar.png"
           v-else>
      <div class="BlogCard__user--info">
        <div class="BlogCard__user--nickname">
          <span @click="viewUser">{{user.nickname}}</span>
        </div>
        <div class="BlogCard__user--publishTime">{{blogData.createdAt}}</div>
      </div>
    </header>
    <section class="BlogCard__body" @click="viewDetail">
      <p class="BlogCard__content">{{blogData.content}}</p>
      <div class="BlogCard__attachment"
           v-for="attachment in blogData.attachments">
        <img class="BlogCard__attachment--image"
             :src="attachment">
      </div>
    </section>
    <footer class="BlogCard__footer">
      <div class="BlogCard__action">转发</div>
      <div class="BlogCard__action">评论</div>
      <div class="BlogCard__action"
           v-if="!isLike"
           @click="toggleLike">赞</div>
      <div class="BlogCard__action"
           v-if="isLike"
           @click="toggleLike">不赞</div>
    </footer>
  </div>
</template>

<script>
  import moment from 'moment'

  export default {
    data() {
      return {}
    },
    props: ['me', 'blog'],
    computed: {
      user() {
        return this.blog.user || {}
      },
      userAvatar() {
        return this.user.avatar
          ? `/api/file/${this.user.avatar}?width=100&height=100`
          : ''
      },
      blogData() {
        const attachments = this.blog.attachments.map(attachment => `/api/file/${attachment}?width=100&height=100`)

        return {
          content: this.blog.content,
          createdAt: moment(this.blog.createdAt).fromNow(),
          updatedAt: this.blog.updatedAt,
          attachments
        }
      },
      isLike() {
        return this.blog.like.some(like => like.user === this.me._id)
      }
    },
    mounted() {
    },
    methods: {
      viewUser(event) {
        event.stopPropagation();
      },
      async toggleLike(event) {
        event.stopPropagation();

        const {blog} = await this.$store.dispatch('blog/toggleLike', this.blog._id)
        this.$emit('onToggleLike', blog)
      },

      async viewDetail() {
        this.$emit('onViewDetail', this.blog._id)
      }
    }
  }
</script>

<style type="text/scss" lang="scss">
  .BlogCard {
    position: relative;
    padding: 10px 12px 0 12px;
    margin-bottom: 10px;
    box-shadow: 0 1px 2px rgba(0,0,0,.15);
    background: white;

    .BlogCard__header {
      height: 40px;
    }
    .BlogCard__user--avatar {
      float: left;
      display: block;
      height: 100%;
      border-radius: 50%;
      top: 50%;
      position: relative;
      transform: translateY(-50%);
      margin-right: 10px;
    }
    .BlogCard__user--info {
      overflow: hidden;
      height: 100%;
      padding: 4px 0;
    }
    .BlogCard__user--nickname {
      font-weight: 400;
      color: #333;
      font-size: 1rem;
      margin-bottom: 3px;
    }
    .BlogCard__user--publishTime {
      color: #929292;
      font-size: .7rem;
    }
    .BlogCard__body {
      margin: 10px 0;
      overflow: hidden;
    }
    .BlogCard__content {
      margin: 0 0 10px 0;
    }
    .BlogCard__attachment {
      display: block;
      float: left;
    }
    .BlogCard__attachment--image {
      max-width: 100px;
      max-height: 100px;
    }
    .BlogCard__footer {
      height: 36px;
      margin: 0 -12px;
      border-top: 1px solid #ececec;
    }
    .BlogCard__action {
      width: (1 / 3) * 100%;
      float: left;
      text-align: center;
      line-height: 36px;
    }
  }
</style>