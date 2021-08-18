<template>
  <div class="header-wraper">
    <el-menu
      theme="dark"
      default-active="1"
      class="el-menu-demo"
      mode="horizontal"
    >
      <li class="title">
        <i class="el-icon-menu"></i>
        <span>濠江珠浦种子会后台管理系统</span>
      </li>
    </el-menu>
  </div>
</template>


<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>


<style media="screen">
.el-menu-demo {
  width: 100%;
  background-color: #1e1e1e;
}
.header-wraper li {
  float: left;
  margin-right: 20px;
  margin-top: 5px;
}

.title {
  padding: 1em 0.2em;
}

.title span {
  font-size: 1.4em;
  margin-left: 5px;
}
.el-select-dropdown__list {
  max-height: 187px !important;
}
.option {
  padding-top: 10px;
}

.user .el-dropdown {
  position: absolute;
  right: 20px;
  padding-top: 20px;
  color: #fff !important;
}
</style>
