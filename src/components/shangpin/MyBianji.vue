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
        <el-breadcrumb-item>{{
          this.id ? "修改商品" : "新增商品"
        }}</el-breadcrumb-item>
      </el-breadcrumb>
      <h2>{{ this.id ? "修改商品" : "新增商品" }}</h2>
    </div>
    <div class="bottom">
      <el-form :model="lists" class="demo-ruleForm">
        <el-form-item label="商品名称：" prop="name">
          <el-input v-model="lists.name"></el-input>
        </el-form-item>
        <el-form-item label="商品描述：" prop="region">
          <el-input v-model="lists.subtitle"></el-input>
        </el-form-item>
        <el-form-item label="商品一级分类：">
          <el-select
            v-model="value"
            placeholder="请选择商品一级分类"
            @change="Parent"
          >
            <el-option
              v-for="item in option"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品二级分类：">
          <el-select v-model="value1" placeholder="请选择商品二级分类">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="价格：" prop="delivery">
          <el-input-number
            v-model="lists.price"
            controls-position="right"
            @change="handleChangeOne"
            :min="1"
            :step="1"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="库存：" prop="delivery">
          <el-input-number
            v-model="lists.stock"
            controls-position="right"
            @change="handleChangeTwo"
            :min="1"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="上架状态：" prop="resource">
          <el-switch v-model="lists.status"></el-switch>
        </el-form-item>
        <el-form-item label="图片上传：" prop="desc">
          <el-upload
            class="upload"
            style="
              width: 102px;
              height: 102px;
              display: inline-block;
              float: left;
            "
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <img width="100%" :src="dialogImageUrl" alt="" />

            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="详情：" prop="desc" style="height: 650px">
          <quill-editor
            class="editor"
            ref="myTextEditor"
            v-model="content"
            :options="editorOption"
            @change="onEditorChange($event)"
          >
          </quill-editor>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            style="float: left; padding: 7px 17px"
            @click="submit"
            >{{ this.id ? "修改" : "提交" }}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
