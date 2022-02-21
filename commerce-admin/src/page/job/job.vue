<template>
  <div>
    <el-row>
      <el-col class="topLine">
        <el-form class="search" ref="form">
          <el-form-item>
            <el-input
              type="text"
              placeholder="请输入招聘名"
              v-model="searchJob"
              style="margin-top: 10px"
              clearable
            ></el-input>
          </el-form-item>
          <div>
            <el-button
              style="margin: 15px 10px"
              round
              type="success"
              plain
              size="small"
              @click="getJobList"
              >点击搜索</el-button
            >
          </div>
        </el-form>

        <el-select
          v-model="classfication"
          placeholder="请选择"
          @change="getJobList"
          size="small"
        >
          <el-option
            v-for="(item, index) in cateList"
            :key="index"
            :label="item"
            :value="index"
          >
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-table :data="jobList" border style="width: 100%">
      <el-table-column prop="job" label="名称"> </el-table-column>
      <el-table-column prop="companyName" label="公司"> </el-table-column>
      <el-table-column prop="classfication" label="类别" width="50">
        <template slot-scope="scope">
          <div>
            {{ cateList[scope.row.classfication] }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="reward" label="薪酬" width="120">
      </el-table-column>
      <el-table-column prop="need" label="需求"> </el-table-column>
      <el-table-column prop="experience" label="经验" width="80">
      </el-table-column>
      <el-table-column prop="education" label="学历" width="80">
      </el-table-column>
      <el-table-column prop="num" label="人数" width="50"> </el-table-column>
      <el-table-column prop="place" label="工作地点"> </el-table-column>
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-popconfirm
            confirm-button-text="好的"
            cancel-button-text="取消"
            icon="el-icon-info"
            icon-color="red"
            title="确定删除该招聘吗"
            @confirm="delJob(scope.row.id)"
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
    <el-pagination
      background
      layout="prev, pager, next"
      style="margin: 20px"
      :total="total"
      :current-page.sync="current"
      @current-change="getJobList"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 搜索
      searchJob: "",
      // 类型 0 兼职 1 实习 2 校招 3 社招
      classfication: "",
      // 当前页
      current: 1,
      // 每页条数
      limit: 20,
      // 总数
      total: 0,
      // 招聘列表
      jobList: [],
      // 类别列表
      cateList: ["兼职", "实习", "校招", "社招", "所有招聘"],
    };
  },
  created() {
    this.getJobList();
  },
  methods: {
    // 获取招聘列表
    async getJobList() {
      this.classfication = this.classfication == 4 ? "" : this.classfication;
      let obj = {
        current: this.current,
        limit: this.limit,
        job: this.searchJob,
        classfication: this.classfication,
      };
      let res = await this.$http.getJobList(obj);
      //   console.log(res.data);
      this.jobList = res.data.list;
      this.total = res.data.total;
    },
    // 删除
    async delJob(id) {
      let res = await this.$http.delJob({ id });
    //   console.log(res.data);
      this.getJobList()
    },
  },
};
</script>
<style scoped>
.topLine {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.search {
  display: flex;
  align-content: center;
}
img {
  max-width: 400px;
  height: auto;
}
</style>