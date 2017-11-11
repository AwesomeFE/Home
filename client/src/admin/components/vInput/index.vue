<template>
  <div class="form-group has-feedback" :class="realClassName">
    <input
      class="form-control"
      v-if="validate"
      v-validate="validate"
      :class="inputClass"
      :type="type"
      :name="name"
      :disabled="disabled"
      :placeholder="placeholder"
      @input="inputHandler"
    />
    <input
      class="form-control"
      v-else
      :class="inputClass"
      :type="type"
      :name="name"
      :disabled="disabled"
      :placeholder="placeholder"
      @input="inputHandler"
    />
    <span
      class="form-control-feedback"
      :class="iconClass"
    />
  </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: {
    name: String,
    type: String,
    value: String,
    placeholder: String,
    validate: [String, Function],
    inputClass: String,
    iconClass: String,
    className: String,
    disabled: Boolean
  },
  inject: [
    '$validator'
  ]
})
class vInput extends Vue {
  get realClassName() {
    return {
      [this.className]: !!this.className,
      'has-error': this.$validator.errors.items.find(item => item.field === this.name)
    };
  }

  inputHandler(event) {
    const currentValue = event.target.value;
    this.$emit('input', currentValue);
  }
}

export default vInput;
</script>

<style type="text/scss" lang="scss">

</style>
