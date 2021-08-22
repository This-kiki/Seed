<template>
  <div>
    <el-row style="margin: 10px 0">
      <el-col>
        <el-form class="search" ref="form">
          <el-form-item>
            <el-input type="text" placeholder="请输入标题" v-model="title" style="margin-top: 10px"></el-input>
          </el-form-item>
          <div>
            <el-button @click="getLawInfoList()" style="margin: 15px 10px" round type="success" plain size="small">点击搜索</el-button>
          </div>
        </el-form>
      </el-col>
    </el-row>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="title" label="常识标题" width="250">
      </el-table-column>
      <el-table-column prop="createTime" label="发布时间" width="200">
      </el-table-column>
      <el-table-column prop="brief" label="简介"> </el-table-column>
      <el-table-column prop="view" label="浏览量"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button type="primary" plain circle @click="viewInfo(scope.row)" icon="el-icon-view" size="small"></el-button>
          <el-button type="primary" plain circle @click="editInfo(scope.row)" icon="el-icon-edit-outline" size="small" style="margin: 0 10px"></el-button>
          <el-popconfirm confirm-button-text="好的" cancel-button-text="取消" icon="el-icon-info" icon-color="red" title="确定删除该活动吗" @confirm="deleteInfo(scope.row)">
            <el-button slot="reference" type="danger" plain circle icon="el-icon-delete" size="small"></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" style="margin: 20px" :page-count="current.total" :current-page.sync="current.current" @current-change="getLawInfoList"></el-pagination>
    <div>
      <el-dialog title="资讯详情" :visible.sync="viewVisible" width="25%">
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
        type: 0,
        current: 0,
        total: 0,
      },
      title: '',
      viewVisible: false,
      actData: {},
    }
  },
  mounted() {
    this.getLawInfoList()
  },
  methods: {
    getLawInfoList() {
      let getAPI = { current: this.current.current, key: this.title }
      this.$http.getLawInfoList(getAPI).then((res) => {
        // console.log(res)
        var resp = res.data.list
        this.current.total = Math.ceil(res.data.total / 20)
        this.tableData = resp
      })
    },
    viewInfo(row) {
      var getAPI = { id: row.id }
      this.$http.getLawInfoDetail(getAPI).then((res) => {
        this.actData = res.data.rows
        // console.log(this.actData)
        this.viewVisible = true
      })
    },
    editInfo(row) {
      this.$router.push({
        path: '/index/releaseLawInfo',
        query: { id: row.id },
      })
    },
    deleteInfo(row) {
      // console.log(row)
      var postAPI = { id: row.id }
      this.$http.deleteLawInfo(postAPI).then((res) => {
        if (res.code == 20000) {
          this.$message({
            message: '删除成功',
            type: 'success',
          })
          this.getLawInfoList()
        }
      })
    },
  },
}
</script>
<style scoped>
.search {
  display: flex;
}
img {
  max-width: 400px;
  height: auto;
}
</style>