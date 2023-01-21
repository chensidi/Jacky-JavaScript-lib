/* 
  Object 上常用的方法
*/

// assign
function oAssign(target: Record<any, any>, ...source: Record<any, any>[]) {
  const resTarget: Record<any, any> = target
  source.forEach(item => {
    for (const k in item) {
      if (item.hasOwnProperty(k) && typeof k === 'string') {
        resTarget[k] = item[k as string]
      }
    }
    Object.getOwnPropertySymbols(item).forEach(symbol => {
      resTarget[symbol as any] = item[symbol as any]
    })
  })
  return resTarget
}

// create
function oCreate(origin: object) {
  const result = {}
  Object.setPrototypeOf(result, origin)
  return result
}

// hasOwn
function oHasOwn(origin: object, key: string | number | symbol): boolean {
  return origin.hasOwnProperty(key)
}

/* 
is
Object.is 主要是针对NaN，+0和-0的比较
1. 两者都是NaN，返回true
2. 两者都是+0，或者都是-0返回true，+0和-0在该方法中并不相等，但 === 操作符得到+0与-0相等
3. 其余情况一律按照 === 严格相等运算比较

ps：这里有个技巧，由于 +0 === -0，所以利用 1 / +0 === Infinity, 1 / -0 === -Infinity 这个特点
可以判断两者是 +0 还是 -0
*/
function oIs(v1: any, v2: any) {
  if (typeof v1 === typeof v2 && typeof v1 === 'number') {
    if (isNaN(v1) && isNaN(v2)) return true
    if (v1 === v2) {
      return v1 !== 0 || 1 / v1 === 1 / v2
    }
  }
  if (v1 === v2) return true
  return false
}


export {
  oAssign,
  oCreate,
  oHasOwn,
  oIs,
}