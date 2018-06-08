/**
 * 时间格式过滤器
 * @param {*} date 时间戳
 * @param {*} fmt 格式(如:yyyy-MM-dd hh:mm:ss)
 */
export function formatDate (date, fmt = 'yyyy-MM-dd hh:mm:ss') {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}
function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}
/**
 * 返回具有对象属性的数组
 * @param {*} list 目标数组
 * @param {*} fmt 属性值
 * @param {*} str 属性名
 */
export const formatAttribute = function (list = [], fmt = '', str) {
  if (!fmt || fmt === 0) {
    return list
  }
  let arr = []
  for (let i = 0; i < list.length; i++) {
    if (list[i][str] && fmt === list[i][str]) {
      arr.push(list[i])
    }
  }
  return arr
}
