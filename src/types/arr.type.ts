export type normalCallback<T = any> = (item: any, index?: number, arr?: any[]) => T

export type ArrayType = {
  [idx: number]: number
  length: number
  __proto__: typeof Array.prototype
}

export type ArrayEntry = [number, any][]

export type ReduceCallback<T = any> = (prevVal: any, curItem: any, curIndex?: number, arr?: any[]) => T