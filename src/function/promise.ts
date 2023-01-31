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

  public then(resolveCallback: Function, rejectCallback: Function) {
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
}

export { OPromise }
