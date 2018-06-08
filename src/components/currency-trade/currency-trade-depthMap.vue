<template>
  <div class="box">
    <div class="mTitle position-relative">
      <div class="text" @click="showOrHide">
        <i :class="showContentFlag?'el-icon-arrow-down':'el-icon-arrow-right'"></i>
        <span>{{$t('currencyTradeDepthMap.depthMap')}}</span>
      </div>
    </div>
    <el-collapse-transition>
      <div class="content" v-show="showContentFlag">
        <div class="myEchart" ref="myEchart"></div>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import echarts from 'echarts'
  import {_apiGetFullDepth} from 'api'
  import {mapGetters} from 'vuex'
  import {getLocalStorage} from 'common/localStorage'
  // import {isEmpty} from 'common/validate'

  export default {
    data () {
      return {
        showContentFlag: true,
        chart: null,
        depth: { // 原始数据
          date: 1525856381,
          asks: [],
          bids: []
        },
        asksData: [], // 处理后的买入数据
        bidsData: [], // 处理后的卖出数据
        timer: null // 定时器
      }
    },
    computed: {
      ...mapGetters(['coinType'])
    },
    mounted () {
      // !isEmpty(this.coinType) && this.apiGetFullDepth()
      // 绘制图表
      // this.initChart()
    },
    beforeDestroy () {
      this.timer && clearTimeout(this.timer)
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      showOrHide () {
        this.showContentFlag = !this.showContentFlag
      },
      // 处理数据的方法
      operateData () {
        for (let i in this.depth.asks) {
          let arr = []
          arr[0] = this.depth.asks[i][1]
          arr[1] = this.depth.asks[i][0]
          this.asksData.push(arr)
        }
        for (let i in this.depth.bids) {
          let arr = []
          arr[0] = this.depth.bids[i][1]
          arr[1] = this.depth.bids[i][0]
          this.bidsData.push(arr)
        }
        // 绘制图表
        this.initChart()
      },
      async apiGetFullDepth () {
        this.timer && clearTimeout(this.timer)
        try {
          let res = await _apiGetFullDepth({
            marketCode: this.coinType.marketCode,
            coinCode: this.coinType.code,
            step: getLocalStorage('step')
          })
          if (res.statusCode === 200) {
            this.depth = res.data.depth
          // 处理数据
            this.operateData()
          }
          this.timer = setTimeout(() => {
            this.apiGetFullDepth()
          }, 10000)
        } catch (error) {
          console.log('error :' + error)
        }
      },

      // 绘制图表
      initChart () {
        // 初始化echarts图表
        this.chart = echarts.init(this.$refs.myEchart)

        // echarts配置
        this.chart.setOption({
          backgroundColor: '#181b2a', // 背景颜色
          textStyle: {
            color: '#61688a'
          },
          xAxis: {
            splitLine: {
              show: false // 不显示网格线
            },
            boundaryGap: false, // 坐标轴两边不留白
            axisLine: {
              lineStyle: {
                color: '#2e3247' // 坐标轴线颜色
              }
            },
            axisTick: {
              show: true, // 显示坐标轴刻度
              alignWithLabel: true // 刻度线和标签对齐
            },
            axisLabel: {
              formatter: (value) => {
                return parseFloat(value).toFixed(2) // X轴标签保留2位小数
              },
              showMinLabel: false, // 不显示最小值的标签
              showMaxLabel: false // 不显示最大值的标签
            },
            min: function (value) {
              return value.min // X轴最小值
            },
            max: function (value) {
              return value.max // X轴最大值
            }
          },
          yAxis: {
            splitLine: {
              show: false // 不显示网格线
            },
            position: 'right', // Y轴放置在右侧
            boundaryGap: ['0', '10%'], // 坐标轴两边留白
            axisLine: {
              lineStyle: {
                color: '#2e3247' // 坐标轴线颜色
              }
            },
            axisLabel: {
              formatter: (value) => {
                let v = parseFloat(value)
                return v >= 1000 ? ((v / 1000).toFixed(2) + 'k') : v // Y轴标签保留2位小数
              },
              showMaxLabel: false // 不显示最大值的标签
            }
          },
          legend: {
            show: false
          },
          tooltip: {
            show: true, // 是否显示提示框组件(包括提示框浮层和axisPointer)
            trigger: 'axis', // 提示框触发方式
            axisPointer: {
              show: false, // 不显示坐标轴指示器
              lineStyle: {
                opacity: 0 // 隐藏坐标轴指示器
              }
            },
            showContent: true, // 显示提示框内容
            backgroundColor: '#262a42', // 背景颜色
            padding: [10, 20], // 提示框边距
            textStyle: {
              fontSize: 12 // 提示框字体大小
            },
            extraCssText: 'box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);',
            formatter: function (params) { // 自定义提示框内容
              return `<div style="text-align: left; line-height: 30px; color: #c7cce6">
                <span style="display: inline-block; width: 50px">${this.$t('currencyTradeDepthMap.entrustPrice')}</span>
                <span>${params[0].value[0]}</span>
              </div>
              <div style="text-align: left; line-height: 30px; color: #c7cce6">
                <span style="display: inline-block; width: 50px">${this.$t('currencyTradeDepthMap.total')}</span>
                <span>${params[0].value[1]}</span>
              </div>`
            }
          },
          series: [
            {
              type: 'line', // 图表类型
              symbolSize: 10, // 标记的图形大小
              showSymbol: false, // 不显示标记的图形，hover时才显示
              hoverAnimation: false, // 不显示hover时标记的图形动画
              color: '#243336', // 面积背景颜色
              areaStyle: {
                opacity: 1 // 面积图背景颜色透明度
              },
              data: this.asksData // 图表Y轴数据
            },
            {
              type: 'line', // 图表类型
              symbolSize: 10, // 标记的图形大小
              showSymbol: false, // 不显示标记的图形，hover时才显示
              hoverAnimation: false, // 不显示hover时标记的图形动画
              color: '#392332', // 面积背景颜色
              areaStyle: {
                opacity: 1 // 面积图背景颜色透明度
              },
              data: this.bidsData // 图表Y轴数据
            }
          ]
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable.styl"
  .box
    background-color $color-second-bg
    .mTitle
      padding 0 10px
      height 43px
      line-height 44px
      .text
        cursor pointer
        display inline-block
    .content
      background-color $color-main-fill-bg
      padding-left 9px
      height 429px
    .myEchart
      width 100%
      height 100%
</style>
