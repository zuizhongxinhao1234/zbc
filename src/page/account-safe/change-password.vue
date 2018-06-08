<template>
  <div>
    <!-- header -->
    <my-header></my-header>

    <!-- container -->
    <div class="container">
      <!-- 面包屑 -->
      <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/account-safe' }" class="font-big">{{$t('changePassword.accountSafe')}}</el-breadcrumb-item>
        <el-breadcrumb-item class="font-big">{{$t('changePassword.changePassword')}}</el-breadcrumb-item>
      </el-breadcrumb>

      <!-- 修改密码 -->
      <el-row class="form-box">
        <el-col :span="24" class="from-head">
          <span class="head-title">{{$t('changePassword.changePassword')}}</span>
          <i class="head-tips font-small iconfont icon-tishifill"></i>
          <span class="head-tips font-small">{{$t('changePassword.passwordInstruction')}}</span>
        </el-col>
        <el-col :span="12" :offset="6">
          <el-form label-position="top" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
            <el-form-item :label="$t('changePassword.oldPassword')" prop="oldPwd">
              <el-input type="password" v-model="ruleForm.oldPwd" clearable></el-input>
            </el-form-item>
            <el-form-item :label="$t('changePassword.newPassword')" prop="newPwd">
              <el-input type="password" v-model="ruleForm.newPwd" clearable></el-input>
            </el-form-item>
            <el-form-item :label="$t('changePassword.confirmPassword')" prop="confirmPwd">
              <el-input type="password" v-model="ruleForm.confirmPwd" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-button :loading="btnLoadingFlag" type="primary" @click="submitForm('ruleForm')" class="sub-btn">{{$t('changePassword.change')}}</el-button>
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
  import {_apiUpdateLoginpassword} from 'api'

  export default {
    name: 'Name',
    components: {
      'my-header': Header,
      'my-footer': Footer
    },
    data () {
      var validateOldPwd = (rule, value, callback) => {
        if (!testPassword(value)) {
          callback(new Error('请输入正确的密码(长度在8到20位,由数字,大小写字母构成)！'))
        } else {
          callback()
        }
      }
      var validateNewPwd = (rule, value, callback) => {
        if (!testPassword(value)) {
          callback(new Error('请输入正确的密码(长度在8到20位,由数字,大小写字母构成)！'))
        } else {
          if (this.ruleForm.confirmPwd !== '') {
            this.$refs.ruleForm.validateField('confirmPwd')
          }
          callback()
        }
      }
      var validateConfirmPwd = (rule, value, callback) => {
        if (!testPassword(value)) {
          callback(new Error(this.$t('changePassword.pwdEmptyMessage')))
        } else if (value !== this.ruleForm.newPwd) {
          callback(new Error(this.$t('changePassword.pwdConfirmMessage')))
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
            { required: true, message: this.$t('changePassword.oldEmptyMessage'), trigger: 'blur' },
            { validator: validateOldPwd, trigger: 'blur' }
          ],
          newPwd: [
            { required: true, message: this.$t('changePassword.newEmptyMessage'), trigger: 'blur' },
            { validator: validateNewPwd, trigger: 'blur' }
          ],
          confirmPwd: [
            { required: true, message: this.$t('changePassword.confirmEmptyMessage'), trigger: 'blur' },
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
            _apiUpdateLoginpassword({
              oldPassword: this.ruleForm.oldPwd,
              newPassword: this.ruleForm.newPwd,
              reNewPassword: this.ruleForm.confirmPwd
            }).then((res) => {
              if (res.statusCode === 200) {
                this.$message({
                  message: res.message,
                  type: 'success'
                })
                this.$router.push('/account-safe/login-history')
              }
              this.btnLoadingFlag = false
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
