<template>
  <div>
    <!-- header -->
    <my-header></my-header>

    <!-- container -->
    <div class="container">
      <!-- 面包屑 -->
      <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/account-safe' }" class="font-big">{{$t('bindGoogle.accountSafe')}}</el-breadcrumb-item>
        <el-breadcrumb-item class="font-big">{{$t('bindGoogle.bindGoogleValidate')}}</el-breadcrumb-item>
      </el-breadcrumb>

      <!-- 绑定谷歌验证器(二维码部分) -->
      <el-row class="from-box">
        <el-col :span="24" class="from-head">
          <span class="head-title">{{$t('bindGoogle.bindGoogleValidate')}}</span>
          <i class="head-tips font-small iconfont icon-tishifill"></i>
          <span class="head-tips font-small">{{$t('bindGoogle.bindInstruction')}}</span>
        </el-col>

        <!-- 二维码部分 -->
        <el-col :span="12" :offset="6">
          <img class="img" src="../../assets/images/change-google/qrcode.png" alt="">
          <div class="text">
            <span>{{$t('bindGoogle.pwd')}}</span>
            <span class="grey">{{$t('bindGoogle.findInstruction')}}</span>
          </div>
          <div class="text">
            <span id="textCode">{{googleVerifyCode.secret}}</span>
            <el-button @click="copyText('textCode')" class="copy" type="text">{{$t('bindGoogle.copy')}}</el-button>
          </div>
        </el-col>

        <!-- 表单部分 -->
        <el-col :span="6" :offset="9">
          <el-form label-position="top" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
            <el-form-item :label="$t('bindGoogle.googleValidate')" prop="google">
              <el-input type="text" v-model="ruleForm.google" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-button :loading="loadingFlag" type="primary" @click="submitForm('ruleForm')" class="sub-btn">{{$t('bindGoogle.bind')}}</el-button>
            </el-form-item>
          </el-form>
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
  import {region} from 'common/region'
  import {copySpan} from 'common/copyText'
  import {_apiGetGoogleVerifyCode, _apiBindGoogleVerifyCode, _apiGetUserInfo} from 'api'
  import {testVerificationCode} from 'common/validate'
  import {mapMutations} from 'vuex'
  import {SET_USERINFO} from 'store/mutation-types'

  export default {
    name: 'Name',
    components: {
      'my-header': Header,
      'my-footer': Footer
    },
    data () {
      var validateVCode = (rule, value, callback) => {
        if (this.ruleForm.google === '') {
          callback(new Error(this.$t('bindGoogle.googleEmptyMessage')))
        }
        if (!testVerificationCode(value)) {
          this.timerFlag = false
          callback(new Error(this.$t('bindGoogle.googleConfirmMessage')))
        } else {
          callback()
        }
      }
      return {
        loadingFlag: false,
        googleVerifyCode: {
          code: '',
          secret: '',
          url: ''
        },
        ruleForm: { // 表单对象
          google: ''
        }, // 表单验证规则
        rules: {
          google: [
            { validator: validateVCode, trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
      // 生成区号数组对象
      regionList () {
        let arr = []
        for (let i in region) {
          arr[i] = {}
          arr[i].number = region[i].number
          arr[i].region = `00` + region[i].region
        }
        return arr
      }
    },
    async created () {
      let res = await _apiGetGoogleVerifyCode()
      if (res.statusCode === 200) {
        this.googleVerifyCode = res.data
      }
    },
    methods: {
      // 复制
      copyText (element) {
        copySpan(element)
      },
      // 提交修改
      submitForm (formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            this.loadingFlag = true
            try {
              let res = await _apiBindGoogleVerifyCode({
                googleVerifyCode: this.ruleForm.google,
                secret: this.googleVerifyCode.secret,
                url: this.googleVerifyCode.url
              })
              if (res.statusCode === 200) {
                _apiGetUserInfo().then((respones) => {
                  if (respones.statusCode === 200) {
                    this.setUserInfo(respones.data)
                    this.$router.push('/account-safe/login-history')
                  }
                })
                this.$message({
                  message: res.message,
                  type: 'success'
                })
                this.loadingFlag = false
              }
            } catch (error) {
              this.loadingFlag = false
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      ...mapMutations({
        setUserInfo: SET_USERINFO
      })
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable.styl"

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
  /deep/ .el-breadcrumb__inner.is-link
    font-weight initial
    color $color-btn
    &:hover
      color $color-btn-hover
    &:active
      color $color-btn
  .from-box
    margin-bottom 20px
    padding-bottom 30px
    background-color $color-main-fill-bg
    border-radius 3px
    overflow hidden
    .img
      margin 30px auto
    .text
      text-align center
    span
      color $color-main-font
      vertical-align middle
    .grey
      color $color-table-font-head
    .copy
      margin-left 20px
    .head-tips
      color $color-btn
  .from-head
    line-height 42px
    padding 0 30px
    background-color $color-second-fill-bg
  .head-title
    margin-right 20px
    color $color-main-font

  /deep/ .el-form--label-top .el-form-item__label
    padding 0
    font-size 12px
    color $color-table-font-head
  .areaCode
    width 120px
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
