<template>
  <div>
    <!-- header -->
    <my-header></my-header>

    <!-- container -->
    <div class="container">
      <!-- 面包屑 -->
      <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item class="font-big">{{$t('accountSafe.accountSafe')}}</el-breadcrumb-item>
      </el-breadcrumb>

      <!-- 基本信息 -->
      <div class="table-box baseInfo">
        <div class="table-head">
          <span>{{$t('accountSafe.baseInfo')}}</span>
        </div>
        <div class="table-container">
          <el-row class="table-row">
            <el-col class="table-title font-small" :span="4">{{$t('accountSafe.loginName')}}:</el-col>
            <el-col class="table-content font-small" :span="20">{{userInfo.phone}}</el-col>
          </el-row>
          <el-row class="table-row">
            <el-col class="table-title font-small" :span="4">UID:</el-col>
            <el-col class="table-content font-small" :span="20">{{userInfo.code}}</el-col>
          </el-row>
          <el-row class="table-row">
            <el-col class="table-title font-small" :span="4">{{$t('accountSafe.loginPwd')}}:</el-col>
            <el-col class="table-content font-small" :span="10">******</el-col>
            <el-col class="text-align-right" :span="10">
              <router-link class="line-height-40 link-btn" to="/change-password">{{$t('accountSafe.change')}}</router-link>
            </el-col>
          </el-row>
        </div>
      </div>

      <!--双重身份验证-->
      <div class="table-box identity-validate">
        <div class="table-head">
          <span>{{$t('accountSafe.identity')}}</span>
        </div>
        <div class="table-container">
          <el-row class="table-row">
            <el-col class="table-title font-small" :span="4">{{$t('accountSafe.safeLevel')}}:</el-col>
            <el-col class="table-content font-small" :span="6">
              <el-progress
                :show-text="false"
                :stroke-width="16"
                :percentage="userInfo.securityCount * 20||0"
                class="progress display-inline-block">
              </el-progress>
              <span class="table-content">{{userInfo.security}}</span>
            </el-col>
            <el-col class="table-title font-small" :span="14">{{$t('accountSafe.googleSuggest')}}</el-col>
          </el-row>
          <el-row class="table-row">
            <el-col :span="4">
                <i v-if="userInfo.isBindEmail" class="el-icon-success" style="color: #589065"></i>
                <i v-else class="el-icon-warning" style="color: #ae4e54"></i>
                <span class="table-title font-small">{{$t('accountSafe.email')}}:</span>
            </el-col>
            <el-col class="table-content font-small" :span="6">{{userInfo.email||'&nbsp;'}}</el-col>
            <el-col class="table-title font-small" :span="10">{{$t('accountSafe.useInstruction')}}</el-col>
            <el-col class="text-align-right" :span="4">
              <router-link v-if="userInfo.isBindEmail" class="line-height-40 link-btn" to="/change-email">{{$t('accountSafe.change')}}</router-link>
              <router-link v-else class="line-height-40 link-btn" to="/bind-email">{{$t('accountSafe.bind')}}</router-link>
            </el-col>
          </el-row>
          <el-row class="table-row">
            <el-col :span="4">
                <i v-if="userInfo.isBindPhone" class="el-icon-success" style="color: #589065"></i>
                <i v-else class="el-icon-warning" style="color: #ae4e54"></i>
                <span class="table-title font-small">{{$t('accountSafe.phone')}}:</span>
            </el-col>
            <el-col class="table-content font-small" :span="6">{{userInfo.phone||'&nbsp;'}}</el-col>
            <el-col class="table-title font-small" :span="10">{{$t('accountSafe.useInstruction')}}</el-col>
            <el-col class="text-align-right" :span="4">
              <router-link v-if="userInfo.isBindPhone" class="line-height-40 link-btn" to="/change-phone">{{$t('accountSafe.change')}}</router-link>
              <router-link v-else class="line-height-40 link-btn" to="/bind-phone">{{$t('accountSafe.bind')}}</router-link>
            </el-col>
          </el-row>
          <el-row class="table-row">
            <el-col :span="4">
                <i v-if="userInfo.isSetDealCode" class="el-icon-success" style="color: #589065"></i>
                <i v-else class="el-icon-warning" style="color: #ae4e54"></i>
                <span class="table-title font-small">{{$t('accountSafe.tradePwd')}}:</span>
            </el-col>
            <el-col class="table-content font-small" :span="6">******</el-col>
            <el-col class="table-title font-small" :span="10">{{$t('accountSafe.useInstruction_2')}}</el-col>
            <el-col class="text-align-right" :span="4">
              <router-link v-if="userInfo.isSetDealCode" class="line-height-40 link-btn" to="/change-deal">{{$t('accountSafe.change')}}</router-link>
              <router-link v-else class="line-height-40 link-btn" to="/bind-deal">{{$t('accountSafe.set')}}</router-link>
            </el-col>
          </el-row>
          <el-row class="table-row">
            <el-col :span="10">
                <i v-if="userInfo.isBindGoogle" class="el-icon-success" style="color: #589065"></i>
                <i v-else class="el-icon-warning" style="color: #ae4e54"></i>
                <span class="table-title font-small">{{$t('accountSafe.googleValidate')}}:</span>
            </el-col>
            <el-col class="table-title font-small" :span="10">{{$t('accountSafe.useInstruction')}}</el-col>
            <el-col class="text-align-right" :span="4">
              <router-link v-if="!userInfo.isBindGoogle" class="line-height-40 link-btn" to="/bind-google">{{$t('accountSafe.bind')}}</router-link>
            </el-col>
          </el-row>
        </div>
      </div>

      <!-- 登录历史 -->
      <div class="table-box loginHistory">
        <div class="table-head">
          <router-link active-class="current" to="/account-safe/login-history" class="link margin-right-30">{{$t('accountSafe.loginHistory')}}</router-link>
          <!-- <router-link active-class="current" to="/account-safe/set-history" class="link">安全设置历史</router-link> -->
        </div>
        <div class="table-container">
          <router-view></router-view>
        </div>
      </div>

    </div>

    <!-- footer -->
    <my-footer></my-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from 'components/common/Header'
  import Footer from 'components/common/Footer'
  import { mapGetters } from 'vuex'

  export default {
    name: 'Name',
    components: {
      'my-header': Header,
      'my-footer': Footer
    },
    computed: {
      ...mapGetters([
        `loginStatus`,
        `userInfo`
      ])
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable.styl"

  .margin-right-30
    margin-right 30px
  .line-height-40
    line-height 40px
  .container
    width 1200px
    margin 0 auto
    padding-top 20px
  //重置面包屑的样式
  .breadcrumb
    margin-bottom 20px
    line-height 54px
    padding 0 30px
    background-color $color-main-fill-bg
    border-radius 3px
  .table-box
    margin-bottom 20px
    background-color $color-main-fill-bg
  .table-head
    padding 0 26px
    line-height 42px
    color $color-main-font
    background-color $color-second-fill-bg
  .table-container
    padding 0 26px
    background-color $color-main-fill-bg
  .table-row
    border-bottom 1px solid #1f2943
    &:last-child
      border-bottom none
  .table-title
    line-height 40px
    color $color-table-font-head
  .table-content
    line-height 40px
    color $color-main-font
  .progress
    vertical-align text-top
    width 200px
  /deep/ .el-progress-bar__outer
    background-color #1e2235
    border-radius initial
  /deep/ .el-progress-bar__inner
    border-radius initial
  /deep/ .el-table
    background-color $color-main-fill-bg
  /deep/ .el-table thead
    color $color-table-font-head
  /deep/ .el-table tr,/deep/ .el-table th
    background-color $color-main-fill-bg
    border-bottom none
  /deep/ .el-table th:last-child,/deep/ .el-table td:last-child, /deep/ .el-table th:nth-last-child(2)
    text-align right
  /deep/ .el-table td
    border-bottom-color #1f2943
  /deep/ .el-table tr:last-child td
    border-bottom none
  /deep/ .el-table .border-top td
    border-top 10px solid #1f2943
  /deep/ .el-table__empty-block
    background-color $color-main-fill-bg
  /deep/ .el-table__empty-text
    color $color-main-font
  .link-btn
    color $color-btn
    &:hover
      color $color-btn-hover
    &:active
      color $color-btn
    &:foucs
      color $color-btn-hover
  .link
    color $color-main-font
  .current
    color $color-btn
  .subtitle
    color $color-table-font-head
  /deep/ .el-input-group__append
    color $color-btn
    &:hover
      color $color-btn-hover
    &:active
      color $color-btn
    &:foucs
      color $color-btn-hover
  .validate-btn
    width 120px
    color $color-btn
    outline none
    border none
    &:hover
      border none
  .sub-btn
    width 100%
</style>
