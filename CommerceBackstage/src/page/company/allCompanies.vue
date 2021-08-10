<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" label="公司名" width="300">
      </el-table-column>
      <el-table-column prop="num" label="详细信息" width="100">
      </el-table-column>
      <el-table-column prop="" label="">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button type="primary" plain circle @click="viewCompany(scope.row)" icon="el-icon-view" size="small"></el-button>
          <el-button type="primary" plain circle @click="editCompany(scope.row)" icon="el-icon-edit-outline" size="small"></el-button>
          <el-popconfirm confirm-button-text='好的' cancel-button-text='取消' icon="el-icon-info" icon-color="red" title="确定删除该公司吗" @confirm="deleteCompany(scope.row)">
            <el-button slot="reference" type="danger" plain circle icon="el-icon-delete" size="small"></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
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
        var resp = res.data.act
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
      var postAPI = { id: row.id }
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
  },
}
</script>
<style scoped>
</style>