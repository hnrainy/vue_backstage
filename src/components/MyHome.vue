<template>
  <div class="box">
    <!-- <h1>hello world</h1> -->
    <el-container>
      <el-aside width="">
        <div class="empty"></div>
        <div :style="isCollapse ? width2 : width1">
          <el-menu
            :default-active="index"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            background-color="#001529"
            text-color="#fff"
            active-text-color="white"
            min-width="80px"
            :unique-opened="true"
            :collapse-transition="true"
          >
            <el-submenu v-for="item in lists" :key="item.id" :index="item.id">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item :index="item.name" @click="handerClick(item.id)"
                  ><i :class="item.icon2"></i>{{ item.label }}</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </div>
        <div @click="isshow" class="btn" :style="isCollapse ? width2 : width1">
          <span class="el-icon-arrow-left" v-show="!isCollapse"></span>
          <span class="el-icon-arrow-right" v-show="isCollapse"></span>
        </div>
      </el-aside>

      <el-container>
        <el-header>
          <Header />
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer><span>Copyright © 2022 实训十七班</span></el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Header from "./MyHeader.vue";
export default {
  name: "MyHome",
  components: { Header },
  data() {
    return {
      isCollapse: false,
      width1: { width: "200px" },
      width2: { width: "80px" },
      index: "",
      lists: [
        {
          id: "0",
          icon: "el-icon-monitor",
          title: "仪表盘",
          label: "首页",
          icon2: "el-icon-s-home",
          name: "shouye",
        },
        {
          id: "1",
          icon: "el-icon-shopping-bag-2",
          title: "商品",
          label: "商品管理",
          icon2: "el-icon-news",
          name: "shangpin",
        },
        {
          id: "2",
          icon: "el-icon-guide",
          title: "品类",
          label: "品类管理",
          icon2: "el-icon-news",
          name: "pinlei",
        },
        {
          id: "3",
          icon: "el-icon-news",
          title: "订单",
          label: "订单管理",
          icon2: "el-icon-news",
          name: "dingdan",
        },
        {
          id: "4",
          icon: "el-icon-user",
          title: "用户",
          label: "用户管理",
          icon2: "el-icon-news",
          name: "yonghu",
        },
      ],
    };
  },
  methods: {
    handerClick(id) {
      this.$router.push({ name: this.lists[id].name }).catch((err) => {
        console.log(err);
      });
    },
    isshow() {
      this.isCollapse = !this.isCollapse;
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        // console.log(val);
        this.index = this.$route.name;
      },
    },
  },
};
</script>
<style lang="scss">
.box {
  width: 100%;
  height: 100vh;
  h1 {
    width: 100%;
    color: rgba(0, 0, 0, 0.85);
    height: 41.6px;
    margin-top: 0px;
    margin-bottom: 14px;
  }
  .el-container {
    width: 100%;
    height: 100vh;
    .el-aside {
      background: #001529;
      color: #fff;
      text-align: center;
      .empty {
        height: 32px;
        background: rgba(255, 255, 255, 0.2);
        margin: 16px;
      }
      .el-submenu__title {
        height: 44px;
        line-height: 44px;
        text-align: left;
      }
      .el-menu {
        height: 40px;
        .el-menu-item-group__title {
          padding: 0px;
        }
        .el-menu-item.is-active {
          background: #1890ff !important;
          width: 100%;
          height: 40px;
          line-height: 40px;
          i {
            color: white;
          }
        }
      }
      .btn {
        display: flex;
        justify-content: center;
        align-items: center;
        display: block;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 1;
        height: 48px;
        color: #fff;
        line-height: 48px;
        background: #001529;
        // border: 1px solid red;
        // width: 200px;
        cursor: pointer;
        text-align: center;
        // width: 200px;
      }

      .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
      }
    }
    .el-footer {
      text-align: center;
      color: rgba(0, 0, 0, 0.65);
      font-size: 14px;
      background: #f0f2f5;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .el-header {
      background: white;
      box-shadow: rgb(0 21 41 / 8%) 0px 1px 4px;
      position: relative;
      height: 64px;
      padding: 0 50px;
      line-height: 64px;
    }

    .el-main {
      background: #f0f2f5;
      color: #333;
      text-align: center;
    }
  }
}
</style>
