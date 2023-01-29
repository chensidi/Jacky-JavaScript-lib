/* 
  测试手动实现的 promise
*/

const { OPromise } = require('../dist/index')

describe('测试promise', () => {
  test('测试1', () => {
    const p = new OPromise((resolve, reject) => {
      console.log('1')
      resolve(3)
    })
    
  })
})
