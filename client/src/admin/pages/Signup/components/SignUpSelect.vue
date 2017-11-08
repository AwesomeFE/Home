<template>
  <div class="Signup__formSelect">
    <div class="Signup__value">{{value}}</div>
    <div class="Signup__title">{{title}}</div>

    <select class="Signup__select" :id="name" @change="selectHandler">
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
  get title() {
    const selectedOption = this.options.find(option => option.value === this.value);
    return selectedOption ? selectedOption.title : '';
  }
  selectHandler(event) {
    const { value } = event.target;
    this.$emit('input', value);
  }
}

export default SignUpSelect;
</script>

<style type="text/scss" lang="scss">
.Signup__formSelect {
  border: 0;
  border-top: 1px solid #c8c8c8;
  border-bottom: 1px solid #c8c8c8;
  background: white;
  height: 44px;
  position: relative;
  margin-bottom: 12px;
  .Signup__value {
    float: left;
    line-height: 44px;
    padding: 0 12px;
    border-right: 1px solid #c8c8c8;
  }
  .Signup__title {
    text-align: center;
    line-height: 44px;
  }
  .Signup__select {
    position: absolute;
    opacity: 0;
    top: 0;
    left: 0;
    border: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
