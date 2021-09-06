import {
	flyio,
	url
} from './config.js';
import {
	uploadPic
} from './uploadPicture.js'
// var {platform} = require('../config/index')
//公共链接
//接口列表
export class Api {
	// 登录
	getOpenid = async (data) => {
		let res = await flyio.post("/user/getOpenid", JSON.stringify(data))
		return res.data
	}
	// 获取普通用户信息
	getUserMsg = async () => {
		let res = await flyio.get("/user/findBaseInfo")
		return res.data
	}

	// 更改用户基本资料
	changeUserMsg = async (data) => {
		let res = await flyio.post("/user/updateBaseInfo", data)
		return res.data
	}

	// 更改会员详细信息
	changeManageMsg = async (data) => {
		let res = await flyio.post("/user/updateMemberDetailInfo", data)
		return res.data
	}

	// 获取会员信息
	getMemberMsg = async () => {
		let res = await flyio.get("/user/findDetailInfo")
		return res.data
	}
	// 获取会员单位资讯
	getCompanyInfo = async (data) => {
		let res = await flyio.get("/info/PageFindCompanyDynamic/" + data.current + "/" + data.limit)
		return res.data
	}
	// 获取家乡新闻资讯
	getCountryInfo = async (data) => {
		let res = await flyio.get("/info/PageFindCountryDynamic/" + data.current + "/" + data.limit)
		return res.data
	}
	// 获取会员风采资讯
	getMemberInfo = async (data) => {
		let res = await flyio.get("/info/PageFindMemberDynamic/" + data.current + "/" + data.limit)
		return res.data
	}
	// 获取种子会动态资讯
	getSeedInfo = async (data) => {
		let res = await flyio.get("/info/PageFindSeedDynamic/" + data.current + "/" + data.limit)
		return res.data
	}
	// 获取某个资讯具体内容
	getOneInfo = async (data) => {
		let res = await flyio.get("/info/findAllDynamicDetail?id=" + data.id)
		return res.data
	}
	// 查询咨询
	searchIfo = async (data) => {
		let res = await flyio.post("/info/PageFindDynamic/" + data.current + "/20", data)
		return res.data
	}

	// 获取所有活动
	getActivity = async (data) => {
		let res = await flyio.get("/activity/list/" + data.current + "/" + data.limit)
		return res
	}

	// 获取活动详情
	getAcrivityDetails = async (data) => {
		let res = await flyio.get(`/activity/actDetail?id=${data.id}`)
		return res
	}

	// 参与活动
	participateActivity = async (data) => {
		let res = await flyio.post(`/activity/apply?id=${data.id}`)
		return res
	}

	// 放弃活动
	quitActivity = async (data) => {
		let res = await flyio.post(`/activity/quit_apply?id=${data.id}`)
		return res
	}

	// 获取活动状态情况
	getActivityState = async (data) => {
		let res = await flyio.get('/activity/queryApply')
		return res
	}

	// 获取种子会介绍
	getIntroduction = async () => {
		let res = await flyio.get("/intro/getIntroduce")
		return res.data
	}

	// 上传图片
	uploadPicture = async (data) => {
		let res = uploadPic({
			data: data
		})
		return res
	}

	// 获得首页轮播图
	getHomeCarousel = async () => {
		let res = await flyio.get("/oss/findAllInfoImag")
		return res.data
	}

	// 种子会介绍轮播图
	getInfoCarousel = async () => {
		let res = await flyio.get("/oss/findSeedIntroImag")
		return res.data
	}

	// 会员单位列表
	getCompanyList = async (data) => {
		let res = await flyio.get(`/company/pageCompanySimpleInfo/${data.current}/${data.limit}`)
		return res.data
	}

	// 会员单位详情
	getCompanyDetail = async (data) => {
		let res = await flyio.post(`/company/findCompanyDetailInfo?openid=${data.openid}`)
		return res.data
	}

	// 首页管理层会员介绍
	getManagerList = async (data) => {
		let res = await flyio.get(`/user/pageManageSimpleInfo/${data.current}/${data.limit}`)
		return res.data
	}

	// 会员列表
	getUserList = async (data) => {
		let res = await flyio.get(`/user/pageMemberSimpleInfo/${data.current}/${data.limit}`)
		return res.data
	}

	// 首页获取用户信息
	getUserInfo = async (data) => {
		let res = await flyio.get(`/user/findBaseInfo/${data.openid}`)
		return res.data
	}

	// 获取用户详细信息
	getUserDetail = async (data) => {
		let res = await flyio.get(`/user/findDetailInfo/${data.openid}`)
		return res.data
	}

	// 招聘信息列表
	getJobList = async (data) => {
		let res = await flyio.get(
			`/hr/companyInterview/getComList/${data.current}/${data.limit}?job=${data.job}&companyId=${data.companyId}`
		)
		return res.data
	}

	// 招聘信息详情
	getJobDetail = async (data) => {
		let res = await flyio.get(`/hr/companyInterview/getInfo?id=${data.id}`)
		return res.data
	}

	// 申请律师
	applyLayer = async (data) => {
		let res = await flyio.post('/pro/lawyer/apply', data)
		return res.data
	}

	// 申请会员
	applyMember = async (data) => {
		let res = await flyio.post('/user/applyMember', data)
		return res.data
	}

	// 申请公司
	applyComopany = async (data) => {
		let res = await flyio.post('/company/applyCompany', data)
		return res.data
	}

	// 查看法律常识列表
	getLawInfo = async (data) => {
		let res = await flyio.get(`/pro/lawyer/list/${data.current}?key=${data.key}`)
		return res.data
	}

	// 法律常识详情
	getLawInfoDetail = async (data) => {
		let res = await flyio.get(`/pro/lawyer/detail?id=${data.id}`)
		return res.data
	}

