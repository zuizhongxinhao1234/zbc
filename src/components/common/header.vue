<template>
  <div class="header-box">
    <div class="header clear-both">
      <ul class="float-left clear-both">
        <li class="float-left">
          <!-- 返回主页logo -->
          <router-link class="margin-right-46" to="/">
            <img class="logo" src="../../assets/images/logo.png" alt="">
          </router-link>
        </li>

          <!-- 法币交易 -->
        <!-- <li class="float-left">
          <router-link class="header-link margin-right-46" active-class="current" to="/legal-tender">{{$t('header.FBJY')}}</router-link>
        </li> -->

          <!-- 币币交易 -->
        <li class="float-left">
          <router-link class="header-link margin-right-46" active-class="current" to="/currency-trade">{{$t('header.BBJY')}}</router-link>
        </li>

          <!-- 杠杆交易 -->
        <!-- <li class="float-left">
          <router-link class="header-link margin-right-46" active-class="current" to="/lever-trade">{{$t('header.GGJY')}}</router-link>
        </li> -->

          <!-- XEEX -->
        <!-- <li class="float-left">
          <router-link class="header-link margin-right-46" active-class="current" to="/XEEX">{{$t('header.XEEX')}}</router-link>
        </li> -->

          <!-- ZBC -->
        <!-- <li class="float-left">
          <router-link class="header-link margin-right-46" active-class="current" to="/ZBC">{{$t('header.ZBC')}}</router-link>
        </li> -->

          <!-- 新闻中心 -->
        <li class="float-left">
          <router-link class="header-link margin-right-46" active-class="current" to="/news">{{$t('header.newsCenter')}}</router-link>
        </li>

        <!-- <li class="float-left"> -->
          <!-- 新手帮助 -->
          <!-- <router-link class="header-link" active-class="current" to="/help">{{$t('header.XSBZ')}}</router-link> -->
        <!-- </li> -->
      </ul>
      <ul class="float-right clear-both">
        <li class="float-left" v-if="!loginStatus">
          <!-- 登录 -->
          <router-link class="header-link margin-right-30" active-class="current" to="/login">{{$t('header.LOGIN')}}</router-link>
        </li>
        <li class="float-left" v-if="!loginStatus">
          <!-- 注册 -->
          <router-link class="header-link margin-right-30" active-class="current" to="/register">{{$t('header.REGISTER')}}</router-link>
        </li>
        <li class="float-left assets" v-if="loginStatus">
          <!-- 资产 -->
          <div class="header-link margin-right-30">
            <i class="iconfont icon-xinyongqia"></i>
            <span>{{$t('header.assets')}}</span>
            <i class="iconfont icon-xiangxia1 margin-left-10"></i>
            <i class="iconfont icon-xiangshang1 margin-left-10"></i>
            <ul>
              <li>
                <router-link to="/property" class="chargeProvided">
                  <i class="iconfont icon-duozhongzhifu"></i>
                  <span>{{$t('header.rechargeAndWithdraw')}}</span>
                </router-link>
              </li>
              <li>
                <router-link to="/property/bestowed" class="chargeProvided">
                  <i class="iconfont icon-zengsong"></i>
                  <span>{{$t('header.myInvite')}}</span>
                </router-link>
              </li>
            </ul>
          </div>

        </li>
        <li class="float-left" v-if="loginStatus">
          <!-- 订单 -->
          <router-link class="header-link margin-right-30" to="/currency-trade-history">
            <i class="iconfont icon-dingdan"></i>
            {{$t('header.order')}}
          </router-link>
        </li>
        <li class="float-left users" v-if="loginStatus">
          <!-- 个人中心 -->
          <div class="header-link margin-right-30">
            <i class="iconfont icon-yonghu"></i>
            <span>{{username}}</span>
            <i class="iconfont icon-xiangxia1 margin-left-10"></i>
            <i class="iconfont icon-xiangshang1 margin-left-10"></i>
            <ul>
              <li>
                <router-link to="/account-safe" class="chargeProvided">
                  <i class="iconfont icon-tishi"></i>
                  <span>{{$t('header.accountSafe')}}</span>
                </router-link>
              </li>
              <li>
                <router-link to="/identity-validate" class="chargeProvided">
                  <i class="iconfont icon-shenfen"></i>
                  <span>{{$t('header.identityValidate')}}</span>
                </router-link>
              </li>
              <li @click="signOut">
                <div class="chargeProvided">
                  <i class="iconfont icon-xiangshang5"></i>
                  <span>{{$t('header.backForward')}}</span>
                </div>
              </li>
            </ul>
          </div>
        </li>


          <!-- 设置 -->
        <!-- <li class="float-left">
          <div class="header-link margin-right-30" @click="dialogVisible = true">
            <i class="iconfont icon-shezhi"></i>
          </div>
        </li> -->


        <li class="float-left position-relative">
          <!-- 当前语言 -->
          <el-select :disabled="true" v-model="language" :placeholder="$t('header.placeholder')" @change="changeLanguage">
            <el-option
              v-for="item in languageList"
              :key="item.locale"
              :label="item.name"
              :value="item.locale">
            </el-option>
          </el-select>
        </li>
      </ul>
    </div>
    <!-- 设置弹出层 -->

    <!-- <el-dialog
      class="modalBody1"
      title="设置"
      :visible.sync="dialogVisible"
      width="30%">
      <label for="selectRate" class="selectRate-label">折算货币</label>
      <el-select v-model="value6" placeholder="请选择" name="selectRate" class="selectRate">
        <el-option
          v-for="item in cities"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          <span class="float-left">{{ item.label }}</span>
          <span class="float-right font-small">{{ item.value }}</span>
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dialogVisible = false" class="dialog-btn">确 定</el-button>
    </span>
    </el-dialog> -->
  </div>
