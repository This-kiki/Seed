<template>
  <div>
    <el-row style="margin: 10px 0;">
      <el-col :span="2" :offset="22">
        <div>
          <el-button type="primary" icon="el-icon-plus" round size="small" plain @click="addVisible=true;addForm={}">添 加</el-button>
        </div>
        <el-dialog title="添加管理员" :visible.sync="addVisible" width="35%">
          <el-form :model="addForm" style="padding-right: 20px">
            <el-form-item label="用户名" label-width="80px">
              <el-input v-model="addForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" label-width="80px">
              <el-input v-model="addForm.password"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addVisible = false">取 消</el-button>
            <el-button type="primary" @click="addAdmin">添 加</el-button>
          </div>
        </el-dialog>
      </el-col>
    </el-row>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="username" label="用户名" width="200">
      </el-table-column>
      <el-table-column prop="identity" label="身份">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button type="primary" plain circle @click="editAdmin(scope.row)" icon="el-icon-edit-outline" size="small"></el-button>
          <el-popconfirm confirm-button-text='好的' cancel-button-text='取消' icon="el-icon-info" icon-color="red" title="确定删除该管理员吗" @confirm="deleteAdmin(scope.row)">
            <el-button slot="reference" type="danger" plain circle icon="el-icon-delete" size="small"></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      addForm: {},
      addVisible: false,
    }
  },
  mounted() {
    this.getAllAdmin()
  },
  methods: {
    getAllAdmin() {
      this.$http.getGeneralAdmin().then((res) => {
        // console.log(res)
        var resp = res.data.adminUser
        for (let i = 0; i < resp.length; i++) {
          if (resp[i].groupid == 0) {
            resp[i].identity = '超级管理员'
          } else if (resp[i].groupid == 1) {
            resp[i].identity = '普通管理员'
          }
        }
        this.tableData = resp
      })
    },
    deleteAdmin(row) {
      // console.log(row)
      var postAPI = { id: row.id }
      this.$http.deleteGeneralAdmin(postAPI).then((res) => {
        this.$message({
          message: '删除成功',
          type: 'success',
        })
        this.getAllAdmin()
      })
    },
    addAdmin() {
      const postAPI = this.addForm
      if (!postAPI.password || postAPI.password.length <= 5) {
        this.$notify.info({
          title: '密码',
          message: '请输入至少6位的密码',
        })
      } else if (!postAPI.username) {
        this.$notify.info({
          title: '用户名',
          message: '请输入用户名',
        })
      } else {
        console.log(this.addForm)
        this.$http.addGeneralAdmin(postAPI).then((res) => {
          this.$message({
            message: '添加成功',
            type: 'success',
          })
          this.getAllAdmin()
          this.addVisible = false
        })
      }
    },
  },
}
</script>
<style scoped>
</style>