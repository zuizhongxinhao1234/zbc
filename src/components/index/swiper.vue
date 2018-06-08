<template>
  <div>
    <swiper :options="swiperOption">
      <!-- 这部分放你要渲染的那些内容 -->
      <swiper-slide v-for="(item,index) in swiperSlide" :key="index">
        <img class="swiper-img" :src="item" alt="">
      </swiper-slide>
      <!-- 这是轮播的小圆点 -->
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'Name',
    props: {
      swiperSlide: { // 接收轮播图片的默认数组
        type: Array,
        default: []
      }
    },
    data () {
      return {
        swiperOption: {
          /**
           * 是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第
           * 一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
           */
          // notNextTick: true,
          loop: true, // 环路
          autoplay: {
            disableOnInteraction: false // 用户操作swiper之后是否禁止autoplay
          },
          pagination: {
            el: '.swiper-pagination', // 轮播分页按钮
            clickable: true, // 分页按钮可点击
            type: 'bullets', // 分页按钮类型
            bulletElement: 'span',  // 分页按钮标签类型
            renderBullet: function (index, className) {  // 分页按钮自定义标签
              return `
                <span class="${className}">${(index + 1).toString().padStart(this.swiperSlide ? this.swiperSlide.length.toString().length : 2, '0')}</span>
              `.trim()
            }
          }
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/swiper.styl"
  .swiper-img
    display block
    width 100%
</style>
