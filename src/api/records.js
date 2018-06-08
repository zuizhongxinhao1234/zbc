import httpServer from './httpServer'

// 获取充币记录
export function _apiRechargeList (data) {
  let url = '/web/historyRecord/coinChargeList.do'
  return httpServer({
    method: 'get',
    url: url
  }, data).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 获取提币记录
export function _apiWithdrawList (data) {
  let url = '/web/historyRecord/coinWithdrawList.do'
  return httpServer({
    method: 'get',
    url: url
  }, data).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 获取委托历史记录
export function _apiGetHistoryEntrustList (data) {
  let url = '/web/historyRecord/historyEntrustList.do'
  return httpServer({
    method: 'get',
    url: url
  }, data).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 获取交易历史记录
export function _apiGetHistoryTradeList (data) {
  let url = '/web/historyRecord/historyTradeList.do'
  return httpServer({
    method: 'get',
    url: url
  }, data).then((res) => {
    return Promise.resolve(res.data)
  })
}
