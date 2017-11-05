<template>
  <div>
    <label :for="name">{{value}}</label>

    <select @change="selectHandler">
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{option.title}}
      </option>
    </select>
  </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: {
    name: String,
    value: String,
    options: Array
  }
})
class SignUpSelect extends Vue {
  selectHandler(event) {
    const { value } = event.target;
    this.$emit('input', value);
  }
}

export default SignUpSelect;
</script>

<style type="text/scss" lang="scss">

</style>
