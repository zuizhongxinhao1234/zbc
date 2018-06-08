<template>
  <div>
    <div class="dropdown-box position-relative" tabindex="1" @blur="closeOption">
      <div class="dropdown-text position-relative" @click="clickDropdown">
        {{defaultVal.value}}
        <i class="iconfont" :class="optionShow?'icon-xiangshang1':'icon-xiangxia1'"></i>
      </div>
      <ul class="dropdown-options" v-show="optionShow">
        <li :key="item.id" @click="selectValue(item)" v-for="item in list">
          {{item.value}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      list: {
        type: Array,
        default () {
          return []
        }
      },
      defaultVal: {
        type: Object,
        default () {
          return {
            value: '',
            key: null
          }
        }
      }
    },
    data () {
      return {
        optionShow: false
      }
    },
    methods: {
      clickDropdown () {
        this.optionShow = !this.optionShow
      },
      selectValue (item) {
        this.defaultVal.key = item.key
        this.defaultVal.value = item.value
        this.$emit('selected', this.defaultVal)
        this.optionShow = false
      },
      closeOption () {
        this.optionShow = false
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

  @import "~assets/stylus/variable.styl"
  .dropdown-box
    width 100%
    height 100%
    text-align left
    outline none
    border-radius 5px
    &:focus
      box-shadow: 0 0 0 5px $color-7a98f7;
    .dropdown-text
      width 100%
      height 100%
      moz-user-select: -moz-none
      -moz-user-select: none
      -o-user-select:none
      -khtml-user-select:none
      -webkit-user-select:none
      -ms-user-select:none
      user-select:none
      cursor pointer
      border 1px solid $color-main-border
      color $color-table-font-head
      background $color-input-bg
      padding 0 10px
    .dropdown-options
      width 100%
      max-height 320px
      overflow auto
      position absolute
      z-index 1000
      border 1px solid $color-main-border
      color $color-table-font-head
      background $color-input-bg
      border-top none
      box-shadow 0 2px 6px 0 $color-main-border
      li
        height 100%
        padding 0 10px
        cursor pointer
        border-bottom 1px solid $color-main-border
        &:last-child
          border-bottom none
        &:hover
          background $color-input-bg-hover
  .icon-xiangxia1,.icon-xiangshang1
    position absolute
    right 10px
    top 0
    color #ccc

</style>
