<template>
    <div>
      <div class="clear-both">
        <div
          :key="index"
          v-for="(item, index) in currencyList"
          :class="{'border-left': index === 0, 'currentCoin': index === currentIndex}"
          class="trade-nav position-relative float-left"
          @click="changeCurrentTopic(index,item)">
          <!--<img :src="item.coinlogo" alt="">-->
          <span>{{item.name}}</span>
        </div>
        <div class="search-box float-right position-relative">
          <input v-model="searchContent" class="outline" type="text" placeholder="">
          <i v-show="searchContent === ''" class="iconfont icon-sousuo"></i>
          <i v-show="searchContent !== ''" @click="clearSearchContent" class="iconfont icon-guanbi2fill"></i>
        </div>
      </div>
      <div class="table-box">
        <table cellpadding="0" cellspacing="0" v-loading="marketLoadingFlag">
          <thead>
            <tr>
              <th style="width: 100px"></th>
              <th class="width-20">
                <span>{{$t('tradeTable.transactionPair')}}</span>
                <!--<img src="../../assets/images/table/9.png" alt="">-->
              </th>
              <th class="width-20">
                <span>{{$t('tradeTable.latestPrice')}}</span>
                <!--<img src="../../assets/images/table/9.png" alt="">-->
              </th>
              <th class="width-20">
                <span>{{$t('tradeTable.rose')}}</span>
                <!--<img src="../../assets/images/table/9.png" alt="">-->
              </th>
              <th class="width-20">
                <span>{{$t('tradeTable.ceiling')}}</span>
              </th>
              <th class="width-20">
                <span>{{$t('tradeTable.minimum')}}</span>
              </th>
              <th>
                <span>{{$t('tradeTable.amountOf24H')}}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="text-align: center" colspan="7" v-if="tableErrorFlag||searchData.length<=0">
                <span class="text-dark">{{tableErrorFlag?$t('tradeTable.waitting'):$t('tradeTable.noData')}}</span>
              </td>
            </tr>
            <tr v-for="(item, index) in searchData"
                :key="index"
                v-if="searchData.length>0"
                @click="goTrade('/currency-trade',item)"
                class="list-content">

              <td class="td-icon">
                <i class="iconfont" @click.stop="optional"
                   :class="item.tradeOptional?'icon-collection_fill':'icon-collection'"></i>
              </td>
              <td :class="{borderBottom: index < searchData.length - 1}">
                <span class="text-dark">{{item.shortName}}</span><span class="text-light">/{{item.nameMarket}}</span>
              </td>
              <td :class="{borderBottom: index < searchData.length - 1}">
                <span class="text-dark">{{item.latelyDealPrice}}</span>
                <!--<span class="text-light">≈￥{{item.tradeNewB}}</span>-->
              </td>
              <td :class="{borderBottom: index < searchData.length - 1}">
                <span class="text-red" v-if="item.riseFallFlag===2">{{item.marketRose}}%</span>
                <span class="text-green" v-if="item.riseFallFlag===1">+{{item.marketRose}}%</span>
                <span class="triangle-red" v-if="item.riseFallFlag===2"></span>
                <span class="triangle-green" v-if="item.riseFallFlag===1"></span>
                <span class="text-dark" v-if="item.riseFallFlag===0">{{item.marketRose}}%</span>
              </td>
              <td :class="{borderBottom: index < searchData.length - 1}">
                <span class="text-dark">{{item.highestPrice24}}</span>
                <!--<span class="text-light">≈￥{{item.tradeHighB}}</span>-->
              </td>
              <td :class="{borderBottom: index < searchData.length - 1}">
                <span class="text-dark">{{item.lowestPrice24}}</span>
                <!--<span class="text-light">≈￥{{item.tradeLowB}}</span>-->
              </td>
              <td :class="{borderBottom: index < searchData.length - 1}" class="padding-right-60 text-align-right">
                <span class="text-dark">{{item.entrustAmount24}}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import fuzzyQuery from 'common/fuzzyQuery'
  import {mapGetters, mapMutations} from 'vuex'
  import {_apiGetMarkets} from 'api/index'
  import * as types from 'store/mutation-types'
  import {initSocket, reconnect} from 'common/websocket'

  export default {
    name: 'Name',
    data () {
      return {
        currentIndex: 0, // 当前币种序列号
        searchContent: '', // 搜索框内容
        socketMarket: null, // websocket链接
        marketLoadingFlag: true, // 市场数据加载状态
        topic: '', // 市场
        coinType: '', // 币种
        currencyList: [], // 当前币种数组
        lockReconnect: false, // websocket重连状态
        destoryFlag: false, // 组件销毁状态
        tableErrorFlag: false, // webSocket错误状态
        // tt: '', // websocket重连定时器
        listData: []// 当前币种交易列表数据
      }
    },
    created () {
      this._getMarket()
    },
    computed: {
      searchData: function () {
        return fuzzyQuery(this.listData, this.searchContent)
      },
      ...mapGetters([
        'token'
      ])
    },
    // 组件销毁前
    beforeDestroy () {
      this.destoryFlag = true
      this.setTopic(this.topic)
      this.setCoinType(this.coinType)
      this.socketMarket && this.socketMarket.close()
      window.reconnectTimeout && clearTimeout(window.reconnectTimeout)
    },
    methods: {
      // 初始化webSocket
      _initWebSocket () {
        this.socketMarket = initSocket('/websocket/mainPageInfoSocket', this.ws_send, this.ws_message, this.ws_error, this.ws_closed)
      },
      // 获取服务器推送消息执行函数
      ws_message (event) {
        require('@/utils/pako.min')
        let reader = new FileReader()
        reader.readAsArrayBuffer(event.data)
        reader.onload = (evt) => {
          /* eslint-disable */
          const message = pako.ungzip(evt.target.result, {to: 'string'})
          this.listData = JSON.parse(message)
          this.marketLoadingFlag = false
          this.coinType = this.listData[0]
          this.tableErrorFlag = false
        }
      },
      // 错误回调执行函数
      ws_error () {
        // this.marketLoadingFlag = false
        // this.tableErrorFlag = true
      },
      // web socket链接关闭回调
      ws_closed () {
        if (!this.destoryFlag) {
          this.marketLoadingFlag = true
          // this.tableErrorFlag = true
          reconnect(this.lockReconnect, this._initWebSocket)
        }
      },
      // 切换当前市场
      changeCurrentTopic (index, item) {
        this.currentIndex = index
        this.topic = item
        this.ws_send()
        this.marketLoadingFlag = false
      },
      // 交易列表跳转页面
      goTrade (url, item) {
        this.coinType = item
        this.$router.push(url)
      },

      // 清空搜索内容
      clearSearchContent () {
        this.searchContent = ''
      },

      optional () {
        
      },
      // ws发送市场数据
      ws_send () {
        let req = {
          topic: this.topic.code,
          token: this.token
        }
        if (this.socketMarket && this.socketMarket.readyState === 1) {
          this.socketMarket.send(JSON.stringify(req))
        } else {
          console.log('webSocket not connection')
        }
      },
      // 获取市场列表
      _getMarket () {
        _apiGetMarkets().then((res) => {
          if (res.statusCode === 200) {
            this.currencyList = res.data
            this.topic = this.currencyList[0]
            this.listData = this.topic.data
            this._initWebSocket()
            this.marketLoadingFlag = false
          }
        })
      },
      ...mapMutations({
        'setTopic': types.SET_TOPIC,
        'setCoinType': types.SET_COINTYPE
      })
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable.styl"

  $color-fff = #fff
  $color-b95258 = #b95258
  $color-5a9467 = #5a9467

  .width-20
    width 17%
  .td-icon
    padding 0 30px
    text-align center
    i:hover
      color $color-main-font
    .icon-collection
      color $color-table-font-head
    .icon-collection_fill
      color $color-table-font-tips
  .padding-right-60
    padding-right 60px
  .border-left
    border-left 1px solid $color-main-border
  .border-bottom
    border-bottom 1px solid $color-main-border
  .trade-nav
    width 200px
    height 60px
    line-height 59px
    text-align center
    border-top 1px solid $color-main-border
    border-right 1px solid $color-main-border
    cursor pointer
    img,span
      display inline-block
      vertical-align middle
    span
      margin-left 12px
      color $color-main-font
    &:hover
      & span
        color $color-btn
  .currentCoin
    span
      color $color-btn
    &:after
      position absolute
      left 0
      bottom -1px
      z-index 1
      display block
      content ''
      width 100%
      height 1px
      background-color $color-main-bg
  .search-box
    width 180px
    height 40px
    margin-top 10px
    background-color $color-input-bg
    border 1px solid $color-main-border
    border-radius 6px
    input
      display inline-block
      vertical-align middle
      width 100%
      height 100%
      padding-left 10px
      padding-right 10px
      color $color-main-font
      background-color transparent
    .icon-sousuo,.icon-guanbi2fill
      position absolute
      top 0
      right 10px
      z-index 1
      line-height 38px
      color $color-main-border
    .icon-guanbi2fill
      cursor pointer
      &:hover
        color $color-btn
  .table-box
    border 1px solid $color-main-border
    table
      width 100%
      th
        line-height 60px
        text-align left
        &:last-child
          text-align right
          padding-right 10px
        img,span
          display inline-block
          vertical-align middle
        span
          color $color-table-font-tips
        img
          margin-left 12px
          cursor pointer
      td
        &:last-child
          text-align right
          padding-right 10px
  .list-title
    height 60px
    padding-left 30px
    line-height 60px
    color $color-btn
    background-color $color-table-bg-title
    &:before
      position absolute
      left 21px
      top 15px
      z-index 1
      display block
      content ''
      width 4px
      height 28px
      background-color $color-btn
  .list-content
    background-color $color-second-bg
    cursor pointer
    &:hover
      &
        background-color $color-table-bg-content-hover
  .star
    display inline-block
    vertical-align middle
    width 100px
    height 60px
    background-image url("../../assets/images/table/6.png")
    background-repeat no-repeat
    background-size auto
    background-position 50px center
  .text-dark,.text-light,.text-red,.text-green
    display inline-block
    vertical-align middle
    height 60px
    line-height 60px
  .text-dark
    color $color-main-font
  .text-light
    color $color-table-font-head
  .text-red
    color $color-b95258
  .text-green
    color $color-5a9467
  .triangle-red,.triangle-green
    display inline-block
    vertical-align middle
    width 30px
    height 60px
    background-repeat no-repeat
    background-size auto
    background-position center
  .triangle-red
    background-image url("../../assets/images/table/7.png")
  .triangle-green
    background-image url("../../assets/images/table/8.png")
</style>
