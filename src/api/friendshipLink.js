import httpServer from './httpServer'

// 获取友情链接
export async function _apiGetFriendShows (data) {
  let url = '/web/news/friendShows.do'
  return httpServer({
    method: 'get',
    url: url
  }, data).then((res) => {
    return res.data
  })
}
