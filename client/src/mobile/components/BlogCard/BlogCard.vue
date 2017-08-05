<template>
  <div class="BlogCard">
    <header class="BlogCard__header">
      <img class="BlogCard__user--avatar"
           v-if="userAvatar"
           :src="userAvatar">
      <img class="BlogCard__user--avatar"
           src="./assets/default-avatar.png"
           v-else>
      <div class="BlogCard__user--info">
        <div class="BlogCard__user--nickname">{{user.nickname}}</div>
        <div class="BlogCard__user--publishTime">一天前</div>
      </div>
    </header>
    <section class="BlogCard__body">
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
      <div class="BlogCard__action">赞</div>
    </footer>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    props: ['blog'],
    computed: {
      user() {
        return this.blog.user || {}
      },
      userAvatar() {
        return this.user.avatar
          ? `/api/file/${this.user.avatar}`
          : ''
      },
      blogData() {
        const attachments = this.blog.attachments.map(attachment => `/api/file/${attachment}`)

        return {
          content: this.blog.content,
          createdAt: this.blog.createdAt,
          updatedAt: this.blog.updatedAt,
          attachments
        }
      }
    },
    mounted() {
    },
    methods: {}
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