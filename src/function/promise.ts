/* 
  实现 Promise A+ 规范
*/

class OPromise {
  private result = undefined
  private reason = undefined

  private pendingStatus = 'PENDING'
  private fullfiledStatus = 'FULLFILED'
  private rejectStatus = 'REJECTED'

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
      this.status = this.fullfiledStatus
      setTimeout(() => {
        this.resolveHandle.forEach(fn => {
          try {
            const res = fn(this.result)
            setTimeout(() => {
              this.nextResolveHandle.forEach(fn => fn(res))
            })
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
      this.status = this.rejectStatus
      setTimeout(() => {
        this.rejectHandle.forEach(fn => {
          try {
            const res = fn(this.reason)
            setTimeout(() => {
              this.nextResolveHandle.forEach(fn => fn(res))
            })
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
  }
}

export { OPromise }
