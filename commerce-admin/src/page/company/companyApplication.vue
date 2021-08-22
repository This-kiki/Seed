<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="companyName" label="公司名" width="150">
      </el-table-column>
      <el-table-column prop="industry" label="行业" width="150">
      </el-table-column>
      <el-table-column prop="manageStatus" label="经营状态" width="150">
      </el-table-column>
      <el-table-column prop="" label="">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button type="primary" plain circle @click="viewApplyCompany(scope.row)" icon="el-icon-view" size="small"></el-button>
          <el-popconfirm confirm-button-text='确定' cancel-button-text='取消' icon="el-icon-info" icon-color="red" title="确定通过该申请吗" @confirm="handleApplyCompany(scope.row,0)">
            <el-button style="margin: 0 10px" slot="reference" type="success" plain circle icon="el-icon-check" size="small"></el-button>
          </el-popconfirm>
          <el-popconfirm confirm-button-text='确定' cancel-button-text='取消' icon="el-icon-info" icon-color="red" title="确定驳回该申请吗" @confirm="handleApplyCompany(scope.row,1)">
            <el-button slot="reference" type="danger" plain circle icon="el-icon-close" size="small"></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" style="margin: 20px" :page-count="Math.ceil(current.total/20)" :current-page.sync="current.current" @current-change="getApplyCompany"></el-pagination>
    <div>
      <el-dialog title="活动申请详情" :visible.sync="viewVisible" width="45%">
        <el-form label-position="left" class="demo-table-expand" label-width="180px">
          <el-form-item label="公司名">
            <span>{{ actData.companyName }}</span>
          </el-form-item>
          <el-form-item label="信用代码">
            <span>{{ actData.creditCode }}</span>
          </el-form-item>
          <el-form-item label="地址">
            <span>{{ actData.address }}</span>
          </el-form-item>
          <el-form-item label="行业">
            <span>{{ actData.industry }}</span>
          </el-form-item>
          <el-form-item label="经营状态">
            <span>{{ actData.manageStatus }}</span>
          </el-form-item>
          <el-form-item label="公司联系电话">
            <span>{{ actData.companyPhone }}</span>
          </el-form-item>
          <el-form-item label="公司介绍">
            <span>{{ actData.content }}</span>
          </el-form-item>
          <el-form-item label="电子邮箱">
            <span>{{ actData.email }}</span>
          </el-form-item>
          <el-form-item label="头像">
            <img :src="actData.img" alt="">
            <!-- <span>{{ actData.img }}</span> -->
          </el-form-item>
          <el-form-item label="营业执照照片">
            <img :src="actData.license" alt="">
            <!-- <span>{{ actData.address }}</span> -->
          </el-form-item>
          <el-form-item label="经营范围">
            <span>{{ actData.manageArea }}</span>
          </el-form-item>
          <el-form-item label="注册资金">
            <span>{{ actData.money }}</span>
          </el-form-item>
          <el-form-item label="hr姓名">
            <span>{{ actData.name }}</span>
          </el-form-item>
          <el-form-item label="企业人数">
            <span>{{ actData.num }}</span>
          </el-form-item>
          <el-form-item label="hr手机号">
            <span>{{ actData.phone }}</span>
          </el-form-item>
          <el-form-item label="法人代表名字">
            <span>{{ actData.representative }}</span>
          </el-form-item>
          <el-form-item label="hr性别">
            <span>{{ actData.sex }}</span>
          </el-form-item>
          <!-- <el-form-item label="创建时间">
              <span>{{ actData.time }}</span>
            </el-form-item> -->
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      current: {
        current: 0,
        total: 0,
      },
      viewVisible: false,
      actData: {},
    }
  },
  mounted() {
    this.getApplyCompany()
  },
  methods: {
    getApplyCompany() {
      let getAPI = { current: this.current.current }
      this.$http.getApplyCompany(getAPI).then((res) => {
        // console.log(res)
        this.current.total = Math.ceil(res.data.total / 20)
        var resp = res.data.rows
        this.tableData = resp
      })
    },
    viewApplyCompany(row) {
      this.actData = row
      this.viewVisible = true
    },
    handleApplyCompany(row, result) {
      var postAPI = {
        openid: row.openId,
      }
      this.$http.adoptApplyCompany(postAPI).then((res) => {
        if (res.code == 20000) {
          this.$message({
            message: '审核成功',
            type: 'success',
          })
          this.getApplyCompany()
        }
      })
    },
  },
}
</script>
<style scoped>
img {
  max-width: 400px;
  height: auto;
}
</style>