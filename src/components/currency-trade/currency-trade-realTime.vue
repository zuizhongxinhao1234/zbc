<template>
  <div class="box">
    <div class="mTitle position-relative">
      <div class="text" @click="showOrHide">
        <i :class="showContentFlag?'el-icon-arrow-down':'el-icon-arrow-right'"></i>
        <span>{{$t('currencyTradeRealTime.tradeRealTime')}}</span>
      </div>
    </div>
    <el-collapse-transition>
      <div class="content" v-show="showContentFlag" v-loading="loadingFlag">
        <div>
          <el-row class="header">
            <el-col :span="7">{{$t('currencyTradeRealTime.time')}}</el-col>
            <el-col :span="2" class="text-align-right">{{$t('currencyTradeRealTime.way')}}</el-col>
            <el-col :span="7" class="text-align-right">{{`${$t('currencyTradeRealTime.price')}(${coinType.nameMarket||'---'})`}}</el-col>
            <el-col :span="7" class="text-align-right">{{`${$t('currencyTradeRealTime.count')}(${coinType.shortName||'---'})`}}</el-col>
          </el-row>
        </div>
        <ul class="body">
          <li v-if="currentDatas.entrust&&currentDatas.entrust.length>0" :key="index" v-for="(item,index) in currentDatas.entrust">
            <el-row>
              <el-col :span="7">{{item.createTime | formatDate}}</el-col>
              <el-col
                :span="2"
                class="text-align-right"
                :class="{'color-buy':item.entrustType===1,'color-sell':item.entrustType===2}">
                {{item.tradeType}}
              </el-col>
              <el-col :span="7" class="text-align-right">{{Math.floor(item.prize * 100000000) / 100000000}}</el-col>
              <el-col :span="7" class="text-align-right">{{Math.floor(item.amount * 100000000) / 100000000}}</el-col>
            </el-row>
          </li>
          <li v-if="currentDatas.entrust&&currentDatas.entrust.length<=0">
            <el-row>
              <el-col :span="24" class="error">{{$t('currencyTradeRealTime.noData')}}</el-col>
            </el-row>
          </li>
          <li v-if="errorFlag" class="error">
            {{$t('currencyTradeRealTime.waitting')}}
          </li>
        </ul>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import {formatDate} from 'common/filter'
  export default {
    data () {
      return {
        showContentFlag: true
      }
    },
    filters: {
      formatDate (time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      }
    },
    computed: {
      ...mapGetters([
        'coinType'
      ])
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
      showOrHide () {
        this.showContentFlag = !this.showContentFlag
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable.styl"
  .box
    background-color $color-second-bg
    .error
      // height 375px
      line-height 375px
      width 100%
      text-align center
    .mTitle
      padding 0 10px
      height 43px
      line-height 44px
      .text
        cursor pointer
        display inline-block
    .content
      background-color $color-main-fill-bg
      padding-left 10px
      height 429px
      font-size 12px
      overflow auto
      .header
        color $color-table-font-head
        height 40px
        line-height 40px
        padding-left 18px
      .body
        li
          padding 5px 0
          padding-left 18px
          &:hover
            background-color $color-table-bg-content-hover

</style>
