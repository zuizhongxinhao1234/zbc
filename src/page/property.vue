<template>
  <div>
    <!-- header -->
    <my-header></my-header>

    <!-- container -->
    <div class="container">
      <!-- 面包屑 -->
      <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item class="font-big">{{$t('property.property')}}</el-breadcrumb-item>
      </el-breadcrumb>

      <el-row :gutter="20">
        <el-col :span="5">
          <div class="menu">
            <!-- 侧栏导航 -->
            <router-link class="menu-item" active-class="current" to="/property/trade-account">{{$t('property.tradeAccount')}}</router-link>
            <router-link class="menu-item" active-class="current" to="/property/bestowed">{{$t('property.myInvite')}}</router-link>
          </div>
        </el-col>
        <el-col :span="19">
          <!-- 表格组件 -->
          <router-view></router-view>
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
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable.styl"

  .container
    width 1200px
    margin 0 auto 84px
    padding-top 20px
  //重置面包屑的样式
  .breadcrumb
    margin-bottom 20px
    line-height 54px
    padding 0 30px
    background-color $color-main-fill-bg
    border-radius 3px
  .menu
    min-height 320px
    padding 4px
    background-color $color-main-fill-bg
    border-radius 3px
  .menu-item
    display block
    padding 0 20px
    line-height 43px
    color $color-main-font
  .current
    color $color-btn
    background-color $color-main-bg
</style>
