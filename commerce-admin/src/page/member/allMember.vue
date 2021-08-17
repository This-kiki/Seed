<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" class="demo-table-expand" label-width="180px">
            <el-form-item label="身份证号码">
              <span>{{ props.row.idNum }}</span>
            </el-form-item>
            <el-form-item label="职位">
              <span>{{ getsbuLevel(props.row.subLevel) }}</span>
            </el-form-item>
            <el-form-item label="电子邮箱">
              <span>{{ props.row.email }}</span>
            </el-form-item>
            <!-- <el-form-item label="手机号码">
              <span>{{ props.row.phone }}</span>
            </el-form-item> -->
            <el-form-item label="专业">
              <span>{{ props.row.major }}</span>
            </el-form-item>
            <el-form-item label="性别">
              <span>{{ props.row.sex==0?'男':'女' }}</span>
            </el-form-item>
            <el-form-item label="出生日期">
              <span>{{ props.row.birth }}</span>
            </el-form-item>
            <el-form-item label="民族">
              <span>{{ props.row.nation }}</span>
            </el-form-item>
            <el-form-item label="籍贯">
              <span>{{ props.row.place }}</span>
            </el-form-item>
            <el-form-item label="政治面貌">
              <span>{{ props.row.polity }}</span>
            </el-form-item>
            <el-form-item label="现任工作单位">
              <span>{{ props.row.work }}</span>
            </el-form-item>
            <!-- <el-form-item label="工作单位职位">
              <span>{{ props.row.position }}</span>
            </el-form-item> -->
            <el-form-item label="在读/毕业学校">
              <span>{{ props.row.school }}</span>
            </el-form-item>
            <el-form-item label="头像">
              <img :src="props.row.img" alt="">
            </el-form-item>
            <el-form-item label="个人简介">
              <span>{{ props.row.introduce }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="150">
      </el-table-column>
      <el-table-column prop="phone" label="手机号码" width="100">
      </el-table-column>
      <el-table-column prop="position" label="工作单位职位" width="150">
      </el-table-column>
      <el-table-column prop="" label="">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-popconfirm confirm-button-text='确定' cancel-button-text='取消' icon="el-icon-info" icon-color="red" title="确定删除该会员吗" @confirm="deleteMember(scope.row)">
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
    this.getAllMember()
  },
  methods: {
    getsbuLevel(key) {
      switch (key) {
        case 4:
          return '荣誉会长'
          break
        case 5:
          return '会长'
          break
        case 6:
          return '副会长'
          break
        case 7:
          return '执行委员会成员'
          break
        case 8:
          return '秘书长'
          break
        case 9:
          return '会计'
          break
        case 10:
          return '出纳'
          break
        case 11:
          return '会员'
          break
        default:
          break
      }
    },
    getAllMember() {
      // let getAPI = { current: this.current.current }
      this.$http.getMember().then((res) => {
        // console.log(res)
        var resp = res.data.userList
        this.tableData = resp
      })
    },
    deleteMember(row) {
      // console.log(row)
      var postAPI = { openId: row.openId }
      this.$http.deleteMember(postAPI).then((res) => {
        if (res.code == 20000) {
          this.$message({
            message: '删除成功',
            type: 'success',
          })
          this.getAllMember()
        }
      })
    },
  },
}
</script>
<style scoped>
</style>