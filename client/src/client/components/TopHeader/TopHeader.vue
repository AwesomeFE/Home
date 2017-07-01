<template>
  <nav class="TopHeader">
    <ul class="TopHeader__container">
      <li class="TopHeader__navList band">
        <div class="TopHeader__navItem">
          <span class="TopHeader__navItem--label">喜铺婚礼集团：</span>
        </div>
        <div class="TopHeader__navItem">
          <a class="TopHeader__navItem--link">兰摩婚纱</a>
        </div>
        <div class="TopHeader__navItem">
          <a class="TopHeader__navItem--link">小喜求婚</a>
        </div>
        <div class="TopHeader__navItem">
          <a class="TopHeader__navItem--link">77微电影</a>
        </div>
        <div class="TopHeader__navItem">
          <a class="TopHeader__navItem--link">Sunny喜铺商学院</a>
        </div>
        <div class="TopHeader__navItem">
          <a class="TopHeader__navItem--label">club高端婚礼定制</a>
        </div>
      </li>
      <li class="TopHeader__navList menu" v-if="!userInfo">
        <div class="TopHeader__navItem">
          <router-link class="TopHeader__navItem--link" to="signin">登陆</router-link>
        </div>
        <div class="TopHeader__navItem">
          <span class="TopHeader__navItem--split">/</span>
        </div>
        <div class="TopHeader__navItem">
          <router-link class="TopHeader__navItem--link" to="signup">注册</router-link>
        </div>
      </li>
      <li class="TopHeader__navList menu" v-if="userInfo">
        <div class="TopHeader__navItem">
          欢迎{{userInfo.username||userInfo.mobile||userInfo.email}}
        </div>
        <div class="TopHeader__navItem">
          <a class="TopHeader__navItem--link" @click="logout">登出</a>
        </div>
      </li>
      <li class="TopHeader__navList tel">
        <div class="TopHeader__navItem">
          <b class="TopHeader__navItem--label">客服热线：400-678-5575</b>
        </div>
      </li>
      <li class="TopHeader__navList contact">
        <div class="TopHeader__navItem">
          <a class="TopHeader__navItem--link">免费加盟喜铺</a>
        </div>
        <div class="TopHeader__navItem">
          <a class="TopHeader__navItem--link">联系我们</a>
        </div>
      </li>
      <li class="TopHeader__navList share">
        <div class="TopHeader__navItem">
          <a class="TopHeader__navItem--link fa fa-weibo"></a>
        </div>
        <div class="TopHeader__navItem">
          <a class="TopHeader__navItem--link fa fa-wechat"></a>
        </div>
      </li>
    </ul>
  </nav>
</template>
<script>
  import * as UserService from '../../services/UserService'

  export default {
    computed: {
      userInfo() {
        return this.$store.state.user
      }
    },
    mounted() {
    },
    methods: {
      async logout() {
        await UserService.logout()
        this.$store.commit('setLoginUser', null)
      }
    }
  }
</script>
<style type="text/scss" lang="scss">
  @import "../../scss/index.scss";

  .TopHeader {
    border-bottom: 1px solid $border-grey;

    .TopHeader__container {
      @include container();
      display: table;
      height: 30px;
    }

    .TopHeader__navList,
    .TopHeader__navItem {
      display: table-cell;
      vertical-align: middle;
    }

    .TopHeader__navItem--label {
      font-size: 14px;
      color: $pink;
    }

    .TopHeader__navItem--link {
      font-size: 13px;
      color: $grey;
    }

    // 链接之间的margin
    .band, .contact {
      .TopHeader__navItem--link {
        margin-right: 20px;
      }
    }

    .tel {
      .TopHeader__navItem--label {
        color: $grey;
      }
    }

    .share {
      .TopHeader__navItem--link {
        font-size: 20px;
        margin-left: 10px;
      }
    }
  }
</style>
