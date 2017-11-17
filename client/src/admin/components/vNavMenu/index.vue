<template>
  <div class="vNavMenu" :class="{right: isRight, open: isOpen}" ref="el">
    <router-link
      class="vNavMenu__menuClass"
      :to="to"
      @click.native="clickHandler"
    >
      <i class="vNavMenu__menuIcon" v-if="menuClass" :class="menuClass">
        <span class="vNavMenu__menuLabel" v-if="dropdownCount">
          {{dropdownCount}}
        </span>
      </i>
      <img class="vNavMenu__menuImage" v-if="imgSrc" :src="imgSrc" :class="menuClass" />
      <span class="vNavMenu__menuText" v-if="text">{{text}}</span>
    </router-link>

    <ul class="vNavMenu__dropdown" v-if="isDropdown">
      <slot name="header"></slot>
      <slot></slot>
      <slot name="footer"></slot>
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
      default: '#'
    },
    isRight: Boolean,
    imgSrc: String,
    text: String
  }
})
class vNavMenu extends Vue {

  isOpen = false;

  get isDropdown() {
    return !!this.$slots.default;
  }

  mounted() {
    if(this.isDropdown) {
      document.addEventListener('click', this.closeDropdown);
    }
  }

  beforeDestroy() {
    if(this.isDropdown) {
      document.removeEventListener('click', this.closeDropdown);
    }
  }

  get dropdownCount() {
    if(this.$slots.default) {
      return this.$slots.default.filter(slot => slot.tag).length;
    }
    return 0;
  }

  closeDropdown(event) {
    for(const el of event.path) {
      if(el === this.$refs.el) {
        return;
      }
    }

    this.isOpen = false;
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
@import '../../assets/scss/variables.scss';

.vNavMenu {
  height: 100%;
  display: inline-block;
  position: relative;

  &.right {
    float: right;
  }
  .vNavMenu__menuClass {
    display: block;
    line-height: 50px;
    padding: 0 15px;
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

  .vNavMenu__menuImage {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    margin-right: 10px;
    margin-top: -2px;
  }

  .vNavMenu__menuText {
    font-family: $SourceSans_Pro;
  }

  &.open {
    .vNavMenu__dropdown {
      display: block;
    }
  }

  .vNavMenu__dropdown {
    display: none;
    position: absolute;
    right: 0;
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;
    border: 1px solid rgba(0,0,0,.15);
  }
}
</style>
