const nationList = [{
		label: "汉族",
		value: 1
	},
	{
		label: "壮族",
		value: 2
	},
	{
		label: "满族",
		value: 3
	},
	{
		label: "回族",
		value: 4
	},
	{
		label: "苗族",
		value: 5
	},
	{
		label: "维吾尔族",
		value: 6
	},
	{
		label: "土家族",
		value: 7
	},
	{
		label: "彝族",
		value: 8
	},
	{
		label: "蒙古族",
		value: 9
	},
	{
		label: "藏族",
		value: 10
	},
	{
		label: "布依族",
		value: 11
	},
	{
		label: "侗族",
		value: 12
	},
	{
		label: "瑶族",
		value: 13
	},
	{
		label: "朝鲜族",
		value: 14
	},
	{
		label: "白族",
		value: 15
	},
	{
		label: "哈尼族",
		value: 16
	},
	{
		label: "哈萨克族",
		value: 17
	},
	{
		label: "黎族",
		value: 18
	},
	{
		label: "傣族",
		value: 19
	},
	{
		label: "畲族",
		value: 20
	},
	{
		label: "傈僳族",
		value: 21
	},
	{
		label: "仡佬族",
		value: 22
	},
	{
		label: "东乡族",
		value: 23
	},
	{
		label: "高山族",
		value: 24
	},
	{
		label: "拉祜族",
		value: 25
	},
	{
		label: "水族",
		value: 26
	},
	{
		label: "佤族",
		value: 27
	},
	{
		label: "纳西族",
		value: 28
	},
	{
		label: "羌族",
		value: 29
	},
	{
		label: "土族",
		value: 30
	},
	{
		label: "仫佬族",
		value: 31
	},
	{
		label: "锡伯族",
		value: 32
	},
	{
		label: "柯尔克孜族",
		value: 33
	},
	{
		label: "达斡尔族",
		value: 34
	},
	{
		label: "景颇族",
		value: 35
	},
	{
		label: "毛南族",
		value: 36
	},
	{
		label: "撒拉族",
		value: 37
	},
	{
		label: "布朗族",
		value: 38
	},
	{
		label: "塔吉克族",
		value: 39
	},
	{
		label: "阿昌族",
		value: 40
	},
	{
		label: "普米族",
		value: 41
	},
	{
		label: "鄂温克族",
		value: 42
	},
	{
		label: "怒族",
		value: 43
	},
	{
		label: "京族",
		value: 44
	},
	{
		label: "基诺族",
		value: 45
	},
	{
		label: "德昂族",
		value: 46
	},
	{
		label: "保安族",
		value: 47
	},
	{
		label: "俄罗斯族",
		value: 48
	},
	{
		label: "裕固族",
		value: 49
	}
]
const polityList = [{
		label: '中共党员',
		value: 0
	},
	{
		label: '中共预备党员',
		value: 1
	},
	{
		label: '共青团员',
		value: 3
	},
	{
		label: '无党派人士',
		value: 4
	},
	{
		label: '群众',
		value: 5
	},
	{
		label: '民革会员',
		value: 6
	},
	{
		label: '民盟盟员',
		value: 7
	},
	{
		label: '民建会员',
		value: 8
	},
	{
		label: '民进会员',
		value: 9
	},
	{
		label: '农工党党员',
		value: 10
	},
	{
		label: '致公党党员',
		value: 11
	},
	{
		label: '九三学社社员',
		value: 12
	},
	{
		label: '台盟盟员',
		value: 13
	}
]
const levelList = [{
		label: '荣誉会长',
		value: 4
	},
	{
		label: '会长',
		value: 5
	},
	{
		label: '副会长',
		value: 6
	},
	{
		label: '执行委员会成员',
		value: 7
	},
	{
		label: '秘书长',
		value: 8
	},
	{
		label: '会计',
		value: 9
	},
	{
		label: '出纳',
		value: 10
	},
	{
		label: '会员',
		value: 11
	}
]
const sexlist = [{
		id: 0,
		name: '男'
	},
	{
		id: 1,
		name: '女'
	}
]
const sublevelList = [{
		label: '律师',
		value: 12
	},
	{
		label: '公司法务',
		value: 13
	},
	{
		label: '法官',
		value: 14
	},
	{
		label: '检察',
		value: 15
	},
]

function getsubLevel(key) {
	switch (key) {
		case 4:
			return '荣誉会长';
			break;
		case 5:
			return '会长';
			break;
		case 6:
			return '副会长';
			break;
		case 7:
			return '执行委员会成员';
			break;
		case 8:
			return '秘书长';
			break;
		case 9:
			return '会计';
			break;
		case 10:
			return '出纳';
			break;
		case 11:
			return '会员';
			break;
		default:
			return '请选择申请职位';
			break;
	}
}
function getlaylevel(key) {
	switch (key) {
		case 12:
			return '律师';
			break;
		case 13:
			return '公司法务';
			break;
		case 14:
			return '法官';
			break;
		case 15:
			return '检察';
			break;
		default:
			return '请选择律师身份';
			break;
	}
}

function getsex(key) {
	switch (key) {
		case 0:
			return '男';
			break;
		case 1:
			return '女';
			break;
		default:
			return '请选择性别';
			break;
	}
}

const rules = {
	'userInfo.name': {
		type: 'string',
		required: true,
		message: '请填写姓名',
		trigger: ['blur', 'change']
	},
	'userInfo.idNum': {
		type: 'string',
		required: true,
		message: '请填写身份证号',
		trigger: ['blur', 'change']
	},
	'userInfo.phone': {
		type: 'string',
		required: true,
		message: '请填写手机号',
		trigger: ['blur', 'change']
	},
	'userInfo.school': {
		type: 'string',
		required: true,
		message: '请填写学校',
		trigger: ['blur', 'change']
	},
	'userInfo.major': {
		type: 'string',
		required: true,
		message: '请填写专业',
		trigger: ['blur', 'change']
	},
	'userInfo.grade': {
		type: 'string',
		required: true,
		message: '请填写年级',
		trigger: ['blur', 'change']
	},
	'userInfo.work': {
		type: 'string',
		required: true,
		message: '请填写工作单位',
		trigger: ['blur', 'change']
	},
	'userInfo.position': {
		type: 'string',
		required: true,
		message: '请填写工作职位',
		trigger: ['blur', 'change']
	},
	'userInfo.sex': {
		type: 'string',
		max: 1,
		required: true,
		message: '请选择男或女',
		trigger: ['blur', 'change']
	},
}

export {
	nationList,
	polityList,
	levelList,
	sexlist,
	sublevelList,
	getsubLevel,
	getlaylevel,
	getsex,
	rules
}

// export default {
// 	'nation': nation,
// 	'polityList': polityList,
// 	'levelList': levelList
// }
