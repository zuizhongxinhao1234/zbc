<template>
  <div>
    <!-- header -->
    <my-header></my-header>

    <!-- container -->
    <div class="container">
      <!-- 面包屑 -->
      <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/property/trade-account' }" class="font-big">{{$t('withdrawAddress.property')}}</el-breadcrumb-item>
        <el-breadcrumb-item class="font-big">{{$t('withdrawAddress.withdrawAddressManage')}}</el-breadcrumb-item>
      </el-breadcrumb>

      <!-- 添加提币地址 -->
      <div class="add-box">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          label-position="top"
          class="ruleForm">
          <el-row :gutter="20">
            <el-col :span="4">
              <el-form-item :label="$t('withdrawAddress.coinName')" prop="coinCode">
                <el-select v-model="ruleForm.coinCode" filterable :placeholder="$t('withdrawAddress.placeholder')">
                  <el-option
                    v-for="item in virtualShowALLList"
                    :key="item.code"
                    :label="item.shortName"
                    :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item :label="$t('withdrawAddress.withdrawAddress')" prop="address">
                <el-input v-model="ruleForm.address"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item :label="$t('withdrawAddress.remark')" prop="remark">
                <el-input v-model="ruleForm.remark"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="text-align-right padding-top-30">
              <el-button @click="submitForm('ruleForm')" class="add-btn" type="primary">{{$t('withdrawAddress.add')}}</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>

       <!-- 提币地址列表 -->
      <div class="address-box">
        <el-row class="address-head">
          <el-col class="address-title">{{$t('withdrawAddress.addressList')}}</el-col>
        </el-row>
        <el-row class="address-content">
          <div class="flex-box">
            <div class="flex-item">
              <el-select
                class="table-select"
                size="small"
                v-model="coinTypeCode"
                @change="tableSelect"
                :placeholder="$t('withdrawAddress.placeholder')">
                <el-option :label="$t('withdrawAddress.all')" value="">{{$t('withdrawAddress.all')}}</el-option>
                <el-option
                  v-for="item in virtualShowALLList"
                  :key="item.id"
                  :label="`${$t('withdrawAddress.coinName')}(${item.shortName})`"
                  :value="item.code">{{item.shortName}}</el-option>
              </el-select>
            </div>
            <div class="flex-item">
              <span class="table-text font-small">{{$t('withdrawAddress.withdrawAddress')}}</span>
            </div>
            <div class="flex-item">
              <span class="table-text font-small">{{$t('withdrawAddress.remark')}}</span>
            </div>
            <div class="flex-item">
              <span class="table-text font-small">{{$t('withdrawAddress.operate')}}</span>
            </div>
          </div>
          <el-table
            :data="withdrawAddressList"
            v-loading="withdrawAddressLoading"
            :show-header="false"
            style="width: 100%"
            size="small">
            <el-table-column
              prop="shortName"
              :label="$t('withdrawAddress.coinName')"
              width="190"></el-table-column>
            <el-table-column prop="extractCashAddress" :label="$t('withdrawAddress.withdrawAddress')" width="500"></el-table-column>
            <el-table-column prop="remark" :label="$t('withdrawAddress.remark')"></el-table-column>
            <el-table-column :label="$t('withdrawAddress.operate')">
              <template slot-scope="scope">
                <el-button @click="deleteWithdrawAddress(scope.row.code)" type="text" size="small">{{$t('withdrawAddress.delete')}}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>

      </div>

    </div>

    <!-- footer -->
    <my-footer></my-footer>

    <!-- 安全验证 -->
    <el-dialog :title="$t('withdrawAddress.safeValidate')" :visible.sync="dialogVisible" :before-close="resetForm2" width="600px">
      <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" label-position="top" class="ruleForm2">
        <el-form-item :label="this.userInfo.phone ? $t('withdrawAddress.phoneNumber') : $t('withdrawAddress.emailNumber')" prop="phone">
          <el-input type="text" :value="ruleForm2.phone" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item :label="this.userInfo.phone ? $t('withdrawAddress.smsValidate') : $t('withdrawAddress.emailValidate')" prop="smsCode">
          <el-input type="text" v-model="ruleForm2.smsCode" clearable>
            <el-button @click="sendValidate" class="validate-btn" type="text" slot="append" :loading="timeIntervalBtnFlag" :disabled="timeIntervalFlag">获取验证码<span v-if="timeIntervalFlag">{{`(${timer})`}}</span></el-button>
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('withdrawAddress.dealPwd')" prop="dealCode">
          <el-input type="password" v-model="ruleForm2.dealCode" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-button @click="resetForm2()" class="sub-btn" type="default">{{$t('withdrawAddress.cancel')}}</el-button>
            </el-col>
            <el-col :span="12">
              <el-button type="primary" @click="submitForm2('ruleForm2')" class="sub-btn" :loading="submitFlag">{{$t('withdrawAddress.confirm')}}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from 'components/common/Header'
  import Footer from 'components/common/Footer'
  import {mapGetters} from 'vuex'
  import {
    _apiGetVirtualShowALL,
    _apiSendSMSphone,
    _apiSendSMSemail,
    _apiAddWithdrawAddress,
    _apiWithdrawAddressList,
    _apiDeleteWithdrawAddress
    } from 'api'

  export default {
    name: 'Name',
    components: {
      'my-header': Header,
      'my-footer': Footer
    },
    data () {
      return {
        virtualShowALLList: [], // 所有币种列表
        timer: null,
        timeInterval: null,
        timeIntervalFlag: false,
        timeIntervalBtnFlag: false,
        submitFlag: false,
        ruleForm: {
          coinCode: '', // 虚拟币code
          address: '', // 提币地址
          remark: '' // 备注
        },
        rules: {
          coinCode: [
            { required: true, message: this.$t('withdrawAddress.coinEmptyMessage'), trigger: 'change' }
          ],
          address: [
            { required: true, message: this.$t('withdrawAddress.addressEmptyMessage'), trigger: 'blur' }
          ]
        },
        dialogVisible: false, // 安全验证窗口
        ruleForm2: {
          phone: '', // 手机号、邮箱号
          smsCode: '', // 短信验证码、邮箱验证码
          dealCode: '' // 交易密码
        },
        rules2: {
          smsCode: [
            { required: true, message: this.$t('withdrawAddress.validateEmptyMessage'), trigger: 'blur' }
          ],
          dealCode: [
            { required: true, message: this.$t('withdrawAddress.dealEmptyMessage'), trigger: 'blur' }
          ]
        },
        coinTypeCode: '', // 虚拟币code（有虚拟币code则返回该币的提现地址，否则返回所有的提现地址）
        withdrawAddressList: [], // 提币地址列表
        withdrawAddressLoading: false
      }
    },
    computed: {
      // 获取用户信息列表
      ...mapGetters([
        'userInfo'
      ])

      // // 根据用户信息判断是否为手机用户
      // isPhoneUser () {
      //   return this.userInfo.phone !== ''
      // }
    },
    created () {
      // 获取所有币种列表
      this.apiGetVirtualShowALL()

      // 获取提币地址列表
      this.getWithdrawAddress()
    },
    mounted () {
      // 表单初始化赋值
      this.ruleForm2.phone = this.userInfo.phone ? this.userInfo.phone : this.userInfo.email
    },
    methods: {
      // 获取所有币种列表
      apiGetVirtualShowALL () {
        _apiGetVirtualShowALL().then((res) => {
          if (res.statusCode === 200) {
            for (var i in res.data) {
              if (res.data[i].shortName !== 'ZBC') {
                this.virtualShowALLList.push(Object.assign(res.data[i], {value: res.data[i].shortName}, {text: res.data[i].shortName}))

              // 给获取的所有币种列表添加字段value用于el-autocomplete显示下拉列表
                // this.virtualShowALLList[i].value = res.data[i].shortName

              // 给获取的所有币种列表添加字段text用户el-table显示下拉列表
                // this.virtualShowALLList[i].text = res.data[i].shortName
              }
            }
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
            this.timeIntervalFlag = false
          }
        }, 1000)
      },

      // 添加
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dialogVisible = true
          } else {
            return false
          }
        })
      },

       // 发送验证码(手机、邮箱)
      sendValidate () {
        this.timeIntervalBtnFlag = true
        if (this.userInfo.phone) {
          _apiSendSMSphone({
            areaCode: this.userInfo.areaCode,
            phone: this.userInfo.phone
          }).then((r) => {
            if (r.statusCode === 200) {
              // 这里执行短信验证码发送成功后续操作
              this.timeIntervalFlag = true
              this.interval()
              this.$message({
                message: r.message,
                type: 'success'
              })
              this.timeIntervalBtnFlag = false
            }
          })
        } else {
          _apiSendSMSemail({
            email: this.userInfo.email
          }).then((r) => {
            if (r.statusCode === 200) {
              // 这里执行邮箱验证码发送成功后续操作
              this.timeIntervalFlag = true
              this.interval()
              this.$message({
                message: r.message,
                type: 'success'
              })
              this.timeIntervalBtnFlag = false
            }
          })
        }
      },

      // 提交操作
      submitForm2 (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.apiAddWithdrawAddress()
          } else {
            return false
          }
        })
      },

      // 取消
      resetForm2 () {
        this.dialogVisible = false
        this.timeInterval && clearInterval(this.timeInterval)
        this.timeIntervalFlag = false
        this.$refs['ruleForm2'].resetFields()
      },

      // 添加提币地址
      apiAddWithdrawAddress () {
        this.submitFlag = true
        _apiAddWithdrawAddress({
          coinCode: this.ruleForm.coinCode,
          dealCode: this.ruleForm2.dealCode,
          address: this.ruleForm.address,
          remark: this.ruleForm.remark,
          smsCode: this.ruleForm2.smsCode
        }).then((r) => {
          if (r.statusCode === 200) {
            // 成功添加提币地址后重新获取一次提币地址列表
            this.getWithdrawAddress()
            this.timeIntervalFlag = false
            this.timeInterval && clearInterval(this.timeInterval)
            this.resetForm2()
          }
          this.submitFlag = false
        }).catch(() => {
          this.submitFlag = false
        })
      },

      // 获取提币地址列表
      getWithdrawAddress () {
        this.withdrawAddressLoading = true
        _apiWithdrawAddressList({
          coinTypeCode: this.coinTypeCode
        }).then((r) => {
          if (r.statusCode === 200) {
            this.withdrawAddressList = r.data
          }
          this.withdrawAddressLoading = false
        }).catch(() => {
          this.withdrawAddressLoading = false
        })
      },

      // 分币种查询提币地址
      tableSelect (value) {
        this.coinTypeCode = value
        this.getWithdrawAddress()
      },

      // 删除提币地址
      deleteWithdrawAddress (rowCode) {
        this.$confirm(this.$t('withdrawAddress.deleteConfirmMessage'), this.$t('withdrawAddress.tips'), {
          confirmButtonText: this.$t('withdrawAddress.confirm'),
          cancelButtonText: this.$t('withdrawAddress.cancel'),
          type: 'warning'
        }).then(() => {
          _apiDeleteWithdrawAddress({
            code: rowCode
          }).then((r) => {
            if (r.statusCode === 200) {
            // 成功删除提币地址后重新获取一次提币地址列表
              this.getWithdrawAddress()
            }
          })
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // })
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
   @import "~assets/stylus/variable.styl"

  .container
    width 1200px
    min-height 600px
    margin 0 auto 84px
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
  .add-box
    margin-bottom 20px
    padding 20px 30px
    background-color $color-main-fill-bg
  /deep/ .el-form-item__label
    line-height initial
    color $color-main-border
  .padding-top-30
    padding-top 30px
  .add-btn
    width 240px
  .validate-btn
    width 120px
    color $color-btn
    outline none
    border none
    &:hover
      border none
      color $color-btn-hover
  .sub-btn
    width 100%
  .sub-btn.el-button--default
    border 1px solid $color-btn
    color $color-second-font
    &:hover
      border 1px solid $color-btn-hover
      color $color-main-font
  .address-head
    padding 0 30px
    background-color $color-second-fill-bg
  .address-title
    line-height 48px
    color $color-main-font
  .address-content
    padding 0 30px
    background-color $color-main-fill-bg
    padding-bottom 30px
  .flex-box
    display flex
  .flex-item:first-child
    width 190px
  .flex-item:nth-child(2)
    width 500px
  .flex-item:nth-child(3)
    flex: 1
  .table-select
    width 95px
    line-height 50px
    & /deep/ .el-input__inner
      padding-left 0
      color $color-table-font-head
      background-color $color-main-fill-bg
      border none
  .table-text
    line-height 50px
    color $color-table-font-head
  /deep/ .el-table thead
    color $color-table-font-head
  /deep/ .el-table tr,/deep/ .el-table th
    background-color $color-main-fill-bg
    border-bottom none
  /deep/ .el-table th:last-child,/deep/ .el-table td:last-child, /deep/ .el-table th:nth-last-child(2)
    text-align right
  /deep/ .el-table td
    border-bottom-color #1f2943
  /deep/ .el-table tr:last-child td
    border-bottom none
</style>
