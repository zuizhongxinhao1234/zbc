import Router from 'vue-router'
import store from '../store/index'
import {getLocalStorage} from 'common/localStorage'
import {isEmpty} from 'common/validate'
import * as types from 'store/mutation-types'
import {_apiGetNewToken} from 'api'

const Test = () => import('page/Test') // 测试页面
const Index = () => import('page/index') // 主页
const legalTender = () => import('page/legal-tender') // 法币交易
const CurrencyTrade = () => import('page/currency-trade') // 币币交易
const CurrencyTradeExchange = () => import('page/currency-trade-exchange') // 买卖盘
const CurrencyTradeHistory = () => import('page/currency-trade-history') // 委托历史
const LeverTrade = () => import('page/lever-trade') // 杠杆交易
const XEEX = () => import('page/XEEX') // XEEX
const ZBC = () => import('page/ZBC') // ZBC
const Help = () => import('page/help') // 帮助
const Login = () => import('page/login') // 登录
const Register = () => import('page/register') // 注册
const Property = () => import('page/property') // 资产
const TradeAccount = () => import('components/property/trade-account') // 交易账户
const Bestowed = () => import('components/property/bestowed') // 资产分润列表
const FinanceRecords = () => import('page/finance-records') // 财务记录
const WithdrawAddress = () => import('page/withdraw-address') // 提币地址管理
const AccountSafe = () => import('page/account-safe/account-safe') // 账户安全
const LoginHistory = () => import('components/account-safe/login-history') // 登录历史
// const SetHistory = () => import('components/account-safe/set-history') // 安全设置历史
const ChangePassword = () => import('page/account-safe/change-password') // 修改密码
const BindEmail = () => import('page/account-safe/bind-email') // 绑定邮箱
const ChangeEmail = () => import('page/account-safe/change-email') // 修改邮箱
const BindPhone = () => import('page/account-safe/bind-phone') // 绑定手机
const ChangePhone = () => import('page/account-safe/change-phone') // 修改绑定手机
const BindDeal = () => import('page/account-safe/bind-deal') // 设置交易密码
const ChangeDeal = () => import('page/account-safe/change-deal') // 修改交易密码
const BindGoogle = () => import('page/account-safe/bind-google') // 绑定谷歌验证器
const IdentityValidate = () => import('page/identity-validate') // 身份验证
const News = () => import('page/news') // 新闻中心
const NewsList = () => import('page/news-list') // 新闻中心列表
const NewsDetail = () => import('page/news-detail') // 新闻中心详情页
const AboutUs = () => import('page/aboutUs') // 关于我们
const Rate = () => import('page/rate') // 费率
const RateTrade = () => import('page/rate-trade') // 费率 交易手续费
const Law = () => import('page/law') // 法律声明
const Invite = () => import('page/invite') // 邀请注册
const Apply = () => import('page/apply')

// 代理商
const AgentLogin = () => import('page/agent/agent-login') // 代理商登录
const AgentRecharge = () => import('page/agent/agent-recharge') // 代理商充值
const AgentRechargeHistory = () => import('@/page/agent/recharge-history') // 代理充值记录
const AgentRechargeAdd = () => import('@/page/agent/recharge-add') // 新增代理充值
const AgentWithdrawalsHistory = () => import('@/page/agent/withdrawals-history') // 代理提现记录
const AgentWithdrawalsAdd = () => import('@/page/agent/withdrawals-add') // 代理提现新增
const AgentChangePassword = () => import('@/page/agent/agent-change-password') // 代理修改密码

