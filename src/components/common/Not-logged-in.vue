<template>
  <div class="not-logged-in-box">
    <router-link to="login" class="router-link">{{$t('notLoggedIn.login')}}</router-link>{{$t('notLoggedIn.or')}}<router-link class="router-link" to="register">{{$t('notLoggedIn.regist')}}</router-link>{{$t('notLoggedIn.startTrade')}}
  </div>
</template>

<script type="text/ecmascript-6">
  export default {

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable.styl"
  .not-logged-in-box
    background-color transparent
    padding 16px 0 16px 28px
</style>
