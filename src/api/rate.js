import httpServer from './httpServer'

// 费率说明 交易手续费
export async function _apiVirtualRateInfo (data) {
  let url = '/web/news/virtualRateInfo.do'
  return httpServer({
    method: 'get',
    url: url
  }, data).then((res) => {
    return res.data
  })
}
