//校验手机号码
function phoneRuler(phone){
    let reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
    return reg.test(phone)
}

// 校验身份证号码
function isCardNo(card) {
  // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
  let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return reg.test(card);
}

// 校验邮箱
function isEmail(email){
  let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
  return reg.test(email);
}

let formVerification = [{
	label: 'img',
	value: '请上传图片'
},{
	label: 'name',
	value: '请填写姓名'
},{
	label: 'idNum',
	value: '请填写身份证号码'
},{
	label: 'birth',
	value: '请填写出生日期'
},{
	label: 'sex',
	value: '请填写性别'
},{
	label: 'place',
	value: '请填写籍贯'
},{
	label: 'polity',
	value: '请填写政治面貌'
},{
	label: 'nation',
	value: '请填写民族'
},{
	label: 'phone',
	value: '请填写电话号码'
},{
	label: 'email',
	value: '请填写电子邮件'
},{
	label: 'school',
	value: '请填写学校'
},{
	label: 'major',
	value: '请填写专业'
},{
	label: 'work',
	value: '请填写工作单位'
},{
	label: 'position',
	value: '请填写工作职位'
},{
	label: 'introduce',
	value: '请填写简介'
},{
	label: 'subLevel',
	value: '请填写申请的职位'
},{
	label: 'workNum',
	value: '请填写工号'
},{
	label: 'workplace',
	value: '请填写执业律所'
},{
	label: 'address',
	value: '请填写地址'
},{
	label: 'companyName',
	value: '请填写公司全称'
},{
	label: 'companyPhone',
	value: '请填写公司联系电话'
},{
	label: 'content',
	value: '请填写公司介绍'
},{
	label: 'creditCode',
	value: '请填写信用代码'
},{
	label: 'industry',
	value: '请填写行业'
},{
	label: 'license',
	value: '请上传营业执照照片'
},{
	label: 'manageArea',
	value: '请填写经营范围'
},{
	label: 'manageStatus',
	value: '请填写经营状态'
},{
	label: 'money',
	value: '请填写注册资金'
},{
	label: 'num',
	value: '请填写公司员工数'
},{
	label: 'representative',
	value: '请填写法人代表姓名'
},{
	label: 'time',
	value: '请填写注册时间'
}]

function findWord(word) {
	for(let key  in formVerification){
		if(formVerification[key].label == word) {
			return {
				status: false,
				value: formVerification[key].value
			}
		}
	}
}

function verification(form) {
	var obj = form
	// console.log(obj)
	for(let key  in obj){
			// console.log(key + '---' + obj[key])
		if(key == 'sex'){
			if(obj[key] == 3||obj[key]==null){
				return findWord(key)
			}
		}else if(key == 'subLevel'||obj[key]==null) {
			if(obj[key] == 100){
				return findWord(key)
			}
		}else if(obj[key] == ''){
			// console.log(key)
			if(key == 'sex'){
				continue
			}else if(key == 'subLevel') {
				continue
			}else if(key == 'identity') {
				continue
			}else{
				return findWord(key)
			}
		}
	}
	if(obj.phone) {
		if(!phoneRuler(obj.phone)) {
			// console.log('手机号码格式不对')
			return {
				status: false,
				value: '手机号码格式不对'
			}
		}
	}
	if(obj.companyPhone) {
		if(!phoneRuler(obj.companyPhone)) {
			// console.log('企业手机号码格式不对')
			return {
				status: false,
				value: '企业手机号码格式不对'
			}
		}
	}
	if(obj.idNum) {
		if(!isCardNo(obj.idNum)) {
			// console.log('身份证号码格式不对')
			return {
				status: false,
				value: '身份证号码格式不对'
			}
		}
	}
	if(obj.email) {
		if(!isEmail(obj.email)) {
			// console.log('电子邮箱格式不对')
			return {
				status: false,
				value: '电子邮箱格式不对'
			}
		}
	}
	return {
		status: true
	}
}

export const regular = verification;