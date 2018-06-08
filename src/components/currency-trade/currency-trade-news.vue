<template>
  <div class="box">
    <div class="mTitle position-relative">
      <span>{{name}}</span>
      <router-link class="router-link" :to="`news/${type}`">{{$t('currencyTradeNews.more')}}</router-link>
    </div>
    <div class="content" v-loading="loadingFlag">
      <ul>
        <li v-for="item in list" :key="item.code">
          <p class="text">
            <router-link :to="`/news/detail/${type}/${item.code}`" class="router-link-text">
              {{item.title}}
            </router-link>
          </p>
          <p class="date text-align-right">{{item.lastModifyTime||item.creatTime}}</p>
        </li>
        <li v-if="!list || (list && list.length<=0)">
          <p class="noData">{{$t('currencyTradeNews.noData')}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {_apiGetNewsPageList} from 'api'
  export default {
    data () {
      return {
        list: [],
        loadingFlag: false
      }
    },
    props: {
      type: {
        type: String,
        default: ''
      },
      name: {
        type: String,
        default: ''
      }
    },
    async mounted () {
      this.loadingFlag = true
      try {
        let res = await _apiGetNewsPageList({
          type: this.type,
          pageIndex: 1,
          pageSize: 5
        })
        if (res.statusCode === 200) {
          this.list = res.result.data
        }
        this.loadingFlag = false
      } catch (error) {
        this.loadingFlag = false
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable.styl"
  .box
    background-color $color-second-bg
    .mTitle
      padding 0 18px
      height 43px
      line-height 43px
    .content
      padding 0 18px
      background-color $color-main-fill-bg
      max-height 448px
      overflow auto
      font-size 12px
      ul li
        border-bottom 1px solid $color-table-border-in
        padding 17px 0 10px 0
        &:last-child
          border-bottom none
        .text
          height 34px
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          .router-link-text
            color $color-main-font
            &:hover
              color $color-btn
        .date
          color $color-table-font-head
      .noData
        height 50px
        text-align center
        line-height 50px
    .router-link
      position: absolute
      right: 10px
</style>
