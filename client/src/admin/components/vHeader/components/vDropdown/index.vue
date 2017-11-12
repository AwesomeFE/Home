<template>
  <li class="dropdown" :class="dropdownClass">
    <slot name="dropdown-toggle">
      <a class="dropdown-toggle">
        <i class="dropdown-icon" :class="iconClass" />
        <span class="label" :class="labelClass" v-if="dropdownCount">
          {{dropdownCount}}
        </span>
      </a>
    </slot>

    <ul class="dropdown-menu">
      <slot name="dropdown-menu">
        <li class="header">You have {{dropdownCount}} messages</li>
        <li>
          <ul class="menu">
            <slot></slot>
          </ul>
        </li>
        <li class="footer"><a href="#">See All Messages</a></li>
      </slot>
    </ul>

  </li>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: {
    dropdownClass: String,
    iconClass: String,
    labelClass: String
  }
})
class vDropdown extends Vue {
  isOpened = false;

  get dropdownCount() {
    return this.$slots.default
      ? this.$slots.default.filter(item => item.tag).length
      : 0;
  }
}

export default vDropdown;
</script>

<style type="text/scss" lang="scss">
.vDropdown {
  .dropdown-toggle {
    cursor: pointer;
  }
}
</style>
