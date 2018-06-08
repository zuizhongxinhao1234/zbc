import httpServer from './httpServer'

// 添加提币地址
export function _apiAddWithdrawAddress (data) {
  let url = '/web/user/addVirtualCoinAccount.do'
  return httpServer({
    method: 'get',
    url: url
  }, data).then((res) => {
    return res.data
  })
}

// 获取提币地址列表
export function _apiWithdrawAddressList (data) {
  let url = '/web/user/selectCoinAddressList.do'
  return httpServer({
    method: 'get',
    url: url
  }, data).then((res) => {
    return res.data
  })
}

// 删除提币地址
export function _apiDeleteWithdrawAddress (data) {
  let url = '/web/user/deleteUserAccount.do'
  return httpServer({
    method: 'get',
    url: url
  }, data).then((res) => {
    return res.data
  })
}

// 提币
export function _apiSubmitWithdraw (data) {
  let url = '/web/wallet/coinWithdraw.do'
  return httpServer({
    method: 'get',
    url: url
  }, data).then((res) => {
    return res.data
  })
}
