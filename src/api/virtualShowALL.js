import httpServer from './httpServer'

// 获取所有币种列表
export function _apiGetVirtualShowALL (data) {
  let url = '/web/user/virtualShowALL.do'
  return httpServer({
    method: 'get',
    url: url
  }, data).then((res) => {
    return Promise.resolve(res.data)
  })
}
