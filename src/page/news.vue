<template>
  <div class="page">
    <Header></Header>
    <div class="container">
      <!-- 面包屑 -->
      <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item class="font-big">{{$t('news.news')}}</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="content">
        <el-row>
          <el-col :span="24">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane :label="$t('news.notice')" name="notice" t="1"></el-tab-pane>
              <el-tab-pane :label="$t('news.introduce')" name="coin" t="2"></el-tab-pane>
              <el-tab-pane :label="$t('news.industry')" name="new" t="3"></el-tab-pane>
            </el-tabs>
          </el-col>
      </el-row>
      <router-view></router-view>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script type="text/ecmascript-6">
import Header from 'components/common/Header'
import Footer from 'components/common/Footer'

export default {
  data () {
    return {
      activeName: 'notice',
      activeType: '1'
    }
  },
  methods: {
    handleClick (tab, event) {
      this.$router.push(`/news/${tab.$attrs.t}`)
    }
  },
  created () {
    this.activeType = this.$route.params.t
    if (this.activeType === '1') {
      this.activeName = 'notice'
    }
    if (this.activeType === '2') {
      this.activeName = 'coin'
    }
    if (this.activeType === '3') {
      this.activeName = 'new'
    }
  },
  components: {
    Header,
    Footer
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~assets/stylus/variable.styl"
.container
    width 1200px
    margin 0 auto 84px
    padding-top 20px
  .content
    color $color-main-font
    border-radius 3px
    padding 10px 30px
    background-color $color-main-fill-bg
    min-height 400px
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
</style>
