<template>
  <div class="login-demo">
    <div class="login-wrap">
      <el-row type="flex" justify="center">
        <!-- 登录框 -->
        <el-form ref="loginForm" :rules="formRules" :model="user" status-icon label-width="70px">
          <el-tabs :stretch="true" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="登录" name="login">
              <el-form-item prop="username" label="用户名">
                <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item prop="password" label="密码">
                <el-input v-model="user.password" show-password placeholder="请输入密码">
                  <template slot="prepend"></template>
                </el-input>
              </el-form-item>
              <el-checkbox id="savePassword" checked="checked" @click="savePassword()">记住密码</el-checkbox>
              <router-link to="/forgetPassword">忘记密码</router-link>
              <br />
              <br />
              <el-form-item>
                <el-button type="primary" @click="doLogin('loginForm')">登 录</el-button>
              </el-form-item>
            </el-tab-pane>

            <!-- 注册框 -->
            <el-tab-pane label="注册" name="register">
              <el-form-item prop="username" label="用户名">
                <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item prop="email" label="邮箱">
                <el-input v-model="user.email" placeholder="请输入邮箱"></el-input>
              </el-form-item>
              <el-form-item prop="password" label="设置密码">
                <el-input v-model="user.password" show-password placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" icon @click="doRegister('loginForm')">注册账号</el-button>
              </el-form-item>
            </el-tab-pane>
          </el-tabs>
        </el-form>
      </el-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "login",
  data() {
    return {
      activeName: "login",
      checked: false,
      user: {
        username: "",
        password: ""
      },
      // 通过 formRules 属性传入约定的验证规则
      formRules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            type: "string",
            min: 6,
            message: "密码不能小于6位",
            trigger: "blur"
          }
        ],
        // bug--由于此处登录和注册共用一个el-form，因此只能绑定一个rules,如果邮箱设置为必填，将导致无法登陆。一般情况下，将登录和注册分别放在不同的el-form中，为它们设置不同的rules
        email: [
          // { required: true, message: "请输入邮箱地址", trigger: "blur"  },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  created() {},
  methods: {
    // 登录
    doLogin(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          axios
            .post("/submitLogin/", {
              // .post("/api/login/", {
              name: this.user.username,
              password: this.user.password
            })
            .then(res => {
              //  console.log("输出response.data", res.data);
              if (res.data.status === 200) {
                this.$router.push({ path: "/welcome" });
              } else {
                this.$message.error(res.data.msg);
              }
            });
        } else {
          return false;
        }
      });
    },
    // 注册账号
    doRegister(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          console.log(valid);
          axios
            .post("/submitRegister/", {
              name: this.user.username,
              email: this.user.email,
              password: this.user.password
            })
            .then(res => {
              // console.log("输出response.data", res.data);
              if (res.data.status === 200) {
                this.$message.success(res.data.msg);
                this.activeName = "login";
              } else {
                this.$message.error(res.data.msg);
              }
            });
        } else {
          return false;
        }
      });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 记住密码
    savePassword() {
      if (document.getElementById("savePassword").checked) {
        var username = this.user.username;
        var password = this.user.password;
        wind;
        ow.sessionStorage.username = username;
        window.sessionStorage.password = password;
        localStorage.rmbPassword = true;
      } else {
        localStorage.rmbPassword = false;
      }
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 公共样式 */
li {
  list-style: none;
  float: left;
}

.login-demo {
  position: fixed;
  width: 100%;
  height: 100%;
  /* background: url("../assets/images/bg2.png") no-repeat; */
  background-size: cover;
  top: 0px;
  left: 0px;
  overflow: hidden;
}

.login-wrap {
  /* background: url("../assets/images/login_bg.png") no-repeat; */
  width: 400px;
  height: 310px;
  margin: 175px auto;
  margin-left: 272px;
  border-radius: 6px;
  line-height: 20px;
  padding-top: 0px;
}

.el-tabs.el-tabs__item {
  font-size: 18px;
  margin: 5px auto;
}

.el-tabs__nav {
  font-size: 18px;
}

a {
  text-decoration: none;
  color: #606266;
  font-size: 14px;
  float: right;
}

a:hover {
  color: coral;
}

.el-checkbox {
  text-indent: 4px;
}
.el-form-item__label {
  padding: 0px 4px 0 0;
}

.el-checkbox__label {
  padding-left: 0px;
}

.el-button {
  width: 118%;
  margin-left: -40px;
  background-color: #16696a;
  letter-spacing: 5px;
  border: 0px;
}
</style>