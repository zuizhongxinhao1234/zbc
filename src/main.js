
import Element from 'element-ui'
import './assets/theme/index.css'

import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import router from './router'
import VueI18n from 'vue-i18n' // 语言包
import VueAwesomeSwiper from 'vue-awesome-swiper' // 轮播
import lang from 'language/defaultLanguage'
import store from './store'
import './assets/icon-font/iconfont.css'

Vue.use(Element)

Vue.config.productionTip = false

Vue.use(Router)
Vue.use(VueI18n) // 通过插件的形式挂载
Vue.use(VueAwesomeSwiper)

const i18n = new VueI18n({
  locale: lang,    // 语言标识
  // this.$i18n.locale // 通过切换locale的值来实现语言切换
  messages: {
    'zh': require('@/language/zh_index'),   // 中文语言包
    'en': require('@/language/en')    // 英文语言包
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  render: h => h(App)
})
