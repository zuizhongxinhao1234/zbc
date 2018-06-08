import {_apiLogin, _apiGetUserInfo} from './login'
import {_apiGetNewsPageList, _apiGetNewsShowById} from './news'
import {_apiShareProfitPageQuery} from './invite'
import {_apiVerificationPhoneNum,
  _apiVerificationEmailNums,
  _apiSendSMSemail,
  _apiSendSMSphone,
  _apiRegisterUser} from './register'
import {_apiGetMarkets} from './market'
import {_apiBuyCoin, _apiSellCoin, _apiCancelEntrust} from './trade'
import {_apiLegalCoinList} from './finance'
import {_apiRechargeList,
  _apiWithdrawList,
  _apiGetHistoryEntrustList,
  _apiGetHistoryTradeList} from './records'
import {_apiGetVirtualShowALL} from './virtualShowALL'
import {_apiBindEmail,
  _apiBindPhoneNum,
  _apiModifyPhone,
  _apiUpdateLoginpassword,
  _apiGetGoogleVerifyCode,
  _apiBindGoogleVerifyCode,
  _apiFindUserLogin,
  _apiModifyEmail,
  _apiPrimaryTrueName,
  _apiSetDealCode,
  _apiChangeDealCode
} from './accounts'
import {_apiAddWithdrawAddress, _apiWithdrawAddressList, _apiDeleteWithdrawAddress, _apiSubmitWithdraw} from './withdrawAddress'
import {_apiVirtualRateInfo} from './rate'
import {_apiGetNewToken} from './token'
import {
  _apiAgentSendSMSphone,
  _apiAgentLogin,
  _apiAgentGetUserInfo,
  _apiAgentLoginOut,
  _apiAgentRechargeHistory,
  _apiAgentRechargeHistoryUpdate,
  _apiAgentRechargeHistoryAdd,
  _apiAgentWithdrawHistory,
  _apiAgentWithdrawHistoryUpdate,
  _apiAgentWithdrawHistoryAdd,
  _apiAgentChangePassword
} from './agent'
import {_apiGetFullDepth} from './fullDepth'
import {_apiGetFriendShows} from './friendshipLink'

export {
  _apiGetFriendShows, // 获取友情链接
  _apiCancelEntrust, // 撤销当前委托
  _apiGetFullDepth, // 获取深度图数据
  _apiGetNewToken, // 获取token
  _apiShareProfitPageQuery, // 获取分润列表
  _apiVirtualRateInfo, // 交易手续费
  _apiPrimaryTrueName, // 身份认证
  _apiGetNewsShowById, // 获取带条新闻详情
  _apiGetNewsPageList, // 获取新闻中心数据接口(1-官方公告；2-币种介绍；3-行业资讯)
  _apiFindUserLogin, // 获取登录历史
  _apiBindGoogleVerifyCode, // 绑定谷歌验证码
  _apiGetGoogleVerifyCode, // 获取谷歌验证码所需信息
  _apiUpdateLoginpassword, // 修改登录密码
  _apiModifyPhone, // 修改手机号
  _apiBindPhoneNum, // 绑定手机号
  _apiBindEmail, // 绑定邮箱
  _apiModifyEmail, // 修改绑定邮箱
  _apiSetDealCode, // 设置交易密码
  _apiChangeDealCode, // 修改交易密码
  _apiGetVirtualShowALL, // 获取所有币种
  _apiGetHistoryTradeList, // 获取交易历史记录
  _apiLogin, // 登录
  _apiGetUserInfo, // 获取用户信息
  _apiVerificationPhoneNum, // 判断手机号是否存在
  _apiVerificationEmailNums, // 判断邮箱是否存在
  _apiSendSMSemail, // 非登录用户获取邮箱验证码
  _apiSendSMSphone, // 非登录用户获取短信验证码
  _apiRegisterUser, // 注册
  _apiGetMarkets, // 获取市场列表
  _apiBuyCoin, // 发布买币委托
  _apiSellCoin, // 发布卖币委托
  _apiLegalCoinList, // 获取币种列表
  _apiGetHistoryEntrustList, // 获取委托历史记录
  _apiRechargeList, // 获取充币记录
  _apiWithdrawList, // 获取提币记录
  _apiAddWithdrawAddress, // 添加提币地址
  _apiWithdrawAddressList, // 获取提币地址列表
  _apiDeleteWithdrawAddress, // 删除提币地址
  _apiSubmitWithdraw, // 提交提币
  _apiAgentSendSMSphone, // 代理商发送送机验证码
  _apiAgentLogin, // 代理商登录
  _apiAgentGetUserInfo, // 获取代理商信息
  _apiAgentLoginOut, // 代理商登出
  _apiAgentRechargeHistory, // 代理商充值记录分页数据
  _apiAgentRechargeHistoryUpdate, // 更新代理商充值记录分页数据
  _apiAgentRechargeHistoryAdd, // 新增代理商充值记录分页数据
  _apiAgentWithdrawHistory, // 代理商提现记录分页数据
  _apiAgentWithdrawHistoryUpdate, // 更新代理商提现记录分页数据
  _apiAgentWithdrawHistoryAdd, // 新增代理商提现记录分页数据
  _apiAgentChangePassword // 代理商修改密码
}
