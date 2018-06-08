<template>
  <div class="page">
    <div v-loading="loadingFlag">
      <h6 class="title">{{detailData.title}}</h6>
      <div class="text" v-html="detailData.content">

      </div>
      <div class="noData" v-show="!detailData.content">
        {{$t('newsDetail.noData')}}
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { _apiGetNewsShowById } from 'api'
export default {
  data () {
    return {
      detailData: {
        code: '',
        title: '',
        content: ''
      },
      loadingFlag: false
    }
  },
  beforeRouteUpdate (to, from, next) {
    if (to.params.code !== from.params.code) {
      this.getNewsDetail()
    }
    next()
  },
  created () {
    this.getNewsDetail()
  },
  methods: {
    async getNewsDetail () {
      this.loadingFlag = true
      try {
        let res = await _apiGetNewsShowById({
          code: this.$route.params.code
        })
        if (res.statusCode === 200) {
          this.detailData = res.data
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
@import "~assets/stylus/variable.styl"
  .page
    background $color-second-fill-bg
    padding: 16px;
    border-radius: 5px;
    margin-bottom: 20px;
    .title
      text-align center
      font-size 16px
      margin-bottom 10px
      color $color-main-font
    .text
      color $color-second-font
    .date
      color $color-second-font
    .noData
      height 85px
      text-align center
      line-height 85px
</style>
