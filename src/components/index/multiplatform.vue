<template>
  <div>
    <div class="multiplatform-box">
      <h1 class="font-more-big">{{$t('multiplatform.title')}}</h1>
      <div class="text font-big">{{$t('multiplatform.text')}}</div>
      <div class="warp-download">
        <div>
          <button class="ios">{{$t('multiplatform.ios')}}</button>
        </div>
        <div>
          <button class="android">{{$t('multiplatform.android')}}</button>
        </div>
        <div>
          <button class="windows">{{$t('multiplatform.windows')}}</button>
        </div>
        <div>
          <button class="mac">{{$t('multiplatform.mac')}}</button>
        </div>
        <div>
          <span class="sys">{{$t('multiplatform.sys')}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable.styl"
  @import "~assets/stylus/mixin.styl"

  .multiplatform-box
    padding 90px
    text-align center
    color $color-main-font
    background-image('../../assets/images/multiplatform/wrap_download.ff64cd4.png')
    h1
      font-weight normal
    .text
      color $color-table-font-tips
      margin-top 42px
      margin-bottom 80px
    .warp-download
      div
        position relative
        display inline-block
        padding-top 165px
        button
          border 1px solid $color-main-border
          color $color-table-font-tips
          height 35px
          padding 0 25px
          border-radius 25px
          display inline-block
          &:hover
            background $color-btn
            color white
        .ios
          width 160px
        .android
          width 130px
          margin-left 55px
        .windows
          width 140px
          margin-left 108px
        .mac
          width 140px
          margin-left 140px
        .sys
          width 140px
          margin-left 100px
          color $color-table-font-tips
          height 35px
          line-height 35px
          display inline-block
          vertical-align middle



</style>
