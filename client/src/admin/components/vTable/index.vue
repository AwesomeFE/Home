<template>
  <table class="vTable">
    <thead class="vTable__header">
      <tr class="vTable__header--row">
        <th class="vTable__header--item" v-for="header in headers" :key="header.key">
          {{header.title}}
        </th>
        <th v-if="actions.length">
          {{$t('actions')}}
        </th>
      </tr>
    </thead>
    <tbody class="vTable__body">
      <tr v-for="item in data" :key="item.id">
        <td v-for="header in headers" :key="item.id + header.key">
          {{item[header.key]}}
        </td>
        <td v-for="action in actions" :key="item.id + action.name">
          <button @click="clickHandler($event, action.name, item)">{{action.name}}</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import {Vue, Component} from 'vue-property-decorator';

  @Component({
    props: {
      headers: Array,
      data: Array,
      total: Number,
      actions: Array
    }
  })
  class vTable extends Vue {
    clickHandler(event, action, item) {
      this.$emit(action, event, item);
    }
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

<i18n>
zh-cn:
  actions: '操作'
</i18n>
