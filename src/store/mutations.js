import * as types from './mutation-types'
import {setLocalStorage} from 'common/localStorage'

const mutations = {
  [types.SET_LOGIN_STATUS] (state, flag) {
    state.loginStatus = flag
    setLocalStorage('loginStatus', flag)
  },
  [types.SET_TOKEN] (state, string) {
    state.token = string
    setLocalStorage('token', string)
  },
  [types.SET_USERINFO] (state, obj) {
    state.userInfo = obj
    setLocalStorage('userInfo', JSON.stringify(obj))
  },
  [types.SET_TOPIC] (state, obj) {
    state.topic = obj
    setLocalStorage('topic', JSON.stringify(obj))
  },
  [types.SET_COINTYPE] (state, obj) {
    state.coinType = obj
    setLocalStorage('coinType', JSON.stringify(obj))
  },
  [types.SET_MARKETCOINTOCNY] (state, string) {
    state.marketCoinToCny = string
  },
  [types.SET_AGENT_LOGIN_STATUS] (state, flag) {
    state.agentLoginStatus = flag
    setLocalStorage('agentLoginStatus', flag)
  },
  [types.SET_AGENT_TOKEN] (state, string) {
    state.agentToken = string
    setLocalStorage('agentToken', string)
  },
  [types.SET_AGENTINFO] (state, obj) {
    state.agentInfo = obj
    setLocalStorage('agentInfo', JSON.stringify(obj))
  },
  [types.SET_RECHARGE_LIMIT] (state, string) {
    state.rechargeLimit = string
    setLocalStorage('rechargeLimit', string)
  },
  [types.SET_WITHDRAW_LIMIT] (state, string) {
    state.withdrawLimit = string
    setLocalStorage('withdrawLimit', string)
  }
}

export default mutations
