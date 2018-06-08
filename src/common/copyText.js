/**
 * 复制文本(表单除外)
 * @param {*} element dom节点id
 */

// 选中复制span文本的方法
export const copySpan = (element) => {
  let text = document.getElementById(element)
  console.log(window)
  // if (window.browser.msie) {
  //   let range = document.body.createTextRange()
  //   range.moveToElementText(text)
  //   range.select()
  // } else if (window.browser.mozilla || window.browser.opera) {
  let selection = window.getSelection()
  let range = document.createRange()
  range.selectNodeContents(text)
  selection.removeAllRanges()
  selection.addRange(range)
  // } else if (window.browser.safari) {
    // let selection = window.getSelection()
    // selection.setBaseAndExtent(text, 0, text, 1)
  // }
  document.execCommand('copy') // 执行浏览器复制命令
}

// 选中复制input内容的方法
export const copyInput = (element) => {
  let text = document.getElementById(element)
  text.select()
  document.execCommand('Copy') // 执行浏览器复制命令
}
