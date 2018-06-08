import httpServer from './httpServer'

export function _apiGetMarkets (data) {
  let url = '/web/commons/getMarkets.do'
  return httpServer({
    method: 'get',
    url: url
  }, data).then((res) => {
    return Promise.resolve(res.data)
  })
}
