
/**
 *
 * 去掉空格
 * @export
 * @param {any} str
 * @returns
 */
export function trim (str = '') {
  return str.replace(/^(\s|\u00A0)+/, '').replace(/(\s|\u00A0)+$/, '')
}
