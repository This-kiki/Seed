<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="图片" width="250">
        <template slot-scope="scope">
          <img :src="scope.row.img" style="height: 100px" />
        </template>
      </el-table-column>
      <el-table-column prop="img" label="图片链接">
      </el-table-column>
      <el-table-column label="位置" width="100">
        <template slot-scope="scope">
          <span>{{ getPosition(scope.row.flag) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="flag" label="资讯id">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-popconfirm
            confirm-button-text="好的"
            cancel-button-text="取消"
            icon="el-icon-info"
            icon-color="red"
            title="确定删除该轮播图吗"
            @confirm="deleteInfo(scope.row)"
          >
            <el-button
              slot="reference"
              type="danger"
              plain
              circle
              icon="el-icon-delete"
              size="small"
            ></el-button>
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
    };
  },
  mounted() {
    this.getAllCarousel();
  },
  methods: {
    getAllCarousel() {
      this.$http.getAllCarousel().then((res) => {
        // console.log(res)
        var resp = res.data.list;
        this.tableData = resp;
      });
    },
    deleteInfo(row) {
      // console.log(row)
      var postAPI = { id: row.id };
      this.$http.deleteCarousel(postAPI).then((res) => {
        if (res.code == 20000) {
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.getAllCarousel();
        }
      });
    },
    getPosition(flag) {
      return flag == 1 ? "种子会" : "首页";
    },
    getID(flag) {
      return flag == 1 ? "无" : toString(flag);
    },
  },
};
</script>
<style scoped>
.search {
  display: flex;
}
</style>