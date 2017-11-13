<template>
  <li class="dropdown" :class="dropdownClassName">
    <a class="dropdown-toggle" @click="clickHandler">
      <!-- Image Icon Dropdown -->
      <img v-if="iconSrc" :class="iconClass" :src="iconSrc">
      <!-- Font Icon Dropdown -->
      <i v-else :class="iconClass"/>
      <!-- Label -->
      <span v-if="label" :class="labelClass">
        {{label}}
      </span>
    </a>

    <ul class="dropdown-menu">
      <slot></slot>
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
    labelClass: String,
    iconSrc: String,
    label: [String, Number]
  }
})
class vDropdown extends Vue {
  isOpened = false;

  get dropdownClassName() {
    return [
      this.dropdownClass,
      this.isOpened ? 'open' : ''
    ]
  }

  clickHandler() {
    this.isOpened = !this.isOpened;
  }
}

export default vDropdown;
</script>

<style type="text/scss" lang="scss">
.dropdown {
  .dropdown-toggle {
    cursor: pointer;
  }
}
</style>
