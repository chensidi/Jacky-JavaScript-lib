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

// 防抖
/* 
  const fn = debounce(() => console.log('jacky'), 100)
*/

function oDebounce(fn: Function, wait = 0, {
  leading,
  maxWait
} = {} as {
  leading: boolean
  maxWait: number
}) {
  let timer: null | NodeJS.Timeout = null
  let maxTimer: null | NodeJS.Timeout = null
  return function (...arg: any[]) {
    if (!timer) {
      if (leading) {
        leading = false
        return fn(...arg)
      }
      timer = setTimeout(() => {
        fn(...arg)
        timer = null
        if (leading != null) {
          leading = true
        }
        maxTimer && clearTimeout(maxTimer)
      }, wait)
      if (maxWait && maxWait > wait) {
        maxTimer = setTimeout(() => {
          fn(...arg)
          timer && clearTimeout(timer)
          timer = null
          if (leading != null) {
            leading = true
          }
        }, maxWait)
      }
    } else {
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn(...arg)
        timer = null
        if (leading != null) {
          leading = true
        }
        maxTimer && clearTimeout(maxTimer)
      }, wait)
    }
  }
}

/* 
  promise 任务队列
  同一时刻最多处理N个promise，后续promise在前面已经处理结束后按顺序递补处理

  const req1 = () => fetch('network1') // 400ms 返回结果
  const req2 = () => fetch('network2') // 200ms 返回结果
  const req3 = () => fetch('network3') // 100ms 返回结果
  const req4 = () => fetch('network4') // 500ms 返回结果

  promiseTasks([req1, req2, req3, req4], 2)

  期望顺序
  200ms的结果 -> req2
  100ms的结果 -> req3
  400ms的结果 -> req1
  500ms的结果 -> req4
*/

function oPromiseTasks(promiseTask: ((...arg: any[]) => Promise<any>)[], max: number) {
  if (max === undefined) {
    promiseTask.forEach(fn => fn())
  }
  const pendingTasks: ((...arg: any[]) => Promise<any>)[] = [] // 处理中的promise
  while (pendingTasks.length < max && promiseTask.length) { // 有空闲位置
    const promiseItem = promiseTask.shift()
    if (promiseItem) {
      pendingTasks.push(promiseItem)
    }
  }

  const workingTasks: Promise<any>[] = []
  pendingTasks.forEach((exec, i) => {
    const res = exec()
    workingTasks.push(res)
  })

  workingTasks.forEach((p ,i) => {
    p.then(() => {
      watchNext(i)
    })
  })

  const watchNext = (idx: number) => {
    if (!promiseTask.length) return
    const nextPromiseFn = promiseTask.shift() as (...arg: any[]) => Promise<any>
    const nextPromise = nextPromiseFn()
    workingTasks.splice(idx, 1, nextPromise)
    nextPromise.then(() => {
      if (promiseTask.length) {
        watchNext(idx)
      }
    })
  }
}


export {
  oCall,
  oApply,
  oBind,
  oCurry,
  oDebounce,
  oPromiseTasks,
}