<template>
  <div class="box">
    <div class="mTitle position-relative">
      <div class="text" @click="showOrHide">
        <i :class="showContentFlag?'el-icon-arrow-down':'el-icon-arrow-right'"></i>
        <span>{{$t('currencyTradeHistoryPrincipal.enturstHistory')}}</span>
      </div>
      <div class="tabs">
        <el-tabs v-model="activeName">
          <el-tab-pane :label="$t('currencyTradeHistoryPrincipal.buy')" name="buy"></el-tab-pane>
          <el-tab-pane :label="$t('currencyTradeHistoryPrincipal.sell')" name="sell"></el-tab-pane>
          <el-tab-pane :label="$t('currencyTradeHistoryPrincipal.all')" name="all"></el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <el-collapse-transition>
      <div class="content" v-show="showContentFlag"
          v-loading="loadingFlag">
        <el-table
          v-show="!errorFlag"
          class="table"
          :data="filterList"
          height="300"
          style="width: 100%">
          <el-table-column
            :label="$t('currencyTradeHistoryPrincipal.time')"
            width="160">
            <template slot-scope="scope">
              <span>{{ scope.row.lastUpdatTime | formatDate}}</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('currencyTradeHistoryPrincipal.part')">
            <template slot-scope="scope">
              <span>{{`${coinType.shortName}/${coinType.nameMarket}`}}</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('currencyTradeHistoryPrincipal.way')">
            <template slot-scope="scope">
              <span :class="{'color-buy':scope.row.fentrustType===1,'color-sell':scope.row.fentrustType===2}">{{ scope.row.tradeType }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="price"
            :label="`${$t('currencyTradeHistoryPrincipal.price')}(${coinType.nameMarket||'---'})`">
          </el-table-column>
          <el-table-column
            prop="amount"
            :label="$t('currencyTradeHistoryPrincipal.count')">
          </el-table-column>
          <el-table-column
            prop="yesAmount"
            :label="`${$t('currencyTradeHistoryPrincipal.success')}(${coinType.shortName||'---'})`">
          </el-table-column>
          <el-table-column
            prop="noAmount"
            :label="$t('currencyTradeHistoryPrincipal.fail')">
          </el-table-column>
          <el-table-column
            prop="status"
            :label="$t('currencyTradeHistoryPrincipal.status')">
          </el-table-column>
          <!-- <el-table-column
            prop="address"
            label="操作">
            <template slot-scope="scope">
              <el-button @click="tableClick(scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column> -->
        </el-table>
        <div v-if="errorFlag" class="error">{{$t('currencyTradeHistoryPrincipal.waitting')}}</div>
        <div class="footer">
          <router-link to="/currency-trade-history" class="router-link">{{$t('currencyTradeHistoryPrincipal.allHistory')}}</router-link>
        </div>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import {formatDate, formatAttribute} from 'common/filter'
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        activeName: 'all',
        showContentFlag: true
      }
    },
    filters: {
      formatDate (time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      }
    },
    props: {
      historyData: {
        type: Array,
        default: function () {
          return []
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
    computed: {
      ...mapGetters([
        'coinType'
      ]),
      filterList: function () {
        let index = 0
        if (this.activeName === 'buy') {
          index = 1
        }
        if (this.activeName === 'sell') {
          index = 2
        }
        return formatAttribute(this.historyData, index, 'fentrustType')
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
      height 300px
      line-height 300px
      width 100%
      text-align center
    .mTitle
      padding 0 10px
      height 43px
      line-height 44px
      .text
        cursor pointer
        display inline-block
      .tabs
        position absolute
        right 18px
        top 0
        height 100%
    .content
      background-color $color-main-fill-bg
      .footer
        text-align right
        padding 5px
        padding-right 21px
        font-size 12px
  .table
    text-align left
    background-color $color-main-fill-bg
    font-size 12px
  .table /deep/ thead
    color $color-table-font-head
  .table /deep/ .sort-caret.ascending
    border-bottom-color $color-table-font-tips
  .table /deep/ .sort-caret.descending
    border-top-color $color-table-font-tips
  .table /deep/ .descending .sort-caret.descending
    border-top-color $color-table-font-head
  .table /deep/ .ascending .sort-caret.ascending
    border-bottom-color $color-table-font-head
  .table /deep/ tr, .table /deep/ tr th
    background-color $color-main-fill-bg
  .table /deep/ .el-table__empty-block
    background-color $color-main-fill-bg
  .table /deep/ .el-table__body tr.current-row > td
    background-color #1e2235
  .table /deep/ th.is-leaf, .table /deep/ td
    border-bottom 1px solid $color-table-border-in
    padding 5px 0
    text-align right
    padding-right 18px
  .table /deep/ th.is-leaf:first-child, .table /deep/ td:first-child
    text-align left
    padding-left 30px
    padding-right 0
</style>