</template>

<script type="text/ecmascript-6">
  import LanguageList from 'language/config'
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  import {setLocalStorage, getLocalStorage} from 'common/localStorage'
  import * as types from 'store/mutation-types'

  export default {
    name: 'Header',
    data () {
      return {
        language: '',
        languageList: LanguageList
        // showModal: false,
        // dialogVisible: false,
        // convertedCurrency: {
        //   key: '',
        //   value: 'NONE'
        // },
        // cities: [{
        //   value: 'Beijing',
        //   label: '北京'
        // }, {
        //   value: 'Shanghai',
        //   label: '上海'
        // }, {
        //   value: 'Nanjing',
        //   label: '南京'
        // }, {
        //   value: 'Chengdu',
        //   label: '成都'
        // }, {
        //   value: 'Shenzhen',
        //   label: '深圳'
        // }, {
        //   value: 'Guangzhou',
        //   label: '广州'
        // }],
        // value6: ''
      }
    },
    created () {
      this.setLanguage()
    },
    computed: {
      ...mapGetters([
        'loginStatus',
        'userInfo'
      ]),
      // list: function () {
      //   return [{
      //     key: '1',
      //     value: 'dwead'
      //   }]
      // },
      username: function () {
        if (this.userInfo.phone) {
          return this.userInfo.phone.substr(0, 3) + '****' + this.userInfo.phone.substr(7)
        }
        if (this.userInfo.email) {
          return this.userInfo.email.substr(0, 3) + '****' + this.userInfo.email.substr(7)
        }
      }
    },
    methods: {
      // 切换语言
      changeLanguage: function () {
        this.$i18n.locale = this.language// 关键语句
        setLocalStorage('language', this.language)
        document.getElementById('myframe') && document.getElementById('myframe').contentWindow.location.reload(true)
      },
      // 初始化语言
      setLanguage: function () {
        this.language = getLocalStorage('language')
      },
      // 登出
      signOut: function () {
        // console.log('登出')
        this.$confirm(this.$t('header.backConfirmMessage'), this.$t('header.tips'), {
          confirmButtonText: this.$t('header.confirm'),
          cancelButtonText: this.$t('header.cancel'),
          type: 'info'
        }).then(() => {
          this.clearLocalStorage({flag: false, token: ''})
          this.setUserInfo('')
        // this.setMarket({topic:'',coinType:''})
          this.setTopic('')
          this.setCoinType('')
          this.$router.push({path: '/'})
        }).catch(() => {

        })
      },
      ...mapActions({
        clearLocalStorage: 'setStore'
      }),
      ...mapMutations({
        'setUserInfo': types.SET_USERINFO,
        'setTopic': types.SET_TOPIC,
        'setCoinType': types.SET_COINTYPE
      })
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable.styl"

  $color-fff = #fff
  $color-1e2230 = #1e2230
  $color-698cfe = #698cfe
  $color-b8c2e0 = #b8c2e0

  .margin-right-30
    margin-right 30px
  .margin-right-46
    margin-right 46px
  .header
    height 80px
    line-height 80px
    padding 0 60px
    background-color $color-1e2230
  .logo {
    display inline-block
    vertical-align middle
  }
  .header-link
    display inline-block
    vertical-align middle
    line-height initial
    cursor pointer
    color $color-fff
    &:hover
      color $color-698cfe
  .current
    color $color-698cfe
  .header-box /deep/ .el-input__inner
    width 110px
    background: transparent
    border 1px solid $color-fff
    border-radius 14px
    padding-right 0
    text-align: center
    padding-left: 0
    height: 40px
  .header-box /deep/ .el-input__suffix
    display none
  // .language-select
  //   height 40px
  // .language-select:hover .language-box
  //   opacity 1
  //   transition opacity 1.5s
  //   -moz-transition: opacity 1.5s
  //   -webkit-transition: opacity 1.5s
  //   -o-transition: opacity 1.5s
  // .current-language
  //   display inline-block
  //   vertical-align middle
  //   width 60px
  //   height 28px
  //   padding-left 14px
  //   padding-right 14px
  //   line-height 26px
  //   text-align center
  //   color $color-fff
  //   border 1px solid $color-fff
  //   border-radius 14px
  //   cursor: pointer
  // .language-box
  //   opacity 0
  //   transition opacity 1.5s
  //   -moz-transition: opacity 1.5s
  //   -webkit-transition: opacity 1.5s
  //   -o-transition: opacity 1.5s
  //   position absolute
  //   left 0
  //   top 80px
  //   right 0
  //   overflow hidden
  //   z-index 2
  //   padding-top 5px
  //   padding-bottom 5px
  //   background-color $color-main-bg
  //   border-radius 6px
  //   li
  //     padding-left 14px
  //     padding-right 14px
  //     line-height 42px
  //     text-align center
  //     &:last-child
  //       border-bottom none
  // .language-option
  //   line-height initial
  //   color $color-footer-title
  //   &:hover
  //     color $color-698cfe

  .margin-left-10
    margin-left 10px
  .assets,.users
    cursor pointer
    .header-link
      height 80px
      line-height 80px
    .icon-xiangshang1
      display none
    &:hover ul
      display block
    &:hover .icon-xiangxia1
      display none
    &:hover .icon-xiangshang1
      display inline-block
    ul
      display none
      position absolute
      top 80px
      z-index 8
      background $color-main-bg
      box-shadow 0 8px 16px rgba(0,0,0,.4);
      li
        border-bottom 1px solid $color-table-border-in
        padding 14px 10px
        height 36px
        line-height 10px
        &:hover
          background $color-table-bg-content-hover
        .chargeProvided
          color $color-footer-title
        &:hover .chargeProvided
          color $color-698cfe
      li:last-child
        border-bottom none

  .users
    li
      min-width 200px

    cursor pointer
    &:hover
      color $color-698cfe

  .header-box /deep/ .modal-container
    width 505px
  .modalBody1 /deep/ .el-dialog__title
      color $color-main-font
  .modalBody
    color $color-table-font-head
    .text
      font-size 12px
    // .convertedCurrencyBody
    //   height 42px
    //   line-height 42px
  .modalFooter
    text-align right
    button
      width 180px
      height 44px
      color white
      background $color-btn
      border-radius 5px
      &:hover
        background $color-btn-hover
  .selectRate-label
    font-size 12px
    color $color-table-font-head
  .selectRate
    width 100%
  .dialog-btn
    width 50%
</style>
