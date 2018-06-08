import httpServer from './httpServer'

// 新闻中心接口
export async function _apiGetNewsPageList (data) {
  let url = '/web/news/getNewsPageList.do'
  return httpServer({
    method: 'get',
    url: url
  }, data).then((res) => {
    return res.data
  })
}
// 新闻中心单条新闻详情接口
export async function _apiGetNewsShowById (data) {
  let url = '/web/news/newsShowById.do'
  return httpServer({
    method: 'get',
    url: url
  }, data).then((res) => {
    return res.data
  })
}
