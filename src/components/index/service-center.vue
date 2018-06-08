<template>
  <div>
    <div class="service-center padding-top-140px">
      <div class="service-country margin-bottom-70 font-biggest">{{$t('serviceCenter.country')}}</div>
      <div class="service-explain margin-bottom-70">
        <span class="position-relative display-inline-block font-big">{{$t('serviceCenter.instruction')}}</span>
      </div>
      <img class="service-center-img" src="../../assets/images/service-center/korea.png" alt="">
      <img class="service-center-img" src="../../assets/images/service-center/thailand.png" alt="">
      <img class="service-center-img" src="../../assets/images/service-center/cambodia.png" alt="">
      <img class="service-center-img" src="../../assets/images/service-center/malaysia.png" alt="">
      <img class="service-center-img" src="../../assets/images/service-center/japan.png" alt="">
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

  .margin-bottom-70
    margin-bottom 70px
  .padding-top-140px
    padding-top 140px
  .service-center
    text-align center
    background-image url("../../assets/images/service-center/background.png")
    background-repeat no-repeat
    background-size auto 100%
    background-position center
    padding-bottom 80px
  .service-country
    text-align center
    color $color-main-font
  .service-explain
    position relative
    text-align center
    span
      position relative
      color $color-table-font-tips
      margin 0 53px
    &:before,&:after
      vertical-align middle
      display inline-block
      z-index 1
      content ''
      width 360px
      height 1px
      background-color $color-table-font-tips
  .service-center-img
    display inline-block
    margin-right 16px
    &:last-child
      margin-right 0
</style>
