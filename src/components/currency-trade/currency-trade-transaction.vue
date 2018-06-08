<template>
  <div class="box">
    <div class="mTitle position-relative">
      <el-tabs v-model="activeName" @tab-click="tabClick" style="
    padding-left:28px">
        <el-tab-pane name="fixedPrice">
          <span slot="label">{{$t('currencyTradeTransaction.fixedTrade')}}</span>
        </el-tab-pane>
        <!--<el-tab-pane name="marketPrice">-->
          <!--<span slot="label">市价交易</span>-->
        <!--</el-tab-pane>-->
      </el-tabs>
      <router-link class="router-link" to="/">{{$t('currencyTradeTransaction.fee')}}</router-link>
    </div>
    <div class="content" v-loading="loadingFlag">
      <el-row>
        <!-- 买 -->
        <el-col :span="12">
          <not-logged-in v-if="!loginStatus">
          </not-logged-in>
          <div class="position-relative content-header" v-if="loginStatus">
            <span>{{`${$t('currencyTradeTransaction.useable')} ${availableBuyNum} ${coinType.nameMarket||''}`}}</span>
            <router-link class="router-link" to="/property/trade-account">{{$t('currencyTradeTransaction.recharge')}}</router-link>
          </div>
          <div class="leftBox">
            <div class="leftContent">
              <el-form :model="ruleFormBuy" :rules="rulesBuy" ref="ruleFormBuy" label-position="top" label-width="80px">
                <el-form-item :label="$t('currencyTradeTransaction.buyPrice')" prop="buyPrice">
                  <el-input v-model="ruleFormBuy.buyPrice" clearable>
                    <span slot="suffix">{{coinType.nameMarket}}</span>
                  </el-input>
                  <div class="CNYBox font-small"><span v-show="marketToCnyBuy">{{`≈ ${marketToCnyBuy} CNY`}}</span></div>
                </el-form-item>

                <el-form-item :label="$t('currencyTradeTransaction.buyCount')" prop="buyVolume">
                  <el-input v-model="ruleFormBuy.buyVolume" clearable>
                    <span slot="suffix">{{coinType.name}}</span>
                  </el-input>
                </el-form-item>

                <el-form-item>
                  <div class="block">
                    <el-slider
                      v-model="ruleFormBuy.buyBlock"
                      :min="0"
                      :max="availableBuyNum"
                      :show-tooltip="false"
                      :disabled="!loginStatus||availableBuyNum===0">
                    </el-slider>
                    <div class="block-txt">
                      <span class="float-left">{{`0 ${coinType.nameMarket||''}`}}</span>
                      <span class="float-right">{{`${availableBuyNum} ${coinType.nameMarket||''}`}}</span>
                      <span class="clear-both"></span>
                    </div>
                    <span class="demonstration">{{`${$t('currencyTradeTransaction.tradeCount')} ${totalPriceBuy} ${coinType.nameMarket||''}`}}</span>
                  </div>
                </el-form-item>

                <el-form-item>
                  <el-button
                    :loading="buyBtnLoading"
                    class="btn background-color-buy"
                    :class="{'btn-not-login':!loginStatus}"
                    @click="submitFormBuy('ruleFormBuy')"
                    :disabled="!loginStatus">
                    {{`${$t('currencyTradeTransaction.buy')}${coinType.name||''}`}}
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-col>
        <!-- 卖 -->
        <el-col :span="12">
          <not-logged-in v-if="!loginStatus"></not-logged-in>
          <div class="position-relative content-header" v-if="loginStatus">
            <span>{{`${$t('currencyTradeTransaction.useable')} ${availableSellNum} ${coinType.name||''}`}}</span>
            <router-link class="router-link" to="/property/trade-account">{{$t('currencyTradeTransaction.recharge')}}</router-link>
          </div>
          <div class="rightBox">
            <div class="rightContent">
              <el-form :model="ruleFormSell" :rules="rulesSell" ref="ruleFormSell" label-position="top" label-width="80px">
                <el-form-item :label="$t('currencyTradeTransaction.sellPrice')" prop="sellPrice">
                  <el-input v-model="ruleFormSell.sellPrice" clearable>
                    <span slot="suffix">{{coinType.nameMarket}}</span>
                  </el-input>
                  <div class="CNYBox font-small"><span v-show="marketToCnySell">{{`≈ ${marketToCnySell} CNY`}}</span></div>
                </el-form-item>

                <el-form-item :label="$t('currencyTradeTransaction.sellCount')" prop="sellVolume">
                  <el-input v-model="ruleFormSell.sellVolume" clearable>
                    <span slot="suffix">{{coinType.name}}</span>
                  </el-input>
                </el-form-item>

                <el-form-item>
                  <div class="block">
                    <el-slider
                      v-model="ruleFormSell.sellBlock"
                      :min="0"
                      :max="availableSellNum"
                      :show-tooltip="false"
                      :disabled="!loginStatus||availableSellNum===0">
                    </el-slider>
                    <div class="block-txt">
                      <span class="float-left">{{`0 ${coinType.name||''}`}}</span>
                      <span class="float-right">{{`${availableSellNum} ${coinType.name||''}`}}</span>
                      <span class="clear-both"></span>
                    </div>
                    <span class="demonstration">{{`${$t('currencyTradeTransaction.tradeCount')} ${totalPriceSell} ${coinType.nameMarket||''}`}}</span>
                  </div>
                </el-form-item>

                <el-form-item>
                  <el-button
                    :loading="sellBtnLoading"
                    class="btn background-color-sell"
                    :class="{'btn-not-login':!loginStatus}"
                    @click="submitFormSell('ruleFormSell')"
                    :disabled="!loginStatus">
                    {{`${$t('currencyTradeTransaction.sell')}${coinType.name||''}`}}
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import NotLoggedIn from 'components/common/Not-logged-in'
  import {mapGetters} from 'vuex'
  import {testFloat8} from 'common/validate'
  import {_apiBuyCoin, _apiSellCoin} from 'api/index'
  import {trim} from 'common/common'

  export default {
    data () {
      const validateBuyPrice = (rule, value, callback) => {
        if (!value || value === '0') {
          return callback(new Error(this.$t('currencyTradeTransaction.buyPriceEmptyMessage')))
        }
        if (!testFloat8(value)) {
          callback(new Error(this.$t('currencyTradeTransaction.rightNumberMessage')))
        } else {
          if (this.ruleFormBuy.buyVolume) {
            callback()
            this.$refs.ruleFormBuy.validateField('buyVolume')
          } else {
            callback()
          }
        }
      }
      const validateBuyVolume = (rule, value, callback) => {
        if (!value || value === '0') {
          return callback(new Error(this.$t('currencyTradeTransaction.buyCountEmptyMessage')))
        }
        if (!testFloat8(value)) {
          callback(new Error(this.$t('currencyTradeTransaction.rightNumberMessage')))
        } else {
          if (this.ruleFormBuy.buyPrice && this.ruleFormBuy.buyPrice * value > this.availableBuyNum) {
            callback(new Error(this.$t('currencyTradeTransaction.useableLowerMessage')))
          } else {
            this.ruleFormBuy.buyBlock = this.totalPriceBuy
            callback()
          }
        }
      }
      const validateSellPrice = (rule, value, callback) => {
        if (!value || value === '0') {
          return callback(new Error(this.$t('currencyTradeTransaction.sellPriceEmptyMessage')))
        }
        if (!testFloat8(value)) {
          callback(new Error(this.$t('currencyTradeTransaction.rightNumberMessage')))
        } else {
          if (this.ruleFormSell.sellVolume) {
            callback()
            this.$refs.ruleFormSell.validateField('sellVolume')
          } else {
            callback()
          }
        }
      }
      const validateSellVolume = (rule, value, callback) => {
        if (!value || value === '0') {
          return callback(new Error(this.$t('currencyTradeTransaction.sellCountEmptyMessage')))
        }
        if (!testFloat8(value)) {
          callback(new Error(this.$t('currencyTradeTransaction.rightNumberMessage')))
        } else {
          if (value > this.availableSellNum) {
            callback(new Error(this.$t('currencyTradeTransaction.useableLowerMessage')))
          } else {
            this.ruleFormSell.sellBlock = value * 1
            callback()
          }
        }
      }
      return {
        // tabs 选择项
        activeName: 'fixedPrice',
        // 买 发布按钮loading
        buyBtnLoading: false,
        // 卖 发布按钮loading
        sellBtnLoading: false,
        // 买
        ruleFormBuy: {
          buyPrice: 0,
          buyVolume: 0,
          buyBlock: 0
        },
        // 买 表单验证规则
        rulesBuy: {
          buyPrice: [
            { validator: validateBuyPrice, trigger: 'blur' }
          ],
          buyVolume: [
            { validator: validateBuyVolume, trigger: 'blur' }
          ]
        },
        // 卖 表单
        ruleFormSell: {
          sellPrice: 0,
          sellVolume: 0,
          sellBlock: 0
        },
        // 卖 表单验证规则
        rulesSell: {
          sellPrice: [
            { validator: validateSellPrice, trigger: 'blur' }
          ],
          sellVolume: [
            { validator: validateSellVolume, trigger: 'blur' }
          ]
        }
      }
    },
    props: {
      // 某市场虚拟币账户信息
      marketBalance: {
        type: Object,
        default: function () {
          return {}
        }
      },
      // 某币种虚拟币账户信息
      coinBalance: {
        type: Object,
        default: function () {
          return {}
        }
      },
      loadingFlag: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      'ruleFormBuy.buyBlock': function () {
        if (this.ruleFormBuy.buyPrice) {
          this.ruleFormBuy.buyVolume = Math.floor(this.ruleFormBuy.buyBlock / this.ruleFormBuy.buyPrice * 100000000) / 100000000
          this.$refs.ruleFormBuy.validateField('buyVolume')
        } else {
          this.$refs.ruleFormBuy.validateField('buyPrice')
        }
      },
      'ruleFormSell.sellBlock': function () {
        if (this.ruleFormSell.sellPrice) {
          this.ruleFormSell.sellVolume = Math.floor(this.ruleFormSell.sellBlock * 100000000) / 100000000
          this.$refs.ruleFormSell.validateField('sellVolume')
        } else {
          this.$refs.ruleFormSell.validateField('sellPrice')
        }
      }
    },
    computed: {
      ...mapGetters([
        'loginStatus',
        'topic',
        'coinType',
        'marketCoinToCny'
      ]),
      marketToCnyBuy () {
        return Math.floor(this.ruleFormBuy.buyPrice * this.marketCoinToCny * 100) / 100
      },
      marketToCnySell () {
        return Math.floor(this.ruleFormSell.sellPrice * this.marketCoinToCny * 100) / 100
      },
      // 某可用市场额度
      availableBuyNum: function () {
        if (this.loadingFlag) {
          return 0
        }
        return this.marketBalance.totalNum - this.marketBalance.blockNum || 0
      },
      // 某可用币种额度
      availableSellNum: function () {
        if (this.loadingFlag) {
          return 0
        }
        return this.coinBalance.totalNum - this.coinBalance.blockNum || 0
      },
      // 买 交易额
      totalPriceBuy: function () {
        return this.ruleFormBuy.buyPrice * this.ruleFormBuy.buyVolume
      },
      // 卖 交易额
      totalPriceSell: function () {
        return this.ruleFormSell.sellPrice * this.ruleFormSell.sellVolume
      }
    },
    methods: {
      changePrice: function (buy, sell) {
        this.ruleFormSell.sellPrice = trim(sell)
        this.ruleFormBuy.buyPrice = trim(buy)
      },
      tabClick (tab, event) {
        // console.log(tab, event);
      },
      submitFormBuy (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.buyBtnLoading = true
            _apiBuyCoin({
              coinType: this.coinType.code,
              unitPrice: this.ruleFormBuy.buyPrice,
              num: this.ruleFormBuy.buyVolume,
              marketCode: this.topic.code,
              totalPrice: this.totalPriceBuy
            }).then((res) => {
              if (res.statusCode === 200) {
                this.$message({
                  message: res.message,
                  type: 'success'
                })
              } else {
                this.$message({
                  message: res.message,
                  type: 'error'
                })
              }
              this.buyBtnLoading = false
            }).catch((error) => {
              console.log(error)
              this.buyBtnLoading = false
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      submitFormSell (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.sellBtnLoading = true
            _apiSellCoin({
              coinType: this.coinType.code,
              unitPrice: this.ruleFormSell.sellPrice,
              num: this.ruleFormSell.sellVolume,
              marketCode: this.topic.code,
              totalPrice: this.totalPriceSell
            }).then((res) => {
              if (res.statusCode === 200) {
                this.$message({
                  message: res.message,
                  type: 'success'
                })
              } else {
                this.$message({
                  message: res.message,
                  type: 'error'
                })
              }
              this.sellBtnLoading = false
            }).catch((error) => {
              console.log(error)
              this.sellBtnLoading = false
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    },
    components: {
      NotLoggedIn
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable.styl"
  .box
    background-color $color-second-bg
  /deep/ .el-tabs__item
    height 44px
    line-height 44px
  /deep/ .is-active
    color $color-button-bg-solid
  /deep/ .el-input__suffix
    right 15px
  /deep/ .el-input__suffix
    color $color-table-font-head
  /deep/ .el-input--suffix .el-input__inner
    padding-right 60px
  /deep/ .el-form--label-top .el-form-item__label
    padding 0
    height 21px
    line-height 21px
    color $color-table-font-head
  /deep/ .el-input
    z-index 2
  /deep/ .el-slider__runway
    background-color $color-main-bg
  /deep/ .el-slider__stop
    background-color $color-main-bg
    top: -2px
    height: 10px
    width: 10px
  .router-link
    position absolute
    right 10px
    top 15px
    line-height 1
  .content
    background-color $color-main-fill-bg
    margin-top -15px
    height 451px
    .leftBox,.rightBox
      padding 0 10px 0 28px
      .leftContent,.rightContent
        border-top 1px solid $color-table-border-in
        padding 15px 0 0 0
      .CNYBox
        background-color $color-table-bg-title
        height 22px
        line-height 22px
        // color $color-main-border
        padding-left 16px
        margin-top -1px
        position relative
        z-index 0
      .btn
        height 40px
        width 100%
      .block-txt
        margin-top -15px
        font-size 12px

  .content-header
    padding 15px 0 16px 28px
    .router-link
      line-height normal
  .btn-not-login
    background-color $color-main-border
    &:hover
      background-color $color-main-border
</style>
