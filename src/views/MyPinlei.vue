<template>
  <div>
    <div class="top">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home/shouye' }"
          >首页</el-breadcrumb-item
        >
        <el-breadcrumb-item>一级品类管理</el-breadcrumb-item>
      </el-breadcrumb>
      <h2>一级品类管理</h2>
    </div>
    <div class="bottom">
      <el-button
        type="primary"
        style="
          float: left;
          margin-bottom: 20px;
          width: 63px;
          height: 32px;
          line-height: 0px;
        "
        @click="dialogFormVisible = true"
        >新增</el-button
      >
      <div class="table">
        <el-table :data="list.slice((ye - 1) * page, ye * page)">
          <el-table-column prop="name" label="名称" min-width="167">
          </el-table-column>
          <el-table-column
            prop=""
            label="操作"
            width="150"
            style="float: right"
          >
            <template slot-scope="scope">
              <el-button @click="xg(scope.row)" class="btn"
                >修改&nbsp;</el-button
              >
              |

              <el-button @click="ck(scope.row)" class="btn"
                >查看子分类</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="three">
        <el-pagination
          @size-change="handleSizeChange"
          layout="prev, pager, next"
          :total="total"
          @current-change="click"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 弹出框新增 -->

    <el-dialog
      title="新增品类"
      style="text-align: left"
      width="520px"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        :model="form"
        ref="form"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="父级品类" :label-width="formLabelWidth" required>
          <el-select
            v-model="form.region"
            placeholder="请选择父级品类"
            style="width: 100%"
          >
            <div v-for="(item, index) in list" :key="index">
              <el-option :label="item.name" :value="item.id" :key="item.id">
                <p>{{ item.name }}</p>
              </el-option>
            </div>
          </el-select>
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth" required>
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="add">OK</el-button>
      </div>
    </el-dialog>
    <!-- 弹出框 修改 -->
    <el-dialog
      :title="'修改品类' + form1.name + '名称'"
      width="520px"
      style="text-align: left"
      :visible.sync="dialogFormVisibleTwo"
    >
      <el-form
        :model="form1"
        ref="form1"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="名称" :label-width="formLabelWidth" required>
          <el-input v-model="form1.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleTwo = false">Cancel</el-button>
        <el-button type="primary" @click="xiugaiClick">OK</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "MyPinlei",
  data() {
    return {
      list: [],
      ye: 1,
      total: 0,
      page: 10,
      dialogFormVisible: false,
      dialogFormVisibleTwo: false,
      form: {
        name: "",
        region: "",
        id: 0,
      },
      form1: {
        name: "",
        id: 0,
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    click(e) {
      // console.log(e);
      this.ye = e;
      this.get();
    },
    handleSizeChange(val) {
      this.page = val;
    },
    ck(row) {
      // console.log(row);
      const id = row.id;
      this.$router.push({ name: "zipinlei", params: { id } });
    },
    xg(row) {
      // console.log(row);
      // console.log(row.name);
      this.form1.id = row.id;
      this.form1.name = row.name;
      this.dialogFormVisibleTwo = true;
    },
    xiugaiClick() {
      this.dialogFormVisibleTwo = false;
      let formData = new FormData();
      formData.append("categoryId", this.form1.id);
      formData.append("categoryName", this.form1.name);

      fetch("/api/manage/category/set_category_name.do", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then(() => {
          // console.log(res);
          this.$message({
            message: "更新品类名字成功",
            type: "success",
          });
          this.get();
        });
    },
    get() {
      axios
        .get("/api/manage/category/get_category.do?&categoryId=0")
        .then((res) => {
          // console.log(res);
          this.list = res.data.data;
          // console.log(this.list);
          this.total = res.data.data.length;
        });
    },
    add() {
      this.dialogFormVisible = false;
      let formData = new FormData();
      formData.append("parentId", this.form.region);
      formData.append("categoryName", this.form.name);
      fetch("/api/manage/category/add_category.do", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then(() => {
          // console.log(res);
          this.$message({
            message: "商品修改成功",
            type: "success",
          });
          this.get();
        });
    },
  },
  created() {
    this.get();
  },
};
</script>
<style lang="scss">
div {
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
        }
        .cell {
          padding: 0px;
          width: 200px;
          display: block;
          .btn {
            // padding: 0px;
            // margin: 0px;
            padding-left: 0px;
            padding-right: 0px;
            border: none;
            background: none;
            color: #1890ff;
            width: 25px;
            // display: block;
            // float: left;
            position: relative;
            &:nth-child(2) {
              margin-left: 0px;
              padding-left: 0px;
            }
            span {
              position: absolute;
              left: 0px;
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
}
</style>
