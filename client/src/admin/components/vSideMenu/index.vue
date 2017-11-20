<template>
  <li class="vSideMenu">
    <router-link
      class="vSideMenu__link"
      :to="to"
    >
      <i class="vSideMenu__icon" :class="iconClass"></i>
      {{title}}
    </router-link>
  </li>
</template>

<script>
import {Vue, Component} from 'vue-property-decorator';

@Component({
  props: {
    title: String,
    to: {
      type: String,
      default: '#'
    },
    iconClass: String
  }
})
class vSideMenu extends Vue {

}

export default vSideMenu;
</script>

<style type="text/scss" lang="scss">
.vSideMenu {
  .vSideMenu__link {
    display: block;
    padding: 10px 25px 10px 15px;
    color: #b8c7ce;

    &.router-link-active {
      background: #1e282c;
      color: white;
      border-left: 3px solid #3c8dbc;
      padding-left: 12px;
    }

    &:hover {
      background: #1e282c;
      color: white;
    }
  }

  .vSideMenu__icon {
    display: inline-block;
    width: 15px;
    margin-right: 5px;
  }
}
</style>
