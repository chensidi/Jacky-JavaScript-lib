/* 
  实现map数据结构
*/

import { MCallBack } from "@/types/set.type"

class OMap {
  #obj = [] as Array<[any, any]>
  constructor(arg = [] as Array<[any, any]>) {
    this.#obj = [...arg]
  }
  get(key: any) {
    const item = this.#obj.find(e => e[0] === key)
    return item?.[1]
  }
  set(key: any, value: any) {
    const item = this.#obj.find(e => e[0] === key)
    if (item) {
      item[1] = value
    } else {
      this.#obj.push([key, value])
    }
  }
  has(key: any): boolean {
    const item = this.#obj.find(e => e[0] === key)
    return !!item
  }
  delete(key: any) {
    const idx = this.#obj.findIndex(e => e[0] === key)
    if (idx > -1) {
      this.#obj.splice(idx, 1)
    }
  }
  keys() {
    let idx = 0
    const _self = this
    return {
      [Symbol.iterator]() {
        return {
          next() {
            if (idx < _self.#obj.length) {
              return {
                value: _self.#obj[idx ++][0],
                done: false,
              }
            }
            return {
              value: undefined,
              done: true
            }
          }
        }
      }
    }
  }
  values() {
    let idx = 0
    const _self = this
    return {
      [Symbol.iterator]() {
        return {
          next() {
            if (idx < _self.#obj.length) {
              return {
                value: _self.#obj[idx ++][1],
                done: false,
              }
            }
            return {
              value: undefined,
              done: true
            }
          }
        }
      }
    }
  }
  entries() {
    let idx = 0
    const _self = this
    return {
      [Symbol.iterator]() {
        return {
          next() {
            if (idx < _self.#obj.length) {
              return {
                value: _self.#obj[idx ++],
                done: false,
              }
            }
            return {
              value: undefined,
              done: true
            }
          }
        }
      }
    }
  }
  get size(): number {
    return this.#obj.length
  }
  clear() {
    this.#obj.length = 0
  }
  forEach(callback: MCallBack) {
    this.#obj.forEach((item, idx) => {
      callback(item[1], idx, this)
    })
  }
}


export {
  OMap
}