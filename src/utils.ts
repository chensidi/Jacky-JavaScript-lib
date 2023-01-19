const host = 'http://zhoup.top:7003'

function toNum(v: any): number {
  const value = Number(v)
  if (typeof value === 'number') {
    if (Number.isNaN(value)) {
      return 0
    }
    return value
  }
  return toNum(value)
}

function toString(v: any): string {
  if (v === undefined) return ''
  if (typeof v !== 'string') {
    return v.toString()
  }
  return v
}

function isOneDimensionalList(list: any[]) {
  return !list.some(item => Array.isArray(item))
}

const trimStartReg = /^( )+\s/
const trimEndReg = /\s( )+$/

export {
  host,
  trimStartReg,
  trimEndReg,
  toNum,
  toString,
  isOneDimensionalList,
}