<template>
  <div v-loading="loadingFlag">
    <el-table
      :data="loginHistory.data"
      size="small"
      width="100%">
      <el-table-column prop="loginDate" :label="$t('loginHistory.time')"></el-table-column>
      <el-table-column prop="facilityName" :label="$t('loginHistory.name')"></el-table-column>
      <el-table-column prop="ip" :label="$t('loginHistory.ipAddress')"></el-table-column>
      <el-table-column prop="ipArea" :label="$t('loginHistory.ipArea')"></el-table-column>
    </el-table>
    <div class="pagination-box">
      <el-pagination
        layout="prev, pager, next"
        :page-size="pageSize"
        :current-page="pageIndex"
        :total="loginHistory.totalSize"
        v-show="loginHistory && loginHistory.data && loginHistory.data.length>0"
        @current-change="currentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {_apiFindUserLogin} from 'api'
  export default {
    name: 'Name',
    data () {
      return {
        loginHistory: [],
        pageSize: 10,
        pageIndex: 1,
        loadingFlag: false
      }
    },
    created () {
      this.getFindUserLogin()
    },
    methods: {
      currentChange (pageIndex) {
        this.pageIndex = pageIndex
        this.getFindUserLogin()
      },
      async getFindUserLogin () {
        this.loadingFlag = true
        try {
          let res = await _apiFindUserLogin({
            pageIndex: this.pageIndex,
            pageSize: this.pageSize
          })
          if (res.statusCode === 200) {
            this.loginHistory = res.result
          }
          this.loadingFlag = false
        } catch (error) {
          this.loadingFlag = false
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .pagination-box
    text-align right
    padding 10px 0
</style>
