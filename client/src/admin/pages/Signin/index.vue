<template>
  <div class="Signin login-box">
    <div class="login-logo">
      <a href="#"><b>Admin</b>WB</a>
    </div>

    <div class="login-box-body">
      <p class="login-box-msg">Sign in to start your session</p>

      <v-input
        type="text"
        name="credential"
        validate="required"
        iconClass="glyphicon glyphicon-envelope"
        v-model="credential"
        :placeholder="$t('credential')"
      />
      <v-input
        type="password"
        name="password"
        validate="required"
        iconClass="glyphicon glyphicon-lock"
        v-model="password"
        :placeholder="$t('password')"
      />

      <div class="row">
        <div class="col-xs-8">
          <v-checkbox
            class="checkbox"
            title="Remember Me"
            v-model="isRemember"
          />
        </div>
        <!-- /.col -->
        <div class="col-xs-4">
          <button type="submit" class="btn btn-primary btn-block btn-flat">Sign In</button>
        </div>
        <!-- /.col -->
      </div>

      <a href="#">I forgot my password</a><br>
      <a href="register.html" class="text-center">Register a new membership</a>

    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component()
  class Signin extends Vue {
    credential = '';
    passport = '';
    password = '';
    isRemember = false;
  }

  export default Signin;
</script>

<style type="text/scss" lang="scss">
  .Signin {
    .checkbox {
      margin: 10px 0;
    }
  }
</style>

<i18n>
zh:
  credential: '用户名/邮箱/手机号'
  password: '密码'
</i18n>