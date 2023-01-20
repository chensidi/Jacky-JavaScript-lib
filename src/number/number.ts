/* 
  Number 下通用的方法实现
*/

import { toNum } from '@utils'

/* 
isFinite
Number上的isFinite方法，与全局的isFinite不同
它只会在数值类型的基础上比较，不会进行隐式转换
但全局的会转换
*/
function oNumIsFinite(num: number): boolean {
  if (typeof num !== 'number') return false
  if (isNaN(num)) return false
  return Infinity !== Math.abs(num)
}

// isInteger
function oNumIsInteger(num: number): boolean {
  if (typeof num !== 'number') return false
  if (Number.isNaN(num)) return false
  if (!oNumIsFinite(num)) return false
  const _num = num.toString()
  if (_num.indexOf('.') > -1) return false
  return true
}

/* 
isNaN
number上的isNaN与全局isNaN相比，更严格，只有才NaN这一种值的时候，才会返回true，其余情况一律返回false
而全局的isNaN，会进行隐式转换为number类型，然后再判断是否为NaN
*/
function oNumIsNaN(num: number) {
  if (typeof num !== 'number') return false
  return isNaN(num)
}

/* 
isEqual
Number身上原本没有提供这个方法，这是用来比较两个数字是否相等
比如，0.1 + 0.2 == 0.3000000.....3
这是由于精度问题导致，所以使用===操作符并不能得到预期效果
这个函数就是一个实现方法
*/

function oNumEqual(n1: number, n2: number) {
  return Math.abs(n1 - n2) <= Number.EPSILON
}

/* 
  toString
  该方法是Number原型链上提供，将目标数字转换成十进制
  然后再次转换为对应进制数
  本实现方法暂时没有实现浮点数的进制转换，仅实现对整数的进制转换
*/
function oNumToString(num: number, bit = 10) {
  num = Number(num)
  bit = Number(bit)
  const flag = num < 0
  num = Math.abs(num)
  if (bit < 2 || bit > 36) {
    throw '进制应该在2到36之间'
  }
  if (bit === 10) return num.toString()
  const arr: Array<string | number> = []
  while (num > 0) {
    let mod: number | string = num % bit
    if (mod > 9) {
      mod = String.fromCodePoint(mod + 87)
    }
    arr.unshift(mod)
    num = Math.floor(num / bit)
  }
  if (flag) {
    return `-${arr.join('')}`
  }
  return arr.join('')
}

export {
  oNumIsFinite,
  oNumIsInteger,
  oNumIsNaN,
  oNumEqual,
  oNumToString,
}