module.exports = {
	env:'stable', // 环境变量 dev 本地环境 prod 测试生产环境 stable 领航生产环境
	version:'1.6.2',
	onlineUrl:'https://wuster.vip/',// onlineUrl 线上后台地址
	stableUrl:'https://wusthelper.wustlinghang.cn/',// stableUrl 领航线上地址
	localhostUrl:'http://localhost:5656/',// localhostUrl 本地后台地址
	//#ifdef MP-WEIXIN
	platform:'wechat',
	//#endif
	//#ifdef MP-QQ
	platform:'qq',
	//#endif
}