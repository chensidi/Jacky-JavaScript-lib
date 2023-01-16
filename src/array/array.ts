import { toNum, isOneDimensionalList } from '@utils'
import type { normalCallback, ArrayType } from '@/types/arr.type'

// map
function oMap(arr: any[], callback: normalCallback) {
  const res: any[] = []
  arr.forEach(function (item, idx, arr) {
    res.push(callback(item, idx, arr))
  })
  return res
}

// fill
function oFill(arr: any[], value: any, start = 0, end = arr.length) {
  start = toNum(start)
  end = toNum(end)
  if (start < 0) return
  if (end > arr.length) end = arr.length
  for (let i = start; i < end; i ++) {
    arr[i] = value
  }
}

// filter
function oFilter(arr: any, callback: normalCallback) {
  const res: any[] = []
  arr.forEach(function(item: any, idx: number) {
    const v = callback(item, idx, arr)
    v && res.push(item)
  })
  return res
}

// at
function oAt(arr: readonly any[], index: number) {
  if (typeof index !== 'number') {
    index = toNum(index)
  }
  if (index < 0) {
    index += arr.length
  }
  return arr[index]
}

// concat
function oConcat(arr: readonly any[], ...rest: any[]): any[] {
  const res: any[] = [...arr]
  rest.forEach(function(item: any) {
    if (Array.isArray(item)) {
      res.push(...item)
    } else {
      res.push(item)
    }
  })
  return res
}

// find
function oFind(arr: any[], callback: normalCallback<boolean>, thisArg: any) {
  for (let i = 0; i < arr.length; i ++) {
    if (callback.apply(thisArg, [arr[i], i, arr])) {
      return arr[i]
    }
  }
  return undefined
}

// findIndex
function oFindIndex(arr: any[], callback: normalCallback<boolean>, thisArg: any) {
  for (let i = 0; i < arr.length; i ++) {
    if (callback.apply(thisArg, [arr[i], i, arr])) {
      return i
    }
  }
  return -1
}

// findLast
function oFindLast(arr: any[], callback: normalCallback, thisArg: any) {
  for (let i = arr.length - 1; i >= 0; i --) {
    if (callback.apply(thisArg, [arr[i], i, arr])) {
      return arr[i]
    }
  }
  return undefined
}

// findLastIndex
function oFindLastIndex(arr: any[], callback: normalCallback, thisArg: any) {
  for (let i = arr.length - 1; i >= 0; i --) {
    if (callback.apply(thisArg, [arr[i], i, arr])) {
      return i
    }
  }
  return -1
}

// flat
function oFlat(arr: any[], count: number = Infinity) {
  if (typeof count !== 'number') {
    count = toNum(count)
  }
  if (count <= 0) return [...arr]
  const res: any[] = []
  for (let i = 0; i < arr.length; i ++) {
    if (Array.isArray(arr[i])) {
      const shouldFlat = !isOneDimensionalList(arr[i])
      if (shouldFlat) {
        res.push(...oFlat(arr[i], count - 1))
      } else {
        res.push(...arr[i])
      }
    } else {
      res.push(arr[i])
    }
  }
  return res
}

// forEach
function oForEach(arr: any[], callback: normalCallback, thisArg: any): void {
  for (let i = 0; i < arr.length; i ++) {
    callback.apply(thisArg, [arr[i], i, arr])
  }
}

// includes
function oIncludes(arr: any[], item: any, fromIndex = 0): boolean {
  if (typeof fromIndex !== 'number') {
    fromIndex = toNum(fromIndex)
  }
  if (fromIndex > arr.length) return false
  if (fromIndex < 0) {
    fromIndex = fromIndex += arr.length
    if (fromIndex < 0) fromIndex = 0
  }
  for (let i = fromIndex; i < arr.length; i ++) {
    if (arr[i] === item) {
      return true
    }
  }
  return false
}

// indexOf
function oIndexOf(arr: any[], item: any, fromIndex = 0): number {
  if (typeof fromIndex !== 'number') {
    fromIndex = toNum(fromIndex)
  }
  if (fromIndex > arr.length) return -1
  if (fromIndex < 0) {
    fromIndex = fromIndex += arr.length
    if (fromIndex < 0) fromIndex = 0
  }
  for (let i = fromIndex; i < arr.length; i ++) {
    if (arr[i] === item) {
      return i
    }
  }
  return -1
}

// isArray
function oIsArray(arr: ArrayType): boolean {
  return arr instanceof Array && arr instanceof Object &&
  arr.constructor === Array && arr.__proto__ === Array.prototype
}

export {
  oMap,
  oFill,
  oFilter,
  oAt,
  oConcat,
  oFind,
  oFindIndex,
  oFindLast,
  oFindLastIndex,
  oFlat,
  oForEach,
  oIncludes,
  oIndexOf,
  oIsArray,
}