<template>
  <div class="index">
    <!-- header -->
    <div class="position-relative margin-bottom-60">
      <my-header class="index-header"></my-header>
      <div>
        <swiper :swiperSlide="swiperSlide"></swiper>
      </div>
      <advertisement class="advertisement"></advertisement>
    </div>

    <!-- 交易-->
    <div class="margin-bottom-40 padding-left-60 padding-right-60">
      <trade-table></trade-table>
    </div>

    <!--服务中旬-->
    <service-center></service-center>

    <!--多平台终端接入-->
    <!-- <Multiplatform></Multiplatform> -->

    <!-- 友情链接 -->
    <FriendshipLink></FriendshipLink>

    <!--马上交易-->
    <div class="immediateTrading" v-if="!loginStatus">
      <h1 class="font-more-big">{{$t('immediateTrading.title')}}</h1>
      <div class="text font-big">{{$t('immediateTrading.text')}}</div>
      <div>
        <router-link to="/login">
          <button class="sign font-big">{{$t('immediateTrading.sign')}}</button>
        </router-link>
        <router-link to="/register">
          <button class="register font-big">{{$t('immediateTrading.register')}}</button>
        </router-link>
      </div>
    </div>

    <!-- footer -->
    <my-footer class="my-footer"></my-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from 'components/common/Header'
  import IndexSwiper from 'components/index/swiper'
  import Advertisement from 'components/index/advertisement'
  import TradeTable from 'components/index/trade-table'
  import ServiceCenter from 'components/index/service-center'
  import FriendshipLink from 'components/index/friendshipLink'
  // import Multiplatform from 'components/index/multiplatform'
  import Footer from 'components/common/Footer'
  import { mapGetters } from 'vuex'

  export default {
    name: 'index',
    components: {
      'my-header': Header,
      'swiper': IndexSwiper,
      'advertisement': Advertisement,
      'trade-table': TradeTable,
      'service-center': ServiceCenter,
      // Multiplatform,
      'my-footer': Footer,
      FriendshipLink
    },
    data () {
      return {
        swiperSlide: [
          '../../static/images/swiper/banner_1.png',
          '../../static/images/swiper/banner_2.png',
          '../../static/images/swiper/banner_3.png'
        ]
      }
    },
    methods: {
      receivePageNow: function (pageNow, max) {
        console.log(pageNow)
        console.log(max)
      }
    },
    mounted () {
      // console.log(this.loginStatus,'index')
    },
    computed: {
      ...mapGetters([
        'loginStatus'
      ])
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable.styl"

  $color-b8c2e0 = #b8c2e0
  $color-181b2a = #181b2a
  $color-575c81 = #575c81

  .margin-bottom-60
    margin-bottom 60px
  .margin-bottom-40
    margin-bottom 40px
  .padding-left-60
    padding-left 60px
  .padding-right-60
    padding-right 60px
  .index
    background-color $color-main-bg
  /*主页特定header透明色*/
  .index-header /deep/ .header
    position absolute
    left 0
    top 0
    right 0
    z-index 2
    background-color transparent
  /deep/ .swiper-container-horizontal>.swiper-pagination-bullets
    bottom: 90px
  /deep/ .swiper-pagination-bullet
    display inline-block
    width initial
    height initial
    font-size 24px
    color #fff
    background none
    border-radius initial
    opacity 1
  /deep/ .swiper-pagination-bullet-active
    font-size 32px
    color #698cfe
  /deep/ .swiper-container-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet
    margin 0 30px
  .advertisement
    position absolute
    left 0
    right 0
    bottom 0
    z-index 1

  /* 马上交易 */
  .immediateTrading
    background $color-second-bg
    padding 80px 0
    text-align center
    // border-top: 1px solid $color-main-border
    h1
      color $color-main-font
      font-weight normal
    .text
      color $color-table-font-tips
      margin-top 42px
      margin-bottom 60px
    .sign
      border 1px solid $color-main-border
      color $color-table-font-tips
      width 248px
      height 60px
      border-radius 5px
      margin-right 60px
      &:hover
        background $color-btn-hover
        color white
    .register
      width 248px
      height 60px
      border-radius 5px
      color white
      background $color-btn
      &:hover
        background $color-btn-hover
</style>
