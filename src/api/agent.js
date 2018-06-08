import httpServer from './httpServer'

// 代理商发送手机验证码
export function _apiAgentSendSMSphone (data) {
  let url = '/web/agent/sendAgentVerifyCode.do'
  return httpServer({
    method: 'get',
    url: url
  }, data).then((res) => {
    return res.data
  })
}

// 代理商登录
export function _apiAgentLogin (data) {
  let url = '/web/agent/agentLogin.do'
  return httpServer({
    method: 'get',
    url: url
  }, data).then((res) => {
    return res.data
  })
}

// 获取代理商信息
export function _apiAgentGetUserInfo (data) {
  let url = '/web/agent/queryAgentSimpleInfo.do'
  return httpServer({
    method: 'get',
    url: url
  }, data).then((res) => {
    return res.data
  })
}

// 代理商登出
export function _apiAgentLoginOut (data) {
  let url = '/web/agent/logOut.do'
  return httpServer({
    method: 'get',
    url: url
  }, data).then((res) => {
    return res.data
  })
}

// 代理商充值记录分页数据
export function _apiAgentRechargeHistory (data) {
  let url = '/web/agent/zbcRechargeRecordPageQuery.do'
  return httpServer({
    method: 'get',
    url: url
  }, data).then((res) => {
    return res.data
  })
}

// 更新代理商充值记录分页数据
export function _apiAgentRechargeHistoryUpdate (data) {
  let url = '/web/agent/updateZBCRechargeRecord.do'
  return httpServer({
    method: 'get',
    url: url
  }, data).then((res) => {
    return res.data
  })
}

// 新增代理商充值记录分页数据
export function _apiAgentRechargeHistoryAdd (data) {
  let url = '/web/agent/addRechargeRecord.do'
  return httpServer({
    method: 'get',
    url: url
  }, data).then((res) => {
    return res.data
  })
}

// 代理商提现记录分页数据
export function _apiAgentWithdrawHistory (data) {
  let url = '/web/agent/zbcWithdrawalPageQuery.do'
  return httpServer({
    method: 'get',
    url: url
  }, data).then((res) => {
    return res.data
  })
}

// 更新代理商提现记录分页数据
export function _apiAgentWithdrawHistoryUpdate (data) {
  let url = '/web/agent/updateWithdrawalRecord.do'
  return httpServer({
    method: 'get',
    url: url
  }, data).then((res) => {
    return res.data
  })
}

// 新增代理商提现记录分页数据
export function _apiAgentWithdrawHistoryAdd (data) {
  let url = '/web/agent/addZBCWithdrawalRecord.do'
  return httpServer({
    method: 'get',
    url: url
  }, data).then((res) => {
    return res.data
  })
}

// 代理商修改密码
export function _apiAgentChangePassword (data) {
  let url = '/web/agent/agentModifyPassword.do'
  return httpServer({
    method: 'get',
    url: url
  }, data).then((res) => {
    return res.data
  })
}
