import * as types from './mutation-types'

// 存储普通用户登录状态及token
export const setStore = function ({commit, state}, {flag, token}) {
  commit(types.SET_LOGIN_STATUS, flag)
  commit(types.SET_TOKEN, token)
}

// 存储代理商用户登录状态及agentToken
export const setAgentStore = function ({commit, state}, {flag, agentToken}) {
  commit(types.SET_AGENT_LOGIN_STATUS, flag)
  commit(types.SET_AGENT_TOKEN, agentToken)
}
