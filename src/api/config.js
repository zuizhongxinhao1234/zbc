
import {getLocalStorage} from 'common/localStorage'

// const apiBase = '/' // http工程路径

// const wsBase = 'ws://localhost:3000' // webSocket路径

// const wsBase = 'ws://192.168.0.118:8086' // 本地测试环境webSocket路径
const wsBase = 'ws://47.89.19.38:10081' // 测试环境webSocket路径

// const apiBase = 'http://192.168.0.188:8083' // 本地测试环境http工程路径
const apiBase = 'http://47.89.19.38:10081' // 测试环境http工程路径

const axiosHeader = {
  'X-Requested-With': 'XMLHttpRequest',
  'Accept': 'application/json',
  'Content-Type': 'application/json; charset=UTF-8',
  'X-Lang-ld': getLocalStorage('language') // 语言类型
}

export {apiBase, wsBase, axiosHeader}
