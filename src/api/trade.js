import httpServer from './httpServer'

export function _apiBuyCoin (data) {
  let url = '/web/trade/buyCoin.do'
  return httpServer({
    method: 'get',
    url: url
  }, data).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function _apiSellCoin (data) {
  let url = '/web/trade/sellCoin.do'
  return httpServer({
    method: 'get',
    url: url
  }, data).then((res) => {
    return Promise.resolve(res.data)
  })
}

export async function _apiCancelEntrust (data) {
  let url = '/web/trade/cancelEntrust.do'
  return httpServer({
    method: 'get',
    url: url
  }, data).then((res) => {
    return res.data
  })
}
