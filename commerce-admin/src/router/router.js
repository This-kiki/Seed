import testEditor from '../page/testEditor/Editor.vue'
import welcome from '../page/welcome/welcome.vue'
import releaseActivities from '../page/activity/releaseActivities.vue'
import allActivities from '../page/activity/allActivities.vue'
import activityApplication from '../page/activity/activityApplication.vue'
import allCompanies from '../page/company/allCompanies.vue'
import companyApplication from '../page/company/companyApplication.vue'
import allInfo from '../page/info/allInfo.vue'
import releaseInfo from '../page/info/releaseInfo.vue'
import allMember from '../page/member/allMember.vue'
import allUser from '../page/member/allUser.vue'
import userApplication from '../page/member/userApplication.vue'
import message from '../page/message/message.vue'
import Help from '../page/help/Help.vue';
import Feedback from '../page/feedback/Feedback.vue';
import App from '../App.vue'
import login from '../page/login/login.vue'
import allLayer from '../page/layer/allLayer.vue'
import layerApplication from '../page/layer/layerApplication.vue'
import releaseLawInfo from "../page/layer/releaseLawInfo.vue"
import lawInfoList from "../page/layer/lawInfoList.vue"
import addAdmin from '../page/superAdmin/addAdmin.vue'
import allAdmin from '../page/superAdmin/allAdmin.vue'
import layout from '../page/appPage/page.vue'

import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

export const routerMap = [{
  path: '/',
  redirect: '/login'
}, {
  path: '/login',
  name: '登录',
  component: login
},
{
  path: '/index',
  component: layout,
  children: [
    {
      path: '/',
      redirect: 'welcome'
    },
    {
      name: '首页',
      path: 'welcome',
      component: welcome
    }, {
      name: '所有活动',
      path: 'allActivities',
      component: allActivities
    }, {
      name: '发布活动',
      path: 'releaseActivities',
      component: releaseActivities
    }, {
      name: '活动申请审核',
      path: 'activityApplication',
      component: activityApplication
    }, {
      name: '所有公司',
      path: 'allCompanies',
      component: allCompanies
    }, {
      name: '单位入会审核',
      path: 'companyApplication',
      component: companyApplication
    }, {
      name: '所有咨询',
      path: 'allInfo',
      component: allInfo
    }, {
      name: '发布咨询',
      path: 'releaseInfo',
      component: releaseInfo
    }, {
      name: '所有会员',
      path: 'allMember',
      component: allMember
    }, {
      name: '所有用户',
      path: 'allUser',
      component: allUser
    }, {
      name: '用户入会审核',
      path: 'userApplication',
      component: userApplication
    }, {
      name: '种子会信息',
      path: 'message',
      component: message
    }, {
      name: '所有律师',
      path: 'allLayer',
      component: allLayer
    }, {
      name: '律师入会审核',
      path: 'layerApplication',
      component: layerApplication
    }, {
      name: "发布法律常识",
      path: "releaseLawInfo",
      component: releaseLawInfo
    }, {
      name: "法律常识列表",
      path: "lawInfoList",
      component: lawInfoList
    },
    {
      name: '帮助',
      path: 'Help',
      component: Help
    },
    {
      name: '意见反馈',
      path: 'feedback',
      component: Feedback
    },
    {
      name: '富文本编辑器',
      path: 'testEditor',
      component: testEditor
    },
    // superAdmin
    {
      name: '所有管理员',
      path: 'allAdmin',
      component: allAdmin
    },
    {
      name: '添加管理员',
      path: 'addAdmin',
      component: addAdmin
    },
  ]
},
{
  path: '*',
  redirect: '/index/welcome'
}
]
export default new Router({
  mode: "history",
  base: "/admin/",
  routes: routerMap
})