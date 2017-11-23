<template>
  <table class="vTable">
    <thead class="vTable__header">
      <tr class="vTable__header--row">
        <th class="vTable__header--item" v-for="header in headers" :key="header">{{header}}</th>
      </tr>
    </thead>
    <tbody class="vTable__body">
      <tr v-for="item in data" :key="item.id">
        <td>{{item[header]}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import {Vue, Component} from 'vue-property-decorator';

  @Component({
    props: {
      i18n: Object,
      headers: Array,
      data: Array,
      total: Number
    }
  })
  class vTable extends Vue {

  }

  export default vTable;
</script>

<style type="text/scss" lang="scss">
.vTable {
  display: block;
  .vTable__headers {
    display: block;
  }
}
</style>
