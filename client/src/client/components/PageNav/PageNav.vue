<template>
  <nav class="PageNav">
    <div class="PageNav__container">
      <div class="PageNav__logo">
        <router-link to="/" class="PageNav__logo--link">
          <img class="PageNav__logo--image" src="./images/logo.png">
        </router-link>
      </div>
      <ul class="PageNav__list">
        <li class="PageNav__item">
          <router-link class="PageNav__link" to="/">
            <strong class="PageNav__link--text">首页</strong>
            <span class="PageNav__link--text">Home</span>
          </router-link>
        </li>
        <li class="PageNav__item">
          <router-link class="PageNav__link" to="/main">
            <strong class="PageNav__link--text">微博</strong>
            <span class="PageNav__link--text">Blog</span>
          </router-link>
        </li>
        <li class="PageNav__item">
          <router-link class="PageNav__link" to="/search">
            <strong class="PageNav__link--text">搜索</strong>
            <span class="PageNav__link--text">Search</span>
          </router-link>
        </li>
        <li class="PageNav__item">
          <router-link class="PageNav__link" to="/setting/profile">
            <strong class="PageNav__link--text">设置</strong>
            <span class="PageNav__link--text">Setting</span>
          </router-link>
        </li>
        <li class="PageNav__item">
          <router-link class="PageNav__link" to="/superiority">
            <strong class="PageNav__link--text">实力展示</strong>
            <span class="PageNav__link--text">Superiority</span>
          </router-link>
        </li>
        <li class="PageNav__item">
          <router-link class="PageNav__link" to="/activity">
            <strong class="PageNav__link--text">折扣团购</strong>
            <span class="PageNav__link--text">Activity</span>
          </router-link>
        </li>
      </ul>
      <div class="PageNav__adv">
        <img src="./images/gupiaodaima.gif">
      </div>
    </div>
  </nav>
</template>

<script>
  export default {

  }
</script>

<style type="text/scss" lang="scss">
  @import "../../scss/index.scss";

  .PageNav {
    .PageNav__container {
      @include container();
      height: 90px;
      display: table;
    }

    .PageNav__logo,
    .PageNav__list,
    .PageNav__adv,
    .PageNav__item {
      display: table-cell;
      vertical-align: middle;
    }

    .PageNav__logo--image {
      height: 50px;
    }

    .PageNav__list {
      width: 60%;
    }

    .PageNav__logo--link {
      display: block;
      margin-right: 90px;
    }

    .PageNav__link {
      margin-right: 50px;
      display: block;
    }

    strong.PageNav__link--text {
      display: block;
      font-size: 16px;
    }

    span.PageNav__link--text {
      display: block;
      font-size: 12px;
      text-transform: uppercase;
    }
  }
</style>
