<template>
  <div>
    <div class="one">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home/shouye' }"
          >首页</el-breadcrumb-item
        >
        <el-breadcrumb-item>商品</el-breadcrumb-item>
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      </el-breadcrumb>
      <h2>商品列表</h2>
    </div>
    <div class="two">
      <div class="form">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="关键词">
            <el-input v-model="formInline.user"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button @click="formInline.user = ''">清空</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">搜索</el-button>
          </el-form-item>
          <br />
          <el-form-item>
            <el-button
              type="primary"
              class="xz"
              @click="$router.push({ name: 'xinzeng' })"
              >新增</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div class="table">
        <el-table :data="tableData">
          <el-table-column prop="name" label="名称" min-width="167">
          </el-table-column>
          <el-table-column prop="subtitle" label="标题" min-width="163">
          </el-table-column>
          <el-table-column prop="price" label="价格" min-width="100">
          </el-table-column>
          <el-table-column prop="status" label="商品状态" min-width="170">
            <template slot-scope="scope">
              <div
                style="
                  width: 100px;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                "
              >
                <!-- -->
                <span>{{ scope.row.status == 1 ? "在售" : "已下架" }}</span>
                <el-button class="button" @click="reverse(scope.row)">{{
                  scope.row.status == 1 ? "设置下架" : "设置上架"
                }}</el-button>
                <!--  -->
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="" label="操作" min-width="100">
            <template slot-scope="scope">
              <!-- <button @click="ckxq(scope.row)" class="btn">
                <a href="">查看详情&nbsp;</a>
              </button> -->
              <el-button @click="ckxq(scope.row)" class="btn"
                >查看详情&nbsp;</el-button
              >
              |
              <el-button @click="bj(scope.row)" class="btn">编辑</el-button>
              <!-- <button @click="bj(scope.row)" class="btn">
                <a href="">编辑</a>
              </button> -->
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
  name: "MyShangpin",
  data() {
    return {
      formInline: {
        user: "",
        region: "",
      },
      tableData: [],
      ye: 1,
      total: 0,
      status: 0,
    };
  },
  methods: {
    search() {
      this.gets();
    },
    gets() {
      axios
        .get(
          `/api/manage/product/search.do?pageSize=10&pageNum=${this.ye}&productName=${this.formInline.user}`
        )
        .then((res) => {
          // console.log(res);
          this.tableData = res.data.data.list;
          this.total = res.data.data.total;
        });
    },
    ckxq(row) {
      const id = row.id;
      // console.log(row);
      this.$router.push({
        name: "xiangqing",
        params: {
          id,
        },
      });
    },
    bj(row) {
      const id = row.id;
      this.$router.push({
        name: "bianji",
        params: {
          id,
        },
      });
    },
    reverse(row) {
      if (row.status == 1) {
        this.status = 2;
      } else {
        this.status = 1;
      }
      let formData = new FormData();
      formData.append("productId", row.id);
      formData.append("status", this.status);
      fetch("/api/manage/product/set_sale_status.do", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then(() => {
          // console.log(res);
          this.$message({
            message: "修改商品状态成功",
            type: "success",
          });
          this.get();
        });
      // console.log(row);
    },
    click(e) {
      this.ye = e;
      if (this.formInline.user == "") {
        this.get();
      } else {
        this.gets();
      }
    },
    get() {
      axios
        .get("/api/manage/product/list.do?pageSize=10&pageNum=" + this.ye)
        .then((res) => {
          console.log("get");
          this.tableData = res.data.data.list;
          this.total = res.data.data.total;
        });
    },
  },
  created() {
    this.get();
  },
  watch: {},
};
</script>
<style lang="scss">
.one {
  padding: 20px 0 10px 30px;
  background: #fff;
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
  font-weight: 200;
  h2 {
    margin-top: 10px;
    text-align: left;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
    margin-bottom: 10px;
  }
  .el-breadcrumb {
    .el-breadcrumb__item {
      .el-breadcrumb__inner {
        font-weight: 200;
      }
    }
  }
}
.two {
  margin: 20px;
  padding: 40px;
  padding-bottom: 100px;

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
          // width: 33.33%;
          min-width: 33.33%;
          display: block;
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
        white-space: pre-wrap;

        padding: 0px;
        min-width: 120px;
        display: block;
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
            left: -1px;
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
