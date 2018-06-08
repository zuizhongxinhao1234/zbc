<template>
  <div>
    <my-header ref="header_box"></my-header>

    <div class="position-relative" ref="rigister_box">
      <div class="register" ref="login_content">
        <div class="title font-more-biggest">{{$t('register.title')}}</div>
        <ul class="tab">
          <li :class="active===1?'active':''" @click="tabActive(1)" class="tab-first font-big">{{$t('register.phoneTab')}}</li>
          <li :class="active===2?'active':''" @click="tabActive(2)" class="font-big">{{$t('register.emailTab')}}</li>
        </ul>
        <div class="display-inline-block content">
          <el-form :model="ruleForm"
                   label-position="top"
                   :rules="rules"
                   ref="ruleForm"
                   label-width="100px"
                   class="demo-ruleForm">
            <!-- 手机 -->
            <el-form-item v-if="active===1" :label="$t('register.phoneNumber')" prop="phoneNumber">
              <el-input v-loading="verificationLoadingFlag" v-model="ruleForm.phoneNumber" clearable class="input-with-select">
                <el-select @change="areaCodeBlur" class="areaCode" v-model="ruleForm.areaCode" slot="prepend" filterable :placeholder="$t('register.placeholder')">
                  <el-option
                    v-for="(item,index) in regionList"
                    :key="index"
                    :label="'+'+item.region"
                    :value="item.region">
                    <div class="areaCodeItem">
                      <span class="float-left">{{'+'+item.region}}</span>
                      <span class="float-right font-small">{{item.number}}</span>
                    </div>
                  </el-option>
                </el-select>
              </el-input>
            </el-form-item>
            <!-- 邮箱 -->
            <el-form-item v-if="active===2" :label="$t('register.emailAddress')" prop="emailAddress">
              <el-input v-model="ruleForm.emailAddress" v-loading="verificationLoadingFlag" clearable></el-input>
            </el-form-item>
            <!-- 验证码 -->
            <el-form-item
              :label="active===2?$t('register.emailVerificationCode'):$t('register.phoneVerificationCode')"
              prop="verificationCode">
              <el-input v-model="ruleForm.verificationCode" clearable>
                <el-button class="verificationCode-btn" :loading="verificationCodeFlag" :disabled="disabledBtn" slot="append" @click="getVerificationCode">
                  {{$t('register.getVerificationCode')}}
                  <span v-show="disabledBtn" class="disabledBtn">({{timer}})</span>
                </el-button>
              </el-input>
            </el-form-item>
            <!-- 登录密码 -->
            <el-form-item :label="$t('register.signPassword')" prop="signPassword">
              <el-input type="password" v-model="ruleForm.signPassword" clearable></el-input>
            </el-form-item>
            <!-- 确认密码 -->
            <el-form-item :label="$t('register.confirmPassword')" prop="confirmPassword">
              <el-input type="password" v-model="ruleForm.confirmPassword" clearable></el-input>
            </el-form-item>
            <!-- 邀请码 -->
            <el-form-item :label="$t('register.invitationCode')" prop="invitationCode">
              <el-input v-model="ruleForm.invitationCode" clearable></el-input>
            </el-form-item>


            <el-form-item>
              <el-button
                type="primary"
                class="registerBtn font-big"
                :loading="registerDisabled"
                @keyup.enter="submitForm('ruleForm')"
                @click="submitForm('ruleForm')">
                {{registerDisabled?$t('register.registing'):$t('register.register')}}
              </el-button>

              <span class="ss">{{$t('register.thirty')}}</span>
              <router-link to="/login" class="goSign">{{$t('register.goSign')}}</router-link>
            </el-form-item>
          </el-form>

        </div>

        <ul class="display-inline-block message">
          <li>{{$t('register.message1')}}</li>
          <li>{{$t('register.message2')}}</li>
          <li>{{$t('register.message3')}}</li>
          <li>{{$t('register.message4')}}</li>
        </ul>

      </div>
    </div>

    <Footer ref="footer_box"></Footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from 'components/common/Header'
  import Footer from 'components/common/Footer'
  import {region} from 'common/region'
  import {_apiVerificationPhoneNum, _apiVerificationEmailNums, _apiSendSMSemail, _apiSendSMSphone, _apiRegisterUser} from 'api/index'
  import {testPhone, testEmail, testPassword} from 'common/validate'

  const minHeaderFooter = 80 // 内容与header、footer最小间距和

  export default {
    name: 'Name',
    data () {
      const validatePhone = (rule, value, callback) => {
        if (this.active === 1) {
          if (testPhone(value)) {
            if (this.ruleForm.areaCode) {
              let req = {phoneNum: this.ruleForm.phoneNumber}
              this.verificationLoadingFlag = true
              _apiVerificationPhoneNum(req).then((res) => {
                if (res.statusCode === 200) {
                  if (!res.data) {
                    this.timerFlag = true
                    callback()
                  } else {
                    this.registerDisabled = false
                    this.timerFlag = false
                    callback(new Error(this.$t('register.userErrorMessage')))
                  }
                } else {
                  this.registerDisabled = false
                  this.timerFlag = false
                }
                this.verificationLoadingFlag = false
              }).catch(() => {
                this.verificationLoadingFlag = false
              })
            } else {
              this.timerFlag = false
              callback(new Error(this.$t('register.areaEmptyMessage')))
            }
          } else {
            callback(new Error(this.$t('register.phoneConfirmMessage')))
            this.timerFlag = false
          }
        } else {
          callback()
        }
      }
      const validateEmail = (rule, value, callback) => {
        if (this.active === 2) {
          if (testEmail(value)) {
            let req = {email: this.ruleForm.emailAddress}
            this.verificationLoadingFlag = true
            _apiVerificationEmailNums(req).then((res) => {
              if (res.statusCode === 200) {
                if (!res.data) {
                  this.timerFlag = true
                  callback()
                } else {
                  this.timerFlag = false
                  callback(new Error(res.message))
                }
              } else {
                this.timerFlag = false
              }
              this.verificationLoadingFlag = false
            }).catch(() => {
              this.verificationLoadingFlag = false
            })
          } else {
            callback(new Error(this.$t('register.emailConfirmMessage')))
            this.timerFlag = false
          }
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (!testPassword(value)) {
          callback(new Error(this.$t('register.pwdRegMessage')))
        } else {
          if (this.ruleForm.confirmPassword !== '') {
            this.$refs.ruleForm.validateField('confirmPassword')
          }
          callback()
        }
      }
      const validateConfirmPassword = (rule, value, callback) => {
        if (value !== this.ruleForm.signPassword) {
          callback(new Error(this.$t('register.pwdConfirmMessage')))
        } else {
          callback()
        }
      }

      return {
        active: 1, // 1:手机注册，2:邮箱注册
        disabledBtn: false, // 短信验证码按钮倒计时状态
        timerFlag: false, // 获取验证码条件
        verificationCodeFlag: false, // 验证码loading状态
        timer: 0, // 验证码倒计时
        registerDisabled: false, // 注册按钮loading状态
        verificationLoadingFlag: false, // 验证手机或邮箱是否存在loading状态
        ruleForm: {
          phoneNumber: '', // 手机号
          areaCode: '', // 区号
          emailAddress: '', // 邮箱
          verificationCode: '', // 验证码
          signPassword: '', // 登录密码
          confirmPassword: '', // 确认密码
          invitationCode: '' // 邀请码
        },
        rules: {
          phoneNumber: [
            { required: true, message: this.$t('register.phoneEmptyMessage'), trigger: 'blur' },
            { validator: validatePhone, trigger: 'blur' }
          ],
          emailAddress: [
            { required: true, message: this.$t('register.emaiEmptyMessage'), trigger: 'blur' },
            { validator: validateEmail, trigger: 'blur' }
          ],
          verificationCode: [
            { required: true, message: this.$t('register.validateEmptyMessage'), trigger: 'blur' }
          ],
          signPassword: [
            { required: true, message: this.$t('register.pwdEmptyMessage'), trigger: 'blur' },
            { validator: validatePassword, trigger: 'blur' }
          ],
          confirmPassword: [
            { required: true, message: this.$t('register.rePwdEmptyMessage'), trigger: 'blur' },
            { validator: validateConfirmPassword, trigger: 'blur' }
          ]
        },
        regionList: []
      }
    },
    beforeRouteLeave (to, from, next) {
      window.removeEventListener('resize', this.refresh)
      this.timeInterval && clearInterval(this.timeInterval)
      next()
    },
    mounted () {
      this.refresh()
      window.addEventListener('resize', this.refresh)
      this.regionList = region
    },
    methods: {
      areaCodeBlur () {
        this.$refs.ruleForm.validateField('phoneNumber')
      },
      // 重置表单
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      // 注册事件
      submitForm (formName) {
        this.registerDisabled = true
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this._registerUser()
          } else {
            this.registerDisabled = false
            return false
          }
        })
      },
      // 注册请求
      _registerUser () {
        let req = {
          type: this.active,
          areaCode: this.ruleForm.areaCode,
          login: this.active === 1 ? this.ruleForm.phoneNumber : this.ruleForm.emailAddress,
          mscode: this.ruleForm.verificationCode,
          password: this.ruleForm.signPassword,
          confirmPassword: this.ruleForm.confirmPassword, // 此处需要后台再做一次二次密码验证 字段待定
          shareId: this.$route.query.shareId ? this.$route.query.shareId : ''
        }
        _apiRegisterUser(req).then((res) => {
          if (res.statusCode === 200) {
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.$router.push({ path: '/login' })
          } else {
            this.registerDisabled = false
          }
        }).catch(() => {
          this.registerDisabled = false
        })
      },
      // 切换注册方式（1:手机，2:邮箱）
      tabActive (index) {
        this.active = index
        this.timer = 0
        this.disabledBtn = false
        this.ruleForm.areaCode = ''
        this.timerFlag = false
        this.verificationCodeFlag = false
        clearInterval(this.timeInterval)
        this.resetForm('ruleForm')
      },
      // 内容位置重置
      refresh () {
        let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        let headerHeight = this.$refs.header_box.$el.offsetHeight
        let footerHeight = this.$refs.footer_box.$el.offsetHeight
        this.$refs.rigister_box.style.height = h - headerHeight - footerHeight + 'px'
        this.$refs.rigister_box.style.minHeight = this.$refs.login_content.offsetHeight + minHeaderFooter + 'px'
      },
      // 获取手机验证码请求
      _sendSMSphone () {
        this.verificationCodeFlag = true
        let req = {
          phone: this.ruleForm.phoneNumber,
          areaCode: this.ruleForm.areaCode
        }
        _apiSendSMSphone(req).then((res) => {
          if (res.statusCode === 200) {
            this.disabledBtn = true
            this.interval()
            this.$message({
              message: res.message,
              type: 'success'
            })
          }

          this.verificationCodeFlag = false
        }).catch(() => {
          this.verificationCodeFlag = false
        })
      },
      // 获取邮箱验证码请求
      _sendSMSemail () {
        this.verificationCodeFlag = true
        _apiSendSMSemail({
          email: this.ruleForm.emailAddress
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
        }).catch(() => {
          this.verificationCodeFlag = false
        })
      },
      // 获取验证码事件
      getVerificationCode () {
        let type = this.active === 1 ? 'phoneNumber' : 'emailAddress'
        this.$refs.ruleForm.validateField(type)
        if (this.timerFlag) {
          type = this.active === 1 ? this._sendSMSphone() : this._sendSMSemail()
        }
      },
      // 验证码倒计时
      interval () {
        this.timer = 60
        this.timeInterval = setInterval(() => {
          this.timer--
          // console.log(this.timer)
          if (this.timer <= 0) {
            clearInterval(this.timeInterval)
            this.disabledBtn = false
          }
        }, 1000)
      }
    },
    components: {
      'my-header': Header,
      Footer
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable.styl"


  .disabledBtn
    width 23px
    display inline-block
  .areaCodeItem
    width 437px
  .position-relative
    background $color-main-bg
  .register
    position absolute
    left 50%
    top 50%
    transform translate(-50%,-50%)
    min-width 880px
    .content
      width 480px
    .message
      vertical-align top
      padding-left 100px
      padding-top 30px
      color $color-table-font-head
      li
        margin-bottom 30px
    .title
      color $color-main-font
      margin-bottom 20px
    .tab
      li
        cursor pointer
        padding-bottom 10px
        color $color-table-font-tips
        display inline-block
      .tab-first
        margin-right 40px
      .active
        border-bottom 2px solid $color-btn
        color $color-btn
  .select
    width 100%
  .areaCode
    width 120px
  .ss
    margin-left 32px
    color $color-main-font
  .goSign
    color $color-btn
    margin-left -4px
    &:hover
      color $color-btn-hover
  .registerBtn
    width 180px
    height 40px
  .el-input-group__append
    .verificationCode-btn
      width 120px
      outline none
      padding 10px
      border none
      &:hover
        border none
        background-color transparent
</style>
