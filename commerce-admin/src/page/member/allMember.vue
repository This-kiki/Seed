<template>
  <div>
    <el-row>
      <el-col class="topLine">
        <el-form class="search" ref="form" :model="name">
          <el-form-item>
            <el-input
              type="text"
              placeholder="请输入姓名"
              v-model="name"
              style="margin-top: 10px"
            ></el-input>
          </el-form-item>
          <div>
            <el-button
              @click="searchMember()"
              style="margin: 15px 10px"
              round
              type="success"
              plain
              size="small"
              >点击搜索</el-button
            >
          </div>
        </el-form>
        <div>
          <el-button
            @click="exportMember"
            style="margin: 15px 0"
            round
            type="success"
            plain
            icon="el-icon-document-copy"
            size="small"
            >导出会员信息</el-button
          >
        </div>
      </el-col>
    </el-row>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form
            label-position="left"
            class="demo-table-expand"
            label-width="180px"
          >
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
              <span>{{ props.row.sex == 0 ? "男" : "女" }}</span>
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
              <img :src="props.row.img" alt="" />
            </el-form-item>
            <el-form-item label="个人简介">
              <span>{{ props.row.introduce }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="150"> </el-table-column>
      <el-table-column prop="phone" label="手机号码" width="180">
      </el-table-column>
      <el-table-column prop="position" label="工作单位职位" width="180">
      </el-table-column>
      <el-table-column prop="" label=""> </el-table-column>
      <el-table-column fixed="right" label="操作" width="130" align="center">
        <template slot-scope="scope">
          <el-button
            style="marginright: 10px"
            type="primary"
            plain
            circle
            icon="el-icon-edit-outline"
            size="small"
            @click="editMember(scope.row)"
          ></el-button>
          <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="取消"
            icon="el-icon-info"
            icon-color="red"
            title="确定删除该会员吗"
            @confirm="deleteMember(scope.row)"
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
    <div>
      <el-dialog title="修改会员信息" :visible.sync="editVisible" width="45%">
        <el-form
          label-position="left"
          class="demo-table-expand"
          label-width="180px"
        >
          <el-form-item label="姓名">
            <!-- <span>{{ editForm.name }}</span> -->
            <el-input v-model="editForm.name"></el-input>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input v-model="editForm.phone"></el-input>
            <!-- <span>{{ editForm.phone }}</span> -->
          </el-form-item>
          <el-form-item label="工作单位职位">
            <el-input v-model="editForm.position"></el-input>
            <!-- <span>{{ editForm.position }}</span> -->
          </el-form-item>
          <el-form-item label="身份证号码">
            <el-input v-model="editForm.idNum"></el-input>
            <!-- <span>{{ editForm.idNum }}</span> -->
          </el-form-item>
          <el-form-item label="职位">
            <el-select v-model="editForm.subLevel" placeholder="职位">
              <el-option
                v-for="(item, index) in rolls"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <!-- <span>{{ getsbuLevel(editForm.subLevel) }}</span> -->
          </el-form-item>
          <el-form-item label="电子邮箱">
            <el-input v-model="editForm.email"></el-input>
            <!-- <span>{{ editForm.email }}</span> -->
          </el-form-item>
          <el-form-item label="专业">
            <el-input v-model="editForm.major"></el-input>
            <!-- <span>{{ editForm.major }}</span> -->
          </el-form-item>
          <el-form-item label="性别">
            <!-- <el-select v-model="editForm.sex" placeholder="性别">
              <el-option
                v-for="(item, index) in sexList"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select> -->
            <span>{{ editForm.sex == 0 ? "男" : "女" }}</span>
          </el-form-item>
          <el-form-item label="出生日期">
            <el-input v-model="editForm.birth"></el-input>
            <!-- <span>{{ editForm.birth }}</span> -->
          </el-form-item>
          <el-form-item label="民族">
            <el-input v-model="editForm.nation"></el-input>
            <!-- <span>{{ editForm.nation }}</span> -->
          </el-form-item>
          <el-form-item label="籍贯">
            <el-input v-model="editForm.place"></el-input>
            <!-- <span>{{ editForm.place }}</span> -->
          </el-form-item>
          <el-form-item label="政治面貌">
            <el-input v-model="editForm.polity"></el-input>
            <!-- <span>{{ editForm.polity }}</span> -->
          </el-form-item>
          <el-form-item label="现任工作单位">
            <el-input v-model="editForm.work"></el-input>
            <!-- <span>{{ editForm.work }}</span> -->
          </el-form-item>
          <el-form-item label="在读/毕业学校">
            <el-input v-model="editForm.school"></el-input>
            <!-- <span>{{ editForm.school }}</span> -->
          </el-form-item>
          <el-form-item label="头像">
            <img :src="editForm.img" alt="" />
          </el-form-item>
          <el-form-item label="个人简介">
            <el-input v-model="editForm.introduce"></el-input>
            <!-- <span>{{ editForm.introduce }}</span> -->
          </el-form-item>
          <el-row>
            <el-col :span="3" :offset="22">
              <el-button @click="editSubmit">修改</el-button>
            </el-col>
          </el-row>
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
      editVisible: false,
      editForm: {},
      name: "",
      sexList: [
        { label: "男", value: 0 },
        { label: "女", value: 1 },
      ],
    };
  },
  mounted() {
    this.getAllMember();
  },
  methods: {
    getsbuLevel(key) {
      switch (key) {
        case 4:
          return "荣誉会长";
          break;
        case 5:
          return "会长";
          break;
        case 6:
          return "副会长";
          break;
        case 7:
          return "执行委员会成员";
          break;
        case 8:
          return "秘书长";
          break;
        case 9:
          return "会计";
          break;
        case 10:
          return "出纳";
          break;
        case 11:
          return "会员";
          break;
        default:
          break;
      }
    },
    getAllMember() {
      // let getAPI = { current: this.current.current }
      this.$http.getMember().then((res) => {
        // console.log(res)
        var resp = res.data.userList;
        this.tableData = resp;
      });
    },
    deleteMember(row) {
      // console.log(row)
      var postAPI = { openid: row.openId };
      this.$http.deleteMember(postAPI).then((res) => {
        if (res.code == 20000) {
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.getAllMember();
        }
      });
    },
    exportMember() {
      let link = document.createElement("a");
      link.style.display = "none";
      link.href =
        "https://hjzpzzh.com/seed/admin/user/getAllMemberDtlInfoToExcel";
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(link.href);
      document.body.removeChild(link);
    },
    editMember(row) {
      this.editVisible = true;
      this.editForm = row;
      console.log(row);
    },
    editSubmit() {
      console.log(this.editForm);
      this.$http.editMember(this.editForm).then((res) => {
        if (res.code == 20000) {
          this.$message({
            message: "修改成功",
            type: "success",
          });
          this.getAllMember();
          this.editVisible = false;
        }
      });
    },
    searchMember() {
      console.log("搜索");
    },
  },
};
</script>
<style scoped>
.topLine {
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.search {
  display: flex;
  align-content: center;
}
</style>