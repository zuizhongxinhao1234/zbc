<template>
  <div>
    <div class="agent-recharge" ref="content_box">
      <div class="recharge-head">
        <span class="margin-l-r-10">客户号:</span>
        <el-input class="input" v-model="requestFromData.customerCode" placeholder="请输入客户号" clearable></el-input>
        <span class="margin-l-r-10 margin-left-30">金额:</span>
        <el-input class="input" v-model="requestFromData.rechargeValMin" placeholder="请输入金额最小值" clearable></el-input>
        <span class="margin-l-r-10">-</span>
        <el-input class="input" v-model="requestFromData.rechargeValMax" placeholder="请输入金额最大值" clearable></el-input>
        <span class="margin-l-r-10 margin-left-30">日期:</span>
        <el-date-picker v-model="requestFromData.beginDate" type="date" placeholder="选择开始日期"></el-date-picker>
        <span class="margin-l-r-10">-</span>
        <el-date-picker v-model="requestFromData.endDate" type="date" placeholder="选择截止日期"></el-date-picker>
        <el-button class="margin-left-30" type="primary" @click="getAgentRechargeHistory">查询</el-button>
        <el-button class="margin-left-30" type="primary" @click="resetForm">重置</el-button>
      </div>
      <el-table
        :data="agentRechargeHistory"
        v-loading="loading"
        border
        style="width: 100%">
        <el-table-column
          prop="customerCode"
          label="客户code"
          width="180">
        </el-table-column>
        <el-table-column
          prop="rechargeVal"
          label="充值数量"
          width="180">
        </el-table-column>
        <el-table-column
          prop="rechargeStatus"
          label="交易状态"
          width="180"
          :formatter="formatterStatus">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="lockStatus"
          label="是否锁定">
          <template slot-scope="scope">
            <span class="vertical-middle" v-if="scope.row.lockStatus === 1">锁定</span>
            <el-button v-if="scope.row.lockStatus === 0" type="text" @click="editLockStatus(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-if="agentRechargeHistory.length>0"
        class="pagination"
        background
        layout="prev, pager, next"
        :current-page="parseInt(requestFromData.pageIndex)"
        @current-change="handleCurrentChange"
        :page-size="requestFromData.pageSize"
        :total="totalSize">
      </el-pagination>
      <el-dialog
        :title="'客户'+dialogFormData.customerCode+'充值交易状态修改'"
        :visible.sync="dialogVisible" class="dialog">
          <el-form :rules="rules" ref="dialogFormData" :model="dialogFormData" label-width="80px">
            <el-form-item label="交易数量" prop="rechargeVal">
              <el-input v-model="dialogFormData.rechargeVal"></el-input>
            </el-form-item>
            <el-form-item label="交易状态"  prop="status_">
              <el-select style="width: 100%" v-model="dialogFormData.status_" placeholder="请选择交易状态">
                <el-option label="交易已取消" value="0"></el-option>
                <el-option label="客户未付款" value="1"></el-option>
                <el-option label="客户已付款等待代理商确认" value="2"></el-option>
                <el-option label="代理商已确认付款" value="3"></el-option>
                <el-option label="交易成功" value="4"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogSure('dialogFormData')" :loading="btnLoading">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { _apiAgentRechargeHistory, _apiAgentRechargeHistoryUpdate } from 'api'
  import * as types from 'store/mutation-types' // types方法
  import { mapMutations } from 'vuex'

  export default {
    name: 'Name',
    data () {
      return {
        agentRechargeHistory: [],
        loading: false,
        dialogVisible: false,
        btnLoading: false,
        totalSize: 0,
        dialogFormData: {
          status_: '',
          rechargeVal: '',
          code: '',
          customerCode: ''
        },
        rules: {
          status_: [
            { required: true, message: '请选择交易状态', trigger: 'change' }
          ],
          rechargeVal: [
            { required: true, message: '请选择交易数量', trigger: 'blur' }
          ]
        },
        requestFromData: {
          rechargeValMin: '',
          rechargeValMax: '',
          customerCode: '',
          endDate: '',
          beginDate: '',
          pageIndex: 1,
          pageSize: 10
        }
      }
    },
    created () {
      this.getAgentRechargeHistory()
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

      // 重置搜索条件
      resetForm () {
        this.requestFromData.rechargeValMin = ''
        this.requestFromData.rechargeValMax = ''
        this.requestFromData.customerCode = ''
        this.requestFromData.endDate = ''
        this.requestFromData.beginDate = ''
      },

      // 获取代理商充值记录分页数据
      getAgentRechargeHistory () {
        this.loading = true
        _apiAgentRechargeHistory(
          this.requestFromData
        ).then((res) => {
          this.loading = false
          this.$message(res.message)
          if (res.statusCode === 200) {
            this.totalSize = res.totalSize
            this.agentRechargeHistory = res.data
          }
        }).catch((res) => {
          this.loading = false
          this.$message(res.message)
        })
      },

      // 分页
      handleCurrentChange (val) {
        this.requestFromData.pageIndex = val
        this.getAgentRechargeHistory()
      },

      // 交易状态自定义
      formatterStatus (row) {
        if (row.rechargeStatus === 0) {
          return '交易已取消'
        }
        if (row.rechargeStatus === 1) {
          return '客户未付款'
        }
        if (row.rechargeStatus === 2) {
          return '客户已付款等待代理商确认'
        }
        if (row.rechargeStatus === 3) {
          return '代理商已确认付款'
        }
        if (row.rechargeStatus === 4) {
          return '交易成功'
        }
      },

      // 修改交易状态
      editLockStatus (obj) {
        this.dialogFormData.code = obj.code
        this.dialogFormData.status_ = obj.rechargeStatus + ''
        this.dialogFormData.rechargeVal = obj.rechargeVal + ''
        this.dialogFormData.customerCode = obj.customerCode + ''
        this.dialogVisible = true
      },

      // 确认修改
      dialogSure (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.dialogFormData.status_ === 4) {
              this.$confirm('交易成功后交易记录将无法修改，确认修改？')
                .then(_ => {
                  this.postEdit()
                })
                .catch(_ => {})
            } else {
              this.postEdit()
            }
          } else {
            return false
          }
        })
      },

      // 提交修改
      postEdit () {
        this.btnLoading = true
        _apiAgentRechargeHistoryUpdate({
          status: this.dialogFormData.status_,
          code: this.dialogFormData.code,
          rechargeVal: this.dialogFormData.rechargeVal
        }).then((res) => {
          this.dialogVisible = false
          this.btnLoading = false
          this.$message(res.message)
          if (res.statusCode === 200) {
            this.setRechargeLimit(res.data.rechargeLimit)
            this.setWithdrawLimit(res.data.enchashmentLimit)
            this.getAgentRechargeHistory()
          }
        }).catch((res) => {
          this.$message(res.message)
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~assets/stylus/variable.styl"

  .margin-l-r-10
    margin 0 10px
    color $color-main-font
  .margin-left-30
    margin-left 30px
  .input
    width 193px
    margin-bottom 10px
  .agent-recharge
    padding 20px
    height 500px
    .el-table
      .cell
        padding-left 10px
        padding-right 10px
  .recharge-head
    margin-bottom 20px
  .pagination
    padding 10px 0 0
  .dialog /deep/ .el-dialog
    width 380px
</style>
