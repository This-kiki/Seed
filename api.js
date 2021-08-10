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

	// 获取所有活动
	getActivity = async (data) => {
		let res = await flyio.get("/activity/list/" + data.current + "/" + data.limit)
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
	
	// 招聘信息列表
	getJobList = async (data)=>{
		let res= await flyio.get(`/hr/companyInterview/getComList/${data.current}/${data.limit}`)
		return res.data
	}
	
	// 招聘信息详情
	getJobDetail = async (data) =>{
		let res = await flyio.get(`/hr/companyInterview/getInfo?id=${data.id}`)
		return res.data
	}
}



export default new Api();
