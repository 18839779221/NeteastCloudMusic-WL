/**
 * 为数字加上单位：万或亿
 *
 * 例如：
 *      1000.01 => 1000.01
 *      10000 => 1万
 *      99000 => 9.9万
 *      566000 => 56.6万
 *      5660000 => 566万
 *      44440000 => 4444万
 *      11111000 => 1111.1万
 *      444400000 => 4.44亿
 *      40000000,00000000,00000000 => 4000万亿亿
 *      4,00000000,00000000,00000000 => 4亿亿亿
 *
 * @param {number} number 输入数字.
 * @param {number} decimalDigit 小数点后最多位数，默认为2
 * @return {string} 加上单位后的数字
 */
export function formatCountToChinese(number, decimalDigit) {
  decimalDigit = decimalDigit === null ? 2 : decimalDigit;
  var integer = Math.floor(number);
  var digit = getDigit(integer);
  // ['个', '十', '百', '千', '万', '十万', '百万', '千万'];
  var unit = [];
  if (digit > 3) {
    var multiple = Math.floor(digit / 8);
    if (multiple >= 1) {
      var tmp = Math.round(integer / Math.pow(10, 8 * multiple));
      unit.push(addWan(tmp, number, 8 * multiple, decimalDigit));
      for (var i = 0; i < multiple; i++) {
        unit.push("亿");
      }
      return unit.join("");
    } else {
      return addWan(integer, number, 0, decimalDigit);
    }
  } else {
    return number;
  }
}

const addWan = function (integer, number, mutiple, decimalDigit) {
  var digit = getDigit(integer);
  if (digit > 3) {
    var remainder = digit % 8;
    if (remainder >= 5) {
      // ‘十万’、‘百万’、‘千万’显示为‘万’
      remainder = 4;
    }
    return (
      Math.round(number / Math.pow(10, remainder + mutiple - decimalDigit)) /
        Math.pow(10, decimalDigit) +
      "万"
    );
  } else {
    return (
      Math.round(number / Math.pow(10, mutiple - decimalDigit)) /
      Math.pow(10, decimalDigit)
    );
  }
};

const getDigit = function (integer) {
  var digit = -1;
  while (integer >= 1) {
    digit++;
    integer = integer / 10;
  }
  return digit;
};

export function formatDurationMMSS(duration) {
  let minute = parseInt(duration / 60);
  let second = parseInt(duration % 60);
  if (minute < 10) {
    minute = "0"+minute;
  }
  if (second < 10) {
    second = "0"+second;
  }
  return `${minute}:${second}`
}

export function formatMsDurationMMSS(duration) {
  duration = duration / 1000;
  return formatDurationMMSS(duration);
}

/**
 * 获取url参数
 * @param name 参数名
 */
 export function getQueryObject(url) {
  url = url === null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}
