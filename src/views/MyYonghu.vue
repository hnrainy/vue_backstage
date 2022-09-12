<template>
  <div>
    <div class="top">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home/shouye' }"
          >首页</el-breadcrumb-item
        >
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
      <h2>用户列表</h2>
    </div>
    <div class="bottom">
      <div class="table">
        <el-table :data="list">
          <el-table-column prop="username" label="账号" min-width="100">
          </el-table-column>
          <el-table-column prop="phone" label="电话" min-width="130">
          </el-table-column>
          <el-table-column prop="email" label="邮箱" min-width="170">
          </el-table-column>
          <el-table-column
            prop="createTime"
            :formatter="formatDate"
            label="注册时间"
            min-width="150"
          >
          </el-table-column>
          <el-table-column prop="" label="Action" min-width="150">
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
  name: "MyYonghu",
  data() {
    return {
      list: [],
      ye: 1,
      total: 0,
    };
  },
  methods: {
    click(e) {
      this.ye = e;
      this.get();
    },
    // currentSize(){

    // },
    get() {
      axios
        .get("/api/manage/user/list.do?pageSize=10&pageNum=" + this.ye)
        .then((res) => {
          this.list = res.data.data.list;
          this.total = res.data.data.total;
        });
    },
    formatDate(row, column, cellValue) {
      if (cellValue == null || cellValue == "") return "";
      let date = new Date(parseInt(cellValue));
      let Y = date.getFullYear() + "/";
      let M =
        date.getMonth() + 1 < 10
          ? date.getMonth() + 1 + "/"
          : date.getMonth() + 1 + "/";
      let D = date.getDate() < 10 ? date.getDate() + " " : date.getDate() + " ";

      return Y + M + D;
    },
  },
  created() {
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
  padding: 40px 40px 100px 40px;

  background: #fff;
  min-height: 360px;
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
        // width: 150px;
      }
      .cell {
        padding: 0px;

        .btn {
          border: none;
          background: none;
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
