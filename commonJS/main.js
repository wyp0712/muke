/**
 * @param []
 */
const _ = require('loadsh');

const arr = _.concat([1,2], 4)
console.log(arr)

// 模块化：拆分功能


function arrFn(arr) {
  return arr.reduce((per, cur) => {
     per.indexOf(cur) === -1 && per.push(cur)
     return per
  }, [])
}

console.log(arrFn([1,2,2,2,2,3,3,3,3,3]))
var a = [...new Set([1,2,2,2,2,3,3,3,3,3])]
console.log(a, 'a')

var str = 'xxx.html?a=1&k1=v1&k2=v2&k3=v3';
















