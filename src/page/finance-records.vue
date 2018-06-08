<template>
  <div>
    <!-- header -->
    <my-header></my-header>

    <!-- container -->
    <div class="container">
      <!-- 面包屑 -->
      <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/property/trade-account' }" class="font-big">{{$t('financeRecords.tradeAccount')}}</el-breadcrumb-item>
        <el-breadcrumb-item class="font-big">{{$t('financeRecords.financeRecords')}}</el-breadcrumb-item>
      </el-breadcrumb>

       <div class="form-box">
        <!-- 条件查询 -->
        <div class="searchBox">
          <el-dropdown @command="handleCommand" trigger="click">
            <span class="el-dropdown-link">
              {{virtualname === '' ? $t('financeRecords.all') : virtualname.name}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="">{{$t('financeRecords.all')}}</el-dropdown-item>
              <el-dropdown-item :key="item.id" v-for="item in virtualShowALLList" :command="item">{{item.name}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

        <!-- 列表 -->
        <el-tabs v-model="activeName" @tab-click="handleClick" type="">
          <!-- 充币记录 -->
          <el-tab-pane :label="$t('financeRecords.rechargeHistory')" name="first">
            <el-collapse-transition>
              <div class="content" v-loading="rechargeLoading">
                <el-table
                  class="table"
                  :data="rechargeList">
                  <el-table-column
                    :prop="'updateTime'||'createTime'"
                    :label="$t('financeRecords.time')">
                  </el-table-column>
                  <el-table-column
                    prop="shortName"
                    :label="$t('financeRecords.coinType')">
                  </el-table-column>
                  <el-table-column
                    prop="tradeType"
                    :label="$t('financeRecords.type')">
                  </el-table-column>
                  <el-table-column
                    prop="amount"
                    :label="$t('financeRecords.count')">
                  </el-table-column>
                  <el-table-column
                    prop="status"
                    :label="$t('financeRecords.status')">
                  </el-table-column>
                </el-table>

                <div class="pagination-box">
                  <el-pagination
                    layout="prev, pager, next"
                    :page-size="rechargePageSize"
                    :current-page="rechargePageIndex"
                    :total="rechargePageTotal"
                    v-show="rechargePageTotal > 0"
                    @current-change="currentChange">
                  </el-pagination>
                </div>
              </div>
            </el-collapse-transition>
          </el-tab-pane>

          <!-- 提币记录 -->
          <el-tab-pane :label="$t('financeRecords.withdrawHistory')" name="second">
            <el-collapse-transition>
              <div class="content" v-loading="withdrawLoading">
                <el-table
                  class="table"
                  :data="withdrawList">
                  <el-table-column
                    :prop="'updateTime'||'createTime'"
                    :label="$t('financeRecords.time')">
                  </el-table-column>
                  <el-table-column
                    prop="shortName"
                    :label="$t('financeRecords.coinType')">
                  </el-table-column>
                  <el-table-column
                    prop="tradeType"
                    :label="$t('financeRecords.type')">
                  </el-table-column>
                  <el-table-column
                    prop="amount"
                    :label="$t('financeRecords.count')">
                  </el-table-column>
                  <el-table-column
                    prop="statusMessage"
                    :label="$t('financeRecords.status')">
                  </el-table-column>
                </el-table>

                <div class="pagination-box">
                  <el-pagination
                    layout="prev, pager, next"
                    :page-size="withdrawPageSize"
                    :current-page="withdrawPageIndex"
                    :total="withdrawPageTotal"
                    v-show="withdrawPageTotal > 0"
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
  import {_apiGetVirtualShowALL, _apiRechargeList, _apiWithdrawList} from 'api'

  export default {
    name: 'Name',
    components: {
      'my-header': Header,
      'my-footer': Footer
    },
    data () {
      return {
        virtualShowALLList: [], // 所有币种列表
        activeName: 'first', // 当前财务类型 first充币 second提币
        virtualname: '', // 当前币种
        rechargeLoading: false, // 充币加载中
        rechargePageIndex: 1, // 充币当前页码
        rechargePageSize: 10, // 充币每页条目
        rechargePageTotal: 0, // 充币总条目数
        rechargeList: [], // 充币记录列表
        withdrawLoading: false, // 提币加载中
        withdrawPageIndex: 1, // 提币当前页码
        withdrawPageSize: 10, // 提币每页条目
        withdrawPageTotal: 0, // 提币总条目数
        withdrawList: [] // 提币记录列表
      }
    },
    created () {
      // 初始化获取所有币种列表
      this.apiGetVirtualShowALL()

      // 初始化获取充币列表
      this.apiRechargeList()
    },
    methods: {
      // 获取所有币种列表
      apiGetVirtualShowALL () {
        _apiGetVirtualShowALL().then((res) => {
          if (res.statusCode === 200) {
            this.virtualShowALLList = res.data
          }
        })
      },

       // 选择财务类型(充币、提币)
      handleClick (tab, event) {
        if (this.activeName === 'first') {
          this.rechargePageIndex = 1
          this.apiRechargeList()
        } else {
          this.withdrawPageIndex = 1
          this.apiWithdrawList()
        }
      },

      // 选择币种查询
      handleCommand (command) {
        this.virtualname = command
        this.apiRechargeList()
      },

      // 获取充币记录
      apiRechargeList () {
        this.rechargeLoading = true
        _apiRechargeList({
          virtualname: this.virtualname === '' ? '' : this.virtualname.code,
          pageIndex: this.rechargePageIndex,
          pageSize: this.rechargePageSize
        }).then((r) => {
          if (r.statusCode === 200) {
            this.rechargePageIndex = r.result.pageIndex
            this.rechargePageSize = r.result.pageSize
            this.rechargePageTotal = r.result.totalSize
            this.rechargeList = r.result.data
          }
          this.rechargeLoading = false
        }).catch(() => {
          this.rechargeLoading = false
        })
      },

      // 获取提币记录
      apiWithdrawList () {
        this.withdrawLoading = true
        _apiWithdrawList({
          virtualname: this.virtualname === '' ? '' : this.virtualname.code,
          pageIndex: this.withdrawPageIndex,
          pageSize: this.withdrawPageSize
        }).then((r) => {
          if (r.statusCode === 200) {
            this.withdrawPageIndex = r.result.pageIndex
            this.withdrawPageSize = r.result.pageSize
            this.withdrawPageTotal = r.result.totalSize
            this.withdrawList = r.result.data
          }
          this.withdrawLoading = false
        }).catch(() => {
          this.withdrawLoading = false
        })
      },

      // 分页(充币、提币)
      currentChange (pageIndex) {
        if (this.activeName === 'first') {
          this.rechargePageIndex = pageIndex
          this.apiRechargeList()
        } else {
          this.withdrawPageIndex = pageIndex
          this.apiWithdrawList()
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
   @import "~assets/stylus/variable.styl"

  .container
    width 1200px
    min-height 600px
    margin 0 auto 84px
    padding-top 20px
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
</style>
