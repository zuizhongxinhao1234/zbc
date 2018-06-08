/**
 * 本地存储存值
 * @param {*} key 键
 * @param {*} value 值
 */
export const setLocalStorage = function (key, value) {
  if (!key) return
  window.localStorage.setItem(key, value)
}
/**
 * 本地存储取值
 * @param {*} key 键
 */
export const getLocalStorage = function (key) {
  if (!key) return
  return window.localStorage.getItem(key)
}
/**
 * 本地存储删除
 * @param {*} key 键
 */
export const removeLocalStorage = function (key) {
  if (!key) return
  window.localStorage.removeItem(key)
}
