<template>
  <div>
    <el-row style="margin: 10px 0">
      <el-col :span="2" :offset="22">
        <div>
          <el-select v-model="current.type" placeholder="请选择" @change="handleSelectChange">
            <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="资讯ID" width="300"> </el-table-column>
      <el-table-column prop="title" label="资讯名" width="250">
      </el-table-column>
      <el-table-column prop="type" label="类型" width="100"> </el-table-column>
      <el-table-column prop="createTime" label="发布时间" width="200">
      </el-table-column>
      <el-table-column prop="simpleContent" label="主要内容"> </el-table-column>
      <el-table-column prop="" label=""> </el-table-column>
      <el-table-column fixed="right" label="置顶资讯" width="180" align="center">
        <template slot-scope="scope">
          <el-popconfirm v-if="scope.row.top==0" confirm-button-text='好的' cancel-button-text='取消' icon="el-icon-info" icon-color="red" title="置顶这个资讯吗" @confirm="topInfo(scope.row,1)">
            <el-button slot="reference" type="text">置顶咨询</el-button>
          </el-popconfirm>
          <el-popconfirm v-if="scope.row.top==1" confirm-button-text='好的' cancel-button-text='取消' icon="el-icon-info" icon-color="red" title="取消置顶这个资讯吗" @confirm="topInfo(scope.row, 0)">
            <el-button slot="reference" style="color: #DAA520" type="text">取消置顶</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
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
    <el-pagination background layout="prev, pager, next" style="margin: 20px" :page-count="current.total" :current-page.sync="current.current" @current-change="handleSelectChange"></el-pagination>
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
      viewVisible: false,
      actData: {},
      typeList: [
        {
          id: 0,
          name: '所有资讯',
        },
        {
          id: 1,
          name: '种子会动态',
        },
        {
          id: 2,
          name: '会员风采',
        },
        {
          id: 3,
          name: '会员单位',
        },
        {
          id: 4,
          name: '家乡新闻',
        },
        {
          id: 5,
          name: '置顶咨询',
        },
      ],
    }
  },
  mounted() {
    this.getAllInfo()
  },
  methods: {
    getInfo() {},
    getAllInfo() {
      let getAPI = { current: this.current.current }
      this.$http.getAllInfo(getAPI).then((res) => {
        // console.log(res)
        var resp = res.data.AllDynamic
        for (let i = 0; i < resp.length; i++) {
          if (resp[i].category == 1) {
            resp[i].type = '种子会动态'
          } else if (resp[i].category == 2) {
            resp[i].type = '会员风采'
          } else if (resp[i].category == 3) {
            resp[i].type = '会员单位'
          } else if (resp[i].category == 4) {
            resp[i].type = '家乡新闻'
          } else {
            resp[i].type = '未知'
          }
          resp[i].top = '0'
        }
        this.current.total = Math.ceil(res.data.total / 20)
        this.tableData = resp
      })
    },
    handleSelectChange() {
      this.tableData = []
      this.current.current = 1
      this.current.total = 0
      if (this.current.type == 0) {
        this.getAllInfo()
      } else {
        this.getInfoByCategroy()
      }
    },
    getInfoByCategroy() {
      let getAPI = { current: this.current.current }
      switch (this.current.type) {
        case 1:
          this.$http.getSeedInfo(getAPI).then((res) => {
            // console.log(res)
            var resp = res.data.rows
            for (let i = 0; i < resp.length; i++) {
              resp[i].top = '0'
              resp[i].type = '种子会动态'
              this.tableData.push(resp[i])
            }
            this.current.total = Math.ceil(res.data.total / 20)
          })
          break
        case 2:
          this.$http.getMemberInfo(getAPI).then((res) => {
            // console.log(res)
            var resp = res.data.rows
            for (let i = 0; i < resp.length; i++) {
              resp[i].top = '0'
              resp[i].type = '会员风采'
              this.tableData.push(resp[i])
            }
            this.current.total = Math.ceil(res.data.total / 20)
          })
          break
        case 3:
          this.$http.getCountryInfo(getAPI).then((res) => {
            // console.log(res)
            var resp = res.data.rows
            for (let i = 0; i < resp.length; i++) {
              resp[i].top = '0'
              resp[i].type = '会员单位'
              this.tableData.push(resp[i])
            }
            this.current.total = Math.ceil(res.data.total / 20)
          })
          break
        case 4:
          this.$http.getCompanyInfo(getAPI).then((res) => {
            // console.log(res)
            var resp = res.data.rows
            for (let i = 0; i < resp.length; i++) {
              resp[i].top = '0'
              resp[i].type = '家乡新闻'
              this.tableData.push(resp[i])
            }
            this.current.total = Math.ceil(res.data.total / 20)
          })
          break
        case 5:
          this.$http.getToppingInfo(getAPI).then((res) => {
            // console.log(res)
            var resp = res.data.AllDynamic
            for (let i = 0; i < resp.length; i++) {
              resp[i].top = '1'
              resp[i].type = '置顶资讯'
              this.tableData.push(resp[i])
            }
            this.current.total = Math.ceil(res.data.total / 20)
          })
          break
      }
    },
    viewInfo(row) {
      var getAPI = { id: row.id }
      this.$http.getOneInfo(getAPI).then((res) => {
        this.actData = res.data.Info
        // console.log(this.actData)
        this.viewVisible = true
      })
    },
    editInfo(row) {
      this.$router.push({
        path: '/index/releaseInfo',
        query: { id: row.id },
      })
    },
    deleteInfo(row) {
      // console.log(row)
      var postAPI = { id: row.id }
      this.$http.deleteOneInfo(postAPI).then((res) => {
        if (res.code == 20000) {
          this.$message({
            message: '删除成功',
            type: 'success',
          })
          this.getAllInfo()
        }
      })
    },
    topInfo(row, top) {
      var postAPI = {
        id: row.id,
        top: top,
      }
      this.$http.editOneInfo(postAPI).then((res) => {
        if (res.code == 20000) {
          this.$message({
            message: top == 0 ? '取消置顶成功' : '置顶成功',
            type: 'success',
          })
          this.handleSelectChange()
        }
      })
    },
  },
}
</script>
<style scoped>
</style>