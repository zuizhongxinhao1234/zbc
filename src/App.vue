<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/index.styl"
  @import "~assets/stylus/variable.styl"

  #app
    min-width 1400px
    background-color $color-main-bg
</style>
