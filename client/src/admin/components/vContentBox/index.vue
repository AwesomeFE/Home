<template>
  <div class="ContentBox">
    <header class="ContentBox__header">
      <h2 class="ContentBox__header--text">
        {{title}}
      </h2>
    </header>
    <section class="ContentBox__body">
      <slot></slot>
    </section>
  </div>
</template>

<script>
  import {Vue, Component} from 'vue-property-decorator';

  @Component({
    props: {
      title: String
    }
  })
  class vContentBox extends Vue {

  }

  export default vContentBox;
</script>

<style type="text/scss" lang="scss">
  .ContentBox {
    border-top: 3px solid #d2d6de;
    border-radius: 3px;
    background: white;
    margin: 15px 0;

    .ContentBox__header {
      padding: 10px;
      border-bottom: 1px solid #f4f4f4;
    }

    .ContentBox__header--text {
      display: inline-block;
      font-size: 18px;
      margin: 0;
      line-height: 1;
    }

    .ContentBox__body {
      padding: 10px;
    }
  }
</style>