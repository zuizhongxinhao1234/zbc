const http = require('http')
const WebSocket = require('ws')
const url = require('url')
const server = http.createServer()
const wss1 = new WebSocket.Server({ noServer: true })
const wss2 = new WebSocket.Server({ noServer: true })
const wss3 = new WebSocket.Server({ noServer: true })

const PORT = 3000

// 市场数据推送
wss1.on('connection', function connection (ws) {
  console.log('new mainPageInfoSocket connection')
  var timer
  ws.on('message', function incoming (message) {
    console.log('mainPageInfoSocket: %s', message)
    if (JSON.parse(message).topic === 'b3f6feefc997405fbd512ec744ada79f') {
      timer && clearInterval(timer)
      timer = setInterval(function () {
        var res = []
        for (var i = 0; i < 5; i++) {
          res.push({
            'code': 'be47524726a4405bac5ce977a4ac4764', // 主键
            'name': 'ETH' + i, // 币名称
            'latelyDealPrice': parseInt(Math.random() * 1000), // 最新成交价
            'entrustAmount24': parseInt(Math.random() * 1000), // 24小时成交总量
            'entrustPrice24': parseInt(Math.random() * 1000), // 24小时成交均价
            'marketRose': parseInt(Math.random() * 100), // 涨跌幅：后台返回20，前端需要加上%，20%
            'marketCode': 'b3f6feefc997405fbd512ec744ada79f', // 市场主键code
            'coinloge': 'http://47.52.238.44:9000/upload/EAEACC92E5C64AA995F74CB47659FFC3.png', // 币log图片地址
            'highestPrice24': parseInt(Math.random() * 1000), // 24小时最高价
            'lowestPrice24': parseInt(Math.random() * 1000), // 24小时最低价
            'status': i % 2 === 0 ? '1' : '2', // 虚拟币状态：1-已停盘；2-交易中
            'statusName': i % 2 === 0 ? '已停盘' : '交易中', // 币状态的中文名称
            'chineseName': 'ETH' + i, // 币的中文名称
            'isBranch': '1', // 是否为分叉币：1是，2否
            'nameMarket': 'USDT', // 市场名称
            'riseFallFlag': parseInt(Math.random() * 3)// 涨跌幅标记：0表示不涨不跌，1表示涨，2表示跌
          })
        }
        ws.send(JSON.stringify(res))
      }, 5000)
    } else {
      clearInterval(timer)
      timer = setInterval(function () {
        var res = []
        for (var i = 0; i < 5; i++) {
          res.push({
            'code': 'be47524726a4405bac5ce977a4ac4764', // 主键
            'name': 'BTC' + i, // 币名称
            'latelyDealPrice': parseInt(Math.random() * 1000), // 最新成交价
            'entrustAmount24': parseInt(Math.random() * 1000), // 24小时成交总量
            'entrustPrice24': parseInt(Math.random() * 1000), // 24小时成交均价
            'marketRose': parseInt(Math.random() * 100), // 涨跌幅：后台返回20，前端需要加上%，20%
            'marketCode': 'b3f6feefc997405fbd512ec744ada79f', // 市场主键code
            'coinloge': 'http://47.52.238.44:9000/upload/EAEACC92E5C64AA995F74CB47659FFC3.png', // 币log图片地址
            'highestPrice24': parseInt(Math.random() * 1000), // 24小时最高价
            'lowestPrice24': parseInt(Math.random() * 1000), // 24小时最低价
            'status': i % 2 === 0 ? '1' : '2', // 虚拟币状态：1-已停盘；2-交易中
            'statusName': i % 2 === 0 ? '已停盘' : '交易中', // 币状态的中文名称
            'chineseName': 'ETH' + i, // 币的中文名称
            'isBranch': '1', // 是否为分叉币：1是，2否
            'nameMarket': 'BTC', // 市场名称
            'riseFallFlag': parseInt(Math.random() * 3)// 涨跌幅标记：0表示不涨不跌，1表示涨，2表示跌
          })
        }
        ws.send(JSON.stringify(res))
      }, 5000)
    }
  })

  ws.on('close', function (close) {
    clearInterval(timer)
    console.log('市场数据连接关闭', close)
  })
  ws.on('error', function (err) {
    console.log('handle err')
    console.log(err)
  })
})

