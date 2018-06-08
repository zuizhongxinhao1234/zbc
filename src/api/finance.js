import httpServer from './httpServer'

export function _apiLegalCoinList (data) {
  let url = '/web/wallet/legalCoinList.do'
  return httpServer({
    method: 'get',
    url: url
  }, data).then((res) => {
    return Promise.resolve(res.data)
  })
}
