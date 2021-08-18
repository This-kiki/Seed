<template>
  <el-col>
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      unique-opened
      router
    >
      <el-submenu index="0">
        <template slot="title"><i class="el-icon-message"></i>首页</template>
        <el-menu-item index="/index/welcome">welcome</el-menu-item>
      </el-submenu>
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>编辑器</template>
        <el-menu-item index="/index/testEditor">富文本编辑器</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"
          ><i class="el-icon-message"></i>会员管理</template
        >
        <el-menu-item index="/index/allMember">所有会员</el-menu-item>
        <el-menu-item index="/index/userApplication">用户入会审核</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"
          ><i class="el-icon-message"></i>公司管理</template
        >
        <el-menu-item index="/index/allCompanies">所有公司</el-menu-item>
        <el-menu-item index="/index/companyApplication"
          >单位入会审核</el-menu-item
        >
      </el-submenu>
      <el-submenu index="4">
        <template slot="title"
          ><i class="el-icon-message"></i>律师管理</template
        >
        <el-menu-item index="/index/allLayer">所有律师</el-menu-item>
        <el-menu-item index="/index/layerApplication"
          >律师入会审核</el-menu-item
        >
        <el-menu-item index="/index/lawInfoList">法律常识列表</el-menu-item>
        <el-menu-item index="/index/releaseLawInfo">发布法律常识</el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title"
          ><i class="el-icon-message"></i>轮播图管理</template
        >
        <el-menu-item index="/index/allCarousel">轮播图列表</el-menu-item>
        <el-menu-item index="/index/releaseCarousel">上传轮播图</el-menu-item>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title"
          ><i class="el-icon-message"></i>种子会信息</template
        >
        <el-menu-item index="/index/message">种子会信息</el-menu-item>
      </el-submenu>
      <el-submenu index="7">
        <template slot="title"
          ><i class="el-icon-message"></i>资讯管理</template
        >
        <el-menu-item index="/index/releaseInfo">发布资讯</el-menu-item>
        <el-menu-item index="/index/allInfo">所有资讯</el-menu-item>
      </el-submenu>
      <el-submenu index="8">
        <template slot="title"
          ><i class="el-icon-message"></i>活动管理</template
        >
        <el-menu-item index="/index/releaseActivities">发布活动</el-menu-item>
        <el-menu-item index="/index/allActivities">所有活动</el-menu-item>
        <el-menu-item index="/index/activityApplication"
          >活动申请审核</el-menu-item
        >
      </el-submenu>
      <el-submenu index="9">
        <template slot="title"
          ><i class="el-icon-message"></i>超级管理员</template
        >
        <el-menu-item index="/index/allAdmin">所有管理员</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-col>
</template>
