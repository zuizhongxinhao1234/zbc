
import {setLocalStorage, getLocalStorage} from 'common/localStorage'
var lang = getLocalStorage('language')
if (!lang) {
  var type = navigator.appName
  if (type === 'Netscape') {
    lang = navigator.language// 获取浏览器配置语言，支持非IE浏览器
  } else {
    lang = navigator.userLanguage// 获取浏览器配置语言，支持IE5+ == navigator.systemLanguage
  }
  lang = lang.substr(0, 2)// 获取浏览器配置语言前两位
    // if (lang != "zh"){
    //   lang='en'
    // }
  setLocalStorage('language', lang)
}

export default lang
