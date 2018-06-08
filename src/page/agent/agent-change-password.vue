<template>
  <div>
    <div class="change-password">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input type="password" v-model="ruleForm.oldPassword" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input type="password" v-model="ruleForm.newPassword" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword">
          <el-input type="password" v-model="ruleForm.checkPassword" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loadingFlag" type="primary" @click="submitForm('ruleForm')" class="change-btn">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { _apiAgentChangePassword } from 'api'

  export default {
    name: 'Name',
    data () {
      var validateNewPassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'))
        } else if (value.length < 6 || value.length > 32) {
          callback(new Error('长度在 6 到 32 个字符'))
        } else if (this.ruleForm.checkPassword !== '') {
          this.$refs.ruleForm.validateField('checkPassword')
          callback()
        } else {
          callback()
        }
      }
      var validateCheckPassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入新密码'))
        } else if (value !== this.ruleForm.newPassword) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        loadingFlag: false,
        ruleForm: {
          phone: '',
          messageVerifyCode: '',
          oldPassword: '',
          newPassword: '',
          checkPassword: ''
        },
        rules: {
          oldPassword: [
            { required: true, message: '请输入旧密码', trigger: 'blur' },
            { min: 6, max: 32, message: '长度在 6 到 32 个字符', trigger: 'blur' }
          ],
          newPassword: [
            { required: true, validator: validateNewPassword, trigger: 'blur' }
          ],
          checkPassword: [
            { required: true, validator: validateCheckPassword, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      // 表单验证
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.submit()
          } else {
            return false
          }
        })
      },

      // 提交修改
      submit () {
        this.loadingFlag = true
        _apiAgentChangePassword(
          this.ruleForm
        ).then((res) => {
          this.loadingFlag = false
          this.$message(res.message)
          if (res.statusCode === 200) {
            this.$refs['ruleForm'].resetFields()
          }
        }).catch((res) => {
          this.loadingFlag = false
          this.$message(res.message)
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .change-password
    padding 30px
  /deep/ .el-form-item__content
    width 217px
  .change-btn
    width 217px
</style>
