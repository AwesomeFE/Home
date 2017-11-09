<template>
  <div class="login-box">
    <div class="login-logo">
      <a href="#"><b>Admin</b>WB</a>
    </div>

    <div class="login-box-body">
      <p class="login-box-msg">Sign in to start your session</p>

      <form>
        <div class="form-group has-feedback">
          <input type="email" class="form-control" placeholder="Email">
          <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
        </div>
        <div class="form-group has-feedback">
          <input type="password" class="form-control" placeholder="Password">
          <span class="glyphicon glyphicon-lock form-control-feedback"></span>
        </div>
        <div class="row">
          <div class="col-xs-8">
            <div class="checkbox icheck">
              <label>
                <div class="icheckbox_square-blue" aria-checked="false" aria-disabled="false" style="position: relative;"><input type="checkbox" style="position: absolute; top: -20%; left: -20%; display: block; width: 140%; height: 140%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;"><ins class="iCheck-helper" style="position: absolute; top: -20%; left: -20%; display: block; width: 140%; height: 140%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;"></ins></div> Remember Me
              </label>
            </div>
          </div>
          <!-- /.col -->
          <div class="col-xs-4">
            <button type="submit" class="btn btn-primary btn-block btn-flat">Sign In</button>
          </div>
          <!-- /.col -->
        </div>
      </form>

      <div class="social-auth-links text-center">
        <p>- OR -</p>
        <a href="#" class="btn btn-block btn-social btn-facebook btn-flat"><i class="fa fa-facebook"></i> Sign in using
          Facebook</a>
        <a href="#" class="btn btn-block btn-social btn-google btn-flat"><i class="fa fa-google-plus"></i> Sign in using
          Google+</a>
      </div>
      <!-- /.social-auth-links -->

      <a href="#">I forgot my password</a><br>
      <a href="register.html" class="text-center">Register a new membership</a>

    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component()
  class Signin extends Component {
    
  }

  export default Signin;
</script>

<style type="text/scss" lang="scss">
  $Form__field--height: 40px;
  .Signin {
    height: 100vh;
    width: 100vw;
    background: #f8f8f8;
    padding-top: 80px;
    box-sizing: border-box;
    .Avatar {
      text-align: center;
      margin-bottom: 27px;
    }
    .Avatar__Image {
      display: block;
      margin: 0 auto;
      width: 70px;
      height: 70px;
      border: rgba(0, 0, 0, 0.1) solid 1px;
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.17);
    }
    .Form__main {
      margin: 27px 0 0 0;
      position: relative;
      padding: 0 20px;
      background: white;
      border-top: 1px solid #d7d7d7;
      border-bottom: 1px solid #d7d7d7;
    }
    .Form__field {
      background: white;
      height: $Form__field--height;
      &:not(:last-child) {
        border-bottom: 1px solid #d7d7d7;
      }
    }
    .Form__field--icon {
      width: 20px;
      height: $Form__field--height;
      margin-right: 20px;
      display: block;
      float: left;
      text-align: center;
      line-height: $Form__field--height;
      font-size: 1.5rem;
    }
    .Form__field--body {
      position: relative;
      overflow: hidden;
      height: $Form__field--height;
    }
    .Form__field--input {
      border: 0;
      width: 100%;
      height: $Form__field--height;
      outline: none;
      display: block;
      box-sizing: border-box;
      background-color: transparent;
    }
    .Form__addition .Form__field {
      position: relative;
      padding: 0 10px;
      border-top: 1px solid #d7d7d7;
      border-bottom: 1px solid #d7d7d7;
      background: white;
    }
    .Form__label {
      display: block;
      padding: 10px;
    }
    .Form__captcha {
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      width: $Form__field--height / 50 * 100 * 0.7;
      height: $Form__field--height * 0.7;
    }
    .Form__submit {
      margin: 20px 16px 15px;
    }
    .Form__submit--button {
      width: 100%;
      border: 1px solid #e86b0f;
      color: white;
      background: #ff8200;
      font-size: 1.0625rem;
      padding: 0;
      line-height: $Form__field--height;
      border-radius: 3px;
      outline: none;
    }
    .Form__warning {
      margin: 5px 12px 0;
      font-size: .875rem;
      color: #e24123;
    }
  }
</style>