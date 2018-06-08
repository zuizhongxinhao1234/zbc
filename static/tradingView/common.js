/* eslint-disable */
function getParameterByName (name) {
  name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]')
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
  var results = regex.exec(location.search)
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '))
}
function changeChart (obj, r) {
  if (obj.chart().chartType() === 3) {
    obj.chart().setChartType(1)
  }
  obj.chart().setResolution(r)
}
function changeClass (e) {
  $(e.target).parent().parent().find('.button').removeClass('active')
  $(e.target).addClass('active')
}
function getLocale(){
  return window.localStorage.getItem('language')
}
