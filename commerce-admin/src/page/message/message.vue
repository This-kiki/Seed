<template>
  <div>
    <el-row>
      <div class="title">· 设置种子会地址</div>
      <el-col :span="2" :offset="22">
        <div style="margin: 10px 0">
          <el-button
            type="success"
            @click="setAddress"
            icon="el-icon-plus"
            size="small"
            plain
          >
            提 交</el-button
          >
        </div>
      </el-col>
      <el-col :span="8">
        <el-form ref="form" :model="address" label-width="100px">
          <el-form-item label="种子会地址">
            <el-input
              type="textarea"
              placeholder="请设置种子会地址"
              v-model="address"
            ></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <div class="title">· 设置种子会章程</div>
      <el-col :span="2" :offset="22">
        <div style="margin: 10px 0">
          <el-button
            type="success"
            @click="setConstitution"
            icon="el-icon-plus"
            size="small"
            plain
          >
            提 交</el-button
          >
        </div>
      </el-col>
      <el-col :span="8">
        <el-form ref="form" :model="constitution" label-width="100px">
          <el-form-item label="种子会章程">
            <el-input
              type="textarea"
              placeholder="请设置种子会章程"
              v-model="constitution"
            ></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <div class="title">· 设置种子会架构</div>
      <el-col :span="2" :offset="22">
        <div style="margin: 10px 0">
          <el-button
            type="success"
            @click="setFramework"
            icon="el-icon-plus"
            size="small"
            plain
          >
            提 交</el-button
          >
        </div>
      </el-col>
      <el-col :span="8">
        <el-form ref="form" :model="framework" label-width="100px">
          <el-form-item label="种子会架构">
            <el-input
              type="textarea"
              placeholder="请设置种子会架构"
              v-model="framework"
            ></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <div class="title">· 设置种子会介绍</div>
      <el-col :span="2" :offset="22">
        <div style="margin: 10px 0">
          <el-button
            type="success"
            @click="setIntroduce"
            icon="el-icon-plus"
            size="small"
            plain
          >
            提 交</el-button
          >
        </div>
      </el-col>
      <el-col :span="8">
        <el-form ref="form" :model="introduce" label-width="100px">
          <el-form-item label="种子会介绍">
            <el-input
              type="textarea"
              placeholder="请设置种子会介绍"
              v-model="introduce"
            ></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <div class="title">· 设置联系人姓名电话</div>
      <el-col :span="2" :offset="22">
        <div style="margin: 10px 0">
          <el-button
            type="success"
            @click="setContact"
            icon="el-icon-plus"
            size="small"
            plain
          >
            提 交</el-button
          >
        </div>
      </el-col>
      <el-col :span="8">
        <el-form ref="form" :model="contact" label-width="120px">
          <el-form-item label="联系人姓名电话">
            <el-input
              type="textarea"
              placeholder="格式：张三+11011001100/李四+11211221122"
              v-model="contact"
            ></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      address: "",
      constitution: "",
      framework: "",
      introduce: "",
      contact: "",
    };
  },
  methods: {
    setAddress() {
      this.$http.setAddress({ content: this.address }).then((res) => {
        if (res.code == 20000) {
          this.$message({
            message: "设置成功",
            type: "success",
          });
        }
      });
    },
    setConstitution() {
      this.$http
        .setConstitution({ content: this.setConstitution })
        .then((res) => {
          if (res.code == 20000) {
            this.$message({
              message: "设置成功",
              type: "success",
            });
          }
        });
    },
    setFramework() {
      this.$http.setFramework({ content: this.framework }).then((res) => {
        if (res.code == 20000) {
          this.$message({
            message: "设置成功",
            type: "success",
          });
        }
      });
    },
    setIntroduce() {
      this.$http.setIntroduce({ content: this.introduce }).then((res) => {
        if (res.code == 20000) {
          this.$message({
            message: "设置成功",
            type: "success",
          });
        }
      });
    },
    setContact() {
      let list = this.contact.split("/");
      let data = [];
      list.forEach((item) => {
        let str = item.split("+");
        data.push({
          name: str[0],
          phone: str[1],
        });
      });
      console.log(data);
      this.$http.setContact(data).then((res) => {
        if (res.code == 20000) {
          this.$message({
            message: "设置成功",
            type: "success",
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.title {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1rpx #ccc solid;
  font-size: 20px;
}
</style>