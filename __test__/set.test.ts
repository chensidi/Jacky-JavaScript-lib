/* 
  测试手动实现的set方法
*/

const {
  OSet,
} = require('../dist/index')

describe('测试set方法', () => { 
  test('常规测试', () => {
    const s = new OSet()
    s.add(1)
    expect(
      s.has(1)
    ).toBe(true)
    expect(
      s.delete(2)
    ).toBe(false)
    s.add(2)
    expect(
      s.delete(2)
    ).toBe(true)
  })
  test('常规测试2', () => {
    const s = new OSet([10, 20, 30])
    for (const item of s) {
      console.log(item)
    }
    expect(
      [...s]
    ).toEqual([10, 20, 30])
  })
  test('常规测试3', () => {
    const s = new OSet()
    s.add(1)
    s.add(1)
    expect([...s]).toEqual([1])
    expect(s.size).toBe(1)
  })
  test('常规测试4', () => {
    const s = new OSet('1234')
    const arr = [] as any[]
    for (const item of s.entries()) {
      arr.push(item)
    }
    expect(arr).toEqual([
      ['1', '1'],
      ['2', '2'],
      ['3', '3'],
      ['4', '4'],
    ])
    arr.length = 0
    for (const item of s.keys()) {
      arr.push(item)
    }
    expect(arr).toEqual(['1','2','3','4'])
    arr.length = 0
    for (const item of s.values()) {
      arr.push(item)
    }
    expect(arr).toEqual(['1','2','3','4'])
  })
  test('测试forEach方法', () => {
    const s = new OSet([1,2,3])
    const arr = [] as number[]
    s.forEach((item: number, idx: number) => {
      arr.push(item + idx)
    })
    expect(arr).toEqual([1,3,5])
  })
})