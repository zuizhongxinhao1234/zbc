<template>
  <div>
    <div class="table-box">
      <div class="table-title clear-both">
        <div class="float-left">
          <!-- <span>总资产折合：0.00000000 BTC</span> -->
          <el-checkbox v-model="hideZero" @change="createNewTableData" class="checkbox">{{$t('tradeAccount.hideZero')}}</el-checkbox>
          <el-input
            v-model="input"
            class="input"
            size="small"
            suffix-icon="el-icon-search"
            clearable
            :placeholder="$t('tradeAccount.placeholder')">
          </el-input>
        </div>
        <div class="float-right">
          <router-link class="link vertical-middle" to="/finance-records">{{$t('tradeAccount.propertyHistory')}}</router-link>
          <router-link class="link vertical-middle" to="/withdraw-address">{{$t('tradeAccount.withdrawAddressManage')}}</router-link>
        </div>
      </div>
      <el-row class="table-head font-small">
        <el-col :span="2" class="text-align-left">{{$t('tradeAccount.coinName')}}</el-col>
        <el-col :span="5" class="text-align-right">{{$t('tradeAccount.useable')}}</el-col>
        <el-col :span="5" class="text-align-right">{{$t('tradeAccount.freen')}}</el-col>
        <el-col :span="6" class="text-align-right">{{$t('tradeAccount.total')}}</el-col>
        <el-col :span="6" class="text-align-right">{{$t('tradeAccount.operate')}}</el-col>
      </el-row>
      <div v-loading="loadingFlag" class="row-box">
        <el-row
          :key="item.id"
          v-for="item in searchData"
          :class="[{'no-border': rechargeName === item.shortName || withdrawName === item.shortName},{'border-height-10': item.shortName === 'ETH'}]" class="table-body font-small">
          <el-col :span="2" class="text-align-left padding-left-10">{{item.shortName}}</el-col>
          <el-col :span="5" class="text-align-right">{{item.balance}}</el-col>
          <el-col :span="5" class="text-align-right">{{item.blockBalance}}</el-col>
          <el-col :span="6" class="text-align-right">{{item.totalCount}}</el-col>
          <el-col :span="6" class="text-align-right padding-right-10">
            <el-button :disabled="item.isRecharge !== 1" @click="rechargeCoin(item)" type="text" size="small">{{$t('tradeAccount.recharge')}}</el-button>
            <el-button :disabled="item.isWithdraw !== 1" @click="withdrawCoin(item)" type="text" size="small">{{$t('tradeAccount.withdraw')}}</el-button>
            <router-link class="link vertical-middle margin-left-10" to="/currency-trade">{{$t('tradeAccount.trade')}}</router-link>
          </el-col>

          <!-- 充币 -->
          <el-collapse-transition>
            <el-col v-show="rechargeName === item.shortName" class="view-box">
              <my-recharge :message="item"></my-recharge>
            </el-col>
          </el-collapse-transition>
          <!-- 提币 -->
          <el-collapse-transition>
            <el-col v-show="withdrawName === item.shortName" class="view-box">
              <my-wishdraw :message="item" :ref="item.virtualCoinCode" @updateLegalCoinList="getLegalCoinList" @resetWithdrawView="closeWithdrawView"></my-wishdraw>
            </el-col>
          </el-collapse-transition>
        </el-row>
      </div>
    </div>

    <!-- ZBC充币窗口 -->
    <el-dialog :title="`ZBC${clickType?$t('tradeAccount.recharge'):$t('tradeAccount.withdraw')}`" :visible.sync="rechargeViewShow">
      <el-row class="grey margin-bottom-10">{{`${$t('tradeAccount.agent')}${clickType?$t('tradeAccount.recharge'):withdraw}：`}}<span class="blue">{{$t('tradeAccount.chooseServer')}}</span></el-row>
      <el-row class="margin-bottom-10" :gutter="20">
        <el-col :span="8">
          <div @click="contactServer(197242031)" class="contact-server">
            <el-row class="margin-bottom-10">{{`${clickType?$t('tradeAccount.recharge'):withdraw}-${$t('tradeAccount.server1')}`}}</el-row>
            <el-row class="margin-bottom-10">{{$t('tradeAccount.qq1')}}</el-row>
            <el-row class="margin-bottom-10">{{$t('tradeAccount.name1')}}</el-row>
            <el-row class="margin-bottom-10">{{$t('tradeAccount.alipay1')}}</el-row>
          </div>
        </el-col>
        <el-col :span="8">
          <div @click="contactServer(190215076)" class="contact-server">
            <el-row class="margin-bottom-10">{{`${clickType?$t('tradeAccount.recharge'):$t('tradeAccount.withdraw')}-${$t('tradeAccount.server2')}`}}</el-row>
            <el-row class="margin-bottom-10">{{$t('tradeAccount.qq2')}}</el-row>
            <el-row class="margin-bottom-10">{{$t('tradeAccount.name2')}}</el-row>
            <el-row class="margin-bottom-10">{{$t('tradeAccount.alipay2')}}</el-row>
          </div>
        </el-col>
      </el-row>
      <el-row class="grey margin-bottom-10">{{$t('tradeAccount.zbcInstruction')}}</el-row>
      <el-row class="grey">{{$t('tradeAccount.zbcDetails')}}</el-row>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import Recharge from 'components/property/recharge'
  import Wishdraw from 'components/property/withdraw'
  import {mapGetters} from 'vuex'
  import fuzzyQuery from 'common/fuzzyQuery' // 引入模糊查询公共方法
  import {_apiLegalCoinList} from 'api'

  export default {
    name: 'Name',
    components: {
      'my-recharge': Recharge,
      'my-wishdraw': Wishdraw
    },
    data () {
      return {
        hideZero: false, // 隐藏资产为0的状态 默认false不隐藏
        input: '', // 搜索关键词
        legalCoinList: [], // 请求返回数据
        tableData: [], // 筛选后的表格数据
        rechargeName: '', // 充值币种名称
        withdrawName: '', // 提现币种名称
        loadingFlag: false, // 数据加载loading
        rechargeViewShow: false, // 充值窗口
        clickType: true // 充提币事件状态（true:冲币；false：提币）
      }
    },
    created () {
      this.getLegalCoinList()
    },
    computed: {
      ...mapGetters([
        'token'
      ]),

      // 模糊查询过滤器
      searchData () {
        return fuzzyQuery(this.tableData, this.input)
      }
    },
    methods: {
      // 获取币种列表
      getLegalCoinList () {
        this.loadingFlag = true
        _apiLegalCoinList().then((res) => {
          if (res.statusCode === 200) {
            this.legalCoinList = res.data
            this.createNewTableData() // 初始化表格数据
          }
          this.loadingFlag = false
        }).catch(() => {
          this.loadingFlag = false
        })
      },

      // 表格数据筛选--是否剔除资产为0的数据
      createNewTableData () {
        let $this = this
        let d = $this.legalCoinList
        $this.tableData = []
        for (let i in d) {
          if ($this.hideZero) {
            if (parseFloat(d[i].balance) > 0) {
              $this.tableData.push(d[i])
            }
          } else {
            $this.tableData.push(d[i])
          }
        }
      },

      // 展开当前币种充币
      rechargeCoin (item) {
        let r = item.shortName
        if (r === 'ZBC') {
          this.clickType = true
          this.rechargeViewShow = true
        } else {
          this.withdrawName = ``
          this.rechargeName === `` || this.rechargeName !== r ? this.rechargeName = r : this.rechargeName = ``
        }
      },

      // 展开当前币种提币
      withdrawCoin (item) {
        let r = item.shortName
        if (r === 'ZBC') {
          this.clickType = false
          this.rechargeViewShow = true
          return
        }
        this.rechargeName = ``
        if (this.withdrawName === `` || this.withdrawName !== r) {
          this.withdrawName = r
          this.$refs[item.virtualCoinCode][0].getWithdrawAddressList(item.virtualCoinCode)
        } else {
          this.withdrawName = ``
        }
      },

      // 联系qq客服
      contactServer (qq) {
        window.open(
          `http://wpa.qq.com/msgrd?v=3&uin=${qq}&site=qq&menu=yes`,
          `_blank`,
          `height=502,width=644,toolbar=no,scrollbars=no,menubar=no,status=no`
        )
      },

      // 关闭重置提币窗口
      closeWithdrawView () {
        this.rechargeName = ``
        this.withdrawName = ``
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable.styl"

  .padding-left-10
    padding-left 10px
  .padding-right-10
    padding-right 10px
  .row-box
    min-height 295px
  .margin-left-10
    margin-left 10px
  .margin-bottom-10
    margin-bottom 10px
  .table-box
    min-height 400px
    padding-bottom 20px
    background-color $color-main-fill-bg
  .table-title
    padding 0 26px
    line-height 42px
    color $color-main-font
    background-color $color-second-fill-bg
  // .checkbox
  //   margin-left 20px
  .input
    width 200px
    margin-left 20px
  .link
    color $color-btn
    &:hover
      color $color-btn-hover
    &:active
      color $color-btn
    &:foucs
      color $color-btn-hover
  .table-head
    margin 0 26px
    line-height 40px
    color $color-table-font-head
  .table-body
    margin 0 16px
    line-height 40px
    color $color-main-font
    border-bottom 1px solid $color-table-border-in
    &:last-child
      border-bottom none
    &:hover
      background-color $color-table-bg-content-hover
      .view-box
        background-color $color-main-fill-bg
  .no-border
    border-bottom none
  .border-height-10
    border-bottom 10px solid $color-table-border-in
  .view-box
    // margin-left -10px
    padding 0 10px 10px
    box-sizing initial
    border 1px solid $color-table-border-in
    box-sizing border-box
  .contact-server
    padding 10px
    border 1px solid $color-main-border
    border-radius 6px
    cursor pointer
    color $color-main-font
    &:hover
      color $color-btn-hover
      border 1px solid $color-btn-hover
  .grey
    color $color-table-font-head
</style>
