/* 
  实现 Promise A+ 规范
*/

class OPromise {
  private result = undefined
  private reason = undefined

  private pendingStatus = 'PENDING'
  private fulfilledStatus = 'FULFILLED'
  private rejectedStatus = 'REJECTED'

  private status = this.pendingStatus

  private resolveHandle: Function[] = []
  private rejectHandle: Function[] = []
  private nextResolveHandle: Function[] = []
  private nextRejectHandle: Function[] = []

  constructor(exec: (resolve: Function, reject: Function) => void) {
    try {
      exec(this.resolve.bind(this), this.reject.bind(this))
    } catch (e) {
      this.reject.bind(this)(e)
    }
  }
  private resolve(result: any) {
    if (this.status === this.pendingStatus) {
      this.result = result
      this.status = this.fulfilledStatus
      setTimeout(() => {
        this.resolveHandle.forEach(fn => {
          try {
            const res = fn(this.result)
            if (res instanceof OPromise) {
              res.then((_res: any) => {
                this.nextResolveHandle.forEach(fn => fn(_res))
              }, (_rej: any) => {
                this.nextRejectHandle.forEach(fn => fn(_rej))
              })
            } else {
              setTimeout(() => {
                this.nextResolveHandle.forEach(fn => fn(res))
              })
            }
          } catch (e) {
            const rej = e
            setTimeout(() => {
              this.nextRejectHandle.forEach(fn => fn(rej))
            })
          }
        })
      })
    }
  }
  private reject(reason: any) {
    if (this.status === this.pendingStatus) {
      this.reason = reason
      this.status = this.rejectedStatus
      setTimeout(() => {
        this.rejectHandle.forEach(fn => {
          try {
            const res = fn(this.reason)
            if (res instanceof OPromise) {
              res.then((_res: any) => {
                this.nextResolveHandle.forEach(fn => fn(_res))
              }, (_rej: any) => {
                this.nextRejectHandle.forEach(fn => fn(_rej))
              })
            } else {
              setTimeout(() => {
                if (this.status === this.fulfilledStatus) {
                  this.nextResolveHandle.forEach(fn => fn(res))
                }
                if(this.status === this.rejectedStatus) {
                  this.nextRejectHandle.forEach(fn => fn(res))
                }
              })
            }
          } catch (e) {
            const rej = e
            setTimeout(() => {
              this.nextRejectHandle.forEach(fn => fn(rej))
            })
          }
        })
      })
    }
  }

  public then(resolveCallback: Function, rejectCallback?: Function) {
    if (rejectCallback === undefined) {
      rejectCallback = function() {}
    }
    if (typeof resolveCallback === 'function') {
      this.resolveHandle.push(resolveCallback)
    }
    if (typeof rejectCallback === 'function') {
      this.rejectHandle.push(rejectCallback)
    }
    return new OPromise((resolve, reject) => {
      this.nextResolveHandle.push((res: any) => {
        resolve(res)
      })
      this.nextRejectHandle.push((rej: any) => {
        reject(rej)
      })
    })
  }

  public catch(rejectCallback: Function) {
    if (typeof rejectCallback === 'function') {
      this.rejectHandle.push(rejectCallback)
    }
    return new OPromise((resolve, reject) => {
      this.nextResolveHandle.push((res: any) => {
        resolve(res)
      })
      this.nextRejectHandle.push((rej: any) => {
        reject(rej)
      })
    }) 
  }

  static resolve(res: any) {
    return new OPromise(resolve => {
      resolve(res)
    })
  }

  static reject(rej: any) {
    return new OPromise((resolve, reject) => {
      reject(rej)
    })
  }

  // TODO: 实现 promose.all, any, race等
  // TODO: 当then的第二个参数执行后，后面若也有catch则忽略
  static all(promiseList: any[]) {
    const _p = new OPromise((resolve, reject) => {
      const resArr = [] as any[]
      const idxArr = Array(promiseList.length).fill(undefined)
      promiseList.forEach((item, idx) => {
        if (item instanceof OPromise) {
          item.then((res: any) => {
            resArr[idx] = res
            idxArr.pop()
            if (idxArr.length === 0) {
              resolve([...resArr])
            }
          })
          item.catch((rej: any) => {
            reject(rej)
          })
        } else {
          resArr[idx] = item
          idxArr.pop()
        }
      })
    })
    return _p
  }
}

export { OPromise }
