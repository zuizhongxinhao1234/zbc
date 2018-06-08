<template>
  <div class="page">
      <el-row>
        <el-col :span="24">
          <ul v-loading="loadingFlag">
            <li v-for="item in resultDatas.data" :key="item.code" @click="toLink(item.code)">
              <!-- <router-link :to="`/news/`" class="router-link-text"> -->
              <p class="title">{{item.title}}</p>
              <p class="text">
                {{item.title}}
              </p>
              <p class="date text-align-right">
                <span>
                  <i class="el-icon-time"></i>
                  &nbsp;{{item.lastModifyTime||item.creatTime}}
                </span>
                <span class="margin-left-20">
                  <i class="el-icon-service"></i>
                  &nbsp;{{item.creatAdmin}}
                </span>
              </p>
              <!-- </router-link> -->
            </li>
            <li v-if="!resultDatas || !resultDatas.data || resultDatas.data.length<=0">
              <p class="noData">{{$t('newsList.noData')}}</p>
            </li>
          </ul>
        </el-col>
      </el-row>
      <div class="pagination-box">
        <el-pagination
          layout="prev, pager, next"
          :page-size="pageSize"
          :current-page="pageIndex"
          :total="resultDatas.totalSize"
          v-show="resultDatas.totalSize>0"
          @current-change="currentChange">
        </el-pagination>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { _apiGetNewsPageList } from 'api'
export default {
  data () {
    return {
      resultDatas: {
        data: [],
        totalSize: 0
      },
      loadingFlag: false,
      type: 1,
      pageIndex: 1,
      pageSize: 10
    }
  },
  beforeRouteUpdate (to, from, next) {
    if (to.params.t !== from.params.t) {
      this.pageIndex = 1
      this.getNews(to.params.t)
    }
    next()
  },
  mounted () {
    this.getNews(this.$route.params.t)
  },
  methods: {
    async getNews (type) {
      this.loadingFlag = true
      try {
        let res = await _apiGetNewsPageList({
          type: type,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        })
        if (res.statusCode === 200) {
          this.resultDatas = res.result
        }
        this.loadingFlag = false
      } catch (error) {
        this.loadingFlag = false
      }
    },
    toLink (code) {
      this.$router.push(`/news/detail/${this.$route.params.t}/${code}`)
    },
    currentChange (pageIndex) {
      this.pageIndex = pageIndex
      this.getNews(this.$route.params.t)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~assets/stylus/variable.styl"
.page
  ul li
    border 1px solid $color-table-border-in
    padding 14px
    background $color-second-fill-bg
    border-radius 5px
    transition all .5s
    margin-bottom 20px
    &:hover
      background $color-table-bg-title
    .title
      font-size 16px
      margin-bottom 10px
      color $color-main-font
    .text
      height 34px
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      color $color-second-font

    .date
      color $color-second-font
  .noData
    height 275px
    text-align center
    line-height 275px
  .margin-left-20
    margin-left 20px
  .pagination-box
    text-align right
    padding 10px 0
</style>