// 用户个人交易数据
wss2.on('connection', function connection (ws) {
  console.log('new privateTradeInfoList connection')
  var timer
  ws.on('message', function incoming (message) {
    console.log('privateTradeInfoList: %s', message)
    timer && clearInterval(timer)
    timer = setInterval(function () {
      var res = {
        entrustData: [{
          amount: '9',
          fees: '1',
          code: 'A59A8D8989F14EF98F93EC187AA1607F',
          yesAmount: '0.0',
          vcoinTypeCode: '59fea72a214944e294c8e8e5c60cd898',
          lastUpdatTime: (new Date()).getTime(),
          totalPrice: '72990',
          noAmount: '9',
          newPrice: '0.0',
          userCode: '00000015',
          tradeVcoinTypeCode: 'b3f6feefc997405fbd512ec744ada79f',
          createTime: (new Date()).getTime(),
          yesFees: '0.0',
          price: '8110',
          fentrustType: 1,
          marketCode: 'b3f6feefc997405fbd512ec744ada79f',
          noFees: '1',
          tradeType: '买',
          status: 1,
          yesPrice: '0.0'
        }, {
          amount: '9',
          fees: '1',
          code: 'A59A8D8989F14EF98F93EC187AA1607F',
          yesAmount: '0.0',
          vcoinTypeCode: '59fea72a214944e294c8e8e5c60cd898',
          lastUpdatTime: (new Date()).getTime(),
          totalPrice: '72990',
          noAmount: '9',
          newPrice: '0.0',
          userCode: '00000015',
          tradeVcoinTypeCode: 'b3f6feefc997405fbd512ec744ada79f',
          createTime: (new Date()).getTime(),
          yesFees: '0.0',
          price: '8110',
          fentrustType: 2,
          marketCode: 'b3f6feefc997405fbd512ec744ada79f',
          noFees: '1',
          tradeType: '卖',
          status: 1,
          yesPrice: '0.0'
        }],
        coinBalance: {
          uId: '00000015',
          updateDate: 1524450721000,
          code: '626c4d4c79f74f808e004d4a81ea5245',
          totalNum: 100000053.00001000,
          virtualCoinTypeId: '59fea72a214944e294c8e8e5c60cd898',
          blockNum: 55.00000000,
          version: 11
        },
        marketBalance: {
          uId: '00000015',
          updateDate: 1524563691000,
          code: '70181d9dec464b159853e2622c839ac8',
          totalNum: 998911336.00000000,
          virtualCoinTypeId: 'b3f6feefc997405fbd512ec744ada79f',
          blockNum: 187932.75933686,
          version: 26
        },
        historyData: [{
          amount: '9',
          fees: '1',
          code: 'DD91AB507980423AA04C5E20E8AED276',
          yesAmount: '9',
          vcoinTypeCode: '59fea72a214944e294c8e8e5c60cd898',
          lastUpdatTime: (new Date()).getTime(),
          totalPrice: '80910',
          noAmount: '0.0',
          newPrice: '8340',
          userCode: '00000015',
          tradeVcoinTypeCode: 'b3f6feefc997405fbd512ec744ada79f',
          createTime: (new Date()).getTime(),
          yesFees: '0.92769744',
          price: '8990',
          fentrustType: 1,
          marketCode: 'b3f6feefc997405fbd512ec744ada79f',
          noFees: '0.07230256',
          tradeType: '买',
          status: 2,
          yesPrice: '75060'
        }, {
          amount: '9',
          fees: '1',
          code: 'DD91AB507980423AA04C5E20E8AED276',
          yesAmount: '9',
          vcoinTypeCode: '59fea72a214944e294c8e8e5c60cd898',
          lastUpdatTime: (new Date()).getTime(),
          totalPrice: '80910',
          noAmount: '0.0',
          newPrice: '8340',
          userCode: '00000015',
          tradeVcoinTypeCode: 'b3f6feefc997405fbd512ec744ada79f',
          createTime: (new Date()).getTime(),
          yesFees: '0.92769744',
          price: '8990',
          fentrustType: 2,
          marketCode: 'b3f6feefc997405fbd512ec744ada79f',
          noFees: '0.07230256',
          tradeType: '卖',
          status: 2,
          yesPrice: '75060'
        }]
      }
      ws.send(JSON.stringify(res))
    }, 5000)
  })

  ws.on('close', function (close) {
    timer && clearInterval(timer)
    console.log('个人交易数据连接关闭', close)
  })
  ws.on('error', function (err) {
    console.log('handle err')
    console.log(err)
  })
})

