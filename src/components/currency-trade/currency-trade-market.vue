<template>
  <div class="market-box">
    <not-logged-in v-if="!loginStatus"></not-logged-in>
    <!-- 净资产折合 -->
    <!-- <div v-if="loginStatus" class="assets position-relative">
      <span>净资产折合:</span>
      <div class="assets-icon">
        <i class="el-icon-view" :class="{'assets-icon-active':!showAssetsFlag}" @click="showAssets"></i>
      </div>
      <div class="assets-body">
        <span>0.00000000 BTC</span>
        <span class="assets-body-CNY"> = 0.00 CNY</span>
      </div>
    </div> -->

    <!-- 市场 -->
    <el-row class="mTitle" align="middle">
      <el-col :span="6">
        <div class="title-text">{{$t('currencyTradeMarket.market')}}</div>
      </el-col>
      <el-col :span="5" :offset="9">
        <el-input
          class="search-input"
          suffix-icon="el-icon-search"
          v-model="searchVal"
          size="mini"
          clearable>
        </el-input>
      </el-col>
      <el-col :span="4" class="text-align-center">
        <span class="CNY-change" :class="CNY_Flag?'active':''" @click="CNY_active">
          <i class="el-icon-sort"></i>
          <span>CNY</span>
        </span>
      </el-col>
    </el-row>
    <el-row class="tabs">
      <el-col :span="24">
        <el-tabs v-model="currentTopic" @tab-click="tabClick" style="
    padding-left:28px" v-loading="topicLoadingFlag">
          <el-tab-pane :name="item.code" :key="item.code" :item="item" v-for="item in marketList">
            <span slot="label">{{item.name}}</span>
          </el-tab-pane>
          <!--<el-tab-pane name="fourth">-->
            <!--<span slot="label"><i class="iconfont icon-collection_fill"></i>自选</span>-->
          <!--</el-tab-pane>-->
        </el-tabs>
        <div class="table-box">
          <el-row class="table-title">
            <el-col :span="8">{{$t('currencyTradeMarket.coinName')}}
              <span class="position-relative">
                <span :class="{'icon-active':sortKey==='name'&&sortType}" class="span-el-icon-caret-top"
                @click.stop="sortClick('name',true)">
                  <i class="el-icon-caret-top"></i>
                </span>
                <span :class="{'icon-active':sortKey==='name'&&!sortType}" class="span-el-icon-caret-bottom"
                @click.stop="sortClick('name',false)">
                  <i class="el-icon-caret-bottom"></i>
                </span>
              </span>
            </el-col>
            <el-col :span="8">{{$t('currencyTradeMarket.latestPrice')}}<span v-show="CNY_Flag">(CNY)</span>
              <span class="position-relative">
                <span class="span-el-icon-caret-top"
                 :class="{'icon-active':sortKey==='latelyDealPrice'&&sortType}"
                @click.stop="sortClick('latelyDealPrice',true)">
                  <i class="el-icon-caret-top"></i>
                </span>
                <span class="span-el-icon-caret-bottom"
                 :class="{'icon-active':sortKey==='latelyDealPrice'&&!sortType}"
                @click.stop="sortClick('latelyDealPrice',false)">
                  <i class="el-icon-caret-bottom"></i>
                </span>
              </span>
            </el-col>
            <el-col :span="8">{{$t('currencyTradeMarket.upAndDown')}}
              <span class="position-relative">
                <span class="span-el-icon-caret-top"
                :class="{'icon-active':sortKey==='marketRose'&&sortType}"
                @click.stop="sortClick('marketRose',true)">
                  <i class="el-icon-caret-top"></i>
                </span>
                <span class="span-el-icon-caret-bottom"
                :class="{'icon-active':sortKey==='marketRose'&&!sortType}"
                @click.stop="sortClick('marketRose',false)">
                  <i class="el-icon-caret-bottom"></i>
                </span>
              </span>
            </el-col>
          </el-row>
          <ul v-loading="marketLoadingFlag">
            <li class="table-error" v-show="tableErrorFlag||searchData.length===0">
              {{tableErrorFlag?$t('currencyTradeMarket.waitting'):$t('currencyTradeMarket.noData')}}
            </li>
            <li class="teble-row" :class="{'table-row-active':coinIndex===index}"
              v-for="(item,index) in searchData" :key="index"
              @click="handleCurrentChange(item,index)">
              <el-row>
                <el-col :span="8">
                  <i class="icon el-icon-star-off" @click.stop="selfSelection"></i>
                  {{item.shortName}}
                  </el-col>
                <el-col :span="8">
                  <span v-show="!CNY_Flag">{{Math.floor(item.latelyDealPrice * 100000000) / 100000000}}</span>
                  <span v-show="CNY_Flag">{{Math.floor(item.latelyDealPrice * marketCoinToCny * 100) / 100}}</span>
                </el-col>
                <el-col :span="8">
                  <span :class="{'riseFall_1':item.riseFallFlag===1,'riseFall_2':item.riseFallFlag===2}">
                      {{item.riseFallFlag===1?'+':''}}{{item.marketRose }}%
                    </span></el-col>
              </el-row>
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapMutations} from 'vuex'
  import fuzzyQuery from 'common/fuzzyQuery'
  import NotLoggedIn from 'components/common/Not-logged-in'
  import {_apiGetMarkets} from 'api/index'
  import * as types from 'store/mutation-types'
  import {isEmpty} from 'common/validate'
  import {initSocket, reconnect} from 'common/websocket'

  export default {
    data () {
      return {
        searchVal: '', // 搜索框
        marketList: [], // 市场列表
        CNY_Flag: false, // CNY是否选中
        showAssetsFlag: true, // 资产数额是否显示
        topicLoadingFlag: true, // 市场列表loading
        marketLoadingFlag: true, // 市场币loading
        marketChangeFlag: false, // 市场选项卡是否切换
        coinIndex: 0, // 当前选中行
        tableErrorFlag: false, // webSocket错误状态
        socketMarket: null,
        currentTopic: '',
        lockReconnect: false, // websocket重连状态
        destoryFlag: false, // 组件销毁状态
        sortKey: '', // 排序字段
        sortType: true, // 排序类型
        listData: [] // 币列表
      }
    },
    mounted () {
      this._getMarket()
    },
    computed: {
      searchData: function () {
        if (this.sortKey) {
          return this.sortByListData(fuzzyQuery(this.listData, this.searchVal))
        }
        return fuzzyQuery(this.listData, this.searchVal)
      },
      ...mapGetters([
        'loginStatus',
        'token',
        'topic',
        'coinType',
        'marketCoinToCny'
      ])
    },
    // 组件销毁前
    beforeDestroy () {
      this.destoryFlag = true
      this.socketMarket && this.socketMarket.close()
      window.reconnectTimeout && clearTimeout(window.reconnectTimeout)
    },
    methods: {
      // 排序click事件
      sortClick (key, type) {
        this.sortKey = key
        this.sortType = type
      },
      // 排序方法
      sortByListData (listData) {
        let key = this.sortKey
        let type = this.sortType
        if (key === 'marketRose') {
          return listData.sort((a, b) => {
            if (a.riseFallFlag === b.riseFallFlag) {
              return type ? a[key] - b[key] : b[key] - a[key]
            } else {
              return !type ? a.riseFallFlag - b.riseFallFlag : b.riseFallFlag - a.riseFallFlag
            }
          })
        }
        return listData.sort((a, b) => {
          return type ? a[key] - b[key] : b[key] - a[key]
        })
      },
      // 选项卡切换市场
      tabClick (tab, event) {
        this.coinIndex = 0
        this.setTopic(tab.$attrs.item)
        this.marketLoadingFlag = true
        this.marketChangeFlag = true
        this.ws_send()
      },
      // CNY点击事件
      CNY_active () {
        this.CNY_Flag = !this.CNY_Flag
      },
      // 自选图标点击事件
      selfSelection () {

      },
      // 选择表格中某一行切换币种
      handleCurrentChange (val, index) {
        this.coinIndex = index
        !isEmpty(val) && this.setCoinType(val)
        !isEmpty(val) && this.$emit('coinTypeChange', val)
        document.getElementById('myframe').contentWindow.location.reload(true)
      },
      // 是否显示资产方法
      showAssets () {
        this.showAssetsFlag = !this.showAssetsFlag
      },
      // web socket链接接收数据回调
      ws_message (event) {
        require('@/utils/pako.min')
        let reader = new FileReader()
        reader.readAsArrayBuffer(event.data)
        reader.onload = (evt) => {
          /* eslint-disable */
          const message = pako.ungzip(evt.target.result, {to: 'string'})
          this.listData = JSON.parse(message)
          if (this.marketChangeFlag) {
            this.$emit('coinTypeChange', this.coinType)
          }
          this.marketLoadingFlag = false
          this.marketChangeFlag = false
          this.setCoinType(this.listData[this.coinIndex])
        }
      },
      // web socket链接错误回调
      ws_error () {
        // this.marketLoadingFlag = false
        // this.tableErrorFlag = true
      },
      // web socket链接关闭回调
      ws_closed () {
        if (!this.destoryFlag) {
          reconnect(this.lockReconnect, this._initWebSocket)
          // this.marketLoadingFlag = true
          // this.tableErrorFlag = true
        }
      },
      // web socket链接初始化
      _initWebSocket () {
        this.socketMarket = initSocket('/websocket/mainPageInfoSocket', this.ws_send, this.ws_message, this.ws_error, this.ws_closed)
      },
      // ws发送市场数据
      ws_send () {
        let req = {
          topic: this.currentTopic,
          token: this.token
        }
        if (this.socketMarket && this.socketMarket.readyState === 1) {
          this.socketMarket.send(JSON.stringify(req))
          this.tableErrorFlag = false
        } else {
          console.log('webSocket mainPageInfoSocket not connection')
        }
      },
      // 获取市场列表
      _getMarket () {
        _apiGetMarkets().then((res) => {
          if (res.statusCode === 200) {
            this._initWebSocket()
            this.marketList = res.data
            !this.topic && this.setTopic(this.marketList[0])
            this.currentTopic = this.topic.code
            this.listData = this.topic.data
            this.currntCoinInde()
            this.marketLoadingFlag = false
            this.setCoinType(this.listData[this.coinIndex])
            this.$emit('coinTypeChange', this.coinType)
          }
          this.topicLoadingFlag = false
        }).catch(()=>{
          this.topicLoadingFlag = false
        })
      },
      currntCoinInde () {
        this.listData.forEach((n,i) => {
          if(n.code===this.coinType.code){
            this.coinIndex = i
          }
        })
      },
      ...mapMutations({
        'setTopic': types.SET_TOPIC,
        'setCoinType': types.SET_COINTYPE
      })
    },
    components: {
      NotLoggedIn
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable.styl"
  .market-box
    background-color $color-second-bg
  /deep/ .is-active
    color $color-button-bg-solid
  .table-box
    padding-left 18px
    background $color-main-fill-bg
    height 507px
    font-size 12px
    .table-error
      height 507px
      line-height 507px
      width 100%
      text-align center
    .teble-row
      height 34px
      line-height 34px
      text-align left
      border-bottom 1px solid $color-table-border-in
      &:hover
        background $color-table-bg-content-hover
    .table-row-active
      background $color-table-bg-content-hover
    .table-title
      height 45px
      line-height 45px
      text-align left
      border-bottom 1px solid $color-table-border-in
      color $color-table-font-head

  .icon
    transition color .5s
    cursor pointer
  .el-icon-star-on
    color $color-button-bg-solid
  .mTitle
    color $color-main-font
    padding-left 28px
    padding-top 10px
    padding-right 5px
    .CNY-change
      color $color-table-font-head
      display inline-block
      height 28px
      line-height 28px
      cursor pointer
      font-weight: bolder
    .active
      color $color-button-bg-solid
    .title-text
      height 28px
      line-height 28px
      text-align left
      font-size 16px
      font-weight bolder
    .search-input /deep/ .el-input__inner
      color $color-main-font
      background-color transparent
  .assets
    padding 20px 10px 20px 28px
    .assets-icon
      position absolute
      right 10px
      top 20px
      height 100%
      cursor pointer
    .assets-icon-active
      color $color-table-font-head
    .assets-body
      font-size 12px
      padding-top 20px
      .assets-body-CNY
        color $color-table-font-head
  .span-el-icon-caret-top
    position absolute
    top -1px
    font-size 14px
    cursor pointer
    height 9px
    line-height 1
  .span-el-icon-caret-bottom
    position absolute
    bottom -1px
    font-size 14px
    cursor pointer
    height 9px
    line-height 1
    width 14px
    .el-icon-caret-bottom
      position absolute
      top -5px
  .icon-active
    color $color-table-font-tips

</style>
