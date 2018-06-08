<template>
  <div>
    <!-- header -->
    <my-header></my-header>

    <!-- container -->
    <div class="container">
      <!-- 面包屑 -->
      <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/account-safe' }" class="font-big">{{$t('bindPhone.accountSafe')}}</el-breadcrumb-item>
        <el-breadcrumb-item class="font-big">{{$t('bindPhone.bindPhone')}}</el-breadcrumb-item>
      </el-breadcrumb>

      <!-- 绑定手机 -->
      <el-row class="form-box">
        <el-col :span="24" class="from-head">
          <span class="head-title">{{$t('bindPhone.bindPhone')}}</span>
          <i class="head-tips font-small iconfont icon-tishifill"></i>
          <span class="head-tips font-small">{{$t('bindPhone.bindInstruction')}}</span>
        </el-col>
        <el-col :span="12" :offset="6">
          <el-form label-position="top" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
            <el-form-item :label="$t('bindPhone.phoneNumber')" prop="phone">
              <el-input type="text" v-model="ruleForm.phone" clearable>
                <el-select class="areaCode" v-model="ruleForm.areaCode" slot="prepend" :placeholder="$t('bindPhone.placeholder')">
                  <el-option
                    v-for="(item,index) in regionList"
                    :key="index"
                    :label="item.region"
                    :value="item.region">
                    <span class="float-left">{{`00${item.region}`}}</span>
                    <span class="float-right">{{item.number}}</span>
                  </el-option>
                </el-select>
              </el-input>
            </el-form-item>
            <el-form-item :label="$t('bindPhone.smsValidate')" prop="smsCode">
              <el-input type="text" v-model="ruleForm.smsCode" clearable>
                <el-button :disabled="disabledBtn" :loading="verificationCodeFlag" @click="sendValidate('ruleForm')" class="validate-btn" type="text" slot="append">
                  {{$t('bindPhone.smsValidate')}}
                  <span v-show="disabledBtn" class="disabledBtn">({{timer}})</span>
                </el-button>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button :loading="updateLoadingFlag" type="primary" @click="submitForm('ruleForm')" class="sub-btn">{{$t('bindPhone.confirm')}}</el-button>
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
  import {testPhone} from 'common/validate'
  import {_apiVerificationPhoneNum, _apiSendSMSphone, _apiBindPhoneNum, _apiGetUserInfo} from 'api'
  import {mapMutations} from 'vuex'
  import {SET_USERINFO} from 'store/mutation-types'

  export default {
    name: 'Name',
    components: {
      'my-header': Header,
      'my-footer': Footer
    },
    data () {
      const validatePhone = (rule, value, callback) => {
        if (testPhone(value)) {
          if (this.ruleForm.areaCode) {
            let req = {phoneNum: this.ruleForm.phone}
            _apiVerificationPhoneNum(req).then((res) => {
              if (res.statusCode === 200) {
                this.timerFlag = true
                callback()
              } else {
                this.registerDisabled = false
                this.timerFlag = false
                callback(new Error(res ? res.message : ''))
              }
            })
          } else {
            this.timerFlag = false
            callback(new Error(this.$t('bindPhone.areaEmptyMessage')))
          }
        } else {
          callback(new Error(this.$t('bindPhone.phoneConfirmMessage')))
          this.timerFlag = false
        }
      }
      const validateCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('bindPhone.smsEmptyMessage')))
        } else {
          callback()
        }
      }
      return {
        regionList: [],
        disabledBtn: false, // 短信验证码按钮倒计时状态
        timerFlag: false, // 获取验证码条件
        verificationCodeFlag: false, // 验证码loading状态
        updateLoadingFlag: false,
        timer: 0, // 验证码倒计时
        ruleForm: { // 表单对象
          areaCode: '',
          phone: '',
          smsCode: ''
        }, // 表单验证规则
        rules: {
          phone: [
            { required: true, validator: validatePhone, trigger: 'blur' }
          ],
          smsCode: [
            { required: true, validator: validateCode, trigger: 'blur' }
          ]
        }
      }
    },
    mounted () {
      this.regionList = region
    },
    methods: {
      // 发送短信验证码
      sendValidate (formName) {
        this.$refs.ruleForm.validateField('phone')
        if (this.timerFlag) {
          this._sendSMSphone()
        }
      },
      // 获取手机验证码请求
      _sendSMSphone () {
        this.verificationCodeFlag = true
        let req = {
          phone: this.ruleForm.phone,
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
      // 提交修改
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.updateLoadingFlag = true
            _apiBindPhoneNum({
              areaCode: this.ruleForm.areaCode,
              phone: this.ruleForm.phone,
              smsCode: this.ruleForm.smsCode
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
              this.updateLoadingFlag = false
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
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
