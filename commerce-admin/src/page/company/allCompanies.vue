<template>
  <div>
    <el-row>
      <el-col :span="2" :offset="21">
        <el-button @click="exportCompany" style="margin: 15px 0" round type="success" plain icon="el-icon-document-copy" size="small">导出公司信息</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" class="demo-table-expand" label-width="180px">
            <el-form-item label="地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="经营状态">
              <span>{{ props.row.manageStatus }}</span>
            </el-form-item>
            <el-form-item label="公司联系电话">
              <span>{{ props.row.companyPhone }}</span>
            </el-form-item>
            <el-form-item label="公司介绍">
              <span>{{ props.row.content }}</span>
            </el-form-item>
            <el-form-item label="电子邮箱">
              <span>{{ props.row.email }}</span>
            </el-form-item>
            <el-form-item label="经营范围">
              <span>{{ props.row.manageArea }}</span>
            </el-form-item>
            <el-form-item label="注册资金">
              <span>{{ props.row.money }}</span>
            </el-form-item>
            <el-form-item label="企业人数">
              <span>{{ props.row.num }}</span>
            </el-form-item>
            <el-form-item label="hr性别">
              <span>{{ props.row.sex }}</span>
            </el-form-item>
            <el-form-item label="信用代码">
              <span>{{ props.row.creditCode }}</span>
            </el-form-item>
            <el-form-item label="头像">
              <img :src="props.row.img" alt="" />
              <!-- <span>{{ props.row.img }}</span> -->
            </el-form-item>
            <el-form-item label="营业执照照片">
              <img :src="props.row.license" alt="" />
              <!-- <span>{{ props.row.address }}</span> -->
            </el-form-item>
            <!-- <el-form-item label="创建时间">
              <span>{{ props.row.time }}</span>
            </el-form-item> -->
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="companyName" label="公司名" width="150">
      </el-table-column>
      <el-table-column prop="name" label="hr电话" width="150">
      </el-table-column>
      <el-table-column prop="phone" label="hr姓名" width="150">
      </el-table-column>
      <el-table-column prop="representative" label="法人代表" width="150">
      </el-table-column>
      <el-table-column prop="industry" label="行业" width="150">
      </el-table-column>
      <el-table-column prop="" label=""> </el-table-column>
      <el-table-column fixed="right" label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-popconfirm confirm-button-text="确定" cancel-button-text="取消" icon="el-icon-info" icon-color="red" title="确定删除该公司吗" @confirm="deleteCompany(scope.row)">
            <el-button slot="reference" type="danger" plain circle icon="el-icon-delete" size="small"></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination background layout="prev, pager, next" style="margin: 20px" :total="Math.ceil(current.total/20)" :current-page.sync="current.current" @current-change="getAllCompany"></el-pagination> -->
    <div>
      <el-dialog title="活动详情" :visible.sync="viewVisible" width="35%">
        <div v-html="actData.content"></div>
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
    this.getAllCompany()
  },
  methods: {
    getAllCompany() {
      let getAPI = { current: this.current.current }
      this.$http.getCompany(getAPI).then((res) => {
        // console.log(res)
        var resp = res.data.companyList
        this.tableData = resp
      })
    },
    viewCompany(row) {
      this.actData = row
      this.viewVisible = true
    },
    editCompany(row) {
      this.$router.push({
        path: '/index/releaseActivities',
        query: { id: row.id },
      })
    },
    deleteCompany(row) {
      // console.log(row)
      var postAPI = { openid: row.openid }
      this.$http.deleteCompany(postAPI).then((res) => {
        if (res.code == 20000) {
          this.$message({
            message: '删除成功',
            type: 'success',
          })
          this.getAllCompany()
        }
      })
    },
    exportCompany() {
      this.$http.exportCompany().then((res) => {
        // console.log(res);
        const blob = new Blob([res], {
          type: 'pplication/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        })
        const url = URL.createObjectURL(blob)
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', '所有公司列表' + '.xlsx')
        document.body.appendChild(link)
        link.click()
      })
    },
  },
}
</script>
<style scoped>
</style>