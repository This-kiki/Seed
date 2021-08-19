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
            <el-form-item label="hr姓名">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="hr电话">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="hr性别">
              <span>{{ props.row.sex==0?'男':'女' }}</span>
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
      <el-table-column prop="phone" label="hr电话" width="150">
      </el-table-column>
      <el-table-column prop="name" label="hr姓名" width="150">
      </el-table-column>
      <el-table-column prop="representative" label="法人代表" width="150">
      </el-table-column>
      <el-table-column prop="industry" label="行业" width="150">
      </el-table-column>
      <el-table-column prop="" label=""> </el-table-column>
      <el-table-column fixed="right" label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button style="marginRight: 10px" type="primary" plain circle icon="el-icon-edit-outline" size="small" @click="editCompany(scope.row)"></el-button>
          <el-popconfirm confirm-button-text="确定" cancel-button-text="取消" icon="el-icon-info" icon-color="red" title="确定删除该公司吗" @confirm="deleteCompany(scope.row)">
            <el-button slot="reference" type="danger" plain circle icon="el-icon-delete" size="small"></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination background layout="prev, pager, next" style="margin: 20px" :total="Math.ceil(current.total/20)" :current-page.sync="current.current" @current-change="getAllCompany"></el-pagination> -->
    <div>
      <el-dialog title="修改公司信息" :visible.sync="editVisible" width="45%">
        <el-form label-position="left" class="demo-table-expand" label-width="180px">
          <el-form-item label="地址">
            <!-- <span>{{ editForm.name }}</span> -->
            <el-input v-model="editForm.address"></el-input>
          </el-form-item>
          <el-form-item label="经营状态">
            <el-input v-model="editForm.manageStatus"></el-input>
            <!-- <span>{{ editForm.phone }}</span> -->
          </el-form-item>
          <el-form-item label="公司联系电话">
            <el-input v-model="editForm.companyPhone"></el-input>
            <!-- <span>{{ editForm.position }}</span> -->
          </el-form-item>
          <el-form-item label="公司介绍">
            <el-input v-model="editForm.content"></el-input>
            <!-- <span>{{ editForm.idNum }}</span> -->
          </el-form-item>
          <el-form-item label="电子邮箱">
            <el-input v-model="editForm.email"></el-input>
            <!-- <span>{{ editForm.email }}</span> -->
          </el-form-item>
          <el-form-item label="经营范围">
            <el-input v-model="editForm.manageArea"></el-input>
            <!-- <span>{{ editForm.major }}</span> -->
          </el-form-item>
          <el-form-item label="注册资金">
            <el-input v-model="editForm.money"></el-input>
            <!-- <span>{{ editForm.birth }}</span> -->
          </el-form-item>
          <el-form-item label="企业人数">
            <el-input v-model="editForm.num"></el-input>
            <!-- <span>{{ editForm.nation }}</span> -->
          </el-form-item>
          <el-form-item label="信用代码">
            <el-input v-model="editForm.creditCode"></el-input>
            <!-- <span>{{ editForm.place }}</span> -->
          </el-form-item>
          <el-form-item label="头像">
            <img :src="editForm.img" alt="" />
          </el-form-item>
          <el-form-item label="营业执照照片">
            <img :src="editForm.license" alt="" />
          </el-form-item>
          <el-row>
            <el-col :span="3" :offset="22">
              <el-button @click="editSubmit">修改</el-button>
            </el-col>
          </el-row>
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
      editVisible: false,
      editForm: {},
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
    editCompany(row) {
      this.editForm = row
      this.editVisible = true
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
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = 'https://hjzpzzh.com/seed/admin/company/getAllCompanyDtlInfoToExcel'
      document.body.appendChild(link)
      link.click()
      window.URL.revokeObjectURL(link.href)
      document.body.removeChild(link)
    },
    editSubmit() {
      console.log(this.editForm)
      this.$http.editCompany(this.editForm).then((res) => {
        if (res.code == 20000) {
          this.$message({
            message: '修改成功',
            type: 'success',
          })
          this.getAllCompany()
          this.editVisible = false
        }
      })
    },
  },
}
</script>
<style scoped>
img {
  max-width: 500px;
  height: auto;
}
</style>