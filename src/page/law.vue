<template>
  <div>
    <!-- header -->
    <my-header></my-header>

    <!-- container -->
    <div class="container">
      <!-- 面包屑 -->
      <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item class="font-big">{{$t('law.lawNotice')}}</el-breadcrumb-item>
      </el-breadcrumb>

      <el-row :gutter="20">
        <el-col :span="24">
          <div class="content">
            <div class="title">
              <div class="left-line"></div>
              <p>{{$t("law_page.1")}}</p>
              <div class="right-line"></div>
            </div>
            <div class="tips">
              <p>{{$t("law_page.2")}}</p>
              <p>
                {{$t("law_page.3")}}
              </p>
            </div>
            <div class="item">
              <p>{{$t("law_page.4")}}</p>
              <p>{{$t("law_page.5")}}</p>
              <p>{{$t("law_page.6")}}</p>
              <p>{{$t("law_page.7")}}</p>
            </div>
            <div class="item item1">
              <div class="title">
                {{$t("law_page.8")}}
              </div>
              <p>{{$t("law_page.9")}}</p>
              <p>{{$t("law_page.10")}}</p>
              <p>{{$t("law_page.11")}}</p>
              <p>{{$t("law_page.12")}}</p>
              <p>{{$t("law_page.13")}}</p>
              <p>{{$t("law_page.14")}}</p>
              <p>{{$t("law_page.15")}}</p>
              <p>{{$t("law_page.16")}}</p>
              <p>{{$t("law_page.17")}}</p>
              <p>{{$t("law_page.18")}}</p>
              <p>{{$t("law_page.19")}}</p>
            </div>
            <div class="item item2">
              <div class="title">
                {{$t("law_page.20")}}
              </div>
              <p>
                {{$t("law_page.21")}}
              </p>
              <p>
                {{$t("law_page.22")}}
              </p>
              <p>
                {{$t("law_page.23")}}
              </p>
              <p>
                {{$t("law_page.24")}}
              </p>
              <p>
                {{$t("law_page.25")}}
              </p>
            </div>
            <div class="item item1">
              <div class="title">
                {{$t("law_page.26")}}
              </div>
              <p>
                {{$t("law_page.27")}}
              </p>
              <p>
                {{$t("law_page.28")}}
              </p>
            </div>
            <div class="item item2">
              <div class="title">
                {{$t("law_page.29")}}
              </div>
              <p>
                {{$t("law_page.30")}}{{$t("law_page.31")}}
              </p>
              <p>{{$t("law_page.32")}}</p>
              <p>
                {{$t("law_page.33")}}
              </p>
              <p>
                {{$t("law_page.34")}}
              </p>
              <p>
                {{$t("law_page.35")}}
              </p>
              <p>
                {{$t("law_page.36")}}
              </p>
              <p>
                {{$t("law_page.37")}}
              </p>
              <p>
                {{$t("law_page.38")}}
              </p>
              <p>
                {{$t("law_page.39")}}
              </p>
            </div>
            <div class="item item1">
              <div class="title">
                {{$t("law_page.40")}}
              </div>
              <p>
                {{$t("law_page.41")}}
              </p>
              <p>
                {{$t("law_page.42")}}
              </p>
              <p>
                {{$t("law_page.43")}}{{$t("law_page.44")}}
              </p>
              <p>
                {{$t("law_page.45")}}
              </p>
              <p>
                {{$t("law_page.46")}}
              </p>
              <p>
                {{$t("law_page.47")}}
              </p>
            </div>
            <div class="item item2">
              <div class="title">
                {{$t("law_page.48")}}
              </div>
              <p>
                {{$t("law_page.49")}}
              </p>
            </div>
            <div class="item item1">
              <div class="title">
                {{$t("law_page.50")}}
              </div>
              <p>
                {{$t("law_page.51")}}
              </p>
              <p>
                {{$t("law_page.52")}}
              </p>
              <p>
                {{$t("law_page.53")}}
              </p>
              <p>
                {{$t("law_page.54")}}
              </p>
              <p>
                {{$t("law_page.55")}}
              </p>
              <p>
                {{$t("law_page.56")}}
              </p>
            </div>
            <div class="item item2">
              <div class="title">
                {{$t("law_page.57")}}
              </div>
              <p>
                {{$t("law_page.58")}}
              </p>
              <p>
                {{$t("law_page.59")}}
              </p>
              <p>
                {{$t("law_page.60")}}
              </p>
              <p>
                {{$t("law_page.61")}}
              </p>
              <p>
                {{$t("law_page.62")}}
              </p>
              <p>
                {{$t("law_page.63")}}
              </p>
              <p>
                {{$t("law_page.64")}}
              </p>
              <p>
                {{$t("law_page.65")}}
              </p>
              <p>
                {{$t("law_page.66")}}
              </p>
              <p>
                {{$t("law_page.67")}}
              </p>
              <p>
                {{$t("law_page.68")}}
              </p>
              <p>
                {{$t("law_page.69")}}
              </p>
              <p>
                {{$t("law_page.70")}}
              </p>
            </div>
            <div class="item item1">
              <div class="title">
                {{$t("law_page.71")}}
              </div>
              <p>
                {{$t("law_page.72")}}
              </p>
              <p>
                {{$t("law_page.73")}}
              </p>
            </div>
            <div class="item item2">
              <div class="title">
                {{$t("law_page.74")}}
              </div>
              <p>
                {{$t("law_page.75")}}
              </p>
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
  color $color-second-font
  margin: 0 auto;
  .title{
    // overflow: hidden;
    // padding-top: 50px;
    .left-line,.right-line{
      float: left;
      margin-top: 6px;
      width: 40%;
      height: 12px;
      border-top: 1px solid $color-second-font;
      border-bottom: 1px solid $color-second-font;
    }
    p{
      float: left;
      width: 20%;
      text-align: center;
      font-size: 18px;
    }
  }
  .tips{
    margin-top: 40px;
    padding: 0 200px;
    p:first-child{
      text-align: center;
    }
    p:last-child{
      margin-top: 12px;
    }
  }
  .item{
    position: relative;
    padding: 40px 30px;
    border: 1px solid $color-main-border;
    border-radius: 5px;
    margin: 60px 0;
    p{
      margin-top: 6px;
    }
    .title{
      position: absolute;
      width: 140px;
      height: 40px;
      background-color: $color-main-border;
      border-radius: 40px;
      text-align: center;
      line-height: 40px;
      top: -20px;
    }
  }
  .item1 .title{
    left: -20px;
  }
  .item2 .title{
    right: -20px;
  }
</style>
