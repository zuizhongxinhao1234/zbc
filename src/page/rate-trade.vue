<template>
  <div>
    <div class="table-box">
      <div class="table-title">
        {{$t('rateTrade.rateTrade')}}
      </div>
      <div class="tablDiv">
        <el-table
          v-loading="loadingFlag"
          class="table"
          :data="result">
          <el-table-column
            prop="shortName"
            width="100"
            :label="$t('rateTrade.coin')">
          </el-table-column>
          <el-table-column
            prop="name"
            :label="$t('rateTrade.name')">
          </el-table-column>
          <el-table-column
            prop="tradefee"
            :label="$t('rateTrade.tradeFee')">
          </el-table-column>
          <el-table-column
            prop="withdrawfee"
            :label="$t('rateTrade.withdrawFee')">
          </el-table-column>
          <el-table-column
            prop="leastWithdraw"
            :label="$t('rateTrade.leastWithdraw')">
          </el-table-column>
          <el-table-column
            prop="minwithdrawfee"
            :label="$t('rateTrade.minWithdrawFee')">
          </el-table-column>
          <el-table-column
            prop="donate"
            :label="$t('rateTrade.donate')">
          </el-table-column>
        </el-table>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import {_apiVirtualRateInfo} from 'api'

  export default {
    name: 'Name',
    data () {
      return {
        loadingFlag: false,
        result: []
      }
    },
    async created () {
      this.loadingFlag = true
      try {
        let res = await _apiVirtualRateInfo()
        if (res.statusCode === 200) {
          this.result = res.data
        }
        this.loadingFlag = false
      } catch (error) {
        this.loadingFlag = false
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable.styl"

.table-box
  min-height 400px
  padding-bottom 20px
  background-color $color-main-fill-bg
  .table-title
    padding 0 26px
    line-height 42px
    color $color-main-font
    background-color $color-second-fill-bg
    font-size 16px
  .table
    width 100%
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
    padding-right 10px
  .table /deep/ th.is-leaf:first-child, .table /deep/ td:first-child
    text-align left
    padding-left 10px
  .tablDiv
    padding 0 16px
</style>
