<template>
  <div id="log">
    <div class="login">
      <div class="login-item">
        <i class="el-icon-user"></i>
        <input type="text" placeholder="账号为 admin" v-model.trim="username" />
      </div>
      <div class="login-item">
        <i class="el-icon-lock"></i>
        <input type="text" placeholder="密码为 admin" v-model.trim="password" />
      </div>
      <div class="login-item">
        <el-button type="submit" :plain="true" class="btn" @click="login">
          <span>登&nbsp;录</span>
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "MyLogin",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      axios({
        method: "post",
        url: "/api/manage/user/login.do",
        params: {
          username: this.username,
          password: this.password,
        },
      }).then((res) => {
        console.log(res);
        if (res.data.msg == "登录成功") {
          this.$router.push("/home");
          this.$message({
            // showClose: true,
            message: "登录成功",
            type: "success",
            center: true,
          });
        } else {
          //   alert("账号或密码错误");
          this.$message({
            // showClose: true,
            message: "账号或密码错误",
            type: "error",
            center: true,
          });
          this.username = "";
          this.password = "";
        }
      });
    },
  },
};
</script>
<style lang="scss">
#log {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg);
  box-sizing: border-box;
  .login {
    width: 300px;
    height: 160px;
    .login-item {
      width: 100%;
      height: 32px;
      margin-bottom: 24px;
      background: white;
      margin-top: 6px;
      border-radius: 4px;
      position: relative;
      i {
        position: absolute;
        top: 50%;
        left: 12px;
        z-index: 2;
        display: flex;
        align-items: center;
        transform: translateY(-50%);
      }
      input {
        position: relative;
        text-align: inherit;
        padding-left: 30px;
        min-height: 100%;
        outline: none;
        border: none;
      }
      .btn {
        width: 100%;
        height: 100%;
        background-color: #1890ff;
        border-radius: 4px;

        span {
          color: white;
        }
      }
    }
  }
}
</style>
