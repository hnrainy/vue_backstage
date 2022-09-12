<template>
  <div class="header">
    <div class="div">
      <span
        ><img
          src="	https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          alt=""
        />admin</span
      >
      <div class="box">
        <el-button :plugin="true" @click="open"
          ><a href="/login">退出登录</a></el-button
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MyHeader",
  methods: {
    open() {
      this.$message({
        message: "正在退出登录",
        type: "success",
      });
    },
  },
};
</script>
<style lang="scss">
.header {
  height: 100%;
  padding-right: 30px;
  text-align: right;
  position: relative;
  .div {
    &:hover {
      .box {
        display: block;
      }
    }
    span {
      display: block;
      float: right;
      height: 65px;
      width: 85px;

      img {
        width: 32px;
        height: 32px;
        vertical-align: middle;
        margin-right: 10px;
      }
    }
    .box {
      display: none;
      width: 81px;
      height: 35px;
      position: absolute;
      // border: 1px solid red;
      right: 25px;
      top: 65px;
      background: #fff;
      border-radius: 3px;
      box-shadow: rgb(0 25 48 / 8%) 6px 5px 7px;

      .el-button {
        padding: 0px;
        position: absolute;
        //   display: flex;
        right: 0px;
        margin-top: 3px;

        text-align: center;
        width: 81px;
        height: 30px;
        top: 0px;
        //   margin-top: -2px;
        border: none;
        background: #fff;
        &:hover {
          // background: skyblue;
          background: rgb(164, 218, 238);
        }
        a {
          display: block;
          width: 81px;
          height: 35px;
          text-align: center;
          line-height: 35px;
          text-decoration: none;
          color: black;
        }
      }
    }
  }
}
</style>
