<template>
  <div>
    <!-- <router-view></router-view> -->
    <div class="top">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home/shouye' }"
          >首页</el-breadcrumb-item
        >
        <el-breadcrumb-item>订单</el-breadcrumb-item>

        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      </el-breadcrumb>
      <h2>订单管理</h2>
    </div>
    <div class="bottom">
      <div class="form">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="订单号">
            <el-input v-model="formInline.user"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button @click="formInline.user = ''">清空</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="table">
        <el-table :data="tableData">
          <el-table-column prop="orderNo" label="订单号" min-width="130">
          </el-table-column>
          <el-table-column prop="receiverName" label="收件人">
          </el-table-column>
          <el-table-column prop="statusDesc" label="订单状态">
          </el-table-column>
          <el-table-column prop="payment" label="订单总价"> </el-table-column>
          <el-table-column prop="createTime" label="创建时间" min-width="150">
          </el-table-column>
          <el-table-column prop="" label="操作">
            <template slot-scope="scope">
              <el-button @click="ckxq(scope.row)" class="btn"
                >查看详情</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="three">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          @current-change="click"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "MyDingdan",
  data() {
    return {
      formInline: {
        user: "",
        region: "",
      },
      tableData: [],
      ye: 1,
      total: 0,
    };
  },
  methods: {
    search() {
      console.log(this.formInline.user);
      axios
        .get("/api/manage/order/search.do?orderNo=" + this.formInline.user)
        .then((res) => {
          // console.log(res);
          const data = res.data.data;
          this.tableData = data.list;
          this.total = data.total;
          console.log(data);
        });
    },
    click(e) {
      // console.log(e);
      this.ye = e;
      this.get();
    },
    ckxq(row) {
      const num = row.orderNo;
      // console.log(row);
      this.$router.push({
        name: "dingdanxiangqing",
        params: {
          num
        },
      });
    },
    get() {
      axios
        .get("/api/manage/order/list.do?pageSize=10&pageNum=" + this.ye)
        .then((res) => {
          // console.log(res);
          const data = res.data.data;
          this.total = data.total;
          this.tableData = data.list;
          // console.log(data);
        });
    },
  },
  created() {
    this.get();
  },
};
</script>
<style lang="scss">
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
  .form {
    margin-bottom: 30px;
    width: 100%;
    margin-left: -12px;
    margin-right: -12px;
    .el-form {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      color: rgba(0, 0, 0, 0.65);
      font-size: 14px;
      font-variant: tabular-nums;
      line-height: 1.5;
      list-style: none;
      float: left;
      width: 100%;
      .xz {
        margin-right: 770px;
      }
      .el-form-item {
        &:nth-child(1) {
          float: left;
          padding-left: 12px;
          padding-right: 12px;
          min-width: 33.33%;
        }
        &:nth-child(2) {
          float: right;
          // margin-left: 180px;
        }
        &:nth-child(3) {
          float: right;
        }
        &:nth-child(4) {
        }

        .el-button {
          padding: 0px;
          width: 63.84px;
          height: 32px;
          line-height: 32px;
        }
      }
    }
  }
  .table {
    .el-table {
      .el-table__body {
        width: 750px;
      }
      th.el-table__cell {
        background: #fafafa;
        border-bottom: 1px solid #e8e8e8;
      }
      th.el-table__cell > .cell {
        padding: 0px;
      }
      .cell {
        padding: 0px;
        // width: 120px;
        // display: block;
        white-space: pre-wrap;
        .btn {
          // padding: 0px;
          // margin: 0px;
          padding-left: 0px;
          border: none;
          background: none;
          color: #1890ff;
          width: 53px;
          // display: block;
          // float: left;
          position: relative;
          &:nth-child(2) {
            margin-left: 0px;
            padding-left: 0px;
          }
          span {
            position: absolute;
            left: 2px;
            top: 0;
            width: 18px;
            display: inline-block;
            font-size: 14px;
          }
          a {
            text-decoration: none;
            color: #1890ff;
          }
        }
        .button {
          left: 51px;
          background: #fff;
          border: 1px solid #efefef;
          position: absolute;
          box-sizing: border-box;
          width: 88px;
          height: 32px;
          line-height: 9px;
          // text-align: center;
          padding: 0 0;
        }
      }
    }
  }
  .three {
    display: block;
    float: right;
    margin: 16px 0;
    .el-pagination {
      font-weight: 400;
      .btn-prev {
        border: 1px solid #efefef;
        padding: 0;
        margin: 0 6px;
        min-width: 30px;
        border-radius: 5px;
      }
      .btn-next {
        border: 1px solid #efefef;
        padding: 0;
        margin: 0 6px;
        min-width: 30px;
        border-radius: 5px;
      }
      .el-pager {
        .number {
          border: 1px solid #efefef;
          border-radius: 5px;
          padding: 0;
          margin: 0 4px;
          // width: 30px;
          min-width: 30px;
        }
      }
    }
  }
}
</style>
