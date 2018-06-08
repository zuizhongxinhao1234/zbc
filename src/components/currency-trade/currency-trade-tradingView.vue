<template>
  <div class="page tradingView">
    <div class="mTitle position-relative">
      <div class="text" @click="showOrHide">
        <i :class="showContentFlag?'el-icon-arrow-down':'el-icon-arrow-right'"></i>
        <span v-show="coinType">
          <span class="font-big font-weight">{{coinType.shortName}}/{{coinType.nameMarket}}</span>&nbsp;
          <span class="font-big font-weight">{{Math.floor(coinType.latelyDealPrice * 100000000) / 100000000}}</span>
          <span v-show="marketToCny">{{`≈ ${Math.floor(marketToCny * 100) / 100} CNY`}}</span>&nbsp;&nbsp;
          <span>{{$t('currencyTradeTradingView.upAndDown')}}</span>&nbsp;<span :class="{'riseFall_1':coinType.riseFallFlag===1,'riseFall_2':coinType.riseFallFlag===2}">{{coinType.riseFallFlag===1?'+':''}}{{`${coinType.marketRose}%`}}</span>&nbsp;&nbsp;
          <span>{{$t('currencyTradeTradingView.high')}}</span>&nbsp;<span>{{coinType.highestPrice24}}</span>&nbsp;&nbsp;
          <span>{{$t('currencyTradeTradingView.low')}}</span>&nbsp;<span>{{coinType.lowestPrice24}}</span>&nbsp;&nbsp;
          <span>{{$t('currencyTradeTradingView.oneDay')}}</span>&nbsp;<span>{{coinType.entrustAmount24}}&nbsp;{{coinType.shortName}}</span>
        </span>
      </div>
    </div>
    <!-- <iframe id="myframe"
    src="static/tradingView/index.html"
    frameborder="0"></iframe> -->
    <el-collapse-transition>
      <div id="content" v-show="showContentFlag">
        <div id="loadingDiv" v-loading="laodingFlag"></div>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script type="text/ecmascript-6">
import $ from 'jquery'
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      laodingFlag: true,
      showContentFlag: true
    }
  },
  computed: {
    ...mapGetters([
      'coinType',
      'marketCoinToCny'
    ]),
    marketToCny () {
      return this.coinType.latelyDealPrice * this.marketCoinToCny
    }
  },
  mounted () {
    this.createIframe()
  },
  methods: {
    createIframe () {
      var iframe = document.createElement('iframe')

      // if (iframe.attachEvent) {
      //   iframe.attachEvent('onload', function () {
      //   })
      // } else {
      //   iframe.onload = function () {
      //   }
      // }

      document.getElementById('content').appendChild(iframe)
      $('#content').find('iframe').attr({
        src: 'static/tradingView/index.html',
        frameborder: '0',
        id: 'myframe'
      })
    },
    showOrHide () {
      this.showContentFlag = !this.showContentFlag
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~assets/stylus/variable.styl"
.tradingView
  .font-big
    font-size 20px
  #content
    position relative
  #content>iframe
    width 100%
    background-color $color-main-fill-bg
    height 600px
  #content>#loadingDiv
    width 100%
    background-color $color-main-fill-bg
    height 600px
    display block
    position absolute
    left 0
    top 0
  .mTitle
    padding 0 10px
    height 43px
    line-height 44px
    .text
      cursor pointer
      display inline-block
</style>
