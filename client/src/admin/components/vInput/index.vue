<template>
  <div class="form-group has-feedback">
    <input
      class="form-control"
      :type="type"
      :placeholder="placeholder">
    <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
  </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: {
    type: String,
    value: String,
    placeholder: String
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
