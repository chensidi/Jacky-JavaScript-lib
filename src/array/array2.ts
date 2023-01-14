import { toNum, isOneDimensionalList, toString } from '../utils'
import type { ReduceCallback, ArrayEntry, normalCallback } from '../types/arr.type'

// join
function oJoin(arr: any[], flag: string = ','): string {
  let str = ''
  for (let i = 0; i < arr.length; i ++) {
    if (i !== arr.length - 1) {
      str += toString(arr[i]) + toString(flag)
    } else {
      str += toString(arr[i])
    }
  }
  return str
}

// keys
function oArrKeys(arr: any[]): Iterable<number> {
  let idx = 0
  const temp: Iterable<number> = {
    [Symbol.iterator]() {
      return {
        next() {
          if (idx < arr.length) {
            return {
              value: idx++,
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

// values
function oArrValues(arr: any[]): Iterable<any> {
  let idx = 0
  const temp: Iterable<any> = {
    [Symbol.iterator]() {
      return {
        next() {
          if (idx < arr.length) {
            return {
              value: arr[idx++],
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

// entries
function oArrEntries(arr: any[]): Iterable<ArrayEntry> {
  let idx = 0
  const temp: Iterable<ArrayEntry> = {
    [Symbol.iterator]() {
      return {
        next() {
          if (idx < arr.length) {
            return {
              value: [idx, arr[idx++]],
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

// reduce
function oReduce(arr: any[], callback: ReduceCallback, initVal?: any) {
  let curVal = initVal ?? arr[0]
  let idx = initVal === undefined ? 1 : 0
  for (let i = idx; i < arr.length; i ++) {
    const res = callback(curVal, arr[i], i, arr)
    curVal = res
  }
  return curVal
}

// every
function oEvery(arr: any[], callback: normalCallback, thisArg?: any): boolean {
  for (let i = 0; i < arr.length; i ++) {
    if (!callback.apply(thisArg, [arr[i], i, arr])) {
      return false
    }
  }
  return true
}

// some
function oSome(arr: any[], callback: normalCallback, thisArg?: any): boolean {
  for (let i = 0; i < arr.length; i ++) {
    if (callback.apply(thisArg, [arr[i], i, arr])) {
      return true
    }
  }
  return false
}

// reverse
function oReverse(arr: any[]) {
  for (let i = 0; i < arr.length / 2; i ++) {
    [arr[arr.length - 1 - i], arr[i]] = [arr[i], arr[arr.length - 1 - i]]
  }
}

// push
function oPush(arr: any[], ...rest: any[]): number {
  for (let i = 0; i < rest.length; i ++) {
    arr[arr.length] = rest[i]
    if (i === rest.length - 1) {
      return arr.length
    }
  }
  return arr.length
}

// pop
function oPop(arr: any[]) {
  if (arr.length === 0) return undefined
  const last = arr[arr.length - 1]
  arr.length -= 1
  return last
}

// shift
function oShift(arr: any[]) {
  if (arr.length === 0) return undefined
  const [first, ...rest] = [...arr]
  for (let i = 1; i < arr.length; i ++) {
    arr[i - 1] = arr[i]
  }
  arr.length -= 1
  return first
}

// unShift
function oUnshift(arr: any[], ...rest: any[]) {
  const newArr = [...rest, ...arr]
  newArr.forEach((item, i) => {
    arr[i] = item
  })
  return arr.length
}

export {
  oJoin,
  oArrKeys,
  oArrValues,
  oArrEntries,
  oReduce,
  oEvery,
  oReverse,
  oSome,
  oPush,
  oPop,
  oShift,
  oUnshift,
}