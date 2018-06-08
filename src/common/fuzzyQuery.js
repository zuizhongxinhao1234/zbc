/**
 * 模糊查询(不区分大小写)
 * @param {*} data 目标对象
 * @param {*} search 查询条件
 */
export default function (data, search) {
  if (search) {
    return data.filter(function (product) {
      return Object.keys(product).some(function (key) {
        return String(product[key]).toLowerCase().indexOf(search.toLowerCase()) > -1
      })
    })
  }

  return data
}
