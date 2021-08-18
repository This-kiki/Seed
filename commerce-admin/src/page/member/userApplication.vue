<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" label="姓名" width="150"> </el-table-column>
      <el-table-column prop="position" label="工作单位职位" width="150">
      </el-table-column>
      <el-table-column prop="phone" label="手机号" width="150">
      </el-table-column>
      <el-table-column prop="" label=""> </el-table-column>
      <el-table-column fixed="right" label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            plain
            circle
            @click="viewApplyMember(scope.row)"
            icon="el-icon-view"
            size="small"
          ></el-button>
          <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="取消"
            icon="el-icon-info"
            icon-color="red"
            title="确定通过该申请吗"
            @confirm="handleApplyMember(scope.row, 0)"
          >
            <el-button
              slot="reference"
              type="success"
              plain
              circle
              icon="el-icon-check"
              size="small"
            ></el-button>
          </el-popconfirm>
          <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="取消"
            icon="el-icon-info"
            icon-color="red"
            title="确定驳回该申请吗"
            @confirm="handleApplyMember(scope.row, 1)"
          >
            <el-button
              slot="reference"
              type="danger"
              plain
              circle
              icon="el-icon-close"
              size="small"
            ></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      style="margin: 20px"
      :page-count="current.total"
      :current-page.sync="current.current"
      @current-change="getApplyMember"
    ></el-pagination>
    <div>
      <el-dialog title="申请人详情" :visible.sync="viewVisible" width="30%">
        <el-form
          label-position="left"
          class="demo-table-expand"
          label-width="180px"
        >
          <el-form-item label="姓名">
            <span>{{ actData.name }}</span>
          </el-form-item>
          <el-form-item label="身份证号码">
            <span>{{ actData.idNum }}</span>
          </el-form-item>
          <el-form-item label="电子邮箱">
            <span>{{ actData.email }}</span>
          </el-form-item>
          <el-form-item label="手机号码">
            <span>{{ actData.phone }}</span>
          </el-form-item>
          <el-form-item label="专业">
            <span>{{ actData.major }}</span>
          </el-form-item>
          <el-form-item label="性别">
            <span>{{ actData.sex == 0 ? "男" : "女" }}</span>
          </el-form-item>
          <el-form-item label="出生日期">
            <span>{{ actData.birth }}</span>
          </el-form-item>
          <el-form-item label="民族">
            <span>{{ actData.nation }}</span>
          </el-form-item>
          <el-form-item label="籍贯">
            <span>{{ actData.place }}</span>
          </el-form-item>
          <el-form-item label="政治面貌">
            <span>{{ actData.polity }}</span>
          </el-form-item>
          <el-form-item label="现任工作单位">
            <span>{{ actData.work }}</span>
          </el-form-item>
          <el-form-item label="工作单位职位">
            <span>{{ actData.position }}</span>
          </el-form-item>
          <el-form-item label="在读/毕业学校">
            <span>{{ actData.school }}</span>
          </el-form-item>
          <el-form-item label="头像">
            <img :src="actData.img" alt="" />
          </el-form-item>
          <el-form-item label="个人简介">
            <span>{{ actData.introduce }}</span>
          </el-form-item>
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
      viewVisible: false,
      actData: {},
    };
  },
  mounted() {
    this.getApplyMember();
  },
  methods: {
    getApplyMember() {
      let getAPI = { current: this.current.current };
      this.$http.getApplyMember(getAPI).then((res) => {
        // console.log(res)
        this.current.total = Math.ceil(res.data.total / 20);
        var resp = res.data.rows;
        this.tableData = resp;
      });
    },
    viewApplyMember(row) {
      this.actData = row;
      this.viewVisible = true;
    },
    handleApplyMember(row, result) {
      var postAPI = {
        openid: row.openId,
      };
      if (result == 0) {
        this.$http.adoptApplyMember(postAPI).then((res) => {
          if (res.code == 20000) {
            this.$message({
              message: "操作成功",
              type: "success",
            });
            this.getApplyMember();
          }
        });
      } else {
        this.$http.deleteApplyMember(postAPI).then((res) => {
          if (res.code == 20000) {
            this.$message({
              message: "操作成功",
              type: "success",
            });
            this.getApplyMember();
          }
        });
      }
    },
  },
};
</script>
<style scoped>
</style>