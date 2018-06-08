<template>
  <div>
    <!-- header -->
    <my-header></my-header>


    <div class="container">
      <!-- 面包屑 -->
      <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/currency-trade' }" class="font-big">{{$t('currencyTradeExchange.currencyTrade')}}</el-breadcrumb-item>
        <el-breadcrumb-item class="font-big">{{$t('currencyTradeExchange.currencyTradeExchange')}}</el-breadcrumb-item>
      </el-breadcrumb>

      <el-row :gutter="20">
        <el-col :span="12">
          <div class="form-box">
            <div class="title">{{$t('currencyTradeExchange.currencyTradeBuy')}}</div>
            <div class="content">
              <div class="header">
                <el-row>
                  <el-col :span="7" :offset="3" class="text-align-right">
                    <span>{{$t('currencyTradeExchange.price')}}(USDT)</span>
                  </el-col>
                  <el-col :span="7" class="text-align-right">
                    <span>{{$t('currencyTradeExchange.count')}}(BTC)</span>
                  </el-col>
                  <el-col :span="7" class="text-align-right">
                    <span>{{$t('currencyTradeExchange.total')}}(BTC)</span>
                  </el-col>
                </el-row>
              </div>
              <ul class="buy">
                <li v-for="(item,index) in buyData" :key="index">
                  <el-row type="flex">
                    <el-col :span="3" class="color-buy">
                      <span>{{$t('currencyTradeExchange.buy')}}{{index + 1}}</span>
                    </el-col>
                    <el-col :span="7" class="text-align-right">
                      <span>{{item.price}}</span>
                    </el-col>
                    <el-col :span="7" class="text-align-right">
                      <span>{{item.number}}</span>
                    </el-col>
                    <el-col :span="7" class="text-align-right padding-right-8">
                      <span>{{item.total}}</span>
                    </el-col>
                  </el-row>
                  <b class="buy-bg" :style="`width: ${item.len}%`"></b>
                </li>
              </ul>
            </div>
          </div>
        </el-col>

        <el-col :span="12">
          <div class="form-box">
            <div class="title">{{$t('currencyTradeExchange.sell')}}</div>
            <div class="content">
              <div class="header">
                <el-row>
                  <el-col :span="7" :offset="3" class="text-align-right">
                    <span>{{$t('currencyTradeExchange.price')}}(USDT)</span>
                  </el-col>
                  <el-col :span="7" class="text-align-right">
                    <span>{{$t('currencyTradeExchange.count')}}(BTC)</span>
                  </el-col>
                  <el-col :span="7" class="text-align-right">
                    <span>{{$t('currencyTradeExchange.total')}}(BTC)</span>
                  </el-col>
                </el-row>
              </div>
              <ul class="sell">
                <li v-for="(item,index) in sellData" :key="index">
                  <el-row type="flex">
                    <el-col :span="3" class="color-sell">
                      <span>{{$t('currencyTradeExchange.sell')}}{{index + 1}}</span>
                    </el-col>
                    <el-col :span="7" class="text-align-right">
                      <span>{{item.price}}</span>
                    </el-col>
                    <el-col :span="7" class="text-align-right">
                      <span>{{item.number}}</span>
                    </el-col>
                    <el-col :span="7" class="text-align-right padding-right-8">
                      <span>{{item.total}}</span>
                    </el-col>
                  </el-row>
                  <b class="sell-bg" :style="`width: ${item.len}%`"></b>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
      </el-row>

    </div>

    <!-- footer -->
    <my-footer></my-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from 'components/common/Header'
  import Footer from 'components/common/Footer'

  export default {
    name: 'Name',
    components: {
      'my-header': Header,
      'my-footer': Footer
    },
    data () {
      return {
      }
    },
    computed: {
      buyData () {
        let arr = []
        for (var i = 0; i < 5; i++) {
          arr.push({
            price: '8849.51',
            number: '0.0013',
            total: '6.1528',
            len: parseInt(Math.random() * 100)
          })
        }
        return arr
      },
      sellData () {
        let arr = []
        for (var i = 0; i < 3; i++) {
          arr.push({
            price: '8849.51',
            number: '0.0013',
            total: '6.1528',
            len: parseInt(Math.random() * 100)
          })
        }
        return arr
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
    color: $color-main-font
    background-color $color-second-bg
    .title
      padding 0 26px
      height 43px
      line-height 44px
    .content
      background-color $color-main-fill-bg
      padding 9px
      .header
        color $color-table-font-head
        padding 0 10px
      .buy,.sell
        font-size 12px
        padding 0 10px
        li
          position relative
          height 20px
          line-height 20px
          margin 5px 0
          .color-sell,.color-buy
            padding-left 8px
          .buy-bg
            opacity .1
            position absolute
            right 0
            top 0
            height 100%
            max-width 100%
            background-color $color-buy
          .sell-bg
            opacity .1
            position absolute
            right 0
            top 0
            height 100%
            max-width 100%
            background-color $color-sell
  .padding-right-8
    padding-right 8px
</style>
