// import {apiBase} from 'api/config'
// import axios from 'axios'
import httpServer from './httpServer'

export function testGet (data) {
  let url = 'testGet'
  return httpServer.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function testPost (data) {
  let url = 'testPost'
  // return httpServer.post(url,data).then((res) => {
  //   return Promise.resolve(res.data)
  // })

  // console.log(data);
  return httpServer({
    method: 'post',
    url: url
  }, data).then((res) => {
    return Promise.resolve(res.data)
  })
}
