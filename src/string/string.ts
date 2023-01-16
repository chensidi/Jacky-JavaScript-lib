import { toNum, toString } from '@utils'

/* 
  字符串原生es方法
*/

// string的迭代器
function oStringIterator(str: string): Iterable<string> {
  const temp: Iterable<string> = {
    [Symbol.iterator]() {
      let idx = 0
      return {
        next() {
          if (idx < str.length) {
            return {
              value: str[idx++],
              done: false,
            }
          } else {
            return {
              value: undefined,
              done: true,
            }
          }
        }
      }
    }
  }
  return temp
}

function * oStringGenerator(str: string): Generator<string> {
  let idx = 0
  while (idx < str.length) {
    yield str[idx++]
  }
}

// at
function oStrAt(str: string, index: number): string|undefined {
  index = toNum(index)
  if (index < 0) index += str.length
  if (index < 0) return undefined
  return str[index]
}

// charAt
function oStrCharAt(str: string, index: number): string {
  index = toNum(index)
  return str[index] ?? ''
}

// startsWith
function oStrStartsWith(str: string, subStr: string, position = 0): boolean {
  subStr = String(subStr)
  if (subStr === '') return true
  position = toNum(position)
  if (position < 0) position = 0
  if (str.length - position < subStr.length) {
    return false
  }
  let idx = 0
  for (let i = position; i < subStr.length; i ++) {
    if (subStr[idx++] !== str[i]) {
      return false
    }
  }
  return true
}

// endsWith
function oStrEndsWith(str: string, subStr: string, length = str.length): boolean {
  subStr = String(subStr)
  if (subStr === '') return true
  length = toNum(length)
  if (length > str.length) length = str.length
  if (subStr.length > length) return false
  if (length < 0) return false
  let idx = subStr.length - 1
  let len = length - 1
  while (idx >= 0) {
    if (str[len--] !== subStr[idx--]) {
      return false
    }
  }
  return true
}

// includes
function oStrIncludes(str: string, subStr: string, position = 0): boolean {
  if (subStr === '') return true
  position = toNum(position)
  if (position < 0) position = 0
  if (position >= str.length) return false
  if (str.length - position < subStr.length) return false
  let idx = position
  while (idx < str.length) {
    if (str.length - idx < subStr.length) return false
    let iIdx = idx
    let i = 0
    while (i < subStr.length) {
      if (subStr[i] !== str[iIdx ++]) {
        break
      }
      i ++
    }
    if (i === subStr.length) {
      return true
    }
    idx ++
  }
  return false
}

// indexOf
function oStrIndexOf(str: string, subStr: string, position = 0): number {
  position = toNum(position)
  if (position < 0) position = 0
  if (position > str.length) position = str.length
  if (subStr === '') return position
  if (str.length - position < subStr.length) return -1
  let idx = position
  while (idx < str.length) {
    if (str.length - idx < subStr.length) return -1
    let iIdx = idx
    let i = 0
    while (i < subStr.length) {
      if (subStr[i] !== str[iIdx ++]) {
        break
      }
      i ++
    }
    if (i === subStr.length) {
      return idx
    }
    idx ++
  }
  return -1
}

export {
  oStringIterator,
  oStringGenerator,
  oStrAt,
  oStrCharAt,
  oStrStartsWith,
  oStrEndsWith,
  oStrIncludes,
  oStrIndexOf,
}