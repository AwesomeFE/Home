<template>
  <table class="vTable">
    <thead class="vTable__header">
      <tr class="vTable__header--row">
        <th class="vTable__header--item" v-for="header in headers" :key="header.key">
          {{header.title}}
        </th>
        <th class="vTable__header--item" v-if="actions.length">
          {{$t('actions')}}
        </th>
      </tr>
    </thead>
    <tbody class="vTable__body">
      <tr class="vTable__body--row" v-for="item in data" :key="item.id">
        <td class="vTable__body--item" v-for="header in headers" :key="item.id + header.key">
          {{item[header.key]}}
        </td>
        <td class="vTable__body--item" v-if="actions.length">
          <button
            class="vTable__body--action"
            v-for="action in actions"
            :key="item.id + action.name"
            :class="action.className"
            v-show="isActionButtonShow(item, action)"
            @click="clickHandler($event, action.name, item)"
          >
            <i class="vTable__body--action-icon" :class="action.iconName"></i>
          </button>
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
      actions: {
        type: Array,
        default: []
      }
    }
  })
  class vTable extends Vue {
    clickHandler(event, action, item) {
      this.$emit(action, event, item);
    }

    isActionButtonShow(item, action) {
      if(action.isShow) {
        return action.isShow(item);
      } else {
        return true;
      }
    }
  }

  export default vTable;
</script>

<style type="text/scss" lang="scss">
.vTable {
  width: 100%;
  .vTable__header {
    // display: block;
  }
  .vTable__header--row {
    border-bottom: 2px solid #f4f4f4;
  }
  .vTable__header--item {
    padding: 8px 30px 8px 8px;
    border-top: 1px solid #f4f4f4;
    border-right: 1px solid #f4f4f4;
    &:first-child {
      border-left: 1px solid #f4f4f4;
    }
  }
  .vTable__body {
  }
  .vTable__body--row {
  }
  .vTable__body--item {
    padding: 8px;
    border-bottom: 1px solid #f4f4f4;
    border-right: 1px solid #f4f4f4;
    &:first-child {
      border-left: 1px solid #f4f4f4;
    }
  }
  .vTable__body--action {
    width: 25px;
    height: 25px;
    padding: 0;
    position: relative;
    margin-right: 5px;
    &:last-child {
      margin-right: 0;
    }
  }
  .vTable__body--action-icon {
    position: absolute;
    font-size: 12px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>

<i18n>
zh-cn:
  actions: '操作'
</i18n>
