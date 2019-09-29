<template>
  <el-form
    :rules="rules"
    class="login-container"
    label-position="left"
    :model="loginForm"
    label-width="0px"
    v-loading="loading"
    ref="loginForm"
  >
    <!-- ref绑定表单校验 -->

    <el-tabs :stretch="true" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="登录" name="login">
        <h3 class="login_title">系统登录</h3>
        <el-form-item prop="name">
          <el-input type="text" v-model="loginForm.name" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            auto-complete="off"
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <el-checkbox class="login_remember" v-model="checked" label-position="left">记住密码</el-checkbox>
        <el-form-item style="width: 100%">
          <el-button type="primary" style="width: 100%" @click="doLogin('loginForm')">登录</el-button>
        </el-form-item>
      </el-tab-pane>

      <el-tab-pane label="注册" name="register">
        <h3 class="login_title">账户登录</h3>
        <el-form-item prop="name">
          <el-input type="text" v-model="loginForm.name" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            auto-complete="off"
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <el-form-item style="width: 100%">
          <el-button type="primary" style="width: 100%" @click="doRegister('loginForm')">注册</el-button>
        </el-form-item>
      </el-tab-pane>
    </el-tabs>
  </el-form>
</template>
<script>

export default {
  data() {
    return {
      activeName: "login", //加载页面时首先进入登录的tab窗口
      // loading: true,
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      checked: true,
      loginForm: {
        //初始化数据
        name: "",
        password: ""
      },
      loading: false
    };
  },
  methods: {
    doLogin(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          var _this = this;
          this.loading = true;
          this.postRequest("/login", {
            name: this.loginForm.name,
            password: this.loginForm.password
          }).then(resp => {
            _this.loading = false;
            if (resp && resp.status == 200) {
              var data = resp.data;
              _this.$store.commit("login", data.obj);
              var path = _this.$route.query.redirect;
              _this.$router.replace({
                path: path == "/" || path == undefined ? "/home" : path
              });
            }
          });
        }
      });
    },

    doRegister(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          var _this = this;
          this.loading = true;
          this.postRequest("/register", {
            name: this.loginForm.name,
            password: this.loginForm.password
          }).then(resp => {
            _this.loading = false;
            if (resp && resp.status == 200) {
              var data = resp.data;
              _this.$store.commit("login", data.obj);
              var path = _this.$route.query.redirect;
              _this.$router.replace({
                path: path == "/" || path == undefined ? "/home" : path
              });
            }
          });
        }
      });
    },

   
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>



<style>
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
.login_remember {
  margin: 0px 0px 35px 0px;
  text-align: left;
}

.el-tabs.el-tabs__item {
  font-size: 18px;
  margin: 5px auto;
}

.el-tabs__nav {
  font-size: 18px;
}


</style>