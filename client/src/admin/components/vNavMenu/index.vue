<template>
  <div class="vNavMenu" :class="{right: isRight, open: isOpen}">
    <router-link
      class="vNavMenu__menuClass"
      :to="to"
      @click.native="clickHandler"
    >
      <i class="vNavMenu__menuIcon" :class="menuClass">
        <span class="vNavMenu__menuLabel" v-if="dropdownCount">
          {{dropdownCount}}
        </span>
      </i>
    </router-link>

    <ul class="vNavMenu__dropdown" v-if="isDropdown">
      <slot></slot>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: {
    menuClass: String,
    to: {
      type: String,
      default: ''
    },
    isRight: Boolean
  }
})
class vNavMenu extends Vue {

  isOpen = false;

  get isDropdown() {
    return !!this.$slots.default;
  }

  get dropdownCount() {
    if(this.$slots.default) {
      return this.$slots.default.filter(slot => slot.tag).length;
    }
    return 0;
  }

  clickHandler() {
    if(this.isDropdown) {
      this.isOpen = !this.isOpen;
    }
  }
}

export default vNavMenu;
</script>

<style type="text/scss" lang="scss">
.vNavMenu {
  height: 100%;
  display: inline-block;
  &.right {
    float: right;
  }

  .vNavMenu__menuClass {
    display: block;
    line-height: 50px;
    padding: 0 15px;
    width: 42px;
    color: white;
    &:hover {
      background: #367fa9;
    }
  }

  .vNavMenu__menuIcon {
    position: relative;
  }

  .vNavMenu__menuLabel {
    position: absolute;
    display: block;
    top: 0;
    right: 0;
    transform: translate(70%, -70%);
    font-size: 9px;
    padding: 2px 3px;
    line-height: .9;
    background: green;
    border-radius: .25em;
    font-weight: 700;
    white-space: nowrap;
  }

  &.open {
    .vNavMenu__dropdown {
      display: block;
    }
  }

  .vNavMenu__dropdown {
    display: none;
  }
}
</style>
