<template>
  <router-link to="" class="vLogo">
    <b class="vLogo__Main">Admin</b>
    <span class="vLogo__Sub">WB</span>
  </router-link>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component()
class vLogo extends Vue {

}

export default vLogo;
</script>

<style type="text/scss" lang="scss">
@import '../../assets/scss/variables';

.vLogo {
  display: inline-block;
  width: 230px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 20px;
  font-family: $Helvetica_Neue;
  background: #367fa9;
  float: left;

  .vLogo__Main {
    color: white;
  }
  .vLogo__Sub {
    color: white;
  }
}
</style>
