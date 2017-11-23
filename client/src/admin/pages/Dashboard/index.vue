<template>
  <div class="Dashboard Wrapper">
    <h1 class="Header">
      {{$t('Dashboard')}}
      <small class="Header__description">
        {{$t('Dashboard_desc')}}
      </small>
    </h1>
  </div>
</template>

<script>
import {Vue, Component} from 'vue-property-decorator';

@Component()
class Dashboard extends Vue {

}

export default Dashboard;
</script>

<style type="text/scss" lang="scss">
.Dashboard {
}
</style>
<i18n>
zh-cn:
  Dashboard: "概况"
  Dashboard_desc: "实时显示系统情况"
</i18n>