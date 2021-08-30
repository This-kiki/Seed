<template>
  <div class="home">
    <div class="ac-top">
      <el-row>
        <el-col :span="2" :offset="22">
          <div style="margin: 10px 0;">
            <el-button type="success" @click="submit" icon="el-icon-plus" size="small" plain> 提 交</el-button>
          </div>
        </el-col>
        <el-col :span="8">
          <el-form ref="form" :model="addForm" label-width="80px">
            <el-form-item label="资讯名称">
              <el-input v-model="addForm.title" placeholder="请输入资讯名称">></el-input>
            </el-form-item>
            <el-form-item label="资讯类型">
              <el-select v-model="addForm.category" placeholder="请选择资讯类型">
                <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="主要内容">
              <el-input type="textarea" placeholder="请输入资讯主要内容" v-model="addForm.simpleContent" maxlength="30"></el-input>
            </el-form-item>
            <el-form-item label="正文内容">
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="24">
          <div id="demo1"></div>
        </el-col>
      </el-row>
    </div>
    <div class="ac-middle">
      <el-row style="margin: 10px 0;">
        <el-col :span="2" :offset="22">
          <div>
            <!-- <input type="file" id="filed" accept="image/gif,image/jpeg,image/jpg,image/png" hidden="" @change="filePreview"> -->
            <input type="file" name="avatar" accept="image/gif,image/jpeg,image/jpg,image/png" style="display:none" @change="changeImage($event)" ref="avatarInput">
            <el-button type="primary" @click="uploadImg" icon="el-icon-upload" round size="small" plain> 上传图片</el-button>
          </div>
        </el-col>
      </el-row>
      <div class="ac-img-table">
        <el-table :data="imgList" border style="width: 100%">
          <el-table-column label="图片" width="150">
            <template slot-scope="scope">
              <img class="imgUrl" :src="scope.row.img" alt="">
            </template>
          </el-table-column>
          <el-table-column prop="img" label="图片地址">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="80" align="center">
            <template slot-scope="scope">
              <el-button type="primary" @click="copyUrl(scope.row)" plain circle icon="el-icon-view" size="small"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="ac-botom">
      <h3>内容预览：</h3>
      <iphone :title="addForm.title" :content="addForm.content" ref="iphone"></iphone>
    </div>
    <textarea class="hid" id="input"></textarea>
  </div>
</template>
<script>
import wangEditor from 'wangeditor'
import iphone from '../../components/iphone/index.vue'
import { getImgs } from '../../utils/common'
export default {
  components: {
    iphone,
  },
  data() {
    return {
      id: '',
      editor: null,
      addForm: {
        content: '',
        simpleContent: '',
        title: '',
        imag: '',
        category: '',
      },
      imgList: null,
      typeList: [
        {
          id: 1,
          name: '种子会动态',
        },
        {
          id: 2,
          name: '会员风采',
        },
        {
          id: 3,
          name: '会员单位',
        },
        {
          id: 4,
          name: '家乡新闻',
        },
      ],
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    getImgs() {
      var reg = /<img.+?src=('|")?([^'"]+)('|")?(?:\s+|>)/gim
      var imgsrcArr = []
      let tem
      while ((tem = reg.exec(this.addForm.content))) {
        imgsrcArr.push(tem[2])
      }
      console.log(JSON.stringify(imgsrcArr))
      return JSON.stringify(imgsrcArr)
      // return imgsrcArr
    },
    init() {
      const editor = new wangEditor(`#demo1`)
      editor.config.menus = [
        'head',
        'bold',
        'fontSize',
        'fontName',
        'foreColor',
        'backColor',
        'image',
        'table',
        'splitLine',
      ]
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
      editor.config.onchange = (newHtml) => {
        this.addForm.content = newHtml
      }

      editor.create()
      this.editor = editor

      if (this.$route.query.id) {
        this.id = this.$route.query.id
        // console.log('id:', this.id)
        var getAPI = { id: this.id }
        this.$http.getOneInfo(getAPI).then((res) => {
          // console.log('id:', res)
          this.addForm = res.data.Info
          this.editor.txt.html(this.addForm.content)
        })
      }
    },

    copyUrl(row) {
      var _th = this
      var input = document.getElementById('input')
      input.value = row.img // 修改文本框的内容
      input.select() // 选中文本
      console.log(input.value)
      document.execCommand('copy') // 执行浏览器复制命令
      _th.$notify({
        message: '已复制到剪切板',
        type: 'success',
      })
    },
    getaddForm() {
      // 通过代码获取编辑器内容
      let data = this.editor.txt.html()
      console.log(data)
      // console.log(this.addForm.content)
      // alert(data)
    },
    uploadImg() {
      this.$refs.avatarInput.click()
    },
    changeImage(e) {
      var file = e.target.files[0]
      var reader = new FileReader()
      var _this = this
      reader.readAsDataURL(file)
      reader.onload = function (e) {
        // that.avatar = this.result
        if (_this.$refs.avatarInput.files.length !== 0) {
          var image = new FormData()
          image.append('file', _this.$refs.avatarInput.files[0])
          _this.$http.uploadImg(image).then((res) => {
            // console.log(res)
            _this.imgList.push({ img: res.data.url })
          })
        }
      }
    },
    submit() {
      this.addForm.imag = getImgs(this.addForm.content)
      if (this.addForm.id) {
        // if (this.imgList) {
        // this.addForm.imag = imgList
        // }
        this.$http.editOneInfo(this.addForm).then((res) => {
          // console.log(res)
          if (res.code == 20000) {
            this.$message({
              message: '修改资讯成功',
              type: 'success',
            })
          }
        })
      } else {
        // if (this.imgList) {
        //   this.addForm.imag = imgList
        // }
        switch (this.addForm.category) {
          case 1:
            this.$http.addSeedInfo(this.addForm).then((res) => {
              // console.log(res)
              if (res.code == 20000) {
                this.$message({
                  message: '添加资讯成功',
                  type: 'success',
                })
              }
            })
            break
          case 2:
            this.$http.addMemberInfo(this.addForm).then((res) => {
              // console.log(res)
              if (res.code == 20000) {
                this.$message({
                  message: '添加资讯成功',
                  type: 'success',
                })
              }
            })
            break
          case 3:
            this.$http.addCompanyInfo(this.addForm).then((res) => {
              // console.log(res)
              if (res.code == 20000) {
                this.$message({
                  message: '添加资讯成功',
                  type: 'success',
                })
              }
            })
            break
          case 4:
            this.$http.addCountryInfo(this.addForm).then((res) => {
              // console.log(res)
              if (res.code == 20000) {
                this.$message({
                  message: '添加资讯成功',
                  type: 'success',
                })
              }
            })
            break
        }
      }
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
.hid {
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