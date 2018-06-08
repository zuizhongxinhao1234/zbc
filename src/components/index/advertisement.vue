<template>
  <div>
    <div class="advertisement-box">
      <router-link class="advertisement" to="/">{{$t('advertisement.top100')}}</router-link>
      <span class="line">/</span>
      <router-link class="advertisement" to="/">{{$t('advertisement.report')}}</router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'Name'
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  $color-fff = #fff
  $color-b8c2e0 = #b8c2e0
  $color-698cfe = #698cfe

  router-link
    color $color-fff
  .advertisement-box
    line-height 80px
    text-align center
    background-color rgba(38,42,66,.3)
  .advertisement
    color $color-b8c2e0
    &:hover
      color $color-698cfe
  .line
    margin 0 54px
    color $color-b8c2e0
</style>
