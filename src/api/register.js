import httpServer from './httpServer'

// 校验手机号是否存在
export function _apiVerificationPhoneNum (data) {
  let url = '/web/commons/verificationPhoneNum.do'
  return httpServer({
    method: 'get',
    url: url
  }, data).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 校验邮箱是否存在
export function _apiVerificationEmailNums (data) {
  let url = '/web/commons/verificationEmailNums.do'
  return httpServer({
    method: 'get',
    url: url
  }, data).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 发送邮箱验证码
export function _apiSendSMSemail (data) {
  let url = '/web/commons/sendSMSemail.do'
  return httpServer({
    method: 'get',
    url: url
  }, data).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 发送手机验证码
export function _apiSendSMSphone (data) {
  let url = '/web/commons/sendSMSphone.do'
  return httpServer({
    method: 'get',
    url: url
  }, data).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 注册
export function _apiRegisterUser (data) {
  let url = '/web/user/registerUser.do'
  return httpServer({
    method: 'post',
    url: url
  }, data).then((res) => {
    return Promise.resolve(res.data)
  })
}
