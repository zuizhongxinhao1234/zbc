<template>
  <div ref="login_box">
    <el-row class="header" type="flex" justify="space-between">
      <el-col :span="22">
        <span class="agent-info">code：{{agentInfo.code}}</span>
        <span class="agent-info">手机号：{{agentInfo.phone}}</span>
        <span class="agent-info">名称：{{agentInfo.name}}</span>
        <span class="agent-info">押金额度：{{agentInfo.depositLimit}}</span>
        <span class="agent-info">充值额度：{{rechargeLimit}}</span>
        <span class="agent-info">提现额度：{{withdrawLimit}}</span>
        <span class="agent-info">等级：{{agentInfo.grade}}</span>
        <span class="agent-info">状态：{{agentInfo.status}}</span>
      </el-col>
      <el-col :span="2" class="nav-box text-align-right">
        <el-button @click="loginOut" class="agent-nav">登出</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20" >
      <el-col :span="4">
        <el-menu
          :default-active="pageIndex"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#000"
          active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>代理充值</span>
            </template>
            <router-link to="/agent-recharge/recharge-history">
              <el-menu-item index="1-1">代理充值记录</el-menu-item>
            </router-link>
            <router-link to="/agent-recharge/recharge-add">
              <el-menu-item index="1-2">新增代理充值</el-menu-item>
            </router-link>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>代理提现</span>
            </template>
            <router-link to="/agent-recharge/withdrawals-history">
              <el-menu-item index="2-1">代理提现记录</el-menu-item>
            </router-link>
            <router-link to="/agent-recharge/withdrawals-add">
              <el-menu-item index="2-2">新增代理提现</el-menu-item>
            </router-link>
          </el-submenu>
          <router-link to="/agent-recharge/agent-change-password">
            <el-menu-item index="3">
              <i class="el-icon-setting"></i>
              <span slot="title">修改密码</span>
            </el-menu-item>
          </router-link>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as types from 'store/mutation-types' // types方法
  import { mapGetters, mapActions, mapMutations } from 'vuex' // 状态管理方法
  import {_apiAgentLoginOut} from 'api' // 接口方法

  export default {
    name: 'Name',
    data () {
      return {
        pageIndex: '1-1',
        menuList: [
          {
            index: '1-1',
            url: 'recharge-history'
          },
          {
            index: '1-2',
            url: 'recharge-add'
          },
          {
            index: '2-1',
            url: 'withdrawals-history'
          },
          {
            index: '2-2',
            url: 'withdrawals-add'
          },
          {
            index: '3',
            url: 'agent-change-password'
          }
        ]
      }
    },
    computed: {
      ...mapGetters([
        'agentInfo',
        'rechargeLimit',
        'withdrawLimit'
      ])
    },
    beforeRouteEnter (to, from, next) {
      next(($this) => {
        $this.menuList.forEach((item) => {
          if (item.url === to.name) {
            $this.pageIndex = item.index
          }
        })
      })
    },
    beforeRouteLeave (to, from, next) {
      window.removeEventListener('resize', this.refresh)
      next()
    },
    mounted () {
      // let menuArr = window.location.href.split('/')
      // let thisUrl = menuArr[menuArr.length - 1]
      // this.menuList.forEach((n) => {
      //   if (n.url === thisUrl) {
      //     this.pageIndex = n.index
      //   }
      // })
      window.addEventListener('resize', this.refresh)
      this.refresh()
    },
    methods: {
      refresh () {
        let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        this.$refs.login_box.style.height = h + 'px'
      },

      ...mapActions({
        clearLocalStorage: 'setAgentStore'
      }),

      ...mapMutations({
        clearAgentInfo: types.SET_AGENTINFO
      }),

      // 登出
      loginOut () {
        this.$confirm('确认登出操作吗？', '登出', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          _apiAgentLoginOut().then((res) => {
            if (res.statusCode === 200) {
              this.$message(res.message)
              this.clearLocalStorage({flag: false, agentToken: ''})
              this.clearAgentInfo('')
              this.$router.push('/agent-login')
            } else {
              this.$message(res.message)
            }
          })
        }).catch(() => {})
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~assets/stylus/variable.styl"

  a
    text-decoration none
  .text-align-right
    text-align right
  .header
    padding 0 20px
    background-color #181b2a
  .agent-info
    height 50px
    margin-right 30px
    line-height 50px
    color $color-main-font
  .nav-box
    line-height 50px
  .left-nav
    min-width 240px
</style>
