<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" class="demo-table-expand" label-width="180px">
            <el-form-item label="性别">
              <span>{{ props.row.sex==0?'男':'女' }}</span>
            </el-form-item>
            <el-form-item label="手机号码">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="地址">
              <span>{{ props.row.introduce }}</span>
            </el-form-item>
            <!-- <el-form-item label="创建时间">
              <span>{{ props.row.time }}</span>
            </el-form-item> -->
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="150">
      </el-table-column>
      <el-table-column prop="workNum" label="执业证号" width="100">
      </el-table-column>
      <el-table-column prop="workplace" label="执业律所" width="150">
      </el-table-column>
      <el-table-column prop="" label="">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-popconfirm confirm-button-text='确定' cancel-button-text='取消' icon="el-icon-info" icon-color="red" title="确定删除该律师吗" @confirm="deleteLayer(scope.row)">
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
      current: {
        current: 0,
        total: 0,
      },
    }
  },
  mounted() {
    this.getAllLayer()
  },
  methods: {
    getAllLayer() {
      let getAPI = { current: this.current.current }
      this.$http.getLayer(getAPI).then((res) => {
        // console.log(res)
        var resp = res.data.rows
        this.tableData = resp
      })
    },
    deleteLayer(row) {
      // console.log(row)
      var postAPI = { openId: row.openId }
      this.$http.deleteLayer(postAPI).then((res) => {
        if (res.code == 20000) {
          this.$message({
            message: '删除成功',
            type: 'success',
          })
          this.getAllLayer()
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