// import { nanoid } from "nanoid";
export default {
  name: "MyBianji",
  data() {
    return {
      id: 0,
      dialogImageUrl: "",
      dialogVisible: false,
      lists: {},
      option: {},
      options: {},
      value: "",
      value1: "",
      parentId: 0,
      // 富文本
      content: null,
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
            ["blockquote", "code-block"], // 引用  代码块
            [{ header: 1 }, { header: 2 }], // 1、2 级标题
            [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
            [{ script: "sub" }, { script: "super" }], // 上标/下标
            [{ indent: "-1" }, { indent: "+1" }], // 缩进
            // [{'direction': 'rtl'}],                         // 文本方向
            [{ size: ["small", false, "large", "huge"] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
            [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
            [{ font: [] }], // 字体种类
            [{ align: [] }], // 对齐方式
            ["clean"], // 清除文本格式
            ["link", "image", "video"], // 链接、图片、视频
          ], //工具菜单栏配置
        },
        placeholder: "请在这里添加产品描述", //提示
        readyOnly: false, //是否只读
        theme: "snow", //主题 snow/bubble
        syntax: true, //语法检测
      },
    };
  },
  methods: {
    // 值发生变化
    onEditorChange(editor) {
      this.content = editor.html;
      console.log(editor);
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleChangeOne(val) {
      console.log(val);
    },
    handleChangeTwo(val) {
      console.log(val);
    },
    handleRemove(a) {
      console.log(a);
    },

    Parent(val) {
      this.parentId = val;
      this.getChild();
    },

    get() {
      axios
        .get("/api/manage/product/detail.do?productId=" + this.id)
        .then((res) => {
          this.lists = res.data.data;
          console.log(this.lists);
          if (this.lists.status == 1) {
            this.lists.status = true;
          } else {
            this.lists.status = false;
          }
        });
    },
    getParent() {
      axios
        .get("/api/manage/category/get_category.do?categoryId=0")
        .then((res) => {
          this.option = res.data.data;
          // console.log(this.option);
        });
    },
    getChild() {
      axios
        .get("/api/manage/category/get_category.do?categoryId=" + this.parentId)
        .then((res) => {
          this.options = res.data.data;
        });
    },
    submit() {
      if (this.$route.params.id) {
        let formData = new FormData();
        formData.append("name", this.lists.name);
        formData.append("subtitle", this.lists.subtitle);
        formData.append("price", this.lists.price);
        formData.append("stock", this.lists.stock);
        if (this.lists.status == true) {
          this.lists.status = 1;
        } else if (this.lists.status == false) {
          this.lists.status = 2;
        }
        formData.append("status", this.lists.status);
        formData.append("detail", this.content);
        formData.append("levelOneCategoryId", this.value);
        formData.append(
          "subImages",
          "10b7c3cb-6841-4d11-96f7-0a6920808830.jpg"
        );
        formData.append("levelTwoCategoryId", this.value1);
        formData.append("categoryId", this.lists.categoryId);
        formData.append("id", this.lists.id);
        fetch("/api/manage/product/save.do", {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then(() => {
            if (this.value == "" || this.value1 == "") {
              console.log(this.value, this.value1);
              this.$message({
                message: "请选择商品一级或二级分类",
                type: "error",
              });
            } else {
              this.$message({
                message: "修改商品成功",
                type: "success",
              });
              this.$router.push({ name: "shangpin" });
            }
          });
      } else {
        let formData = new FormData();
        formData.append("name", this.lists.name);
        formData.append("subtitle", this.lists.subtitle);
        formData.append("price", this.lists.price);
        formData.append("stock", this.lists.stock);
        if (this.lists.status == true) {
          this.lists.status = 1;
        } else if (this.lists.status == false) {
          this.lists.status = 2;
        }
        formData.append("status", this.lists.status);
        formData.append("detail", this.content);
        formData.append("levelOneCategoryId", this.value);
        formData.append(
          "subImages",
          "10b7c3cb-6841-4d11-96f7-0a6920808830.jpg"
        );
        formData.append("levelTwoCategoryId", this.value1);
        formData.append("categoryId", this.value1);
        fetch("/api/manage/product/save.do", {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then(() => {
            if (this.value == "" || this.value1 == "") {
              console.log(this.value, this.value1);
              this.$message({
                message: "请选择商品一级或二级分类",
                type: "error",
              });
            } else {
              this.$message({
                message: "新增商品成功",
                type: "success",
              });
              this.$router.push({ name: "shangpin" });
            }
          });
      }
    },
  },
  created() {
    if (this.$route.params.id) {
      this.id = this.$route.params.id;
      this.get();
      this.getParent();
    } else {
      this.getParent();
    }
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quillEditor;
    },
  },

  watch: {
    deep: true,
    $route: {
      handler(newVal) {
        console.log(newVal);
      },
    },
  },
};
</script>
<style scoped>
.top {
  padding: 20px 0 10px 30px;
  background: #fff;
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
  font-weight: 200;
}
h2 {
  margin-top: 10px;
  text-align: left;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  margin-bottom: 10px;
}
.bottom {
  margin: 20px;
  padding: 40px;
  background: #fff;
  min-height: 1400px;
}
.el-input {
  width: 70%;
  height: 32px;
}

.el-breadcrumb__inner {
  font-weight: 200;
}

.editor {
  line-height: normal !important;
  margin-left: 50px;
  width: 300px;
  height: 500px;
}
.ql-snow .ql-tooltip[data-mode="link"]::before {
  content: "请输入链接地址:";
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: "保存";
  padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode="video"]::before {
  content: "请输入视频地址:";
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: "14px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
  content: "10px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
  content: "18px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
  content: "32px";
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: "文本";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: "标题1";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: "标题2";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: "标题3";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: "标题4";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: "标题5";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: "标题6";
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: "标准字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
  content: "衬线字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
  content: "等宽字体";
}
</style>
