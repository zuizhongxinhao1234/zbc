<template>
  <div>
    <!-- header -->
    <my-header></my-header>

    <!-- container -->
    <div class="container">
      <!-- 面包屑 -->
      <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/account-safe' }" class="font-big">{{$t('bindDeal.accountSafe')}}</el-breadcrumb-item>
        <el-breadcrumb-item class="font-big">{{$t('bindDeal.setPwd')}}</el-breadcrumb-item>
      </el-breadcrumb>

      <!-- 修改密码 -->
      <el-row class="form-box">
        <el-col :span="24" class="from-head">
          <span class="head-title">{{$t('bindDeal.setPwd')}}</span>
        </el-col>
        <el-col :span="12" :offset="6">
          <el-form label-position="top" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
            <el-form-item :label="$t('bindDeal.setPwd')" prop="newPwd">
              <el-input type="password" v-model="ruleForm.newPwd" clearable></el-input>
            </el-form-item>
            <el-form-item :label="$t('bindDeal.confirmPwd')" prop="confirmPwd">
              <el-input type="password" v-model="ruleForm.confirmPwd" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-button :loading="btnLoadingFlag" type="primary" @click="submitForm('ruleForm')" class="sub-btn">{{$t('bindDeal.change')}}</el-button>
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
  import {testPassword} from 'common/validate'
  import {_apiSetDealCode, _apiGetUserInfo} from 'api'
  import {mapMutations} from 'vuex'
  import {SET_USERINFO} from 'store/mutation-types'

  export default {
    name: 'Name',
    components: {
      'my-header': Header,
      'my-footer': Footer
    },
    data () {
      var validateNewPwd = (rule, value, callback) => {
        if (!testPassword(value)) {
          callback(new Error(this.$t('bindDeal.pwdEmptyMessage')))
        } else {
          if (this.ruleForm.confirmPwd !== '') {
            this.$refs.ruleForm.validateField('confirmPwd')
          }
          callback()
        }
      }
      var validateConfirmPwd = (rule, value, callback) => {
        if (!testPassword(value)) {
          callback(new Error(this.$t('bindDeal.pwdEmptyMessage')))
        } else if (value !== this.ruleForm.newPwd) {
          callback(new Error(this.$t('bindDeal.pwdConfirmMessage')))
        } else {
          callback()
        }
      }
      return {
        loadingSMS: false,
        btnLoadingFlag: false,
        ruleForm: {
          newPwd: '',
          confirmPwd: ''
        },
        rules: {
          newPwd: [
            { required: true, message: this.$t('bindDeal.dealEmptyMessage'), trigger: 'blur' },
            { validator: validateNewPwd, trigger: 'blur' }
          ],
          confirmPwd: [
            { required: true, message: this.$t('bindDeal.dealConfirmMessage'), trigger: 'blur' },
            { validator: validateConfirmPwd, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      // 提交修改
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.btnLoadingFlag = true
            _apiSetDealCode({
              dealCode: this.ruleForm.newPwd,
              reDealCode: this.ruleForm.confirmPwd
            }).then((res) => {
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
              }
              this.btnLoadingFlag = false
            }).catch(() => {
              this.btnLoadingFlag = false
            })
          } else {
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
    min-height 600px
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
  .form-box
    margin-bottom 50px
    padding-bottom 50px
    background-color $color-main-fill-bg
    border-radius 3px
    overflow hidden
  .from-head
    line-height 42px
    padding 0 30px
    background-color $color-second-fill-bg
  .head-title
    margin-right 20px
    color $color-main-font
  .head-tips
    color $color-btn
  /deep/ .el-form--label-top .el-form-item__label
    padding 0
    font-size 12px
    color $color-table-font-head
  .sub-btn
    width 100%
</style>
