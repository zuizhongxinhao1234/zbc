<template>
  <div ref="login_box" v-loading="infoLoading">
    <div class="agent-login">
      <h1 class="mTitle">ZBC代理商登录</h1>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item label="账号" prop="phone">
          <el-input type="text" v-model="ruleForm.phone" clearable placeholder="请输入手机号">
            <el-select class="areaCodeSelect" v-model="ruleForm.areaCode" slot="prepend" placeholder="请选择">
              <el-option
                v-for="item in regions"
                :key="item.id"
                :label="item.region"
                :value="item.region">
                <span style="float: left">{{item.region}}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{item.number}}</span>
              </el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="messageVerifyCode">
          <el-input type="text" v-model="ruleForm.messageVerifyCode" clearable placeholder="请输入验证码">
            <el-button slot="append" @click="sendMessageVerifyCode('ruleForm')" :loading="sendLoading" size="small">短信验证码</el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model.number="ruleForm.password" clearable placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item style="padding-top: 30px">
          <el-button type="primary" @click="agentLogin('ruleForm')" :loading="loginLoading" style="width: 100%">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {region} from 'common/region' // 区域代码列表
  import {testPhone, testPassword} from 'common/validate' // 验证方法
  import {_apiAgentSendSMSphone, _apiAgentLogin, _apiAgentGetUserInfo} from 'api' // 接口方法
  import * as types from 'store/mutation-types' // types方法
  import {mapActions, mapMutations} from 'vuex' // 状态管理

  export default {
    name: 'hello',
    data () {
      const validatePhone = (rule, value, callback) => {
        if (this.ruleForm.areaCode === '') {
          callback(new Error('请选择区号!'))
        } else if (value === '') {
          callback(new Error('请输入手机号!'))
        } else if (!testPhone(value)) {
          callback(new Error('请输入正确的手机号!'))
        } else {
          callback()
        }
      }
      const validateMessageVerifyCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码!'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码!'))
        } else if (!testPassword(value)) {
          callback(new Error('请输入正确的密码!'))
        } else {
          callback()
        }
      }
      return {
        regions: [], // 区域代码列表
        ruleForm: {
          areaCode: '', // 当前选择的区域代码
          phone: '', // 手机号
          messageVerifyCode: '', // 验证码
          password: '' // 密码
        },
        rules: {
          phone: [
            { required: true, validator: validatePhone, trigger: 'blur' }
          ],
          messageVerifyCode: [
            { required: true, validator: validateMessageVerifyCode, trigger: 'blur' }
          ],
          password: [
            { required: true, validator: validatePassword, trigger: 'blur' }
          ]
        },
        sendLoading: false,
        loginLoading: false,
        infoLoading: false
      }
    },
    beforeRouteLeave (to, from, next) {
      window.removeEventListener('resize', this.refresh)
      next()
    },
    mounted () {
      window.addEventListener('resize', this.refresh)
      this.refresh()
      this.regions = region // 加载区号
    },
    methods: {
      refresh () {
        let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        this.$refs.login_box.style.height = h + 'px'
      },

      ...mapActions({
        setAgentLoginStatus: 'setAgentStore'
      }),

      ...mapMutations({
        setAgentInfo: types.SET_AGENTINFO, // 保存代理商信息
        setRechargeLimit: types.SET_RECHARGE_LIMIT, // 保存充值额度信息
        setWithdrawLimit: types.SET_WITHDRAW_LIMIT // 保存提现额度信息
      }),

      // 代理商发送短信验证码
      sendMessageVerifyCode (formName) {
        this.$refs.ruleForm.validateField('phone', (valid) => {
          if (valid === '') {
            this.sendLoading = true
            _apiAgentSendSMSphone({
              phone: this.ruleForm.phone,
              areaCode: this.ruleForm.areaCode
            }).then((res) => {
              this.sendLoading = false
              this.$message(res.message)
            })
          }
        })
      },

      // 代理商登录
      agentLogin (formName) {
        this.$refs[formName].validate((valid) => {
          console.log(valid)
          if (valid) {
            this.loginLoading = true
            _apiAgentLogin({
              phone: this.ruleForm.phone,
              password: this.ruleForm.password,
              messageVerifyCode: this.ruleForm.messageVerifyCode
            }).then((res) => {
              this.loginLoading = false
              this.$message(res.message)
              if (res.statusCode === 200) {
                this.setAgentLoginStatus({flag: true, agentToken: res.data.token})
                this.getAgentInfo()
              }
            })
          } else {
            return false
          }
        })
      },

      // 请求代理商信息
      getAgentInfo () {
        this.infoLoading = true
        _apiAgentGetUserInfo().then((res) => {
          this.infoLoading = false
          this.$message(res.message)
          if (res.statusCode === 200) {
            this.setAgentInfo(res.data)
            this.setRechargeLimit(res.data.rechargeLimit)
            this.setWithdrawLimit(res.data.enchashmentLimit)
            this.$router.push('/agent-recharge')
          }
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~assets/stylus/variable.styl"

  .agent-login
    position fixed
    left 50%
    top 50%
    z-index 1
    transform translateX(-50%) translateY(-50%)
  .mTitle
    font-size 50px
    text-align center
    color #20a0ff
    margin-top -100px
    margin-bottom 50px
  .areaCodeSelect
    width 100px
</style>
