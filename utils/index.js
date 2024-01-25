/**
 * *日期格式化
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
exports.parseTime = function parseTime(time, pattern) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    } else if (typeof time === 'string') {
      time = time
        .replace(new RegExp(/-/gm), '/')
        .replace('T', ' ')
        .replace(new RegExp(/\.\d{3}/gm), '')
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
    l: date.getMilliseconds()
  }
  const time_str = format.replace(/{([ymdhisal])+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * *休眠，默认休眠1s
 * @param {number} timer
 * @returns
 */
exports.sleep = function sleep(timer = 1000) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), timer)
  })
}

/**
 * 匹配range头
 * @param {*} range
 * @returns
 */
exports.getRange = function getRange(range) {
  const match = /bytes=([0-9]*)-([0-9]*)/.exec(range)
  const requestRange = {}
  if (match) {
    if (match[1]) requestRange.start = Number(match[1])
    if (match[2]) requestRange.end = Number(match[2])
  }
  return requestRange
}
