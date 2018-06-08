// 空验证
export const isEmpty = (data) => {
  if (data !== false && data !== 'false' && data !== undefined && data !== 'undefined' && data != null && data !== '' && data !== 'null') {
    return false
  }
  return true
}

// 手机验证
export const testPhone = function (val) {
  let phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
  return phoneReg.test(val)
}

// 邮箱验证
export const testEmail = function (val) {
  let emailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
  return emailReg.test(val)
}

// 密码验证
export const testPassword = function (val) {
  let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/
  return reg.test(val)
}

// 非负浮点数
export const testFloat = function (val) {
  const reg = /^\d+(\.\d+)?$/
  return reg.test(val)
}

// 6位数字
export const testVerificationCode = function (val) {
  const reg = /^\d{6}$/
  return reg.test(val)
}

// 最多8位小数数字
export const testFloat8 = function (val) {
  const reg = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,8})))$/
  return reg.test(val)
}
