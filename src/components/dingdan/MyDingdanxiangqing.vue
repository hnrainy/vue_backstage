<template>
  <div>
    <div class="top">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home/shouye' }"
          >首页</el-breadcrumb-item
        >
        <el-breadcrumb-item>订单</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/home/dingdan' }"
          >订单管理</el-breadcrumb-item
        >
        <el-breadcrumb-item>订单详情</el-breadcrumb-item>
      </el-breadcrumb>
      <h2>订单详情</h2>
    </div>
    <div class="bottom">
      <p>订单基本信息</p>
      <div>
        订单号：<span>{{ list.orderNo }}</span>
      </div>
      <div>
        创建时间:<span>{{ list.createTime }}</span>
      </div>
      <div>
        支付状态：<span>{{ list.statusDesc }}</span>
      </div>
      <div>
        支付方式：<span>{{ list.paymentTypeDesc }}</span>
      </div>
      <div>
        订单金额：<span>￥{{ list.payment }}</span>
      </div>
      <hr style="width: 100%; border: 1px solid #e8e8e8" />

      <p>收件人信息</p>
      <div
        :style="[
          { width: '100%' },
          { display: lists.receiverName ? 'block' : 'none' },
        ]"
      >
        <div>
          收件人：<span>{{ lists.receiverName }}</span>
        </div>
        <div>
          联系电话：<span>{{
            lists.receiverPhone == null ? "无" : lists.receiverPhone
          }}</span>
        </div>
        <div>
          收货地址：<span
            >{{ lists.receiverProvince }}-{{ lists.receiverCity }}-{{
              lists.receiverAddress
            }}</span
          >
        </div>
        <div>
          邮政编码：<span>{{ lists.receiverZip }}</span>
        </div>
      </div>
      <div></div>
      <hr style="width: 100%; border: 1px solid #e8e8e8" />
      <p>商品信息</p>
      <div style="width: 100%; height: 160px">
        <el-table :data="tableData" style="width: 100%; height: 100%">
          <el-table-column prop="date" label="图片" width="180">
            <template slot-scope="scope">
              <div style="width: 100%; height: 100%">
                <img :src="scope.row.productImage" alt="." title="" />
                <span style="color: #606266">{{ scope.row.productName }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="productName" label="名称" width="180">
          </el-table-column>
          <el-table-column prop="currentUnitPrice" label="单价">
          </el-table-column>
          <el-table-column prop="quantity" label="数量"> </el-table-column>
          <el-table-column prop="totalPrice" label="总价"> </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "MyDingdanxiangqing",
  data() {
    return {
      list: [],
      lists: {
        receiverName: "",
        receiverPhone: "",
        receiverProvince: "",
        receiverZip: "",
      },
      tableData: [],
      orderNo: 0,
    };
  },
  methods: {
    get() {
      axios
        .get("/api/manage/order/detail.do?orderNo=" + this.orderNo)
        .then((res) => {
          console.log(res);
          this.list = res.data.data;
          this.tableData = res.data.data.orderItemVoList;
          if (res.data.data.shippingVo !== null) {
            this.lists = res.data.data.shippingVo;
          } else {
            return;
          }
        });
    },
  },
  created() {
    this.orderNo = this.$route.params.num;
    this.get();
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
  //   .el-breadcrumb__inner.is-link {
  //     font-weight: none !important;
  //   }
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
  padding-bottom: 100px;
  background: #fff;
  min-height: 520px;
  p {
    width: 100%;
    text-align: left;
    font-size: 16px;
    float: left;
    margin-bottom: 15px;
    margin-top: 20px;
  }
  div {
    text-align: left;
    float: left;
    width: 33.33%;
    height: 56px;
    span {
      color: #8e8989;
    }
  }
}
</style>
