<template>
  <el-col>
    <el-menu default-active="/index/welcome" class="el-menu-vertical-demo" router>
      <el-submenu index="0">
        <template slot="title"><i class="el-icon-message"></i>首页</template>
        <el-menu-item index="/index/welcome">welcome</el-menu-item>
      </el-submenu>
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>编辑器</template>
        <el-menu-item index="/index/testEditor">富文本编辑器</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-message"></i>活动管理</template>
        <el-menu-item index="/index/releaseActivities">发布活动</el-menu-item>
        <el-menu-item index="/index/allActivities">所有活动</el-menu-item>
        <el-menu-item index="/index/activityApplication">活动申请审核</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-message"></i>公司管理</template>
        <el-menu-item index="/index/allCompanies">所有公司</el-menu-item>
        <el-menu-item index="/index/companyApplication">单位入会审核</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title"><i class="el-icon-message"></i>资讯管理</template>
        <el-menu-item index="/index/releaseInfo">发布资讯</el-menu-item>
        <el-menu-item index="/index/allInfo">所有资讯</el-menu-item>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title"><i class="el-icon-message"></i>超级管理员</template>
        <el-menu-item index="/index/">添加管理员</el-menu-item>
        <el-menu-item index="/index/">所有管理员</el-menu-item>
      </el-submenu>
      <el-submenu index="7">
        <template slot="title"><i class="el-icon-message"></i>种子会信息</template>
        <el-menu-item index="/index/message">种子会信息</el-menu-item>
      </el-submenu>
      <el-submenu index="8">
        <template slot="title"><i class="el-icon-message"></i>会员管理</template>
        <el-menu-item index="/index/allMember">所有会员</el-menu-item>
        <el-menu-item index="/index/allUser">所有用户</el-menu-item>
        <el-menu-item index="/index/userApplication">用户入会审核</el-menu-item>
      </el-submenu>
      <el-menu-item index="/index/help"><i class="el-icon-menu"></i>帮助中心</el-menu-item>
      <el-menu-item index="/index/feedback"><i class="el-icon-setting"></i>意见反馈</el-menu-item>
    </el-menu>
  </el-col>
</template>
