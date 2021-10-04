<template>
  <div>
    <el-row style="margin: 10px 0">
      <el-col :span="9" :offset="1">
        <el-col :span="7">
          <el-form ref="form">
            <el-input type="text" placeholder="搜索资讯" v-model="keyword" size="small"></el-input>
          </el-form>
        </el-col>
        <el-col :span="1" :offset="1">
          <el-button @click="searchInfo()" icon="el-icon-search" circle size="small"></el-button>
        </el-col>
      </el-col>
      <el-col :span="2" :offset="11">
        <div>
          <el-select v-model="current.type" placeholder="请选择" @change="handleSelectChange" size="small">
            <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="搜索结果" :visible.sync="searchDialog" width="80%">
      <el-table :data="searchForm" border style="width: 100%">
        <el-table-column prop="title" label="资讯名" width="200">
        </el-table-column>
        <el-table-column prop="type" label="类型" width="100"> </el-table-column>
        <el-table-column prop="createTime" label="发布时间" width="200">
        </el-table-column>
        <el-table-column prop="simpleContent" label="主要内容"></el-table-column>
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
    </el-dialog>
    <el-table :data="tableData" border style="width: 100%">
      <!-- <el-table-column prop="id" label="资讯ID" width="300"> </el-table-column> -->
      <el-table-column prop="title" label="资讯名" width="200">
      </el-table-column>
      <el-table-column prop="type" label="类型" width="100"> </el-table-column>
      <el-table-column prop="createTime" label="发布时间" width="200">
      </el-table-column>
      <el-table-column prop="simpleContent" label="主要内容"></el-table-column>
      <!-- <el-table-column prop="" label=""></el-table-column> -->
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

        <!-- 评论 -->
        <div class="comment">
          <!-- 所有评论列表 -->
          <div class="comment-list">
            <!-- 某个评论 -->
            <div class="comment-item" v-for="(item,index) in commentForm" :key="index">
              <div v-if="item.img" class="comment-item-head" :style="'background-image: url(' + item.img + ');'"></div>
              <div v-if="!item.img" class="comment-item-head" style="background-image: url('../../../static/img/head.webp');"></div>
              <div class="comment-text">
                <div class="comment-item-user">{{ item.name?item.name:'游客' }}</div>
                <div class="comment-item-content">{{ item.content }}</div>
                <div class="comment-item-tile">
                  <div class="comment-item-reply">
                    <span class="iconfont comment-item-to">&#xe623;</span>
                  </div>
                  <div class="comment-item-time">{{ formatMsgTime(item.createTime) }}</div>
                  <span class="iconfont comment-item-delete" @click="deleteComment(item.id)">&#xe608;</span>
                </div>
              </div>
            </div>
          </div>
          <div style="height: 100rpx;">

          </div>
        </div>

      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      commentForm: [],
      tableData: [],
      current: {
        type: 0,
        current: 0,
        total: 0,
      },
      searchDialog: false,
      searchForm: [],
      keyword: "",
      viewVisible: false,
      actData: {},
      typeList: [
        {
          id: 0,
          name: "所有资讯",
        },
        {
          id: 1,
          name: "种子会动态",
        },
        {
          id: 2,
          name: "会员风采",
        },
        {
          id: 3,
          name: "会员单位",
        },
        {
          id: 4,
          name: "家乡新闻",
        },
        {
          id: 5,
          name: "普通资讯",
        },
        {
          id: 6,
          name: "知识板块",
        },
        {
          id: 7,
          name: "法律常识",
        },
        {
          id: 8,
          name: "置顶资讯",
        },
      ],
    };
  },
  mounted() {
    this.getAllInfo();
  },
  methods: {
    getAllInfo() {
      let getAPI = { current: this.current.current };
      this.$http.getAllInfo(getAPI).then((res) => {
        // console.log(res)
        var resp = res.data.AllDynamic;
        for (let i = 0; i < resp.length; i++) {
          resp[i].top = "0";
        }
        this.current.total = Math.ceil(res.data.AllDynamic.length / 20);
        this.tableData = resp;
      });
    },
    handleSelectChange() {
      this.tableData = [];
      this.current.current = 1;
      this.current.total = 0;
      if (this.current.type == 0) {
        this.getAllInfo();
      } else if (this.current.type == 8) {
        this.$http.getToppingInfo().then((res) => {
          // console.log(res)
          var resp = res.data.AllDynamic;
          for (let i = 0; i < resp.length; i++) {
            resp[i].top = "1";
            this.tableData.push(resp[i]);
          }
        });
      } else {
        this.getInfoByCategroy();
      }
    },
    getInfoByCategroy() {
      let getAPI = {
        current: this.current.current,
        id: this.current.type,
      };
      this.$http.getInfo(getAPI).then((res) => {
        var resp = res.data.rows;
        for (let i = 0; i < resp.length; i++) {
          resp[i].top = "0";
          this.tableData.push(resp[i]);
        }
        this.current.total = Math.ceil(res.data.total / 20);
      });
    },
    viewInfo(row) {
      var getAPI = { id: row.id };
      this.$http.getOneInfo(getAPI).then((res) => {
        this.actData = res.data.Info;
        // this.commentForm = res.data.comment
        // console.log(this.actData);
        this.viewVisible = true;
      });
    },
    editInfo(row) {
      this.$router.push({
        path: "/index/releaseInfo",
        query: { id: row.id },
      });
    },
    deleteInfo(row) {
      // console.log(row)
      var postAPI = { id: row.id };
      this.$http.deleteOneInfo(postAPI).then((res) => {
        if (res.code == 20000) {
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.getAllInfo();
        }
      });
    },
    topInfo(row, top) {
      var postAPI = {
        id: row.id,
        top: top,
      };
      this.$http.editOneInfo(postAPI).then((res) => {
        if (res.code == 20000) {
          this.$message({
            message: top == 0 ? "取消置顶成功" : "置顶成功",
            type: "success",
          });
          this.handleSelectChange();
        }
      });
    },
    searchInfo() {
      this.searchDialog = true;
      var getAPI = { keyword: this.keyword };
      this.$http.searchInfo(getAPI).then((res) => {
        this.searchForm = res.data.list;
      });
    },
    formatMsgTime(timespan) {
      var dateTime = new Date(timespan); // 将传进来的字符串或者毫秒转为标准时间
      var year = dateTime.getFullYear();
      var month = dateTime.getMonth() + 1;
      var day = dateTime.getDate();
      // var hour = dateTime.getHours()
      // var minute = dateTime.getMinutes()
      // var second = dateTime.getSeconds()
      var millisecond = dateTime.getTime(); // 将当前编辑的时间转换为毫秒
      var now = new Date(); // 获取本机当前的时间
      var nowNew = now.getTime(); // 将本机的时间转换为毫秒
      var milliseconds = 0;
      var timeSpanStr;
      milliseconds = nowNew - millisecond;
      if (milliseconds <= 1000 * 60 * 1) {
        // 小于一分钟展示为刚刚
        timeSpanStr = "刚刚";
      } else if (
        1000 * 60 * 1 < milliseconds &&
        milliseconds <= 1000 * 60 * 60
      ) {
        // 大于一分钟小于一小时展示为分钟
        timeSpanStr = Math.round(milliseconds / (1000 * 60)) + " 分钟前";
      } else if (
        1000 * 60 * 60 * 1 < milliseconds &&
        milliseconds <= 1000 * 60 * 60 * 24
      ) {
        // 大于一小时小于一天展示为小时
        timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + " 小时前";
      } else if (
        1000 * 60 * 60 * 24 < milliseconds &&
        milliseconds <= 1000 * 60 * 60 * 24 * 15
      ) {
        // 大于一天小于十五天展示位天
        timeSpanStr =
          Math.round(milliseconds / (1000 * 60 * 60 * 24)) + " 天前";
      } else if (
        milliseconds > 1000 * 60 * 60 * 24 * 15 &&
        year === now.getFullYear()
      ) {
        timeSpanStr = month + "-" + day;
      } else {
        timeSpanStr = year + "-" + month + "-" + day;
      }
      return timeSpanStr;
    },
    deleteComment(id) {
      let deleteAPI = {
        id: id,
      };
      this.$http.deleteReply(deleteAPI).then((res) => {
        if (res.success) {
          this.viewInfo(deleteAPI);
        }
      });
    },
  },
};
</script>
<style scoped>
.comment {
  width: 100%;
  margin-bottom: 100rpx;
}

