<template>
  <div>
    <!-- header -->
    <my-header></my-header>

    <!-- container -->
    <div class="container">
      <!-- 面包屑 -->
      <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item class="font-big">{{$t('about_page.menu')}}</el-breadcrumb-item>
      </el-breadcrumb>

      <el-row :gutter="20">
        <el-col :span="24">
            <div class="content">
              <div class="content-box">
                <h3>{{$t('about_page.about_title')}}</h3>
                <ul>
                  <li>
                    {{$t('about_page.about_info')}}
                  </li>
                </ul>
              </div>
              <div class="content-box">
                <h3>{{$t('about_page.guarantee_title')}}</h3>
                <ul>
                  <li>
                    {{$t('about_page.guarantee_major')}}
                  </li>
                  <li>
                    {{$t('about_page.guarantee_security')}}
                  </li>
                  <li>
                    {{$t('about_page.guarantee_user')}}
                  </li>
                </ul>
              </div>
              <div class="content-box">
                <h3>{{$t('about_page.idea_title')}}</h3>
                <ul>
                  <li>
                    {{$t('about_page.idea_info')}}
                  </li>
                </ul>
              </div>
            </div>
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

.content
  background $color-main-fill-bg
  border-radius 3px
  padding 30px 30px 10px 30px
  margin: 0 auto;
  min-height 400px
  .content-box
    padding 15px 0
    border-bottom 1px solid $color-main-border
    &:last-child
      border-bottom none
  h3
    color $color-main-font
    font-weight normal
    margin-bottom 15px
  ul
    list-style disc
  li
    color $color-second-font
    margin-left 20px
    margin-bottom 10px
</style>
