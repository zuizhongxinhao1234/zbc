<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm">
      <el-form-item prop="withdrawAddress">
        <span slot="label">{{$t('withdraw.withdrawAddress')}}</span>
        <!-- <el-autocomplete
          v-model="ruleForm.withdrawAddress"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入提币地址"
          @select="handleSelect"
          class="autocomplete"></el-autocomplete> -->
          <el-select class="autocomplete"
          v-model="ruleForm.withdrawAddress"
          clearable :placeholder="$t('withdraw.placeholder')"
          :no-data-text="$t('withdraw.noDataTips')"
          >
            <el-option
              v-for="item in withdrawAddressList"
              :key="item.code"
              :label="item.extractCashAddress"
              :value="item.code">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item :label="$t('withdraw.count')" prop="withdrawNumber">
        <div class="view-title text-align-right font-small">
          <span class="vertical-middle">{{$t('withdraw.useable')}}:</span>
          <el-button @click="withdrawBalance(message.balance)" class="vertical-middle" type="text" size="small">{{message.balance}}</el-button>
          <!-- <span class="vertical-middle">限额:</span> -->
          <!-- <span class="vertical-middle">2000.000000</span> -->
        </div>
        <el-input v-model="ruleForm.withdrawNumber">
          <span slot="suffix">{{message.shortName}}</span>
        </el-input>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('withdraw.fee')">
            <el-input v-model="withdrawFee" disabled clearable>
              <span slot="suffix">{{message.shortName}}</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('withdraw.getCount')">
            <el-input v-model="withdrawActual" disabled clearable>
              <span slot="suffix">{{message.shortName}}</span>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <p class="view-content">{{$t('withdraw.tips')}}</p>
          <!-- <p class="view-content">• 请勿向上述地址充值任何非{{message.shortName}}资产，否则资产将不可找回。</p> -->
          <!-- <p class="view-content">• 您充值至上述地址后，需要整个网络节点的确认，1次网络确认后到账，6次网络确认后可提币。</p> -->
          <p class="view-content">{{`${$t('withdraw.tips1_1')}${message.minWithdrawNum||0} ${message.shortName}${$t('withdraw.tips1_2')}`}}</p>
          <p class="view-content">{{$t('withdraw.tips2')}}</p>
          <p class="view-content">{{$t('withdraw.tips3')}}</p>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" class="submit-btn">{{$t('withdraw.withdraw')}}</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 安全验证 -->
    <el-dialog :title="$t('withdraw.safeValidate')" :visible.sync="dialogVisible" :before-close="resetForm2" width="600px">
      <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" label-position="top" class="ruleForm2">
        <el-form-item :label="$t('withdraw.dealPwd')" prop="dealCode">
          <el-input type="password" v-model="ruleForm2.dealCode" clearable></el-input>
        </el-form-item>
        <el-form-item :label="$t('withdraw.googleValidate')" prop="googleCode">
          <el-input type="password" v-model="ruleForm2.googleCode" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-button @click="resetForm2()" class="sub-btn" type="default">{{$t('withdraw.cancel')}}</el-button>
            </el-col>
            <el-col :span="12">
              <el-button type="primary" @click="submitForm2('ruleForm2')" class="sub-btn">{{$t('withdraw.confirm')}}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import {_apiWithdrawAddressList, _apiSubmitWithdraw} from 'api'
import {testFloat} from 'common/validate'

