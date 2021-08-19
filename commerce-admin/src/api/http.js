import service from './request'

export default {
    // setservice() {
    //     service = axios.create(store.state.user.service)
    // },
    // 上传图片
    uploadImg(data) {
        return service({
            url: '/oss/uploadImag',
            method: 'post',
            data: data
        })
    },
    // 管理员登陆
    userLogin(data) {
        return service({
            url: '/admin/manager/login',
            method: 'post',
            data: data
        })
    },
    // 超级管理员查询普通管理员表
    getGeneralAdmin() {
        return service({
            url: '/admin/manager/get',
            method: 'get'
        })
    },
    // 添加普通管理员
    addGeneralAdmin(data) {
        return service({
            url: '/admin/manager/add',
            method: 'post',
            params: data
        })
    },
    // 删除普通管理员
    deleteGeneralAdmin(data) {
        return service({
            url: '/admin/manager/del',
            method: 'post',
            params: data
        })
    },
    // 获取所有活动
    getActivity(data) {
        return service({
            url: '/activity/list/' + data.current + '/20',
            method: 'get',
        })
    },
    // 查询某个活动
    getOneActivity(data) {
        return service({
            url: '/activity/actDetail',
            method: 'get',
            params: data
        })
    },
    // 发布活动
    addActivity(data) {
        return service({
            url: '/admin/activity/add',
            method: 'post',
            params: data
        })
    },
    // 编辑活动
    editActivity(data) {
        return service({
            url: '/admin/activity/updateAct',
            method: 'post',
            data: data
        })
    },
    // 删除活动
    deleteActivity(data) {
        return service({
            url: '/admin/activity/delAct',
            method: 'post',
            params: data
        })
    },
    // 获取所有活动申请
    getApplyActivity(data) {
        return service({
            url: '/admin/activity/apply_list/' + data.current + '/20',
            method: 'get',
        })
    },
    // 通过或驳回活动申请
    handleApplyActivity(data) {
        return service({
            url: '/admin/activity/updateApply',
            method: 'post',
            params: data
        })
    },
    // 获取会员单位资讯
    getCompanyInfo(data) {
        return service({
            url: '/info/PageFindCompanyDynamic/' + data.current + '/20',
            method: 'get',
        })
    },
    // 获取家乡新闻资讯
    getCountryInfo(data) {
        return service({
            url: '/info/PageFindCompanyDynamic/' + data.current + '/20',
            method: 'get',
        })
    },
    // 获取会员风采资讯
    getMemberInfo(data) {
        return service({
            url: '/info/PageFindCountryDynamic/' + data.current + '/20',
            method: 'get',
        })
    },
    // 获取种子会动态资讯
    getSeedInfo(data) {
        return service({
            url: '/info/PageFindSeedDynamic/' + data.current + '/20',
            method: 'get',
        })
    },
    // 获取所有资讯
    getAllInfo() {
        return service({
            url: '/info/findAllDynamic',
            method: 'get',
        })
    },
    // 查询资讯
    getOneInfo(data) {
        return service({
            url: '/info/findDynamic/' + data.id,
            method: 'get',
        })
    },
    // 添加会员单位资讯
    addCompanyInfo(data) {
        return service({
            url: '/admin/info/addCompanyDynamic',
            method: 'post',
            data: data
        })
    },
    // 添加家乡新闻资讯
    addCountryInfo(data) {
        return service({
            url: '/admin/info/addCountryDynamic',
            method: 'post',
            data: data
        })
    },
    // 添加会员风采资讯
    addMemberInfo(data) {
        return service({
            url: '/admin/info/addMemberDynamic',
            method: 'post',
            data: data
        })
    },
    // 添加种子会动态资讯
    addSeedInfo(data) {
        return service({
            url: '/admin/info/addSeedDynamic',
            method: 'post',
            data: data
        })
    },
    // 修改资讯内容
    editOneInfo(data) {
        return service({
            url: '/admin/info/alterDynamic/' + data.id,
            method: 'post',
            data: data
        })
    },
    // 删除咨询
    deleteOneInfo(data) {
        return service({
            url: '/admin/info/delSeedDynamic/' + data.id,
            method: 'get',
        })
    },
    // 获取所有公司
    getCompany() {
        return service({
            url: '/admin/company/findAllCompany',
            method: 'get',
        })
    },
    // 获取所有申请公司
    getApplyCompany(data) {
        return service({
            url: '/admin/company/findAllCompanyApplyMeeting/' + data.current + '/20',
            method: 'get',
        })
    },
    // 删除公司
    deleteCompany(data) {
        return service({
            url: '/admin/company/delCompany',
            method: 'post',
            data: data
        })
    },
    // 导出所有公司
    exportCompany() {
        return service({
            url: '/admin/company/getAllCompanyDtlInfoToExcel',
            method: 'get',
            headers: {
                responseType: "blob",
                withCredentials: true
            }
        })
    },
    // 通过公司申请
    adoptApplyCompany(data) {
        return service({
            url: '/admin/company/successCompany',
            method: 'post',
            params: data
        })
    },
    // 修改公司信息
    editCompany(data) {
        return service({
            url: '/company/updateCompanyDetailInfo',
            method: 'post',
            data: data
        })
    },
    // 获取所有律师
    getLayer(data) {
        return service({
            url: '/pro/lawyer/lawer/' + data.current,
            method: 'get',
        })
    },
    // 获取所有申请律师
    getApplyLayer(data) {
        return service({
            url: '/admin/lawer/findAllApplyMeeting/' + data.current,
            method: 'get',
        })
    },
    // 删除律师
    deleteLayer(data) {
        return service({
            url: '/admin/lawer/del',
            method: 'post',
            data: data
        })
    },
    // 通过律师申请
    adoptApplyLayer(data) {
        return service({
            url: '/admin/lawer/update',
            method: 'post',
            params: data
        })
    },
    // 获取所有会员
    getMember(data) {
        return service({
            url: '/admin/user/findAllDetailInfo',
            method: 'get',
            params: data
        })
    },
    // 分页获取所有会员
    getMemberA(data) {
        return service({
            url: '/admin/user/pageFindAllDetailInfo/'+ data.current +'/20',
            method: 'get',
        })
    },
    // 获取所有申请会员
    getApplyMember(data) {
        return service({
            url: '/admin/user/findAllApplyMeeting/' + data.current + '/20',
            method: 'get',
        })
    },
    // 删除会员
    deleteMember(data) {
        return service({
            url: '/admin/user/delMember',
            method: 'post',
            params: data
        })
    },
    // 修改会员信息
    editMember(data) {
        return service({
            url: '/user/updateMemberDetailInfo',
            method: 'post',
            data: data
        })
    },
    // 导出所有会员
    exportMember() {
        return service({
            url: '/admin/user/getAllMemberDtlInfoToExcel',
            method: 'get',
        })
    },
    // 通过会员申请
    adoptApplyMember(data) {
        return service({
            url: '/admin/user/successMember',
            method: 'post',
            params: data
        })
    },
    // 驳回会员申请
    deleteApplyMember(data) {
        return service({
            url: "/admin/user/delOneApplyMeeting",
            method: "get",
            params: data
        })
    },
    // 设置种子会地址
    setAddress(data) {
        return service({
            url: "/admin/intro/setAddress",
            method: "post",
            data
        })
    },

    // 设置种子会章程
    setConstitution(data) {
        return service({
            url: "/admin/intro/setConstitution",
            method: "post",
            data
        })
    },

    // 设置联系人姓名电话
    setContact(data) {
        return service({
            url: "/admin/intro/setContact",
            method: "post",
            data
        })
    },
    // 设置种子会架构
    setFramework(data) {
        return service({
            url: "/admin/intro/setFramework",
            method: "post",
            data
        })
    },
    // 设置种子会介绍
    setIntroduce(data) {
        return service({
            url: "/admin/intro/setIntroduce",
            method: "post",
            data
        })
    },
    // 发布法律常识
    releaseLawInfo(data) {
        return service({
            url: "/admin/lawer/pub",
            method: 'post',
            data
        })
    },

    // 法律常识列表
    getLawInfoList(data) {
        return service({
            url: `/pro/lawyer/list/${data.current}`,
            method: "get",
            params: data
        })
    },

    // 法律常识详情
    getLawInfoDetail(data) {
        return service({
            url: "/pro/lawyer/detail",
            method: "get",
            params: data
        })
    },
    // 删除发布的常识
    deleteLawInfo(data) {
        return service({
            url: "/admin/lawer/delCommon",
            method: "post",
            params: data
        })
    },
    // 获取所有轮播图
    getAllCarousel() {
        return service({
            url: "/admin/oss/findAllImag",
            method: "get"
        })
    },
    //  上传首页轮播图
    uploadHomeCarousel(data) {
        return service({
            url: "/admin/oss/uploadDynamicIntroImag",
            method: "post",
            params: data
        })
    },
    // 上传种子会轮播图
    uploadSeedCarousel(data) {
        return service({
            url: "/admin/oss/uploadSeedIntroImag",
            method: "post",
            params: data
        })
    },
    // 删除轮播图
    deleteCarousel(data) {
        return service({
            url: `/admin/oss/delImagByID/${data.id}`,
            method: "get",
        })
    }
}