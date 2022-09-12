<template>
  <div class="shouye">
    <div class="row">
      <div v-for="(item, index) in users" :key="index">
        <a :href="item.href">
          <div class="row-item">
            <div class="total">{{ item.total }}</div>
            <div class="number">{{ item.price }}</div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "MyShouye",
  data() {
    return {
      user: "",
      order: "",
      product: "",
      users: [
        {
          href: "/home/yonghu",
          total: "用户总数",
          price: 0,
        },
        {
          href: "/home/shangpin",
          total: "商品总数",
          price: 0,
        },
        {
          href: "/home/dingdan",
          total: "订单数",
          price: 0,
        },
      ],
    };
  },
  created() {
    axios.get("/api/manage/statistic/base_count.do").then((res) => {
      console.log(res.data.data);
      const data = res.data.data;
      this.users[0].price = data.userCount.toLocaleString();
      this.users[1].price = data.productCount.toLocaleString();
      this.users[2].price = data.orderCount.toLocaleString();
    });
  },
};
</script>
<style lang="scss">
.shouye {
  margin: 20px;
  padding: 40px;
  min-height: 360px;
  .row {
    margin-left: -20px;
    margin-right: -20px;
    height: auto;
    position: relative;
    div {
      box-sizing: border-box;
      width: 33.33%;
      height: 168.4px;
      padding-left: 20px;
      padding-right: 20px;
      display: block;
      float: left;
      // border: 1px solid red;
      a {
        text-decoration: none;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        .row-item {
          margin: 0;
          padding: 0;
          width: 100%;
          color: rgba(0, 0, 0, 0.65);
          font-size: 14px;
          position: relative;
          background: #fff;
          border-radius: 2px;
          .total {
            min-height: 48px;
            margin-bottom: -1px;
            padding: 16px 24px;
            color: rgba(0, 0, 0, 0.85);
            text-align: left;
            font-weight: 500;
            font-size: 16px;
            background: transparent;
            border-bottom: 1px solid #e8e8e8;
            border-radius: 2px 2px 0 0;
            height: 57px;
            width: 100%;
            display: block;
          }
          .number {
            width: 100%;
            height: 112.4px;
            display: block;
            font-size: 24px;
            font-weight: bold;
            padding: 24px;
            text-align: left;
          }
        }
      }
    }
  }
}
</style>
