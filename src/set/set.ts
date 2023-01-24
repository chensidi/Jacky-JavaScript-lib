/* 
  es6 中 set 数据接口的实现
*/

import { SCallBack } from "@/types/set.type"

class OSet {
  #list = [] as any[]
  constructor(list = []) {
    this.#list = this.unique([...list])
  }
  get size() {
    return this.#list.length
  }
  private unique(list: any[]) {
    const _list = [] as any
    list.forEach(e => {
      if (!_list.includes(e)) {
        _list.push(e)
      }
    })
    return _list
  }
  [Symbol.iterator]() {
    const _self = this
    let idx = 0
    return {
      next() {
        if (_self.#list.length > idx) {
          return {
            value: _self.#list[idx++],
            done: false,
          }
        } else {
          return {
            value: undefined,
            done: true,
          }
        }
      },
    }
  }
  has(item: any): boolean {
    return this.#list.includes(item)
  }
  add(item: any) {
    if (!this.#list.includes(item)) {
      this.#list.push(item)
    }
  }
  delete(item: any): boolean {
    const idx = this.#list.indexOf(item)
    if (idx > -1) {
      this.#list.splice(idx, 1)
      return true
    }
    return false
  }
  clear() {
    this.#list = []
  }
  keys() {
    const _self = this
    return {
      [Symbol.iterator]() {
        return _self[Symbol.iterator]()
      }
    }
  }
  values() {
    const _self = this
    return {
      [Symbol.iterator]() {
        return _self[Symbol.iterator]()
      }
    }
  }
  entries() {
    const _self = this
    return {
      [Symbol.iterator]() {
        let idx = 0
        return {
          next() {
            if (_self.#list.length > idx) {
              return {
                value: [_self.#list[idx], _self.#list[idx++]],
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
  }
  forEach(callback: SCallBack) {
    this.#list.forEach((item, idx) => {
      callback(item, idx, this)
    })
  }
}

export { OSet }
