<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" label="活动名">
      </el-table-column>
      <el-table-column prop="alNum" label="已报名" width="100">
      </el-table-column>
      <el-table-column prop="num" label="总人数" width="100">
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
      <el-table-column fixed="right" label="结束活动" width="180" align="center">
        <template slot-scope="scope">
          <el-popconfirm v-if="scope.row.status==0" confirm-button-text='好的' cancel-button-text='取消' icon="el-icon-info" icon-color="red" title="确定结束该活动吗" @confirm="endActivity(scope.row)">
            <el-button slot="reference" type="text">结束活动</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button type="primary" plain circle @click="viewActivity(scope.row)" icon="el-icon-view" size="small"></el-button>
          <el-button style="margin: 0 10px" type="success" plain circle @click="editActivity(scope.row)" icon="el-icon-edit-outline" size="small"></el-button>
          <el-popconfirm confirm-button-text='好的' cancel-button-text='取消' icon="el-icon-info" icon-color="red" title="确定删除该活动吗" @confirm="deleteActivity(scope.row)">
            <el-button slot="reference" type="danger" plain circle icon="el-icon-delete" size="small"></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" style="margin: 20px" :page-count="Math.ceil(current.total/20)" :current-page.sync="current.current" @current-change="getAllActivity"></el-pagination>
    <div>
      <el-dialog title="活动详情" :visible.sync="viewVisible" width="25%">
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
        this.current.total = Math.ceil(res.data.total / 20)
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
        return '#DAA520'
      } else {
        return '#808000'
      }
    },
    viewActivity(row) {
      var getAPI = {
        id: row.id,
      }
      this.$http.getOneActivity(getAPI).then((res) => {
        console.log(res.data)
        this.actData = res.data.acts
      })
      this.viewVisible = true
    },
    endActivity(row) {
      var postAPI = {
        id: row.id,
        status: 1,
      }
      this.$http.editActivity(postAPI).then((res) => {
        if (res.code == 20000) {
          this.$message({
            message: '已结束活动',
            type: 'success',
          })
          this.getAllActivity()
        }
      })
    },
    editActivity(row) {
      this.$router.push({
        path: '/index/releaseActivities',
        query: { id: row.id },
      })
    },
    deleteActivity(row) {
      // console.log(row)
      var postAPI = { actid: row.id }
      this.$http.deleteActivity(postAPI).then((res) => {
        // console.log(res)
        if (res.code == 20000) {
          this.$message({
            message: '删除成功',
            type: 'success',
          })
          this.getAllActivity()
        }
      })
    },
  },
}
</script>
<style scoped>
</style>