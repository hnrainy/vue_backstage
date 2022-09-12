<template>
  <div>
    <div class="top">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home/shouye' }"
          >首页</el-breadcrumb-item
        >
        <el-breadcrumb-item>商品</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/home/shangpin' }"
          >商品列表</el-breadcrumb-item
        >
        <el-breadcrumb-item>商品详情</el-breadcrumb-item>
      </el-breadcrumb>
      <h2>商品详情</h2>
    </div>
    <div class="bottom">
      <p>商品基本信息</p>
      <div>
        名称：<span>{{ list.name }}</span>
      </div>
      <div>
        标题：<span>{{ list.subtitle }}</span>
      </div>
      <div>
        商品分类：<span>{{ text }}-{{ text2 }}</span>
      </div>
      <div>
        价格：<span>￥ {{ list.price }}</span>
      </div>
      <div>
        上架状态：<span>{{ list.status == 1 ? "上架" : "下架" }}</span>
      </div>
      <div>
        库存：<span>{{ list.stock }}</span>
      </div>
      <p>商品基本信息</p>
      <div v-html="list.detail"></div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "MyXiangqing",
  data() {
    return {
      id: 0,
      childId: 0,
      list: [],
      text: "",
      text2: "",
    };
  },
  methods: {
    getOne() {
      return axios
        .get("/api/manage/category/get_category.do?categoryId=0")
        .then((res) => {
          res.data.data.forEach((item) => {
            if (this.list.parentCategoryId !== 0) {
              if (item.id == this.list.parentCategoryId) {
                this.text = item.name;
              }
            } else {
              this.text == "无";
            }
          });
        });
    },
  },
  created() {
    this.id = this.$route.params.id;

    axios
      .get("/api/manage/product/detail.do?productId=" + this.id)
      .then((res) => {
        this.list = res.data.data;
        this.getOne();
        axios
          .get(
            "/api/manage/category/get_category.do?categoryId=" +
              this.list.parentCategoryId
          )
          .then((res) => {
            res.data.data.forEach((item) => {
              if (this.list.categoryId !== 0) {
                if (item.id == this.list.categoryId) {
                  this.text2 = item.name;
                  // console.log("text2", item.name);
                }
              } else {
                this.text2 == "无";
              }
            });
          });
      });
  },
};
</script>
<style lang="scss" scoped>
.top {
  padding: 20px 0 10px 30px;
  background: #fff;
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
  font-weight: 200;
  .el-breadcrumb {
    .el-breadcrumb__item {
      .el-breadcrumb__inner {
        font-weight: 200;
      }
    }
  }
  h2 {
    margin-top: 10px;
    text-align: left;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
    margin-bottom: 10px;
  }
}
.bottom {
  margin: 20px;
  padding: 40px;
  background: #fff;
  min-height: 360px;
  p {
    width: 100%;
    text-align: left;
    font-size: 16px;
    float: left;
    margin-bottom: 15px;
  }
  div {
    text-align: left;
    float: left;
    width: 33.33%;
    height: 56px;
    span {
      color: #8e8989;
    }

    &:last-child {
      width: 100%;
      text-align: center;
      line-height: 20px;
      height: auto;
    }
  }
}
</style>
