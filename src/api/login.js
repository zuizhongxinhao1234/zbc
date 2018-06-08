import httpServer from './httpServer'

export function _apiLogin (data) {
  let url = '/web/user/loginUser.do'
  return httpServer({
    method: 'post',
    url: url
  }, data).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function _apiGetUserInfo () {
  let url = '/web/user/showUser.do'
  return httpServer({
    method: 'post',
    url: url
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
