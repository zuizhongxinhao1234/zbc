'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const bodyParser = require('body-parser')
// const axios = require('axios')
const express = require('express')
const app = express()
const apiRoutes = express.Router()
app.use('/api', apiRoutes)

// 引入json数据
var testJson = require('../data/testJson.json')
var newPageList = require('../data/newPageList.json')
var newShowById = require('../data/newShowById.json')
var userInfoJson = require('../data/userInfo.json')
var legalCoinListInfoJson = require('../data/legalCoinListInfo.json')
var virtualShowALL = require('../data/virtualShowAll.json')
var coinChargeList = require('../data/coinChargeList.json')
var coinWithdrawList = require('../data/coinWithdrawList.json')
var findUserLogin = require('../data/findUserLogin.json')
var virtualRateInfo = require('../data/virtualRateInfo.json')

const configJson = require('../data/config.json')
const symbolsJson = require('../data/symbols.json')
const historyJson = require('../data/history.json')

// 延时器
function sleep (milliSeconds) {
  var startTime = new Date().getTime()
  while (new Date().getTime() < startTime + milliSeconds);
}

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') }
      ]
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll
    },
    before (app) {
      app.use(bodyParser.json())
      app.use(bodyParser.urlencoded({extended: true}))

      // tradingView配置
      app.get('/feed/config', function (req, res) {
        res.json(configJson)
      })

      //
      app.get('/feed/symbols', function (req, res) {
        console.log('symbols : ', req.query)
        res.json(symbolsJson)
      })
      // 返回k线图数据
      app.get('/feed/history', function (req, res) {
        console.log('history : ', req.query)
        res.json(historyJson)
      })

      // 获取token
      app.get('/web/newToken.do', function (req, res) {
        res.json({
          'data': 'EA280EAD0D0A96EFFD4A2FE452352E1E',
          'message': '操作成功',
          'statusCode': 200
        })
      })

      // get请求
      app.get('/api/testGet', function (req, res) {
        res.json(testJson.testGet)
      })

      // post请求
      app.post('/api/testPost', function (req, res) {
        sleep(1000)
        var page = req.body.page
        var pageSize = parseInt(req.body.pageSize)
        // console.log(req.body,'============');
        var datas = []
        for (var i = 1; i <= pageSize; i++) {
          datas.push({'id': 'id' + (((page - 1) * pageSize) + i), 'name': '成都红旗连锁有限公司' + (((page - 1) * pageSize) + i), 'organizationCode': '511153544654532132156', 'businessNo': '15456464561231321231546', 'time': ''})
        };
        res.json({
          list: datas,
          total: 100,
          statusCode: '000000'
        })
      })

      // 身份认证
      app.get('/web/user/primaryTrueName.do', function (req, res) {
        sleep(1000)
        res.json({
          'data': 'ok',
          'message': '操作成功',
          'statusCode': 200
        })
      })

      // 交易手续费
      app.get('/web/news/virtualRateInfo.do', function (req, res) {
        sleep(1000)
        res.json(virtualRateInfo)
      })

      // 新闻详情接口
      app.get('/web/news/newsShowById.do', function (req, res) {
        sleep(1000)
        res.json(newShowById)
      })

      // 新闻中心接口
      app.get('/web/news/getNewsPageList.do', function (req, res) {
        sleep(1000)
        res.json(newPageList)
      })

      // 获取登录历史
      app.get('/web/user/findUserLogin.do', function (req, res) {
        sleep(1000)
        res.json(findUserLogin)
      })

      // 绑定谷歌验证码
      app.get('/web/user/bindGoogleVerifyCode.do', function (req, res) {
        sleep(1000)
        res.json({
          'data': 'ok',
          'message': '操作成功',
          'statusCode': 200
        })
      })

      // 获取谷歌验证所需信息
      app.get('/web/user/getGoogleVerifyCode.do', function (req, res) {
        sleep(1000)
        res.json({
          'data': {
            'code': 'AB:00000015',
            'secret': 'FJYIGPJP3BNJPVEC',
            'url': 'otpauth://totp/AB:00000015?secret=FJYIGPJP3BNJPVEC'
          },
          'message': '操作成功',
          'statusCode': 200
        })
      })

      // 发布买币委托
      app.get('/web/trade/buyCoin.do', function (req, res) {
        sleep(1000)
        res.json({
          'statusCode': 200,
          'message': '发布成功',
          'requestSeqNo': '',
          'responseTime': '',
          'data': {}
        })
      })
      // 发布卖币委托
      app.get('/web/trade/sellCoin.do', function (req, res) {
        sleep(1000)
        res.json({
          'statusCode': 200,
          'message': '发布成功',
          'requestSeqNo': '',
          'responseTime': '',
          'data': {}
        })
      })

      // 登录
      app.post('/web/user/loginUser.do', function (req, res) {
        console.log(req.body)
        sleep(1000)
        res.json({
          'statusCode': 200,
          'message': '',
          'requestSeqNo': '',
          'responseTime': '',
          'data': 'EA280EAD0D0A96EFFD4A2FE452352E1E'
        })
      })

      // 获取用户信息
      app.post('/web/user/showUser.do', function (req, res) {
        console.log(req.body)
        sleep(1000)
        res.json(userInfoJson)
      })

      // 判断手机号是否存在
      app.get('/web/commons/verificationPhoneNum.do', function (req, res) {
        sleep(1000)
        res.json({
          'statusCode': 200,
          'message': '',
          'requestSeqNo': '',
          'responseTime': '',
          'data': {}
        })
      })
      // 判断邮箱是否存在
      app.get('/web/commons/verificationEmailNums', function (req, res) {
        sleep(1000)
        res.json({
          'statusCode': 200,
          'message': '',
          'requestSeqNo': '',
          'responseTime': '',
          'data': {}
        })
      })
      // 获取短信验证码
      app.get('/web/commons/sendSMSphone.do', function (req, res) {
        sleep(1000)
        res.json({
          'statusCode': 200,
          'message': '验证码发送成功',
          'requestSeqNo': '',
          'responseTime': '',
          'data': {}
        })
      })
      // 获取邮箱验证码
      app.get('/web/commons/sendSMSemail.do', function (req, res) {
        sleep(1000)
        res.json({
          'statusCode': 201,
          'message': '验证码发送失败',
          'requestSeqNo': '',
          'responseTime': '',
          'data': {}
        })
      })
      // 注册
      app.post('/web/user/registerUser', function (req, res) {
        sleep(1000)
        res.json({
          'statusCode': 200,
          'message': '注册成功',
          'requestSeqNo': '',
          'responseTime': '',
          'data': {}
        })
      })

      // 获取市场列表
      app.get('/web/commons/getMarkets.do', function (req, res) {
        sleep(1000)
        res.json({
          'data': [
            {
              'code': 'b3f6feefc997405fbd512ec744ada79f',
              'shortName': 'USDT',
              'coinlogo': 'http://47.52.238.44:9000/upload/4CCACE75C4AE45709214CF87EFFA2191.png'
            },
            {
              'code': 'b3f6feefc997405fbd512ec744ada23e',
              'shortName': 'BTC',
              'coinlogo': 'http://47.52.238.44:9000/upload/4CCACE75C4AE45709214CF87EFFA2191.png'
            },
            {
              'code': 'b3f6feefc997405fbd512ec744ada13s',
              'shortName': 'ETH',
              'coinlogo': 'http://47.52.238.44:9000/upload/4CCACE75C4AE45709214CF87EFFA2191.png'
            }
          ],
          'message': '操作成功',
          'statusCode': 200
        })
      })

      // 获取用户法币(钱包)列表
      app.get('/web/wallet/legalCoinList.do', function (req, res) {
        sleep(1000)
        res.json(legalCoinListInfoJson)
      })

      // 获取所有币种列表
      app.get('/web/user/virtualShowALL.do', function (req, res) {
        sleep(1000)
        res.json(virtualShowALL)
      })

      // 获取委托历史记录
      app.get('/web/historyRecord/historyEntrustList.do', function (req, res) {
        sleep(1000)
        var page = parseInt(req.query.pageIndex)
        var pageSize = parseInt(req.query.pageSize)
        var datas = []
        for (var i = 1; i <= pageSize; i++) {
          datas.push({
            amount: '1.24',
            fees: '0.0',
            code: '01178E74D2AA4601A057280E2EF811F6',
            yesAmount: '2.48',
            vcoinTypeCode: '7d1bffc7a99d455cbd07bf45f99aa148',
            lastUpdatTime: '2018-04-28 10:58:23',
            totalPrice: '823.51517054',
            noAmount: '0.0',
            newPrice: '823.51517054',
            userCode: '00000015',
            tradeVcoinTypeCode: 'b3f6feefc997405fbd512ec744ada79f',
            coinAndMarket: 'ETH/USDT',
            createTime: '2018-04-28 10:58:23',
            yesFees: '0.0',
            price: (((page - 1) * pageSize) + i) * 10,
            fentrustType: '买',
            marketCode: 'b3f6feefc997405fbd512ec744ada79f',
            noFees: '0.0',
            status: '部分成交',
            yesPrice: '824.75517053'
          })
        };
        res.json({
          result: {
            pageCount: 1,
            pageSize: 10,
            pageIndex: 1,
            totalSize: 227,
            data: datas
          },
          message: '操作成功',
          statusCode: 200
        })
      })

      // 获取交易历史记录
      app.get('/web/historyRecord/historyTradeList.do', function (req, res) {
        sleep(1000)
        var page = parseInt(req.query.pageIndex)
        var pageSize = parseInt(req.query.pageSize)
        var datas = []
        for (var i = 1; i <= pageSize; i++) {
          datas.push({
            amount: '1.42',
            fees: '0.0',
            code: '0117279E28504165B9A305D4C3A63714',
            yesAmount: '2.84',
            vcoinTypeCode: '59fea72a214944e294c8e8e5c60cd898',
            lastUpdatTime: '2018-04-28 15:22:33',
            totalPrice: '13037.72145699',
            noAmount: '0.0',
            newPrice: '13037.72145699',
            userCode: '00000015',
            tradeVcoinTypeCode: 'b3f6feefc997405fbd512ec744ada79f',
            coinAndMarket: 'BTC/USDT',
            createTime: '2018-04-28 15:22:33',
            yesFees: '0.0',
            price: (((page - 1) * pageSize) + i) * 10,
            fentrustType: '买',
            marketCode: 'b3f6feefc997405fbd512ec744ada79f',
            noFees: '0.0',
            status: '完全成交',
            yesPrice: '13039.14145698'
          })
        };
        res.json({
          result: {
            pageCount: 1,
            pageSize: 10,
            pageIndex: 1,
            totalSize: 227,
            data: datas
          },
          message: '操作成功',
          statusCode: 200
        })
      })

      // 绑定邮箱
      app.get('/web/user/bindEmail.do', function (req, res) {
        sleep(1000)
        res.json({
          'data': '982452937@qq.com',
          'message': '操作成功',
          'statusCode': 200
        })
      })

      // 绑定手机号
      app.get('/web/user/bindPhoneNum.do', function (req, res) {
        sleep(1000)
        res.json({
          'data': '18781034322',
          'message': '操作成功',
          'statusCode': 200
        })
      })

      // 修改绑定手机号
      app.get('/web/user/modifyPhone.do', function (req, res) {
        sleep(1000)
        res.json({
          'data': 'ok',
          'message': '操作成功',
          'statusCode': 200
        })
      })

      // 修改登录密码
      app.get('/web/user/updateLoginpassword.do', function (req, res) {
        sleep(1000)
        res.json({
          'data': 'ok',
          'message': '操作成功',
          'statusCode': 200
        })
      })

      // 获取充币记录列表
      app.get('/web/historyRecord/coinChargeList.do', function (req, res) {
        sleep(1000)
        res.json(coinChargeList)
      })

      // 获取提币记录列表
      app.get('/web/historyRecord/coinWithdrawList.do', function (req, res) {
        sleep(1000)
        res.json(coinWithdrawList)
      })

      // 添加提币地址
      app.get('/web/user/addVirtualCoinAccount.do', function (req, res) {
        sleep(1000)
        res.json({
          'data': null,
          'message': '操作成功',
          'statusCode': 200
        })
      })

      // 获取提币地址列表
      app.get('/web/user/selectCoinAddressList.do', function (req, res) {
        sleep(1000)
        res.json({
          'data': [
            {
              'code': '7dd51c25c25f4d9486c402a3069e6d00',
              'extractCashAddress': '529b26f3a0x3b75740f919dc0b7cf13c30c0062ef6',
              'memo': '',
              'remark': 'zbc',
              'coinName': 'ZBC',
              'coinTypeCode': 'cbd07bf45f99aa1487d1bffc7a99d455',
              'dealTypeCode': '2'
            },
            {
              'code': '9dd51c25c25f4d9486c40a2a3069e6d8',
              'extractCashAddress': '0x3b75740f919dc0b529b26f3a70c0062ef6cf13c3',
              'memo': '',
              'remark': 'eth',
              'coinName': 'ETH',
              'coinTypeCode': '7d1bffc7a99d455cbd07bf45f99aa148',
              'dealTypeCode': '3'
            }
          ],
          'message': '操作成功',
          'statusCode': 200
        })
      })

      // 删除提币地址
      app.get('/web/user/deleteUserAccount.do', function (req, res) {
        sleep(1000)
        res.json({
          'data': 'ok',
          'message': '操作成功',
          'statusCode': 200
        })
      })

      // 提交提币
      app.get('/web/wallet/coinWithdraw.do', function (req, res) {
        sleep(1000)
        res.json({
          'data': 'ok',
          'message': '操作成功',
          'statusCode': 200
        })
      })

      // 设置交易密码
      app.get('/web/user/setDealCode.do', function (req, res) {
        sleep(1000)
        res.json({
          'data': 'ok',
          'message': '操作成功',
          'statusCode': 200
        })
      })

      // 修改交易密码
      app.get('/web/user/modifyDealCode.do', function (req, res) {
        sleep(1000)
        res.json({
          'data': 'ok',
          'message': '操作成功',
          'statusCode': 200
        })
      })

      // 代理商发送手机验证码
      app.get('/web/agent/sendAgentVerifyCode.do', function (req, res) {
        sleep(1000)
        res.json({
          'data': 'ok',
          'message': '操作成功',
          'statusCode': 200
        })
      })

      // 代理商登录
      app.get('/web/agent/agentLogin.do', function (req, res) {
        sleep(1000)
        res.json({
          'data': {
            'token': 'A2FE452352E1EEA280EAD0D0A96EFFD4'
          },
          'message': '操作成功',
          'statusCode': 200
        })
      })

      // 获取代理商信息
      app.get('/web/agent/queryAgentSimpleInfo.do', function (req, res) {
        sleep(1000)
        res.json({
          'data': {
            'code': '00000017',
            'phone': '18709843453',
            'name': '代理商1',
            'enchashmentLimit': '1994.4555',
            'rechargeLimit': '244.666',
            'depositLimit': '34455',
            'status': '0',
            'grade': '1'
          },
          'message': '操作成功',
          'statusCode': 200
        })
      })

       // 获取代理商信息
      app.get('/web/agent/logOut.do', function (req, res) {
        sleep(1000)
        res.json({
          'data': true,
          'message': '操作成功',
          'statusCode': 200
        })
      })

      // 代理商充值记录分页数据
      app.get('/web/agent/zbcRechargeRecordPageQuery.do', function (req, res) {
        sleep(1000)
        res.json({
          'pageCount': 2,
          'totalSize': 10,
          'pageIndex': 1,
          'pageSize': 5,
          'data': [
            {
              'code': 'abcd12312541561',
              'rechargeVal': '456',
              'customerCode': '000004',
              'agentCode': '000001',
              'lockStatus': 0,
              'rechargeStatus': 3,
              'createTime': '2018-05-28 14:00',
              'modifyTime': '2018-05-28 15:03'
            },
            {
              'code': 'efagaae90401924',
              'rechargeVal': '10000',
              'customerCode': '000005',
              'agentCode': '000001',
              'lockStatus': 1,
              'rechargeStatus': 4,
              'createTime': '2018-05-28 19:00',
              'modifyTime': '2018-05-28 20:05'
            }
          ],
          'message': '操作成功',
          'statusCode': 200
        })
      })

      // 更新代理商充值记录分页数据
      app.get('/web/agent/updateZBCRechargeRecord.do', function (req, res) {
        sleep(1000)
        res.json({
          'data': {
            'rechargeLimit': '245.555',
            'enchashmentLimit': '32299'
          },
          'message': '操作成功',
          'statusCode': 200
        })
      })

      // 新增代理商充值记录分页数据
      app.get('/web/agent/addRechargeRecord.do', function (req, res) {
        sleep(1000)
        res.json({
          'data': {
            'rechargeLimit': '100.444',
            'enchashmentLimit': '100002'
          },
          'message': '操作成功',
          'statusCode': 200
        })
      })

      // 代理商提现记录分页数据
      app.get('/web/agent/zbcWithdrawalPageQuery.do', function (req, res) {
        sleep(1000)
        res.json({
          'pageCount': 2,
          'totalSize': 10,
          'pageIndex': 1,
          'pageSize': 5,
          'data': [
            {
              'code': 'abcd12312541561',
              'enchashmentVal': '456',
              'customerCode': '000004',
              'agentCode': '000001',
              'lockStatus': 0,
              'withdrawalStatus': 3,
              'createTime': '2018-05-28 14:00',
              'modifyTime': '2018-05-28 15:03'
            },
            {
              'code': 'efagaae90401924',
              'enchashmentVal': '10000',
              'customerCode': '000005',
              'agentCode': '000001',
              'lockStatus': 1,
              'withdrawalStatus': 4,
              'createTime': '2018-05-28 19:00',
              'modifyTime': '2018-05-28 20:05'
            }
          ],
          'message': '操作成功',
          'statusCode': 200
        })
      })

      // 更新代理商提现记录分页数据
      app.get('/web/agent/updateWithdrawalRecord.do', function (req, res) {
        sleep(1000)
        res.json({
          'data': {
            'rechargeLimit': '245.555',
            'enchashmentLimit': '32299'
          },
          'message': '操作成功',
          'statusCode': 200
        })
      })

      // 新增代理商提现记录分页数据
      app.get('/web/agent/addZBCWithdrawalRecord.do', function (req, res) {
        sleep(1000)
        res.json({
          'data': {
            'rechargeLimit': '100.444',
            'enchashmentLimit': '100002'
          },
          'message': '操作成功',
          'statusCode': 200
        })
      })

      // 代理商修改密码
      app.get('/web/agent/agentModifyPassword.do', function (req, res) {
        sleep(1000)
        res.json({
          'data': 'ok',
          'message': '操作成功',
          'statusCode': 200
        })
      })
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`]
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
