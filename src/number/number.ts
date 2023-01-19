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

export {
  oNumIsFinite,
  oNumIsInteger,
}