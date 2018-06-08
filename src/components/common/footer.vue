<template>
  <div>
    <div class="footer-box">
      <ul class="footer clear-both">
        <li class="items-box float-left position-relative">
          <div class="items font-small">{{$t('footer.serviceSupport')}}</div>
          <div class="item-box">
            <ul>
              <!-- <li>
                <router-link class="item " to="/">{{$t('footer.apiDocument')}}</router-link>
              </li> -->
              <li>
                <router-link class="item " to="/">{{$t('footer.help')}}</router-link>
              </li>
              <li>
                <router-link class="item " to="/news/2">{{$t('footer.assetIntroduce')}}</router-link>
              </li>
            </ul>
          </div>
        </li>
        <li class="items-box float-left position-relative">
          <div class="display-inline-block text-align-left">
            <div class="items font-small">{{$t('footer.about')}}</div>
            <div class="item-box">
              <ul>
                <li>
                  <router-link class="item " to="/apply">{{$t('footer.applyAndDescribe')}}</router-link>
                </li>
                <li>
                  <router-link class="item " to="/news/1">{{$t('footer.notice')}}</router-link>
                </li>
                <li>
                  <router-link class="item " to="/aboutUs">{{$t('footer.aboutUs')}}</router-link>
                </li>
              </ul>
            </div>
          </div>
        </li>
        <li class="items-box float-left position-relative">
          <div class="display-inline-block text-align-left">
            <div class="items font-small">{{$t('footer.stipulation')}}</div>
            <div class="item-box">
              <ul>
                <li>
                  <router-link class="item " to="/rate/trade">{{$t('footer.rate')}}</router-link>
                </li>
                <!-- <li>
                  <router-link class="item " to="/law">{{$t('footer.userProtocol')}}</router-link>
                </li>
                <li>
                  <router-link class="item " to="/law">{{$t('footer.privacyClause')}}</router-link>
                </li> -->
                <li>
                  <router-link class="item " to="/law">{{$t('footer.legalDeclaration')}}</router-link>
                </li>
              </ul>
            </div>
          </div>
        </li>
        <li class="items-box float-left clear-both position-relative" style="padding-left:20px">
          <div class="float-right">
            <div class="items font-small">{{$t('footer.contactUs')}}</div>
            <div class="item-box">
              <ul>
                <li>
                  <!-- <router-link class="item " to="/">{{$t('footer.email')}}</router-link> -->
                  <p class="textUs">
                    {{$t('footer.emailSupportInstruction')}}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'Name'
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable.styl"

  .footer-box
    padding 80px 0
    background-color $color-footer-bg
  .footer
    width 1200px
    margin 0 auto
  .items-box
    &:after
      position absolute
      top 40px
      right 0
      z-index 1
      display block
      content ''
      width 1px
      height 112px
      background-color $color-footer-line
    &:first-child
      width 230px
    &:nth-child(2),
    &:nth-child(3)
      width 330px
      text-align center
    &:last-child
      width 300px
      &:after
        height 0
  .items
    margin-bottom 7px
    color $color-footer-title
  .item-box
    padding-top 7px
  .item
    line-height 38px
    color $color-footer-link
    &:hover
      color $color-btn
  .textUs
    line-height 38px
    color $color-footer-link
</style>
