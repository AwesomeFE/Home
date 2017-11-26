<template>
  <button
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
    isLoading: Boolean,
    to: String
  }
})
class vButton extends Vue {
  clickHandler(event) {
    if(this.to) {
      this.$router.push(this.to);
    }
    this.$emit('click', event);
  }
}

export default vButton;
</script>

<style type="text/scss" lang="scss">

</style>
