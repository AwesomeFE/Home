<template>
  <button
    class="btn btn-block btn-flat"
    :class="className"
    @click="clickHandler"
  >
    <slot></slot>
  </button>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component({
  props: {
    title: String,
    className: String,
    disabled: Boolean,
    isLoading: Boolean
  }
})
class vButton extends Vue {
  clickHandler(event) {
    this.$emit('click', event);
  }
}

export default vButton;
</script>

<style type="text/scss" lang="scss">

</style>
