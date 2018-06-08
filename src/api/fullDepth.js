import httpServer from './httpServer'

// 深度图数据
export async function _apiGetFullDepth (data) {
  let url = '/json/fullDepth.do'
  return httpServer({
    method: 'get',
    url: url
  }, data).then((res) => {
    return res.data
  })
}
