<template>
  <div>
    <!-- header -->
    <my-header></my-header>

    <!-- container -->
    <div class="container">
      <!-- 面包屑 -->
      <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/account-safe' }" class="font-big">{{$t('changeDeal.accountSafe')}}</el-breadcrumb-item>
        <el-breadcrumb-item class="font-big">{{$t('changeDeal.changeDeal')}}</el-breadcrumb-item>
      </el-breadcrumb>

      <!-- 修改密码 -->
      <el-row class="form-box">
        <el-col :span="24" class="from-head">
          <span class="head-title">{{$t('changeDeal.changeDeal')}}</span>
          <i class="head-tips font-small iconfont icon-tishifill"></i>
          <span class="head-tips font-small">{{$t('changeDeal.dealInstruction')}}</span>
        </el-col>
        <el-col :span="12" :offset="6">
          <el-form label-position="top" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
            <el-form-item :label="$t('changeDeal.oldDeal')" prop="oldPwd">
              <el-input type="password" v-model="ruleForm.oldPwd" clearable></el-input>
            </el-form-item>
            <el-form-item :label="$t('changeDeal.newDeal')" prop="newPwd">
              <el-input type="password" v-model="ruleForm.newPwd" clearable></el-input>
            </el-form-item>
            <el-form-item :label="$t('changeDeal.confirmDeal')" prop="confirmPwd">
              <el-input type="password" v-model="ruleForm.confirmPwd" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-button :loading="btnLoadingFlag" type="primary" @click="submitForm('ruleForm')" class="sub-btn">{{$t('changeDeal.change')}}</el-button>
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
  import {_apiChangeDealCode} from 'api'

  export default {
    name: 'Name',
    components: {
      'my-header': Header,
      'my-footer': Footer
    },
    data () {
      var validateOldPwd = (rule, value, callback) => {
        if (!testPassword(value)) {
          callback(new Error(this.$t('changeDeal.pwdEmptyMessage')))
        } else {
          callback()
        }
      }
      var validateNewPwd = (rule, value, callback) => {
        if (!testPassword(value)) {
          callback(new Error(this.$t('changeDeal.pwdEmptyMessage')))
        } else {
          if (this.ruleForm.confirmPwd !== '') {
            this.$refs.ruleForm.validateField('confirmPwd')
          }
          callback()
        }
      }
      var validateConfirmPwd = (rule, value, callback) => {
        if (!testPassword(value)) {
          callback(new Error(this.$t('changeDeal.pwdEmptyMessage')))
        } else if (value !== this.ruleForm.newPwd) {
          callback(new Error(this.$t('changeDeal.pwdConfirmMessage')))
        } else {
          callback()
        }
      }
      return {
        btnLoadingFlag: false,
        ruleForm: {
          oldPwd: '',
          newPwd: '',
          confirmPwd: ''
        },
        rules: {
          oldPwd: [
            { required: true, message: this.$t('changeDeal.oldEmptyMessage'), trigger: 'blur' },
            { validator: validateOldPwd, trigger: 'blur' }
          ],
          newPwd: [
            { required: true, message: this.$t('changeDeal.newEmptyMessage'), trigger: 'blur' },
            { validator: validateNewPwd, trigger: 'blur' }
          ],
          confirmPwd: [
            { required: true, message: this.$t('changeDeal.confirmEmptyMessage'), trigger: 'blur' },
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
            _apiChangeDealCode({
              oldPassword: this.ruleForm.oldPwd,
              newPassword: this.ruleForm.newPwd,
              reNewPassword: this.ruleForm.confirmPwd
            }).then((res) => {
              if (res.statusCode === 200) {
                this.$message({
                  message: res.message,
                  type: 'success'
                })
              }
              this.btnLoadingFlag = false
              this.$router.push('/account-safe/login-history')
            }).catch(() => {
              this.btnLoadingFlag = false
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
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
