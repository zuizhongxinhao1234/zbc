<template>
  <div>
    <ul class="pagination" v-show="list&&list.length>0">
      <li class="page-number" :class="{'page-disabled':this.pageNow===1}" @click="prevPage">&lt;</li>
      <li class="page-number" :class="{'activePage':pageNow===1}" @click="changePage(1)">
        1
      </li>
      <li class="page-number page-more" v-show="pageNow-max/2>1">
        ...
      </li>
      <li :key="item.id" class="page-number" :class="{'activePage':pageNow===item}" v-for="item in pageBtnList" @click="changePage(item)">
        {{item}}
      </li>
      <li class="page-number page-more" v-show="pageNow+max/2<len">
        ...
      </li>
      <li class="page-number" :class="{'activePage':pageNow===len}" @click="changePage(len)">
        {{len}}
      </li>
      <li class="page-number" :class="{'page-disabled':this.pageNow===this.len}" @click="nextPage">&gt;</li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props:
    {
      list: {
        type: Array,
        default: []
      },
      pageSize: {
        type: Number,
        default: 10
      },
      total: {
        type: Number,
        default: 0
      },
      pageNow: {
        type: Number,
        default: 1
      }
    },
    data () {
      return {
          // pageNow:1,
        max: 5,
        min: 1,
        pageBtnList: []
      }
    },
    created () {
      this._getList(1)
    },
    computed: {
      len: function () {
        return Math.ceil(this.total / this.pageSize)
      }
    },
    watch: {
      pageNow: function (n, m) {
        // console.log(n,m)
        var maxNum = this.max - 2
        let arr = this.pageNow === 1 || this.pageNow === this.len ? [] : [this.pageNow]
        if (this.pageNow - 2 <= 0 || this.len <= this.max) {
          // console.log(1)
          for (var k = 1; k < maxNum; k++) {
            arr.push(this.pageNow + k)
          }
          if (this.pageNow === 1) {
            arr.push(this.pageNow + k)
          }
        } else if (this.pageNow - 2 > 0 && this.pageNow + 2 <= this.len) {
          // console.log(2,this.pageNow)
          for (var i = 0; i < parseInt((maxNum - 1) / 2); i++) {
            arr.unshift(this.pageNow - i - 1)
            arr.push(this.pageNow + i + 1)
          }
        } else if (this.pageNow + 2 > this.len && this.pageNow < this.len) {
          // console.log(3)
          for (let k = 1; k < maxNum; k++) {
            arr.unshift(this.pageNow - k)
          }
        } else if (this.pageNow === this.len) {
          // console.log(4)
          for (var l = 1; l < maxNum; l++) {
            arr.unshift(this.pageNow - l)
          }
          arr.unshift(this.pageNow - l)
        }

        this.pageBtnList = arr
      }
    },
    methods: {
      _getList: function (page) {
        this.$emit('getData', page, this.pageSize)
      },
      changePage: function (page) {
        if (page !== this.pageNow) {
          this._getList(page)
        }
        // this.pageNow=page;
      },
      prevPage: function () {
        if (this.pageNow > 1) {
          // this.pageNow-=1
          this.$emit('getData', this.pageNow - 1, this.pageSize)
        }
      },
      nextPage: function () {
        if (this.pageNow < this.len) {
          // this.pageNow+=1
          this.$emit('getData', this.pageNow + 1, this.pageSize)
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

  .pagination{
    .page-number{
      display inline-block;
      vertical-align middle;
      border 1px solid #d9d9d9;
      width 32px;
      height 32px;
      line-height 32px;
      text-align center;
      cursor pointer;
      color #4e4e4e;
    }
    .activePage{
      background red
    }
    .page-more{
      cursor default
    }
    .page-disabled{

    }
  }
</style>
