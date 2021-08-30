<template>
  <div>
    <p>
      wangEditor 上传图片
    </p>
    <div id="div1"></div>
  </div>
</template>

<script>
import Wangeditor from 'wangeditor'
export default {
  mounted() {
    const editor = new Wangeditor('#div1')

    editor.config.uploadImgServer = 'https://hjzpzzh.com/seed/oss/uploadImagAdmin'
    editor.config.showLinkImg = false

    editor.config.uploadFileName = 'file'
    editor.config.debug = true // 开启debug模式
    editor.config.uploadImgHeaders = {
      token: localStorage.getItem('token'), // 设置请求头
    }
    editor.config.uploadImgHooks = {
      // 图片上传并返回结果，但图片插入错误时触发
      fail: function (xhr, editor, result) {
        console.log('上传出错', result)
      },
      success: function (xhr, editor, result) {
        // 图片上传并返回结果，图片插入成功之后触发
        console.log(result, '<success>')
      },
      customInsert: function (insertImgFn, result) {
        console.log('customInsert', result)
        insertImgFn(result.data[0]) // 只插入一个图片，多了忽略
      },
    }

    editor.create()
  },
  data() {
    return {
      editor: null,
    }
  },
}
</script>

<style scoped>
#editor {
  width: 80%;
  margin: 0 auto;
}
</style>