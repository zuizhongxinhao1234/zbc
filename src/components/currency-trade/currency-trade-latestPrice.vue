<template>
  <div class="box">
    <div class="mTitle position-relative">
      <span>{{`${$t('currencyTradeLatestPrice.latestPrice')} ${Math.floor(currentDatas.latestDealPrize * 100000000) / 100000000||'---'} ${coinType.nameMarket||''}`}}</span>
      <span class="CNYBox font-small" v-show="marketToCny">{{`≈ ${Math.floor(marketToCny * 100) / 100} CNY`}}</span>
      <div class="more-right">
        <router-link class="router-link" to="/currency-trade-exchange">{{$t('currencyTradeLatestPrice.more')}}</router-link>
      </div>
    </div>
    <div class="content" v-loading="loadingFlag">
      <div class="header">
        <el-row>
          <el-col :span="7" :offset="3" class="text-align-right">
            <span>{{`${$t('currencyTradeLatestPrice.price')}(${coinType.nameMarket||'---'})`}}</span>
          </el-col>
          <el-col :span="6" class="text-align-right">
            <span>{{`${$t('currencyTradeLatestPrice.count')}(${coinType.shortName||'---'})`}}</span>
          </el-col>
          <el-col :span="8" class="text-align-right">
            <span>`{{`${$t('currencyTradeLatestPrice.total')}(${coinType.nameMarket||'---'})`}}`</span>
          </el-col>
        </el-row>
      </div>
      <ul class="sell" v-show="!errorFlag">
        <li :key="index" v-for="(item,index) in currentDatas.sell" @click="setPrice(item.price,item.price)">
          <el-row type="flex">
            <el-col :span="3" class="color-sell">
              <span>{{`${$t('currencyTradeLatestPrice.sell')}${index + 1}`}}</span>
            </el-col>
            <el-col :span="7" class="text-align-right">
              <span>{{Math.floor(item.price * 100000000) / 100000000}}</span>
            </el-col>
            <el-col :span="6" class="text-align-right">
              <span>{{Math.floor(item.notDealNumber * 100000000) / 100000000}}</span>
            </el-col>
            <el-col :span="8" class="text-align-right padding-right-8">
              <span>{{Math.floor(item.price*item.notDealNumber * 100000000) / 100000000}}</span>
            </el-col>
          </el-row>
          <b class="sell-bg" :style="`width: ${item.notDealNumber/sellTotal*100}%`"></b>
        </li>
        <li class="noData" v-if="currentDatas.sell&&currentDatas.sell.length<=0">{{$t('currencyTradeLatestPrice.noData')}}</li>
      </ul>
      <ul class="buy" v-show="!errorFlag">
        <li :key="index" v-for="(item,index) in currentDatas.buy" @click="setPrice(item.price,item.price)">
          <el-row type="flex">
            <el-col :span="3" class="color-buy">
              <span>{{`${$t('currencyTradeLatestPrice.buy')}${index + 1}`}}</span>
            </el-col>
            <el-col :span="7" class="text-align-right">
              <span>{{Math.floor(item.price * 100000000) / 100000000}}</span>
            </el-col>
            <el-col :span="6" class="text-align-right">
              <span>{{Math.floor(item.notDealNumber * 100000000) / 100000000}}</span>
            </el-col>
            <el-col :span="8" class="text-align-right padding-right-8">
              <span>{{Math.floor(item.price*item.notDealNumber * 100000000) / 100000000}}</span>
            </el-col>
          </el-row>
          <b class="buy-bg" :style="`width: ${item.notDealNumber/buyTotal*100}%`"></b>
        </li>
        <li class="noData" v-if="currentDatas.buy&&currentDatas.buy.length<=0">{{$t('currencyTradeLatestPrice.noData')}}</li>
      </ul>
      <div v-if="errorFlag" class="error">
        {{$t('currencyTradeLatestPrice.waitting')}}
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'coinType',
      'marketCoinToCny'
    ]),
    marketToCny () {
      return this.currentDatas.latestDealPrize * this.marketCoinToCny
    },
    buyTotal () {
      let total = 0
      for (let i = 0; i < this.currentDatas.buy.length; i++) {
        total = total + this.currentDatas.buy[i].notDealNumber
      }
      return total
    },
    sellTotal () {
      let total = 0
      for (let i = 0; i < this.currentDatas.sell.length; i++) {
        total = total + this.currentDatas.sell[i].notDealNumber
      }
      return total
    }
  },
  props: {
    currentDatas: {
      type: Object,
      default: function () {
        return {}
      }
    },
    loadingFlag: {
      type: Boolean,
      default: false
    },
    errorFlag: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    setPrice (buy, sell) {
      this.$emit('priceChange', buy, sell)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~assets/stylus/variable.styl';
.error
    height 404px
    line-height 404px
    width 100%
    text-align center
.box
  background-color: $color-second-bg

  .mTitle
    padding: 0 26px;
    height: 43px;
    line-height: 44px;

    .more-right
      position: absolute;
      right: 18px;
      top: 0;
      height: 100%;


    .CNYBox
      color: $color-main-border;

  .content
    background-color: $color-main-fill-bg;
    padding: 9px;
    font-size 12px
    height 451px
    .header
      color: $color-table-font-head;
      padding: 0 10px;


    .sell
      border-bottom: 2px solid $color-table-border-in;
      padding-bottom 10px


    .buy, .sell
      font-size: 12px;
      padding: 0 10px;
      height: 208.5px;
      overflow auto
      li
        position: relative;
        height: 20px;
        line-height: 20px;
        margin: 5px 0;
        cursor: pointer;
        transition: background-color 0.5s;

        &:hover
          background-color: $color-table-bg-content-hover;


        .color-sell, .color-buy
          padding-left: 8px;


        .buy-bg
          opacity: 0.1;
          position: absolute;
          right: 0;
          top: 0;
          height: 100%;
          max-width: 100%;
          background-color: $color-buy;


        .sell-bg
          opacity: 0.1;
          position: absolute;
          right: 0;
          top: 0;
          height: 100%;
          max-width: 100%;
          background-color: $color-sell;



      .noData
        text-align: center;
        height 208.5px
        line-height: 208.5px


.padding-right-8
  padding-right: 8px;

</style>
