import {
	flyio,
	url
} from './config.js';
// var {platform} = require('../config/index')
//公共链接
//接口列表
export class Api {
	// 登录
	// 获取普通用户信息
	getUserMsg = async () => {
		let res = await flyio.get("/user/findBaseInfo")
		return res.data
	}
	// 获取会员信息
	getMemberMsg = async() => {
		let res = await flyio.get("/user/findDetailInfo")
		return res.data
	}
	// 获取会员单位资讯
	getCompanyInfo = async (data) => {
		let res = await flyio.get("/info/PageFindCompanyDynamic/"+data.current+"/"+data.limit)
		return res.data
	}
	// 获取家乡新闻资讯
	getCountryInfo = async (data) => {
		let res = await flyio.get("/info/PageFindCountryDynamic/"+data.current+"/"+data.limit)
		return res.data
	}
	// 获取会员风采资讯
	getMemberInfo = async (data) => {
		let res = await flyio.get("/info/PageFindMemberDynamic/"+data.current+"/"+data.limit)
		return res.data
	}
	// 获取种子会动态资讯
	getSeedInfo = async (data) => {
		let res = await flyio.get("/info/PageFindSeedDynamic/"+data.current+"/"+data.limit)
		return res.data
	}
	
	// 获取种子会介绍
	getIntroduction = async data=>{
		let res = await flyio.get("/intro/getIntroduce",data)
		return res
	}
}



export default new Api();