	// 律师列表
	getLawyerList = async (data) => {
		let res = await flyio.get(`/pro/lawyer/lawer/${data.current}?key=${data.key}`)
		return res.data
	}

	// 获得自己发布的法律常识
	getLawInfoMe = async () => {
		let res = await flyio.get(`/pro/lawyer/mypub`)
		return res.data
	}

	// 发布法律常识
	releaseLaw = async (data) => {
		let res = await flyio.post("/pro/lawyer/pub", data)
		return res.data
	}

	// 删除自己发布的法律
	deleteLaw = async (data) => {
		let res = await flyio.post(`/pro/lawyer/del?id=${data.id}`)
		return res.data
	}

	// 获取离线消息
	getLeaveMessage = async (data) => {
		let res
		if (data)
			res = await flyio.get(`/user/msgGet?toOpenid=${data.toOpenid}`)
		else
			res = await flyio.get(`/user/msgGet`)
		return res.data
	}

	// 发送离线消息
	sendLeaveMessage = async (data) => {
		let res = await flyio.post(`/user/msgSave?toOpenid=${data.toOpenid}&content=${data.content}`)
		return res.data
	}

	// 删除离线消息
	deleteLeaveMessage = async (data) => {
		let res = await flyio.post(`/user/msgDel?toOpenid=${data.toOpenid}`)
		return res.data
	}

	//投递简历
	submitResume = async (data) => {
		let res = await flyio.post(`/pro/resume/submit?companyInterviewId=${data.companyInterviewId}`)
		return res.data
	}

	// 会员获取自己简历信息
	getResume = async () => {
		let res = await flyio.get("/pro/resume/get")
		return res.data
	}

	// 会员添加修改自己的简历
	addResume = async (data) => {
		let res = await flyio.post("/pro/resume/add", data)
		return res.data
	}

	// 会员删除自己的简历
	deleteResume = async (data) => {
		let res = await flyio.post(`/pro/resume/del?id=${data.id}`)
		return res.data
	}

	// 会员投递过简历的列表
	getGoJobList = async () => {
		let res = await flyio.post("/pro/resume/userGetSubmit")
		return res.data
	}

	// 取消投递简历
	cancelResume = async (data) => {
		let res = await flyio.post(`/pro/resume/cancel?companyInterviewId=${data.companyInterviewId}`)
		return res.data
	}

	// 会员单位发布招聘信息
	releaseJobNeed = async (data) => {
		let res = await flyio.post("/hr/companyInterview/add", data)
		return res.data
	}

	// 删除招聘信息
	deleteJobNeed = async (data) => {
		let res = await flyio.post(`/hr/companyInterview/del?id=${data.id}`)
		return res.data
	}

	// 修改招聘信息
	editJobNeed = async (data) => {
		let res = await flyio.post("/hr/companyInterview/update", data)
		return res.data
	}

	// hr 获取投递招聘信息的会员列表
	getSubmitResumeList = async (data) => {
		let res = await flyio.get(
			`/pro/resume/getSumbit/${data.current}/${data.limit}?companyInfoId=${data.companyInfoId}`)
		return res.data
	}

	// 发布评论
	postReply = async (data) => {
		let res
		if (data.commentId) {
			res = await flyio.get(
				`/pro/comment/pub?infoId=${data.infoId}&content=${data.content}&commentId=${data.commentId}`
			)
		} else {
			res = await flyio.get(`/pro/comment/pub?infoId=${data.infoId}&content=${data.content}`)
		}
		return res.data
	}

	// 获取评论下面的回复
	getReply = async (data) => {
		let res = await flyio.get(`/pro/comment/getReplyComment?commentId=${data.commentId}`)
		return res.data
	}

	// 删除评论
	deleteReply = async (data) => {
		let res = await flyio.get(`/pro/comment/del?id=${data.id}`)
		return res.data
	}

	//获得所有资讯
	getAllHomeInfo = async (data) => {
		let res = await flyio.get(`/info/findAllDynamic/${data.current}?openid=${data.openid?data.openid:''}`)
		return res.data
	}

	// 获得置顶资讯
	getTopHomeInfo = async () => {
		let res = await flyio.get("/info/findAllDynamicTop")
		return res.data
	}

	// 发布资讯
	submitInfo = async (data) => {
		let res = await flyio.post("/info/addInfo", data)
		return res.data
	}

	// 删除资讯
	deleteInfo = async (data) => {
		let res = await flyio.get(`/info/delInfo?id=${data.id}`)
		return res.data
	}

	// 修改资讯
	updateInfo = async (data) => {
		let res = await flyio.post("/info/updateInfo", data)
		return res.data
	}
	// 点赞资讯
	praiseInfo = async (data) => {
		let res = await flyio.get("/info/like?id=" + data.id)
		return res.data
	}
	// 点赞资讯
	collectInfo = async (data) => {
		let res = await flyio.get("/info/col?id=" + data.id)
		return res.data
	}
	// 获得我的收藏列表
	getCollectionInfo = async () => {
		let res = await flyio.get("/info/getMyCol")
		return res.data
	}
	
	// 获得简历列表
	getResumeList = async (data) => {
		let res = await flyio.get(`/pro/resume/getPublish/${data.current}/${data.limit}`)
		return res.data
	}
	
	// 发布简历
	releaseResume = async (data) =>{
		let res = await flyio.get(`/pro/resume/publish?publish=${data.publish}`)
		return res.data
	}
	
	// 简历详情
	getResumeDetail = async (data) => {
		let res = await flyio.get(`/pro/resume/getPublishDetail?id=${data.id}`)
		return res.data
	}
}



export default new Api();
