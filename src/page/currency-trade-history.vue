<template>
  <div>
    <!-- header -->
    <my-header></my-header>

    <div class="container">
      <!-- 面包屑 -->
      <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/currency-trade' }" class="font-big">{{$t('currencyTradeHistory.currencyTrade')}}</el-breadcrumb-item>
        <el-breadcrumb-item class="font-big">{{$t('currencyTradeHistory.currencyTradeHistory')}}</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="form-box">
        <!-- 条件搜索 -->
        <div class="searchBox">
          <el-select clearable v-model="virtualname" filterable :placeholder="$t('currencyTradeHistory.placeholder')" size="small">
            <el-option
              v-for="item in virtualShowALLList"
              :key="item.code"
              :label="item.shortName"
              :value="item.code">
            </el-option>
          </el-select>
          <!-- <span class="search-line">/</span>
          <el-select v-model="currentMarket" class="search-select" size="small">
            <el-option
              v-for="(item, index) in marketList"
              :key="index"
              :label="item.label"
              :value="item.value">{{item.label}}</el-option>
          </el-select> -->
          <el-button class="search-button" type="primary" size="small" @click="searchData">{{$t('currencyTradeHistory.search')}}</el-button>
        </div>

        <!-- 列表 -->
        <el-tabs v-model="activeName" @tab-click="handleClick" type="">

          <!-- 委托历史 -->
          <el-tab-pane :label="$t('currencyTradeHistory.history')" name="HE">
            <el-collapse-transition>
              <div class="content" v-loading="HE_loadingFlag">
                <el-table
                  class="table"
                  :data="HE_resultDatas.data">
                  <el-table-column
                    prop="createTime"
                    :label="$t('currencyTradeHistory.time')">
                  </el-table-column>
                  <el-table-column
                    prop="coinAndMarket"
                    :label="$t('currencyTradeHistory.part')">
                  </el-table-column>
                  <el-table-column
                    prop="fentrustType"
                    :label="$t('currencyTradeHistory.type')">
                  </el-table-column>
                  <el-table-column
                    prop="status"
                    :label="$t('currencyTradeHistory.status')">
                  </el-table-column>
                  <el-table-column
                    prop="price"
                    :label="$t('currencyTradeHistory.price')">
                  </el-table-column>
                  <el-table-column
                    prop="amount"
                    :label="$t('currencyTradeHistory.count')">
                  </el-table-column>
                  <el-table-column
                    prop="yesAmount"
                    :label="$t('currencyTradeHistory.success')">
                  </el-table-column>
                  <el-table-column
                    prop="noAmount"
                    :label="$t('currencyTradeHistory.fail')">
                  </el-table-column>
                </el-table>

                <div class="pagination-box">
                  <el-pagination
                    layout="prev, pager, next"
                    :page-size="HE_pageSize"
                    :current-page="HE_pageIndex"
                    :total="HE_resultDatas.totalSize"
                    v-show="HE_resultDatas.totalSize>0"
                    @current-change="currentChange">
                  </el-pagination>
                </div>
              </div>
            </el-collapse-transition>
          </el-tab-pane>

          <!-- 成交明细 -->
          <el-tab-pane :label="$t('currencyTradeHistory.details')" name="HT">
            <el-collapse-transition>
              <div class="content" v-loading="HT_loadingFlag">
                <el-table
                  class="table"
                  :data="HT_resultDatas.data">
                  <el-table-column
                    prop="lastUpdatTime"
                    :label="$t('currencyTradeHistory.time')">
                  </el-table-column>
                  <el-table-column
                    prop="coinAndMarket"
                    :label="$t('currencyTradeHistory.part')">
                  </el-table-column>
                  <el-table-column
                    prop="fentrustType"
                    :label="$t('currencyTradeHistory.type')">
                  </el-table-column>
                  <el-table-column
                    prop="price"
                    :label="$t('currencyTradeHistory.price')">
                  </el-table-column>
                  <el-table-column
                    prop="yesAmount"
                    :label="$t('currencyTradeHistory.successCount')">
                  </el-table-column>
                  <el-table-column
                    prop="yesPrice"
                    :label="$t('currencyTradeHistory.successTotal')">
                  </el-table-column>
                  <el-table-column
                    prop="status"
                    :label="$t('currencyTradeHistory.successStatus')">
                  </el-table-column>
                </el-table>

                <div class="pagination-box">
                  <el-pagination
                    layout="prev, pager, next"
                    :page-size="HT_pageSize"
                    :current-page="HT_pageIndex"
                    :total="HT_resultDatas.totalSize"
                    v-show="HT_resultDatas.totalSize>0"
                    @current-change="currentChange">
                  </el-pagination>
                </div>
              </div>
            </el-collapse-transition>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <!-- footer -->
    <my-footer></my-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from 'components/common/Header'
  import Footer from 'components/common/Footer'
  import {_apiGetHistoryEntrustList, _apiGetVirtualShowALL, _apiGetHistoryTradeList} from 'api'

  export default {
    name: 'Name',
    components: {
      'my-header': Header,
      'my-footer': Footer
    },
    data () {
      return {
        virtualShowALLList: [], // 所有币种列表
        activeName: 'HE', // HE:委托历史;HT:交易历史
        currentMarket: '',
        virtualname: '', // 搜索条件 币种
        // 委托历史记录
        HE_pageIndex: 1, // 当前页码
        HE_pageSize: 10, // 每页显示条数
        HE_resultDatas: [], // 返回值
        HE_loadingFlag: false, // loading 状态
        // 交易历史记录
        HT_pageIndex: 1, // 当前页码
        HT_pageSize: 10, // 每页显示条数
        HT_resultDatas: [], // 返回值
        HT_loadingFlag: false, // loading 状态
        marketList: []
      }
    },
    created () {
      this.apiGetVirtualShowALL()
      this.HE_apiGetDatas()
    },
    methods: {
      // 切换记录类型(HE:委托历史记录;HT:交易历史记录)
      handleClick (tab, event) {
        this[`${this.activeName}_pageIndex`] = 1
        this[`${tab.name}_apiGetDatas`]()
      },
      // 搜索
      searchData () {
        this[`${this.activeName}_apiGetDatas`]()
      },
      // 切换页码
      currentChange (pageIndex) {
        this[`${this.activeName}_pageIndex`] = pageIndex
        this[`${this.activeName}_apiGetDatas`]()
      },
      // 获取委托历史记录方法
      HE_apiGetDatas () {
        this.HE_loadingFlag = true
        _apiGetHistoryEntrustList({
          virtualname: this.virtualname,
          pageIndex: this.HE_pageIndex,
          pageSize: this.HE_pageSize
        }).then((res) => {
          if (res.statusCode === 200) {
            this.HE_resultDatas = res.result
          }
          this.HE_loadingFlag = false
        }).catch(() => {
          this.HE_loadingFlag = false
        })
      },
      // 获取交易历史记录方法
      HT_apiGetDatas () {
        this.HT_loadingFlag = true
        _apiGetHistoryTradeList({
          virtualname: this.virtualname,
          pageIndex: this.HT_pageIndex,
          pageSize: this.HT_pageSize
        }).then((res) => {
          if (res.statusCode === 200) {
            this.HT_resultDatas = res.result
          }
          this.HT_loadingFlag = false
        }).catch(() => {
          this.HT_loadingFlag = false
        })
      },
      // 获取所有币种列表
      apiGetVirtualShowALL () {
        _apiGetVirtualShowALL().then((res) => {
          if (res.statusCode === 200) {
            this.virtualShowALLList = [...[{
              code: '',
              shortName: this.$t('currencyTradeHistory.all')
            }], ...res.data]
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable.styl"

  .container
    width: 1200px;
    min-height 600px
    margin: 0 auto 20px;
    padding-top: 20px;
  //重置面包屑的样式
  .breadcrumb
    margin-bottom 20px
    line-height 54px
    padding 0 30px
    background-color $color-main-fill-bg
    border-radius 3px
  /deep/ .el-breadcrumb__inner.is-link
    font-weight initial
    color $color-btn
    &:hover
      color $color-btn-hover
  .form-box
    position relative
    background-color $color-main-fill-bg
  .searchBox
    position absolute
    top 0
    right 30px
    z-index 1
    line-height 48px
  .search-input, .search-select
    width 100px
    vertical-align middle
  .search-button
    margin-left 10px
    vertical-align middle
  .search-line
    margin 0 5px
    color $color-main-border
    vertical-align middle
  /deep/ .el-tabs__header
    height 48px
    line-height 48px
    padding 0 30px
    box-shadow 0 3px 3px #11141f
  /deep/ .el-tabs__content
    padding 0 30px
  /deep/ .el-tabs__active-bar
    background-color transparent
  .box
    background-color $color-second-bg
    .title
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
      padding-left 9px
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
  .pagination-box
    text-align right
    padding 10px 0
</style>
