<template>
  <div>
    <el-col :span="2" :offset="22">
      <div style="margin: 10px 0;">
        <el-button type="success" @click="access" size="small" plain> 全 部 审 核 </el-button>
      </div>
    </el-col>
    <el-table :data="tableData" border style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="username" label="申请人" width="150">
      </el-table-column>
      <el-table-column prop="name" label="活动名" width="200">
      </el-table-column>
      <el-table-column prop="createTime" label="申请时间" width="200">
      </el-table-column>
      <el-table-column prop="" label="">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button type="primary" plain circle @click="viewApplyActivity(scope.row)" icon="el-icon-view" size="small"></el-button>
          <el-popconfirm confirm-button-text='确定' cancel-button-text='取消' icon="el-icon-info" icon-color="red" title="确定通过该申请吗" @confirm="handleApplyActivity(scope.row,1)">
            <el-button style="margin: 0 10px" slot="reference" type="success" plain circle icon="el-icon-check" size="small"></el-button>
          </el-popconfirm>
          <el-popconfirm confirm-button-text='确定' cancel-button-text='取消' icon="el-icon-info" icon-color="red" title="确定驳回该申请吗" @confirm="handleApplyActivity(scope.row,2)">
            <el-button slot="reference" type="danger" plain circle icon="el-icon-close" size="small"></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" style="margin: 20px" :page-count="current.total" :current-page.sync="current.current" @current-change="getAllApplyActivity"></el-pagination>
    <div>
      <el-dialog title="活动申请详情" :visible.sync="viewVisible" width="45%">
        <el-descriptions :column='1' border>
          <el-descriptions-item label="姓名">{{actData.username}}</el-descriptions-item>
          <el-descriptions-item label="性别">{{actData.sex}}</el-descriptions-item>
          <el-descriptions-item label="用户名">{{actData.createTime}}</el-descriptions-item>
          <el-descriptions-item label="活动名">{{actData.name}}</el-descriptions-item>
          <el-descriptions-item label="手机号">{{actData.phone}}</el-descriptions-item>
          <el-descriptions-item label="身份证号码">{{actData.idNum }}</el-descriptions-item>
        </el-descriptions>
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
      multipleSelection: [],
    };
  },
  mounted() {
    this.getAllApplyActivity();
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getAllApplyActivity() {
      let getAPI = { current: this.current.current };
      this.$http.getApplyActivity(getAPI).then((res) => {
        // console.log(res)
        this.current.total = Math.ceil(res.data.total / 20);
        var resp = res.data.applyAct;
        for (let i = 0; i < resp.length; i++) {
          if (resp[i].status == 0) {
            resp[i].type = "未审核";
          } else if (resp[i].status == 1) {
            resp[i].type = "已通过";
          } else if (resp[i].status == 2) {
            resp[i].type = "已驳回";
          }
        }
        this.tableData = resp;
      });
    },
    getColor(status) {
      if (status == 0) {
        return "#32CD32";
      } else if (status == 1) {
        return "#696969";
      } else {
        return "#808000";
      }
    },
    viewApplyActivity(row) {
      this.actData = row;
      this.viewVisible = true;
    },
    access() {
      var that = this;
      console.log(this.multipleSelection);
      for (var i = 0; i < this.multipleSelection.length; i++) {
        var postAPI = {
          id: this.multipleSelection[i].id,
          status: 1,
        };
        this.$http.handleApplyActivity(postAPI).then(() => {});
      }
      setTimeout(function () {
        that.getAllApplyActivity();
        if (that.multipleSelection.length == 0) {
          that.$message({
            message: "请先选择需要通过审核的内容",
            type: "warning",
          });
        } else {
          that.$message({
            message: "审核成功",
            type: "success",
          });
        }
      }, 800);
    },
    handleApplyActivity(row, result) {
      var postAPI = {
        id: row.id,
        status: result,
      };
      this.$http.handleApplyActivity(postAPI).then((res) => {
        if (res.code == 20000) {
          this.$message({
            message: "审核成功",
            type: "success",
          });
          this.getAllApplyActivity();
        }
      });
    },
  },
};
</script>
<style scoped>
</style>