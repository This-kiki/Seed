import service from './request';
import servicePic from './uploadPic';

export default {
  // setservice() {
  //     service = axios.create(store.state.user.service)
  // },
  // 上传图片
  uploadImg(data) {
    return servicePic({
      url: '/oss/uploadImag',
      method: 'post',
      data: data,
    });
  },

  uploadImgMany(data) {
    return servicePic({
      url: '/oss/uploadImagMany',
      method: 'post',
      data: data,
    });
  },

  // 获取所有文件
  getFiles() {
    return service({
      url: '/oss/getFile',
      method: 'get',
    });
  },

  // 保存文件信息
  saveFiles(data) {
    return service({
      url: '/oss/saveFile',
      method: 'post',
      data: data,
    });
  },

  // 管理员登陆
  userLogin(data) {
    return service({
      url: '/admin/manager/login',
      method: 'post',
      data: data,
    });
  },
  // 超级管理员查询普通管理员表
  getGeneralAdmin() {
    return service({
      url: '/admin/manager/get',
      method: 'get',
    });
  },
  // 添加普通管理员
  addGeneralAdmin(data) {
    return service({
      url: '/admin/manager/add',
      method: 'post',
      params: data,
    });
  },
  // 删除普通管理员
  deleteGeneralAdmin(data) {
    return service({
      url: '/admin/manager/del',
      method: 'post',
      params: data,
    });
  },
  // 获取所有活动
  getActivity(data) {
    return service({
      url: '/activity/list/' + data.current + '/20',
      method: 'get',
    });
  },
  // 查询某个活动
  getOneActivity(data) {
    return service({
      url: '/activity/actDetail',
      method: 'get',
      params: data,
    });
  },
  // 查询某个活动已通过的人
  getAcceptList(data) {
    return service({
      url: '/admin/activity/accpect_list/1/100',
      method: 'get',
      params: { id: data.id },
    });
  },
  // 发布活动
  addActivity(data) {
    return service({
      url: '/admin/activity/add',
      method: 'post',
      data: data,
    });
  },
  // 编辑活动
  editActivity(data) {
    return service({
      url: '/admin/activity/updateAct',
      method: 'post',
      data: data,
    });
  },
  // 删除活动
  deleteActivity(data) {
    return service({
      url: '/admin/activity/delAct',
      method: 'post',
      params: data,
    });
  },
  // 获取所有活动申请
  getApplyActivity(data) {
    return service({
      url: '/admin/activity/apply_list/' + data.current + '/20',
      method: 'get',
    });
  },
  // 通过或驳回活动申请
  handleApplyActivity(data) {
    return service({
      url: '/admin/activity/updateApply',
      method: 'post',
      params: data,
    });
  },
  //   // 获取单位会员资讯
  //   getCompanyInfo(data) {
  //     return service({
  //       url: '/info/PageFindCompanyDynamic/' + data.current + '/20',
  //       method: 'get',
  //     });
  //   },
  //   // 获取家乡新闻资讯
  //   getCountryInfo(data) {
  //     return service({
  //       url: '/info/PageFindCompanyDynamic/' + data.current + '/20',
  //       method: 'get',
  //     });
  //   },
  //   // 获取会员风采资讯
  //   getMemberInfo(data) {
  //     return service({
  //       url: '/info/PageFindCountryDynamic/' + data.current + '/20',
  //       method: 'get',
  //     });
  //   },
  //   // 获取种子会动态资讯
  //   getSeedInfo(data) {
  //     return service({
  //       url: '/info/PageFindSeedDynamic/' + data.current + '/20',
  //       method: 'get',
  //     });
  //   },
  // 获取各种累心的咨询
  getInfo(data) {
    return service({
      url: '/info/PageLawer/' + data.current + '/20',
      params: data,
      method: 'get',
    });
  },
  // 获取所有资讯
  getAllInfo(data) {
    return service({
      url: '/info/findAllDynamic/' + data.current,
      method: 'get',
    });
  },
  // 获取资讯置顶
  getToppingInfo() {
    return service({
      url: '/info/findAllDynamicTop',
      method: 'get',
    });
  },
  // 查询资讯
  getOneInfo(data) {
    return service({
      url: '/info/findDynamic/' + data.id,
      method: 'get',
    });
  },
  // 模糊查询资讯
  searchInfo(data) {
    return service({
      url: '/info/findSomeDynamic/' + data.keyword,
      method: 'get',
    });
  },
  // 添加资讯
  addSeedInfo(data) {
    return service({
      url: '/admin/info/addInfo',
      method: 'post',
      data: data,
    });
  },
  // 删除评论
  deleteReply(data) {
    return service({
      url: `/pro/comment/del?id=${data.id}`,
      method: 'get',
      data: data,
    });
  },
  // 修改资讯内容
  editOneInfo(data) {
    return service({
      url: '/info/updateInfo',
      method: 'post',
      data: data,
    });
  },
  // 删除咨询
  deleteOneInfo(data) {
    return service({
      url: '/info/delInfo?id=' + data.id,
      method: 'get',
    });
  },
  // 获取所有资讯审核
  getApplyInfo(data) {
    return service({
      url: '/admin/info/getCheckInfo/' + data.current,
      method: 'get',
    });
  },
  // 通过资讯审核
  applyInfo(data) {
    return service({
      url: '/admin/info/check?id=' + data.id + '&status=' + data.status,
      method: 'get',
    });
  },
  // 获取所有公司
  getCompany() {
    return service({
      url: '/admin/company/findAllCompany',
      method: 'get',
    });
  },
  // 获取所有申请公司
  getApplyCompany(data) {
    return service({
      url: '/admin/company/findAllCompanyApplyMeeting/' + data.current + '/20',
      method: 'get',
    });
  },
  // 删除公司
  deleteCompany(data) {
    return service({
      url: '/admin/company/delCompany?openid=' + data.openid,
      method: 'post',
    });
  },
  // 导出所有公司
  exportCompany() {
    return service({
      url: '/admin/company/getAllCompanyDtlInfoToExcel',
      method: 'get',
      headers: {
        responseType: 'blob',
        withCredentials: true,
      },
    });
  },
  // 通过公司申请
  adoptApplyCompany(data) {
    return service({
      url: '/admin/company/successCompany',
      method: 'post',
      params: data,
    });
  },
  // 修改公司信息
  editCompany(data) {
    return service({
      url: '/company/updateCompanyDetailInfo',
      method: 'post',
      data: data,
    });
  },
  // 获取所有律师
  getLayer(data) {
    return service({
      url: '/pro/lawyer/lawer/' + data.current + '/20',
      method: 'get',
    });
  },
  // 获取所有申请律师
  getApplyLayer(data) {
    return service({
      url: '/admin/lawer/findAllApplyMeeting/' + data.current,
      method: 'get',
    });
  },
  // 删除律师
  deleteLayer(data) {
    return service({
      url: '/admin/lawer/del',
      method: 'post',
      params: data,
    });
  },
  // 通过律师申请
  adoptApplyLayer(data) {
    return service({
      url: '/admin/lawer/update',
      method: 'post',
      params: data,
    });
  },
  // 获取所有会员
  getMember(data) {
    return service({
      url: '/admin/user/findAllDetailInfo',
      method: 'get',
      params: data,
    });
  },
  // 分页获取所有会员
  getMemberA(data) {
    return service({
      url: '/admin/user/pageFindAllDetailInfo/' + data.current + '/20',
      method: 'get',
    });
  },
  // 获取所有申请会员
  getApplyMember(data) {
    return service({
      url: '/admin/user/findAllApplyMeeting/' + data.current + '/20',
      method: 'get',
    });
  },
  // 删除会员
  deleteMember(data) {
    return service({
      url: '/admin/user/delMember',
      method: 'post',
      params: data,
    });
  },
  // 修改会员信息
  editMember(data) {
    return service({
      url: '/user/updateMemberDetailInfo',
      method: 'post',
      data: data,
    });
  },
  // 导出所有会员
  exportMember() {
    return service({
      url: '/admin/user/getAllMemberDtlInfoToExcel',
      method: 'get',
    });
  },
  // 通过会员申请
  adoptApplyMember(data) {
    return service({
      url: '/admin/user/successMember',
      method: 'post',
      params: data,
    });
  },
  // 驳回会员申请
  deleteApplyMember(data) {
    return service({
      url: '/admin/user/delOneApplyMeeting',
      method: 'get',
      params: data,
    });
  },
  // 设置种子会地址
  setAddress(data) {
    return service({
      url: '/admin/intro/setAddress',
      method: 'post',
      data,
    });
  },

  // 设置种子会章程
  setConstitution(data) {
    return service({
      url: '/admin/intro/setConstitution',
      method: 'post',
      data,
    });
  },

  // 设置联系人姓名电话
  setContact(data) {
    return service({
      url: '/admin/intro/setContact',
      method: 'post',
      data,
    });
  },
  // 设置种子会架构
  setFramework(data) {
    return service({
      url: '/admin/intro/setFramework',
      method: 'post',
      data,
    });
  },
  // 设置种子会介绍
  setIntroduce(data) {
    return service({
      url: '/admin/intro/setIntroduce',
      method: 'post',
      data,
    });
  },
  // 发布法律常识
  releaseLawInfo(data) {
    return service({
      url: '/admin/lawer/pub',
      method: 'post',
      data,
    });
  },

  // 法律常识列表
  getLawInfoList(data) {
    return service({
      url: `/pro/lawyer/list/${data.current}`,
      method: 'get',
      params: data,
    });
  },

  // 法律常识详情
  getLawInfoDetail(data) {
    return service({
      url: '/pro/lawyer/detail',
      method: 'get',
      params: data,
    });
  },
  // 删除发布的常识
  deleteLawInfo(data) {
    return service({
      url: '/admin/lawer/delCommon',
      method: 'post',
      params: data,
    });
  },
  // 获取所有轮播图
  getAllCarousel() {
    return service({
      url: '/admin/oss/findAllImag',
      method: 'get',
    });
  },
  //  上传首页轮播图
  uploadHomeCarousel(data) {
    return service({
      url: '/admin/oss/uploadDynamicIntroImag',
      method: 'post',
      params: data,
    });
  },
  // 上传种子会轮播图
  uploadSeedCarousel(data) {
    return service({
      url: '/admin/oss/uploadSeedIntroImag',
      method: 'post',
      params: data,
    });
  },
  // 删除轮播图
  deleteCarousel(data) {
    return service({
      url: `/admin/oss/delImagByID/${data.id}`,
      method: 'get',
    });
  },
  // 招聘信息列表
  getJobList(data) {
    return service({
      url: `/hr/companyInterview/getComList/${data.current}/${data.limit}`,
      method: 'get',
      params: data,
    });
  },
  // 删除招聘信息
  delJob(data) {
    return service({
      url: '/hr/companyInterview/del',
      method: 'post',
      params: data,
    });
  },
  // 招聘详细信息
  getJobDetail(data) {
    return service({
      url: 'GET /hr/companyInterview/getInfo',
      method: 'get',
      params: data,
    });
  },
};
