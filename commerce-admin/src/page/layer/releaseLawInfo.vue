<template>
  <div class="home">
    <div class="ac-top">
      <el-row>
        <el-col :span="2" :offset="22">
          <div style="margin: 10px 0">
            <el-button type="success" @click="submit" icon="el-icon-plus" size="small" plain>
              提 交</el-button>
          </div>
        </el-col>
        <el-col :span="8">
          <el-form ref="form" :model="addForm" label-width="80px">
            <el-form-item label="名称">
              <el-input v-model="addForm.title" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="简介">
              <el-input v-model="addForm.brief" placeholder="请输入简介"></el-input>
            </el-form-item>
            <el-form-item label="正文内容"> </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="24">
          <div id="toolbar-container" class="toolbar"></div>
          <div id="text-container" class="text"></div>
        </el-col>
      </el-row>
    </div>
    <!-- <div class="ac-middle">
      <el-row style="margin: 10px 0">
        <el-col :span="2" :offset="22">
          <div>
            <input type="file" name="avatar" accept="image/gif,image/jpeg,image/jpg,image/png" style="display: none" @change="changeImage($event)" ref="avatarInput" />
            <el-button type="primary" @click="uploadImg" icon="el-icon-upload" round size="small" plain>
              上传图片</el-button>
          </div>
        </el-col>
      </el-row>
      <div class="ac-img-table">
        <el-table :data="imgList" border style="width: 100%">
          <el-table-column label="图片" width="150">
            <template slot-scope="scope">
              <img class="imgUrl" :src="scope.row.img" alt="" />
            </template>
          </el-table-column>
          <el-table-column prop="img" label="图片地址"> </el-table-column>
          <el-table-column fixed="right" label="操作" width="80" align="center">
            <template slot-scope="scope">
              <el-button type="primary" @click="copyUrl(scope.row)" plain circle icon="el-icon-view" size="small"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div> -->
    <div class="ac-botom">
      <h3>内容预览：</h3>
      <iphone :title="addForm.title" :content="addForm.content"></iphone>
    </div>
    <textarea class="hid" id="input"></textarea>
  </div>
</template>
<script>
import wangEditor from "wangeditor";
import iphone from "../../components/iphone/index.vue";
export default {
  components: {
    iphone,
  },
  data() {
    return {
      id: "",
      editor: null,
      addForm: {
        content: "",
        title: "",
        brief: "",
        img: "",
      },
      imgList: [
        {
          img: "https://i01picsos.sogoucdn.com/caf58fc2e02d522d",
        },
      ],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      var _this = this;
      const editor = new wangEditor("#toolbar-container", "#text-container");
      // const editor = new wangEditor(`#demo1`);
      editor.config.menus = [
        "head",
        "bold",
        "fontSize",
        "fontName",
        "foreColor",
        "backColor",
        "justify",
        "image",
        "table",
        "splitLine",
        "undo",
        "redo",
      ];
      editor.config.customUploadImg = function (resultFiles, insertImgFn) {
        console.log(resultFiles);
        for (let i = 0; i < resultFiles.length; i++) {
          let image = new FormData();
          image.append("file", resultFiles[i]);
          _this.$http.uploadImg(image).then((res) => {
            console.log(res);
            // _this.editor.txt.append(
            //   '<img src="' +
            //     res.data.url +
            //     '" contente ditable="false" style="max-width: 100%;"width="80%"/>'
            // );
            insertImgFn(res.data.url);
          });
        }
      };
      editor.config.showLinkImg = false;
      editor.config.debug = true; // 开启debug模式
      // editor.config.uploadImgHooks = {
      //   // 图片上传并返回结果，但图片插入错误时触发
      //   fail: function (xhr, editor, result) {
      //     console.log('上传出错', result)
      //   },
      //   success: function (xhr, editor, result) {
      //     // 图片上传并返回结果，图片插入成功之后触发
      //     console.log(result, '<success>')
      //   },
      //   customInsert: function (insertImgFn, result) {
      //     console.log('customInsert', result)
      //     insertImgFn(result.data[0]) // 只插入一个图片，多了忽略
      //   },
      // }
      editor.config.onchange = (newHtml) => {
        this.addForm.content = newHtml;
      };

      // editor.config.height = 1000;

      editor.create();
      this.editor = editor;

      // 获取id
      if (this.$route.query.id) {
        this.id = this.$route.query.id;
        // console.log('id:', this.id)
        var getAPI = { id: this.id };
        this.$http.getLawInfoDetail(getAPI).then((res) => {
          this.addForm = res.data.rows;
          console.log(this.addForm);
          this.editor.txt.html(this.addForm.content);
        });
      }
    },

    copyUrl(row) {
      var _th = this;
      var input = document.getElementById("input");
      input.value = row.img; // 修改文本框的内容
      input.select(); // 选中文本
      document.execCommand("copy"); // 执行浏览器复制命令
      _th.$notify({
        message: "已复制到剪切板",
        type: "success",
      });
    },
    getaddForm() {
      // 通过代码获取编辑器内容
      let data = this.editor.txt.html();
      console.log(data);
      // console.log(this.addForm.content)
      // alert(data)
    },
    uploadImg() {
      this.$refs.avatarInput.click();
    },
    changeImage(e) {
      var file = e.target.files[0];
      var reader = new FileReader();
      var _this = this;
      reader.readAsDataURL(file);
      reader.onload = function (e) {
        // that.avatar = this.result
        if (_this.$refs.avatarInput.files.length !== 0) {
          var image = new FormData();
          image.append("file", _this.$refs.avatarInput.files[0]);
          _this.$http.uploadImg(image).then((res) => {
            // console.log(res)
            _this.imgList.push({ img: res.data.url });
          });
        }
      };
    },
    submit() {
      // if (this.imgList[0]) {
      //   this.addForm.img = this.imgList[0].img
      // }
      // this.addForm.img = getImg(this.addForm.content)
      this.$http.releaseLawInfo(this.addForm).then((res) => {
        if (res.code == 20000) {
          this.$message({
            message: "发布活动成功",
            type: "success",
          });
        }
        // console.log(res)
      });
    },
  },
  beforeDestroy() {
    // 调用销毁 API 对当前编辑器实例进行销毁
    this.editor.destroy();
    this.editor = null;
  },
};
</script>
<style scoped>
.toolbar {
  border: 1px solid #ccc;
  width: 60%;
  margin-left: 80px;
}
.text {
  border: 1px solid #ccc;
  /* min-height: 1000px; */
  height: 80vh;
  padding: 30px 60px;
  width: 60%;
  margin-left: 80px;
}
.hi .hid {
  left: 10px;
  top: 0px;
  background-color: white;
  position: absolute;
  z-index: -1;
}
.home {
  width: 100%;
  /* margin: auto; */
  /* position: relative; */
}
.imgUrl {
  width: 130px;
  height: auto;
}
.ac-botom {
  display: flex;
  justify-content: flex-start;
}
</style>