/* 
  Function 上常用方法实现
*/

// call
function oCall(fn: (...arg: any[]) => any, thisArg: Record<any, any>, ...rest: any[]) {
  if (typeof thisArg !== 'object') {
    thisArg = Object(thisArg)
  }
  const sym = Symbol(1)
  thisArg[sym as any] = fn
  const res = thisArg[sym as any](...rest)
  delete thisArg[sym as any]
  return res
}

// call
function oApply(fn: (...arg: any[]) => any, thisArg: Record<any, any>, rest: any[]) {
  if (typeof thisArg !== 'object') {
    thisArg = Object(thisArg)
  }
  const sym = Symbol(1)
  thisArg[sym as any] = fn
  const res = thisArg[sym as any](...rest)
  delete thisArg[sym as any]
  return res
}

// bind
function oBind(fn: (...arg: any[]) => any, thisArg: Record<any, any>, ...rest: any[]) {
  return function (...arg: any[]) {
    return fn.apply(thisArg, [...rest, ...arg])
  }
}

// curry
function oCurry(fn: (...arg: any[]) => any, ...args: any[]) {
  const len = fn.length
  const argList: any[] = [...args]
  const exec = () => fn(...argList)
  const fns = function(...rest: any[]) {
    argList.push(...rest)
    const _len = argList.length
    if (_len < len) {
      return fns
    } else {
      return exec()
    }
  }
  if (argList.length >= fn.length) {
    return exec
  }
  return fns()
}


export {
  oCall,
  oApply,
  oBind,
  oCurry,
}