// 所有交易历史数据
wss3.on('connection', function connection (ws) {
  console.log('new commonTradeInfoList connection')
  var timer
  ws.on('message', function incoming (message) {
    console.log('commonTradeInfoList: %s', message)
    timer && clearInterval(timer)
    timer = setInterval(function () {
      var res = {
        onlineCount: 4,
        marketCoinToCny: 6.723,
        marketDatas: {
          'b3f6feefc997405fbd512ec744ada79f-USDT': [{
            chineseName: 'BTC',
            code: '59fea72a214944e294c8e8e5c60cd898',
            coinloge: 'http://47.52.238.44:9000/upload/EAEACC92E5C64AA995F74CB47659FFC3.png',
            entrustAmount24: '27',
            entrustPrice24: '225180',
            flag: 0,
            latelyDealPrice: '8340',
            marketRose: '834000',
            name: 'BTC',
            riseFallFlag: 0
          }],
          '23fa72fc9dce446992cc22ab9be021bb-ZBC': [{
            chineseName: 'LISK',
            code: '83063d3a82ef4167991e2d4491229d84',
            coinloge: 'http://47.52.238.44:9000/upload/C26602E003FF4162AB24EC1F57315AD9.png',
            entrustAmount24: '0.0',
            entrustPrice24: '0.0',
            flag: 0,
            latelyDealPrice: '0.0',
            marketRose: '0.0',
            name: 'LISK',
            riseFallFlag: 0
          }]
        },
        klineSmallChart: ['8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340', '8340'],
        rate: [{
          code: '5a021785b68740e19c3f64437beceb63',
          remark: '人民币兑换美元汇率',
          type: 1,
          key: 'CNY-USD',
          parameValue: '6.295'
        }],
        currentDatas: {
          latestDealPrize: '8340 ',
          nameMarket: 'USDT ',
          coinlogoMarket: '/upload/4CCACE75C4AE45709214CF87EFFA2191.png',
          highestPrize24: 8340.0,
          buy: [{
            code: '',
            createTime: (new Date()).getTime(),
            price: '8339 ',
            version: 0,
            noAmount: '60.3747 ',
            tradeType: '买 ',
            notDealNumber: 60.37470000
          }, {
            code: '',
            createTime: (new Date()).getTime(),
            price: '4339 ',
            version: 0,
            noAmount: '160.3747',
            tradeType: '买 ',
            notDealNumber: 160.37470000
          }],
          sell: [{
            code: '',
            createTime: (new Date()).getTime(),
            price: '8340 ',
            version: 0,
            noAmount: '1394.1 ',
            tradeType: '卖 ',
            notDealNumber: 1394.1
          }, {
            code: '',
            createTime: (new Date()).getTime(),
            price: '1340 ',
            version: 0,
            noAmount: '3394.1 ',
            tradeType: '卖 ',
            notDealNumber: 3394.1
          }],
          coinlogo: ' / upload / EAEACC92E5C64AA995F74CB47659FFC3.png ',
          entrust: [{
            amount: '9 ',
            code: '6852621 D9C5545C6A2BD3799B8C90988 ',
            fentrustCode: 'DD91AB507980423AA04C5E20E8AED276 ',
            createTime: (new Date()).getTime(),
            totalPrice: '75060 ',
            vcoinTypeCode: '59fea72a214944e294c8e8e5c60cd898 ',
            isactive: true,
            marketCode: 'b3f6feefc997405fbd512ec744ada79f ',
            entrustType: 1,
            prize: '8340 ',
            tradeType: '买 '
          }, {
            amount: '90 ',
            code: '6852621 D9C5545C6A2BD3799B8C90988 ',
            fentrustCode: 'DD91AB507980423AA04C5E20E8AED276 ',
            createTime: (new Date()).getTime(),
            totalPrice: '75060 ',
            vcoinTypeCode: '59fea72a214944e294c8e8e5c60cd898 ',
            isactive: true,
            marketCode: 'b3f6feefc997405fbd512ec744ada79f ',
            entrustType: 2,
            prize: '3021 ',
            tradeType: '卖 '
          }],
          shortNameMarket: 'USDT ',
          isBranch: 2,
          lowestPrize24: 8340.0,
          entrustAmount24: '27',
          entrustPrice24: '225180',
          name: 'BTC',
          topQuotations: {
            volume: 27.0,
            high: 8340.0,
            last: 8340.0,
            buyone: 8339.0,
            low: 8340.0,
            sellone: 8340.0
          },
          marketRose: '834000 ',
          shortName: 'BTC ',
          status: 2
        }
      }
      ws.send(JSON.stringify(res))
    }, 5000)
  })

  ws.on('close', function (close) {
    timer && clearInterval(timer)
    console.log('所有交易历史数据连接关闭', close)
  })
  ws.on('error', function (err) {
    console.log('handle err')
    console.log(err)
  })
})

server.on('upgrade', function upgrade (request, socket, head) {
  const pathname = url.parse(request.url).pathname
  // console.log(pathname)
  if (pathname === '/websocket/mainPageInfoSocket') {
    wss1.handleUpgrade(request, socket, head, function done (ws) {
      wss1.emit('connection', ws)
    })
  } else if (pathname === '/websocket/privateTradeInfoList') {
    wss2.handleUpgrade(request, socket, head, function done (ws) {
      wss2.emit('connection', ws)
    })
  } else if (pathname === '/websocket/commonTradeInfoList') {
    wss3.handleUpgrade(request, socket, head, function done (ws) {
      wss3.emit('connection', ws)
    })
  } else {
    socket.destroy()
  }
})

server.listen(PORT, function listening () {
  console.log('webSocket server listening on', PORT)
})
