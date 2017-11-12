<template>
  <li>
    <a href="#">
      <div class="pull-left">
        <img src="dist/img/user2-160x160.jpg" class="img-circle" alt="User Image">
      </div>
      <h4>
        Support Team
        <small><i class="fa fa-clock-o"></i> 5 mins</small>
      </h4>
      <p>Why not buy a new awesome theme?</p>
    </a>
  </li>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: {
    dropdownClass: String,
    iconClass: String,
    labelClass: String
  }
})
class dMessage extends Vue {

}

export default dMessage;
</script>

<style type="text/scss" lang="scss">

</style>
