<template>
  <li class="dropdown" :class="dropdownClassName" ref="container">
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

  mounted() {
    document.addEventListener('click', this.cancelDropdown);
  }

  beforeDestroy() {
    document.removeEventListener('click', this.cancelDropdown);
  }

  cancelDropdown(event) {
    const isSelfEvent = event.path.some(el => el === this.$refs.container);

    if(!isSelfEvent) {
      this.isOpened = false;
    }
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