.comment-head {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.comment-reviewnum {
  font-size: 28rpx;
  font-weight: 700;
  margin-left: 30rpx;
}

.comment-fabulousnum {
  font-size: 24rpx;
  margin-right: 30rpx;
  color: rgb(153, 153, 153);
}

.comment-list {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20rpx;
}

.comment-all {
  letter-spacing: 3rpx;
  font-size: 26rpx;
  color: #717171;
  margin: 0 0rpx 20rpx 20rpx;
}

.comment-item {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  padding: 8rpx 0;
}

.comment-item-head {
  height: 8vw;
  width: 8vw;
  border-radius: 500rpx;
  margin: 0 10rpx;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  ovrflow: hidden;
}

.comment-text {
  width: 85vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-bottom: 15rpx;
}

.comment-item-user {
  font-size: 28rpx;
  font-weight: 700;
  margin-bottom: 10rpx;
  letter-spacing: 5rpx;
}

.comment-item-content {
  font-size: 27rpx;
}

.comment-item-tile {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 20rpx;
}

.comment-item-reply {
  width: 130rpx;
  height: 45rpx;
  border-radius: 30rpx;
  background-color: rgb(246, 246, 246);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 30rpx;
}

.comment-item-reply-text {
  font-size: 22rpx;
  color: rgb(35, 35, 35);
  margin-bottom: 4rpx;
  letter-spacing: 2rpx;
}

.comment-item-to {
  font-size: 25rpx;
  color: rgb(35, 35, 35);
}

.comment-item-time {
  font-size: 25rpx;
  color: rgb(152, 152, 152);
  display: flex;
  justify-content: center;
  align-items: center;
}

.comment-item-delete {
  font-size: 28rpx;
  position: absolute;
  right: 40rpx;
}

.comment-item:active {
  background-color: rgb(247, 247, 247);
}
</style>