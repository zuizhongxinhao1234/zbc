import httpServer from './httpServer'

// 获取token
export async function _apiGetNewToken (data) {
  let url = '/web/newToken.do'
  return httpServer({
    method: 'get',
    url: url
  }, data).then((res) => {
    return res.data
  })
}