const router = new Router({
  mode: 'history',
  routes: [
    { // 测试
      path: '/test',
      meta: {
        title: '测试',
        lever: 0,
        loginStatus: false
      },
      component: Test
    },
    { // 错误路径重定位主页
      path: '*',
      redirect: '/'
    },
    { // 主页
      path: '/',
      meta: {
        title: '主页',
        lever: 0,
        loginStatus: false
      },
      component: Index
    },
    { // 法币交易
      path: '/legal-tender',
      meta: {
        title: '法币交易',
        lever: 0,
        loginStatus: false
      },
      component: legalTender
    },
    { // 币币交易
      path: '/currency-trade',
      meta: {
        title: '币币交易',
        lever: 0,
        loginStatus: false
      },
      component: CurrencyTrade
    },
    { // 买卖盘
      path: '/currency-trade-exchange',
      meta: {
        title: '买卖盘',
        lever: 0,
        loginStatus: false
      },
      component: CurrencyTradeExchange
    },
    { // 委托历史记录
      path: '/currency-trade-history',
      meta: {
        title: '交易记录',
        lever: 0,
        loginStatus: true
      },
      component: CurrencyTradeHistory
    },
    { // 杠杆交易
      path: '/lever-trade',
      meta: {
        title: '杠杆交易',
        lever: 0,
        loginStatus: true
      },
      component: LeverTrade
    },
    { // XEEX
      path: '/XEEX',
      meta: {
        title: 'XEEX',
        lever: 0,
        loginStatus: true
      },
      component: XEEX
    },
    { // ZBC
      path: '/ZBC',
      meta: {
        title: 'ZBC',
        lever: 0,
        loginStatus: true
      },
      component: ZBC
    },
    { // 新手帮助
      path: '/help',
      meta: {
        title: '新手帮助',
        lever: 0,
        loginStatus: false
      },
      component: Help
    },
    { // 新闻中心
      path: '/news',
      meta: {
        title: '新闻中心',
        lever: 0,
        loginStatus: false
      },
      component: News,
      redirect: '/news/1',
      children: [
        {
          path: '/news/:t',
          name: '/news/:t',
          meta: {
            title: '新闻中心',
            lever: 0,
            loginStatus: false
          },
          component: NewsList
        },
        {
          path: '/news/detail/:t/:code',
          name: '/news/detail/:t/:code',
          meta: {
            title: '新闻中心',
            lever: 0,
            loginStatus: false
          },
          component: NewsDetail
        }
      ]
    },
    { // 关于我们
      path: '/aboutUs',
      name: 'aboutUs',
      meta: {
        title: '关于我们',
        lever: 0,
        loginStatus: false
      },
      component: AboutUs
    },
    { // 登录
      path: '/login',
      name: 'login',
      meta: {
        title: '登录',
        lever: 0,
        loginStatus: false
      },
      component: Login
    },
    { // 注册
      path: '/register',
      name: 'register',
      meta: {
        title: '注册',
        lever: 0,
        loginStatus: false
      },
      component: Register
    },
    { // 资产
      path: '/property',
      name: 'property',
      meta: {
        title: '资产',
        lever: 0,
        loginStatus: true
      },
      component: Property,
      redirect: '/property/trade-account',
      children: [
        { // 交易账户
          path: 'trade-account',
          name: 'trade-account',
          meta: {
            title: '交易账户',
            lever: 0,
            loginStatus: true
          },
          component: TradeAccount
        },
        { // 资产分润列表
          path: 'bestowed',
          name: 'bestowed',
          meta: {
            title: '资产分润列表',
            lever: 0,
            loginStatus: true
          },
          component: Bestowed
        }
      ]
    },
    { // 费率
      path: '/rate',
      name: 'rate',
      meta: {
        title: '费率',
        lever: 0,
        loginStatus: false
      },
      component: Rate,
      redirect: '/rate/trade',
      children: [
        { // 交易手续费
          path: '/rate/trade',
          name: 'trade',
          meta: {
            title: '交易手续费',
            lever: 0,
            loginStatus: false
          },
          component: RateTrade
        }
      ]
    },
    { // 财务记录
      path: '/finance-records',
      name: 'finance-records',
      meta: {
        title: '财务记录',
        lever: 0,
        loginStatus: true
      },
      component: FinanceRecords
    },
    { // 提币地址管理
      path: '/withdraw-address',
      name: 'withdraw-address',
      meta: {
        title: '提币地址管理',
        lever: 0,
        loginStatus: true
      },
      component: WithdrawAddress
    },
    { // 账户安全
      path: '/account-safe',
      name: 'account-safe',
      meta: {
        title: '账户安全',
        lever: 0,
        loginStatus: true
      },
      component: AccountSafe,
      redirect: '/account-safe/login-history',
      children: [
        { // 登录历史
          path: 'login-history',
          name: 'login-history',
          meta: {
            title: '账户安全',
            lever: 0,
            loginStatus: true
          },
          component: LoginHistory
        }
        // { // 安全设置历史
        //   path: 'set-history',
        //   name: 'set-history',
        //   meta: {
        //     title: '账户安全',
        //     lever: 0,
        //     loginStatus: true
        //   },
        //   component: SetHistory
        // }
      ]
    },
    { // 修改密码
      path: '/change-password',
      name: 'change-password',
      meta: {
        title: '修改密码',
        lever: 0,
        loginStatus: true
      },
      component: ChangePassword
    },
    { // 绑定邮箱
      path: '/bind-email',
      name: 'bind-email',
      meta: {
        title: '绑定邮箱',
        lever: 0,
        loginStatus: true
      },
      component: BindEmail
    },
    { // 修改邮箱
      path: '/change-email',
      name: 'change-email',
      meta: {
        title: '修改邮箱',
        lever: 0,
        loginStatus: true
      },
      component: ChangeEmail
    },
    { // 绑定手机
      path: '/bind-phone',
      name: 'bind-phone',
      meta: {
        title: '绑定手机',
        lever: 0,
        loginStatus: true
      },
      component: BindPhone
    },
    { // 修改绑定手机
      path: '/change-phone',
      name: 'change-phone',
      meta: {
        title: '修改绑定手机',
        lever: 0,
        loginStatus: true
      },
      component: ChangePhone
    },
    { // 设置交易密码
      path: '/bind-deal',
      name: 'bind-deal',
      meta: {
        title: '设置交易密码',
        lever: 0,
        loginStatus: true
      },
      component: BindDeal
    },
    { // 修改交易密码
      path: '/change-deal',
      name: 'change-deal',
      meta: {
        title: '修改交易密码',
        lever: 0,
        loginStatus: true
      },
      component: ChangeDeal
    },
    { // 绑定谷歌验证器
      path: '/bind-google',
      name: 'bind-google',
      meta: {
        title: '绑定谷歌验证器',
        lever: 0,
        loginStatus: true
      },
      component: BindGoogle
    },
    { // 身份验证
      path: '/identity-validate',
      name: 'identity-validate',
      meta: {
        title: '身份验证',
        lever: 0,
        loginStatus: true
      },
      component: IdentityValidate
    },
    { // 用户条款
      path: '/law',
      name: 'law',
      meta: {
        title: '法律声明',
        lever: 0,
        loginStatus: false
      },
      component: Law
    },
    { // 上币申请及说明
      path: '/apply',
      name: 'apply',
      meta: {
        title: '上币申请及说明',
        lever: 0,
        loginStatus: false
      },
      component: Apply
    },
    { // 邀请注册
      path: '/invite',
      name: 'invite',
      meta: {
        title: '邀请注册',
        lever: 0,
        loginStatus: true
      },
      component: Invite
    },
    { // 代理商登录
      path: '/agent-login',
      name: 'agent-login',
      meta: {
        title: '代理商登录',
        lever: 1,
        agentLoginStatus: false
      },
      component: AgentLogin
    },
    { // 代理商充值
      path: '/agent-recharge',
      name: 'agent-recharge',
      meta: {
        title: '代理商充值',
        lever: 1,
        agentLoginStatus: true
      },
      component: AgentRecharge,
      redirect: '/agent-recharge/recharge-history',
      children: [
        {
          path: 'recharge-history',
          name: 'recharge-history',
          meta: {
            title: '代理充值记录',
            lever: 1,
            agentLoginStatus: true
          },
          component: AgentRechargeHistory
        },
        {
          path: 'recharge-add',
          name: 'recharge-add',
          meta: {
            title: '新增代理充值',
            lever: 1,
            agentLoginStatus: true
          },
          component: AgentRechargeAdd
        },
        {
          path: 'withdrawals-history',
          name: 'withdrawals-history',
          meta: {
            title: '代理提现记录',
            lever: 1,
            agentLoginStatus: true
          },
          component: AgentWithdrawalsHistory
        },
        {
          path: 'withdrawals-add',
          name: 'withdrawals-add',
          meta: {
            title: '代理提现新增',
            lever: 1,
            agentLoginStatus: true
          },
          component: AgentWithdrawalsAdd
        },
        {
          path: 'agent-change-password',
          name: 'agent-change-password',
          meta: {
            title: '代理提现新增',
            lever: 1,
            agentLoginStatus: true
          },
          component: AgentChangePassword
        }
      ]
    }
  ],
  // 路由切换页面滚动到顶部
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

// 路由即将改变前
router.beforeEach(async(to, from, next) => {
  window.document.title = to.meta.title // 路由改变时，统一设置网页标题
  if (to.meta.lever === 0) {
    // 清除代理商用户token、登录状态、用户信息
    if (!store.getters.agentToken && !isEmpty(getLocalStorage('agentToken'))) {
      store.commit(types.SET_AGENT_TOKEN, '')
    }
    if (!store.getters.agentLoginStatus && !isEmpty(getLocalStorage('agentLoginStatus'))) {
      store.commit(types.SET_AGENT_LOGIN_STATUS, false)
    }
    if (!store.getters.agentInfo && JSON.parse(getLocalStorage('agentInfo'))) {
      store.commit(types.SET_AGENTINFO, '')
    }
    if (!store.getters.rechargeLimit && !isEmpty(getLocalStorage('rechargeLimit'))) {
      store.commit(types.SET_RECHARGE_LIMIT, '')
    }
    if (!store.getters.withdrawLimit && !isEmpty(getLocalStorage('withdrawLimit'))) {
      store.commit(types.SET_WITHDRAW_LIMIT, '')
    }

    // 普通用户状态管理
    let loginStatus = getLocalStorage('loginStatus')
    // 判断token是否存在，没有则请求token
    if (isEmpty(getLocalStorage('token'))) {
      let resToken = await _apiGetNewToken()
      if (resToken.statusCode === 200) {
        store.commit(types.SET_TOKEN, resToken.data)
      }
    }
    if (!store.getters.token && !isEmpty(getLocalStorage('token'))) {
      store.commit(types.SET_TOKEN, getLocalStorage('token'))
    }
    if (!store.getters.loginStatus && !isEmpty(loginStatus)) {
      store.commit(types.SET_LOGIN_STATUS, loginStatus)
    }
    if (!store.getters.userInfo && JSON.parse(getLocalStorage('userInfo'))) {
      store.commit(types.SET_USERINFO, JSON.parse(getLocalStorage('userInfo')))
    }
    if (!store.getters.topic && JSON.parse(getLocalStorage('topic'))) {
      store.commit(types.SET_TOPIC, JSON.parse(getLocalStorage('topic')))
    }
    if (!store.getters.coinType && JSON.parse(getLocalStorage('coinType'))) {
      store.commit(types.SET_COINTYPE, JSON.parse(getLocalStorage('coinType')))
    }
    // 检查登录状态！！！
    if (to.meta.loginStatus) {
      if (!isEmpty(loginStatus)) {
        next()
      } else {
        console.log('当前登录状态：未登录，请登录！！！')
        next({
          path: '/login',
          query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
      }
    } else {
      if (!isEmpty(loginStatus)) {
        if (to.name === 'login' || to.name === 'register') {
          next('/')
        } else {
          next()
        }
      } else {
        next()
      }
    }
  } else if (to.meta.lever === 1) { // 代理商路由守卫 待修改
    // 清除普通用户token、登录状态、用户信息
    if (!store.getters.token && !isEmpty(getLocalStorage('token'))) {
      store.commit(types.SET_TOKEN, '')
    }
    if (!store.getters.loginStatus && !isEmpty(getLocalStorage('loginStatus'))) {
      store.commit(types.SET_LOGIN_STATUS, false)
    }
    if (!store.getters.userInfo && JSON.parse(getLocalStorage('userInfo'))) {
      store.commit(types.SET_USERINFO, '')
    }
    if (!store.getters.topic && JSON.parse(getLocalStorage('topic'))) {
      store.commit(types.SET_TOPIC, '')
    }
    if (!store.getters.coinType && JSON.parse(getLocalStorage('coinType'))) {
      store.commit(types.SET_COINTYPE, '')
    }

    // 代理商用户状态管理检查
    let agentLoginStatus = getLocalStorage('agentLoginStatus')
    if (!store.getters.agentToken && !isEmpty(getLocalStorage('agentToken'))) {
      store.commit(types.SET_AGENT_TOKEN, getLocalStorage('agentToken'))
    }
    if (!store.getters.agentLoginStatus && !isEmpty(agentLoginStatus)) {
      store.commit(types.SET_AGENT_LOGIN_STATUS, agentLoginStatus)
    }
    if (!store.getters.agentInfo && JSON.parse(getLocalStorage('agentInfo'))) {
      store.commit(types.SET_AGENTINFO, JSON.parse(getLocalStorage('agentInfo')))
    }
    if (!store.getters.rechargeLimit && !isEmpty(getLocalStorage('rechargeLimit'))) {
      store.commit(types.SET_RECHARGE_LIMIT, getLocalStorage('rechargeLimit'))
    }
    if (!store.getters.withdrawLimit && !isEmpty(getLocalStorage('withdrawLimit'))) {
      store.commit(types.SET_WITHDRAW_LIMIT, getLocalStorage('withdrawLimit'))
    }
    // 检查代理商登录状态
    if (to.meta.requireAgent === 1) {
      next('/agent-login')
    } else if (to.meta.requireAgent === 0) {
      next()
    }
    // 检查代理商登录状态
    if (to.meta.agentLoginStatus) {
      if (!isEmpty(agentLoginStatus)) {
        next()
      } else {
        console.log('当前登录状态：未登录，请登录！！！')
        next({
          path: '/agent-login',
          query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
      }
    } else {
      if (!isEmpty(agentLoginStatus)) {
        if (to.name === 'agent-login') {
          next('/agent-recharge')
        } else {
          next()
        }
      } else {
        next()
      }
    }
  }
})

// 路由改变后触发
router.afterEach((to, from, next) => {
  // window.scrollTo(0, 0) //路由改变后，滚动条回到顶端
})

export default router
