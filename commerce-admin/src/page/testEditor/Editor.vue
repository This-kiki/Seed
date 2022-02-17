<template>
  <div>
    <p>
      wangEditor 上传图片
    </p>
    <div id="div1"></div>
    <button @click="get()">aaaaa</button>
  </div>
</template>

<script>
import Wangeditor from "wangeditor";
export default {
  mounted() {
    var _this = this;
    const editor = new Wangeditor("#div1");

    editor.config.customUploadImg = function (resultFiles) {
      console.log(resultFiles);
      for (let i = 0; i < resultFiles.length; i++) {
        let image = new FormData();
        image.append("file", resultFiles[i]);
        _this.$http.uploadImg(image).then((res) => {
          console.log(res);
          _this.editor.txt.append(
            '<img src="' +
              res.data.url +
              '" contenteditable="false" style="max-width: 100%;"width="80%"/>'
          );
        });
      }
    };
    // editor.config.uploadImgHooks = {
    //   // 图片上传并返回结果，但图片插入错误时触发
    //   fail: function (xhr, editor, result) {
    //     console.log("上传出错", result);
    //   },
    //   success: function (xhr, editor, result) {
    //     // 图片上传并返回结果，图片插入成功之后触发
    //     console.log(result, "<success>");
    //   },
    //   customInsert: function (insertImgFn, result) {
    //     console.log("customInsert", result);
    //     insertImgFn(result.data[0]); // 只插入一个图片，多了忽略
    //   },
    // };

    editor.config.onchange = (newHtml) => {
      // console.log(newHtml);
    };

    editor.config.height = 1000;

    editor.create();
    this.editor = editor;
  },
  data() {
    return {
      editor: null,
    };
  },
  methods: {
    get() {
      let bbb =
        '<p>阿凡达发生<img src="https://seed-1010-bucket.oss-cn-beijing.aliyuncs.com/2022/02/16/ae1d6e9699de4fbe8227fad313900d93thumb-1920-562416.jpg" contenteditable="false" style="max-width: 100%;"/></p>';
      this.editor.txt.html(bbb);
      let aaa = this.editor.txt.html();
      console.log(aaa);
    },
  },
};
</script>

<style scoped>
#editor {
  width: 80%;
  margin: 0 auto;
}
</style>