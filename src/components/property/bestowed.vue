<template>
  <div>
    <div class="table-box">
      <div class="table-title clear-both">
        <div class="float-left">
          <!-- <span>总资产折合：0.00000000 BTC</span> -->
          <el-checkbox v-model="hideZero" @change="createNewTableData" class="checkbox">{{$t('bestowed.hideZero')}}</el-checkbox>
          <el-input
            v-model="input"
            class="input"
            size="small"
            suffix-icon="el-icon-search"
            clearable
            placeholder="请输入内容">
          </el-input>
        </div>
        <div class="float-right">
          <router-link class="link vertical-middle" to="/finance-records">{{$t('bestowed.propertyHistory')}}</router-link>
          <router-link class="link vertical-middle" to="/withdraw-address">{{$t('bestowed.withdrawAddressManage')}}</router-link>
        </div>
      </div>
      <el-row class="table-head font-small">
        <el-col :span="2" class="text-align-left">{{$t('bestowed.coinName')}}</el-col>
        <el-col :span="5" class="text-align-right">{{$t('bestowed.inviteCount')}}</el-col>
        <el-col :span="5" class="text-align-right">{{$t('bestowed.share')}}</el-col>
        <el-col :span="6" class="text-align-right">{{$t('bestowed.time')}}</el-col>
        <el-col :span="6" class="text-align-right">{{$t('bestowed.operate')}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="24" v-show="searchData.length<=0"><div class="noData">{{$t('bestowed.noData')}}</div></el-col>
      </el-row>
      <el-row
        :key="item.id"
        v-for="item in searchData"
        class="table-body font-small">
        <el-col :span="2" class="text-align-left">{{item.coinName}}</el-col>
        <el-col :span="5" class="text-align-right">{{item.shareProfitAmount}}</el-col>
        <el-col :span="5" class="text-align-right">{{item.presenteeName}}</el-col>
        <el-col :span="6" class="text-align-right">{{item.settlementTime}}</el-col>
        <el-col :span="6" class="text-align-right">
          <!-- <el-button v-if="item.isRecharge === 1" @click="rechargeCoin(item.coinName)" type="text" size="small">充币</el-button> -->
          <el-button :disabled="item.isWithdraw !== 1" @click="rechargeCoin2(item)" type="text" size="small">{{$t('bestowed.recharge')}}</el-button>
          <router-link class="link vertical-middle margin-left-10" to="/currency-trade">{{$t('bestowed.trade')}}</router-link>
        </el-col>

        <!-- 充币 -->
        <!-- <el-col v-show="rechargeName === item.coinName" class="view-box">
          <my-recharge :message="item"></my-recharge>
        </el-col> -->

        <!-- 提币 -->
        <el-collapse-transition>
          <el-col v-show="withdrawName === item.coinName" class="view-box">
            <my-wishdraw :message="item" :ref="item.virtualCoinCode" @updateLegalCoinList="getLegalCoinList" @resetWithdrawView="closeWithdrawView"></my-wishdraw>
          </el-col>
        </el-collapse-transition>
      </el-row>
      <div class="pagination-box">
        <el-pagination
          layout="prev, pager, next"
          :page-size="pageSize"
          :current-page="pageIndex"
          :total="result.totalSize"
          v-show="result.totalSize>0"
          @current-change="currentChange">
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import Recharge from 'components/property/recharge'
  import Wishdraw from 'components/property/withdraw'
  import {mapGetters} from 'vuex'
  import fuzzyQuery from 'common/fuzzyQuery' // 引入模糊查询公共方法
  import {_apiLegalCoinList, _apiShareProfitPageQuery} from 'api'

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
        result: {
          data: [],
          totalSize: 0
        },
        pageSize: 10,
        pageIndex: 1
      }
    },
    created () {
      // this.getLegalCoinList()
      this.getShareProfitPageQuery()
    },
    computed: {
      ...mapGetters([
        'userInfo'
      ]),

      // 模糊查询过滤器
      searchData () {
        return fuzzyQuery(this.result.data, this.input)
      }
    },
    methods: {
      // 获取币种列表
      getLegalCoinList () {
        let $this = this
        _apiLegalCoinList().then((res) => {
          if (res.statusCode === 200) {
            $this.legalCoinList = res.data
            this.createNewTableData() // 初始化表格数据
          }
        })
      },
      // 获取分润列表
      async getShareProfitPageQuery () {
        let res = await _apiShareProfitPageQuery({
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          presenterCode: this.userInfo.code
        })
        if (res.statusCode === 200) {
          this.result = res.result
        }
      },
      // 切换页码
      currentChange (pageIndex) {
        this.pageIndex = pageIndex
        this._getShareProfitPageQuery()
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
      // rechargeCoin (r) {
      //   this.withdrawName = ``
      //   this.rechargeName === `` || this.rechargeName !== r ? this.rechargeName = r : this.rechargeName = ``
      // },

      // 展开当前币种提币
      rechargeCoin2 (item) {
        let r = item.coinName
        this.rechargeName = ``
        if (this.withdrawName === `` || this.withdrawName !== r) {
          this.withdrawName = r
          this.$refs[item.virtualCoinCode][0].getWithdrawAddressList(item.virtualCoinCode)
        } else {
          this.withdrawName = ``
        }
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

  .margin-left-10
    margin-left 10px
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
    margin 0 26px
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
  .pagination-box
    text-align right
    padding 10px 0
  .noData
    color $color-second-font
    text-align center
    line-height 400px
</style>
