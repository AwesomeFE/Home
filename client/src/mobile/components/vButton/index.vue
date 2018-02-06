<template>
  <button @click="clickHandler" :class="className" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script>
import {Vue, Component} from 'vue-property-decorator';

@Component({
  props: {
    className: String,
    disabled: Boolean
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
.btn {

}
</style>
