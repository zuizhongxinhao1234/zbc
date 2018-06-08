
// import {Message} from 'element-ui'
import {wsBase} from 'api/config'
/**
 * 初始化webSoket
 * @param {*} url ws地址
 * @param {*} open 链接打开回调执行函数
 * @param {*} message 获取服务端数据推送执行函数
 * @param {*} error 错误回调执行函数
 * @param {*} close 链接关闭回调执行函数
 */
export const initSocket = function (url = '', open = () => {}, message = () => {}, error = () => {}, close = () => {}) {
  let webSocket = new WebSocket(wsBase + url)
  let timeoutObj
  let timeout = 60000
  webSocket.onopen = () => {
    console.log(`webSocket open ${url}`)
    open()
    timeoutObj = setTimeout(() => {
      if (webSocket && webSocket.readyState !== 1) {
        console.log('心跳重连 webSocket close')
        webSocket && webSocket.close()
      }
    }, timeout)
  }
  webSocket.onmessage = (evt) => {
    console.log(`webSocket message ${url}`)
    message(evt)
    timeoutObj && clearTimeout(timeoutObj)
  }
  webSocket.onclose = () => {
    console.log(`webSocket closed ${url}`)
    // Message({
    //   message: '链接已关闭',
    //   type: 'error'
    // })
    close()
    timeoutObj && clearTimeout(timeoutObj)
  }
  webSocket.onerror = () => {
    console.log(`webSocket error ${url}`)
    // Message({
    //   message: 'webSocket error',
    //   type: 'error'
    // })
    error()
  }
  return webSocket
}
/**
 * websocket 重连方法
 * @param {*} lockReconnect 状态，避免重复请求
 * @param {*} tt 定时器
 * @param {*} _initWebSocket 初始化web socket方法
 */
export const reconnect = function (lockReconnect, _initWebSocket, timeoutName) {
  // console.log('重连')
  if (lockReconnect) {
    return
  };
  lockReconnect = true
  // 没连接上会一直重连，设置延迟避免请求过多
  if (timeoutName === 'PrivateTimeout') {
    window.PrivateTimeout = setTimeout(() => {
      _initWebSocket()
      lockReconnect = false
    }, 30000)
  }
  if (timeoutName === 'commonTimeout') {
    window.commonTimeout = setTimeout(() => {
      _initWebSocket()
      lockReconnect = false
    }, 30000)
  }
  if (!timeoutName) {
    window.reconnectTimeout = setTimeout(() => {
      _initWebSocket()
      lockReconnect = false
    }, 30000)
  }
}
