/* 
  测试手动实现的map
*/

const { OMap } = require('../dist/index')

describe('测试手动实现的map', () => {
  test('常规测试', () => {
    const m = new OMap()
    m.set('1', 2)
    expect(m.get('1')).toBe(2)
    expect(m.has('1')).toBe(true)
    expect(m.has('2')).toBe(false)
    var o = {}
    var t = {
      name: 'jj',
    }
    m.set(o, t)
    expect(m.get(o)).toStrictEqual(t)
    m.set('1', 100)
    expect(m.get('1')).toBe(100)
    m.delete('1')
    expect(m.has('1')).toBe(false)
    const arr = [] as any[]
    for (const k of m.keys()) {
      arr.push(k)
    }
    expect(arr).toEqual([o])
    arr.length = 0
    for (const entry of m.entries()) {
      arr.push(entry)
    }
    expect(arr).toEqual([[o, t]])
  })

  test('测试forEach', () => {
    const m = new OMap([['1', 2]])
    const k = {},
      v = {}
    m.set(k, v)
    const arr = [] as any[]
    for (const e of m.entries()) {
      arr.push(...e)
    }
    expect(arr).toEqual(['1', 2, k, v])
    arr.length = 0
    m.forEach((item: any) => {
      arr.push(item)
    })
    expect(arr).toEqual([2, v])
  })
})
