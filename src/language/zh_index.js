let zhZ = require('./zh_z')
let zh = require('./zh')

var extend = function (o, n) {
  for (var p in n) {
    if (n.hasOwnProperty(p) && (!o.hasOwnProperty(p))) { o[p] = n[p] }
  }
}

extend(zhZ, zh)

module.exports = zhZ
