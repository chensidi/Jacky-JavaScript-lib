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

  constructor(exec: (resolve: Function, reject: Function) => void) {
    exec(this.resolve.bind(this), this.reject.bind(this))
  }
  private resolve(result: any) {
    if (this.status === this.pendingStatus) {
      this.result = result
      this.status = this.fullfiledStatus
      setTimeout(() => {
        this.resolveHandle.forEach(fn => fn(this.result))
      })
    }
  }
  private reject(reason: any) {
    if (this.status === this.pendingStatus) {
      this.reason = reason
      this.status = this.rejectStatus
      setTimeout(() => {
        this.rejectHandle.forEach(fn => fn(this.reason))
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
  }

  public catch(rejectCallback: Function) {
    if (typeof rejectCallback === 'function') {
      this.rejectHandle.push(rejectCallback)
    }
  }
}

export { OPromise }