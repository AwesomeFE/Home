<template>
  <div class="vCheckbox" :class="className">
    <div
      class="vCheckbox__input"
      :class="inputClassName"
      @click="clickHandler"
      @mouseover="hoverHandler($event, true)"
      @mouseout="hoverHandler($event, false)"
    />
    <span
      class="vCheckbox__title"
      @click="clickHandler"
      @mouseover="hoverHandler($event, true)"
      @mouseout="hoverHandler($event, false)"
    >
      {{title}}
    </span>
  </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: {
    title: String,
    value: Boolean,
    disabled: Boolean,
    className: String
  }
})
class vCheckbox extends Vue {
  isHover = false;

  get inputClassName() {
    return {
      hover: this.isHover,
      checked: this.value,
      disabled: this.disabled
    };
  }

  clickHandler(event) {
    if(!this.disabled) {
      this.$emit('input', !this.value);
    }

    this.$emit('click', event);
  }

  hoverHandler(event, ishover) {
    if(!this.disabled) {
      this.isHover = ishover;
    }
  }
}

export default vCheckbox;
</script>

<style type="text/scss" lang="scss">
.vCheckbox {
  overflow: hidden;
  .vCheckbox__input {
    float: left;
    width: 22px;
    height: 22px;
    background: url('./assets/img/blue.png') no-repeat;
    background-position: 0 0;
    margin-right: 10px;
    cursor: pointer;

    &.hover {
      background-position: -24px 0;
    }

    &.checked {
      background-position: -48px 0;
      &.disabled {
        background-position: -96px 0;
        cursor: not-allowed;
      }
    }

    &.disabled {
      background-position: -72px 0;
      cursor: not-allowed;
    }
  }
  .vCheckbox__title {
    cursor: pointer;
  }
}
</style>
