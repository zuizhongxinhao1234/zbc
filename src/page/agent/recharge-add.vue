<template>
  <div>
    <div class="recharge-add" ref="content_box">
      <el-form :model="ruleForm" :rules="rules2" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="客户号:" prop="customerCode">
          <el-input type="text" v-model="ruleForm.customerCode" clearable></el-input>
        </el-form-item>
        <el-form-item label="充值数量:" prop="rechargeVal">
          <el-input v-model="ruleForm.rechargeVal" clearable></el-input>
        </el-form-item>
        <el-form-item label="交易状态" prop="status">
          <el-select v-model="ruleForm.status" placeholder="请选择交易状态">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loadingFlag" type="primary" @click="submitForm('ruleForm')" class="recharge-btn">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as types from 'store/mutation-types' // types方法
  import {mapGetters, mapMutations} from 'vuex'
  import { _apiAgentRechargeHistoryAdd } from 'api'

  export default {
    name: 'Name',
    data () {
      var checkNumber = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入充值数量'))
        }
        let regPos = /^\d+(\.\d+)?$/ // 非负浮点数
        if (!regPos.test(value)) {
          callback(new Error('请输入非负的数字'))
        } else {
          if (value > Number(this.rechargeLimit)) {
            callback(new Error('充值数量必须小于充值额度'))
          } else {
            callback()
          }
        }
      }
      return {
        ruleForm: {
          customerCode: '',
          rechargeVal: '',
          status: ''// 0交易已取消；1客户未付款；2客户已付款等待代理商确认；3代理商已确认付款；4交易成功
        },
        loadingFlag: false,
        rules2: {
          customerCode: [
            { required: true, message: '客户号不能为空', trigger: 'blur' }
          ],
          rechargeVal: [
            { required: true, validator: checkNumber, trigger: 'blur' }
          ],
          status: [
            { required: true, message: '请选择交易状态', trigger: 'blur' }
          ]
        },
        options: [
          {
            value: '1',
            label: '客户未付款'
          },
          {
            value: '2',
            label: '客户已付款'
          }
        ]
      }
    },
    computed: {
      ...mapGetters([
        'rechargeLimit'
      ])
    },
    mounted () {
      this.refresh()
      window.removeEventListener('resize', this.refresh)
      window.addEventListener('resize', this.refresh)
    },
    methods: {
      refresh () {
        this.$nextTick(function () {
          let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
          this.$refs.content_box.style.height = h - 50 + 'px'
        })
      },

      ...mapMutations({
        setRechargeLimit: types.SET_RECHARGE_LIMIT, // 保存充值额度信息
        setWithdrawLimit: types.SET_WITHDRAW_LIMIT // 保存提现额度信息
      }),

      // 提交表单
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.saveAdd()
          } else {
            return false
          }
        })
      },

      // 提交保存
      saveAdd () {
        this.loadingFlag = true
        _apiAgentRechargeHistoryAdd(
          this.ruleForm
        ).then((res) => {
          this.loadingFlag = false
          this.$message(res.message)
          if (res.statusCode === 200) {
            console.log(res.data)
            this.ruleForm = {
              customerCode: '',
              rechargeVal: '',
              status: ''
            }
            this.setRechargeLimit(res.data.rechargeLimit)
            this.setWithdrawLimit(res.data.enchashmentLimit)
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
  .recharge-add
    padding 30px
  /deep/ .el-form-item__content
    width 217px
  .recharge-btn
    width 217px
</style>
