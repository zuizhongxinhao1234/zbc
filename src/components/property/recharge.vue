<template>
  <div>
    <el-row>
      <el-col class="view-title">{{$t('recharge.rechargeAddress')}}</el-col>
      <el-col :id="message.shortName" :span="12" class="font-big">{{message.rechargeAddress}}</el-col>
      <el-col :span="12" class="text-align-right">
        <el-button @click="copyText(message.shortName)" type="text" size="small">{{$t('recharge.copy')}}</el-button>
        <div class="position-relative qrcode-box">
          <el-button type="text" size="small" @click.stop="showOrHide">{{$t('recharge.qrcode')}}</el-button>
           <transition name="el-fade-in-linear">
            <div class="qrcode" v-show="qrcodeShowFlag" :id="`${message.rechargeAddress}`">

            </div>
           </transition>
        </div>
      </el-col>
      <el-col>
        <span class="view-title vertical-middle">{{$t('recharge.check')}}</span><router-link class="link vertical-middle" to="/finance-records">充币记录</router-link><span class="view-title vertical-middle">跟踪状态</span>
      </el-col>
      <el-col>
        <p class="view-content">{{$t('recharge.tips')}}</p>
        <p class="view-content">{{`${$t('recharge.tips1_1')}${message.shortName}${$t('recharge.tips1_2')}`}}</p>
        <p class="view-content">{{$t('recharge.tips2')}}</p>
        <p class="view-content">{{`${$t('recharge.tips3_1')}${message.shortName}${$t('recharge.tips3_2')}`}}</p>
        <p class="view-content">{{$t('recharge.tips4')}}</p>
        <p class="view-content">{{$t('recharge.tips5')}}</p>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import {copySpan} from 'common/copyText' // 引入复制span标签文本方法
  import $ from 'jquery'

  /* eslint-disable */
  require('@/utils/jquery.qrcode.min.js')
  export default {
    name: 'Name',
    data () {
      return {
        qrcodeShowFlag: false
      }
    },
    props: ['message'],
    beforeDestroy () {
      window.removeEventListener('click',this.hide)
    },
    mounted () {
      this.createRechargeCode(this.message.rechargeAddress)
      window.addEventListener('click',this.hide)
    },
    methods: {
      // 复制地址
      copyText (id) {
        copySpan(id)
      },
      // 获取充值二维码
      createRechargeCode (rechargeAddress) {
        if(rechargeAddress){
          this.$nextTick(function () {
            $(`#${rechargeAddress}`).qrcode({
              text: rechargeAddress,
              width: 80,
              height: 80
            })
          })
        }
      },
      showOrHide () {
        this.qrcodeShowFlag = !this.qrcodeShowFlag
      },
      hide () {
        this.qrcodeShowFlag = false
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable.styl"

  .view-title
    color $color-table-font-head
  .view-content
    line-height initial
    color $color-table-font-head
  .link
    color $color-btn
    &:hover
      color $color-btn-hover
    &:active
      color $color-btn
    &:foucs
      color $color-btn-hover
  .qrcode-box
    display inline-block
    margin-left 35px
    .qrcode
      display inline-block
      right 0
      top 35px
      position absolute
</style>
