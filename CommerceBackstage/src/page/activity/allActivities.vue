<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" label="活动名" width="300">
      </el-table-column>
      <el-table-column prop="num" label="剩余名额" width="100">
      </el-table-column>
      <el-table-column label="状态" width="100">
        <template slot-scope="scope">
          <span :style="'color:' + getColor(scope.row.status) + ';'">
            {{scope.row.type}}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="" label="">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button type="primary" plain circle @click="viewActivity(scope.row)" icon="el-icon-view" size="small"></el-button>
          <el-button type="primary" plain circle @click="editActivity(scope.row)" icon="el-icon-edit-outline" size="small"></el-button>
          <el-popconfirm confirm-button-text='好的' cancel-button-text='取消' icon="el-icon-info" icon-color="red" title="确定删除该活动吗" @confirm="deleteActivity(scope.row)">
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
    this.getAllActivity()
  },
  methods: {
    getAllActivity() {
      let getAPI = { current: this.current.current }
      this.$http.getActivity(getAPI).then((res) => {
        // console.log(res)
        var resp = res.data.act
        for (let i = 0; i < resp.length; i++) {
          if (resp[i].status == 0) {
            resp[i].type = '进行中'
          } else if (resp[i].status == 1) {
            resp[i].type = '已结束'
          } else {
            resp[i].type = '未知'
          }
        }
        this.tableData = resp
      })
    },
    getColor(status) {
      if (status == 0) {
        return '#32CD32'
      } else if (status == 1) {
        return '#696969'
      } else {
        return '#808000'
      }
    },
    viewActivity(row) {
      this.actData = row
      this.viewVisible = true
    },
    editActivity(row) {
      this.$router.push({
        path: '/index/releaseActivities',
        query: { id: row.id },
      })
    },
    deleteActivity(row) {
      // console.log(row)
      var postAPI = { id: row.id }
      this.$http.deleteActivity(postAPI).then((res) => {
        this.$message({
          message: '删除成功',
          type: 'success',
        })
        this.getAllActivity()
      })
    },
  },
}
</script>
<style scoped>
</style>