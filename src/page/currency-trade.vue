<template>
  <div>
    <my-header></my-header>

    <div class="content-box">
      <el-container>
        <el-aside width="360px">
          <el-row class="activety">
            <el-col :span="24">
              <router-link to="/invite">
                <img src="../assets/images/activity/invite.zh-cn.zbc-night.jpg" alt="">
              </router-link>
            </el-col>
          </el-row>
          <!-- 市场 -->
          <el-row>
            <el-col :span="24">
              <currency-trade-market @coinTypeChange="coinTypeChange"></currency-trade-market>
            </el-col>
          </el-row>

          <!-- 行业资讯 -->
          <el-row class="margin-top-10" v-for="item in newsLists" :key="item.type">
            <el-col :span="24">
              <currency-trade-news :type="item.type" :name="item.name"></currency-trade-news>
            </el-col>
          </el-row>
        </el-aside>
        <el-main>
          <el-row>
            <!-- tradingView -->
            <el-col :span="24" class="transaction">
              <div class="tradingView">
                <currency-trade-trading-view>
                </currency-trade-trading-view>
              </div>
            </el-col>
          </el-row>
          <el-row class="margin-top-10">
              <!-- 交易 -->
            <el-col :span="16">
              <currency-trade-transaction
                ref="transation"
                :loadingFlag="privateTradeInfoFlag"
                :marketBalance="privateTradeInfoList.marketBalance"
                :coinBalance="privateTradeInfoList.coinBalance">
              </currency-trade-transaction>
            </el-col>
                <!-- 最新价 -->
            <el-col :span="8">
              <div class="padding-left-10">
                <currency-trade-latest-price
                  @priceChange="priceChange"
                  :loadingFlag="commonTradeInfoFlag"
                  :currentDatas="commonTradeInfoList.currentDatas"
                  :errorFlag="commonTradeInfoErrorFlag">
                </currency-trade-latest-price>
              </div>
            </el-col>
          </el-row>
              <!-- 当前委托 -->
          <el-row class="margin-top-10" v-if="loginStatus">
            <el-col :span="24">
              <currency-trade-current-principal
                :entrustData="privateTradeInfoList.entrustData"
                 :loadingFlag="privateTradeInfoFlag"
                 :errorFlag="privateTradeInfoErrorFlag">
              </currency-trade-current-principal>
            </el-col>
          </el-row>
                <!-- 历史委托 -->
          <el-row class="margin-top-10" v-if="loginStatus">
            <el-col :span="24">
              <div>
                <currency-trade-history-principal
                  :historyData="privateTradeInfoList.historyData"
                  :loadingFlag="privateTradeInfoFlag"
                  :errorFlag="privateTradeInfoErrorFlag">
                </currency-trade-history-principal>
              </div>
            </el-col>
          </el-row>
          <el-row class="margin-top-10">
                <!-- 深度图 -->
            <el-col :span="14">
              <div>
                <currency-trade-depth-map ref="depthMap">
                </currency-trade-depth-map>
              </div>
            </el-col>
                <!-- 实时成交 -->
            <el-col :span="10">
              <div class="padding-left-10">
                <currency-trade-real-time
                  :loadingFlag="commonTradeInfoFlag"
                  :currentDatas="commonTradeInfoList.currentDatas"
                  :errorFlag="commonTradeInfoErrorFlag">
                </currency-trade-real-time>
              </div>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </div>

    <Footer></Footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from 'components/common/Header'
  import Footer from 'components/common/Footer'
  // tradingView
  import currencyTradeTradingView from 'components/currency-trade/currency-trade-tradingView'
  // 市场
  import currencyTradeMarket from 'components/currency-trade/currency-trade-market'
  // 交易
  import currencyTradeTransaction from 'components/currency-trade/currency-trade-transaction'
  // 最新价
  import currencyTradeLatestPrice from 'components/currency-trade/currency-trade-latestPrice'
  // 新闻中心
  import currencyTradeNews from 'components/currency-trade/currency-trade-news'
  // 当前委托
  import currencyTradeCurrentPrincipal from 'components/currency-trade/currency-trade-currentPrincipal'
  // 历史委托
  import currencyTradeHistoryPrincipal from 'components/currency-trade/currency-trade-historyPrincipal'
  // 深度图
  import currencyTradeDepthMap from 'components/currency-trade/currency-trade-depthMap'
  // 实时成交
  import currencyTradeRealTime from 'components/currency-trade/currency-trade-realTime'
  import {mapGetters, mapMutations} from 'vuex'
  import {SET_MARKETCOINTOCNY} from 'store/mutation-types'
  // import {wsBase} from '../api/config'
  import {initSocket, reconnect} from 'common/websocket'

