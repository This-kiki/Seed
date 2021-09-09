//校验手机号码
export default function phoneRuler(phone){
    let reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
    return reg.test(phone)
}

// 校验身份证号码
export default function isCardNo(card) {
  // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
  let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return reg.test(card);
}

// 校验邮箱
export default function isEmail(email){
  let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
  return reg.test(email);
}