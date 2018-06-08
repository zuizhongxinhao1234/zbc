<template>
  <div>
    <div class="withdrawals-add" ref="content_box">
      <el-form :model="ruleForm" status-icon :rules="rules2" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="客户号:" prop="customerCode">
          <el-input type="text" v-model="ruleForm.customerCode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="提现数量:" prop="enchashmentVal">
          <el-input v-model="ruleForm.enchashmentVal" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="交易状态" prop="status">
          <el-select v-model="ruleForm.status" placeholder="请选择交易状态">
            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loadingFlag" type="primary" @click="submitForm('ruleForm')" class="withdrawals-btn">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as types from 'store/mutation-types' // types方法
  import {mapGetters, mapMutations} from 'vuex'
  import { _apiAgentWithdrawHistoryAdd } from 'api'

  export default {
    name: 'Name',
    data () {
      var checkNumber = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入提现数量'))
        }
        let regPos = /^\d+(\.\d+)?$/ // 非负浮点数
        if (!regPos.test(value)) {
          callback(new Error('请输入非负的数字'))
        } else {
          if (value > Number(this.withdrawLimit)) {
            callback(new Error('提现数量必须小于提现额度'))
          } else {
            callback()
          }
        }
      }
      return {
        loadingFlag: false,
        ruleForm: {
          customerCode: '',
          enchashmentVal: '',
          status: '' // 0交易已取消；1客户申请提现；2等待代理商确认；3代理商已付款；4交易成功
        },
        rules2: {
          customerCode: [
            { required: true, message: '客户号不能为空', trigger: 'blur' }
          ],
          enchashmentVal: [
            { validator: checkNumber, trigger: 'blur' }
          ],
          status: [
            { required: true, message: '请选择交易状态', trigger: 'change' }
          ],
          lock: [
            { required: true, message: '请选择锁定状态', trigger: 'change' }
          ]
        },
        statusOptions: [
          {
            value: '0',
            label: '交易已取消'
          },
          {
            value: '1',
            label: '客户申请提现'
          },
          {
            value: '2',
            label: '等待代理商确认'
          },
          {
            value: '3',
            label: '代理商已付款'
          },
          {
            value: '4',
            label: '交易成功'
          }
        ],
        lockOptions: [
          {
            value: '0',
            label: '不锁定'
          },
          {
            value: '1',
            label: '锁定'
          }
        ]
      }
    },
    computed: {
      ...mapGetters([
        'withdrawLimit'
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
        _apiAgentWithdrawHistoryAdd(
          this.ruleForm
        ).then((res) => {
          this.loadingFlag = false
          if (res.statusCode === 200) {
            this.ruleForm = {
              customerCode: '',
              enchashmentVal: '',
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
  .withdrawals-add
    padding 30px
  /deep/ .el-form-item__content
    width 217px
  .withdrawals-btn
    width 217px
</style>
