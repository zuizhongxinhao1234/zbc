import httpServer from './httpServer'

// 绑定邮箱
export function _apiBindEmail (data) {
  let url = '/web/user/bindEmail.do'
  return httpServer({
    method: 'get',
    url: url
  }, data).then((res) => {
    return res.data
  })
}

// 修改绑定邮箱
export function _apiModifyEmail (data) {
  let url = '/web/user/modifyEmail.do'
  return httpServer({
    method: 'get',
    url: url
  }, data).then((res) => {
    return res.data
  })
}

// 绑定手机号
export function _apiBindPhoneNum (data) {
  let url = '/web/user/bindPhoneNum.do'
  return httpServer({
    method: 'get',
    url: url
  }, data).then((res) => {
    return res.data
  })
}

// 修改绑定手机号
export function _apiModifyPhone (data) {
  let url = '/web/user/modifyPhone.do'
  return httpServer({
    method: 'get',
    url: url
  }, data).then((res) => {
    return res.data
  })
}

// 修改新密码
export function _apiUpdateLoginpassword (data) {
  let url = '/web/user/updateLoginpassword.do'
  return httpServer({
    method: 'get',
    url: url
  }, data).then((res) => {
    return res.data
  })
}

// 设置交易密码
export function _apiSetDealCode (data) {
  let url = '/web/user/setDealCode.do'
  return httpServer({
    method: 'get',
    url: url
  }, data).then((res) => {
    return res.data
  })
}

// 设置交易密码
export function _apiChangeDealCode (data) {
  let url = '/web/user/modifyDealCode.do'
  return httpServer({
    method: 'get',
    url: url
  }, data).then((res) => {
    return res.data
  })
}

// 获取谷歌验证码所需信息
export async function _apiGetGoogleVerifyCode (data) {
  let url = '/web/user/getGoogleVerifyCode.do'
  return httpServer({
    method: 'get',
    url: url
  }, data).then((res) => {
    return res.data
  })
}

// 绑定谷歌验证码
export async function _apiBindGoogleVerifyCode (data) {
  let url = '/web/user/bindGoogleVerifyCode.do'
  return httpServer({
    method: 'get',
    url: url
  }, data).then((res) => {
    return res.data
  })
}

// 获取登录历史
export async function _apiFindUserLogin (data) {
  let url = '/web/user/findUserLogin.do'
  return httpServer({
    method: 'get',
    url: url
  }, data).then((res) => {
    return res.data
  })
}

// 身份认证
export async function _apiPrimaryTrueName (data) {
  let url = '/web/user/primaryTrueName.do'
  return httpServer({
    method: 'get',
    url: url
  }, data).then((res) => {
    return res.data
  })
}
