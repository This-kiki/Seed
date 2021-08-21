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
          <el-form ref="form" :model="addForm" label-width="120px">
            <el-form-item label="轮播图位置">
              <el-select v-model="position" placeholder="请选择轮播图位置">
                <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="资讯id" v-if="position == 1">
              <el-input v-model="addForm.infoId" placeholder="请从资讯列表处复制资讯id到此处" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="图片链接">
              <el-input v-model="addForm.img" placeholder="请在下方上传图片并将图片链接复制到此处" style="width: 300px"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <div class="ac-middle">
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
    </div>
    <textarea class="hid" id="input"></textarea>
  </div>
</template>
<script>
export default {
  data() {
    return {
      addForm: {
        infoId: '',
        img: '',
      },
      imgList: [{ img: '1111' }],
      position: 1,
      typeList: [
        { id: 1, name: '首页' },
        { id: 2, name: '种子会' },
      ],
    }
  },
  methods: {
    copyUrl(row) {
      var _th = this
      var input = document.getElementById('input')
      input.value = row.img // 修改文本框的内容
      input.select() // 选中文本
      document.execCommand('Copy')
      _th.$notify({
        message: '已复制到剪切板',
        type: 'success',
      })
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
      if (this.position == 1) {
        this.$http.uploadHomeCarousel(this.addForm).then((res) => {
          // console.log(res)
          if (res.code == 20000) {
            this.$message({
              message: '首页轮播图发布成功',
              type: 'success',
            })
          }
        })
      } else {
        this.$http.uploadSeedCarousel(this.addForm).then((res) => {
          // console.log(res)
          if (res.code == 20000) {
            this.$message({
              message: '种子会轮播图发布成功',
              type: 'success',
            })
          }
        })
      }
    },
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