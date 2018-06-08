<template>
  <div>
    <!-- header -->
    <my-header></my-header>

    <!-- container -->
    <div class="container">
      <!-- 面包屑 -->
      <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/account-safe' }" class="font-big">{{$t('bindEmail.accountSafe')}}</el-breadcrumb-item>
        <el-breadcrumb-item class="font-big">{{$t('bindEmail.bindEmail')}}</el-breadcrumb-item>
      </el-breadcrumb>

      <!-- 绑定邮箱 -->
      <el-row class="form-box">
        <el-col :span="24" class="from-head">
          <span class="head-title">{{$t('bindEmail.bindEmail')}}</span>
          <span class="head-tips font-small">{{$t('bindEmail.bindEmailMessage')}}</span>
        </el-col>
        <el-col :span="12" :offset="6">
          <el-form label-position="top" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
            <el-form-item :label="$t('bindEmail.email')" prop="email">
              <el-input type="email" v-model="ruleForm.email" clearable></el-input>
            </el-form-item>
            <el-form-item :label="$t('bindEmail.emailValidate')" prop="validateCode">
              <span class="right-label font-small">{{$t('bindEmail.emailValidateMessage')}}</span>
              <el-input type="text" v-model="ruleForm.validateCode" clearable>
                <el-button :loading="verificationCodeFlag" :disabled="disabledBtn" @click="sendValidate" class="validate-btn" type="text" slot="append">
                  {{$t('bindEmail.getEmailValidate')}}<span v-show="disabledBtn" class="disabledBtn">({{timer}})</span>
                </el-button>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button :loading="bingLoadingFlag" type="primary" @click="submitForm('ruleForm')" class="sub-btn">{{$t('bindEmail.bind')}}</el-button>
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
  import {testEmail} from 'common/validate'
  import {_apiSendSMSemail, _apiVerificationEmailNums, _apiBindEmail, _apiGetUserInfo} from 'api'
  import {mapMutations} from 'vuex'
  import {SET_USERINFO} from 'store/mutation-types'

  export default {
    name: 'Name',
    components: {
      'my-header': Header,
      'my-footer': Footer
    },
    data () {
      var validateEmail = (rule, value, callback) => {
        if (!testEmail(value)) {
          this.timerFlag = false
          callback(new Error(this.$t('bindEmail.emailConfirmMessage')))
        } else {
          let req = {email: this.ruleForm.email}
          _apiVerificationEmailNums(req).then((res) => {
            if (res.statusCode === 200) {
              this.timerFlag = true
              callback()
            } else {
              this.timerFlag = false
              callback(new Error(res.message))
            }
          })
        }
      }
      return {
        timerFlag: false, // 获取验证码条件
        verificationCodeFlag: false, // 验证码loading状态
        timer: 0, // 验证码倒计时
        disabledBtn: false, // 短信验证码按钮倒计时状态
        bingLoadingFlag: false, // 绑定按钮loading状态
        ruleForm: {
          email: '',
          validateCode: ''
        },
        rules: {
          email: [
            { required: true, message: this.$t('bindEmail.emailEmptyMessage'), trigger: 'blur' },
            { validator: validateEmail, trigger: 'blur' }
          ],
          validateCode: [
            { required: true, message: this.$t('bindEmail.validateEmptyMessage'), trigger: 'blur' }
          ]
        }
      }
    },
    beforeRouteLeave (to, from, next) {
      this.timeInterval && clearInterval(this.timeInterval)
      next()
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.bingLoadingFlag = true
            _apiBindEmail({
              emailName: this.ruleForm.email,
              smsCode: this.ruleForm.validateCode
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
              this.bingLoadingFlag = false
            }).catch(() => {
              this.bingLoadingFlag = false
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },

      // 发送验证码
      sendValidate () {
        this.$refs.ruleForm.validateField('email')
        if (this.timerFlag) {
          this.verificationCodeFlag = true
          _apiSendSMSemail({
            email: this.ruleForm.email
          }).then((res) => {
            if (res.statusCode === 200) {
              this.disabledBtn = true
              this.interval()
              this.$message({
                message: res.message,
                type: 'success'
              })
            }
            this.verificationCodeFlag = false
          }).catch((err) => {
            console.log(err)
            this.verificationCodeFlag = false
          })
        }
      },
      // 验证码倒计时
      interval () {
        this.timer = 60
        this.timeInterval = setInterval(() => {
          this.timer--
          if (this.timer <= 0) {
            clearInterval(this.timeInterval)
            this.disabledBtn = false
          }
        }, 1000)
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
  .form-box
    margin-bottom 50px
    padding-bottom 100px
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
  .right-label
    position absolute
    top -100%
    right 0
    z-index 1
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
