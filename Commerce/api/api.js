import {
	flyio,
	url
} from './config.js';
// var {platform} = require('../config/index')
//公共链接
//接口列表
export class Api {
	// 发布帖子
	postPost = async (data) => {
		let res = await flyio.post("post/save",data)
		return res;
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
}



export default new Api();
