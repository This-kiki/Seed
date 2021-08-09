<template>
  <div class="home">
    <h3>wangEditor with vue</h3>
    <div id="demo1"></div>
    <button type="button" class="btn" @click="getEditorData">获取当前内容</button>
    <!-- <textarea name="" id="" cols="170" rows="20" readonly v-model="editorData"></textarea> -->
    <h3>内容预览：</h3>
    <div v-html="editorData"></div>
  </div>
</template>
<script>
import wangEditor from 'wangeditor'
export default {
  data() {
    return {
      id: '',
      editor: null,
      editorData: '',
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const editor = new wangEditor(`#demo1`)
      // 配置 onchange 回调函数，将数据同步到 vue 中
      editor.config.onchange = (newHtml) => {
        this.editorData = newHtml
      }
      // 创建编辑器
      editor.create()
      this.editor = editor

      // 获取id
      if (this.$route.params.id) {
        this.id = this.$route.params.id
      }
      this.editorData = '<p>啊大苏打</p>'
    },
    getEditorData() {
      // 通过代码获取编辑器内容
      let data = this.editor.txt.html()
      console.log(data)
      // console.log(this.editorData)
      // alert(data)
    },
  },
  beforeDestroy() {
    // 调用销毁 API 对当前编辑器实例进行销毁
    this.editor.destroy()
    this.editor = null
  },
}
</script>
<style scoped>
.home {
  width: 1200px;
  margin: auto;
  position: relative;
}
.btn {
  position: absolute;
  right: 0;
  top: 0;
  padding: 5px 10px;
  cursor: pointer;
}
h3 {
  margin: 30px 0 15px;
}
</style>