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
            url: '/activity/list/' + data.current+'/20',
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
            url: '/admin/activity/apply_list/' + data.current+'/20',
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
            url: '/info/PageFindCompanyDynamic/'+data.current+'/20',
            method: 'get',
        })
	},
	// 获取家乡新闻资讯
	getCountryInfo(data) {
		return service({
            url: '/info/PageFindCompanyDynamic/'+data.current+'/20',
            method: 'get',
        })
	},
	// 获取会员风采资讯
	getMemberInfo(data) {
		return service({
            url: '/info/PageFindCountryDynamic/'+data.current+'/20',
            method: 'get',
        })
	},
	// 获取种子会动态资讯
	getSeedInfo(data) {
		return service({
            url: '/info/PageFindSeedDynamic/'+data.current+'/20',
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
            url: '/info/findDynamic/'+data.id,
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
            url: '/admin/info/alterDynamic/'+data.id,
            method: 'post',
            data: data
        })
    },
    // 删除咨询
    deleteOneInfo(data) {
        return service({
            url: '/admin/info/delSeedDynamic/'+data.id,
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
            url: '/admin/company/findAllCompanyApplyMeeting/'+data.current+'/20',
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
    // 通过公司申请
    adoptApplyCompany(data) {
        return service({
            url: '/admin/company/successCompany',
            method: 'post',
            params: data
        })
    },
    // 获取所有律师
    getLayer(data) {
        return service({
            url: '/pro/lawyer/lawer/'+data.current,
            method: 'get',
        })
    },
    // 获取所有申请律师
    getApplyLayer(data) {
        return service({
            url: '/admin/lawer/findAllApplyMeeting/'+data.current,
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
        })
    },
    // 获取所有申请会员
    getApplyMember(data) {
        return service({
            url: '/admin/user/findAllApplyMeeting/'+data.current+'/20',
            method: 'get',
        })
    },
    // 删除会员
    deleteMember(data) {
        return service({
            url: '/admin/user/delMember',
            method: 'post',
            data: data
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
}