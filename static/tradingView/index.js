/* eslint-disable */
// const url='http://192.168.0.116:8087/json'
const url='http://47.89.19.38:10081/json' //测试
// const url='http://localhost:8081/feed'

TradingView.onready(function () {
  // 获取币种、市场
  const coin = JSON.parse(window.localStorage.getItem('coinType'))
  // 隐藏loading DIV
  if($(parent.document).find('#loadingDiv')){
    $(parent.document).find('#loadingDiv').css({
      'display': 'none'
    })
  }
  // 如果币种为空则重新加载
  if(!coin){
    // console.log('coin is empty',document)
    document.location.reload(true)
    return
  }

  let step = window.localStorage.getItem('step')
  let interval = '30'
  if(step){
    switch(parseInt(step)){
      case 1 : interval = '0'; break;
      case 1*60 : interval = '1'; break;
      case 5*60 : interval = '5'; break;
      case 15*60 : interval = '15'; break;
      case 30*60 : interval = '30'; break;
      case 60*60 : interval = '60'; break;
      case 60*60*24 : interval = 'D'; break;
      case 60*60*24*7 : interval = '1W'; break;
    }
  }

  const LINESTYLE_SOLID = 0
  const LINESTYLE_DOTTED = 1
  const LINESTYLE_DASHED = 2
  const LINESTYLE_LARGE_DASHED = 3
  var widget = window.tvWidget = new TradingView.widget({
    debug: false, // 错误日志
    fullscreen: true, // 全屏
    symbol: `${coin.name}-${coin.code}_${coin.nameMarket}-${coin.marketCode}`, // 币种名称-币种code_市场名称-市场code
    interval: interval === '0'? '1' : interval, // 时间间隔
    container_id: 'tv_chart_container', // DOM元素id
    datafeed: new Datafeeds.UDFCompatibleDatafeed(url), // JavaScript对象的实现接口 JS API 以反馈图表及数据。
    library_path: 'charting_library/',
    locale: getLocale() || getParameterByName('lang') || 'zh',
    drawings_access: { type: 'black', tools: [ { name: 'Regression Trend' } ] },
    charts_storage_url: 'http://saveload.tradingview.com',
    charts_storage_api_version: '1.1',
    client_id: 'tradingview.com',
    user_id: 'public_user_id',
    toolbar_bg: '#181b2a', // 工具栏背景颜色
    disabled_features: [ // 禁用
      'header_symbol_search', // 币种搜索框
      'volume_force_overlay',
      'use_localstorage_for_settings',
      'header_interval_dialog_button', // 变更周期按钮
      'header_compare', // 叠加品种按钮
      'header_undo_redo', // 撤销还原按钮
      // 截图按钮、隐藏保存/存放按钮（该功能不是功能集的一部分)、图表底部按钮
      'header_screenshot', 'header_saveload', 'timeframes_toolbar',
      // 图型样式切换按钮、时间选择
      'header_chart_type', 'header_resolutions'
    //  'header_indicators', 'header_settings'选择指标按钮、图表属性按钮
    ],
    enabled_features: [
      'hide_left_toolbar_by_default', // 当用户第一次打开图表时隐藏左工具栏
      'move_logo_to_main_pane', // 移动logo到K线图底端
      'study_templates', 'adaptive_logo'
    ],
    overrides: {
    // 柱状图高度 large, medium, samll, tiny
      'volumePaneSize': 'large',

      // 编辑器字体列表
      'editorFontsList': ['Verdana', 'Courier New', 'Times New Roman', 'Arial'],

      // 网格线、鼠标十字交叉
      'paneProperties.background': '#181b2a', // 图表背景颜色
      'paneProperties.vertGridProperties.style': LINESTYLE_SOLID, // 纵向网格线类型
      'paneProperties.vertGridProperties.color': '#1f2943', // 纵向网格线颜色
      'paneProperties.horzGridProperties.style': LINESTYLE_SOLID, // 横向网格线类型
      'paneProperties.horzGridProperties.color': '#1f2943', // 横向网格线颜色
      'paneProperties.crossHairProperties.width': 1, // 鼠标十字交叉宽度
      'paneProperties.crossHairProperties.style': LINESTYLE_DASHED, // 鼠标十字交叉类型
      'paneProperties.crossHairProperties.color': '#ffffff', // 鼠标十字交叉颜色

      // 边距 Margins (percentage). Used for auto scaling.
      'paneProperties.topMargin': 5, // K线图到图表顶端上边距
      'paneProperties.bottomMargin': 5, // 柱状图到图表底端下边距
      'scalesProperties.textColor': 'rgb(97, 104, 138)', // 文字颜色
      // 'paneProperties.legendProperties.showSeriesTitle': false, //币种名称-市场名称

      // 图标默认样式
      'mainSeriesProperties.style': 1,

      // 刻度尺
      'mainSeriesProperties.priceAxisProperties.autoScale': true, // 自动刻度            (see #749)
      'mainSeriesProperties.priceAxisProperties.autoScaleDisabled': false, //   (see #749)
      'mainSeriesProperties.priceAxisProperties.percentage': false, // 刻度尺百分比显示
      'mainSeriesProperties.priceAxisProperties.percentageDisabled': false,
      'mainSeriesProperties.priceAxisProperties.log': false,
      'mainSeriesProperties.priceAxisProperties.logDisabled': false,

      // 面积图样式
      'mainSeriesProperties.areaStyle.color1': '#21263d',
      'mainSeriesProperties.areaStyle.color2': '#1c2032',
      'mainSeriesProperties.areaStyle.linecolor': '#444f74',
      'mainSeriesProperties.areaStyle.linestyle': LINESTYLE_SOLID,
      'mainSeriesProperties.areaStyle.linewidth': 1.5,
      'mainSeriesProperties.areaStyle.priceSource': 'close'
    }
  })
  widget.onChartReady(function () {
    // 5分钟均线
    widget.chart().createStudy(
      'Moving Average',
      false,
      false,
      [5],
      null,
      {
        'precision': 2,
        'Plot.color': 'rgb(150, 95, 196)'
      }
    )

    // 10分钟均线
    widget.chart().createStudy(
      'Moving Average',
      false,
      false,
      [10],
      null,
      {
        'precision': 2,
        'Plot.color': 'rgb(132, 170, 213)'
      }
    )

    // 30分钟均线
    widget.chart().createStudy(
      'Moving Average',
      false,
      false,
      [30],
      null,
      {
        'precision': 2,
        'Plot.color': 'rgb(85, 178, 99)'
      }
    )

    // 分时
    var btn_0 = widget.createButton()
      .attr('title', '分时')
      .on('click', function (e) {
        widget.chart().setChartType(3)
        widget.chart().setResolution('1')
        changeClass(e)
        window.localStorage.setItem('step', 1)
      })
      .append('<span>分时</span>')

    // 一分钟
    var btn_1 = widget.createButton()
      .attr('title', '1分钟')
      .on('click', function (e) {
        changeChart(widget, '1')
        changeClass(e)
        window.localStorage.setItem('step', 1*60)
      })
      .append('<span>1分钟</span>')

    // 5分钟
    var btn_5 = widget.createButton()
      .attr('title', '5分钟')
      .on('click', function (e) {
        changeChart(widget, '5')
        changeClass(e)
        window.localStorage.setItem('step', 5*60)
      })
      .append('<span>5分钟</span>')

    // 15分钟
    var btn_15 = widget.createButton()
      .attr('title', '15分钟')
      .on('click', function (e) {
        changeChart(widget, '15')
        changeClass(e)
        window.localStorage.setItem('step', 15*60)
      })
      .append('<span>15分钟</span>')

    // 30分钟
    var btn_30 = widget.createButton()
      .attr('title', '30分钟')
      .attr('class', 'bg_red button')
      .on('click', function (e) {
        changeChart(widget, '30')
        changeClass(e)
        window.localStorage.setItem('step', 30*60)
      })
      .append('<span>30分钟</span>')
      // .addClass('active')

    // 1小时
    var btn_60 = widget.createButton()
      .attr('title', '1小时')
      .on('click', function (e) {
        changeChart(widget, '60')
        changeClass(e)
        window.localStorage.setItem('step', 60*60)
      })
      .append('<span>1小时</span>')

    // // 4小时
    // widget.createButton()
    //   .attr('title', '4小时')
    //   .on('click', function (e) {
    //     changeChart(widget, '240')
    //     changeClass(e)
    //   })
    //   .append('<span>4小时</span>')

    // 一天
    var btn_D = widget.createButton()
      .attr('title', '1天')
      .on('click', function (e) {
        changeChart(widget, 'D')
        changeClass(e)
        window.localStorage.setItem('step', 60*60*24)
      })
      .append('<span>1天</span>')

    // // 5天
    // widget.createButton()
    //   .attr('title', '5天')
    //   .on('click', function (e) {
    //     changeChart(widget, '5D')
    //     changeClass(e)
    //   })
    //   .append('<span>5天</span>')

    // 1周
    var btn_1W = widget.createButton()
      .attr('title', '1周')
      .on('click', function (e) {
        changeChart(widget, '1W')
        changeClass(e)
        window.localStorage.setItem('step', 60*60*24*7)
      })
      .append('<span>1周</span>')
    setTimeout(()=>{
      if(step){
        switch(parseInt(step)){
          case 1 : btn_0.addClass('active'); break;
          case 1*60 : btn_1.addClass('active'); break;
          case 5*60 : btn_5.addClass('active'); break;
          case 15*60 : btn_15.addClass('active'); break;
          case 30*60 : btn_30.addClass('active'); break;
          case 60*60 : btn_60.addClass('active'); break;
          case 60*60*24 : btn_D.addClass('active'); break;
          case 60*60*24*7 : btn_1W.addClass('active'); break;
        }
      }else{
        btn_30.addClass('active')
        window.localStorage.setItem('step', 30*60)
      }
    },20)
  })
})
