// 请求拦截器
import axios from 'axios/index'
import {apiBase, axiosHeader} from './config'
import store from 'store/index'
import * as types from 'store/mutation-types'
import {isEmpty} from 'common/validate'
import {Message} from 'element-ui'
import Router from 'vue-router'

axios.interceptors.request.use(config => {
  // alert('请求拦截')

  let _token = isEmpty(store.getters.token) ? null : store.getters.token
  if (_token) {
    config.headers = Object.assign(axiosHeader, {
      'token': _token
    })
  }
  let _agentToken = isEmpty(store.getters.agentToken) ? null : store.getters.agentToken
  if (_agentToken) {
    config.headers = Object.assign(axiosHeader, {
      'agentToken': _agentToken
    })
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(response => {
  // alert('响应拦截')
  // 未登录或token失效
  if (response.data.statusCode === 9999) {
    store.commit(types.SET_TOKEN, '')
    store.commit(types.SET_LOGIN_STATUS, false)
    store.commit(types.SET_USERINFO, '')
    store.commit(types.SET_TOPIC, '')
    store.commit(types.SET_COINTYPE, '')
    Router.replace({
      path: '/login'
    })
  }
  return response
}, error => {
  return Promise.resolve(error.response)
})

  // 请求异常
function errorState (response) {
  // console.log(response,'response')
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response.data// 如果不需要除了data之外的数据，可以直接 return response.data
  } else {
    console.log(response, 'errorState')
    Message.error('请求异常')
    // 错误处理
  }
}
  // 请求成功
function successState (res) {
  // console.log(res,'res')
  if (res && (res.status === 200 || res.status === 304 || res.status === 400)) {
    // 统一判断后端返回的错误码
    if (res && res.data && res.data.statusCode === 200) {
      console.log(res.data, 'successState2')
    } else {
      // 错误处理
      console.log(res.data, 'errorState2')
      Message.error(res.data.message ? res.data.message : '网络错误')
    }
    return res.data // 如果不需要除了data之外的数据，可以直接 return response.data
  } else {
    // 错误处理
    console.log(res, 'errorState1')
    if (res) {
      Message.error(res.statusText || res.data.message || '网络错误')
    } else {
      Message.error('请求异常')
    }
  }
}
/**
 * axios 封装
 * @param {*} opts http配置
 * @param {*} data 请求参数
 */
const httpServer = (opts, data) => {
  let Public = { // 公共参数
    'Public': ''
  }
  let httpDefaultOpts = { // http默认配置
    method: opts.method,
    baseURL: apiBase,
    url: opts.url,
    timeout: 100000,
    params: Object.assign(Public, data),
    data: Object.assign(Public, data)
  }

  if (opts.method === 'get') {
    delete httpDefaultOpts.data
  } else {
    delete httpDefaultOpts.params
  }

  let promise = new Promise(function (resolve, reject) {
    axios(httpDefaultOpts).then(
      (res) => {
        successState(res)
        resolve(res)
      }
    ).catch(
      (response) => {
        errorState(response)
        reject(response)
      }
    )
  })
  return promise
}

export default httpServer
