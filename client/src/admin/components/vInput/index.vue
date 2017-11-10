<template>
  <div class="form-group has-feedback" :class="className">
    <input
      class="form-control"
      v-if="validate"
      v-validate="validate"
      :class="inputClass"
      :type="type"
      :placeholder="placeholder"
    />
    <input
      class="form-control"
      v-else
      :class="inputClass"
      :type="type"
      :placeholder="placeholder"
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
    iconClass: String,
    inputClass: String,
    className: String
  },
  inject: [
    '$validator'
  ]
})
class vInput extends Vue {

}

export default vInput;
</script>

<style type="text/scss" lang="scss">

</style>
