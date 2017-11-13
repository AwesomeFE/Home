<template>
  <div>
    <!-- User image -->
    <li class="user-header">
      <img :src="avatar" class="img-circle">
      <p>
        {{name}} - {{job}}<small>Member since Nov. 2012</small>
      </p>
    </li>
    <!-- Menu Body -->
    <li class="user-body">
      <div class="row">
        <div class="col-xs-4 text-center">
          <a href="#">Followers</a>
        </div>
        <div class="col-xs-4 text-center">
          <a href="#">Sales</a>
        </div>
        <div class="col-xs-4 text-center">
          <a href="#">Friends</a>
        </div>
      </div>
      <!-- /.row -->
    </li>
    <!-- Menu Footer-->
    <li class="user-footer">
      <div class="pull-left">
        <a href="#" class="btn btn-default btn-flat">Profile</a>
      </div>
      <div class="pull-right">
        <a class="btn btn-default btn-flat" @click="signout">Sign out</a>
      </div>
    </li>
  </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: {
    name: String,
    job: String,
    avatar: String
  }
})
class vProfile extends Vue {
  signout() {
    this.$store.dispatch('user/signout');
    this.$router.push('signin');
  }
}

export default vProfile;
</script>

<style type="text/scss" lang="scss">

</style>