export default {
    name: 'Name',
    beforeRouteLeave (to, from, next) {
      this.destoryFlag = true
      this.socketPrivateTradeInfo && this.socketPrivateTradeInfo.close()
      this.socketCommonTradeInfo && this.socketCommonTradeInfo.close()
      window.reconnectTimeout && clearTimeout(window.reconnectTimeout)
      window.PrivateTimeout && clearTimeout(window.PrivateTimeout)
      window.commonTimeout && clearTimeout(window.commonTimeout)
      next()
    },
    data () {
      return {
        destoryFlag: false, // 组件销毁状态
        // 个人交易数据
        socketPrivateTradeInfo: null, // webSocket对象
        privateTradeInfoFlag: false, // loading
        privateTradeInfoErrorFlag: false, // websocket错误
        privateTradeInfoLockReconnect: false, // websocket重连状态
        // privateTradeInfoTt: '', // websocket重连定时器
        privateTradeInfoList: {
          entrustData: [], // 委托交易数据
          historyData: [], // 历史交易数据
          marketBalance: {}, // 会员某市场虚拟币数据
          coinBalance: {} // 会员某币种虚拟币数据
        },
        // 所有交易数据
        socketCommonTradeInfo: null, // webSocket对象
        commonTradeInfoFlag: false, // loading
        commonTradeInfoErrorFlag: false, // websocket错误
        commonTradeInfoLockReconnect: false, // websocket重连状态
        // commonTradeInfoTt: '', // websocket重连定时器
        commonTradeInfoList: {
          marketDatas: {}, // 所有市场数据
          rate: {}, // 汇率数据
          klineSmallChart: [], // k线价格数据
          currentDatas: {} // 当前买卖盘最新成交价
        },
        newsLists: []// 新闻中心
      }
    },
    computed: {
      ...mapGetters([
        'loginStatus',
        'topic',
        'coinType',
        'token'
      ])
    },
    created () {
      this.ws_CommonTradeInfoList()
      this.loginStatus && this.ws_privateTradeInfoList()
      if (this.loginStatus) {
        this.newsLists = [{
          type: '1',
          name: this.$t('currencyTrade.notice')
        }, {
          type: '3',
          name: this.$t('currencyTrade.industry')
        }, {
          type: '2',
          name: this.$t('currencyTrade.introduce')
        }]
      } else {
        this.newsLists = [{
          type: '1',
          name: this.$t('currencyTrade.notice')
        }, {
          type: '3',
          name: this.$t('currencyTrade.industry')
        }]
      }
    },
    methods: {
      // 最新价切换事件接收函数
      priceChange (buy, sell) {
        this.$refs.transation.changePrice(buy, sell)
      },
      // 币种切换事件接收函数
      coinTypeChange (val) {
        // console.log('币种切换事件接收函数')
        this.ws_sendPrivateTradeInfo()
        this.ws_sendCommonTradeInfo()
        this.$refs.depthMap.apiGetFullDepth()
      },
      // 个人交易数据链接
      ws_privateTradeInfoList () {
        this.privateTradeInfoFlag = true
        this.socketPrivateTradeInfo = initSocket('/websocket/privateTradeInfoList', this.ws_sendPrivateTradeInfo, this.ws_messagePrivateTradeInfo, this.ws_eroorPrivateTradeInfo, this.ws_closedPrivateTradeInfo)
      },
      // 个人交易数据链接错误回调
      ws_eroorPrivateTradeInfo () {
        // this.privateTradeInfoFlag = false
        this.privateTradeInfoErrorFlag = true
      },
      // 个人交易数据链接接收消息
      ws_messagePrivateTradeInfo (event) {
        require('@/utils/pako.min')
        let reader = new FileReader()
        reader.readAsArrayBuffer(event.data)
        reader.onload = (evt) => {
          /* eslint-disable */
          const message = pako.ungzip(evt.target.result, {to: 'string'})
          this.privateTradeInfoList  = JSON.parse(message)
          this.privateTradeInfoFlag = false
        }
        // this.privateTradeInfoList = JSON.parse(evt.data)
        // this.privateTradeInfoFlag = false
      },
      // 个人交易数据链接发送消息
      ws_sendPrivateTradeInfo () {
        let req = {
          topic: this.topic.code,
          token: this.token,
          coinType: this.coinType.code
        }
        if (this.topic.code && this.token && this.coinType.code && this.socketPrivateTradeInfo && this.socketPrivateTradeInfo.readyState === 1) {
          this.socketPrivateTradeInfo.send(JSON.stringify(req))
          this.privateTradeInfoErrorFlag = false
        } else {
          console.log('webSocket privateTradeInfoList not connection')
        }
      },
      // 个人交易数据链接关闭回调
      ws_closedPrivateTradeInfo () {
        if (!this.destoryFlag) {
          reconnect(this.privateTradeInfoLockReconnect, this.ws_privateTradeInfoList, 'PrivateTimeout')
          this.privateTradeInfoFlag = true
          this.privateTradeInfoErrorFlag = true
        }
      },
      // 所有交易数据链接
      ws_CommonTradeInfoList () {
        this.commonTradeInfoFlag = true
        this.socketCommonTradeInfo = initSocket('/websocket/commonTradeInfoList', this.ws_sendCommonTradeInfo, this.ws_messageCommonTradeInfo, this.ws_errorCommonTradeInfo, this.ws_closedCommonTradeInfo)
      },
      // 所有交易数据链接关闭及错误回调
      ws_errorCommonTradeInfo () {
        // this.commonTradeInfoFlag = false
        this.commonTradeInfoErrorFlag = true
      },
      // 所有交易数据链接接收消息
      ws_messageCommonTradeInfo (event) {
        require('@/utils/pako.min')
        let reader = new FileReader()
        reader.readAsArrayBuffer(event.data)
        reader.onload = (evt) => {
          /* eslint-disable */
          const message = pako.ungzip(evt.target.result, {to: 'string'})
          let obj1 = JSON.parse(message)
          let obj2 = JSON.parse(JSON.parse(message).currentDatas)
          this.commonTradeInfoList = Object.assign(obj1,{currentDatas:obj2})
          this.commonTradeInfoFlag = false
          this.setMarketCoinToCny(this.commonTradeInfoList.marketCoinToCny)
        }
      },
      // 所有交易数据链接发送消息
      ws_sendCommonTradeInfo () {
        let req = {
          topic: this.topic.code,
          token: this.token,
          coinType: this.coinType.code
        }
        if (this.topic.code && this.coinType.code && this.socketCommonTradeInfo && this.socketCommonTradeInfo.readyState === 1) {
          this.socketCommonTradeInfo.send(JSON.stringify(req))
          this.commonTradeInfoErrorFlag = false
        } else {
          console.log('webSocket commonTradeInfoList not connection')
        }
      },
      // 所有交易数据链接关闭回调
      ws_closedCommonTradeInfo () {
        if (!this.destoryFlag) {
          reconnect(this.commonTradeInfoLockReconnect, this.ws_CommonTradeInfoList,'commonTimeout')
          this.commonTradeInfoFlag = true
          this.commonTradeInfoErrorFlag = true
        }
      },
      ...mapMutations({
        setMarketCoinToCny: SET_MARKETCOINTOCNY
      })
    },
    components: {
      'my-header': Header,
      Footer,
      currencyTradeMarket,
      currencyTradeTransaction,
      currencyTradeLatestPrice,
      currencyTradeCurrentPrincipal,
      currencyTradeHistoryPrincipal,
      currencyTradeDepthMap,
      currencyTradeRealTime,
      currencyTradeNews,
      currencyTradeTradingView
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable.styl"
  .content-box
    background-color $color-main-bg
    padding 10px
  .el-aside
    background-color: $color-main-bg
    color: $color-main-font
    margin-right 10px
  .el-main {
    background-color: $color-main-bg
    color: $color-main-font
    padding 0
    overflow hidden
  }
  .tradingView
    background-color $color-second-bg
  .margin-top-10
    margin-top 10px
  .padding-left-10
    padding-left 10px
  .activety
    margin-bottom 10px
    img
      width 100%
</style>
