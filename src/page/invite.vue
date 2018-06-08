<template>
  <div class="page">
    <Header></Header>
    <div class="content-box">
      <div class="header">
        <h1 class="title">{{$t('invite.title')}}</h1>
      </div>
      <div class="content">
        <div class="user_invite_wrap">
          <div class="user_banner"><p>{{$t('invite.myMethod')}}</p></div>
          <div class="user_url">
            <p>{{$t('invite.registerLink')}}</p>
            <div class="share_code_wrap">
              <el-input id="shareLinkUrl" readonly="true" :placeholder="$t('invite.placeholder')" v-model="url">
                <template slot="append"><span class="copyUrl" @click="copyTextClick">{{$t('invite.copyLink')}}</span></template>
              </el-input>
            </div>
          </div>
        </div>
        <div class="invite_table">
          <div class="user_banner">
            <p>{{$t('invite.myInvite')}}</p>
          </div>
          <div class="invite_table_tab">
            <el-table
            class="table"
            :data="result.data"
            style="width: 100%">
              <el-table-column
                prop="coinName"
                width="90px"
                :label="$t('invite.coinName')">
              </el-table-column>
              <el-table-column
                prop="shareProfitAmount"
                :label="$t('invite.inviteCount')">
              </el-table-column>
              <el-table-column
                prop="presenteeName"
                :label="$t('invite.presenteeName')">
              </el-table-column>
              <el-table-column
                prop="settlementTime"
                :label="$t('invite.time')">
              </el-table-column>
            </el-table>
            <div class="pagination-box">
              <el-pagination
                layout="prev, pager, next"
                :page-size="pageSize"
                :current-page="pageIndex"
                :total="result.totalSize"
                v-show="result.totalSize>0"
                @current-change="currentChange">
              </el-pagination>
            </div>
          </div>
        </div>
        <div class="acitve-rule-box">
          <div class="active_rule">
            <p class="rule_title">{{$t('invite.details')}}</p>
          </div>
          <div class="rule_content">
            <p>{{$t('invite.details_1')}}</p>
            <p>{{$t('invite.details_2')}}</p>
            <p>{{$t('invite.details_3')}}</p>
            <p>{{$t('invite.details_4')}}</p>
            <p>{{$t('invite.details_5')}}</p>
            <p>{{$t('invite.details_6')}}</p>
            <p>{{$t('invite.details_7')}}</p>
            <p>{{$t('invite.details_8')}}</p>
            <p>{{$t('invite.details_9')}}</p>
            <div class="message">{{$t('invite.instruction')}}</div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script type="text/ecmascript-6">
import Header from 'components/common/Header'
import Footer from 'components/common/Footer'
import {_apiShareProfitPageQuery} from 'api'
import {mapGetters} from 'vuex'
import {copyInput} from 'common/copyText'
export default {
  data () {
    return {
      result: {
        data: [],
        totalSize: 0
      },
      pageSize: 10,
      pageIndex: 1
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    url () {
      return this.$t('invite.shareLink') + this.userInfo.code
    }
  },
  mounted () {
    this._getShareProfitPageQuery()
  },
  methods: {
    // 切换页码
    currentChange (pageIndex) {
      this.pageIndex = pageIndex
      this._getShareProfitPageQuery()
    },
    // 获取分润列表
    async _getShareProfitPageQuery () {
      let res = await _apiShareProfitPageQuery({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        presenterCode: this.userInfo.code
      })
      if (res.statusCode === 200) {
        this.result = res.result
      }
    },
    copyTextClick () {
      copyInput('shareLinkUrl')
    }
  },
  components: {
    Header,
    Footer
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~assets/stylus/variable.styl"
  .content-box
    margin-bottom 50px
  .header
    height: 650px;
    width: 100%;
    background-size: cover;
    background: url('../../static/images/activity/invite_banner.37b2b1e.jpg') no-repeat 50%/cover;
    overflow: hidden;
    .title
      margin 270px auto 0
      height 92px
      font-size 45px
      text-align center
      color $color-main-font
  .content
    padding-top 20px
    width 1200px
    margin 0 auto
    .invite_table,.acitve-rule-box
      background $color-main-fill-bg
      // min-height 246px
      margin 20px auto 0
      font-size 16px
      position relative
    .user_invite_wrap
      background $color-main-fill-bg
      // height 246px
      margin 20px auto 0
      font-size 16px
      position relative
    .user_banner,.active_rule
      background $color-second-bg
      height 48px
      line-height 48px
      color $color-main-font
      padding-left 30px
    .user_url,.invite_table_tab,.rule_content
      padding 30px
      background $color-main-fill-bg
      p
        color $color-table-font-head
        font-size 12px
        margin-bottom 10px
      .copyUrl
        color $color-btn
        cursor pointer
        &:hover
          color $color-btn-hover
      .message
        color $color-table-font-head
    .invite_table_tab
      padding 0 20px
  .pagination-box
    text-align right
    padding 10px 0
  .table
    width 100%
    text-align left
    background-color $color-main-fill-bg
    font-size 12px
  .table /deep/ thead
    color $color-table-font-head
  .table /deep/ .sort-caret.ascending
    border-bottom-color $color-table-font-tips
  .table /deep/ .sort-caret.descending
    border-top-color $color-table-font-tips
  .table /deep/ .descending .sort-caret.descending
    border-top-color $color-table-font-head
  .table /deep/ .ascending .sort-caret.ascending
    border-bottom-color $color-table-font-head
  .table /deep/ tr, .table /deep/ tr th
    background-color $color-main-fill-bg
  .table /deep/ .el-table__empty-block
    background-color $color-main-fill-bg
  .table /deep/ .el-table__body tr.current-row > td
    background-color #1e2235
  .table /deep/ th.is-leaf, .table /deep/ td
    border-bottom 1px solid $color-table-border-in
    padding 5px 0
    text-align right
    padding-right 10px
  .table /deep/ th.is-leaf:first-child, .table /deep/ td:first-child
    text-align left
    padding-left 10px
</style>
