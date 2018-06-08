<template>
  <div>
    <!-- header -->
    <my-header></my-header>

    <!-- container -->
    <div class="container">
      <!-- 面包屑 -->
      <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item class="font-big">{{$t('identityValidate.identityValidate')}}</el-breadcrumb-item>
      </el-breadcrumb>

      <!-- 个人身份验证 -->
      <div class="person-title">
          <span>{{$t('identityValidate.personIdentityValidate')}}</span>
      </div>

      <!-- el-form -->
      <div class="form-box">

        <!-- 实名认真已审核 -->
        <div v-if="userInfo.isRealVerify === 3">
          <el-row>
            <el-col :span="24" class="validateTitle text-align-center font-bigger">
              <i class="font-bigger success-icon iconfont icon-yuanxingxuanzhongfill"></i>
              <span> {{$t('identityValidate.identityValidateSuccess')}}</span>
            </el-col>
          </el-row>
          <!-- <el-row :gutter="60" class="validate-row">
            <el-col :span="12" class="validateLabel text-align-right">国籍</el-col>
            <el-col :span="12" class="validateContent">china(中国)</el-col>
          </el-row> -->
          <el-row :gutter="60" class="validate-row">
            <el-col :span="12" class="validateLabel text-align-right">{{$t('identityValidate.identityNumber')}}</el-col>
            <el-col :span="12" class="validateContent">{{userInfo.idCard}}</el-col>
          </el-row>
          <el-row :gutter="60" class="validate-row">
            <el-col :span="12" class="validateLabel text-align-right">{{$t('identityValidate.realName')}}</el-col>
            <el-col :span="12" class="validateContent">{{userInfo.realName}}</el-col>
          </el-row>
        </div>

        <!-- 已提交实名认证待审核 -->
        <div v-if="userInfo.isRealVerify === 2">
          <el-row v-if="userInfo.isRealVerify === 2">
            <el-col :span="24" class="validateTitle text-align-center font-bigger">
              <i class="font-bigger waiting-icon iconfont icon-shizhong"></i>
              <span>{{$t('identityValidate.identityValidateWaiting')}}</span>
            </el-col>
          </el-row>
          <!-- <el-row :gutter="60" class="validate-row">
            <el-col :span="12" class="validateLabel text-align-right">国籍</el-col>
            <el-col :span="12" class="validateContent">china(中国)</el-col>
          </el-row> -->
          <el-row :gutter="60" class="validate-row">
            <el-col :span="12" class="validateLabel text-align-right">{{$t('identityValidate.identityNumber')}}</el-col>
            <el-col :span="12" class="validateContent">{{userInfo.idCard}}</el-col>
          </el-row>
          <el-row :gutter="60" class="validate-row">
            <el-col :span="12" class="validateLabel text-align-right">{{$t('identityValidate.realName')}}</el-col>
            <el-col :span="12" class="validateContent">{{userInfo.realName}}</el-col>
          </el-row>
        </div>

        <!-- 未实名认证 -->
        <el-form  v-if="userInfo.isRealVerify === 1" label-position="top" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
          <el-form-item :label="$t('identityValidate.realName')" prop="name">
            <el-input type="text" v-model="ruleForm.name" clearable></el-input>
          </el-form-item>
          <el-form-item :label="$t('identityValidate.identityNumber')" prop="identity">
            <el-input v-model="ruleForm.identity" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loadingFlag" type="primary" @click="submitForm('ruleForm')" class="sub-btn">{{$t('identityValidate.validate')}}</el-button>
          </el-form-item>
        </el-form>
      </div>

    </div>

    <!-- footer -->
    <my-footer></my-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from 'components/common/Header'
  import Footer from 'components/common/Footer'
  import {mapGetters, mapMutations} from 'vuex'
  import {SET_USERINFO} from 'store/mutation-types'
  import {_apiPrimaryTrueName, _apiGetUserInfo} from 'api'

  export default {
    name: 'Name',
    components: {
      'my-header': Header,
      'my-footer': Footer
    },
    data () {
      var validateIdentity = (rule, value, callback) => {
        if (!/^[1-9]\d{16}[0-9Xx]$/.test(value)) {
          callback(new Error(this.$t('identityValidate.identityConfirmMessage')))
        } else {
          callback()
        }
      }
      return {
        loadingFlag: false,
        ruleForm: {
          name: '',
          identity: ''
        },
        rules: {
          name: [
            { required: true, message: this.$t('identityValidate.nameEmptyMessage'), trigger: 'blur' }
          ],
          identity: [
            { required: true, message: this.$t('identityValidate.identityEmptyMessage'), trigger: 'blur' },
            { validator: validateIdentity, trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
      ...mapGetters([
        'userInfo'
      ])
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            this.loadingFlag = true
            try {
              let res = await _apiPrimaryTrueName({
                realName: this.ruleForm.name,
                certificatesNum: this.ruleForm.identity
              })
              if (res.statusCode === 200) {
                _apiGetUserInfo().then((respones) => {
                  if (respones.statusCode === 200) {
                    this.setUserInfo(respones.data)
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
  .person-title
    padding 0 30px
    background-color $color-second-fill-bg
    span
      line-height 42px
      color $color-main-font
    .link
      line-height 42px
      color $color-btn
      &:hover
        color $color-btn-hover
      &:active
        color $color-btn
      &:foucs
        color $color-btn-hover
  .form-box
    min-height 350px
    margin-bottom 100px
    padding-bottom 40px
    background-color $color-main-fill-bg
  .ruleForm
    width 320px
    margin 0 auto
  /deep/ .el-form--label-top .el-form-item__label
    color $color-table-font-head
  .sub-btn
    width 100%
  .validateTitle
    margin-bottom 40px
    padding-top 60px
    color $color-main-font
  .success-icon
    color #67c23a
  .waiting-icon
    color #e6a23c
  .validate-row
    margin-bottom 40px
  .validateLabel
    color $color-table-font-head
  .validateContent
    color $color-main-font
</style>