export default {
  name: 'Name',
  props: ['message'],
  data () {
    const validateWithdrawNumber = (rule, value, callback) => {
      let minWithdrawNum = this.message.minWithdrawNum ? this.message.minWithdrawNum : 0
      let n = this.ruleForm.withdrawNumber
      let f = this.message.fee * 1000
      let w = (parseFloat(n) * f) / 1000 < this.message.minWithdrawFee ? this.message.minWithdrawFee : (parseFloat(n) * f) / 1000
      if (!testFloat(value)) {
        callback(new Error(this.$t('withdraw.rightNumberMessage')))
      } else {
        if (Number(value) < Number(minWithdrawNum)) {
          callback(new Error(this.$t('withdraw.minNumberMessage')))
        } else {
          if (Number(value) + Number(w) > Number(this.message.balance)) {
            callback(new Error(this.$t('withdraw.maxNumberMessage')))
          } else {
            callback()
          }
        }
      }
    }
    return {
      // message: this.message, // 父组件传递的参数
      withdrawAddressList: [], // 提币地址列表
      timeout: null, // 远程搜索
      submitFlag: false,
      ruleForm: {
        withdrawAddress: '',
        withdrawNumber: ''
      },
      rules: {
        withdrawAddress: [
            { required: true, message: this.$t('withdraw.addressEmptyMessage'), trigger: 'change' }
        ],
        withdrawNumber: [
            { required: true, message: this.$t('withdraw.countEmptyMessage'), trigger: 'blur' },
            { validator: validateWithdrawNumber, trigger: 'blur' }
        ]
      },
      dialogVisible: false, // 安全验证
      ruleForm2: {
        dealCode: '', // 交易密码
        googleCode: '' // 谷歌验证码
      },
      rules2: {
        dealCode: [
            { required: true, message: this.$t('withdraw.dealEmptyMessage'), trigger: 'blur' }
        ],
        googleCode: [
            { required: false, message: this.$t('withdraw.googleEmptyMessage'), trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    // 提币手续费
    withdrawFee () {
      let n = this.ruleForm.withdrawNumber
      let f = this.message.fee * 1000
      if (n !== '') {
        return (parseFloat(n) * f) / 1000 < this.message.minWithdrawFee ? this.message.minWithdrawFee : (parseFloat(n) * f) / 1000
      }
    },

    // 提币到账数量
    withdrawActual () {
      let n = this.ruleForm.withdrawNumber
      let a = this.withdrawFee
      if (n !== '') {
        return parseFloat(n) - a
      }
    }
  },
  methods: {
    // 获取提币地址列表
    getWithdrawAddressList (code) {
      _apiWithdrawAddressList({
        coinTypeCode: code
      }).then((r) => {
        if (r.statusCode === 200) {
          this.withdrawAddressList = r.data
        }
      })
    },

    // // 模糊查询
    // querySearchAsync (queryString, cb) {
    //   var restaurants = this.withdrawAddressList
    //   var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
    //   cb(results)
    // },

    // // 模糊查询
    // createStateFilter (queryString) {
    //   return (state) => {
    //     return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
    //   }
    // },

    // 选择提币地址
    // handleSelect (item) {
      // console.log(item)
      // this.ruleForm.withdrawAddress = item.value
      // console.log('---', this.ruleForm.withdrawAddress)
    // },

    // 提取可用,限额2000
    withdrawBalance (balance) {
      let b = parseFloat(balance)
      if (b > 0) {
        this.ruleForm.withdrawNumber = b > 100000 ? 100000 : balance
      }
    },

    // 提交提币
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogVisible = true
        } else {
          return false
        }
      })
    },

    // 安全验证
    submitForm2 (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitWithdraw()
        } else {
          return false
        }
      })
    },

    // 取消
    resetForm2 () {
      this.dialogVisible = false
      this.$refs['ruleForm2'].resetFields()
    },

    // 提币
    submitWithdraw () {
      this.submitFlag = true
      _apiSubmitWithdraw({
        coinType: this.message.virtualCoinCode, // 虚拟币code
        number: this.ruleForm.withdrawNumber, // 提币数量
        tradePassword: this.ruleForm2.dealCode, // 交易密码
        googleCode: this.ruleForm2.googleCode, // 谷歌验证码
        address: this.ruleForm.withdrawAddress // 提币地址
      }).then((r) => {
        if (r.statusCode === 200) {
          this.dialogVisible = false // 关闭安全验证表单
          this.$refs['ruleForm'].resetFields() // 重置提币表单信息
          this.$refs['ruleForm2'].resetFields() // 重置安全验证表单信息
          this.$emit('updateLegalCoinList') // 更新法币列表信息
          this.$emit('resetWithdrawView') // 重置提币窗口
        }
        this.submitFlag = false
      }).catch(() => {
        this.submitFlag = false
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable.styl"

  /deep/ .el-form-item__label
    font-size 12px
    color $color-table-font-head
  /deep/ .el-input.is-disabled .el-input__inner
    border-color transparent
    cursor initial
  .autocomplete
    width 100%
    box-sizing border-box
  .view-title
    color $color-table-font-head
  .view-content
    line-height initial
    color $color-table-font-head
  .submit-btn
    width 100%
  .sub-btn
    width 100%
  .sub-btn.el-button--default
    border 1px solid $color-btn
    color $color-second-font
    &:hover
      border 1px solid $color-btn-hover
      color $color-main-font
</style>
